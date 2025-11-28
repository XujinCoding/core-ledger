# 客户管理页面开发指南

> **文档目的**：为开发人员提供客户管理页面的快速上手指南和开发参考。

---

## 📚 文档导航

| 文档 | 说明 | 链接 |
|-----|------|------|
| **设计文档** | 完整的功能设计和技术方案 | [CUSTOMER_PAGE_DESIGN.md](./CUSTOMER_PAGE_DESIGN.md) |
| **开发清单** | 开发进度跟踪和检查清单 | [CUSTOMER_PAGE_CHECKLIST.md](./CUSTOMER_PAGE_CHECKLIST.md) |
| **使用说明** | 快速上手和开发参考（本文档） | CUSTOMER_PAGE_README.md |

---

## 🚀 快速开始

### 1. 阅读前置文档

在开始开发前，请务必阅读：
1. **开发最佳实践** (`docs/DEVELOPMENT_BEST_PRACTICES.md`)
   - 了解项目的开发规范和约束
   - 掌握组件化开发原则
   - 了解API调用规范
2. **API文档** (`docs/api_doc/core-ledger-api.md`)
   - 查看客户管理相关接口
   - 了解数据结构和参数
3. **商品页面设计** (`docs/product_page_design/PRODUCT_PAGE_DESIGN.md`)
   - 参考类似的页面设计
   - 复用已有组件

### 2. 准备开发环境

```bash
# 1. 确保已安装微信开发者工具
# 2. 打开项目
# 3. 确认TypeScript编译正常
# 4. 确认可以正常预览
```

### 3. 创建文件结构

按照检查清单第一部分，创建所有必需的文件和目录。

---

## 📖 开发指南

### 第一步：类型定义

#### 1. 创建客户类型文件

**文件路径**：`miniprogram/types/customer.d.ts`

```typescript
/**
 * 客户相关类型定义
 * @author Core Ledger Team
 * @date 2024-11-28
 */

/**
 * 客户基础信息
 */
export interface CustomerVO {
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
  /** 备注 */
  memo?: string;
  /** 创建时间 */
  createInstant: string;
  /** 修改时间 */
  modifyInstant: string;
}

/**
 * 客户列表查询参数
 */
export interface CustomerSearchDTO {
  /** 客户姓名（模糊查询） */
  name?: string;
  /** 客户电话（模糊查询） */
  phone?: string;
  /** 地址ID */
  addressId?: number;
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
export interface CustomerCreateDTO {
  /** 客户姓名 */
  name: string;
  /** 手机号 */
  phone: string;
  /** 别名/昵称 */
  alias?: string;
  /** 性别 */
  gender: "0" | "1" | "2";
  /** 年龄 */
  age?: number;
  /** 关联地址ID（必须为村级地址） */
  addressId: number;
  /** 详细地址 */
  addressDetail?: string;
  /** 客户类型 */
  customerType: "0" | "1";
  /** 备注 */
  memo?: string;
}

/**
 * 客户更新请求
 */
export interface CustomerUpdateDTO {
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
export interface CustomerAddressUpdateDTO {
  /** 关联地址ID（必须为村级地址） */
  addressId: number;
  /** 详细地址 */
  addressDetail?: string;
}
```

#### 2. 导出类型

在 `miniprogram/types/index.d.ts` 中导出：

```typescript
export * from './customer';
```

### 第二步：API模块

#### 1. 创建客户API模块

**文件路径**：`miniprogram/api/modules/customer.ts`

