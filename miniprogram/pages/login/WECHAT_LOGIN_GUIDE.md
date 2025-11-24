# 微信登录完整实现指南

## 功能概述

本实现提供了完整的微信登录流程，支持获取用户的**头像、昵称和手机号**，遵循微信小程序最新的API规范。

## 核心功能

### 1. 用户信息获取
- ✅ **头像选择** - 使用 `open-type="chooseAvatar"` 让用户选择头像
- ✅ **昵称输入** - 使用 `type="nickname"` 的 input 组件获取昵称
- ✅ **手机号授权** - 使用 `open-type="getPhoneNumber"` 获取手机号

### 2. 兼容性处理
- 支持新版API（基础库 2.21.2+）：头像昵称选择 + 手机号授权
- 支持旧版API（基础库 2.10.4+）：getUserProfile 获取用户信息
- 自动检测并使用合适的API版本

## 登录流程

### 方式一：新版API（推荐）

```
1. 用户选择头像
   ↓
2. 用户输入昵称
   ↓
3. 点击"获取手机号并登录"按钮
   ↓
4. 微信授权手机号
   ↓
5. 调用 wx.login() 获取 code
   ↓
6. 发送 code + 头像 + 昵称 + 手机号加密数据到后端
   ↓
7. 后端解密手机号，完成登录
   ↓
8. 返回 token 和用户信息
```

### 方式二：旧版API（兼容）

```
1. 点击"微信一键登录"
   ↓
2. 调用 wx.getUserProfile() 获取用户信息
   ↓
3. 调用 wx.login() 获取 code
   ↓
4. 发送 code + 用户信息到后端
   ↓
5. 后端判断是否需要绑定手机号
   ↓
6a. 如果需要绑定：跳转到绑定手机号页面
6b. 如果不需要：直接登录成功
```

## 代码实现

### 1. 页面数据结构 (login.ts)

```typescript
data: {
  loginType: 'wechat' as LoginType,
  loading: false,
  // 用户信息
  userInfo: {
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/...',  // 默认头像
    nickName: ''
  },
  hasUserInfo: false,
  canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  canIUseGetUserProfile: wx.canIUse('getUserProfile')
}
```

### 2. 关键方法

#### 选择头像
```typescript
onChooseAvatar(e: any): void {
  const { avatarUrl } = e.detail;
  const { nickName } = this.data.userInfo;
  
  this.setData({
    'userInfo.avatarUrl': avatarUrl,
    hasUserInfo: !!nickName && !!avatarUrl
  });
}
```

#### 输入昵称
```typescript
onNicknameInput(e: WechatMiniprogram.Input): void {
  const nickName = e.detail.value;
  const { avatarUrl } = this.data.userInfo;
  
  this.setData({
    'userInfo.nickName': nickName,
    hasUserInfo: !!nickName && !!avatarUrl
  });
}
```

#### 微信登录（带手机号）
```typescript
async handleWechatLoginWithPhone(e: WechatMiniprogram.ButtonGetPhoneNumber): Promise<void> {
  if (e.detail.errMsg !== 'getPhoneNumber:ok') {
    wx.showToast({ title: '需要手机号授权才能登录', icon: 'none' });
    return;
  }

  // 获取微信登录 code
  const loginRes = await this.getWechatLoginCode();
  
  // 调用登录接口
  const loginData = {
    code: loginRes.code,
    nickname: this.data.userInfo.nickName,
    avatarUrl: this.data.userInfo.avatarUrl,
    encryptedData: e.detail.encryptedData,  // 手机号加密数据
    iv: e.detail.iv                          // 加密向量
  };

  const result = await authApi.wechatLogin(loginData);
  
  // 保存登录信息
  this.saveLoginInfo(result);
  this.redirectToHome();
}
```

### 3. WXML 结构

```xml
<!-- 新版API：头像昵称选择 -->
<block wx:if="{{canIUseNicknameComp && !hasUserInfo}}">
  <view class="user-info-section">
    <!-- 头像选择 -->
    <button class="avatar-wrapper" open-type="chooseAvatar" bind:chooseavatar="onChooseAvatar">
      <image class="avatar" src="{{userInfo.avatarUrl}}" mode="aspectFill"></image>
      <view class="avatar-tip">点击选择头像</view>
    </button>
    
    <!-- 昵称输入 -->
    <view class="nickname-wrapper">
      <text class="nickname-label">昵称</text>
      <input 
        type="nickname" 
        class="nickname-input" 
        placeholder="请输入昵称" 
        value="{{userInfo.nickName}}"
        bind:change="onNicknameInput" 
      />
    </view>
    
    <!-- 手机号授权登录按钮 -->
    <button 
      class="wechat-login-btn" 
      open-type="getPhoneNumber" 
      bind:getphonenumber="handleWechatLoginWithPhone"
      loading="{{loading}}"
      disabled="{{loading || !hasUserInfo}}"
    >
      <image class="wechat-icon" src="/images/wechat-icon.png"></image>
      <text>获取手机号并登录</text>
    </button>
  </view>
</block>
```

