# 图标使用指南

## 🎨 推荐方案：Iconfont（阿里巴巴矢量图标库）

### 为什么选择 Iconfont？

- ✅ **完全免费**：海量图标免费使用
- ✅ **资源丰富**：超过 800 万个图标
- ✅ **支持自定义**：可以修改颜色、大小
- ✅ **多种格式**：支持 PNG、SVG、字体图标
- ✅ **中文界面**：操作简单，易于上手

### 📥 获取图标步骤

#### 1. 访问 Iconfont 网站

```
https://www.iconfont.cn/
```

#### 2. 搜索并下载图标

**需要的图标清单：**

| 图标名称 | 搜索关键词 | 用途 |
|---------|----------|------|
| logo.png | "账本" 或 "财务" | 应用 Logo |
| wechat-icon.png | "微信" | 微信登录按钮 |
| phone-icon.png | "手机" 或 "电话" | 手机号输入框 |
| lock-icon.png | "锁" 或 "密码" | 密码输入框 |
| eye-open.png | "眼睛" 或 "显示" | 显示密码 |
| eye-close.png | "眼睛闭合" 或 "隐藏" | 隐藏密码 |
| phone-bind.png | "手机绑定" | 绑定手机号页面 |
| code-icon.png | "验证码" 或 "短信" | 验证码输入框 |

#### 3. 具体操作步骤

**步骤 1：注册/登录**
- 访问 https://www.iconfont.cn/
- 使用微信/支付宝/GitHub 登录

**步骤 2：搜索图标**
```
1. 在搜索框输入关键词（如"微信"）
2. 选择合适的图标
3. 点击"下载"按钮
4. 选择 PNG 格式
5. 选择尺寸（建议 128px 或 256px）
6. 下载到本地
```

**步骤 3：重命名和放置**
```
1. 将下载的图标重命名为对应的文件名
2. 放置到 miniprogram/images/ 目录
```

### 🎯 快速获取图标链接

我为你准备了直接搜索链接：

#### 1. 微信图标
```
https://www.iconfont.cn/search/index?searchType=icon&q=微信
```
推荐图标：
- 搜索"微信"，选择绿色的微信 logo
- 尺寸：128px
- 格式：PNG

#### 2. 手机图标
```
https://www.iconfont.cn/search/index?searchType=icon&q=手机
```
推荐图标：
- 搜索"手机"，选择线性风格
- 尺寸：128px
- 格式：PNG

#### 3. 锁图标
```
https://www.iconfont.cn/search/index?searchType=icon&q=锁
```
推荐图标：
- 搜索"锁"，选择线性风格
- 尺寸：128px
- 格式：PNG

#### 4. 眼睛图标
```
https://www.iconfont.cn/search/index?searchType=icon&q=眼睛
```
推荐图标：
- 搜索"眼睛"，需要两个：睁眼和闭眼
- 尺寸：128px
- 格式：PNG

#### 5. 验证码图标
```
https://www.iconfont.cn/search/index?searchType=icon&q=验证码
```
推荐图标：
- 搜索"验证码"或"短信"
- 尺寸：128px
- 格式：PNG

#### 6. Logo 图标
```
https://www.iconfont.cn/search/index?searchType=icon&q=账本
```
推荐图标：
- 搜索"账本"或"财务"
- 尺寸：256px（Logo 可以大一些）
- 格式：PNG

### 📦 方案二：使用图标字体（推荐用于后续扩展）

如果需要更多图标，可以使用字体图标方案：

#### 1. 创建项目

1. 在 Iconfont 网站创建项目
2. 将需要的图标加入购物车
3. 添加到项目
4. 生成字体文件

#### 2. 下载字体文件

```
1. 点击项目
2. 点击"下载至本地"
3. 解压文件
4. 将 .ttf 文件放到 miniprogram/fonts/ 目录
```

#### 3. 在小程序中使用

```css
/* app.wxss */
@font-face {
  font-family: 'iconfont';
  src: url('data:application/x-font-woff2;charset=utf-8;base64,...') format('woff2');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
}
```

```xml
<!-- 使用 -->
<text class="iconfont">&#xe600;</text>
```

### 🎨 方案三：使用在线 CDN（不推荐）

小程序不支持外部 CDN，所以不推荐这个方案。

### 📱 方案四：自己设计图标

如果有设计能力，可以使用以下工具：

1. **Figma**（在线，免费）
   - https://www.figma.com/
   - 强大的设计工具
   - 支持导出 PNG/SVG

2. **Sketch**（Mac，付费）
   - https://www.sketch.com/
   - 专业设计工具

3. **Canva**（在线，免费）
   - https://www.canva.com/
   - 简单易用
   - 有大量模板

### 🚀 快速解决方案：使用 Emoji

如果暂时没有图标，可以先使用 Emoji 占位：