```typescript
/**
 * 客户管理API模块
 * @description 客户相关的所有接口
 * @author Core Ledger Team
 * @date 2024-11-28
 */

import { get, post, put, del } from '../request';
import type { 
  CustomerVO, 
  CustomerSearchDTO, 
  CustomerCreateDTO,
  CustomerUpdateDTO,
  CustomerAddressUpdateDTO
} from '../../types/customer';
import type { PageResult } from '../../types/common';

/**
 * 客户管理API
 */
export const customerApi = {
  /**
   * 条件查询客户列表
   * @param params 查询参数
   * @returns 分页客户列表
   */
  getList(params: CustomerSearchDTO): Promise<PageResult<CustomerVO>> {
    return get<PageResult<CustomerVO>>('/customers', params);
  },

  /**
   * 获取客户详情
   * @param id 客户ID
   * @returns 客户详细信息
   */
  getDetail(id: number): Promise<CustomerVO> {
    return get<CustomerVO>(`/customers/${id}`);
  },

  /**
   * 创建客户
   * @param data 客户创建数据
   * @returns 创建成功的客户信息
   */
  create(data: CustomerCreateDTO): Promise<CustomerVO> {
    return post<CustomerVO>('/customers', data, { 
      showLoading: true,
      loadingText: '创建中...' 
    });
  },

  /**
   * 更新客户基本信息
   * @param id 客户ID
   * @param data 更新的客户数据（不包括地址）
   * @returns 更新后的客户信息
   */
  update(id: number, data: CustomerUpdateDTO): Promise<CustomerVO> {
    return put<CustomerVO>(`/customers/${id}`, data, { 
      showLoading: true 
    });
  },

  /**
   * 更新客户地址
   * @param id 客户ID
   * @param data 地址更新数据
   * @returns 更新后的客户信息
   */
  updateAddress(id: number, data: CustomerAddressUpdateDTO): Promise<CustomerVO> {
    return put<CustomerVO>(`/customers/${id}/address`, data, { 
      showLoading: true 
    });
  },

  /**
   * 删除客户
   * @param id 客户ID
   */
  delete(id: number): Promise<void> {
    return del<void>(`/customers/${id}`, {}, { 
      showLoading: true,
      loadingText: '删除中...'
    });
  }
};
```

#### 2. 导出API模块

在 `miniprogram/api/modules/index.ts` 中导出：

```typescript
export * from './customer';
```

### 第三步：客户列表页面

#### 1. 页面配置

**文件路径**：`miniprogram/pages/customers/customers.json`

```json
{
  "navigationBarTitleText": "客户管理",
  "usingComponents": {
    "search-bar": "/components/search-bar/search-bar",
    "customer-card": "/components/customer-card/customer-card",
    "empty-state": "/components/empty-state/empty-state",
    "floating-action-button": "/components/floating-action-button/floating-action-button"
  },
  "enablePullDownRefresh": true
}
```

#### 2. 页面逻辑

**文件路径**：`miniprogram/pages/customers/customers.ts`

```typescript
/**
 * 客户管理页面
 * @description 展示客户列表，支持搜索、筛选、新增、编辑、删除
 * @author Core Ledger Team
 * @date 2024-11-28
 */

import { customerApi } from '../../api/modules';
import type { CustomerVO, CustomerSearchDTO } from '../../types/customer';
import type { PageResult } from '../../types/common';

Page({
  data: {
    // 列表数据
    list: [] as CustomerVO[],
    // 加载状态
    loading: false,
    refreshing: false,
    // 分页信息
    page: 0,
    size: 20,
    hasMore: true,
    // 搜索关键词
    keyword: ''
  },

  /**
   * 页面加载
   */
  onLoad(): void {
    this.loadList();
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh(): void {
    this.setData({ refreshing: true, page: 0 });
    this.loadList(true);
  },

  /**
   * 加载列表数据
   * @param isRefresh 是否为刷新操作
   */
  async loadList(isRefresh = false): Promise<void> {
    if (this.data.loading) return;

    try {
      const page = isRefresh ? 0 : this.data.page;
      this.setData({ loading: true });

      const params: CustomerSearchDTO = {
        name: this.data.keyword,
        phone: this.data.keyword,
        page,
        size: this.data.size,
        sort: 'createInstant,desc'
      };

      const result: PageResult<CustomerVO> = await customerApi.getList(params);

      this.setData({
        list: isRefresh ? result.content : [...this.data.list, ...result.content],
        page: result.number,
        hasMore: !result.last
      });
    } catch (error) {
      console.error('加载客户列表失败', error);
    } finally {
      this.setData({ loading: false, refreshing: false });
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 搜索
   */
  handleSearch(event: WechatMiniprogram.CustomEvent): void {
    const { keyword } = event.detail;
    this.setData({ keyword, page: 0 });
    this.loadList(true);
  },

  /**
   * 加载更多
   */
  handleLoadMore(): void {
    if (!this.data.hasMore || this.data.loading) return;
    this.setData({ page: this.data.page + 1 });
    this.loadList();
  },

  /**
   * 点击客户卡片
   */
  handleItemClick(event: WechatMiniprogram.CustomEvent): void {
    const { customer } = event.detail;
    wx.navigateTo({ 
      url: `/pages/customer-detail/customer-detail?id=${customer.id}` 
    });
  },

  /**
   * 点击操作菜单
   */
  handleItemAction(event: WechatMiniprogram.CustomEvent): void {
    const { customer } = event.detail;
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.handleEdit(customer);
        } else if (res.tapIndex === 1) {
          this.handleDelete(customer);
        }
      }
    });
  },

  /**
   * 编辑客户
   */
  handleEdit(customer: CustomerVO): void {
    wx.navigateTo({ 
      url: `/pages/customer-form/customer-form?id=${customer.id}` 
    });
  },

  /**
   * 删除客户
   */
  async handleDelete(customer: CustomerVO): Promise<void> {
    const result = await wx.showModal({
      title: '确认删除',
      content: `确定要删除客户"${customer.name}"吗？删除后数据无法恢复！`
    });

    if (!result.confirm) return;

    try {
      await customerApi.delete(customer.id);
      wx.showToast({ title: '删除成功', icon: 'success' });
      this.loadList(true);
    } catch (error) {
      console.error('删除客户失败', error);
    }
  },

  /**
   * 新增客户
   */
  handleAdd(): void {
    wx.navigateTo({ url: '/pages/customer-form/customer-form' });
  }
});
```

