# Core Ledger 清新商务风界面设计文档

## 项目概述
Core Ledger 是一款商户记账小程序，采用**清新商务风（Fresh Business）**设计风格，强调高对比度、信息层级清晰、操作极简。

## 一、视觉设计规范

### 1.1 配色方案

#### 主色调
- **清新商务蓝**: `#1890FF` - 主操作按钮、强调元素
- **微信绿**: `#07C160` - 成功状态、已收款
- **醒目红色**: `#FF4D4F` - 应收金额、欠款、危险操作

#### 背景色
- **浅灰背景**: `#F5F7FA` - 页面底色，突出内容卡片
- **纯白**: `#FFFFFF` - 卡片背景
- **浅灰**: `#FAFAFA` - 次要区域

#### 文字色（清晰层级）
- **黑色**: `#000000` - 主标题（如客户姓名）
- **灰色**: `#999999` - 副标题（如手机号、地址）
- **浅灰**: `#CCCCCC` - 辅助文字

### 1.2 字体规范

#### 字号体系
- **特大字**: 48rpx - 特殊强调
- **超大字**: 40rpx - 金额显示
- **大字**: 32rpx - 主标题
- **标准字**: 28rpx - 正文
- **小字**: 24rpx - 副标题
- **辅助字**: 20rpx - 辅助信息

#### 字重
- **常规**: 400 - 正文内容
- **中等**: 500 - 次要标题
- **加粗**: 600 - 主标题、金额

#### 数字字体
- 使用 DIN Alternate 或 Helvetica Neue 提升金额易读性

### 1.3 布局规范

#### 圆角
- **标准圆角**: 8rpx - 卡片
- **大圆角**: 16rpx - 特殊容器
- **圆形**: 50% - FAB按钮、头像

#### 间距
- **最小间距**: 8rpx
- **小间距**: 12rpx
- **标准间距**: 16rpx
- **大间距**: 24rpx
- **超大间距**: 32rpx

#### 阴影
- **卡片阴影**: `0 2rpx 8rpx rgba(0, 0, 0, 0.04)` - 轻微立体感
- **FAB阴影**: `0 8rpx 24rpx rgba(24, 144, 255, 0.3)` - 强调悬浮

## 二、页面设计详解

### 2.1 账单页面（Ledger - 首页）

**设计原则**: 极致简洁，高频使用

#### 卡片设计（Ledger Card）
```
┌─────────────────────────────────┐
│ 客户姓名(16px粗体)      ¥1,234.56│
│ 客户电话(14px灰色)      (20px红色)│
└─────────────────────────────────┘
```

**布局特点**:
- 纯白背景，圆角 8rpx，轻微阴影
- 左侧垂直布局：客户姓名（黑色加粗）+ 客户电话（灰色）
- 右侧垂直居中：应收金额（红色醒目，DIN字体）
- **排除项**: 不显示账单明细，不显示状态标签

#### 核心交互（FAB）
- 位置：右下角固定悬浮
- 尺寸：112rpx × 112rpx
- 样式：圆形，商务蓝背景，白色"+"图标
- 阴影：带蓝色光晕强调可点击
- 功能：点击进入"新建账单"流程

### 2.2 客户管理页面（Customers）

**设计原则**: 通讯录式列表

#### 搜索框
- 固定顶部
- 浅灰背景，圆角设计
- placeholder: "搜索客户姓名或手机号"

#### 列表项结构
- 左侧：客户姓名（黑色主标题）
- 中间：手机号（灰色副标题）
- 底部：详细地址（灰色小字，单行截断）
- 右侧：右箭头 "›"
- **注意**: 列表页不显示欠款金额（保持简洁）

#### 交互
- 点击行进入客户详情页
- 支持下拉刷新、上拉加载

### 2.3 商品管理页面（Products）

**设计原则**: 高密度纯文字列表

#### 列表项结构
- **不显示图片**（提高信息密度）
- 左侧：商品名称（如"红富士苹果"）
- 中间：规格数量提示（如"6个规格"，商务蓝）
- 右侧：单位标签（如"斤"，灰色背景小标签）
- 使用分割线，类似Excel表格的紧凑感

#### 设计目标
- 一屏显示更多信息
- 快速浏览商品库存
- 清晰的分割线层次

### 2.4 我的页面（Profile）

**设计原则**: 标准小程序个人中心

#### 头部结构
- 头像（圆形，80rpx）
- 昵称（主标题）
- 商户信息（副标题）

#### 菜单列表
- 设置 ⚙️
- 关于我们 ℹ️
- 退出登录 🚪（红色文字）

## 三、技术实现

### 3.1 技术栈
- 微信小程序原生开发
- TypeScript 类型安全
- WXSS（支持CSS变量）
- 模块化API设计

