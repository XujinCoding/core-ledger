# 授权流程说明

## 📋 概述

系统已实现完整的授权检查机制，确保未登录用户无法访问需要授权的页面。

## 🔐 授权流程

### 启动流程

```
小程序启动
    ↓
进入首页 (pages/index/index)
    ↓
检查本地 token
    ├─ 有 token → 显示欢迎页面
    └─ 无 token → 跳转登录页 (pages/login/login)
```

### 登录流程

```
登录页面
    ↓
用户登录（微信登录 / 密码登录）
    ↓
登录成功，保存 token
    ↓
跳转到首页 (pages/index/index)
    ↓
显示欢迎页面
```

### 退出流程

```
首页点击"退出登录"
    ↓
确认退出
    ↓
清除本地 token 和用户信息
    ↓
跳转到登录页
```

## 📱 页面说明

### 首页 (pages/index/index)

#### 功能
- ✅ 自动检查授权状态
- ✅ 未授权自动跳转登录页
- ✅ 已授权显示欢迎信息
- ✅ 显示用户基本信息
- ✅ 提供退出登录功能

#### 授权检查时机
1. **onLoad**：页面加载时检查
2. **onShow**：页面显示时检查（从其他页面返回）

#### 页面内容
```
┌─────────────────────────┐
│                         │
│         🎉              │
│    欢迎访问系统          │
│    Core Ledger          │
│                         │
│   ┌───────────────┐     │
│   │   用户头像     │     │
│   │   用户昵称     │     │
│   │   用户角色     │     │
│   └───────────────┘     │
│                         │
│   [  退出登录  ]        │
│                         │
└─────────────────────────┘
```

### 登录页 (pages/login/login)

#### 功能
- ✅ 微信一键登录
- ✅ 手机号密码登录
- ✅ 登录成功跳转首页

### 绑定手机号页 (pages/bind-phone/bind-phone)

#### 功能
- ✅ 微信一键绑定
- ✅ 手动输入绑定
- ✅ 绑定成功跳转首页

## 🔧 实现细节

### 授权检查代码

```typescript
// pages/index/index.ts
checkAuth(): void {
  const token = storage.get<string>(config.tokenKey);
  const userInfo = storage.get('userInfo');

  if (!token) {
    // 没有 token，跳转到登录页
    wx.reLaunch({
      url: '/pages/login/login'
    });
    return;
  }

  // 有 token，显示用户信息
  this.setData({ userInfo });
}
```

### Token 存储

```typescript
// 登录成功后保存
storage.set(config.tokenKey, result.token);
storage.set('userInfo', result.userInfo);
storage.set('expireTime', result.expireTime);

// 退出登录时清除
storage.remove(config.tokenKey);
storage.remove('userInfo');
storage.remove('expireTime');
```

### 请求自动携带 Token

所有 API 请求都会自动携带 token（通过 `requestUtil`）：

```typescript
// utils/requestUtil.ts
function getHeaders(customHeader?: Record<string, string>): Record<string, string> {
  const token = storage.get<string>(config.tokenKey);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeader
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}
```

### 401 自动处理

当 API 返回 401 时，自动清除 token 并跳转登录：

```typescript
// utils/requestUtil.ts
if (error.statusCode === 401) {
  message = '登录已过期，请重新登录';
  storage.remove(config.tokenKey);
  storage.remove('userInfo');
  setTimeout(() => {
    wx.reLaunch({ url: '/pages/login/login' });
  }, 1500);
}
```

## 🎯 使用场景

### 场景 1：首次打开小程序

```
用户打开小程序
    ↓
进入首页
    ↓
检查 token（无）
    ↓
自动跳转登录页
    ↓
用户登录
    ↓
跳转回首页
    ↓
显示欢迎页面
```

### 场景 2：已登录用户打开小程序

```
用户打开小程序
    ↓
进入首页
    ↓
检查 token（有）
    ↓
显示欢迎页面
```

### 场景 3：Token 过期

