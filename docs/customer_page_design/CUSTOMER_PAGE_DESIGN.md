# 客户管理页面设计文档

## 一、页面概述

客户管理页面是Core Ledger小程序的核心功能模块，用于管理客户信息和地址。提供客户的增删改查、地址管理等功能。

### 设计原则
- **简洁高效**：操作流程简单，减少用户操作步骤
- **信息清晰**：数据展示完整，结构层次分明
- **易于维护**：支持快速增删改查操作
- **视觉统一**：遵循微信小程序设计规范，参考商品页面设计风格

> 💡 **设计说明**：本页面UI设计参考了 `docs/product_page_design/PRODUCT_PAGE_DESIGN.md`，确保整体风格统一。

---

## 二、页面结构

### 2.1 顶部导航栏
```
┌─────────────────────────────────────────┐
│  ← 返回      客户管理                    │
└─────────────────────────────────────────┘
```

### 2.2 搜索栏
```
┌─────────────────────────────────────────┐
│  🔍 搜索客户姓名或手机号...    [筛选 🎚] │
└─────────────────────────────────────────┘
```

### 2.3 右下角浮动按钮
```
                                   ┌───┐
                                   │ ⊕ │  新增客户
                                   └───┘
```
> 圆形浮动按钮，固定在页面右下角，点击跳转到新增客户页面

---

## 三、功能详细设计

### 3.1 客户列表页

#### 页面布局
```
┌─────────────────────────────────────────┐
│  ← 返回      客户管理                    │
├─────────────────────────────────────────┤
│  🔍 搜索客户姓名或手机号...        [筛选 🎚]     │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │ 张三 (小张)                          │   │
│  │ 手机: 13800138000                  │   │
│  │ 地址: 广东省深圳市南山区西丽街道      │   │
│  │ 类型: 活跃客户  性别: 男  年龄: 30岁  │   │
│  │ 状态: 🟢 正常                    [⋯]   │   │
│  └─────────────────────────────────┘   │
│                                          │
│  ┌─────────────────────────────────┐   │
│  │ 李四                                  │   │
│  │ 手机: 13900139000                  │   │
│  │ 地址: 广东省深圳市福田区华强北街道  │   │
│  │ 类型: 潜在客户  性别: 女  年龄: 25岁  │   │
│  │ 状态: 🟢 正常                    [⋯]   │   │
│  └─────────────────────────────────┘   │
│                                          │
│  ┌─────────────────────────────────┐   │
│  │ 王五 (老王)                          │   │
│  │ 手机: 13700137000                  │   │
│  │ 地址: 广东省深圳市宝安区沙井街道  │   │
│  │ 类型: 活跃客户  性别: 男              │   │
│  │ 状态: 🟢 正常                    [⋯]   │   │
│  └─────────────────────────────────┘   │
│                                          │
│  [加载更多...]                           │
│                                          │
│                                   ┌───┐ │
│                                   │ ⊕ │ │  ← 浮动按钮
│                                   └───┘ │
└─────────────────────────────────────────┘
```
> **浮动按钮说明**：圆形按钮，固定在页面右下角，点击跳转到新增客户页面

#### 功能说明

**1. 客户列表展示**
- 显示客户姓名、别名（如有）
- 显示手机号
- 显示地址（省市区街道级别，不包括详细地址）
- 显示客户类型、性别、年龄
- 显示状态（🟢 正常）
- 支持下拉刷新、上拉加载更多

**2. 搜索功能**
- 支持按姓名模糊搜索
- 支持按手机号模糊搜索
- 搜索框带防抖功能（300ms）
- 实时显示搜索结果

**3. 筛选功能**
点击[筛选]按钮，弹出筛选面板：
```
┌─────────────────────────────────────────┐
│  客户筛选                                │
├─────────────────────────────────────────┤
│  客户类型:                               │
│  ( ) 全部                                │
│  ( ) 活跃客户                            │
│  ( ) 潜在客户                            │
│                                          │
│  所在地址:                               │
│  [选择地址          ▼]                  │
│                                          │
│  性别:                                   │
│  ( ) 全部                                │
│  ( ) 男                                  │
│  ( ) 女                                  │
│  ( ) 未知                                │
│                                          │
│  年龄范围:                               │
│  [最小年龄] - [最大年龄]                │
│                                          │
│  [重置]              [确定]             │
└─────────────────────────────────────────┘
```

**4. 客户操作**
点击客户项右侧[⋯]菜单：
```
┌─────────────────┐
│  📋 查看详情    │
│  📝 编辑信息    │
│  📍 修改地址    │
│  📞 拨打电话    │
│  🗑️  删除        │
└─────────────────┘
```

