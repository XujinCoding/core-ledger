/**
 * 通用常量定义
 */

/**
 * 页面路径常量
 */
export const PAGE_PATHS = {
  INDEX: '/pages/index/index',
  LOGS: '/pages/logs/logs',
  LOGIN: '/pages/login/login',
  USER: '/pages/user/user'
} as const;

/**
 * 本地存储 key
 */
export const STORAGE_KEYS = {
  TOKEN: 'access_token',
  USER_INFO: 'user_info',
  THEME: 'theme',
  LANGUAGE: 'language'
} as const;

/**
 * 默认配置
 */
export const DEFAULT_CONFIG = {
  PAGE_SIZE: 10,
  REQUEST_TIMEOUT: 10000,
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 500
} as const;
