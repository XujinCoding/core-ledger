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
    keyword: '',
    /** 搜索类型 */
    searchTypes: [
      { value: 'name', label: '姓名', placeholder: '请输入客户姓名' },
      { value: 'phone', label: '手机号', placeholder: '请输入手机号' }
    ],
    searchTypeIndex: 0,
    /** 筛选相关 */
    filterAddressId: 0,
    filterAddressName: '',
    filterAddressLastName: '',  // 只存储最后一级地址名称
    showAddressPicker: false
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

      const params: any = {
        page: this.data.page,
        size: this.data.size
      };
      
      // 添加搜索关键词（根据选择的搜索类型）
      if (this.data.keyword) {
        const searchType = this.data.searchTypes[this.data.searchTypeIndex].value;
        if (searchType === 'name') {
          params.name = this.data.keyword;
        } else if (searchType === 'phone') {
          params.phone = this.data.keyword;
        }
      }
      
      // 添加地址筛选
      if (this.data.filterAddressId) {
        params.addressId = this.data.filterAddressId;
      }
      
      const response = await customerApi.getCustomerList(params);

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
  handleSearch(event: WechatMiniprogram.CustomEvent): void {
    const { keyword } = event.detail;
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
   * 点击客户卡片
   */
  handleCustomerClick(event: WechatMiniprogram.CustomEvent): void {
    const { customer } = event.detail;
    wx.navigateTo({
      url: `/pages/customer-detail/customer-detail?id=${customer.id}`
    });
  },

  /**
   * 点击客户操作按钮
   */
  handleCustomerAction(event: WechatMiniprogram.CustomEvent): void {
    const { customer } = event.detail;
    
    wx.showActionSheet({
      itemList: ['查看详情', '编辑信息', '拨打电话', '删除'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 查看详情
          wx.navigateTo({
            url: `/pages/customer-detail/customer-detail?id=${customer.id}`
          });
        } else if (res.tapIndex === 1) {
          // 编辑
          wx.navigateTo({
            url: `/pages/customer-form/customer-form?id=${customer.id}`
          });
        } else if (res.tapIndex === 2) {
          // 拨打电话
          wx.makePhoneCall({
            phoneNumber: customer.phone
          });
        } else if (res.tapIndex === 3) {
          // 删除
          this.handleDelete(customer);
        }
      }
    });
  },

  /**
   * 删除客户
   */
  async handleDelete(customer: CustomerListItem): Promise<void> {
    const result = await wx.showModal({
      title: '确认删除',
      content: `确定要删除客户“${customer.name}”吗？\n删除后数据无法恢复！`
    });

    if (!result.confirm) return;

    try {
      await customerApi.deleteCustomer(customer.id);
      wx.showToast({ title: '删除成功', icon: 'success' });
      this.refreshCustomers();
    } catch (error) {
      console.error('删除客户失败', error);
    }
  },

  /**
   * 新增客户
   */
  handleAdd(): void {
    wx.navigateTo({ url: '/pages/customer-form/customer-form' });
  },

  /**
   * 打开地址筛选
   */
  handleAddressFilter(): void {
    this.setData({ showAddressPicker: true });
  },

  /**
   * 地址筛选确认
   */
  handleAddressFilterConfirm(e: WechatMiniprogram.CustomEvent): void {
    const { addressId, addressPath, address } = e.detail;
    // 提取最后一级地址名称
    const lastAddressName = address ? address.name : addressPath.split('').pop() || addressPath;
    this.setData({
      filterAddressId: addressId,
      filterAddressName: addressPath,
      filterAddressLastName: lastAddressName,
      showAddressPicker: false
    });
    // 刷新列表
    this.refreshCustomers();
  },

  /**
   * 关闭地址筛选
   */
  handleAddressFilterClose(): void {
    this.setData({ showAddressPicker: false });
  },

  /**
   * 切换搜索类型
   */
  handleSearchTypeChange(e: WechatMiniprogram.PickerChange): void {
    this.setData({ 
      searchTypeIndex: parseInt(e.detail.value as string),
      keyword: '' // 切换类型时清空关键词
    });
  },

  /**
   * 清除筛选
   */
  handleClearFilter(): void {
    this.setData({
      filterAddressId: 0,
      filterAddressName: '',
      filterAddressLastName: ''
    });
    // 刷新列表
    this.refreshCustomers();
  }
});
