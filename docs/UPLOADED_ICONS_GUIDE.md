# 已上传图标使用指南

## ✅ 已上传的图标（5个）

根据你上传的图标，我已经识别出以下图标：

| 图标 | 文件名建议 | 用途 | 状态 |
|------|-----------|------|------|
| 👁 眼睛图标 | eye-open.png | 显示密码按钮 | ✅ 已上传 |
| 💬 微信图标 | wechat-icon.png | 微信登录按钮 | ✅ 已上传 |
| 🔒 锁图标 | lock-icon.png | 密码输入框 | ✅ 已上传 |
| 📖 账本图标 | logo.png | 应用 Logo | ✅ 已上传 |
| 🛡 验证图标 | code-icon.png 或 phone-bind.png | 验证码/安全 | ✅ 已上传 |

## 📋 还需要的图标（3个）

| 图标 | 文件名 | 用途 | 状态 |
|------|--------|------|------|
| 📱 手机图标 | phone-icon.png | 手机号输入框 | ⬜ 待上传 |
| 👁‍🗨 眼睛闭合 | eye-close.png | 隐藏密码按钮 | ⬜ 待上传 |
| 📱✓ 手机绑定 | phone-bind.png | 绑定手机号页面 | ⬜ 可选 |

## 🎯 图标命名和放置

### 步骤 1：重命名图标

请将上传的图标按照以下方式重命名：

```
图标1（眼睛）    → eye-open.png
图标2（微信）    → wechat-icon.png
图标3（锁）      → lock-icon.png
图标4（账本）    → logo.png
图标5（验证/盾牌）→ code-icon.png
```

### 步骤 2：放置到目录

将重命名后的图标放到：
```
miniprogram/images/
```

### 步骤 3：检查文件结构

```
miniprogram/
  images/
    ├── logo.png              ✅ 已上传
    ├── wechat-icon.png       ✅ 已上传
    ├── phone-icon.png        ⬜ 待上传
    ├── lock-icon.png         ✅ 已上传
    ├── eye-open.png          ✅ 已上传
    ├── eye-close.png         ⬜ 待上传
    ├── phone-bind.png        ⬜ 可选
    └── code-icon.png         ✅ 已上传
```

## 🔧 临时解决方案

对于还没有的图标，可以暂时使用以下方案：

### 1. 手机图标（phone-icon.png）
可以从 Iconfont 快速下载：
- 搜索："手机" 或 "电话"
- 选择：线性风格
- 尺寸：128px
- 下载：https://www.iconfont.cn/search/index?q=手机

### 2. 眼睛闭合图标（eye-close.png）
可以从 Iconfont 快速下载：
- 搜索："眼睛闭合" 或 "隐藏"
- 选择：与 eye-open.png 配套的图标
- 尺寸：128px
- 下载：https://www.iconfont.cn/search/index?q=眼睛

### 3. 临时使用 Emoji
在下载图标之前，可以先用 Emoji：

```xml
<!-- 手机图标临时方案 -->
<text style="font-size: 48rpx;">📱</text>

<!-- 眼睛闭合临时方案 -->
<text style="font-size: 48rpx;">🙈</text>
```

## 📱 在代码中使用

### 登录页面（login.wxml）

```xml
<!-- Logo -->
<image class="logo" src="/images/logo.png" mode="aspectFit"></image>

<!-- 微信登录按钮 -->
<image class="wechat-icon" src="/images/wechat-icon.png" mode="aspectFit"></image>

<!-- 手机号输入框 -->
<image class="icon" src="/images/phone-icon.png" mode="aspectFit"></image>

<!-- 密码输入框 -->
<image class="icon" src="/images/lock-icon.png" mode="aspectFit"></image>

<!-- 显示/隐藏密码 -->
<image 
  class="icon" 
  src="{{showPassword ? '/images/eye-open.png' : '/images/eye-close.png'}}" 
  mode="aspectFit"
></image>
```

### 绑定手机号页面（bind-phone.wxml）

```xml
<!-- 顶部插图 -->
<image class="bind-icon" src="/images/phone-bind.png" mode="aspectFit"></image>

<!-- 验证码输入框 -->
<image class="icon" src="/images/code-icon.png" mode="aspectFit"></image>
```

## 🎨 图标样式建议

### CSS 样式

```css
/* Logo */
.logo {
  width: 160rpx;
  height: 160rpx;
}

/* 小图标（输入框） */
.icon {
  width: 48rpx;
  height: 48rpx;
}

/* 微信图标 */
.wechat-icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 16rpx;
}

/* 绑定手机号插图 */
.bind-icon {
  width: 200rpx;
  height: 200rpx;
}
```

## ✅ 检查清单

完成后，请检查：

- [ ] 所有图标已重命名
- [ ] 图标已放到 `miniprogram/images/` 目录
- [ ] 图标在小程序中能正常显示
- [ ] 图标大小合适
- [ ] 图标背景透明
- [ ] 图标风格统一

## 🚀 快速测试

创建一个测试页面查看所有图标：

```xml
<!-- pages/test/test.wxml -->
<view class="test-page">
  <view class="icon-item">
    <image src="/images/logo.png" mode="aspectFit" />
    <text>Logo</text>
  </view>
  
  <view class="icon-item">
    <image src="/images/wechat-icon.png" mode="aspectFit" />
    <text>微信</text>
  </view>
  
  <view class="icon-item">
    <image src="/images/phone-icon.png" mode="aspectFit" />
    <text>手机</text>
  </view>
  
  <view class="icon-item">
    <image src="/images/lock-icon.png" mode="aspectFit" />
    <text>锁</text>
  </view>
  
  <view class="icon-item">
    <image src="/images/eye-open.png" mode="aspectFit" />
    <text>显示</text>
  </view>
  
  <view class="icon-item">
    <image src="/images/eye-close.png" mode="aspectFit" />
    <text>隐藏</text>
  </view>
  
  <view class="icon-item">
    <image src="/images/code-icon.png" mode="aspectFit" />
    <text>验证码</text>
  </view>
</view>
```

```css
/* pages/test/test.wxss */
.test-page {
  padding: 40rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 40rpx;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150rpx;
}

.icon-item image {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 16rpx;
}

.icon-item text {
  font-size: 24rpx;
  color: #666;
}
```

## 💡 优化建议

### 1. 图标压缩
使用 TinyPNG 压缩图标，减少文件大小：
```
https://tinypng.com/
```

### 2. 统一尺寸
确保所有小图标都是相同尺寸（建议 128x128px）

### 3. 统一风格
所有图标应该保持相同的视觉风格（线性/面性/渐变）

### 4. 透明背景
确保所有图标都是透明背景的 PNG 格式

## 🎉 完成！

按照以上步骤，你的图标就可以正常使用了！

如果遇到问题：
1. 检查文件路径是否正确
2. 检查文件名是否匹配
3. 在开发者工具中查看是否有报错
4. 尝试使用绝对路径：`/images/xxx.png`

---

**需要帮助？** 查看完整文档：
- [图标使用指南](ICON_GUIDE.md)
- [快速下载指南](miniprogram/images/QUICK_DOWNLOAD.md)
