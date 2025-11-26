import { authApi } from '../../api/modules/auth';
import { saveLoginInfo } from '../../utils/auth';
import { storage } from '../../utils/storage';

/**
 * 完善信息页面
 */
Page({
  data: {
    // 手机号（必填）
    phone: '',
    // 用户昵称
    nickname: '',
    // 用户头像
    avatarUrl: '',
    // 加载状态
    loading: false,
    // 是否支持头像选择
    canIUseChooseAvatar: wx.canIUse('button.open-type.chooseAvatar')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(): void {
    // 检查是否有临时登录数据
    const tempLoginData = storage.get<any>('tempLoginData');
    if (!tempLoginData) {
      wx.showToast({
        title: '登录信息已过期，请重新登录',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.redirectTo({ url: '/pages/login/login' });
          }, 1500);
        }
      });
    }
  },

  /**
   * 输入手机号
   */
  onPhoneInput(e: WechatMiniprogram.Input): void {
    const phone = e.detail.value.trim();
    this.setData({ phone });
  },

  /**
   * 选择头像
   */
  onChooseAvatar(e: any): void {
    const { avatarUrl } = e.detail;
    this.setData({ avatarUrl });
  },

  /**
   * 输入昵称
   */
  onNicknameInput(e: WechatMiniprogram.Input): void {
    const nickname = e.detail.value.trim();
    this.setData({ nickname });
  },

  /**
   * 跳过，使用默认昵称（手机号必填）
   */
  async handleSkip(): Promise<void> {
    const { phone } = this.data;
    
    // 验证手机号
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }

    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    
    // 生成随机昵称：用户_12345
    const randomNum = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const defaultNickname = `用户_${randomNum}`;
    
    await this.completeLogin(phone, defaultNickname, '');
  },

  /**
   * 完成登录
   */
  async handleComplete(): Promise<void> {
    const { phone, nickname, avatarUrl } = this.data;
    
    // 验证手机号
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }

    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    
    if (!nickname || nickname.trim() === '') {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return;
    }

    await this.completeLogin(phone, nickname, avatarUrl);
  },

  /**
   * 完成登录（调用后端接口）
   */
  async completeLogin(phone: string, nickname: string, avatarUrl: string): Promise<void> {
    try {
      this.setData({ loading: true });

      // 获取临时登录数据
      const tempLoginData = storage.get<any>('tempLoginData');
      if (!tempLoginData) {
        wx.showToast({
          title: '登录信息已过期，请重新登录',
          icon: 'none'
        });
        return;
      }

      // 构建请求数据
      const requestData = {
        openid: tempLoginData.tempOpenid,
        phone: phone,
        nickname: nickname,
        avatarUrl: avatarUrl || undefined
      };

      let result;
      
      // 根据 isNewUser 标志位判断调用哪个接口
      if (tempLoginData.isNewUser) {
        // 新用户，调用注册接口
        console.log('调用注册接口');
        result = await authApi.registerUser(requestData);
      } else if (tempLoginData.needSupplement) {
        // 已存在用户，调用补充信息接口
        console.log('调用补充信息接口');
        result = await authApi.supplementUserInfo(requestData);
      } else {
        // 理论上不应该到这里
        wx.showToast({
          title: '登录状态异常，请重新登录',
          icon: 'none'
        });
        return;
      }

      // 清除临时数据
      storage.remove('tempLoginData');

      // 保存登录信息
      saveLoginInfo(result.token, result.userInfo, result.expireTime);

      // 跳转到首页
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/ledger/ledger'
            });
          }, 1500);
        }
      });

    } catch (error: any) {
      console.error('登录失败', error);
      wx.showToast({
        title: error.message || '登录失败，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  }
});
