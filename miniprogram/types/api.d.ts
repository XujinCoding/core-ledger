/**
 * API 相关类型定义
 */

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应数据
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
