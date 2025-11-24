import { authApi } from '../../api/modules/auth';
import { saveLoginInfo, isLoggedIn } from '../../utils/auth';
import { storage } from '../../utils/storage';
import type { LoginType } from '../../types/auth';

/**
 * 登录页面
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前登录方式：wechat 或 password
    loginType: 'wechat' as LoginType,
    // 手机号
    phone: '',
    // 密码
    password: '',
    // 是否显示密码
    showPassword: false,
    // 加载状态
    loading: false,
    // 用户信息
    userInfo: {
      avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
      nickName: ''
    },
    // 是否已获取用户信息
    hasUserInfo: false,
    // 是否支持新版头像昵称API
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    // 是否支持getUserProfile
    canIUseGetUserProfile: wx.canIUse('getUserProfile')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(): void {
    // 检查是否已登录
    if (isLoggedIn()) {
      this.redirectToHome();
    }
  },

  /**
   * 切换登录方式
   */
  switchLoginType(): void {
    const newType: LoginType = this.data.loginType === 'wechat' ? 'password' : 'wechat';
    this.setData({
      loginType: newType,
      phone: '',
      password: '',
      showPassword: false
    });
  },

  /**
   * 手机号输入
   */
  onPhoneInput(e: WechatMiniprogram.Input): void {
    this.setData({ phone: e.detail.value });
  },

  /**
   * 密码输入
   */
  onPasswordInput(e: WechatMiniprogram.Input): void {
    this.setData({ password: e.detail.value });
  },

  /**
   * 切换密码显示状态
   */
  togglePasswordVisibility(): void {
    this.setData({ showPassword: !this.data.showPassword });
  },

  /**
   * 选择头像
   */
  onChooseAvatar(e: any): void {
    const { avatarUrl } = e.detail;
    const { nickName } = this.data.userInfo;
    const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
    
    this.setData({
      'userInfo.avatarUrl': avatarUrl,
      hasUserInfo: !!nickName && !!avatarUrl && avatarUrl !== defaultAvatarUrl
    });
  },

  /**
   * 输入昵称
   */
  onNicknameInput(e: WechatMiniprogram.Input): void {
    const nickName = e.detail.value;
    const { avatarUrl } = this.data.userInfo;
    const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
    
    this.setData({
      'userInfo.nickName': nickName,
      hasUserInfo: !!nickName && !!avatarUrl && avatarUrl !== defaultAvatarUrl
    });
  },

  /**
   * 微信登录
   */
  async handleWechatLogin(): Promise<void> {
    try {
      this.setData({ loading: true });

      // 获取微信登录 code
      const loginRes = await this.getWechatLoginCode();

      // 保存登录数据，跳转到完善信息页面
      storage.set('tempLoginData', {
        code: loginRes.code,
        encryptedData: null,
        iv: null
      });
      
      // 跳转到完善信息页面
      wx.redirectTo({
        url: '/pages/complete-info/complete-info'
      });

    } catch (error: any) {
      console.error('微信登录失败', error);
      wx.showToast({
        title: error.message || '登录失败，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 微信登录（手机号授权）
   */
  async handleWechatLoginWithPhone(e: WechatMiniprogram.ButtonGetPhoneNumber): Promise<void> {
    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
      console.log('用户拒绝授权手机号');
      wx.showToast({
        title: '需要手机号授权才能登录',
        icon: 'none'
      });
      return;
    }

    try {
      this.setData({ loading: true });

      // 获取微信登录 code
      const loginRes = await this.getWechatLoginCode();
      console.log('获取到code:', loginRes.code);

      // 保存手机号加密数据和code，跳转到完善信息页面
      storage.set('tempLoginData', {
        code: loginRes.code,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      });

      console.log('跳转到完善信息页面');
      
      // 跳转到完善信息页面
      wx.redirectTo({
        url: '/pages/complete-info/complete-info'
      });

    } catch (error: any) {
      console.error('获取登录信息失败', error);
      wx.showToast({
        title: error.message || '登录失败，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 测试模式登录（跳过手机号授权）
   */
  async handleTestLogin(): Promise<void> {
    try {
      this.setData({ loading: true });

      // 获取微信登录 code
      const loginRes = await this.getWechatLoginCode();
      console.log('[测试模式] 获取到code:', loginRes.code);

      // 保存登录数据（不包含手机号）
      storage.set('tempLoginData', {
        code: loginRes.code,
        encryptedData: null,
        iv: null,
        testMode: true  // 标记为测试模式
      });

      console.log('[测试模式] 跳转到完善信息页面');
      
      // 跳转到完善信息页面
      wx.redirectTo({
        url: '/pages/complete-info/complete-info'
      });

    } catch (error: any) {
      console.error('[测试模式] 登录失败', error);
      wx.showToast({
        title: error.message || '登录失败，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 密码登录
   */
  async handlePasswordLogin(): Promise<void> {
    // 验证输入
    if (!this.validatePasswordLogin()) {
      return;
    }

    try {
      this.setData({ loading: true });

      const result = await authApi.passwordLogin({
        phone: this.data.phone,
        password: this.data.password
      });

      // 登录成功，保存 token 和用户信息
      this.saveLoginInfo(result);
      this.redirectToHome();

      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });

    } catch (error: any) {
      console.error('密码登录失败', error);
      wx.showToast({
        title: error.message || '登录失败，请检查手机号和密码',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 获取微信登录 code
   */
  getWechatLoginCode(): Promise<WechatMiniprogram.LoginSuccessCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.login({
        success: resolve,
        fail: reject
      });
    });
  },

  /**
   * 获取用户信息
   */
  getUserProfile(): Promise<WechatMiniprogram.GetUserProfileSuccessCallbackResult['userInfo'] | null> {
    return new Promise((resolve) => {
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => resolve(res.userInfo),
        fail: () => {
          // 用户拒绝授权，继续登录流程
          console.log('用户拒绝授权获取用户信息');
          resolve(null);
        }
      });
    });
  },

  /**
   * 验证密码登录表单
   */
  validatePasswordLogin(): boolean {
    const { phone, password } = this.data;

    if (!phone) {
      wx.showToast({ title: '请输入手机号', icon: 'none' });
      return false;
    }

    // 验证手机号格式
    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return false;
    }

    if (!password) {
      wx.showToast({ title: '请输入密码', icon: 'none' });
      return false;
    }

    if (password.length < 6) {
      wx.showToast({ title: '密码长度不能少于6位', icon: 'none' });
      return false;
    }

    return true;
  },

  /**
   * 保存登录信息（使用 auth 工具）
   */
  saveLoginInfo(result: any): void {
    saveLoginInfo(result.token, result.userInfo, result.expireTime);
  },

  /**
   * 跳转到首页
   */
  redirectToHome(): void {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  }
});
