/**
 * 客户详情页面
 * 展示客户完整信息
 */

import { customerApi } from '../../api/modules/index';
import type { Customer } from '../../types';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /** 客户ID */
    customerId: 0,
    /** 客户详情 */
    customer: null as Customer | null,
    /** 加载中 */
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: Record<string, string>): void {
    if (options.id) {
      const customerId = parseInt(options.id);
      this.setData({ customerId });
      this.loadCustomerDetail(customerId);
    } else {
      wx.showToast({ 
        title: '客户ID无效', 
        icon: 'none',
        complete: () => {
          wx.navigateBack();
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(): void {
    // 从编辑页面返回时刷新数据
    if (this.data.customerId && this.data.customer) {
      this.loadCustomerDetail(this.data.customerId);
    }
  },

  /**
   * 加载客户详情
   */
  async loadCustomerDetail(id: number): Promise<void> {
    try {
      this.setData({ loading: true });
      const customer: Customer = await customerApi.getCustomerDetail(id);
      this.setData({ customer });
    } catch (error) {
      console.error('加载客户详情失败', error);
      wx.showToast({ 
        title: '加载失败', 
        icon: 'none',
        complete: () => {
          wx.navigateBack();
        }
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 编辑客户
   */
  handleEdit(): void {
    wx.navigateTo({
      url: `/pages/customer-form/customer-form?id=${this.data.customerId}`
    });
  },

  /**
   * 拨打电话
   */
  handleCall(): void {
    if (this.data.customer?.phone) {
      wx.makePhoneCall({
        phoneNumber: this.data.customer.phone
      });
    }
  },

  /**
   * 修改地址
   */
  handleEditAddress(): void {
    // TODO: 实现地址修改功能
    wx.showToast({ 
      title: '地址修改功能待实现', 
      icon: 'none' 
    });
  },

  /**
   * 删除客户
   */
  async handleDelete(): Promise<void> {
    const customer = this.data.customer;
    if (!customer) return;

    const result = await wx.showModal({
      title: '确认删除',
      content: `确定要删除客户"${customer.name}"吗？\n删除后数据无法恢复！`
    });

    if (!result.confirm) return;

    try {
      await customerApi.deleteCustomer(customer.id);
      wx.showToast({ 
        title: '删除成功', 
        icon: 'success',
        complete: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    } catch (error) {
      console.error('删除客户失败', error);
    }
  }
});
