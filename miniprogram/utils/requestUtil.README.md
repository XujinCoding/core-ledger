# requestUtil 使用说明

## 📋 概述

`requestUtil` 是一个统一的网络请求工具，封装了微信小程序的 `wx.request` API，提供了以下功能：

- ✅ 自动添加 `Bearer Token` 到请求头
- ✅ 统一处理业务异常（code !== 200）
- ✅ 统一处理网络错误
- ✅ 自动显示错误提示
- ✅ 401 自动跳转登录页
- ✅ 支持加载提示
- ✅ 支持文件上传下载

## 🔑 Token 处理

### 自动添加 Bearer Token

所有请求都会自动从本地存储读取 token，并添加到请求头：

```typescript
Authorization: Bearer <token>
```

这与后端的 `AuthInterceptor` 完全匹配：

```java
// 后端期望的格式
private static final String HEADER_TOKEN = "Authorization";
private static final String TOKEN_PREFIX = "Bearer ";
```

### Token 存储

登录成功后，需要保存 token：

```typescript
import { storage } from '@/utils/storage';
import { config } from '@/api/config';

// 保存 token
storage.set(config.tokenKey, 'your_token_here');

// 获取 token
const token = storage.get(config.tokenKey);

// 删除 token
storage.remove(config.tokenKey);
```

## 🚀 基本使用

### 导入方式

```typescript
// 方式一：导入具体方法
import { get, post, put, del } from '@/utils/requestUtil';

// 方式二：导入默认对象
import requestUtil from '@/utils/requestUtil';
```

### GET 请求

```typescript
import { get } from '@/utils/requestUtil';

// 基本用法
const data = await get('/api/user/info');

// 带参数
const list = await get('/api/user/list', { page: 1, pageSize: 10 });

// 带配置
const data = await get('/api/user/info', null, {
  showLoading: true,
  loadingText: '加载中...'
});
```

### POST 请求

```typescript
import { post } from '@/utils/requestUtil';

// 基本用法
const result = await post('/api/user/create', {
  name: '张三',
  age: 25
});

// 带配置
const result = await post('/api/user/update', data, {
  showLoading: true,
  showError: false  // 不自动显示错误提示
});
```

### PUT 请求

```typescript
import { put } from '@/utils/requestUtil';

const result = await put('/api/user/update', {
  id: 1,
  name: '李四'
});
```

### DELETE 请求

```typescript
import { del } from '@/utils/requestUtil';

const result = await del('/api/user/delete', { id: 1 });
```

## 📦 完整示例

### 在页面中使用

```typescript
// pages/user/user.ts
import { get, post } from '@/utils/requestUtil';

Page({
  data: {
    userInfo: null,
    loading: false
  },

  async onLoad() {
    await this.loadUserInfo();
  },

  /**
   * 加载用户信息
   */
  async loadUserInfo() {
    try {
      this.setData({ loading: true });
      
      // 自动携带 token，自动处理异常
      const userInfo = await get('/api/user/info');
      
      this.setData({ userInfo });
    } catch (error) {
      // 错误已经自动提示，这里可以做额外处理
      console.error('加载用户信息失败', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 更新用户信息
   */
  async updateUserInfo() {
    try {
      const result = await post('/api/user/update', {
        nickname: '新昵称',
        avatar: 'https://...'
      }, {
        showLoading: true,
        loadingText: '保存中...'
      });

      wx.showToast({ title: '保存成功', icon: 'success' });
      
      // 刷新数据
      await this.loadUserInfo();
    } catch (error) {
      // 错误已经自动提示
    }
  }
});
```

### 在 API 模块中使用

```typescript
// api/modules/user.ts
import { get, post, put, del } from '@/utils/requestUtil';

export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
}

export const userApi = {
  /**
   * 获取用户信息
   */
  getInfo(userId?: number): Promise<UserInfo> {
    const url = userId ? `/api/user/${userId}` : '/api/user/info';
    return get<UserInfo>(url);
  },

  /**
   * 更新用户信息
   */
  updateInfo(data: Partial<UserInfo>): Promise<UserInfo> {
    return put<UserInfo>('/api/user/info', data, {
      showLoading: true
    });
  },

  /**
   * 删除用户
   */
  deleteUser(userId: number): Promise<void> {
    return del<void>(`/api/user/${userId}`);
  }
};
```

## ⚙️ 配置选项

### RequestConfig 接口

```typescript
interface RequestConfig {
  url: string;                    // 请求地址（必填）
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';  // 请求方法
  data?: any;                     // 请求数据
  header?: Record<string, string>; // 自定义请求头
  timeout?: number;               // 超时时间（毫秒）
  showLoading?: boolean;          // 是否显示加载提示
  loadingText?: string;           // 加载提示文字
  showError?: boolean;            // 是否显示错误提示（默认 true）
}
```

### 使用示例

```typescript
// 不显示错误提示
const data = await get('/api/data', null, {
  showError: false
});

// 自定义请求头
const data = await post('/api/upload', formData, {
  header: {
    'Content-Type': 'multipart/form-data'
  }
});

// 自定义超时时间
const data = await get('/api/slow-api', null, {
  timeout: 30000  // 30秒
});
```

## 🎯 异常处理

### 业务异常（code !== 200）

当后端返回的 `code` 不是 200 时，会自动：

1. 在控制台输出错误信息
2. 显示 `message` 内容的 Toast 提示
3. 抛出异常，可以在 `catch` 中捕获

