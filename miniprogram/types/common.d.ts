/**
 * 通用类型定义
 */

/**
 * 基础实体接口
 */
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt?: string;
}

/**
 * 键值对类型
 */
export type KeyValuePair<T = any> = {
  [key: string]: T;
};

/**
 * 选项类型
 */
export interface Option<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * 坐标类型
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * 尺寸类型
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * 区域类型
 */
export interface Rect extends Position, Size {}
