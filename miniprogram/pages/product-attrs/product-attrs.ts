/**
 * 商品属性配置页面
 */

import { productApi } from '../../api/modules/index';
import type { ProductAttrVO } from '../../types';

interface AttrValue {
  id?: number;
  value: string;
  sortOrder: number;
}

interface AttrItem {
  id?: number;
  attrName: string;
  sortOrder: number;
  values: AttrValue[];
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    productId: 0,
    productName: '',
    attrs: [] as AttrItem[],
    showValueModal: false,
    tempValue: '',
    currentAttrIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: Record<string, string | undefined>): void {
    const { id, name } = options;
    
    if (!id) {
      wx.showToast({
        title: '商品ID缺失',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }
    
    this.setData({
      productId: Number(id),
      productName: name ? decodeURIComponent(name) : '未知商品'
    });
    
    // 加载现有属性
    this.loadProductAttrs();
  },

  /**
   * 加载商品属性
   */
  async loadProductAttrs(): Promise<void> {
    try {
      const attrs = await productApi.getProductAttrs(this.data.productId);
      
      // 转换为页面数据格式
      const formattedAttrs: AttrItem[] = attrs.map(attr => ({
        id: attr.id,
        attrName: attr.attrName,
        sortOrder: attr.sortOrder,
        values: attr.values.map(v => ({
          id: v.id,
          value: v.value,
          sortOrder: v.sortOrder
        }))
      }));
      
      this.setData({ attrs: formattedAttrs });
    } catch (error) {
      console.error('加载属性失败', error);
      // 如果是新商品，没有属性是正常的
      this.setData({ attrs: [] });
    }
  },

  /**
   * 添加属性
   */
  handleAddAttr(): void {
    const { attrs } = this.data;
    
    this.setData({
      attrs: [...attrs, {
        attrName: '',
        sortOrder: attrs.length,
        values: []
      }]
    });
  },

  /**
   * 删除属性
   */
  handleDeleteAttr(event: WechatMiniprogram.TouchEvent): void {
    const { index } = event.currentTarget.dataset;
    const { attrs } = this.data;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个属性吗？',
      success: (res) => {
        if (res.confirm) {
          attrs.splice(index, 1);
          this.setData({ attrs });
        }
      }
    });
  },

  /**
   * 属性名称输入
   */
  handleAttrNameInput(event: WechatMiniprogram.Input): void {
    const { index } = event.currentTarget.dataset;
    const { value } = event.detail;
    
    this.setData({
      [`attrs[${index}].attrName`]: value
    });
  },

  /**
   * 添加属性值
   */
  handleAddAttrValue(event: WechatMiniprogram.TouchEvent): void {
    const { index } = event.currentTarget.dataset;
    
    this.setData({
      showValueModal: true,
      currentAttrIndex: index,
      tempValue: ''
    });
  },

  /**
   * 删除属性值
   */
  handleDeleteAttrValue(event: WechatMiniprogram.TouchEvent): void {
    const { attrIndex, valueIndex } = event.currentTarget.dataset;
    const { attrs } = this.data;
    
    attrs[attrIndex].values.splice(valueIndex, 1);
    this.setData({ attrs });
  },

  /**
   * 临时值输入
   */
  handleTempValueInput(event: WechatMiniprogram.Input): void {
    this.setData({
      tempValue: event.detail.value
    });
  },

  /**
   * 确认添加属性值
   */
  handleConfirmValue(): void {
    const { tempValue, currentAttrIndex, attrs } = this.data;
    
    if (!tempValue || !tempValue.trim()) {
      wx.showToast({
        title: '请输入属性值',
        icon: 'none'
      });
      return;
    }
    
    const values = attrs[currentAttrIndex].values;
    
    // 检查是否重复
    if (values.some(v => v.value === tempValue.trim())) {
      wx.showToast({
        title: '属性值已存在',
        icon: 'none'
      });
      return;
    }
    
    values.push({
      value: tempValue.trim(),
      sortOrder: values.length
    });
    
    this.setData({
      attrs,
      showValueModal: false,
      tempValue: ''
    });
  },

  /**
   * 关闭弹窗
   */
  handleCloseValueModal(): void {
    this.setData({
      showValueModal: false,
      tempValue: ''
    });
  },

  /**
   * 表单验证
   */
  validateForm(): boolean {
    const { attrs } = this.data;
    
    if (attrs.length === 0) {
      wx.showToast({
        title: '请至少添加一个属性',
        icon: 'none'
      });
      return false;
    }
    
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i];
      
      if (!attr.attrName || !attr.attrName.trim()) {
        wx.showToast({
          title: `请输入属性${i + 1}的名称`,
          icon: 'none'
        });
        return false;
      }
      
      if (attr.values.length === 0) {
        wx.showToast({
          title: `请为"${attr.attrName}"添加至少一个属性值`,
          icon: 'none'
        });
        return false;
      }
    }
    
    return true;
  },

  /**
   * 保存
   */
  async handleSave(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }
    
    try {
      const { productId, attrs } = this.data;
      
      // 转换为API格式
      const apiAttrs: ProductAttrVO[] = attrs.map((attr, index) => ({
        id: attr.id,
        productId,
        attrName: attr.attrName.trim(),
        sortOrder: index,
        values: attr.values.map((value, valueIndex) => ({
          id: value.id,
          productAttrId: attr.id || 0,
          value: value.value,
          sortOrder: valueIndex
        }))
      }));
      
      await productApi.batchUpdateProductAttrs(productId, apiAttrs);
      
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    } catch (error) {
      console.error('保存属性失败', error);
    }
  },

  /**
   * 取消
   */
  handleCancel(): void {
    wx.showModal({
      title: '提示',
      content: '确定要放弃当前修改吗？',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    });
  }
});