**5. 空状态**
```
┌─────────────────────────────────────────┐
│                                          │
│           📋                             │
│      暂无客户数据                        │
│    点击右上角添加客户                    │
│                                          │
│  ┌────────────────────────┐             │
│  │     + 新增客户          │             │
│  └────────────────────────┘             │
└─────────────────────────────────────────┘
```

#### 涉及的API接口
- `GET /api/customers` - 条件查询客户列表（支持姓名、手机号、地址ID筛选、分页）
- `DELETE /api/customers/{id}` - 删除客户

---

### 3.2 新增/编辑客户表单

#### 页面布局
```
┌─────────────────────────────────────────┐
│  ← 返回      新增客户                    │
├─────────────────────────────────────────┤
│  基本信息                                │
│                                          │
│  客户姓名*: ┌────────────────────┐     │
│             │ 张三                │     │
│             └────────────────────┘     │
│                                          │
│  客户别名:  ┌────────────────────┐     │
│             │ 小张                │     │
│             └────────────────────┘     │
│                                          │
│  手机号码*: ┌────────────────────┐     │
│             │ 13800138000         │     │
│             └────────────────────┘     │
│                                          │
│  性别*:     ( ) 未知 (•) 男 ( ) 女      │
│                                          │
│  年龄:      ┌────────────────────┐     │
│             │ 30                  │     │
│             └────────────────────┘     │
│                                          │
│  客户类型*: ( ) 潜在客户 (•) 活跃客户   │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  地址信息                                │
│                                          │
│  所在地址*: [广东省 > 深圳市 > 南山区   │
│             > 西丽街道            ▼]    │
│                                          │
│  详细地址:  ┌────────────────────┐     │
│             │ XX村XX号            │     │
│             │                     │     │
│             └────────────────────┘     │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  备注说明                                │
│                                          │
│  备注:      ┌────────────────────┐     │
│             │                     │     │
│             │                     │     │
│             │                     │     │
│             └────────────────────┘     │
│                                          │
│  [取消]              [保存]             │
└─────────────────────────────────────────┘
```

#### 功能说明

**1. 表单字段**
- **必填字段**：姓名、手机号、性别、客户类型、地址ID
- **选填字段**：别名、年龄、详细地址、备注

**2. 地址选择器**
- 级联选择器，支持省/市/区/街道/村级选择
- 必须选择到村级（最底层）
- 显示完整地址路径

**3. 表单验证**
- 手机号格式验证（11位数字）
- 手机号唯一性验证（后端校验）
- 年龄范围验证（0-150）
- 必填字段提示

**4. 保存逻辑**
- 新增模式：调用创建接口
- 编辑模式：
  - 基本信息修改：调用修改客户接口
  - 地址信息修改：调用更新地址接口

#### 涉及的API接口
- `POST /api/customers` - 创建新客户
- `PUT /api/customers/{id}` - 修改客户基本信息（不包括地址）
- `PUT /api/customers/{id}/address` - 更新客户地址
- `GET /api/customers/{id}` - 获取客户详情（编辑时）

---

### 3.3 客户详情页

#### 页面布局
```
┌─────────────────────────────────────────┐
│  ← 返回      客户详情                    │
├─────────────────────────────────────────┤
│                                          │
│  张三 (小张)                    [编辑] 📝 │
│  类型: 活跃客户                         │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  基本信息                                │
│  手机号: 13800138000                     │
│  性别: 男                                 │
│  年龄: 30岁                              │
│  状态: 🟢 正常                          │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  地址信息                      [修改] ⚙️  │
│  所在地址: 广东省 > 深圳市 > 南山区    │
│            > 西丽街道                     │
│  详细地址: XX村XX号                      │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  账单统计                                │
│  进行中: 3笔  ￥1,580.00                  │
│  部分缴费: 2笔  ￥800.00/￥1200.00        │
│  赊账: 1笔  ￥350.00                       │
│  已结清: 15笔                             │
│                                          │
│  [查看账单详情]                          │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  备注说明                                │
│  老客户，信用良好...                     │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━         │
│  其他信息                                │
│  创建时间: 2024-11-20 10:30:00          │
│  更新时间: 2024-11-28 09:15:00          │
│                                          │
│  ┌────────────────────────┐             │
│  │      🗑️  删除客户        │             │
│  └────────────────────────┘             │
└─────────────────────────────────────────┘
```

#### 功能说明

**1. 信息展示**
- 展示完整的客户基本信息
- 展示地址信息（完整路径+详细地址）
- 展示账单统计信息（如果API提供）
- 展示备注信息

