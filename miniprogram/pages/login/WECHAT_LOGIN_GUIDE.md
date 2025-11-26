# 微信登录完整实现指南

## 功能概述

本实现提供了简化的微信登录流程，采用**后端校验优先**的策略：
1. 点击登录后立即调用后端接口校验用户是否存在
2. 根据后端返回的标志位决定是否需要补充信息或注册
3. 在完善信息页面收集必要的用户信息（手机号、昵称、头像）

## 核心功能

### 1. 微信一键登录
- ✅ **快速登录** - 点击按钮即可发起登录请求
- ✅ **后端校验** - 后台自动判断用户状态
- ✅ **智能跳转** - 根据用户状态自动跳转到相应页面

### 2. 信息补充页面
- ✅ **手机号输入** - 必填项，用于账号绑定
- ✅ **昵称输入** - 可选项，可使用默认昵称
- ✅ **头像选择** - 可选项，使用 `open-type="chooseAvatar"`

## 登录流程

### 完整流程

```
1. 用户点击"微信一键登录"
   ↓
2. 调用 wx.login() 获取 code
   ↓
3. 发送 code 到后端进行校验
   ↓
4. 后端判断用户状态并返回标志位：
   - needSupplement: 已存在用户需要补充信息
   - isNewUser: 新用户需要注册
   - 两者都为 false: 用户信息完整，直接登录
   ↓
5a. 如果需要补充信息或注册：
    - 跳转到完善信息页面
    - 用户填写手机号、昵称（可选）、头像（可选）
    - 根据 isNewUser 标志调用对应接口：
      * isNewUser = true: 调用注册接口
      * needSupplement = true: 调用补充信息接口
    - 完成后保存 token，跳转到首页
   ↓
5b. 如果信息完整：
    - 直接保存 token
    - 跳转到首页
```

## 代码实现

### 1. 登录页面 (login.ts)

#### 页面数据结构
```typescript
data: {
  loginType: 'wechat' as LoginType,
  phone: '',
  password: '',
  showPassword: false,
  loading: false
}
```

#### 微信一键登录
```typescript
async handleWechatLogin(): Promise<void> {
  try {
    this.setData({ loading: true });

    // 获取微信登录 code
    const loginRes = await this.getWechatLoginCode();
    
    // 调用后台校验接口
    const result = await authApi.wechatLogin({
      code: loginRes.code
    });

    // 判断是否需要补充信息或注册
    if (result.needSupplement || result.isNewUser) {
      // 保存临时数据，跳转到补充信息页面
      storage.set('tempLoginData', {
        tempOpenid: result.tempOpenid,
        isNewUser: result.isNewUser,
        needSupplement: result.needSupplement
      });
      
      wx.redirectTo({
        url: '/pages/complete-info/complete-info'
      });
    } else {
      // 登录成功，直接跳转首页
      this.saveLoginInfo(result);
      this.redirectToHome();
    }
  } catch (error: any) {
    wx.showToast({
      title: error.message || '登录失败，请重试',
      icon: 'none'
    });
  } finally {
    this.setData({ loading: false });
  }
}
```

### 2. 完善信息页面 (complete-info.ts)

#### 完成登录逻辑
```typescript
async completeLogin(phone: string, nickname: string, avatarUrl: string): Promise<void> {
  try {
    this.setData({ loading: true });

    // 获取临时登录数据
    const tempLoginData = storage.get<any>('tempLoginData');
    
    // 构建请求数据
    const requestData = {
      openid: tempLoginData.tempOpenid,
      phone: phone,
      nickname: nickname,
      avatarUrl: avatarUrl || undefined
    };

    let result;
    
    // 根据 isNewUser 标志位判断调用哪个接口
    if (tempLoginData.isNewUser) {
      // 新用户，调用注册接口
      result = await authApi.registerUser(requestData);
    } else if (tempLoginData.needSupplement) {
      // 已存在用户，调用补充信息接口
      result = await authApi.supplementUserInfo(requestData);
    }

    // 清除临时数据
    storage.remove('tempLoginData');

    // 保存登录信息
    saveLoginInfo(result.token, result.userInfo, result.expireTime);

    // 跳转到首页
    wx.reLaunch({ url: '/pages/index/index' });
  } catch (error: any) {
    wx.showToast({
      title: error.message || '登录失败，请重试',
      icon: 'none'
    });
  } finally {
    this.setData({ loading: false });
  }
}
```

## API 接口

### 1. 微信登录接口

**请求地址**: `POST /api/auth/wechat-login`

**请求参数**:
```typescript
{
  code: string;              // 微信登录 code（必填）
  encryptedData?: string;    // 加密数据（可选）
  iv?: string;               // 加密向量（可选）
  nickname?: string;         // 微信昵称（可选）
  avatarUrl?: string;        // 微信头像URL（可选）
}
```

**响应数据**:
```typescript
{
  token: string;             // 访问令牌
  userInfo: {
    id: number;
    username: string;
    phone: string;
    role: number;
    roleDesc: string;
    wxNickname: string;
    wxAvatarUrl: string;
  };
  needSupplement: boolean;   // 是否需要补充信息（已存在用户）
  isNewUser: boolean;        // 是否是新用户（需要注册）
  tempOpenid: string;        // 临时 openid
  expireTime: string;        // 令牌过期时间
}
```

### 2. 补充用户信息接口

**请求地址**: `POST /api/auth/supplement-info`