```typescript
try {
  const data = await post('/api/user/create', userData);
  // 成功处理
} catch (error) {
  // error 包含完整的响应数据
  console.log(error.code);     // 错误码
  console.log(error.message);  // 错误信息
  console.log(error.data);     // 错误详情
}
```

### 网络异常

网络错误会自动处理：

- **401 未授权**：清除 token，跳转登录页
- **403 禁止访问**：显示"没有权限访问"
- **404 未找到**：显示"请求的资源不存在"
- **500 服务器错误**：显示"服务器错误，请稍后重试"
- **超时**：显示"请求超时，请检查网络"
- **网络连接失败**：显示"网络连接失败，请检查网络"

### 不显示错误提示

某些场景下，你可能不希望自动显示错误提示：

```typescript
try {
  const data = await get('/api/check', null, {
    showError: false  // 不显示错误提示
  });
} catch (error) {
  // 自己处理错误
  if (error.code === 404) {
    console.log('数据不存在');
  }
}
```

## 📤 文件上传

```typescript
import { uploadFile } from '@/utils/requestUtil';

// 选择图片
wx.chooseImage({
  count: 1,
  success: async (res) => {
    const filePath = res.tempFilePaths[0];
    
    try {
      // 上传文件
      const result = await uploadFile(
        filePath,
        '/api/upload/image',
        'file',  // 文件字段名
        { type: 'avatar' }  // 额外的表单数据
      );
      
      console.log('上传成功', result.url);
    } catch (error) {
      console.error('上传失败', error);
    }
  }
});
```

## 📥 文件下载

```typescript
import { downloadFile } from '@/utils/requestUtil';

try {
  // 下载文件
  const tempFilePath = await downloadFile('/api/download/file');
  
  // 保存到相册
  wx.saveImageToPhotosAlbum({
    filePath: tempFilePath,
    success: () => {
      wx.showToast({ title: '保存成功', icon: 'success' });
    }
  });
} catch (error) {
  console.error('下载失败', error);
}
```

## 🔒 安全说明

### Token 安全

1. **自动过期处理**：401 错误会自动清除 token 并跳转登录
2. **Bearer 格式**：使用标准的 Bearer Token 格式
3. **本地存储**：token 存储在微信小程序的本地存储中

### 请求安全

1. **HTTPS**：确保 API 地址使用 HTTPS
2. **域名白名单**：在小程序后台配置合法域名
3. **超时控制**：默认 10 秒超时，可自定义

## 📊 响应数据格式

后端应返回以下格式的数据：

```typescript
{
  "code": 200,              // 业务状态码，200 表示成功
  "message": "操作成功",    // 提示信息
  "data": {                 // 业务数据
    // 具体的业务数据
  },
  "timestamp": 1234567890   // 时间戳（可选）
}
```

### 成功响应示例

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "username": "zhangsan",
    "nickname": "张三"
  },
  "timestamp": 1700000000000
}
```

### 失败响应示例

```json
{
  "code": 400,
  "message": "用户名已存在",
  "data": null,
  "timestamp": 1700000000000
}
```

## 🔧 与旧版本的区别

### 旧版本（api/request.ts）

```typescript
import { request } from '@/api/request';

// 需要手动处理响应
const response = await request({ url: '/api/user/info' });
// response.data 才是业务数据
```

### 新版本（utils/requestUtil.ts）

```typescript
import { get } from '@/utils/requestUtil';

// 直接返回业务数据
const data = await get('/api/user/info');
// data 就是业务数据
```

## 💡 最佳实践

### 1. 在 API 模块中封装

```typescript
// api/modules/user.ts
import { get, post } from '@/utils/requestUtil';

export const userApi = {
  getInfo: () => get('/api/user/info'),
  updateInfo: (data) => post('/api/user/update', data)
};

// 在页面中使用
import { userApi } from '@/api/modules/user';
const userInfo = await userApi.getInfo();
```

### 2. 统一错误处理

```typescript
// 全局错误处理
try {
  const data = await get('/api/data');
  // 处理数据
} catch (error) {
  // 错误已经自动提示，这里只做日志记录
  console.error('请求失败', error);
}
```

### 3. 加载状态管理

```typescript
Page({
  data: {
    loading: false
  },

  async loadData() {
    this.setData({ loading: true });
    try {
      const data = await get('/api/data', null, {
        showLoading: true  // 显示全局 loading
      });
      // 处理数据
    } finally {
      this.setData({ loading: false });
    }
  }
});
```

## 🐛 常见问题

### Q1: 为什么请求没有携带 token？

**A**: 检查 token 是否已保存到本地存储：

```typescript
import { storage } from '@/utils/storage';
import { config } from '@/api/config';

const token = storage.get(config.tokenKey);
console.log('当前 token:', token);
```

### Q2: 如何自定义错误提示？

**A**: 设置 `showError: false`，然后自己处理：

```typescript
try {
  const data = await get('/api/data', null, { showError: false });
} catch (error) {
  wx.showModal({
    title: '提示',
    content: error.message || '请求失败'
  });
}
```

### Q3: 如何处理特殊的错误码？

**A**: 在 catch 中判断错误码：

```typescript
try {
  const data = await post('/api/create', formData);
} catch (error) {
  if (error.code === 40001) {
    // 特殊处理
    wx.showModal({ title: '提示', content: '数据已存在' });
  }
}
```

## 📚 相关文档

- [API 配置](../api/config.ts)
- [本地存储工具](./storage.ts)
- [登录功能说明](../pages/login/README.md)