**2. 快捷操作**
- 右上角[编辑]按钮：跳转编辑页面
- 地址区域[修改]按钮：直接修改地址
- [删除客户]按钮：删除当前客户（二次确认）
- [查看账单详情]：跳转账单列表（筛选当前客户）

**3. 删除确认**
```
┌─────────────────────────────────────────┐
│  确认删除                                │
├─────────────────────────────────────────┤
│  确定要删除客户"张三"吗？                │
│                                          │
│  ⚠️  删除后数据无法恢复！                │
│                                          │
│  [取消]              [删除]             │
└─────────────────────────────────────────┘
```

#### 涉及的API接口
- `GET /api/customers/{id}` - 获取客户详情
- `DELETE /api/customers/{id}` - 删除客户

---

## 四、交互流程

### 4.1 新增客户流程
```
1. [客户列表] → 点击右下角浮动按钮 ⊕
   ↓
2. 填写客户基本信息
   ├─ 姓名、手机号、别名
   ├─ 性别、年龄
   └─ 客户类型
   ↓
3. 选择所在地址（必须到村级）
   ├─ 级联选择器
   └─ 填写详细地址（选填）
   ↓
4. 填写备注（选填）
   ↓
5. 点击[保存]按钮
   ↓
6. 表单验证
   ├─ 前端：格式验证
   └─ 后端：手机号唯一性、地址有效性
   ↓
7. 保存成功，返回列表页或详情页
   ↓
完成
```

### 4.2 编辑客户流程
```
编辑基本信息:
[客户列表/详情] → 点击[编辑] → 修改信息 → 保存
  ↓
  → 调用 PUT /api/customers/{id}（不含地址）

修改地址:
[客户详情] → 点击地址区域[修改] → 选择新地址 → 保存
  ↓
  → 调用 PUT /api/customers/{id}/address

同时修改基本信息和地址:
[编辑页面] → 修改所有信息 → 保存
  ↓
  → 先调用 PUT /api/customers/{id}
  → 如果地址改变，再调用 PUT /api/customers/{id}/address
```

### 4.3 搜索与筛选流程
```
搜索:
输入关键词 → 防抖300ms → 调用列表接口(name或phone参数) → 显示结果

筛选:
点击[筛选] → 选择筛选条件 → 点击[确定] 
  ↓
  → 调用列表接口(传递筛选参数) → 显示结果

组合搜索+筛选:
同时传递搜索关键词和筛选参数到列表接口
```

### 4.4 删除客户流程
```
[客户列表/详情] → 点击[删除] 
  ↓
  → 弹出确认对话框
  ↓
  → 确认删除
  ↓
  → 调用 DELETE /api/customers/{id}
  ↓
  → 删除成功，返回列表页
  ↓
完成
```

---

## 五、数据结构说明

### 5.1 客户数据类型

