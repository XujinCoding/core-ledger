# 登录功能检查清单 ✅

## 📋 实施前检查

### 代码文件
- [x] `miniprogram/api/modules/auth.ts` - 认证 API 模块
- [x] `miniprogram/types/auth.d.ts` - 认证类型定义
- [x] `miniprogram/pages/login/` - 登录页面（4个文件）
- [x] `miniprogram/pages/bind-phone/` - 绑定手机号页面（4个文件）
- [x] `miniprogram/app.json` - 已添加页面路由
- [x] `miniprogram/api/modules/index.ts` - 已导出认证 API

### 配置项
- [ ] **API 地址配置**
  - 文件：`miniprogram/api/config.ts`
  - 修改 `baseURL` 为实际的后端地址
  - 确认开发环境和生产环境地址

- [ ] **Token 存储 Key**
  - 文件：`miniprogram/api/config.ts`
  - 确认 `tokenKey` 配置（默认：'access_token'）
  - 与后端约定一致

### 图片资源
- [ ] `miniprogram/images/logo.png` - 应用 Logo
- [ ] `miniprogram/images/wechat-icon.png` - 微信图标
- [ ] `miniprogram/images/phone-icon.png` - 手机图标
- [ ] `miniprogram/images/lock-icon.png` - 锁图标
- [ ] `miniprogram/images/eye-open.png` - 显示密码图标
- [ ] `miniprogram/images/eye-close.png` - 隐藏密码图标
- [ ] `miniprogram/images/phone-bind.png` - 手机绑定图标
- [ ] `miniprogram/images/code-icon.png` - 验证码图标

**提示**：如果暂时没有图片，可以先注释掉 WXML 中的 `<image>` 标签。

## 🔌 后端接口检查

### 必需接口
- [ ] **微信登录接口**
  - 路径：`POST /api/auth/wechat-login`
  - 参数：code, nickname, avatarUrl
  - 返回：token, userInfo, needBindPhone, tempOpenid, expireTime

- [ ] **密码登录接口**
  - 路径：`POST /api/auth/login`
  - 参数：phone, password
  - 返回：token, userInfo, expireTime

- [ ] **绑定手机号接口**
  - 路径：`POST /api/auth/bind-phone`
  - 参数：openid, phone, encryptedData, iv
  - 返回：token, userInfo, expireTime

### 可选接口
- [ ] **退出登录接口**
  - 路径：`POST /api/auth/logout`
  - 参数：token（可选，从 header 获取）

- [ ] **获取当前用户接口**
  - 路径：`GET /api/auth/current-user`
  - 参数：token（从 header 获取）

- [ ] **发送验证码接口**（如需手动绑定手机号）
  - 路径：`POST /api/auth/send-verify-code`
  - 参数：phone

## 🧪 功能测试

### 微信登录测试
- [ ] 点击"微信一键登录"按钮
- [ ] 授权获取用户信息
- [ ] 检查控制台是否输出 code
- [ ] 检查网络请求是否成功
- [ ] 检查是否正确保存 token
- [ ] 检查是否正确跳转页面

### 密码登录测试
- [ ] 点击"使用手机号密码登录"
- [ ] 输入手机号（测试格式验证）
- [ ] 输入密码（测试长度验证）
- [ ] 测试密码显示/隐藏功能
- [ ] 点击登录按钮
- [ ] 检查网络请求是否成功
- [ ] 检查是否正确保存 token
- [ ] 检查是否正确跳转页面

### 绑定手机号测试
- [ ] 微信登录后触发绑定流程
- [ ] 测试微信一键绑定
- [ ] 测试手动输入手机号
- [ ] 测试验证码发送（60秒倒计时）
- [ ] 测试验证码输入
- [ ] 检查绑定成功后的跳转

### 边界情况测试
- [ ] 测试未同意协议时登录
- [ ] 测试手机号格式错误
- [ ] 测试密码长度不足
- [ ] 测试网络请求失败
- [ ] 测试后端返回错误
- [ ] 测试用户拒绝授权
- [ ] 测试 token 过期处理

## 🎨 UI/UX 检查

### 登录页面
- [ ] 页面布局正常显示
- [ ] 渐变背景显示正确
- [ ] Logo 和文字居中对齐
- [ ] 按钮样式正确
- [ ] 输入框样式正确
- [ ] 切换登录方式功能正常
- [ ] 用户协议勾选框正常

### 绑定手机号页面
- [ ] 页面布局正常显示
- [ ] 顶部图标和文字显示
- [ ] 微信一键绑定按钮正常
- [ ] 分割线显示正确
- [ ] 输入框样式正确
- [ ] 验证码按钮倒计时正常
- [ ] 返回登录链接正常

### 交互反馈
- [ ] 加载状态显示（loading）
- [ ] 成功提示（toast）
- [ ] 错误提示（toast）
- [ ] 按钮禁用状态
- [ ] 输入框焦点状态

## 🔐 安全检查

### 数据安全
- [ ] 密码输入框默认隐藏
- [ ] Token 正确存储在本地
- [ ] 敏感信息不在控制台输出
- [ ] 请求使用 HTTPS
- [ ] 后端正确验证 token

### 表单验证
- [ ] 手机号格式验证
- [ ] 密码长度验证
- [ ] 必填项验证
- [ ] 用户协议验证

### 错误处理
- [ ] 网络错误处理
- [ ] 401 自动跳转登录
- [ ] 后端错误提示
- [ ] 用户拒绝授权处理

## 📱 小程序配置

### app.json 配置
- [x] 页面路由已添加
- [ ] 权限配置（如需获取手机号）
- [ ] 导航栏配置
- [ ] 分包配置（如需要）

### 项目配置
- [ ] AppID 配置正确
- [ ] 域名白名单配置
- [ ] 业务域名配置
- [ ] request 合法域名配置

## 🚀 上线前检查

### 代码质量
- [ ] 无 TypeScript 错误
- [ ] 无 ESLint 警告
- [ ] 代码格式化正确
- [ ] 注释完整清晰

### 性能优化
- [ ] 图片已压缩
- [ ] 无内存泄漏
- [ ] 请求响应时间合理
- [ ] 页面加载速度快

### 兼容性
- [ ] 测试不同机型
- [ ] 测试不同系统版本
- [ ] 测试不同网络环境
- [ ] 测试基础库版本

### 文档完善
- [x] 实现说明文档
- [x] API 接口文档
- [x] 快速启动指南
- [x] 图片资源说明

## 📝 备注

### 已知限制
1. 获取手机号需要企业认证的小程序
2. `wx.getUserProfile()` 需要用户主动触发
3. 验证码发送接口需要后端实现

### 后续优化
1. 添加忘记密码功能
2. 实现自动登录
3. 添加第三方登录
4. 优化错误提示文案
5. 添加登录动画效果

## ✅ 最终确认

在提交代码或上线前，请确认：
- [ ] 所有必需的检查项都已完成
- [ ] 所有功能测试都已通过
- [ ] 代码已经过 Code Review
- [ ] 文档已更新完整
- [ ] 已在真机上测试
- [ ] 已通过小程序审核（如需上线）

---

**检查完成日期**：__________

**检查人员**：__________

**备注**：__________
