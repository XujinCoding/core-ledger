/**
 * 客户表单页面
 * 用于新增和编辑客户
 */

import { customerApi } from '../../api/modules/index';
import type { Customer, CreateCustomerRequest, UpdateCustomerRequest, UpdateCustomerAddressRequest } from '../../types';

interface FormData {
  name: string;
  alias: string;
  phone: string;
  gender: string;
  age: string;
  addressId: number | null;
  addressPath: string;
  addressDetail: string;
  customerType: string;
  memo: string;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /** 客户ID（编辑模式） */
    customerId: 0,
    /** 是否编辑模式 */
    isEdit: false,
    /** 表单数据 */
    form: {
      name: '',
      alias: '',
      phone: '',
      gender: '1',  // 默认男
      age: '',
      addressId: null,
      addressPath: '',
      addressDetail: '',
      customerType: '1',  // 默认活跃客户
      memo: ''
    } as FormData,
    /** 原始地址信息（用于编辑时比较） */
    originalAddress: {
      addressId: null as number | null,
      addressDetail: '' as string
    },
    /** 加载中 */
    loading: false,
    /** 是否显示地址选择器 */
    showAddressPicker: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: Record<string, string>): void {
    if (options.id) {
      const customerId = parseInt(options.id);
      this.setData({
        customerId,
        isEdit: true
      });
      wx.setNavigationBarTitle({ title: '编辑客户' });
      this.loadCustomerDetail(customerId);
    } else {
      wx.setNavigationBarTitle({ title: '新增客户' });
    }
  },

  /**
   * 加载客户详情
   */
  async loadCustomerDetail(id: number): Promise<void> {
    try {
      this.setData({ loading: true });
      const customer: Customer = await customerApi.getCustomerDetail(id);
      
      this.setData({
        form: {
          name: customer.name || '',
          alias: customer.alias || '',
          phone: customer.phone || '',
          gender: String(customer.gender) || '0',
          age: customer.age ? String(customer.age) : '',
          addressId: customer.addressId || null,
          addressPath: customer.addressPath || '',
          addressDetail: customer.addressDetail || '',
          customerType: String(customer.customerType) || '1',
          memo: customer.memo || ''
        },
        // 保存原始地址信息
        originalAddress: {
          addressId: customer.addressId || null,
          addressDetail: customer.addressDetail || ''
        }
      });
    } catch (error) {
      console.error('加载客户详情失败', error);
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 输入框变化
   */
  handleInputChange(event: WechatMiniprogram.Input): void {
    const { field } = event.currentTarget.dataset;
    const { value } = event.detail;
    this.setData({
      [`form.${field}`]: value
    });
  },

  /**
   * 性别变化
   */
  handleGenderChange(event: WechatMiniprogram.RadioGroupChange): void {
    this.setData({
      'form.gender': event.detail.value
    });
  },

  /**
   * 客户类型变化
   */
  handleTypeChange(event: WechatMiniprogram.RadioGroupChange): void {
    this.setData({
      'form.customerType': event.detail.value
    });
  },

  /**
   * 打开地址选择器
   */
  handleAddressSelect(): void {
    this.setData({ showAddressPicker: true });
  },

  /**
   * 地址选择器确认
   */
  handleAddressConfirm(e: WechatMiniprogram.CustomEvent): void {
    const { addressId, addressPath } = e.detail;
    this.setData({
      'form.addressId': addressId,
      'form.addressPath': addressPath,
      showAddressPicker: false
    });
  },

  /**
   * 地址选择器关闭
   */
  handleAddressClose(): void {
    this.setData({ showAddressPicker: false });
  },

  /**
   * 表单验证
   */
  validateForm(): boolean {
    const { form } = this.data;

    if (!form.name.trim()) {
      wx.showToast({ title: '请输入客户姓名', icon: 'none' });
      return false;
    }

    if (!form.phone.trim()) {
      wx.showToast({ title: '请输入手机号', icon: 'none' });
      return false;
    }

    if (!/^1\d{10}$/.test(form.phone)) {
      wx.showToast({ title: '手机号格式不正确', icon: 'none' });
      return false;
    }

    if (!form.addressId) {
      wx.showToast({ title: '请选择地址（至少到区县级）', icon: 'none' });
      return false;
    }

    if (form.age && (parseInt(form.age) < 0 || parseInt(form.age) > 150)) {
      wx.showToast({ title: '年龄范围应为0-150', icon: 'none' });
      return false;
    }

    return true;
  },

  /**
   * 提交表单
   */
  async handleSubmit(): Promise<void> {
    if (!this.validateForm()) return;

    const { form, isEdit, customerId, originalAddress } = this.data;

    try {
      this.setData({ loading: true });

      if (isEdit) {
        // 编辑模式
        const updateData: UpdateCustomerRequest = {
          name: form.name,
          alias: form.alias || undefined,
          phone: form.phone,
          gender: form.gender,
          age: form.age ? parseInt(form.age) : undefined,
          customerType: form.customerType,
          memo: form.memo || undefined
        };

        // 更新基本信息
        await customerApi.updateCustomer(customerId, updateData);

        // 检查地址是否有变化
        const addressChanged = 
          form.addressId !== originalAddress.addressId || 
          (form.addressDetail || '') !== (originalAddress.addressDetail || '');

        if (addressChanged && form.addressId) {
          // 地址有变化，单独调用更新地址接口
          const addressData: UpdateCustomerAddressRequest = {
            addressId: form.addressId,
            addressDetail: form.addressDetail || undefined
          };
          await customerApi.updateCustomerAddress(customerId, addressData);
        }

        wx.showToast({ title: '更新成功', icon: 'success' });
      } else {
        // 新增模式
        const createData: CreateCustomerRequest = {
          name: form.name,
          alias: form.alias || undefined,
          phone: form.phone,
          gender: form.gender,
          age: form.age ? parseInt(form.age) : undefined,
          addressId: form.addressId!,
          addressDetail: form.addressDetail || undefined,
          customerType: form.customerType,
          memo: form.memo || undefined
        };

        await customerApi.createCustomer(createData);
        wx.showToast({ title: '创建成功', icon: 'success' });
      }

      // 返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    } catch (error) {
      console.error('保存客户失败', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 取消
   */
  handleCancel(): void {
    wx.showModal({
      title: '提示',
      content: '确定要放弃当前编辑吗？',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    });
  }
});
