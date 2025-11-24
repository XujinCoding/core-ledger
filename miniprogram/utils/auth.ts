import { storage } from './storage';
import { config } from '../api/config';
import { authApi } from '../api/modules/auth';

/**
 * 授权工具类
 */

/**
 * 检查是否已登录
 * @returns 是否已登录
 */
export function isLoggedIn(): boolean {
  const token = storage.get<string>(config.tokenKey);
  return !!token;
}

/**
 * 检查授权状态，未授权则跳转登录页
 * @returns 是否已授权
 */
export function checkAuth(): boolean {
  const token = storage.get<string>(config.tokenKey);
  
  if (!token) {
    // 没有 token，跳转到登录页
    wx.reLaunch({
      url: '/pages/login/login'
    });
    return false;
  }
  
  return true;
}

/**
 * 获取当前用户信息
 * @returns 用户信息
 */
export function getCurrentUser(): any {
  return storage.get('userInfo');
}

/**
 * 获取当前用户 ID
 * @returns 用户 ID
 */
export function getCurrentUserId(): number | null {
  const userInfo = getCurrentUser();
  return userInfo?.id || null;
}

/**
 * 获取当前 Token
 * @returns Token
 */
export function getToken(): string | null {
  return storage.get<string>(config.tokenKey);
}

/**
 * 保存登录信息
 * @param token 访问令牌
 * @param userInfo 用户信息
 * @param expireTime 过期时间
 */
export function saveLoginInfo(token: string, userInfo: any, expireTime?: string): void {
  storage.set(config.tokenKey, token);
  storage.set('userInfo', userInfo);
  if (expireTime) {
    storage.set('expireTime', expireTime);
  }
}

/**
 * 清除登录信息
 */
export function clearLoginInfo(): void {
  storage.remove(config.tokenKey);
  storage.remove('userInfo');
  storage.remove('expireTime');
}

/**
 * 退出登录
 * @param showConfirm 是否显示确认对话框
 */
export function logout(showConfirm: boolean = true): void {
  const doLogout = async () => {
    try {
      // 获取当前 token
      const token = getToken();
      
      // 调用退出登录 API
      if (token) {
        await authApi.logout(token);
      }
    } catch (error) {
      console.error('退出登录接口调用失败:', error);
      // 即使接口调用失败，也继续清除本地信息
    } finally {
      // 清除登录信息
      clearLoginInfo();
      
      // 跳转到登录页
      wx.reLaunch({
        url: '/pages/login/login'
      });
    }
  };

  if (showConfirm) {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          doLogout();
        }
      }
    });
  } else {
    doLogout();
  }
}

/**
 * 检查 Token 是否过期
 * @returns 是否过期
 */
export function isTokenExpired(): boolean {
  const expireTime = storage.get<string>('expireTime');
  
  if (!expireTime) {
    return false;
  }

  try {
    const expireTimestamp = new Date(expireTime).getTime();
    const currentTimestamp = Date.now();
    return currentTimestamp >= expireTimestamp;
  } catch (error) {
    console.error('解析过期时间失败', error);
    return false;
  }
}

/**
 * 页面授权检查 Mixin
 * 可以在页面中使用，自动进行授权检查
 */
export const authMixin = {
  onLoad() {
    checkAuth();
  },
  
  onShow() {
    checkAuth();
  }
};

export default {
  isLoggedIn,
  checkAuth,
  getCurrentUser,
  getCurrentUserId,
  getToken,
  saveLoginInfo,
  clearLoginInfo,
  logout,
  isTokenExpired,
  authMixin
};
