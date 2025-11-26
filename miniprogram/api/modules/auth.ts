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
 * 补充用户信息请求参数（已存在用户）
 */
export interface SupplementUserInfoParams {
  openid: string;
  phone: string;
  nickname?: string;
  avatarUrl?: string;
  username?: string;
}

/**
 * 注册新用户请求参数
 */
export interface RegisterUserParams {
  openid: string;
  phone: string;
  nickname?: string;
  avatarUrl?: string;
  username?: string;
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
  needSupplement: boolean;  // 是否需要补充信息（已存在用户）
  isNewUser: boolean;        // 是否是新用户（需要注册）
  tempOpenid: string;        // 临时 openid（需要补充信息或注册时返回）
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
    return post<LoginResponse>('/auth/wechat-login', data);
  },

  /**
   * 补充用户信息（已存在用户）
   * @param data 用户信息
   * @returns 登录响应
   */
  supplementUserInfo(data: SupplementUserInfoParams): Promise<LoginResponse> {
    return post<LoginResponse>('/auth/supplement-info', data);
  },

  /**
   * 注册新用户
   * @param data 用户注册信息
   * @returns 登录响应
   */
  registerUser(data: RegisterUserParams): Promise<LoginResponse> {
    return post<LoginResponse>('/auth/register', data);
  },

  /**
   * 密码登录（管理后台）
   * @param data 登录凭证
   * @returns 登录响应
   */
  passwordLogin(data: PasswordLoginParams): Promise<LoginResponse> {
    return post<LoginResponse>('/auth/login', data, { showLoading: true });
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
    return post<void>('/auth/logout', {}, { header: headers });
  },

  /**
   * 获取当前用户信息
   * @param token 授权令牌（必填）
   * @returns 用户信息
   */
  getCurrentUser(token: string): Promise<UserInfo> {
    return get<UserInfo>('/auth/current-user', undefined, {
      header: { Authorization: token }
    });
  }
};
