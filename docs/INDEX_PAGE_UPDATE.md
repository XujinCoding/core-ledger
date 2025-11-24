# 首页授权检查更新说明

## ✅ 已完成的工作

### 1. 重写首页 (pages/index/index)

#### 功能更新
- ✅ 添加授权检查逻辑
- ✅ 未授权自动跳转登录页
- ✅ 简化页面内容为"欢迎访问系统"
- ✅ 显示用户基本信息
- ✅ 添加退出登录功能

#### 页面效果
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

### 2. 创建授权工具 (utils/auth.ts)

提供了完整的授权管理工具：

```typescript
// 检查是否已登录
isLoggedIn(): boolean

// 检查授权（未授权自动跳转登录页）
checkAuth(): boolean

// 获取当前用户信息
getCurrentUser(): any

// 获取当前用户 ID
getCurrentUserId(): number | null

// 获取当前 Token
getToken(): string | null

// 保存登录信息
saveLoginInfo(token, userInfo, expireTime): void

// 清除登录信息
clearLoginInfo(): void

// 退出登录
logout(showConfirm): void

// 检查 Token 是否过期
isTokenExpired(): boolean
```

### 3. 更新页面路由

将首页设为启动页，通过授权检查决定是否跳转登录：

```json
{
  "pages": [
    "pages/index/index",      // 首页（启动页）
    "pages/login/login",      // 登录页
    "pages/logs/logs",
    "pages/bind-phone/bind-phone"
  ]
}
```

### 4. 更新相关页面

- ✅ 登录页：使用 auth 工具简化代码
- ✅ 绑定手机号页：使用 auth 工具简化代码

## 🔐 授权流程

### 启动流程

```
小程序启动
    ↓
进入首页 (pages/index/index)
    ↓
执行 checkAuth()
    ├─ 有 token → 显示欢迎页面
    └─ 无 token → 跳转登录页
```

### 登录后流程

```
用户登录成功
    ↓
保存 token 和用户信息
    ↓
跳转到首页
    ↓
显示欢迎页面
```

### 退出流程

```
点击"退出登录"
    ↓
显示确认对话框
    ↓
用户确认
    ↓
清除 token 和用户信息
    ↓
跳转到登录页
```

## 📁 文件变更

### 新增文件
1. **`miniprogram/utils/auth.ts`** - 授权工具类
2. **`AUTH_FLOW.md`** - 授权流程说明文档
3. **`INDEX_PAGE_UPDATE.md`** - 本文档

### 修改文件
1. **`miniprogram/pages/index/index.ts`**
   - 重写页面逻辑
   - 添加授权检查
   - 使用 auth 工具

2. **`miniprogram/pages/index/index.wxml`**
   - 简化页面结构
   - 只显示欢迎信息和用户信息

3. **`miniprogram/pages/index/index.less`**
   - 重写样式
   - 使用渐变背景
   - 居中布局

4. **`miniprogram/app.json`**
   - 将 index 设为首页

5. **`miniprogram/pages/login/login.ts`**
   - 使用 auth 工具简化代码

6. **`miniprogram/pages/bind-phone/bind-phone.ts`**
   - 使用 auth 工具简化代码

## 🎨 UI 设计

### 颜色方案
- **背景渐变**：#667eea → #764ba2（紫色渐变）
- **文字颜色**：白色及半透明白色
- **卡片背景**：半透明白色 + 毛玻璃效果

### 动画效果
- 欢迎图标：上下弹跳动画（2秒循环）
- 毛玻璃效果：backdrop-filter: blur(10px)

### 响应式设计
- 使用 rpx 单位适配不同屏幕
- 居中布局，适配各种屏幕尺寸

## 💻 代码示例

### 使用 auth 工具

```typescript
import { checkAuth, getCurrentUser, logout } from '@/utils/auth';

Page({
  onLoad() {
    // 检查授权
    if (!checkAuth()) {
      return; // 未授权会自动跳转登录页
    }
    
    // 获取用户信息
    const userInfo = getCurrentUser();
    console.log(userInfo);
  },
  
  handleLogout() {
    // 退出登录（显示确认对话框）
    logout(true);
  }
});
```

### 为其他页面添加授权检查

```typescript
import { checkAuth } from '@/utils/auth';

Page({
  onLoad() {
    // 检查授权
    if (!checkAuth()) {
      return;
    }
    
    // 其他初始化逻辑
    this.loadData();
  },
  
  onShow() {
    // 每次显示时也检查授权
    if (!checkAuth()) {
      return;
    }
  }
});
```

## 🔧 配置说明

### Token 存储 Key

