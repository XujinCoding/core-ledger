# 登录功能说明

## 功能概述

本登录模块实现了两种登录方式：
1. **微信一键登录** - 使用微信授权快速登录
2. **手机号密码登录** - 传统的账号密码登录方式

## 文件结构

```
pages/
├── login/                    # 登录页面
│   ├── login.ts             # 页面逻辑
│   ├── login.wxml           # 页面结构
│   ├── login.wxss           # 页面样式
│   └── login.json           # 页面配置
└── bind-phone/              # 绑定手机号页面
    ├── bind-phone.ts        # 页面逻辑
    ├── bind-phone.wxml      # 页面结构
    ├── bind-phone.wxss      # 页面样式
    └── bind-phone.json      # 页面配置

api/modules/
└── auth.ts                  # 认证相关 API

types/
└── auth.d.ts               # 认证相关类型定义
```

## 功能特性

### 登录页面 (pages/login)

#### 微信登录
- 一键授权登录
- 自动获取微信用户信息（昵称、头像）
- 如需绑定手机号，自动跳转到绑定页面

#### 密码登录
- 手机号格式验证
- 密码显示/隐藏切换
- 表单验证（手机号格式、密码长度）
- 忘记密码功能（待实现）

#### 通用功能
- 登录方式切换
- 用户协议和隐私政策
- 加载状态提示
- 错误处理和提示

### 绑定手机号页面 (pages/bind-phone)

#### 微信一键绑定
- 使用微信 `getPhoneNumber` API
- 自动获取加密手机号信息
- 后端解密并绑定

#### 手动绑定
- 手机号输入
- 验证码发送（60秒倒计时）
- 验证码验证

## API 接口

### 1. 微信登录
```typescript
authApi.wechatLogin({
  code: string,              // 微信登录 code（必填）
  encryptedData?: string,    // 加密数据
  iv?: string,               // 加密向量
  nickname?: string,         // 微信昵称
  avatarUrl?: string         // 微信头像
})
```

### 2. 绑定手机号
```typescript
authApi.bindPhone({
  openid: string,           // 临时 openid（必填）
  phone: string,            // 手机号（必填）
  encryptedData?: string,   // 微信加密数据
  iv?: string               // 加密向量
})
```

### 3. 密码登录
```typescript
authApi.passwordLogin({
  phone: string,            // 手机号（必填）
  password: string          // 密码（必填）
})
```

### 4. 退出登录
```typescript
authApi.logout(token?: string)
```

### 5. 获取当前用户信息
```typescript
authApi.getCurrentUser(token: string)
```

## 登录流程

### 微信登录流程
```
1. 用户点击"微信一键登录"
   ↓
2. 调用 wx.login() 获取 code
   ↓
3. 调用 wx.getUserProfile() 获取用户信息（可选）
   ↓
4. 调用 authApi.wechatLogin() 发送到后端
   ↓
5. 判断返回结果：
   - needBindPhone = true: 跳转到绑定手机号页面
   - needBindPhone = false: 保存 token，跳转到首页
```

### 密码登录流程
```
1. 用户输入手机号和密码
   ↓
2. 前端验证表单（手机号格式、密码长度）
   ↓
3. 调用 authApi.passwordLogin() 发送到后端
   ↓
4. 登录成功：保存 token，跳转到首页
   ↓
5. 登录失败：显示错误提示
```

### 绑定手机号流程
```
方式一：微信一键绑定
1. 用户点击"微信一键绑定"
   ↓
2. 调用 wx.getPhoneNumber() 获取加密数据
   ↓
3. 调用 authApi.bindPhone() 发送到后端
   ↓
4. 后端解密并绑定，返回 token
   ↓
5. 保存 token，跳转到首页

方式二：手动绑定
1. 用户输入手机号
   ↓
2. 点击"获取验证码"，发送验证码
   ↓
3. 用户输入验证码
   ↓
4. 调用 authApi.bindPhone() 发送到后端
   ↓
5. 验证成功，返回 token
   ↓
6. 保存 token，跳转到首页
```

## 数据存储

登录成功后，以下数据会保存到本地存储：

```typescript
storage.set('access_token', result.token);      // 访问令牌
storage.set('userInfo', result.userInfo);       // 用户信息
storage.set('expireTime', result.expireTime);   // 过期时间
```

## 权限配置

需要在 `app.json` 中配置以下权限：

```json
{
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  },
  "requiredPrivateInfos": [
    "getLocation",
    "chooseAddress"
  ]
}
```

## 注意事项

1. **微信登录**
   - `wx.getUserProfile()` 需要用户主动触发（button 点击）
   - 用户可以拒绝授权，需要处理拒绝情况
   - 获取手机号需要企业认证的小程序

2. **安全性**
   - 密码不要在前端明文传输，建议使用 RSA 加密
   - Token 存储在本地，注意防止 XSS 攻击
   - 敏感操作需要验证 Token 有效性

3. **用户体验**
   - 提供清晰的错误提示
   - 加载状态要有明确的视觉反馈
   - 表单验证要及时友好

4. **图片资源**
   - 需要准备以下图片资源：
     - `/images/logo.png` - 应用 Logo
     - `/images/wechat-icon.png` - 微信图标
     - `/images/phone-icon.png` - 手机图标
     - `/images/lock-icon.png` - 锁图标
     - `/images/eye-open.png` - 眼睛睁开图标
     - `/images/eye-close.png` - 眼睛闭合图标
     - `/images/phone-bind.png` - 手机绑定图标
     - `/images/code-icon.png` - 验证码图标

## 后续优化

1. 添加第三方登录（QQ、微博等）
2. 实现忘记密码功能
3. 添加生物识别登录（指纹、面容）
4. 优化错误提示文案
5. 添加登录日志记录
6. 实现自动登录（记住密码）
7. 添加验证码图形验证
