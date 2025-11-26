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
    loading: false
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
   * 微信一键登录
   */
  async handleWechatLogin(): Promise<void> {
    try {
      this.setData({ loading: true });

      // 获取微信登录 code
      const loginRes = await this.getWechatLoginCode();
      console.log('获取到code:', loginRes.code);

      // 调用后台校验接口
      const result = await authApi.wechatLogin({
        code: loginRes.code
      });

      // 判断是否需要补充信息或注册
      if (result.needSupplement || result.isNewUser) {
        // 保存临时数据，跳转到补充信息页面
        storage.set('tempLoginData', {
          tempOpenid: result.tempOpenid,
          isNewUser: result.isNewUser,
          needSupplement: result.needSupplement
        });
        
        wx.redirectTo({
          url: '/pages/complete-info/complete-info'
        });
      } else {
        // 登录成功，直接跳转首页
        this.saveLoginInfo(result);
        this.redirectToHome();
        
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      }

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
      url: '/pages/ledger/ledger'
    });
  }
});
