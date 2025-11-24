/**
 * 认证相关类型定义
 */

/**
 * 登录方式类型
 */
export type LoginType = 'wechat' | 'password';

/**
 * 用户角色枚举
 */
export enum UserRole {
  /** 普通用户 */
  User = 0,
  /** 管理员 */
  Admin = 1,
  /** 超级管理员 */
  SuperAdmin = 2
}

/**
 * 登录状态
 */
export interface LoginState {
  /** 是否已登录 */
  isLoggedIn: boolean;
  /** 访问令牌 */
  token: string | null;
  /** 用户信息 */
  userInfo: UserInfo | null;
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: number;
  username: string;
  phone: string;
  role: number;
  roleDesc: string;
  wxNickname: string;
  wxAvatarUrl: string;
}