```xml
<!-- 临时方案 -->
<text class="emoji-icon">📱</text>  <!-- 手机 -->
<text class="emoji-icon">🔒</text>  <!-- 锁 -->
<text class="emoji-icon">👁</text>  <!-- 眼睛 -->
<text class="emoji-icon">💬</text>  <!-- 验证码 -->
<text class="emoji-icon">📖</text>  <!-- 账本 -->
```

```css
.emoji-icon {
  font-size: 48rpx;
}
```

### 📋 完整的图标清单

创建一个图标清单，方便管理：

| 文件名 | 尺寸 | 用途 | 状态 |
|--------|------|------|------|
| logo.png | 160x160rpx | 应用 Logo | ⬜ 待下载 |
| wechat-icon.png | 48x48rpx | 微信图标 | ⬜ 待下载 |
| phone-icon.png | 48x48rpx | 手机图标 | ⬜ 待下载 |
| lock-icon.png | 48x48rpx | 锁图标 | ⬜ 待下载 |
| eye-open.png | 48x48rpx | 显示密码 | ⬜ 待下载 |
| eye-close.png | 48x48rpx | 隐藏密码 | ⬜ 待下载 |
| phone-bind.png | 120x120rpx | 手机绑定 | ⬜ 待下载 |
| code-icon.png | 48x48rpx | 验证码 | ⬜ 待下载 |

### 🎯 推荐的图标风格

为了保持一致性，建议选择同一风格的图标：

1. **线性图标**（推荐）
   - 简洁现代
   - 适合小程序
   - 易于识别

2. **面性图标**
   - 更加醒目
   - 适合重要按钮

3. **渐变图标**
   - 视觉效果好
   - 但文件较大

### 💡 图标优化建议

#### 1. 压缩图标

使用 TinyPNG 压缩图标：
```
https://tinypng.com/
```

#### 2. 统一尺寸

- 小图标：48x48rpx（实际 96x96px）
- 中图标：80x80rpx（实际 160x160px）
- 大图标：120x120rpx（实际 240x240px）
- Logo：160x160rpx（实际 320x320px）

#### 3. 统一颜色

建议使用单色图标，方便后期调整：
- 深色图标：#333333
- 浅色图标：#999999
- 白色图标：#FFFFFF

### 📝 使用示例

下载好图标后，放置到对应目录：

```
miniprogram/
  images/
    logo.png              ✅
    wechat-icon.png       ✅
    phone-icon.png        ✅
    lock-icon.png         ✅
    eye-open.png          ✅
    eye-close.png         ✅
    phone-bind.png        ✅
    code-icon.png         ✅
```

### 🔧 如果图标显示不正常

#### 问题 1：图标不显示

**解决方案：**
1. 检查文件路径是否正确
2. 检查文件名是否匹配
3. 使用绝对路径：`/images/xxx.png`

#### 问题 2：图标太大或太小

**解决方案：**
```css
.icon {
  width: 48rpx;
  height: 48rpx;
}
```

#### 问题 3：图标颜色不对

**解决方案：**
- 下载时选择透明背景
- 或者重新下载正确颜色的图标

### 🎨 设计规范

#### 图标设计原则

1. **简洁性**：图标应该简单易懂
2. **一致性**：所有图标风格统一
3. **识别性**：一眼就能看出含义
4. **适配性**：适合不同尺寸

#### 颜色搭配

根据你的应用主题色（紫色渐变）：
- 主色：#667eea → #764ba2
- 辅助色：#07c160（微信绿）
- 文字色：#333333（深色）、#999999（浅色）
- 背景色：#FFFFFF（白色）

### 📚 其他图标资源

如果 Iconfont 找不到合适的，可以尝试：

1. **IconPark**（字节跳动）
   - https://iconpark.oceanengine.com/
   - 高质量图标
   - 支持多种风格

2. **Feather Icons**
   - https://feathericons.com/
   - 简洁的线性图标
   - 开源免费

3. **Heroicons**
   - https://heroicons.com/
   - Tailwind CSS 官方图标
   - 开源免费

4. **Material Icons**
   - https://fonts.google.com/icons
   - Google 设计规范
   - 海量图标

5. **Font Awesome**
   - https://fontawesome.com/
   - 最流行的图标库
   - 免费版已足够使用

### ✅ 操作步骤总结

1. **访问 Iconfont**：https://www.iconfont.cn/
2. **搜索图标**：输入关键词（如"微信"）
3. **下载图标**：选择 PNG 格式，128px 尺寸
4. **重命名文件**：按照清单重命名
5. **放置文件**：复制到 `miniprogram/images/` 目录
6. **测试显示**：在小程序中查看效果

### 🆘 需要帮助？

如果在下载或使用图标时遇到问题：

1. 查看 Iconfont 使用教程
2. 参考本文档的示例
3. 使用 Emoji 作为临时方案

---

**推荐优先级：**
1. ⭐⭐⭐ Iconfont（最推荐）
2. ⭐⭐ IconPark
3. ⭐ Feather Icons

**时间估算：**
- 下载所有图标：约 10-15 分钟
- 优化和放置：约 5 分钟
- 总计：约 20 分钟

祝你顺利获取图标！🎉
