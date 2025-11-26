/**
 * 客户管理页面
 * 通讯录式列表
 */

import { customerApi } from '../../api/modules/index';
import type { CustomerListItem } from '../../types';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    customers: [] as CustomerListItem[],
    loading: false,
    hasMore: true,
    page: 0,
    size: 20,
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(): void {
    this.loadCustomers();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(): void {
    // 从其他页面返回时刷新列表
    if (this.data.customers.length > 0) {
      this.refreshCustomers();
    }
  },

  /**
   * 加载客户列表
   */
  async loadCustomers(): Promise<void> {
    if (this.data.loading || !this.data.hasMore) return;

    try {
      this.setData({ loading: true });

      const response = await customerApi.getCustomerList({
        page: this.data.page,
        size: this.data.size,
        keyword: this.data.keyword || undefined,
        sort: 'createInstant,desc'
      });

      const newCustomers = [...this.data.customers, ...response.content];
      const hasMore = !response.last;

      this.setData({
        customers: newCustomers,
        hasMore,
        page: this.data.page + 1
      });
    } catch (error) {
      console.error('加载客户列表失败', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 刷新客户列表
   */
  async refreshCustomers(): Promise<void> {
    try {
      this.setData({
        customers: [],
        page: 0,
        hasMore: true
      });

      await this.loadCustomers();
    } catch (error) {
      console.error('刷新客户列表失败', error);
    }
  },

  /**
   * 搜索客户
   */
  handleSearch(event: WechatMiniprogram.Input): void {
    const keyword = event.detail.value.trim();
    this.setData({ keyword });
    this.refreshCustomers();
  },

  /**
   * 下拉刷新
   */
  async onPullDownRefresh(): Promise<void> {
    await this.refreshCustomers();
    wx.stopPullDownRefresh();
  },

  /**
   * 上拉加载更多
   */
  onReachBottom(): void {
    this.loadCustomers();
  },

  /**
   * 点击列表项查看客户详情
   */
  handleItemClick(event: WechatMiniprogram.TouchEvent): void {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/customer-detail/customer-detail?id=${id}`
    });
  }
});