#### 3. 页面模板

**文件路径**：`miniprogram/pages/customers/customers.wxml`

```xml
<!-- 客户管理页面 -->
<view class="page">
  <!-- 顶部操作栏 -->
  <view class="header">
    <search-bar 
      placeholder="搜索客户姓名或手机号"
      bind:search="handleSearch"
    />
  </view>

  <!-- 客户列表 -->
  <scroll-view 
    class="list-container"
    scroll-y
    refresher-enabled
    refresher-triggered="{{refreshing}}"
    bindrefresherrefresh="onPullDownRefresh"
    bindscrolltolower="handleLoadMore"
  >
    <!-- 数据列表 -->
    <view class="list-content" wx:if="{{list.length > 0}}">
      <customer-card
        wx:for="{{list}}"
        wx:key="id"
        customer="{{item}}"
        bind:click="handleItemClick"
        bind:action="handleItemAction"
      />
    </view>

    <!-- 空状态 -->
    <empty-state
      wx:if="{{list.length === 0 && !loading}}"
      icon="/images/empty-customer.png"
      text="暂无客户数据"
      buttonText="新增客户"
      bind:action="handleAdd"
    />

    <!-- 加载更多 -->
    <view class="load-more" wx:if="{{hasMore && list.length > 0}}">
      <text>加载更多...</text>
    </view>

    <!-- 到底了 -->
    <view class="no-more" wx:if="{{!hasMore && list.length > 0}}">
      <text>没有更多了</text>
    </view>
  </scroll-view>

  <!-- 浮动操作按钮 -->
  <floating-action-button 
    icon="⊕"
    bind:click="handleAdd"
  />
</view>
```

---

## 🧩 组件开发

### 浮动操作按钮组件

**文件路径**：`miniprogram/components/floating-action-button/floating-action-button.ts`

```typescript
/**
 * 浮动操作按钮（FAB）
 * @description 圆形按钮，固定在页面右下角
 * @example
 * <floating-action-button 
 *   icon="⊕"
 *   bind:click="handleClick"
 * />
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

**文件路径**：`miniprogram/components/floating-action-button/floating-action-button.wxml`

```xml
<view class="fab-container" bindtap="handleClick">
  <view class="fab-button" style="background-color: {{color}}">
    <text class="fab-icon">{{icon}}</text>
  </view>
</view>
```

**文件路径**：`miniprogram/components/floating-action-button/floating-action-button.wxss`

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

---

### 客户卡片组件

**文件路径**：`miniprogram/components/customer-card/customer-card.ts`

```typescript
/**
 * 客户卡片组件
 * @description 展示客户基本信息卡片
 * @example
 * <customer-card 
 *   customer="{{item}}"
 *   bind:click="handleClick"
 *   bind:action="handleAction"
 * />
 */

import type { CustomerVO } from '../../types/customer';

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

**模板示例**：

```xml
<view class="customer-card" bindtap="handleClick">
  <view class="card-header">
    <view class="customer-info">
      <text class="customer-name">{{customer.name}}</text>
      <text class="customer-alias" wx:if="{{customer.alias}}">（{{customer.alias}}）</text>
    </view>
    <view class="action-btn" catchtap="handleAction">
      <image src="/images/more.png" />
    </view>
  </view>

  <view class="card-body">
    <view class="info-item">
      <image class="icon" src="/images/phone.png" />
      <text>{{customer.phone}}</text>
    </view>

    <view class="info-item">
      <image class="icon" src="/images/location.png" />
      <text>{{customer.addressPath}}</text>
    </view>

    <view class="card-tags">
      <view class="tag tag-type">{{customer.customerTypeDesc}}</view>
      <view class="tag tag-gender">{{customer.genderDesc}}</view>
      <view class="tag tag-age" wx:if="{{customer.age}}">{{customer.age}}岁</view>
    </view>
  </view>
</view>
```

