/**
 * 商品模块类型定义
 */

/**
 * 商品分类
 */
export interface CategoryVO {
  id: number;
  parentId: number;
  name: string;
  level: number;
  sortOrder: number;
  iconUrl?: string;
  memo?: string;
  status: string; // "0"=禁用, "1"=启用
  createInstant: string;
  modifyInstant: string;
}

/**
 * 商品分类树（带子分类）
 */
export interface CategoryTreeVO extends CategoryVO {
  children: CategoryTreeVO[];
  expanded?: boolean; // 前端用于控制展开/折叠状态
  productCount?: number; // 该分类下的商品数量
}

/**
 * 创建分类请求
 */
export interface CreateCategoryRequest {
  parentId: number; // 0表示顶级分类
  name: string;
  sortOrder?: number;
  iconUrl?: string;
  memo?: string;
}

/**
 * 更新分类请求
 */
export interface UpdateCategoryRequest {
  name: string;
  sortOrder?: number;
  iconUrl?: string;
  memo?: string;
}

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
 * 商品详情（SPU）- 完整版VO
 */
export interface Product {
  id: number;
  categoryId: number;
  categoryName?: string;
  name: string;
  imageUrl?: string;
  description?: string;
  price: number; // 标准价格
  spec?: string; // 规格型号
  unit: string;
  location?: string;
  memo?: string;
  status: string; // "0"=禁用, "1"=启用
  attrs: ProductAttrVO[]; // 使用API返回的类型
  skus: ProductSkuVO[]; // 使用API返回的类型
  createInstant: string;
  modifyInstant: string;
}

/**
 * 商品属性值VO
 */
export interface ProductAttrValueVO {
  id?: number; // 新增时无id，修改时有id
  productAttrId?: number; // 新增时可能没有
  value: string;
  sortOrder: number;
}

/**
 * 商品属性VO
 */
export interface ProductAttrVO {
  id?: number; // 新增时无id，修改时有id
  productId?: number; // 批量更新时由后端设置
  attrName: string;
  sortOrder: number;
  values: ProductAttrValueVO[];
}

/**
 * 商品SKU属性VO
 */
export interface ProductSkuAttrVO {
  attrName: string;
  attrValue: string;
  sortOrder: number;
}

/**
 * 商品SKU VO
 */
export interface ProductSkuVO {
  id: number;
  productId: number;
  skuName: string;
  priceStatus: string; // "0"=未定价, "1"=已定价
  price: number;
  imageUrl?: string;
  sortOrder: number;
  status: string; // "0"=禁用, "1"=启用
  skuAttrs: ProductSkuAttrVO[];
}

/**
 * 商品列表项（完整版，匹配后端返回）
 */
export interface ProductListItem {
  id: number;
  categoryId: number;
  categoryName?: string;
  name: string;
  imageUrl?: string;
  description?: string;
  price: number; // 标准价格
  spec?: string; // 规格型号
  unit: string;
  location?: string;
  memo?: string;
  status: string; // "0"=禁用, "1"=启用
  attrs: ProductAttrVO[];
  skus: ProductSkuVO[];
  skuCount?: number; // SKU数量（前端计算）
  createInstant: string;
  modifyInstant: string;
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
  categoryId: number; // 必填
  name: string; // 必填
  price: number; // 必填 - 标准价格
  unit: string; // 必填
  imageUrl?: string;
  description?: string;
  spec?: string; // 规格型号
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
  name: string; // 必填
  categoryId?: number; // 分类ID
  imageUrl?: string;
  description?: string;
  price?: number; // 标准价格
  spec?: string; // 规格型号
  unit?: string;
  location?: string;
  memo?: string;
}

/**
 * SKU价格项
 */
export interface SkuPriceItem {
  skuId: number; // SKU ID
  price: number; // 价格（必须>0）
}

/**
 * SKU批量定价请求
 */
export interface SkuPriceUpdateDTO {
  skuPrices: SkuPriceItem[];
}