```typescript
/**
 * 客户基础信息（VO）
 */
interface CustomerVO {
  /** 客户ID */
  id: number;
  /** 客户姓名 */
  name: string;
  /** 手机号 */
  phone: string;
  /** 别名/昵称 */
  alias?: string;
  /** 性别: "0"=未知, "1"=男, "2"=女 */
  gender: "0" | "1" | "2";
  /** 性别描述 */
  genderDesc: "未知" | "男" | "女";
  /** 年龄 */
  age?: number;
  /** 关联地址ID */
  addressId: number;
  /** 地址完整路径 */
  addressPath: string;
  /** 详细地址 */
  addressDetail?: string;
  /** 客户类型: "0"=潜在客户, "1"=活跃客户 */
  customerType: "0" | "1";
  /** 客户类型描述 */
  customerTypeDesc: "潜在客户" | "活跃客户";
  /** 账单统计（如有） */
  ledgerSummary?: LedgerSummary;
  /** 备注 */
  memo?: string;
  /** 创建时间 */
  createInstant: string;
  /** 修改时间 */
  modifyInstant: string;
}

/**
 * 账单统计信息
 */
interface LedgerSummary {
  /** 进行中账单数 */
  inProgressCount: number;
  /** 进行中金额 */
  inProgressAmount: number;
  /** 部分缴费账单数 */
  partialCount: number;
  /** 部分缴费剩余金额 */
  partialAmount: number;
  /** 部分缴费已付金额 */
  partialPaidAmount: number;
  /** 赊账账单数 */
  creditCount: number;
  /** 赊账金额 */
  creditAmount: number;
  /** 已结清账单数 */
  clearedCount: number;
  /** 总欠款 */
  totalDebt: number;
  /** 总赊账 */
  totalCredit: number;
}

/**
 * 客户列表查询参数
 */
interface CustomerSearchDTO {
  /** 客户姓名（模糊查询） */
  name?: string;
  /** 客户电话（模糊查询） */
  phone?: string;
  /** 地址ID（从地址树选择） */
  addressId?: number;
  /** 客户类型 */
  customerType?: "0" | "1";
  /** 性别 */
  gender?: "0" | "1" | "2";
  /** 页码（从0开始） */
  page?: number;
  /** 每页大小 */
  size?: number;
  /** 排序字段 */
  sort?: string;
}

/**
 * 客户创建请求
 */
interface CustomerCreateDTO {
  /** 客户姓名 */
  name: string;
  /** 手机号 */
  phone: string;
  /** 别名/昵称 */
  alias?: string;
  /** 性别: "0"=未知, "1"=男, "2"=女 */
  gender: "0" | "1" | "2";
  /** 年龄 */
  age?: number;
  /** 关联地址ID（必须为村级地址） */
  addressId: number;
  /** 详细地址 */
  addressDetail?: string;
  /** 客户类型: "0"=潜在客户, "1"=活跃客户 */
  customerType: "0" | "1";
  /** 备注 */
  memo?: string;
}

/**
 * 客户更新请求
 */
interface CustomerUpdateDTO {
  /** 客户姓名 */
  name?: string;
  /** 手机号 */
  phone?: string;
  /** 别名/昵称 */
  alias?: string;
  /** 性别 */
  gender?: "0" | "1" | "2";
  /** 年龄 */
  age?: number;
  /** 客户类型 */
  customerType?: "0" | "1";
  /** 备注 */
  memo?: string;
}

/**
 * 客户地址更新请求
 */
interface CustomerAddressUpdateDTO {
  /** 关联地址ID（必须为村级地址，level >= 4） */
  addressId: number;
  /** 详细地址 */
  addressDetail?: string;
}

/**
 * 地址基础信息
 */
interface AddressVO {
  /** 地址ID */
  id: number;
  /** 父级ID（0表示顶级） */
  parentId: number;
  /** 地址名称 */
  name: string;
  /** 地址层级（1=省, 2=市, 3=区县, 4=镇, 5=村） */
  level: number;
  /** 地址层级描述 */
  levelDesc: string;
  /** 全称路径（如：广东省-深圳市-南山区-西丽街道-留仙村） */
  mergerName: string;
  /** 是否为顶级 */
  isTopLevel: boolean;
  /** 是否为村级及以上（可用于客户地址，level >= 4） */
  isVillageLevel: boolean;
}

/**
 * 地址查询参数
 */
interface AddressQueryDTO {
  /** 父级ID（优先级高，传此参数返回子地址） */
  parentId?: number;
  /** 地址层级（如：1=省，传level=1返回所有省份） */
  level?: number;
}

/**
 * 地址链信息（用于编辑时回显）
 */
interface AddressChainVO {
  /** 地址ID数组（从省到当前地址）如：[1,101,1001,10001,100001] */
  addressIds: number[];
  /** 地址名称数组 如：["广东省","深圳市","南山区","西丽街道","留仙村"] */
  addressNames: string[];
  /** 地址层级数组 如：[1,2,3,4,5] */
  addressLevels: number[];
  /** 完整地址路径 */
  fullPath: string;
  /** 最终地址ID */
  targetAddressId: number;
  /** 最终地址名称 */
  targetAddressName: string;
}
```

---

## 六、UI设计规范

### 6.1 颜色规范
- **主色调**: `#07C160` (微信绿)
- **辅助色**: `#1989FA` (蓝色)
- **警告色**: `#FF976A` (橙色)
- **危险色**: `#EE0A24` (红色)
- **文字主色**: `#323233`
- **文字辅色**: `#969799`
- **边框颜色**: `#EBEDF0`
- **背景色**: `#F7F8FA`

### 6.2 字体规范
- **大标题**: 18px / Bold (客户姓名)
- **标题**: 16px / Medium (区域标题)
- **正文**: 14px / Regular (主要内容)
- **辅助文字**: 12px / Regular (提示、时间等)
- **小文字**: 11px / Regular (标签)

### 6.3 间距规范
- **超大间距**: 24px (区域间距)
- **大间距**: 16px (卡片内边距)
- **标准间距**: 12px (字段间距)
- **小间距**: 8px (标签间距)
- **超小间距**: 4px (图标与文字)

### 6.4 组件规范
- **卡片圆角**: 8px
- **按钮圆角**: 4px
- **输入框高度**: 44px
- **列表项高度**: 自适应（min 80px）
- **标签样式**: 圆角4px，padding 4px 8px

