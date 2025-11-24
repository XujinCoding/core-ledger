import { post, get } from '../../utils/requestUtil';

/**
 * 微信登录请求参数
 */
export interface WechatLoginParams {
  code: string;
  encryptedData?: string;
  iv?: string;
  nickname?: string;
  avatarUrl?: string;
}

/**
 * 绑定手机号请求参数
 */
export interface BindPhoneParams {
  openid: string;
  phone: string;
  encryptedData?: string;
  iv?: string;
}

/**
 * 密码登录请求参数
 */
export interface PasswordLoginParams {
  phone: string;
  password: string;
}

/**
 * 用户信息
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

/**
 * 登录响应数据
 */
export interface LoginResponse {
  token: string;
  userInfo: UserInfo;
  needBindPhone: boolean;
  tempOpenid: string;
  expireTime: string;
}

/**
 * 认证 API
 */
export const authApi = {
  /**
   * 微信小程序登录
   * @param data 登录数据
   * @returns 登录响应
   */
  wechatLogin(data: WechatLoginParams): Promise<LoginResponse> {
    return post<LoginResponse>('/api/auth/wechat-login', data);
  },

  /**
   * 绑定手机号
   * @param data 绑定手机号数据
   * @returns 登录响应
   */
  bindPhone(data: BindPhoneParams): Promise<LoginResponse> {
    return post<LoginResponse>('/api/auth/bind-phone', data);
  },

  /**
   * 密码登录（管理后台）
   * @param data 登录凭证
   * @returns 登录响应
   */
  passwordLogin(data: PasswordLoginParams): Promise<LoginResponse> {
    return post<LoginResponse>('/api/auth/login', data, { showLoading: true });
  },

  /**
   * 退出登录
   * @param token 授权令牌（可选，从请求头获取）
   * @returns 空响应
   */
  logout(token?: string): Promise<void> {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = token;
    }
    return post<void>('/api/auth/logout', {}, { header: headers });
  },

  /**
   * 获取当前用户信息
   * @param token 授权令牌（必填）
   * @returns 用户信息
   */
  getCurrentUser(token: string): Promise<UserInfo> {
    return get<UserInfo>('/api/auth/current-user', undefined, {
      header: { Authorization: token }
    });
  }
};
