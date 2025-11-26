/**
 * 账单页面（首页）
 * 清新商务风格 - 卡片列表展示
 */

import { ledgerApi } from '../../api/modules/index';
import type { LedgerListItem } from '../../types';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ledgers: [] as LedgerListItem[],
    loading: false,
    hasMore: true,
    page: 0,
    size: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(): void {
    this.loadLedgers();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(): void {
    // 从其他页面返回时刷新列表
    if (this.data.ledgers.length > 0) {
      this.refreshLedgers();
    }
  },

  /**
   * 加载账单列表
   */
  async loadLedgers(): Promise<void> {
    if (this.data.loading || !this.data.hasMore) return;

    try {
      this.setData({ loading: true });

      const response = await ledgerApi.getLedgerList({
        page: this.data.page,
        size: this.data.size,
        sort: 'createInstant,desc'
      });

      const newLedgers = [...this.data.ledgers, ...response.content];
      const hasMore = !response.last;

      this.setData({
        ledgers: newLedgers,
        hasMore,
        page: this.data.page + 1
      });
    } catch (error) {
      console.error('加载账单列表失败', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 刷新账单列表
   */
  async refreshLedgers(): Promise<void> {
    try {
      this.setData({
        ledgers: [],
        page: 0,
        hasMore: true
      });

      await this.loadLedgers();
    } catch (error) {
      console.error('刷新账单列表失败', error);
    }
  },

  /**
   * 下拉刷新
   */
  async onPullDownRefresh(): Promise<void> {
    await this.refreshLedgers();
    wx.stopPullDownRefresh();
  },

  /**
   * 上拉加载更多
   */
  onReachBottom(): void {
    this.loadLedgers();
  },

  /**
   * 点击卡片查看账单详情
   */
  handleCardClick(event: WechatMiniprogram.TouchEvent): void {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/ledger-detail/ledger-detail?id=${id}`
    });
  },

  /**
   * 点击 FAB 按钮创建账单
   */
  handleCreateLedger(): void {
    wx.navigateTo({
      url: '/pages/ledger-create/ledger-create'
    });
  },

  /**
   * 格式化金额显示
   */
  formatAmount(amount: number): string {
    return amount.toFixed(2);
  }
});