在 `miniprogram/api/config.ts` 中配置：

```typescript
export const config = {
  tokenKey: 'access_token',  // Token 存储 key
  // ...
};
```

### 登录页路径

如果修改登录页路径，需要更新：
1. `utils/auth.ts` 中的 `checkAuth()` 方法
2. `utils/requestUtil.ts` 中的 401 处理

## 🎯 测试场景

### 场景 1：首次打开小程序（未登录）

```
打开小程序
    ↓
进入首页
    ↓
检查 token（无）
    ↓
自动跳转登录页
```

### 场景 2：已登录用户打开小程序

```
打开小程序
    ↓
进入首页
    ↓
检查 token（有）
    ↓
显示欢迎页面
```

### 场景 3：用户退出登录

```
点击"退出登录"
    ↓
显示确认对话框
    ↓
确认退出
    ↓
清除 token
    ↓
跳转登录页
```

### 场景 4：Token 过期

```
访问需要授权的 API
    ↓
后端返回 401
    ↓
requestUtil 自动处理
    ↓
清除 token
    ↓
显示提示
    ↓
跳转登录页
```

## 📊 代码对比

### 旧版本（复杂）

```typescript
// 需要手动检查和跳转
onLoad() {
  const token = storage.get(config.tokenKey);
  if (!token) {
    wx.reLaunch({ url: '/pages/login/login' });
    return;
  }
  const userInfo = storage.get('userInfo');
  this.setData({ userInfo });
}

// 需要手动清除和跳转
handleLogout() {
  wx.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        storage.remove(config.tokenKey);
        storage.remove('userInfo');
        storage.remove('expireTime');
        wx.reLaunch({ url: '/pages/login/login' });
      }
    }
  });
}
```

### 新版本（简洁）

```typescript
// 一行代码检查授权
onLoad() {
  if (!checkAuth()) return;
  const userInfo = getCurrentUser();
  this.setData({ userInfo });
}

// 一行代码退出登录
handleLogout() {
  logout(true);
}
```

**代码减少**：从 20 行减少到 5 行，减少 75%

## 🛡️ 安全特性

1. **多重检查**
   - 页面加载时检查（onLoad）
   - 页面显示时检查（onShow）
   - API 请求时检查（requestUtil）

2. **自动跳转**
   - 使用 `wx.reLaunch` 清空页面栈
   - 防止用户返回到未授权页面

3. **Token 管理**
   - 统一的 token 存储和清除
   - 自动过期检查
   - 401 自动处理

## 💡 最佳实践

### 1. 统一使用 auth 工具

```typescript
// ✅ 推荐
import { checkAuth, logout } from '@/utils/auth';

// ❌ 不推荐
import { storage } from '@/utils/storage';
import { config } from '@/api/config';
const token = storage.get(config.tokenKey);
```

### 2. 页面授权检查

```typescript
// ✅ 推荐：在 onLoad 和 onShow 中检查
onLoad() {
  if (!checkAuth()) return;
  // 其他逻辑
}

onShow() {
  if (!checkAuth()) return;
}
```

### 3. 退出登录

```typescript
// ✅ 推荐：使用 logout 工具
logout(true);  // 显示确认对话框

// 特殊情况：不显示确认对话框
logout(false);
```

## 🐛 常见问题

### Q1: 为什么每次打开都要登录？

**A**: 检查：
1. Token 是否正确保存
2. Token key 是否配置正确
3. 是否在某处错误清除了 token

### Q2: 登录后还是跳转到登录页？

**A**: 检查：
1. 登录成功后是否保存了 token
2. 使用 `wx.reLaunch` 而不是 `wx.navigateTo`

### Q3: 如何调试授权流程？

**A**: 在控制台执行：
```javascript
// 查看 token
console.log(wx.getStorageSync('access_token'))

// 清除 token
wx.removeStorageSync('access_token')

// 重新进入首页
wx.reLaunch({ url: '/pages/index/index' })
```

## 📚 相关文档

- [授权流程说明](AUTH_FLOW.md)
- [requestUtil 使用说明](miniprogram/utils/requestUtil.README.md)
- [登录功能说明](miniprogram/pages/login/README.md)
- [快速启动指南](QUICK_START_LOGIN.md)

## 🎉 总结

已完成首页授权检查和页面简化：

- ✅ 首页添加授权检查，未授权自动跳转登录
- ✅ 页面内容简化为"欢迎访问系统"
- ✅ 创建 auth 工具，统一管理授权
- ✅ 更新相关页面，使用 auth 工具
- ✅ 完善文档，提供详细说明

所有功能已经可以正常使用！
