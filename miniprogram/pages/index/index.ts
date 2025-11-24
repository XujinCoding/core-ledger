import { checkAuth, getCurrentUser, logout } from '../../utils/auth';

/**
 * 首页
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null as any
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(): void {
    this.loadUserInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(): void {
    this.loadUserInfo();
  },

  /**
   * 加载用户信息
   */
  loadUserInfo(): void {
    // 检查授权，未授权会自动跳转登录页
    if (!checkAuth()) {
      return;
    }

    // 获取用户信息
    const userInfo = getCurrentUser();
    this.setData({ userInfo });
  },

  /**
   * 退出登录
   */
  handleLogout(): void {
    logout(true);
  }
});
