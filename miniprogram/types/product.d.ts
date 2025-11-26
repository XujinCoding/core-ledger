/**
 * 商品模块类型定义
 */

/**
 * 商品属性
 */
export interface ProductAttribute {
  id: number;
  attrName: string;
  attrValues: string[];
}

/**
 * 商品SKU
 */
export interface ProductSKU {
  id: number;
  skuName: string;
  attrValueMap: Record<string, string>;
  price: number;
  imageUrl?: string;
}

/**
 * 商品详情（SPU）
 */
export interface Product {
  id: number;
  categoryId: number;
  categoryName?: string;
  name: string;
  imageUrl?: string;
  description?: string;
  unit: string;
  location?: string;
  memo?: string;
  attributes: ProductAttribute[];
  skus: ProductSKU[];
  createInstant: string;
  modifyInstant: string;
}

/**
 * 商品列表项（简化版）
 */
export interface ProductListItem {
  id: number;
  categoryId: number;
  categoryName?: string;
  name: string;
  imageUrl?: string;
  unit: string;
  location?: string;
  skuCount: number;
  createInstant: string;
}

/**
 * SKU列表项（用于开单选择）
 */
export interface SKUListItem {
  skuId: number;
  productId: number;
  productName: string;
  skuName: string;
  attrValueMap: Record<string, string>;
  price: number;
  imageUrl?: string;
  unit: string;
  location?: string;
}

/**
 * 创建商品请求
 */
export interface CreateProductRequest {
  categoryId: number;
  name: string;
  imageUrl?: string;
  description?: string;
  unit: string;
  location?: string;
  memo?: string;
}

/**
 * 设置商品属性请求
 */
export interface SetAttributesRequest {
  attributes: {
    attrName: string;
    attrValues: string[];
  }[];
}

/**
 * 生成SKU请求
 */
export interface GenerateSKUsRequest {
  priceStrategy: 'UNIFORM' | 'MANUAL';
  uniformPrice?: number;
  skus?: {
    attrValueMap: Record<string, string>;
    price: number;
    imageUrl?: string;
  }[];
}

/**
 * 更新商品请求
 */
export interface UpdateProductRequest {
  categoryId?: number;
  name?: string;
  imageUrl?: string;
  description?: string;
  unit?: string;
  location?: string;
  memo?: string;
}