### 3.2 核心文件结构

```
miniprogram/
├── pages/
│   ├── ledger/          # 账单页（首页）
│   ├── customers/       # 客户管理
│   ├── products/        # 商品管理
│   └── profile/         # 我的
├── api/
│   └── modules/
│       ├── customer.ts  # 客户API
│       ├── product.ts   # 商品API
│       └── ledger.ts    # 账单API
├── types/
│   ├── customer.d.ts    # 客户类型
│   ├── product.d.ts     # 商品类型
│   └── ledger.d.ts      # 账单类型
└── styles/
    ├── theme.wxss       # 主题变量
    └── common.wxss      # 公共样式
```

### 3.3 关键设计模式

#### 卡片组件（Card）
```wxss
.card {
  background-color: var(--bg-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: var(--card-padding);
}
```

#### 金额显示（Amount）
```wxss
.amount-text {
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
  color: var(--amount-receivable);
  font-family: 'DIN Alternate', 'Helvetica Neue', Arial, sans-serif;
}
```

#### FAB按钮（Floating Action Button）
```wxss
.fab-button {
  position: fixed;
  right: 32rpx;
  bottom: 120rpx;
  width: var(--fab-size);
  height: var(--fab-size);
  background-color: var(--color-primary);
  border-radius: var(--radius-circle);
  box-shadow: var(--shadow-fab);
}
```

## 四、后端API集成

### 4.1 接口规范
- Base URL: `/api`
- 响应格式: 统一 `{ code, message, data, timestamp }`
- 分页格式: Spring Data Page
- 认证方式: Bearer Token

### 4.2 核心接口

#### 账单模块
- `GET /ledgers` - 查询账单列表
- `POST /ledgers` - 创建账单
- `POST /ledgers/{id}/receive-payment` - 收款

#### 客户模块
- `GET /customers` - 查询客户列表
- `GET /customers/{id}` - 客户详情
- `POST /customers` - 创建客户

#### 商品模块
- `GET /products` - 查询商品列表
- `GET /products/skus` - SKU列表（开单用）
- `POST /products` - 创建商品

## 五、设计亮点

### 5.1 视觉层次
1. **高对比度**: 黑色标题 vs 灰色副标题，清晰易读
2. **醒目金额**: 红色大字强调应收款，符合财务认知
3. **轻量阴影**: 卡片立体感不抢眼，保持商务风

### 5.2 交互优化
1. **FAB按钮**: 固定位置，快速创建账单
2. **下拉刷新**: 所有列表页支持
3. **上拉加载**: 无限滚动加载更多
4. **空状态友好**: emoji + 提示文案

### 5.3 信息架构
1. **账单卡片**: 只显示核心信息（客户+金额）
2. **客户列表**: 不显示欠款（避免信息过载）
3. **商品列表**: 不显示图片（提高密度）

## 六、如何体现"清新商务风"

### 6.1 清新（Fresh）
- 浅灰背景 `#F5F7FA` 营造空间感
- 白色卡片干净通透
- 轻微阴影而非重阴影
- 圆角设计柔和亲和

### 6.2 商务（Business）
- 商务蓝 `#1890FF` 专业可信
- 黑色主标题严肃权威
- DIN数字字体专业精准
- 高对比度信息层次清晰

### 6.3 极简（Minimal）
- 删除非必要信息
- 卡片只显示关键数据
- 操作路径最短
- FAB按钮一键直达

## 七、使用指南

### 7.1 启动项目
```bash
# 在微信开发者工具中打开项目
# 项目路径: /mnt/h/core-ledger
```

### 7.2 配置后端
在 `miniprogram/api/config.ts` 中配置：
```typescript
baseURL: 'http://localhost:8080/api'
```

### 7.3 TabBar图标
需要准备以下图标（建议尺寸 81px × 81px）：
- `images/tabbar/ledger.png` 和 `ledger-active.png`
- `images/tabbar/customers.png` 和 `customers-active.png`
- `images/tabbar/products.png` 和 `products-active.png`
- `images/tabbar/profile.png` 和 `profile-active.png`

## 八、后续扩展建议

### 8.1 功能增强
- 账单详情页
- 创建账单页（选择客户+商品）
- 客户详情页（显示账单统计）
- 收款页面（支持多种支付方式）
- 商品详情页（SKU管理）

### 8.2 体验优化
- 骨架屏加载
- 图表统计（欠款趋势）
- 消息推送（账单提醒）
- 导出报表

### 8.3 高级功能
- 语音输入
- 扫码开单
- 打印小票
- 数据同步

---

**设计版本**: v1.0
**最后更新**: 2025-11-25
**设计师**: Claude (Anthropic)