### 6.5 图标规范
- **尺寸**: 32rpx（列表图标）、40rpx（功能图标）
- **颜色**: 跟随主题色或灰色
- **常用图标**：
  - 👤 客户
  - 📱 手机
  - 📍 地址
  - 🏷️ 标签
  - 📊 统计
  - ⋯ 更多操作

---

## 七、组件复用

### 7.1 必须组件化的元素

根据开发最佳实践，以下UI元素必须抽取为组件：

**1. 搜索框组件** (`search-bar`)
- 已在开发规范中定义
- 支持防抖搜索
- 支持清空按钮
- 复用商品页面的搜索框组件

**2. 浮动操作按钮** (`floating-action-button`)
```typescript
/**
 * 浮动操作按钮（FAB）
 * @description 圆形按钮，固定在页面右下角
 */
Component({
  properties: {
    /** 按钮图标 */
    icon: {
      type: String,
      value: '⊕'
    },
    /** 按钮颜色 */
    color: {
      type: String,
      value: '#07C160'
    }
  },
  
  methods: {
    handleClick(): void {
      this.triggerEvent('click');
    }
  }
});
```
**WXML:**
```xml
<view class="fab-container" bindtap="handleClick">
  <view class="fab-button" style="background-color: {{color}}">
    <text class="fab-icon">{{icon}}</text>
  </view>
</view>
```
**WXSS:**
```css
.fab-container {
  position: fixed;
  right: 30rpx;
  bottom: 60rpx;
  z-index: 999;
}

.fab-button {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.fab-button:active {
  transform: scale(0.95);
}

.fab-icon {
  font-size: 48rpx;
  color: #fff;
}
```

**3. 客户卡片组件** (`customer-card`)
```typescript
/**
 * 客户卡片组件
 * @description 展示客户基本信息卡片
 */
Component({
  properties: {
    customer: {
      type: Object as WechatMiniprogram.Component.FullProperty<CustomerVO>,
      value: {} as CustomerVO
    }
  },
  
  methods: {
    /**
     * 点击卡片
     */
    handleClick(): void {
      this.triggerEvent('click', { 
        customer: this.properties.customer 
      });
    },
    
    /**
     * 点击操作菜单
     */
    handleAction(e: WechatMiniprogram.TouchEvent): void {
      e.stopPropagation();
      this.triggerEvent('action', { 
        customer: this.properties.customer 
      });
    }
  }
});
```

