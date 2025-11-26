/**
 * 商品模块 API
 */

import { get, post, put, del } from '../../utils/requestUtil';
import type {
  Product,
  ProductListItem,
  SKUListItem,
  CreateProductRequest,
  UpdateProductRequest,
  SetAttributesRequest,
  GenerateSKUsRequest,
  PageResponse,
  PaginationParams
} from '../../types';

/**
 * 商品 API
 */
export const productApi = {
  /**
   * 查询商品列表
   */
  getProductList(params: Partial<PaginationParams> & {
    keyword?: string;
    categoryId?: number;
  }): Promise<PageResponse<ProductListItem>> {
    return get<PageResponse<ProductListItem>>('/products', params);
  },

  /**
   * 查询商品详情
   */
  getProductDetail(id: number): Promise<Product> {
    return get<Product>(`/products/${id}`);
  },

  /**
   * 查询SKU列表（用于开单选择商品）
   */
  getSKUList(params: Partial<PaginationParams> & {
    keyword?: string;
  }): Promise<PageResponse<SKUListItem>> {
    return get<PageResponse<SKUListItem>>('/products/skus', params);
  },

  /**
   * 创建商品（SPU）
   */
  createProduct(data: CreateProductRequest): Promise<Product> {
    return post<Product>('/products', data, { showLoading: true, loadingText: '创建中...' });
  },

  /**
   * 设置商品属性
   */
  setProductAttributes(id: number, data: SetAttributesRequest): Promise<void> {
    return post<void>(`/products/${id}/attributes`, data, { showLoading: true, loadingText: '设置中...' });
  },

  /**
   * 生成SKU
   */
  generateSKUs(id: number, data: GenerateSKUsRequest): Promise<void> {
    return post<void>(`/products/${id}/skus`, data, { showLoading: true, loadingText: '生成中...' });
  },

  /**
   * 更新商品信息
   */
  updateProduct(id: number, data: UpdateProductRequest): Promise<Product> {
    return put<Product>(`/products/${id}`, data, { showLoading: true, loadingText: '更新中...' });
  },

  /**
   * 删除商品
   */
  deleteProduct(id: number): Promise<void> {
    return del<void>(`/products/${id}`, undefined, { showLoading: true, loadingText: '删除中...' });
  }
};