---

## 💡 开发技巧

### 1. 使用防抖优化搜索

```typescript
/**
 * 防抖函数
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  
  return function(this: any, ...args: Parameters<T>): void {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// 使用示例
const debouncedSearch = debounce(handleSearch, 300);
```

### 2. 表单验证工具函数

```typescript
/**
 * 验证手机号
 */
export function validatePhone(phone: string): boolean {
  const phoneReg = /^1[3-9]\d{9}$/;
  return phoneReg.test(phone);
}

/**
 * 验证必填字段
 */
export function validateRequired(value: any): boolean {
  return value !== null && value !== undefined && value !== '';
}

/**
 * 验证年龄范围
 */
export function validateAge(age: number): boolean {
  return age >= 0 && age <= 150;
}
```

### 3. 错误处理最佳实践

```typescript
/**
 * 统一错误处理
 */
async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  errorMessage: string = '操作失败'
): Promise<T | null> {
  try {
    return await apiCall();
  } catch (error) {
    console.error(errorMessage, error);
    wx.showToast({ 
      title: errorMessage, 
      icon: 'none' 
    });
    return null;
  }
}

// 使用示例
const customer = await safeApiCall(
  () => customerApi.getDetail(id),
  '加载客户信息失败'
);

if (customer) {
  // 处理数据
}
```

---

## 📍 地址管理API模块

### 创建地址API模块

**文件路径**：`miniprogram/api/modules/address.ts`

```typescript
/**
 * 地址管理API模块
 * @description 地址相关的所有接口
 * @author Core Ledger Team
 * @date 2024-11-28
 */

import { get } from '../request';
import type { AddressVO, AddressQueryDTO, AddressChainVO } from '../../types/address';

/**
 * 地址管理API
 */
export const addressApi = {
  /**
   * 查询地址列表（懒加载）
   * @param params 查询参数
   * @returns 地址列表
   * @example
   * // 加载所有省份
   * const provinces = await addressApi.getList({ level: 1 });
   * 
   * // 加载某个省的市
   * const cities = await addressApi.getList({ parentId: 1 });
   */
  getList(params: AddressQueryDTO): Promise<AddressVO[]> {
    return get<AddressVO[]>('/addresses', params);
  },

  /**
   * 获取地址详情
   * @param id 地址ID
   * @returns 地址详细信息（含完整路径）
   */
  getDetail(id: number): Promise<AddressVO> {
    return get<AddressVO>(`/addresses/${id}`);
  },

  /**
   * 查询地址链（用于编辑时回显）
   * @param addressId 地址ID
   * @returns 地址链信息（从省到目标地址的完整路径）
   * @example
   * const chain = await addressApi.getChain(100001);
   * // chain.addressIds = [1, 101, 1001, 10001, 100001]
   * // chain.addressNames = ["广东省", "深圳市", "南山区", "西丽街道", "留仙村"]
   * // chain.fullPath = "广东省-深圳市-南山区-西丽街道-留仙村"
   */
  getChain(addressId: number): Promise<AddressChainVO> {
    return get<AddressChainVO>(`/addresses/chain/${addressId}`);
  },

  /**
   * 查询村级地址（暂未使用）
   * @param parentId 父级ID（镇/乡）
   * @returns 村级地址列表
   */
  getVillageList(parentId: number): Promise<AddressVO[]> {
    return get<AddressVO[]>(`/addresses/village/${parentId}`);
  }
};
```

### 地址类型定义

**文件路径**：`miniprogram/types/address.d.ts`

```typescript
/**
 * 地址相关类型定义
 * @author Core Ledger Team
 * @date 2024-11-28
 */

/**
 * 地址基础信息
 */
export interface AddressVO {
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
export interface AddressQueryDTO {
  /** 父级ID（优先级高，传此参数返回子地址） */
  parentId?: number;
  /** 地址层级（如：1=省，传level=1返回所有省份） */
  level?: number;
}

/**
 * 地址链信息（用于编辑时回显）
 */
export interface AddressChainVO {
  /** 地址ID数组（从省到当前地址） */
  addressIds: number[];
  /** 地址名称数组 */
  addressNames: string[];
  /** 地址层级数组 */
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

## ⚠️ 常见问题

### Q1: 如何处理地址选择？

**A**: 地址选择采用**懒加载模式**，点击上层加载下层，必须选择到 `level >= 4`（镇/村级）。

**新增客户时：**
```typescript
// 地址选择示例
handleAddressChange(event: WechatMiniprogram.CustomEvent): void {
  const { addressId, addressName, addressPath, addressChain } = event.detail;
  
  // addressChain 是地址路径数组，如：[{id:1, name:"广东省", level:1}, ...]
  const lastAddress = addressChain[addressChain.length - 1];
  
  // 组件内部已经验证 level >= 4，这里直接使用
  this.setData({
    'formData.addressId': addressId,
    'formData.addressPath': addressPath  // 如："广东省 > 深圳市 > 南山区 > 西丽街道"
  });
}
```

**编辑客户时（回显地址）：**
```typescript
// 地址选择器会自动调用 addressApi.getChain(addressId) 加载地址链
// 无需手动处理，只需传入 value 属性
<address-picker 
  value="{{customer.addressId}}"
  bind:change="handleAddressChange"
