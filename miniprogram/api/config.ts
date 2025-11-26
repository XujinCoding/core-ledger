/**
 * API 配置文件
 */

// 环境配置
const ENV = {
  dev: {
    baseURL: 'http://10.0.63.247:8080/code-ledger/api',
    timeout: 10000
  },
  prod: {
    baseURL: 'https://10.0.63.247:8080/code-ledger/api', // 生产环境域名，请根据实际情况修改
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
