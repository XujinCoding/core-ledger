# 登录功能快速启动指南

## 🚀 5 分钟快速启动

### 第 1 步：配置 API 地址（必需）

编辑 `miniprogram/api/config.ts`：

```typescript
const ENV = {
  dev: {
    baseURL: 'https://your-api-domain.com',  // 👈 修改这里
    timeout: 10000
  }
};
```

### 第 2 步：准备图片资源（必需）

在 `miniprogram/images/` 目录下放置以下图片：

```
images/
├── logo.png              # 应用 Logo
├── wechat-icon.png       # 微信图标
├── phone-icon.png        # 手机图标
├── lock-icon.png         # 锁图标
├── eye-open.png          # 显示密码图标
├── eye-close.png         # 隐藏密码图标
├── phone-bind.png        # 手机绑定图标
└── code-icon.png         # 验证码图标
```

**临时方案**：如果暂时没有图片，可以先注释掉 WXML 中的 `<image>` 标签。

### 第 3 步：编译运行

1. 打开微信开发者工具
2. 导入项目
3. 点击"编译"
4. 查看登录页面效果

### 第 4 步：测试功能

#### 测试微信登录
1. 点击"微信一键登录"
2. 授权获取用户信息
3. 查看控制台输出的 code
4. 如果后端返回 `needBindPhone: true`，会跳转到绑定手机号页面

#### 测试密码登录
1. 点击"使用手机号密码登录"
2. 输入手机号：13800138000
3. 输入密码：123456
4. 点击"登录"

## 📋 后端接口要求

### 1. 微信登录接口

```
POST /api/auth/wechat-login
Content-Type: application/json

Request:
{
  "code": "081xxxxx",           // 微信登录 code
  "nickname": "微信用户",       // 可选
  "avatarUrl": "https://..."    // 可选
}

Response:
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "userInfo": {
      "id": 1,
      "username": "user001",
      "phone": "13800138000",
      "role": 0,
      "roleDesc": "普通用户",
      "wxNickname": "微信用户",
      "wxAvatarUrl": "https://..."
    },
    "needBindPhone": false,      // 是否需要绑定手机号
    "tempOpenid": "",            // 如果 needBindPhone=true，返回临时 openid
    "expireTime": "2024-12-31 23:59:59"
  },
  "timestamp": 1234567890
}
```

### 2. 密码登录接口

```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "phone": "13800138000",
  "password": "123456"
}

Response: 同微信登录
```

### 3. 绑定手机号接口

```
POST /api/auth/bind-phone
Content-Type: application/json

Request:
{
  "openid": "temp_openid_xxx",  // 临时 openid
  "phone": "13800138000",       // 手机号
  "encryptedData": "...",       // 微信加密数据（可选）
  "iv": "..."                   // 加密向量（可选）
}

Response: 同微信登录
```

## 🔧 常见问题

### Q1: 页面显示空白？
**A**: 检查图片路径是否正确，或者先注释掉图片标签。

### Q2: 点击登录没有反应？
**A**: 
1. 检查控制台是否有错误
2. 检查 API 地址是否配置正确
3. 检查网络请求是否成功

### Q3: 提示"未授权，请重新登录"？
**A**: 
1. 检查后端是否正确返回 token
2. 检查 token 是否正确保存到本地存储
3. 检查请求头是否正确添加 Authorization

### Q4: 微信登录获取不到用户信息？
**A**: 
1. `wx.getUserProfile()` 需要用户主动点击触发
2. 用户可能拒绝授权，需要处理拒绝情况
3. 基础库版本需要 >= 2.10.4

### Q5: 获取手机号失败？
**A**: 
1. 需要企业认证的小程序
2. 需要在小程序后台配置相关权限
3. 用户可能拒绝授权

## 📱 调试技巧

### 1. 查看网络请求
在微信开发者工具中：
- 点击"调试器"
- 选择"Network"标签
- 查看请求和响应

### 2. 查看本地存储
在控制台输入：
```javascript
wx.getStorageSync('access_token')
wx.getStorageSync('userInfo')
```

### 3. 模拟登录成功
在控制台输入：
```javascript
wx.setStorageSync('access_token', 'test_token_123')
wx.setStorageSync('userInfo', {
  id: 1,
  username: 'test',
  phone: '13800138000'
})
wx.reLaunch({ url: '/pages/index/index' })
```

### 4. 清除登录状态
在控制台输入：
```javascript
wx.clearStorageSync()
wx.reLaunch({ url: '/pages/login/login' })
```

## 🎯 下一步

### 必需完成
- [ ] 配置 API 地址
- [ ] 准备图片资源
- [ ] 测试登录流程
- [ ] 测试绑定手机号流程

### 可选优化
- [ ] 自定义错误提示文案
- [ ] 添加忘记密码功能
- [ ] 优化 UI 样式
- [ ] 添加登录动画

## 📚 相关文档

- [完整实现说明](IMPLEMENTATION_SUMMARY.md)
- [登录功能详细文档](miniprogram/pages/login/README.md)
- [图片资源说明](miniprogram/images/README.md)

## 💡 提示

1. **开发环境**：建议先在开发环境测试，确认无误后再切换到生产环境
2. **错误处理**：注意查看控制台的错误信息，大部分问题都能从错误信息中找到原因
3. **用户体验**：确保加载状态、错误提示等用户反馈清晰明确
4. **安全性**：生产环境中，密码应该加密传输，token 应该设置合理的过期时间

## 🆘 需要帮助？

如果遇到问题：
1. 查看控制台错误信息
2. 检查网络请求和响应
3. 参考完整文档
4. 检查代码是否有语法错误

---

**祝你使用愉快！** 🎉
