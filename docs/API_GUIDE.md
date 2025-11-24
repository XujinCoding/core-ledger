# API 请求管理指南

## 目录结构

```
miniprogram/api/
├── request.ts          # 请求封装
├── config.ts           # API 配置
├── interceptor.ts      # 拦截器
└── modules/            # API 模块
    ├── user.ts         # 用户相关
    ├── ledger.ts       # 账本相关
    ├── auth.ts         # 认证相关
    └── index.ts        # 统一导出
```

## 1. API 配置（api/config.ts）

```typescript
/**
 * API 配置文件
 */

// 环境配置
const ENV = {
  dev: {
    baseURL: 'https://dev-api.example.com',
    timeout: 10000
  },
  prod: {
    baseURL: 'https://api.example.com',
    timeout: 10000
  }
};

// 当前环境（可根据编译环境自动切换）
const currentEnv: keyof typeof ENV = 'dev';

export const config = {
  // 基础 URL
  baseURL: ENV[currentEnv].baseURL,

  // 超时时间
  timeout: ENV[currentEnv].timeout,

  // Token 存储 key
  tokenKey: 'access_token',

  // 刷新 token key
  refreshTokenKey: 'refresh_token',

  // 请求头
  headers: {
    'Content-Type': 'application/json'
  },

  // 状态码配置
  statusCode: {
    success: 200,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    serverError: 500
  }
};

/**
 * 获取完整的 API 地址
 */
export function getFullUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${config.baseURL}${url}`;
}
```

## 2. 请求封装（api/request.ts）

```typescript
import { config } from './config';
import { storage } from '../utils/storage';

/**
 * 请求参数接口
 */
interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  header?: Record<string, string>;
  timeout?: number;
  showLoading?: boolean;
  loadingText?: string;
}

/**
 * 响应数据接口
 */
interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 显示加载提示
 */
function showLoading(text: string = '加载中...'): void {
  wx.showLoading({ title: text, mask: true });
}

/**
 * 隐藏加载提示
 */
function hideLoading(): void {
  wx.hideLoading();
}

/**
 * 获取请求头
 */
function getHeaders(customHeader?: Record<string, string>): Record<string, string> {
  const token = storage.get(config.tokenKey);
  const headers = {
    ...config.headers,
    ...customHeader
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * 处理请求错误
 */
function handleError(error: any): void {
  console.error('请求错误:', error);

  let message = '网络请求失败';

  if (error.statusCode) {
    switch (error.statusCode) {
      case 401:
        message = '未授权，请重新登录';
        // 清除 token 并跳转到登录页
        storage.remove(config.tokenKey);
        wx.reLaunch({ url: '/pages/login/login' });
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求的资源不存在';
        break;
      case 500:
        message = '服务器错误';
        break;
      default:
        message = `请求失败(${error.statusCode})`;
    }
  } else if (error.errMsg) {
    if (error.errMsg.includes('timeout')) {
      message = '请求超时';
    } else if (error.errMsg.includes('fail')) {
      message = '网络连接失败';
    }
  }

  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  });
}

/**
 * 通用请求方法
 */
export function request<T = any>(options: RequestOptions): Promise<T> {
  const {
    url,
    method = 'GET',
    data,
    header,
    timeout = config.timeout,
    showLoading: shouldShowLoading = false,
    loadingText = '加载中...'
  } = options;

  // 显示加载提示
  if (shouldShowLoading) {
    showLoading(loadingText);
  }

  return new Promise<T>((resolve, reject) => {
    wx.request({
      url: `${config.baseURL}${url}`,
      method,
      data,
      header: getHeaders(header),
      timeout,
      success: (res: WechatMiniprogram.RequestSuccessCallbackResult) => {
        const response = res.data as ResponseData<T>;

        // 根据业务状态码判断
        if (response.code === config.statusCode.success) {
          resolve(response.data);
        } else {
          // 业务错误
          wx.showToast({
            title: response.message || '请求失败',
            icon: 'none'
          });
          reject(response);
        }
      },
      fail: (error) => {
        handleError(error);
        reject(error);
      },
      complete: () => {
        if (shouldShowLoading) {
          hideLoading();
        }
      }
    });
  });
}

