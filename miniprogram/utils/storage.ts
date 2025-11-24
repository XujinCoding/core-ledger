/**
 * 本地存储工具类
 */

/**
 * 存储数据
 */
export function set(key: string, value: any): void {
  try {
    const data = JSON.stringify(value);
    wx.setStorageSync(key, data);
  } catch (error) {
    console.error('存储失败:', key, error);
  }
}

/**
 * 获取数据
 */
export function get<T = any>(key: string, defaultValue?: T): T | null {
  try {
    const data = wx.getStorageSync(key);
    if (data) {
      return JSON.parse(data) as T;
    }
    return defaultValue ?? null;
  } catch (error) {
    console.error('读取失败:', key, error);
    return defaultValue ?? null;
  }
}

/**
 * 删除数据
 */
export function remove(key: string): void {
  try {
    wx.removeStorageSync(key);
  } catch (error) {
    console.error('删除失败:', key, error);
  }
}

/**
 * 清空所有数据
 */
export function clear(): void {
  try {
    wx.clearStorageSync();
  } catch (error) {
    console.error('清空失败:', error);
  }
}

/**
 * 获取所有 key
 */
export function getAllKeys(): string[] {
  try {
    const res = wx.getStorageInfoSync();
    return res.keys;
  } catch (error) {
    console.error('获取keys失败:', error);
    return [];
  }
}

/**
 * 异步存储数据
 */
export function setAsync(key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.stringify(value);
      wx.setStorage({
        key,
        data,
        success: () => resolve(),
        fail: reject
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 异步获取数据
 */
export function getAsync<T = any>(key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: (res) => {
        try {
          const data = JSON.parse(res.data);
          resolve(data);
        } catch (error) {
          resolve(res.data);
        }
      },
      fail: () => resolve(null)
    });
  });
}

export const storage = {
  set,
  get,
  remove,
  clear,
  getAllKeys,
  setAsync,
  getAsync
};