**4. 地址选择器组件** (`address-picker`)
```typescript
/**
 * 级联地址选择器组件（懒加载模式）
 * @description 选择省市区街道村级地址，点击上层加载下层
 * @example
 * <address-picker 
 *   value="{{addressId}}"
 *   bind:change="handleAddressChange"
 * />
 */
Component({
  properties: {
    /** 当前选中的地址ID */
    value: {
      type: Number,
      value: null
    },
    /** 占位符 */
    placeholder: {
      type: String,
      value: '请选择地址'
    },
    /** 是否必须选择到村级（level >= 4） */
    requireVillage: {
      type: Boolean,
      value: true
    }
  },
  
  data: {
    /** 是否显示选择器 */
    visible: false,
    /** 当前层级的地址列表 */
    currentLevelList: [] as AddressVO[],
    /** 已选择的地址路径 */
    selectedPath: [] as AddressVO[],
    /** 当前选择的层级 (0=未开始, 1=省, 2=市, 3=区, 4=镇, 5=村) */
    currentLevel: 0,
    /** 加载中 */
    loading: false
  },
  
  methods: {
    /**
     * 打开地址选择器
     */
    async handleOpen(): Promise<void> {
      this.setData({ visible: true, currentLevel: 0, selectedPath: [] });
      
      // 如果有value，需要加载地址链回显
      if (this.data.value) {
        await this.loadAddressChain(this.data.value);
      } else {
        // 否则加载省份列表
        await this.loadAddressList(null, 1);
      }
    },
    
    /**
     * 加载地址链（用于编辑时回显）
     */
    async loadAddressChain(addressId: number): Promise<void> {
      try {
        this.setData({ loading: true });
        const chain: AddressChainVO = await addressApi.getChain(addressId);
        
        // 根据链数据重建选择路径
        const path: AddressVO[] = [];
        for (let i = 0; i < chain.addressIds.length; i++) {
          path.push({
            id: chain.addressIds[i],
            name: chain.addressNames[i],
            level: chain.addressLevels[i],
            // 其他字段根据需要填充
          } as AddressVO);
        }
        
        this.setData({ 
          selectedPath: path,
          currentLevel: chain.addressLevels[chain.addressLevels.length - 1]
        });
        
        // 加载同级地址列表（用于切换）
        const parentId = chain.addressIds[chain.addressIds.length - 2] || null;
        await this.loadAddressList(parentId, chain.addressLevels[chain.addressLevels.length - 1]);
      } catch (error) {
        console.error('加载地址链失败', error);
        wx.showToast({ title: '加载失败', icon: 'none' });
      } finally {
        this.setData({ loading: false });
      }
    },
    
    /**
     * 加载地址列表（懒加载）
     * @param parentId 父级ID（null表示加载顶级）
     * @param level 层级（如果parentId为null，则按level加载）
     */
    async loadAddressList(parentId: number | null, level: number): Promise<void> {
      try {
        this.setData({ loading: true });
        
        const params: AddressQueryDTO = {};
        if (parentId !== null) {
          params.parentId = parentId;
        } else {
          params.level = level;
        }
        
        const list: AddressVO[] = await addressApi.getList(params);
        this.setData({ 
          currentLevelList: list,
          currentLevel: level
        });
      } catch (error) {
        console.error('加载地址列表失败', error);
        wx.showToast({ title: '加载失败', icon: 'none' });
      } finally {
        this.setData({ loading: false });
      }
    },
    
    /**
     * 选择地址
     */
    async handleSelectAddress(event: WechatMiniprogram.CustomEvent): Promise<void> {
      const address: AddressVO = event.currentTarget.dataset.address;
      
      // 添加到选择路径
      const newPath = [...this.data.selectedPath];
      
      // 如果当前层级已经有选择，替换它
      const existingIndex = newPath.findIndex(p => p.level === address.level);
      if (existingIndex >= 0) {
        newPath[existingIndex] = address;
        // 删除后面的所有选择
        newPath.splice(existingIndex + 1);
      } else {
        newPath.push(address);
      }
      
      this.setData({ selectedPath: newPath });
      
      // 判断是否需要继续选择下一级
      if (address.level < 5) {
        // 还没到村级，加载下一级
        await this.loadAddressList(address.id, address.level + 1);
      } else {
        // 已经是村级，可以确认
        this.handleConfirm();
      }
    },
    
    /**
     * 返回上一级
     */
    async handleGoBack(): Promise<void> {
      if (this.data.selectedPath.length === 0) {
        this.handleClose();
        return;
      }
      
      // 删除最后一级
      const newPath = [...this.data.selectedPath];
      newPath.pop();
      this.setData({ selectedPath: newPath });
      
      // 加载上一级的地址列表
      if (newPath.length === 0) {
        // 返回省份列表
        await this.loadAddressList(null, 1);
      } else {
        const lastSelected = newPath[newPath.length - 1];
        await this.loadAddressList(lastSelected.id, lastSelected.level + 1);
      }
    },
    
    /**
     * 确认选择
     */
    handleConfirm(): void {
      const path = this.data.selectedPath;
      if (path.length === 0) {
        wx.showToast({ title: '请选择地址', icon: 'none' });
        return;
      }
      
      const lastAddress = path[path.length - 1];
      
      // 验证是否选择到村级
      if (this.data.requireVillage && lastAddress.level < 4) {
        wx.showToast({ 
          title: `请选择到${lastAddress.level === 3 ? '镇' : '村'}级`, 
          icon: 'none' 
        });
        return;
      }
      
      // 触发change事件
      this.triggerEvent('change', {
        addressId: lastAddress.id,
        addressName: lastAddress.name,
        addressPath: path.map(p => p.name).join(' > '),
        addressChain: path
      });
      
      this.handleClose();
    },
    
    /**
     * 关闭选择器
     */
    handleClose(): void {
      this.setData({ 
        visible: false,
        currentLevelList: [],
        selectedPath: [],
        currentLevel: 0
      });
    }
  }
});
```

**地址选择器组件交互流程**：
```
1. 点击打开 → 显示省份列表
   ↓
2. 点击省份 → 加载该省的市列表
   ↓
3. 点击市 → 加载该市的区县列表
   ↓
4. 点击区县 → 加载该区的镇街道列表
   ↓
5. 点击镇街道 → 加载该镇的村列表
   ↓
6. 点击村 → 自动确认并关闭
   ↓
完成

特殊情况：
- 编辑时：通过addressId加载地址链，自动展开到当前层级
- 返回上一级：点击返回按钮，删除最后一级选择，重新加载上一级列表
```