/**
 * GET 请求
 */
export function get<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({ url, method: 'GET', data, ...options });
}

/**
 * POST 请求
 */
export function post<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({ url, method: 'POST', data, ...options });
}

/**
 * PUT 请求
 */
export function put<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({ url, method: 'PUT', data, ...options });
}

/**
 * DELETE 请求
 */
export function del<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({ url, method: 'DELETE', data, ...options });
}

/**
 * 上传文件
 */
export function uploadFile(filePath: string, url: string, name: string = 'file', formData?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${config.baseURL}${url}`,
      filePath,
      name,
      formData,
      header: getHeaders(),
      success: (res) => {
        const data = JSON.parse(res.data);
        if (data.code === config.statusCode.success) {
          resolve(data.data);
        } else {
          wx.showToast({ title: data.message || '上传失败', icon: 'none' });
          reject(data);
        }
      },
      fail: (error) => {
        handleError(error);
        reject(error);
      }
    });
  });
}

/**
 * 下载文件
 */
export function downloadFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: `${config.baseURL}${url}`,
      header: getHeaders(),
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          reject(new Error('下载失败'));
        }
      },
      fail: reject
    });
  });
}
```

## 3. API 模块示例

### 用户模块（api/modules/user.ts）

```typescript
import { get, post, put } from '../request';

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
```

### 账本模块（api/modules/ledger.ts）

```typescript
import { get, post, put, del } from '../request';

/**
 * 账本记录接口
 */
export interface LedgerRecord {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  remark: string;
  date: string;
  createdAt: string;
}

/**
 * 账本统计接口
 */
export interface LedgerStatistics {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  records: LedgerRecord[];
}

/**
 * 账本 API
 */
export const ledgerApi = {
  /**
   * 获取账本记录列表
   */
  getRecords(params: {
    page: number;
    pageSize: number;
    startDate?: string;
    endDate?: string;
    type?: 'income' | 'expense';
  }): Promise<{ list: LedgerRecord[]; total: number }> {
    return get('/ledger/records', params);
  },

  /**
   * 获取账本统计
   */
  getStatistics(params: { startDate: string; endDate: string }): Promise<LedgerStatistics> {
    return get('/ledger/statistics', params);
  },

  /**
   * 创建账本记录
   */
  createRecord(data: Omit<LedgerRecord, 'id' | 'createdAt'>): Promise<LedgerRecord> {
    return post('/ledger/record', data, { showLoading: true, loadingText: '保存中...' });
  },

  /**
   * 更新账本记录
   */
  updateRecord(id: number, data: Partial<LedgerRecord>): Promise<LedgerRecord> {
    return put(`/ledger/record/${id}`, data, { showLoading: true });
  },

  /**
   * 删除账本记录
   */
  deleteRecord(id: number): Promise<void> {
    return del(`/ledger/record/${id}`, {}, { showLoading: true });
  }
};
```

### 认证模块（api/modules/auth.ts）

```typescript
import { post } from '../request';
import { storage } from '../../utils/storage';
import { config } from '../config';

/**
 * 登录参数
 */
interface LoginParams {
  code?: string;
  phone?: string;
  password?: string;
}

/**
 * 登录响应
 */
interface LoginResponse {
  token: string;
  refreshToken: string;
  userInfo: any;
}

/**
 * 认证 API
 */
export const authApi = {
  /**
   * 微信登录
   */
  async wxLogin(): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      wx.login({
        success: async (res) => {
          try {
            const data = await post<LoginResponse>('/auth/wx-login', { code: res.code });
            // 保存 token
            storage.set(config.tokenKey, data.token);
            storage.set(config.refreshTokenKey, data.refreshToken);
            resolve(data);
          } catch (error) {
            reject(error);
          }
        },
        fail: reject
      });
    });
  },

  /**
   * 手机号登录
   */
  async phoneLogin(phone: string, password: string): Promise<LoginResponse> {
    const data = await post<LoginResponse>('/auth/phone-login', { phone, password });
    storage.set(config.tokenKey, data.token);
    storage.set(config.refreshTokenKey, data.refreshToken);
    return data;
  },

  /**
   * 退出登录
   */
  async logout(): Promise<void> {
    await post('/auth/logout');
    storage.remove(config.tokenKey);
    storage.remove(config.refreshTokenKey);
  },

  /**
   * 刷新 token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = storage.get(config.refreshTokenKey);
    const data = await post<{ token: string }>('/auth/refresh-token', { refreshToken });
    storage.set(config.tokenKey, data.token);
    return data.token;
  }
};
```

### 统一导出（api/modules/index.ts）

```typescript
export { userApi } from './user';
export { ledgerApi } from './ledger';
export { authApi } from './auth';

// 统一导出类型
export type { UserInfo, UserListResponse } from './user';
export type { LedgerRecord, LedgerStatistics } from './ledger';
```

## 4. 使用示例

### 在页面中使用

```typescript
// pages/user/user.ts
import { userApi } from '../../api/modules';
import type { UserInfo } from '../../api/modules';

Page({
  data: {
    userInfo: {} as UserInfo,
    loading: false
  },

  onLoad(): void {
    this.loadUserInfo();
  },

  /**
   * 加载用户信息
   */
  async loadUserInfo(): Promise<void> {
    try {
      this.setData({ loading: true });
      const userInfo = await userApi.getInfo();
      this.setData({ userInfo });
    } catch (error) {
      console.error('加载失败', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 更新用户信息
   */
  async handleUpdate(): Promise<void> {
    try {
      const updatedInfo = await userApi.updateInfo({
        nickname: '新昵称'
      });
      this.setData({ userInfo: updatedInfo });
      wx.showToast({ title: '更新成功', icon: 'success' });
    } catch (error) {
      // 错误已在 request 中统一处理
    }
  }
});
```

### 并发请求

```typescript
async loadPageData(): Promise<void> {
  try {
    this.setData({ loading: true });

    // 并发请求多个接口
    const [userInfo, statistics, records] = await Promise.all([
      userApi.getInfo(),
      ledgerApi.getStatistics({ startDate: '2024-01-01', endDate: '2024-12-31' }),
      ledgerApi.getRecords({ page: 1, pageSize: 10 })
    ]);

    this.setData({
      userInfo,
      statistics,
      records: records.list
    });
  } catch (error) {
    console.error('加载失败', error);
  } finally {
    this.setData({ loading: false });
  }
}
```

## 5. 最佳实践

### 错误处理
```typescript
// 推荐：在业务层处理特定错误
try {
  await userApi.updateInfo(data);
  wx.showToast({ title: '保存成功', icon: 'success' });
  wx.navigateBack();
} catch (error: any) {
  // 通用错误已在 request 中处理
  // 这里只处理特定的业务错误
  if (error.code === 40001) {
    // 特殊处理
  }
}
```

### 请求取消
```typescript
// 使用 RequestTask 取消请求
let requestTask: WechatMiniprogram.RequestTask | null = null;

onLoad(): void {
  requestTask = wx.request({
    url: 'https://api.example.com/data',
    success: (res) => {
      console.log(res);
    }
  });
}

onUnload(): void {
  // 页面卸载时取消请求
  if (requestTask) {
    requestTask.abort();
  }
}
```

### 请求重试
```typescript
/**
 * 带重试的请求
 */
async function requestWithRetry<T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  throw lastError;
}

// 使用
const data = await requestWithRetry(() => userApi.getInfo());
```

### Mock 数据
```typescript
// api/mock.ts
export const mockData = {
  userInfo: {
    id: 1,
    username: 'test',
    nickname: '测试用户',
    avatar: 'https://example.com/avatar.jpg'
  }
};

// 开发环境使用 mock
const isDev = true;
if (isDev) {
  export const userApi = {
    getInfo: () => Promise.resolve(mockData.userInfo)
  };
}
```
