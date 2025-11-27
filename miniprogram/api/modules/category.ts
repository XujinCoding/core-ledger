/**
 * 商品分类模块 API
 */

import { get, post, put, del } from '../../utils/requestUtil';
import type {
  CategoryVO,
  CategoryTreeVO,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  PageResponse,
  PaginationParams
} from '../../types';

/**
 * 分类 API
 */
export const categoryApi = {
  /**
   * 获取分类树
   */
  getCategoryTree(): Promise<CategoryTreeVO[]> {
    return get<CategoryTreeVO[]>('/categories/tree');
  },

  /**
   * 获取分类列表（分页）
   */
  getCategoryList(params?: Partial<PaginationParams> & {
    keyword?: string;
    parentId?: number;
  }): Promise<PageResponse<CategoryVO>> {
    return get<PageResponse<CategoryVO>>('/categories', params);
  },

  /**
   * 获取分类详情
   */
  getCategoryDetail(id: number): Promise<CategoryVO> {
    return get<CategoryVO>(`/categories/${id}`);
  },

  /**
   * 获取子分类列表
   */
  getChildCategories(id: number): Promise<CategoryVO[]> {
    return get<CategoryVO[]>(`/categories/${id}/children`);
  },

  /**
   * 创建分类
   */
  createCategory(data: CreateCategoryRequest): Promise<CategoryVO> {
    return post<CategoryVO>('/categories', data, { 
      showLoading: true, 
      loadingText: '创建中...' 
    });
  },

  /**
   * 更新分类
   */
  updateCategory(id: number, data: UpdateCategoryRequest): Promise<CategoryVO> {
    return put<CategoryVO>(`/categories/${id}`, data, { 
      showLoading: true, 
      loadingText: '更新中...' 
    });
  },

  /**
   * 删除分类
   */
  deleteCategory(id: number): Promise<void> {
    return del<void>(`/categories/${id}`, undefined, { 
      showLoading: true, 
      loadingText: '删除中...' 
    });
  },

  /**
   * 移动分类
   */
  moveCategory(id: number, newParentId: number): Promise<CategoryVO> {
    return put<CategoryVO>(`/categories/${id}/move?newParentId=${newParentId}`, undefined, { 
      showLoading: true, 
      loadingText: '移动中...' 
    });
  }
};
