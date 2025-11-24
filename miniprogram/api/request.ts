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

        if (response.code === config.statusCode.success) {
          resolve(response.data);
        } else {
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