```
用户访问需要授权的 API
    ↓
后端返回 401
    ↓
requestUtil 自动处理
    ↓
清除本地 token
    ↓
显示"登录已过期"提示
    ↓
自动跳转登录页
```

### 场景 4：用户退出登录

```
用户点击"退出登录"
    ↓
显示确认对话框
    ↓
用户确认
    ↓
清除本地 token 和用户信息
    ↓
跳转到登录页
```

## 🛡️ 安全机制

### 1. 多重检查
- **页面级检查**：每个页面的 onLoad 和 onShow 都检查授权
- **请求级检查**：每个 API 请求都自动携带 token
- **后端检查**：后端 `AuthInterceptor` 验证 token 有效性

### 2. 自动跳转
- 未授权自动跳转登录页
- 401 错误自动跳转登录页
- 使用 `wx.reLaunch` 清空页面栈

### 3. Token 管理
- 登录成功保存 token
- 退出登录清除 token
- 401 错误清除 token
- 使用加密存储（微信小程序本地存储）

## 📝 扩展其他页面

如果要为其他页面添加授权检查，可以使用以下模板：

```typescript
import { storage } from '../../utils/storage';
import { config } from '../../api/config';

Page({
  data: {
    // 页面数据
  },

  onLoad(): void {
    // 检查授权
    this.checkAuth();
    // 其他初始化逻辑
  },

  onShow(): void {
    // 检查授权
    this.checkAuth();
  },

  /**
   * 检查授权状态
   */
  checkAuth(): void {
    const token = storage.get<string>(config.tokenKey);
    if (!token) {
      wx.reLaunch({
        url: '/pages/login/login'
      });
      return;
    }
  },

  // 其他方法
});
```

## 🔧 配置说明

### Token Key 配置

在 `miniprogram/api/config.ts` 中配置：

```typescript
export const config = {
  // Token 存储 key
  tokenKey: 'access_token',
  
  // 其他配置...
};
```

### 登录页路径

如果修改了登录页路径，需要同步更新以下位置：

1. **首页授权检查**：`pages/index/index.ts`
2. **requestUtil 401 处理**：`utils/requestUtil.ts`
3. **app.json 页面配置**

## 💡 最佳实践

### 1. 统一授权检查

建议创建一个通用的授权检查方法：

```typescript
// utils/auth.ts
import { storage } from './storage';
import { config } from '../api/config';

export function checkAuth(): boolean {
  const token = storage.get<string>(config.tokenKey);
  if (!token) {
    wx.reLaunch({ url: '/pages/login/login' });
    return false;
  }
  return true;
}

// 在页面中使用
import { checkAuth } from '../../utils/auth';

Page({
  onLoad() {
    if (!checkAuth()) return;
    // 其他逻辑
  }
});
```

### 2. 页面分类

- **公开页面**：不需要授权（登录页、注册页等）
- **需授权页面**：需要登录才能访问（首页、个人中心等）

### 3. 用户体验

- 使用 `wx.reLaunch` 而不是 `wx.redirectTo`，避免用户返回到未授权页面
- 401 错误时显示友好提示，延迟跳转给用户阅读时间
- 退出登录时显示确认对话框，避免误操作

## 🐛 常见问题

### Q1: 为什么每次打开小程序都要登录？

**A**: 检查以下几点：
1. Token 是否正确保存到本地存储
2. Token key 是否配置正确
3. 是否在某处错误地清除了 token

### Q2: 登录后还是跳转到登录页？

**A**: 检查：
1. 登录成功后是否正确保存了 token
2. 首页的授权检查逻辑是否正确
3. 使用 `wx.reLaunch` 而不是 `wx.navigateTo`

### Q3: 如何测试授权流程？

**A**: 
```typescript
// 在控制台清除 token
wx.removeStorageSync('access_token')
wx.reLaunch({ url: '/pages/index/index' })

// 查看 token
console.log(wx.getStorageSync('access_token'))
```

## 📚 相关文档

- [登录功能说明](miniprogram/pages/login/README.md)
- [requestUtil 使用说明](miniprogram/utils/requestUtil.README.md)
- [快速启动指南](QUICK_START_LOGIN.md)
