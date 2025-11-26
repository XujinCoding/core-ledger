/**
 * 我的页面（个人中心）
 * 标准小程序个人中心风格
 */

import { storage } from '../../utils/storage';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickname: '商户名称',
      avatar: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(): void {
    this.loadUserInfo();
  },

  /**
   * 加载用户信息
   */
  loadUserInfo(): void {
    // 从本地存储获取用户信息
    const userInfo = storage.get('userInfo');
    if (userInfo) {
      this.setData({ userInfo });
    }
  },

  /**
   * 跳转到设置页面
   */
  handleSettings(): void {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  /**
   * 跳转到关于我们页面
   */
  handleAbout(): void {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  /**
   * 退出登录
   */
  handleLogout(): void {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储
          storage.clear();

          // 跳转到登录页
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    });
  }
});
