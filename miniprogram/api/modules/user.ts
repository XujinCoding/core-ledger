import { get, post, put } from '../../utils/requestUtil';

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  phone: string;
  email: string;
  createdAt: string;
}

/**
 * 用户列表响应
 */
export interface UserListResponse {
  list: UserInfo[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 用户 API
 */
export const userApi = {
  /**
   * 获取用户信息
   */
  getInfo(userId?: number): Promise<UserInfo> {
    const url = userId ? `/user/${userId}` : '/user/info';
    return get<UserInfo>(url);
  },

  /**
   * 获取用户列表
   */
  getList(params: { page: number; pageSize: number; keyword?: string }): Promise<UserListResponse> {
    return get<UserListResponse>('/user/list', params);
  },

  /**
   * 更新用户信息
   */
  updateInfo(data: Partial<UserInfo>): Promise<UserInfo> {
    return put<UserInfo>('/user/info', data, { showLoading: true });
  },

  /**
   * 修改密码
   */
  changePassword(data: { oldPassword: string; newPassword: string }): Promise<void> {
    return post<void>('/user/change-password', data, { showLoading: true });
  }
};