## API 接口

### 微信登录接口

**请求地址**: `POST /api/auth/wechat-login`

**请求参数**:
```typescript
{
  code: string;              // 微信登录 code（必填）
  nickname?: string;         // 用户昵称（可选）
  avatarUrl?: string;        // 用户头像URL（可选）
  encryptedData?: string;    // 手机号加密数据（可选）
  iv?: string;               // 加密向量（可选）
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
    wxNickname: string;
    wxAvatarUrl: string;
  };
  needBindPhone: boolean;    // 是否需要绑定手机号
  tempOpenid?: string;       // 临时openid（需要绑定手机号时返回）
  expireTime: string;        // 令牌过期时间
}
```

## 绑定手机号页面

如果后端返回 `needBindPhone: true`，会跳转到绑定手机号页面。

### 功能特性

1. **显示用户信息** - 展示已选择的头像和昵称
2. **微信一键绑定** - 使用微信授权快速绑定手机号
3. **手动绑定** - 输入手机号和验证码进行绑定

### 数据传递

登录页面会将用户信息保存到本地存储：

```typescript
storage.set('tempOpenid', result.tempOpenid);
storage.set('tempUserInfo', userInfo);
```

绑定页面读取并显示：

```typescript
const tempUserInfo = storage.get<any>('tempUserInfo');
if (tempUserInfo) {
  this.setData({ userInfo: tempUserInfo });
}
```

## 样式说明

### 头像选择样式
```css
.avatar-wrapper {
  position: relative;
  width: 160rpx;
  height: 160rpx;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 4rpx solid #f0f0f0;
}
```

### 昵称输入样式
```css
.nickname-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  height: 96rpx;
  border-bottom: 2rpx solid #f0f0f0;
}
```

## 注意事项

### 1. 权限要求
- **获取手机号** 需要企业认证的小程序
- 需要在微信公众平台配置服务器域名

### 2. API版本
- 新版头像昵称API：基础库 2.21.2+
- getUserProfile：基础库 2.10.4+
- getPhoneNumber：基础库 1.2.0+

### 3. 用户体验
- 头像和昵称选择完成后才能点击登录按钮
- 提供清晰的操作提示
- 支持用户拒绝授权的情况

### 4. 安全性
- 手机号通过加密数据传输，后端解密
- Token 存储在本地，注意安全防护
- 敏感操作需要验证 Token 有效性

## 测试建议

### 1. 功能测试
- [ ] 新版API：选择头像 → 输入昵称 → 授权手机号 → 登录成功
- [ ] 旧版API：点击登录 → 授权用户信息 → 绑定手机号 → 登录成功
- [ ] 拒绝授权：测试用户拒绝各种授权的情况
- [ ] 网络异常：测试网络错误时的提示

### 2. 兼容性测试
- [ ] 测试不同基础库版本
- [ ] 测试不同微信版本
- [ ] 测试iOS和Android平台

### 3. UI测试
- [ ] 头像显示正常
- [ ] 昵称输入流畅
- [ ] 按钮状态正确（启用/禁用）
- [ ] 加载状态显示

## 后端实现要点

### 1. 解密手机号
```javascript
// 使用微信提供的解密算法
const WXBizDataCrypt = require('./WXBizDataCrypt');
const decrypt = new WXBizDataCrypt(appId, sessionKey);
const data = decrypt.decryptData(encryptedData, iv);
// data.phoneNumber 即为手机号
```

### 2. 用户信息存储
```javascript
{
  openid: string,          // 微信openid
  unionid: string,         // 微信unionid（如果有）
  phone: string,           // 手机号
  wxNickname: string,      // 微信昵称
  wxAvatarUrl: string,     // 微信头像
  // ... 其他字段
}
```

### 3. Token生成
```javascript
const token = jwt.sign(
  { userId: user.id, openid: user.openid },
  SECRET_KEY,
  { expiresIn: '7d' }
);
```

## 常见问题

### Q1: 为什么需要两种登录方式？
A: 微信在不同版本提供了不同的API。新版API更符合用户隐私保护要求，但需要更高的基础库版本。旧版API作为兼容方案。

### Q2: 如何判断是否需要绑定手机号？
A: 后端根据openid查询数据库，如果用户记录存在且已绑定手机号，返回 `needBindPhone: false`；否则返回 `true`。

### Q3: 用户拒绝授权怎么办？
A: 代码中已处理拒绝授权的情况，会显示友好提示。如果是必需的授权，可以引导用户重新授权。

### Q4: 头像上传到哪里？
A: 微信返回的是临时头像URL，建议后端下载并上传到自己的服务器，然后保存永久URL。

## 总结

本实现完整支持了微信小程序的用户信息获取，包括：
- ✅ 头像选择
- ✅ 昵称输入
- ✅ 手机号授权
- ✅ 多版本兼容
- ✅ 完善的错误处理
- ✅ 良好的用户体验

遵循了微信官方最新的API规范和隐私保护要求。
