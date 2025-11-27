/**
 * 商品表单页面
 * 用于新增和编辑商品基本信息
 */

import { productApi, categoryApi } from '../../api/modules/index';
import type { CreateProductRequest, UpdateProductRequest, CategoryTreeVO } from '../../types';

interface FormData {
  name: string;
  categoryId?: number;
  categoryName?: string;
  imageUrl?: string;
  description?: string;
  price?: number;
  spec?: string;
  unit: string;
  location?: string;
  memo?: string;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 表单模式：create-新增，edit-编辑
    mode: 'create' as 'create' | 'edit',
    // 商品ID（编辑模式）
    productId: 0,
    // 表单数据
    form: {
      name: '',
      categoryId: undefined,
      categoryName: '',
      imageUrl: '',
      description: '',
      price: undefined,
      spec: '',
      unit: '',
      location: '',
      memo: ''
    } as FormData,
    // 分类数据
    categories: [] as CategoryTreeVO[],
    showCategoryPicker: false,
    // 提交状态
    submitting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: Record<string, string | undefined>): void {
    const { id, mode } = options;
    
    // 加载分类数据
    this.loadCategories();
    
    // 如果是编辑模式，加载商品信息
    if (mode === 'edit' && id) {
      this.setData({
        mode: 'edit',
        productId: Number(id)
      });
      wx.setNavigationBarTitle({ title: '编辑商品' });
      this.loadProductDetail(Number(id));
    } else {
      this.setData({ mode: 'create' });
      wx.setNavigationBarTitle({ title: '新增商品' });
    }
  },

  /**
   * 加载分类数据
   */
  async loadCategories(): Promise<void> {
    try {
      const categories = await categoryApi.getCategoryTree();
      this.setData({ categories });
    } catch (error) {
      console.error('加载分类失败', error);
    }
  },

  /**
   * 加载商品详情
   */
  async loadProductDetail(id: number): Promise<void> {
    try {
      wx.showLoading({ title: '加载中...', mask: true });
      const product = await productApi.getProductDetail(id);
      
      this.setData({
        form: {
          name: product.name,
          categoryId: product.categoryId,
          categoryName: product.categoryName,
          imageUrl: product.imageUrl || '',
          description: product.description || '',
          price: product.price,
          spec: product.spec || '',
          unit: product.unit,
          location: product.location || '',
          memo: product.memo || ''
        }
      });
    } catch (error) {
      console.error('加载商品详情失败', error);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  /**
   * 输入框变化
   */
  handleInput(event: WechatMiniprogram.Input): void {
    const { field } = event.currentTarget.dataset;
    const { value } = event.detail;
    
    this.setData({
      [`form.${field}`]: value
    });
  },

  /**
   * 打开分类选择器
   */
  handleSelectCategory(): void {
    this.setData({ showCategoryPicker: true });
  },

  /**
   * 分类选择确认
   */
  handleCategoryConfirm(event: WechatMiniprogram.CustomEvent): void {
    const { categoryId, categoryName } = event.detail;
    this.setData({
      'form.categoryId': categoryId,
      'form.categoryName': categoryName,
      showCategoryPicker: false
    });
  },

  /**
   * 关闭分类选择器
   */
  handleCategoryClose(): void {
    this.setData({ showCategoryPicker: false });
  },

  /**
   * 表单验证
   */
  validateForm(): boolean {
    const { name, categoryId, unit, price } = this.data.form;

    if (!name || !name.trim()) {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      });
      return false;
    }

    if (!categoryId) {
      wx.showToast({
        title: '请选择商品分类',
        icon: 'none'
      });
      return false;
    }

    if (!unit || !unit.trim()) {
      wx.showToast({
        title: '请输入计量单位',
        icon: 'none'
      });
      return false;
    }

    if (!price || price <= 0) {
      wx.showToast({
        title: '请输入有效的标准价格',
        icon: 'none'
      });
      return false;
    }

    return true;
  },

  /**
   * 提交表单
   */
  async handleSubmit(): Promise<void> {
    // 验证表单
    if (!this.validateForm()) {
      return;
    }

    // 防止重复提交
    if (this.data.submitting) {
      return;
    }

    this.setData({ submitting: true });

    try {
      const { form, mode, productId } = this.data;
      
      if (mode === 'create') {
        // 新增商品
        const request: CreateProductRequest = {
          categoryId: form.categoryId!,
          name: form.name.trim(),
          price: form.price!,
          unit: form.unit.trim(),
          imageUrl: form.imageUrl?.trim(),
          description: form.description?.trim(),
          spec: form.spec?.trim(),
          location: form.location?.trim(),
          memo: form.memo?.trim()
        };

        const product = await productApi.createProduct(request);
        
        wx.showToast({
          title: '创建成功',
          icon: 'success'
        });

        // 询问是否配置商品属性
        setTimeout(() => {
          wx.showModal({
            title: '提示',
            content: '是否配置商品属性？配置后可生成多个SKU规格',
            confirmText: '去配置',
            cancelText: '暂不配置',
            success: (res) => {
              if (res.confirm) {
                // 跳转到商品属性配置页面
                wx.redirectTo({
                  url: `/pages/product-attrs/product-attrs?id=${product.id}&name=${encodeURIComponent(product.name)}`
                });
              } else {
                // 返回商品列表
                wx.navigateBack();
              }
            }
          });
        }, 1500);

      } else {
        // 编辑商品
        const request: UpdateProductRequest = {
          name: form.name.trim(),
          imageUrl: form.imageUrl?.trim(),
          description: form.description?.trim(),
          price: form.price,
          spec: form.spec?.trim(),
          unit: form.unit.trim(),
          location: form.location?.trim(),
          memo: form.memo?.trim()
        };

        await productApi.updateProduct(productId, request);
        
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });

        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    } catch (error) {
      console.error('保存商品失败', error);
    } finally {
      this.setData({ submitting: false });
    }
  },

  /**
   * 取消
   */
  handleCancel(): void {
    // 检查是否有未保存的修改
    const hasChanges = this.data.form.name || this.data.form.categoryId || this.data.form.unit;
    
    if (hasChanges) {
      wx.showModal({
        title: '提示',
        content: '确定要放弃当前修改吗？',
        success: (res) => {
          if (res.confirm) {
            wx.navigateBack();
          }
        }
      });
    } else {
      wx.navigateBack();
    }
  }
});