/>
```

**地址选择器流程：**
```
1. 点击打开 → 加载省份列表 (GET /addresses?level=1)
2. 选择省 → 加载市列表 (GET /addresses?parentId={provinceId})
3. 选择市 → 加载区县列表 (GET /addresses?parentId={cityId})
4. 选择区县 → 加载镇街道列表 (GET /addresses?parentId={districtId})
5. 选择镇 → 可确认，或继续加载村列表
6. 选择村 → 自动确认并关闭
```

### Q2: 如何实现搜索防抖？

**A**: 创建一个debounce工具函数，在搜索输入时调用。

```typescript
// 在data中存储定时器ID
data: {
  searchTimer: null as number | null
}

// 输入处理
handleInput(event: WechatMiniprogram.Input): void {
  const keyword = event.detail.value;
  
  // 清除之前的定时器
  if (this.data.searchTimer) {
    clearTimeout(this.data.searchTimer);
  }
  
  // 设置新的定时器
  const timer = setTimeout(() => {
    this.search(keyword);
  }, 300);
  
  this.setData({ searchTimer: timer });
}
```

### Q3: 如何处理表单验证？

**A**: 建议实现一个统一的表单验证函数。

```typescript
/**
 * 验证客户表单
 */
validateCustomerForm(data: CustomerCreateDTO): string | null {
  if (!data.name) {
    return '请输入客户姓名';
  }
  
  if (!validatePhone(data.phone)) {
    return '请输入正确的手机号';
  }
  
  if (!data.addressId) {
    return '请选择客户地址';
  }
  
  if (data.age && !validateAge(data.age)) {
    return '年龄必须在0-150之间';
  }
  
  return null; // 验证通过
}

// 使用
const error = this.validateCustomerForm(formData);
if (error) {
  wx.showToast({ title: error, icon: 'none' });
  return;
}
```

### Q4: 如何优化列表性能？

**A**: 
1. 使用分页加载，每页不超过20条
2. 使用`wx:key`优化列表渲染
3. 避免在列表项中使用复杂的计算
4. 如果列表超过100条，考虑使用虚拟列表

### Q5: 如何处理并发编辑？

**A**: 后端应该通过版本号或时间戳来检测并发冲突，前端只需要处理409冲突错误即可。

```typescript
try {
  await customerApi.update(id, data);
} catch (error: any) {
  if (error.statusCode === 409) {
    wx.showModal({
      title: '提示',
      content: '客户信息已被他人修改，请刷新后重试',
      showCancel: false
    });
  }
}
```

---

## 📝 代码规范提醒

### 必须遵守的规范

1. **类型安全**
   - 所有函数必须有类型注解
   - 避免使用`any`类型
   - 接口定义必须完整

2. **API调用**
   - 禁止直接使用`wx.request`
   - 必须通过`api/modules`调用
   - 必须有错误处理

3. **注释规范**
   - 所有导出函数必须有JSDoc注释
   - 复杂逻辑必须有行内注释
   - 组件必须有使用示例

4. **组件化**
   - 重复使用3次以上必须抽取组件
   - 独立交互逻辑必须组件化
   - 组件必须有README.md

---

## 🔗 相关资源

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [TypeScript官方文档](https://www.typescriptlang.org/docs/)
- [Vant Weapp组件库](https://vant-contrib.gitee.io/vant-weapp/)

---

## 📞 技术支持

如有问题，请联系：

- **项目负责人**: Core Ledger Team
- **技术讨论**: 项目技术群
- **Bug反馈**: 项目issue管理系统

---

**文档版本**: v1.0  
**创建日期**: 2024-11-28  
**最后更新**: 2024-11-28  
**维护人**: Core Ledger Team