**5. 筛选面板组件** (`filter-panel`)
```typescript
/**
 * 筛选面板组件
 * @description 提供多条件筛选功能
 */
Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },
  
  data: {
    filters: {
      customerType: null,
      gender: null,
      addressId: null,
      minAge: null,
      maxAge: null
    }
  },
  
  methods: {
    /**
     * 重置筛选条件
     */
    handleReset(): void {
      this.setData({ 
        filters: {
          customerType: null,
          gender: null,
          addressId: null,
          minAge: null,
          maxAge: null
        }
      });
    },
    
    /**
     * 确认筛选
     */
    handleConfirm(): void {
      this.triggerEvent('confirm', { 
        filters: this.data.filters 
      });
    }
  }
});
```

**5. 空状态组件** (`empty-state`)
- 已在开发规范中定义
- 复用商品页面的空状态组件

---

## 八、错误处理和提示

### 8.1 操作提示
- **成功**: Toast 绿色提示，1.5秒自动消失
  - "保存成功"
  - "删除成功"
- **失败**: Toast 红色提示，2秒自动消失
  - "保存失败，请重试"
  - "手机号已存在"
- **加载中**: Loading 转圈动画
  - "加载中..."
  - "保存中..."

### 8.2 确认操作
需要二次确认的操作：
- **删除客户**
  - 标题："确认删除"
  - 内容："确定要删除客户"XXX"吗？删除后数据无法恢复！"
  - 按钮：[取消] [删除]

### 8.3 表单验证

**前端验证**：
- 必填字段为空
- 手机号格式（11位数字）
- 年龄范围（0-150）
- 地址必须选择到村级

**后端验证**：
- 手机号唯一性
- 地址有效性
- 数据完整性

**验证提示**：
```
姓名不能为空
请输入正确的手机号
手机号已存在
请选择地址到村级
年龄必须在0-150之间
```

### 8.4 网络错误处理
```typescript
/**
 * 统一错误处理
 */
async function handleApiError(error: any): Promise<void> {
  console.error('请求错误:', error);
  
  if (error.statusCode === 401) {
    wx.showToast({ 
      title: '请先登录', 
      icon: 'none' 
    });
    // 跳转登录页
  } else if (error.statusCode === 404) {
    wx.showToast({ 
      title: '客户不存在', 
      icon: 'none' 
    });
  } else if (error.statusCode === 409) {
    wx.showToast({ 
      title: '手机号已存在', 
      icon: 'none' 
    });
  } else {
    wx.showToast({ 
      title: error.message || '操作失败', 
      icon: 'none' 
    });
  }
}
```

---

## 九、性能优化

### 9.1 列表优化
- **分页加载**：每页20条
- **下拉刷新**：重置到第一页
- **上拉加载**：追加数据
- **搜索防抖**：300ms
- **虚拟列表**：如果超过100条考虑

### 9.2 数据缓存
- **地址树缓存**：本地存储，有效期1天
- **客户列表缓存**：内存缓存当前页
- **搜索历史**：本地存储最近5条

### 9.3 请求优化
- **防抖节流**：搜索输入300ms防抖
- **请求取消**：页面离开时取消未完成请求
- **失败重试**：自动重试1次

---

## 十、开发优先级

### Phase 1: 基础功能（第1-2周）
- ✅ 客户列表展示（分页加载）
- ✅ 搜索功能（姓名、手机号）
- ✅ 新增客户（基本信息+地址）
- ✅ 编辑客户（基本信息）
- ✅ 删除客户（二次确认）

### Phase 2: 高级功能（第3周）
- ✅ 筛选功能（客户类型、地址、性别）
- ✅ 客户详情页
- ✅ 地址选择器（级联）
- ✅ 修改客户地址

### Phase 3: 优化增强（第4周）
- ✅ 下拉刷新、上拉加载
- ✅ 搜索防抖优化
- ✅ 组件化（客户卡片、地址选择器等）
- ✅ 数据缓存策略

### Phase 4: 完善细节（第5周）
- ✅ UI细节打磨
- ✅ 错误处理完善
- ✅ 表单验证优化
- ✅ 性能优化
- ✅ 测试和修复

---

## 十一、API接口汇总

### 11.1 客户管理接口

| 接口 | 方法 | 路径 | 说明 |
|-----|------|------|------|
| 条件查询客户 | GET | `/api/customers` | 支持姓名、手机号、地址ID筛选，分页 |
| 创建客户 | POST | `/api/customers` | 手机号不能重复，地址必须为村级 |
| 获取客户详情 | GET | `/api/customers/{id}` | 根据ID获取客户详情 |
| 修改客户 | PUT | `/api/customers/{id}` | 修改基本信息（不包括地址） |
| 更新客户地址 | PUT | `/api/customers/{id}/address` | 修改关联地址和详细地址 |
| 删除客户 | DELETE | `/api/customers/{id}` | 物理删除客户（谨慎操作） |

