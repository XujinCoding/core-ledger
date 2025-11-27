/**
 * 商品模块 API
 * 根据API文档更新
 */

import { get, post, put, del } from '../../utils/requestUtil';
import type {
  Product,
  ProductListItem,
  SKUListItem,
  CreateProductRequest,
  UpdateProductRequest,
  ProductAttrVO,
  ProductSkuVO,
  SkuPriceUpdateDTO,
  PageResponse,
  PaginationParams
} from '../../types';

/**
 * 商品 API
 */
export const productApi = {
  /**
   * 获取商品列表
   * GET /products
   * @param params 查询参数：keyword, categoryId, page, size, sort
   * @returns 分页商品列表
   */
  getProductList(params: Partial<PaginationParams> & {
    keyword?: string;
    categoryId?: number;
  }): Promise<PageResponse<ProductListItem>> {
    return get<PageResponse<ProductListItem>>('/products', params);
  },

  /**
   * 获取商品详情（含属性和SKU）
   * GET /products/{id}
   * @param id 商品ID
   * @returns 商品完整信息
   */
  getProductDetail(id: number): Promise<Product> {
    return get<Product>(`/products/${id}`);
  },

  /**
   * 查询SKU列表（用于开单选择商品）
   * GET /products/skus
   * @param params 查询参数
   * @returns SKU列表
   */
  getSKUList(params: Partial<PaginationParams> & {
    keyword?: string;
  }): Promise<PageResponse<SKUListItem>> {
    return get<PageResponse<SKUListItem>>('/products/skus', params);
  },

  /**
   * 创建商品
   * POST /products
   * @param data 商品创建请求（必填：categoryId, name, price, unit）
   * @returns 创建的商品信息
   */
  createProduct(data: CreateProductRequest): Promise<Product> {
    return post<Product>('/products', data, { 
      showLoading: true, 
      loadingText: '创建中...' 
    });
  },

  /**
   * 修改商品基本信息
   * PUT /products/{id}
   * @param id 商品ID
   * @param data 商品更新请求（必填：name）
   * @returns 更新后的商品信息
   */
  updateProduct(id: number, data: UpdateProductRequest): Promise<Product> {
    return put<Product>(`/products/${id}`, data, { 
      showLoading: true, 
      loadingText: '更新中...' 
    });
  },

  /**
   * 删除商品
   * DELETE /products/{id}
   * @param id 商品ID
   */
  deleteProduct(id: number): Promise<void> {
    return del<void>(`/products/${id}`, undefined, { 
      showLoading: true, 
      loadingText: '删除中...' 
    });
  },

  /**
   * 启用/禁用商品
   * PUT /products/{id}/status
   * @param id 商品ID
   * @param status 状态：0=禁用, 1=启用
   */
  updateProductStatus(id: number, status: '0' | '1'): Promise<void> {
    return put<void>(`/products/${id}/status`, { status }, { 
      showLoading: true 
    });
  },

  /**
   * 获取商品属性
   * GET /products/{id}/attrs
   * @param id 商品ID
   * @returns 商品属性列表
   */
  getProductAttrs(id: number): Promise<ProductAttrVO[]> {
    return get<ProductAttrVO[]>(`/products/${id}/attrs`);
  },

  /**
   * 批量更新商品属性（推荐）
   * PUT /products/{id}/attrs/batch
   * @param id 商品ID
   * @param attrs 属性列表（新增的无id，修改的保留id，删除的不传）
   */
  batchUpdateProductAttrs(id: number, attrs: ProductAttrVO[]): Promise<void> {
    return put<void>(`/products/${id}/attrs/batch`, { attrs }, { 
      showLoading: true, 
      loadingText: '保存中...' 
    });
  },

  /**
   * 修改单个SKU价格
   * PUT /skus/{id}/price?price=xxx
   * @param id SKU ID
   * @param price 价格（必须>0）
   * @returns 更新后的SKU信息
   */
  updateSkuPrice(id: number, price: number): Promise<ProductSkuVO> {
    return put<ProductSkuVO>(`/skus/${id}/price?price=${price}`, null, {
      showLoading: true,
      loadingText: '定价中...'
    });
  },

  /**
   * 批量定价SKU
   * PUT /skus/batch-price
   * @param data SKU批量定价请求
   * @returns 成功定价的SKU数量
   */
  batchUpdateSkuPrice(data: SkuPriceUpdateDTO): Promise<number> {
    return put<number>('/skus/batch-price', data, {
      showLoading: true,
      loadingText: '批量定价中...'
    });
  }
};
