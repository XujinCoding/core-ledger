/**
 * API 相关类型定义
 */

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page: number;        // 页码（从0开始）
  size: number;        // 每页大小
  sort?: string;       // 排序字段（如：createInstant,desc）
}

/**
 * Spring Data Page 分页响应数据
 */
export interface PageResponse<T> {
  content: T[];                 // 当前页数据
  pageable: {
    pageNumber: number;         // 当前页码（从0开始）
    pageSize: number;           // 每页大小
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;        // 总记录数
  totalPages: number;           // 总页数
  size: number;                 // 每页大小
  number: number;               // 当前页码（从0开始）
  numberOfElements: number;     // 当前页记录数
  first: boolean;               // 是否第一页
  last: boolean;                // 是否最后一页
  empty: boolean;               // 是否为空
}

/**
 * 旧的分页响应格式（兼容）
 */
export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages?: number;
}

/**
 * API 响应基础结构
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp?: number;
}

/**
 * 上传文件响应
 */
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
}