### 11.2 地址管理接口

| 接口 | 方法 | 路径 | 说明 |
|-----|------|------|------|
| 查询地址列表 | GET | `/api/addresses` | 懒加载：parentId优先，否则按level查询 |
| 获取地址详情 | GET | `/api/addresses/{id}` | 根据ID获取地址详情（含完整路径） |
| 查询地址链 | GET | `/api/addresses/chain/{addressId}` | 编辑时回显地址级联选择器 |
| 查询村级地址 | GET | `/api/addresses/village/{parentId}` | 根据镇ID查村（暂未使用） |
| 创建地址 | POST | `/api/addresses` | 管理员功能，客户页面不用 |

**地址查询规则**：
- `parentId` 优先级高：传 `parentId=123` 返回 ID为123的直接子地址
- `level` 查询：传 `level=1` 返回所有省份
- 同时传递时 `parentId` 优先

---

## 十二、业务规则

### 12.1 数据约束
- **手机号唯一性**：同一手机号不能创建多个客户
- **地址层级限制**：必须选择到村级及以上（`level >= 4`，即镇/村级）
  - level 1 = 省
  - level 2 = 市
  - level 3 = 区县
  - level 4 = 镇/街道 ✓ 可用
  - level 5 = 村 ✓ 可用
- **必填字段**：姓名、手机号、性别、客户类型、地址ID
- **字段长度**：
  - 姓名：最长50字符
  - 别名：最长50字符
  - 手机号：11位数字
  - 详细地址：最长200字符
  - 备注：最长500字符

### 12.2 权限控制
- **访问权限**：需要登录
- **操作权限**：所有用户可新增、编辑、删除自己创建的客户
- **数据权限**：用户只能看到自己创建的客户（或根据业务规则）

### 12.3 业务逻辑
- **客户类型**：
  - 潜在客户（0）：未产生交易的客户
  - 活跃客户（1）：有交易记录的客户
- **地址管理**：
  - 地址与客户是关联关系
  - 修改地址不影响历史订单
- **删除限制**：
  - 有账单记录的客户可能需要特殊处理（根据业务需求）
  - 删除是物理删除，不可恢复

---

## 十三、技术要点

### 13.1 技术栈
- **小程序框架**: 原生微信小程序
- **UI组件库**: 建议使用 Vant Weapp
- **状态管理**: 页面级状态管理
- **网络请求**: 封装的 API 模块

### 13.2 关键技术点
- **级联地址选择**：需要地址树数据结构支持
- **防抖搜索**：使用debounce函数，300ms延迟
- **分页加载**：基于Spring Data的Page对象
- **表单验证**：前端+后端双重验证
- **组件通信**：父子组件通过事件传递数据

### 13.3 代码规范遵循
- ✅ 所有函数必须有类型注解
- ✅ 所有API调用必须通过`api/modules`
- ✅ 所有异步操作必须有try-catch
- ✅ 所有组件必须有JSDoc注释
- ✅ 遵循命名规范（kebab-case文件名，camelCase变量名）

---

## 十四、测试要点

### 14.1 功能测试
- [ ] 新增客户（正常流程）
- [ ] 新增客户（手机号重复）
- [ ] 编辑客户基本信息
- [ ] 修改客户地址
- [ ] 删除客户
- [ ] 搜索客户（姓名）
- [ ] 搜索客户（手机号）
- [ ] 筛选客户（客户类型）
- [ ] 筛选客户（地址）
- [ ] 分页加载
- [ ] 下拉刷新
- [ ] 上拉加载更多

### 14.2 边界测试
- [ ] 空列表显示
- [ ] 搜索无结果
- [ ] 筛选无结果
- [ ] 最大字符数输入
- [ ] 特殊字符输入
- [ ] 网络异常
- [ ] 并发操作

### 14.3 兼容性测试
- [ ] iOS系统
- [ ] Android系统
- [ ] 不同屏幕尺寸
- [ ] 不同微信版本

---

**文档版本**: v1.0  
**创建日期**: 2024-11-28  
**最后更新**: 2024-11-28  
**负责人**: Core Ledger Team  
**参考文档**: 
- 开发最佳实践与约束规范 (DEVELOPMENT_BEST_PRACTICES.md)
- 商品页面设计文档 (PRODUCT_PAGE_DESIGN.md)
- Core Ledger API文档 (core-ledger-api.md)
