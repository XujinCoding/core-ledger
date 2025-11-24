import { authApi } from '../../api/modules/auth';
import { saveLoginInfo } from '../../utils/auth';
import { storage } from '../../utils/storage';

/**
 * 绑定手机号页面
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 手机号
    phone: '',
    // 验证码
    verifyCode: '',
    // 倒计时秒数
    countdown: 0,
    // 是否正在发送验证码
    sendingCode: false,
    // 加载状态
    loading: false,
    // 临时 openid
    tempOpenid: '',
    // 用户信息（从登录页传递）
    userInfo: {
      avatarUrl: '',
      nickName: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(): void {
    // 获取临时 openid
    const tempOpenid = storage.get<string>('tempOpenid');
    if (!tempOpenid) {
      wx.showToast({
        title: '参数错误，请重新登录',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.redirectTo({ url: '/pages/login/login' });
          }, 1500);
        }
      });
      return;
    }
    
    // 获取用户信息
    const tempUserInfo = storage.get<any>('tempUserInfo');
    if (tempUserInfo) {
      this.setData({ 
        tempOpenid,
        userInfo: tempUserInfo 
      });
    } else {
      this.setData({ tempOpenid });
    }
  },

  /**
   * 手机号输入
   */
  onPhoneInput(e: WechatMiniprogram.Input): void {
    this.setData({ phone: e.detail.value });
  },

  /**
   * 验证码输入
   */
  onVerifyCodeInput(e: WechatMiniprogram.Input): void {
    this.setData({ verifyCode: e.detail.value });
  },

  /**
   * 发送验证码
   */
  async sendVerifyCode(): Promise<void> {
    const { phone, countdown, sendingCode } = this.data;

    // 检查是否在倒计时中
    if (countdown > 0 || sendingCode) {
      return;
    }

    // 验证手机号
    if (!phone) {
      wx.showToast({ title: '请输入手机号', icon: 'none' });
      return;
    }

    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    try {
      this.setData({ sendingCode: true });

      // TODO: 调用发送验证码接口
      // await authApi.sendVerifyCode({ phone });

      // 模拟发送成功
      wx.showToast({ title: '验证码已发送', icon: 'success' });

      // 开始倒计时
      this.startCountdown();

    } catch (error: any) {
      console.error('发送验证码失败', error);
      wx.showToast({
        title: error.message || '发送失败，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ sendingCode: false });
    }
  },

  /**
   * 开始倒计时
   */
  startCountdown(): void {
    let countdown = 60;
    this.setData({ countdown });

    const timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer);
        this.setData({ countdown: 0 });
      } else {
        this.setData({ countdown });
      }
    }, 1000);
  },

  /**
   * 使用微信手机号快捷绑定
   */
  async getPhoneNumber(e: WechatMiniprogram.ButtonGetPhoneNumber): Promise<void> {
    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
      console.log('用户拒绝授权手机号');
      return;
    }

    try {
      this.setData({ loading: true });

      const result = await authApi.bindPhone({
        openid: this.data.tempOpenid,
        phone: '', // 使用微信加密数据时，phone 可以为空
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      });

      // 绑定成功，保存 token 和用户信息
      this.saveLoginInfo(result);

      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            this.redirectToHome();
          }, 1500);
        }
      });

    } catch (error: any) {
      console.error('绑定手机号失败', error);
      wx.showToast({
        title: error.message || '绑定失败，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 手动绑定手机号
   */
  async handleBindPhone(): Promise<void> {
    const { phone, verifyCode, tempOpenid } = this.data;

    // 验证输入
    if (!phone) {
      wx.showToast({ title: '请输入手机号', icon: 'none' });
      return;
    }

    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    if (!verifyCode) {
      wx.showToast({ title: '请输入验证码', icon: 'none' });
      return;
    }

    try {
      this.setData({ loading: true });

      const result = await authApi.bindPhone({
        openid: tempOpenid,
        phone: phone
      });

      // 绑定成功，保存 token 和用户信息
      this.saveLoginInfo(result);

      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            this.redirectToHome();
          }, 1500);
        }
      });

    } catch (error: any) {
      console.error('绑定手机号失败', error);
      wx.showToast({
        title: error.message || '绑定失败，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 保存登录信息
   */
  saveLoginInfo(result: any): void {
    saveLoginInfo(result.token, result.userInfo, result.expireTime);
    storage.remove('tempOpenid');
    storage.remove('tempUserInfo');
  },

  /**
   * 跳转到首页
   */
  redirectToHome(): void {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  /**
   * 返回登录页
   */
  backToLogin(): void {
    storage.remove('tempOpenid');
    storage.remove('tempUserInfo');
    wx.redirectTo({
      url: '/pages/login/login'
    });
  }
});
