/**
 * 商品分类表单页面
 * 用于新增/编辑分类
 */

import { categoryApi } from '../../api/modules/index';
import type { CreateCategoryRequest, UpdateCategoryRequest } from '../../types';

interface PageData {
  // 表单模式：create-新增, edit-编辑
  mode: 'create' | 'edit';
  // 分类ID（编辑时）
  categoryId?: number;
  // 父分类ID
  parentId: number;
  // 父分类名称
  parentName: string;
  // 表单数据
  formData: {
    name: string;
    sortOrder: number;
    iconUrl: string;
    memo: string;
  };
  // 提交中状态
  submitting: boolean;
}

Page({
  data: {
    mode: 'create',
    categoryId: undefined,
    parentId: 0,
    parentName: '顶级分类',
    formData: {
      name: '',
      sortOrder: 0,
      iconUrl: '',
      memo: ''
    },
    submitting: false
  } as PageData,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: { mode?: string; id?: string; parentId?: string; parentName?: string }): void {
    const mode = (options.mode || 'create') as 'create' | 'edit';
    const categoryId = options.id ? Number(options.id) : undefined;
    const parentId = options.parentId ? Number(options.parentId) : 0;
    const parentName = decodeURIComponent(options.parentName || '顶级分类');

    // 动态设置页面标题
    wx.setNavigationBarTitle({
      title: mode === 'create' ? '新增分类' : '编辑分类'
    });

    this.setData({
      mode,
      categoryId,
      parentId,
      parentName
    });

    // 编辑模式加载数据
    if (mode === 'edit' && categoryId) {
      this.loadCategoryDetail(categoryId);
    }
  },

  /**
   * 加载分类详情
   */
  async loadCategoryDetail(id: number): Promise<void> {
    try {
      wx.showLoading({ title: '加载中...' });
      const category = await categoryApi.getCategoryDetail(id);
      
      this.setData({
        formData: {
          name: category.name,
          sortOrder: category.sortOrder,
          iconUrl: category.iconUrl || '',
          memo: category.memo || ''
        }
      });
    } catch (error) {
      console.error('加载分类详情失败', error);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  /**
   * 输入框值变化
   */
  handleInputChange(event: WechatMiniprogram.Input): void {
    const { field } = event.currentTarget.dataset;
    const { value } = event.detail;
    
    this.setData({
      [`formData.${field}`]: value
    });
  },

  /**
   * 提交表单
   */
  async handleSubmit(): Promise<void> {
    // 表单验证
    const { name } = this.data.formData;
    if (!name.trim()) {
      wx.showToast({
        title: '请输入分类名称',
        icon: 'none'
      });
      return;
    }

    if (name.length > 50) {
      wx.showToast({
        title: '分类名称不能超过50个字符',
        icon: 'none'
      });
      return;
    }

    if (this.data.submitting) return;

    try {
      this.setData({ submitting: true });

      if (this.data.mode === 'create') {
        // 新增分类
        const request: CreateCategoryRequest = {
          parentId: this.data.parentId,
          name: this.data.formData.name.trim(),
          sortOrder: this.data.formData.sortOrder || 0,
          iconUrl: this.data.formData.iconUrl.trim() || undefined,
          memo: this.data.formData.memo.trim() || undefined
        };

        await categoryApi.createCategory(request);
        
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 1500
        });
      } else {
        // 编辑分类
        const request: UpdateCategoryRequest = {
          name: this.data.formData.name.trim(),
          sortOrder: this.data.formData.sortOrder || 0,
          iconUrl: this.data.formData.iconUrl.trim() || undefined,
          memo: this.data.formData.memo.trim() || undefined
        };

        await categoryApi.updateCategory(this.data.categoryId!, request);
        
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 1500
        });
      }

      // 延迟返回，让用户看到成功提示
      // 使用 navigateBack 的 delta 确保返回到列表页
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      }, 1500);
    } catch (error) {
      console.error('提交失败', error);
      // 错误提示已由 API 层处理
    } finally {
      this.setData({ submitting: false });
    }
  },

  /**
   * 取消
   */
  handleCancel(): void {
    // 检查是否有未保存的内容
    const hasContent = this.data.formData.name.trim() !== '' ||
                      this.data.formData.memo.trim() !== '' ||
                      this.data.formData.iconUrl.trim() !== '';
    
    if (hasContent) {
      wx.showModal({
        title: '确认取消',
        content: '当前有未保存的内容，确定要取消吗？',
        success: (res) => {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            });
          }
        }
      });
    } else {
      wx.navigateBack({
        delta: 1
      });
    }
  }
});
