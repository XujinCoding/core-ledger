/**
 * 商品管理页面
 * 高密度纯文字列表（不显示图片）
 */

import { productApi } from '../../api/modules/index';
import type { ProductListItem } from '../../types';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    products: [] as ProductListItem[],
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
    this.loadProducts();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(): void {
    // 从其他页面返回时刷新列表
    if (this.data.products.length > 0) {
      this.refreshProducts();
    }
  },

  /**
   * 加载商品列表
   */
  async loadProducts(): Promise<void> {
    if (this.data.loading || !this.data.hasMore) return;

    try {
      this.setData({ loading: true });

      const response = await productApi.getProductList({
        page: this.data.page,
        size: this.data.size,
        keyword: this.data.keyword || undefined,
        sort: 'createInstant,desc'
      });

      const newProducts = [...this.data.products, ...response.content];
      const hasMore = !response.last;

      this.setData({
        products: newProducts,
        hasMore,
        page: this.data.page + 1
      });
    } catch (error) {
      console.error('加载商品列表失败', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 刷新商品列表
   */
  async refreshProducts(): Promise<void> {
    try {
      this.setData({
        products: [],
        page: 0,
        hasMore: true
      });

      await this.loadProducts();
    } catch (error) {
      console.error('刷新商品列表失败', error);
    }
  },

  /**
   * 搜索商品
   */
  handleSearch(event: WechatMiniprogram.Input): void {
    const keyword = event.detail.value.trim();
    this.setData({ keyword });
    this.refreshProducts();
  },

  /**
   * 下拉刷新
   */
  async onPullDownRefresh(): Promise<void> {
    await this.refreshProducts();
    wx.stopPullDownRefresh();
  },

  /**
   * 上拉加载更多
   */
  onReachBottom(): void {
    this.loadProducts();
  },

  /**
   * 点击列表项查看商品详情
   */
  handleItemClick(event: WechatMiniprogram.TouchEvent): void {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${id}`
    });
  }
});
