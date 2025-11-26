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
└── complete-info/           # 完善信息页面
    ├── complete-info.ts     # 页面逻辑
    ├── complete-info.wxml   # 页面结构
    ├── complete-info.wxss   # 页面样式
    └── complete-info.json   # 页面配置

api/modules/
└── auth.ts                  # 认证相关 API

types/
└── auth.d.ts               # 认证相关类型定义
```

## 功能特性

### 登录页面 (pages/login)

#### 微信登录
- 一键授权登录
- 后台自动校验用户是否存在
- 如需补充信息或注册，自动跳转到完善信息页面

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

### 完善信息页面 (pages/complete-info)

#### 信息收集
- 手机号输入（必填）
- 昵称输入（可选，可跳过使用默认昵称）
- 头像选择（可选）

#### 两种场景
- **新用户注册**：调用注册接口完成账号创建
- **补充信息**：已存在用户补充缺失的信息

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
// 返回：
// - needSupplement: boolean  // 是否需要补充信息（已存在用户）
// - isNewUser: boolean       // 是否是新用户（需要注册）
// - tempOpenid: string       // 临时 openid
```

### 2. 补充用户信息
```typescript
authApi.supplementUserInfo({
  openid: string,           // 临时 openid（必填）
  phone: string,            // 手机号（必填）
  nickname?: string,        // 昵称
  avatarUrl?: string,       // 头像 URL
  username?: string         // 用户名
})
```

### 3. 注册新用户
```typescript
authApi.registerUser({
  openid: string,           // 临时 openid（必填）
  phone: string,            // 手机号（必填）
  nickname?: string,        // 昵称
  avatarUrl?: string,       // 头像 URL
  username?: string         // 用户名
})
```

### 4. 密码登录
```typescript
authApi.passwordLogin({
  phone: string,            // 手机号（必填）
  password: string          // 密码（必填）
})
```

### 5. 退出登录
```typescript
authApi.logout(token?: string)
```

### 6. 获取当前用户信息
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
3. 调用 authApi.wechatLogin() 发送到后端校验
   ↓
4. 后台判断用户是否存在并返回标志位
   ↓
5. 判断返回结果：
   - needSupplement = true: 已存在用户需要补充信息，跳转到完善信息页面
   - isNewUser = true: 新用户需要注册，跳转到完善信息页面
   - 两者都为 false: 登录成功，保存 token，跳转到首页
   ↓
6. 在完善信息页面：
   - 用户填写手机号、昵称、头像
   - 根据 isNewUser 标志调用对应接口：
     * isNewUser = true: 调用 registerUser 接口
     * needSupplement = true: 调用 supplementUserInfo 接口
   - 完成后保存 token，跳转到首页
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