**请求参数**:
```typescript
{
  openid: string;            // 临时 openid（必填）
  phone: string;             // 手机号（必填）
  nickname?: string;         // 昵称（可选）
  avatarUrl?: string;        // 头像 URL（可选）
  username?: string;         // 用户名（可选）
}
```

**响应数据**: 同微信登录接口

### 3. 注册新用户接口

**请求地址**: `POST /api/auth/register`

**请求参数**:
```typescript
{
  openid: string;            // 临时 openid（必填）
  phone: string;             // 手机号（必填）
  nickname?: string;         // 昵称（可选）
  avatarUrl?: string;        // 头像 URL（可选）
  username?: string;         // 用户名（可选）
}
```

**响应数据**: 同微信登录接口

## 数据存储

### 临时登录数据
登录页面在跳转到完善信息页面前保存临时数据：

```typescript
storage.set('tempLoginData', {
  tempOpenid: result.tempOpenid,
  isNewUser: result.isNewUser,
  needSupplement: result.needSupplement
});
```

### 登录成功数据
登录成功后保存用户信息：

```typescript
storage.set('access_token', result.token);
storage.set('userInfo', result.userInfo);
storage.set('expireTime', result.expireTime);
```

## 注意事项

### 1. 后端校验
- 后端需要根据 openid 判断用户是否存在
- 已存在但缺少手机号：返回 `needSupplement: true`
- 新用户：返回 `isNewUser: true`
- 信息完整：返回两个标志都为 `false`

### 2. 用户体验
- 点击登录后立即发起请求，无需预先收集信息
- 只在必要时才要求用户填写信息
- 提供清晰的错误提示

### 3. 安全性
- Token 存储在本地，注意安全防护
- 敏感操作需要验证 Token 有效性
- tempOpenid 只在登录流程中临时使用

### 4. 头像选择
- 使用 `open-type="chooseAvatar"` 需要基础库 2.21.2+
- 头像 URL 是临时的，建议后端下载并保存到服务器

## 测试建议

### 1. 功能测试
- [ ] 新用户首次登录：点击登录 → 跳转完善信息 → 填写信息 → 注册成功
- [ ] 老用户需补充信息：点击登录 → 跳转完善信息 → 补充信息 → 登录成功
- [ ] 信息完整用户：点击登录 → 直接登录成功
- [ ] 网络异常：测试网络错误时的提示
- [ ] 跳过功能：测试跳过昵称和头像的默认值生成

### 2. 数据流转测试
- [ ] 临时数据正确保存和读取
- [ ] 登录成功后临时数据正确清除
- [ ] Token 和用户信息正确保存

### 3. UI测试
- [ ] 页面跳转流畅
- [ ] 加载状态显示正确
- [ ] 表单验证提示友好
- [ ] 按钮状态正确（启用/禁用）

## 后端实现要点

### 1. 微信登录接口逻辑
```javascript
// 1. 使用 code 换取 session_key 和 openid
const { session_key, openid } = await getWxSession(code);

// 2. 查询用户是否存在
const user = await findUserByOpenid(openid);

if (!user) {
  // 新用户
  return {
    needSupplement: false,
    isNewUser: true,
    tempOpenid: openid,
    token: null,
    userInfo: null
  };
} else if (!user.phone) {
  // 已存在但缺少手机号
  return {
    needSupplement: true,
    isNewUser: false,
    tempOpenid: openid,
    token: null,
    userInfo: null
  };
} else {
  // 信息完整，直接登录
  const token = generateToken(user);
  return {
    needSupplement: false,
    isNewUser: false,
    token: token,
    userInfo: user,
    expireTime: getTokenExpireTime()
  };
}
```

### 2. 补充信息接口
```javascript
// 更新已存在用户的信息
const user = await findUserByOpenid(openid);
user.phone = phone;
user.wxNickname = nickname;
user.wxAvatarUrl = avatarUrl;
await user.save();

const token = generateToken(user);
return { token, userInfo: user };
```

### 3. 注册接口
```javascript
// 创建新用户
const user = await createUser({
  openid: openid,
  phone: phone,
  wxNickname: nickname,
  wxAvatarUrl: avatarUrl
});

const token = generateToken(user);
return { token, userInfo: user };
```

## 常见问题

### Q1: 为什么采用后端校验优先的策略？
A: 这样可以简化前端流程，只在必要时才要求用户填写信息，提升用户体验。同时避免收集不必要的用户数据。

### Q2: needSupplement 和 isNewUser 的区别？
A: `isNewUser: true` 表示数据库中没有该用户记录，需要注册；`needSupplement: true` 表示用户已存在但缺少必要信息（如手机号），需要补充。

### Q3: tempOpenid 的作用是什么？
A: tempOpenid 是临时的用户标识，在用户完成信息补充或注册前使用，完成后会换成正式的 token。

### Q4: 如何处理用户取消填写信息？
A: 用户可以返回登录页，但下次登录时仍会要求补充信息。可以考虑添加"稍后填写"功能并给予有限的访问权限。

### Q5: 头像 URL 如何处理？
A: 微信返回的是临时 URL，建议后端下载并保存到自己的服务器，然后返回永久 URL。

## 总结

本实现提供了简化高效的微信登录流程，特点包括：
- ✅ **后端校验优先** - 减少不必要的用户操作
- ✅ **智能跳转** - 根据用户状态自动决定流程
- ✅ **分离关注点** - 登录和信息收集分离
- ✅ **清晰的状态管理** - 使用标志位明确用户状态
- ✅ **完善的错误处理** - 友好的错误提示
- ✅ **良好的用户体验** - 最少的操作步骤

遵循了最小化数据收集原则和用户隐私保护要求。
