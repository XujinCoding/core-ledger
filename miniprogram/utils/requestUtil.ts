import { config } from '../api/config';
import { storage } from './storage';

/**
 * 请求配置接口
 */
interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: Record<string, string>;
  timeout?: number;
  showLoading?: boolean;
  loadingText?: string;
  showError?: boolean; // 是否显示错误提示，默认 true
}

/**
 * 响应数据接口
 */
interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp?: number;
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
 * 获取请求头（自动添加 Token）
 */
function getHeaders(customHeader?: Record<string, string>): Record<string, string> {
  const token = storage.get<string>(config.tokenKey);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeader
  };

  // 如果有 token，添加 Bearer 前缀
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * 处理业务错误（code !== 200）
 */
function handleBusinessError(response: ResponseData, showError: boolean = true): void {
  const message = response.message || '请求失败';
  
  console.error('业务错误:', {
    code: response.code,
    message: message,
    data: response.data
  });

  // 显示错误提示
  if (showError) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2500
    });
  }
}

/**
 * 处理网络错误
 */
function handleNetworkError(error: any): void {
  console.error('网络错误:', error);

  let message = '网络请求失败';

  if (error.statusCode) {
    switch (error.statusCode) {
      case 401:
        message = '登录已过期，请重新登录';
        // 清除 token
        storage.remove(config.tokenKey);
        storage.remove('userInfo');
        // 跳转到登录页
        setTimeout(() => {
          wx.reLaunch({ url: '/pages/login/login' });
        }, 1500);
        break;
      case 403:
        message = '没有权限访问';
        break;
      case 404:
        message = '请求的资源不存在';
        break;
      case 500:
        message = '服务器错误，请稍后重试';
        break;
      case 502:
        message = '网关错误';
        break;
      case 503:
        message = '服务暂时不可用';
        break;
      default:
        message = `请求失败(${error.statusCode})`;
    }
  } else if (error.errMsg) {
    if (error.errMsg.includes('timeout')) {
      message = '请求超时，请检查网络';
    } else if (error.errMsg.includes('fail')) {
      message = '网络连接失败，请检查网络';
    }
  }

  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2500
  });
}

/**
 * 统一请求方法
 * @param options 请求配置
 * @returns Promise<T> 返回业务数据
 */
export function request<T = any>(options: RequestConfig): Promise<T> {
  const {
    url,
    method = 'GET',
    data,
    header,
    timeout = config.timeout,
    showLoading: shouldShowLoading = false,
    loadingText = '加载中...',
    showError = true
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

        // 判断业务状态码
        if (response.code === 200) {
          // 业务成功，返回数据
          resolve(response.data);
        } else {
          // 业务失败，处理错误
          handleBusinessError(response, showError);
          reject(response);
        }
      },
      fail: (error) => {
        // 网络错误
        handleNetworkError(error);
        reject(error);
      },
      complete: () => {
        // 隐藏加载提示
        if (shouldShowLoading) {
          hideLoading();
        }
      }
    });
  });
}

/**
 * GET 请求
 * @param url 请求地址
 * @param data 请求参数
 * @param options 其他配置
 */
export function get<T = any>(
  url: string,
  data?: any,
  options?: Partial<RequestConfig>
): Promise<T> {
  return request<T>({ url, method: 'GET', data, ...options });
}

/**
 * POST 请求
 * @param url 请求地址
 * @param data 请求数据
 * @param options 其他配置
 */
export function post<T = any>(
  url: string,
  data?: any,
  options?: Partial<RequestConfig>
): Promise<T> {
  return request<T>({ url, method: 'POST', data, ...options });
}

/**
 * PUT 请求
 * @param url 请求地址
 * @param data 请求数据
 * @param options 其他配置
 */
export function put<T = any>(
  url: string,
  data?: any,
  options?: Partial<RequestConfig>
): Promise<T> {
  return request<T>({ url, method: 'PUT', data, ...options });
}

/**
 * DELETE 请求
 * @param url 请求地址
 * @param data 请求数据
 * @param options 其他配置
 */
export function del<T = any>(
  url: string,
  data?: any,
  options?: Partial<RequestConfig>
): Promise<T> {
  return request<T>({ url, method: 'DELETE', data, ...options });
}

/**
 * PATCH 请求（使用 POST 模拟，因为微信小程序不支持 PATCH）
 * @param url 请求地址
 * @param data 请求数据
 * @param options 其他配置
 */
export function patch<T = any>(
  url: string,
  data?: any,
  options?: Partial<RequestConfig>
): Promise<T> {
  // 微信小程序不支持 PATCH，使用 POST 代替
  return request<T>({ url, method: 'POST', data, ...options });
}

/**
 * 上传文件
 * @param filePath 文件路径
 * @param url 上传地址
 * @param name 文件对应的 key
 * @param formData 其他表单数据
 */
export function uploadFile(
  filePath: string,
  url: string,
  name: string = 'file',
  formData?: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${config.baseURL}${url}`,
      filePath,
      name,
      formData,
      header: getHeaders(),
      success: (res) => {
        try {
          const response = JSON.parse(res.data) as ResponseData;
          if (response.code === 200) {
            resolve(response.data);
          } else {
            handleBusinessError(response);
            reject(response);
          }
        } catch (error) {
          console.error('解析上传响应失败:', error);
          wx.showToast({ title: '上传失败', icon: 'none' });
          reject(error);
        }
      },
      fail: (error) => {
        handleNetworkError(error);
        reject(error);
      }
    });
  });
}

/**
 * 下载文件
 * @param url 下载地址
 * @param filePath 保存路径（可选）
 */
export function downloadFile(url: string, filePath?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: `${config.baseURL}${url}`,
      filePath,
      header: getHeaders(),
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          wx.showToast({ title: '下载失败', icon: 'none' });
          reject(res);
        }
      },
      fail: (error) => {
        handleNetworkError(error);
        reject(error);
      }
    });
  });
}

/**
 * 导出所有方法
 */
export default {
  request,
  get,
  post,
  put,
  del,
  patch,
  uploadFile,
  downloadFile
};
