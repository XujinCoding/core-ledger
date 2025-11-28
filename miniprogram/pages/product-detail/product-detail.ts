/**
 * 商品详情页面
 */

import { productApi } from '../../api/modules/index';
import type { Product, ProductSkuVO, SkuPriceItem } from '../../types';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    productId: 0,
    product: null as Product | null,
    loading: false,
    sortedSkus: [] as ProductSkuVO[],
    showBatchPriceModal: false,
    batchPriceSkus: [] as (ProductSkuVO & { tempPrice?: string })[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: Record<string, string | undefined>): void {
    const { id } = options;
    if (id) {
      this.setData({ productId: Number(id) });
      this.loadProductDetail();
    } else {
      wx.showToast({
        title: '商品ID缺失',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(): void {
    // 如果已经加载过商品，重新加载以获取最新数据
    if (this.data.productId && this.data.product) {
      this.loadProductDetail();
    }
  },

  /**
   * 加载商品详情
   */
  async loadProductDetail(): Promise<void> {
    try {
      this.setData({ loading: true });
      
      const product = await productApi.getProductDetail(this.data.productId);
      
      // 对SKU进行排序：未定价的在前面（兼容数字和字符串类型）
      const sortedSkus = product.skus ? [...product.skus].sort((a, b) => {
        const aUnpriced = String(a.priceStatus) === '0';
        const bUnpriced = String(b.priceStatus) === '0';
        
        if (aUnpriced && !bUnpriced) return -1;
        if (!aUnpriced && bUnpriced) return 1;
        return 0;
      }) : [];
      
      this.setData({ 
        product,
        sortedSkus
      });
    } catch (error) {
      console.error('加载商品详情失败', error);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 编辑商品
   */
  handleEdit(): void {
    const { productId } = this.data;
    wx.navigateTo({
      url: `/pages/product-form/product-form?mode=edit&id=${productId}`
    });
  },

  /**
   * 管理商品属性
   */
  handleManageAttrs(): void {
    const { product } = this.data;
    if (!product) return;
    
    wx.navigateTo({
      url: `/pages/product-attrs/product-attrs?id=${product.id}&name=${encodeURIComponent(product.name)}`
    });
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh(): void {
    this.loadProductDetail().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * SKU定价
   */
  handleSkuPrice(event: WechatMiniprogram.TouchEvent): void {
    const sku = event.currentTarget.dataset.sku as ProductSkuVO;
    const currentPrice = sku.price && sku.price > 0 ? sku.price.toString() : '';
    const isPriced = String(sku.priceStatus) === '1';
    
    wx.showModal({
      title: isPriced ? '修改SKU价格' : 'SKU定价',
      editable: true,
      placeholderText: '请输入价格',
      content: currentPrice,
      success: async (res) => {
        if (res.confirm && res.content) {
          const price = parseFloat(res.content);
          
          if (isNaN(price) || price <= 0) {
            wx.showToast({
              title: '请输入有效的价格',
              icon: 'none'
            });
            return;
          }
          
          try {
            await productApi.updateSkuPrice(sku.id, price);
            wx.showToast({
              title: '定价成功',
              icon: 'success'
            });
            // 重新加载商品详情
            this.loadProductDetail();
          } catch (error) {
            console.error('SKU定价失败', error);
          }
        }
      }
    });
  },

  /**
   * 批量定价 - 打开弹窗
   */
  handleBatchPrice(): void {
    const { sortedSkus } = this.data;
    if (!sortedSkus || sortedSkus.length === 0) {
      return;
    }
    
    // 排序：未定价的在前面
    const skusToPrice = sortedSkus.map(sku => ({
      ...sku,
      tempPrice: sku.price > 0 ? sku.price.toString() : ''
    }));
    
    this.setData({
      showBatchPriceModal: true,
      batchPriceSkus: skusToPrice
    });
  },

  /**
   * 关闭批量定价弹窗
   */
  handleCloseBatchPrice(): void {
    this.setData({
      showBatchPriceModal: false,
      batchPriceSkus: []
    });
  },

  /**
   * 批量定价价格输入
   */
  handleBatchPriceInput(event: WechatMiniprogram.Input): void {
    const { index } = event.currentTarget.dataset;
    const { value } = event.detail;
    
    this.setData({
      [`batchPriceSkus[${index}].tempPrice`]: value
    });
  },

  /**
   * 确认批量定价
   */
  async handleConfirmBatchPrice(): Promise<void> {
    const { batchPriceSkus } = this.data;
    
    // 构建定价请求
    const skuPrices: SkuPriceItem[] = [];
    
    for (const sku of batchPriceSkus) {
      if (sku.tempPrice && sku.tempPrice.trim()) {
        const price = parseFloat(sku.tempPrice);
        
        if (isNaN(price) || price <= 0) {
          wx.showToast({
            title: `${sku.skuName} 的价格无效`,
            icon: 'none'
          });
          return;
        }
        
        skuPrices.push({
          skuId: sku.id,
          price
        });
      }
    }
    
    if (skuPrices.length === 0) {
      wx.showToast({
        title: '请至少为一个SKU定价',
        icon: 'none'
      });
      return;
    }
    
    try {
      const count = await productApi.batchUpdateSkuPrice({ skuPrices });
      
      wx.showToast({
        title: `成功定价 ${count} 个SKU`,
        icon: 'success'
      });
      
      // 关闭弹窗
      this.handleCloseBatchPrice();
      
      // 重新加载商品详情
      this.loadProductDetail();
    } catch (error) {
      console.error('批量定价失败', error);
    }
  }
});
