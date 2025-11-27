# Core Ledger 开发最佳实践与约束规范

> **版本**: v1.0  
> **创建日期**: 2025-11-27  
> **最后更新**: 2025-11-27  
> **约束等级**: 🔴 强制遵守

---

## 📋 目录

- [一、总体原则](#一总体原则)
- [二、组件化开发规范](#二组件化开发规范)
- [三、API接口规范](#三api接口规范)
- [四、TypeScript类型规范](#四typescript类型规范)
- [五、注释规范](#五注释规范)
- [六、UI组件最佳实践](#六ui组件最佳实践)
- [七、性能优化规范](#七性能优化规范)
- [八、Git提交规范](#八git提交规范)
- [九、测试与调试](#九测试与调试)

---

## 一、总体原则

### 1.1 开发理念 🎯

```
优先级排序：
1. 组件化 > 硬编码
2. 类型安全 > any类型
3. 可维护性 > 快速实现
4. 用户体验 > 开发便利
```

### 1.2 代码质量要求

- ✅ **强制类型检查**：所有函数参数和返回值必须显式声明类型
- ✅ **组件优先**：组件化可以更小的代码块，更方便的复用
- ✅ **统一请求**：所有API调用必须通过`api/modules`，禁止直接使用`wx.request`
- ✅ **错误处理**：所有异步操作必须包含try-catch或Promise错误处理
- ✅ **注释完整**：所有导出函数、组件、接口必须有JSDoc注释

### 1.3 文件组织原则

```
单一职责原则：
- 每个文件只负责一个功能模块
- 文件长度不超过500行（组件除外）
- 超过300行考虑拆分

命名一致性：
- 文件名与导出内容一致
- 组件名与文件夹名一致
- API模块名与后端模块对应
```

---

## 二、组件化开发规范

### 2.1 组件抽取原则 🔴

**强制抽取为组件的场景：**

1. **重复使用3次以上**
   ```typescript
   // ❌ 错误：在多个页面复制粘贴相同代码
   // ✅ 正确：抽取为公共组件
   components/search-bar/
   ```

2. **独立的交互逻辑**
   ```typescript
   // 示例：下拉选择器、日期选择器、搜索框
   components/dropdown-select/
   components/date-picker/
   components/search-input/
   ```

3. **复杂的UI结构**
   ```typescript
   // 示例：分类树、商品卡片、账单明细
   components/category-tree-item/
   components/product-card/
   components/ledger-item/
   ```

### 2.2 组件开发模板 📝

#### 标准组件结构
```
components/component-name/
├── component-name.json    # 组件配置
├── component-name.wxml    # 组件模板
├── component-name.ts      # 组件逻辑
├── component-name.wxss    # 组件样式
└── README.md              # 组件文档（必须）
```

#### 组件TypeScript模板
```typescript
/**
 * 组件名称组件
 * @description 组件功能描述
 * @example
 * <component-name 
 *   prop1="{{value1}}"
 *   bind:event="handleEvent"
 * />
 */

import type { ComponentType } from '../../types';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 必填属性
    title: {
      type: String,
      value: ''
    },
    
    // 对象类型属性
    data: {
      type: Object as WechatMiniprogram.Component.FullProperty<ComponentType>,
      value: {} as ComponentType
    },
    
    // 可选属性（有默认值）
    showIcon: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    internalState: '',
    isLoading: false
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    /**
     * 组件实例进入页面节点树时执行
     */
    attached(): void {
      this.initComponent();
    },

    /**
     * 组件实例被从页面节点树移除时执行
     */
    detached(): void {
      this.cleanup();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 初始化组件
     */
    initComponent(): void {
      // 初始化逻辑
    },

    /**
     * 事件处理
     */
    handleClick(event: WechatMiniprogram.TouchEvent): void {
      // 触发自定义事件
      this.triggerEvent('click', { 
        value: this.data.internalState 
      });
    },

    /**
     * 清理资源
     */
    cleanup(): void {
      // 清理逻辑
    }
  }
});
```

### 2.3 常用组件库 🧩

#### 必须组件化的UI元素

| 组件类型 | 组件名 | 使用场景 |
|---------|--------|---------|
| **搜索框** | `search-bar` | 所有需要搜索的列表页 |
| **下拉选择** | `dropdown-select` | 筛选、分类选择 |
| **日期选择器** | `date-range-picker` | 日期范围筛选 |
| **空状态** | `empty-state` | 列表为空时显示 |
| **加载状态** | `loading-spinner` | 数据加载中 |
| **卡片** | `card` | 列表项、信息展示 |
| **操作菜单** | `action-sheet` | 编辑、删除等操作 |
| **表单项** | `form-item` | 统一的表单字段 |

#### 搜索框组件示例 🔍

```typescript
// components/search-bar/search-bar.ts
/**
 * 搜索框组件
 * @description 带防抖功能的搜索输入框
 * @example
 * <search-bar 
 *   placeholder="搜索客户姓名或手机号"
 *   bind:search="handleSearch"
 * />
 */

Component({
  properties: {
    placeholder: {
      type: String,
      value: '请输入关键词'
    },
    // 防抖延迟（毫秒）
    debounceTime: {
      type: Number,
      value: 300
    }
  },

  data: {
    keyword: '',
    searchTimer: null as number | null
  },

  methods: {
    /**
     * 输入框变化
     */
    handleInput(event: WechatMiniprogram.Input): void {
      const keyword = event.detail.value;
      this.setData({ keyword });

      // 清除之前的定时器
      if (this.data.searchTimer) {
        clearTimeout(this.data.searchTimer);
      }

      // 设置新的防抖定时器
      const timer = setTimeout(() => {
        this.triggerSearch(keyword);
      }, this.properties.debounceTime);

      this.setData({ searchTimer: timer });
    },

    /**
     * 触发搜索事件
     */
    triggerSearch(keyword: string): void {
      this.triggerEvent('search', { keyword });
    },

    /**
     * 清空搜索
     */
    handleClear(): void {
      this.setData({ keyword: '' });
      this.triggerSearch('');
    }
  }
});
```

```xml
<!-- components/search-bar/search-bar.wxml -->
<view class="search-bar">
  <view class="search-bar__input-wrapper">
    <image class="search-bar__icon" src="/images/search.png" />
    <input 
      class="search-bar__input"
      type="text"
      placeholder="{{placeholder}}"
      value="{{keyword}}"
      bindinput="handleInput"
      confirm-type="search"
    />
    <view 
      wx:if="{{keyword}}" 
      class="search-bar__clear"
      catchtap="handleClear"
    >
      <image src="/images/close.png" />
    </view>
  </view>
</view>
```

```css
/* components/search-bar/search-bar.wxss */
.search-bar {
  padding: 16rpx 24rpx;
  background: #f7f8fa;
}

.search-bar__input-wrapper {
  display: flex;
  align-items: center;
  height: 64rpx;
  padding: 0 24rpx;
  background: #fff;
  border-radius: 32rpx;
  gap: 16rpx;
}

.search-bar__icon {
  width: 32rpx;
  height: 32rpx;
}

.search-bar__input {
  flex: 1;
  height: 100%;
  font-size: 28rpx;
  color: #333;
}

.search-bar__clear {
  width: 32rpx;
  height: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar__clear image {
  width: 24rpx;
  height: 24rpx;
}
```

#### 下拉选择组件示例 📋

```typescript
// components/dropdown-select/dropdown-select.ts
/**
 * 下拉选择组件
 * @description 支持单选/多选的下拉选择器
 * @example
 * <dropdown-select 
 *   options="{{categoryOptions}}"
 *   value="{{selectedCategory}}"
 *   bind:change="handleCategoryChange"
 * />
 */

interface SelectOption {
  label: string;
  value: string | number;
}

Component({
  properties: {
    // 选项列表
    options: {
      type: Array as WechatMiniprogram.Component.FullProperty<SelectOption[]>,
      value: []
    },
    // 当前值
    value: {
      type: null,
      value: null
    },
    // 占位文本
    placeholder: {
      type: String,
      value: '请选择'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    }
  },

  data: {
    showPopup: false,
    selectedLabel: ''
  },

  lifetimes: {
    attached(): void {
      this.updateSelectedLabel();
    }
  },

  observers: {
    'value, options': function() {
      this.updateSelectedLabel();
    }
  },

  methods: {
    /**
     * 更新选中的标签
     */
    updateSelectedLabel(): void {
      const options = this.properties.options as SelectOption[];
      const value = this.properties.value;
      
      const selected = options.find(opt => opt.value === value);
      this.setData({
        selectedLabel: selected ? selected.label : ''
      });
    },

    /**
     * 打开下拉菜单
     */
    handleOpen(): void {
      if (this.properties.disabled) return;
      this.setData({ showPopup: true });
    },

    /**
     * 选择选项
     */
    handleSelect(event: WechatMiniprogram.TouchEvent): void {
      const { value, label } = event.currentTarget.dataset;
      
      this.setData({ 
        showPopup: false,
        selectedLabel: label
      });

      this.triggerEvent('change', { value, label });
    },

    /**
     * 关闭下拉菜单
     */
    handleClose(): void {
      this.setData({ showPopup: false });
    }
  }
});
```

---

## 三、API接口规范

### 3.1 API目录结构 🔴

```
api/
├── config.ts           # API配置（baseURL、timeout等）
├── request.ts          # 请求封装（统一拦截器）
└── modules/            # API模块
    ├── auth.ts         # 认证相关
    ├── user.ts         # 用户相关
    ├── customer.ts     # 客户相关
    ├── product.ts      # 商品相关
    ├── category.ts     # 分类相关
    ├── ledger.ts       # 账本相关
    └── index.ts        # 统一导出
```

### 3.2 API模块编写规范

#### 标准API模块模板

```typescript
// api/modules/customer.ts
import { get, post, put, del } from '../request';
import type { CustomerVO, CustomerListParams, CustomerFormData } from '../../types/customer';
import type { PageResult } from '../../types/common';

/**
 * 客户管理API模块
 * @description 客户相关的所有接口
 */
export const customerApi = {
  /**
   * 获取客户列表
   * @param params 查询参数
   * @returns 分页客户列表
   */
  getList(params: CustomerListParams): Promise<PageResult<CustomerVO>> {
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
   * @param data 客户表单数据
   * @returns 创建成功的客户信息
   */
  create(data: CustomerFormData): Promise<CustomerVO> {
    return post<CustomerVO>('/customers', data, { 
      showLoading: true,
      loadingText: '创建中...' 
    });
  },

  /**
   * 更新客户
   * @param id 客户ID
   * @param data 更新的客户数据
   * @returns 更新后的客户信息
   */
  update(id: number, data: Partial<CustomerFormData>): Promise<CustomerVO> {
    return put<CustomerVO>(`/customers/${id}`, data, { 
      showLoading: true 
    });
  },

  /**
   * 删除客户
   * @param id 客户ID
   */
  delete(id: number): Promise<void> {
    return del<void>(`/customers/${id}`, {}, { 
      showLoading: true 
    });
  }
};
```

### 3.3 请求封装规范 🔴

#### 统一请求配置

```typescript
// api/request.ts
import { config } from './config';
import { storage } from '../utils/storage';

/**
 * 请求选项接口
 */
interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: Record<string, string>;
  timeout?: number;
  showLoading?: boolean;    // 是否显示加载提示
  loadingText?: string;     // 加载提示文字
}

/**
 * 统一响应格式
 */
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

/**
 * 获取请求头
 */
function getHeaders(customHeader?: Record<string, string>): Record<string, string> {
  const token = storage.get(config.tokenKey);
  const headers = {
    'Content-Type': 'application/json',
    ...customHeader
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * 统一错误处理
 */
function handleError(error: any): void {
  console.error('请求错误:', error);

  let message = '网络请求失败';

  if (error.statusCode === 401) {
    message = '未授权，请重新登录';
    storage.remove(config.tokenKey);
    wx.reLaunch({ url: '/pages/login/login' });
  } else if (error.statusCode === 403) {
    message = '拒绝访问';
  } else if (error.statusCode === 404) {
    message = '请求的资源不存在';
  } else if (error.statusCode === 500) {
    message = '服务器错误';
  }

  wx.showToast({ title: message, icon: 'none', duration: 2000 });
}

/**
 * 通用请求方法
 */
export function request<T = any>(options: RequestOptions): Promise<T> {
  const {
    url,
    method = 'GET',
    data,
    header,
    timeout = config.timeout,
    showLoading: shouldShowLoading = false,
    loadingText = '加载中...'
  } = options;

  if (shouldShowLoading) {
    wx.showLoading({ title: loadingText, mask: true });
  }

  return new Promise<T>((resolve, reject) => {
    wx.request({
      url: `${config.baseURL}${url}`,
      method,
      data,
      header: getHeaders(header),
      timeout,
      success: (res: WechatMiniprogram.RequestSuccessCallbackResult) => {
        const response = res.data as ApiResponse<T>;

        if (response.code === 200) {
          resolve(response.data);
        } else {
          wx.showToast({
            title: response.message || '请求失败',
            icon: 'none'
          });
          reject(response);
        }
      },
      fail: (error) => {
        handleError(error);
        reject(error);
      },
      complete: () => {
        if (shouldShowLoading) {
          wx.hideLoading();
        }
      }
    });
  });
}

// 便捷方法
export function get<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({ url, method: 'GET', data, ...options });
}

export function post<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({ url, method: 'POST', data, ...options });
}

export function put<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({ url, method: 'PUT', data, ...options });
}

export function del<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
  return request<T>({ url, method: 'DELETE', data, ...options });
}
```

### 3.4 API使用规范 🔴

**强制要求：**

1. ❌ **禁止直接使用 wx.request**
2. ✅ **必须通过 api/modules 调用**
3. ✅ **必须定义返回类型**
4. ✅ **必须处理异常情况**

```typescript
// ❌ 错误示例
wx.request({
  url: 'https://api.example.com/users',
  success: (res) => {
    console.log(res.data);
  }
});

// ✅ 正确示例
import { userApi } from '../../api/modules';

async loadUserInfo(): Promise<void> {
  try {
    this.setData({ loading: true });
    const userInfo = await userApi.getInfo();
    this.setData({ userInfo });
  } catch (error) {
    console.error('加载用户信息失败', error);
    // 错误已被统一处理，这里只记录日志
  } finally {
    this.setData({ loading: false });
  }
}
```

---

## 四、TypeScript类型规范

### 4.1 类型定义原则 🔴

1. **接口优先于类型别名**
   ```typescript
   // ✅ 推荐：使用 interface
   interface UserInfo {
     id: number;
     name: string;
   }

   // ❌ 避免：使用 type（除非必要）
   type UserInfo = {
     id: number;
     name: string;
   }
   ```

2. **显式类型注解**
   ```typescript
   // ✅ 推荐：明确参数和返回值类型
   function getUserInfo(userId: number): Promise<UserInfo> {
     return api.user.getInfo(userId);
   }

   // ❌ 避免：依赖类型推断
   function getUserInfo(userId) {
     return api.user.getInfo(userId);
   }
   ```

3. **避免使用 any**
   ```typescript
   // ❌ 禁止
   function process(data: any): any {
     return data;
   }

   // ✅ 使用具体类型或泛型
   function process<T>(data: T): T {
     return data;
   }
   ```

### 4.2 类型文件组织 📁

```
types/
├── index.d.ts          # 通用类型定义和导出
├── common.d.ts         # 公共类型（分页、响应等）
├── customer.d.ts       # 客户相关类型
├── product.d.ts        # 商品相关类型
├── category.d.ts       # 分类相关类型
├── ledger.d.ts         # 账本相关类型
└── wx/                 # 微信小程序类型扩展
    └── index.d.ts
```

### 4.3 标准类型定义模板

```typescript
// types/customer.d.ts
/**
 * 客户相关类型定义
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
  /** 性别: 1=男, 2=女 */
  gender: 1 | 2;
  /** 性别描述 */
  genderDesc: '男' | '女';
  /** 地址ID */
  addressId: number;
  /** 完整地址 */
  fullAddress: string;
  /** 详细地址 */
  addressDetail: string;
  /** 客户类型: 0=潜在客户, 1=活跃客户 */
  customerType: 0 | 1;
  /** 客户类型描述 */
  customerTypeDesc: '潜在客户' | '活跃客户';
  /** 备注 */
  memo?: string;
  /** 账单统计 */
  ledgerSummary?: LedgerSummary;
  /** 创建时间 */
  createInstant: string;
  /** 修改时间 */
  modifyInstant: string;
}

/**
 * 账单统计信息
 */
export interface LedgerSummary {
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
export interface CustomerListParams {
  /** 关键词（姓名/手机号） */
  keyword?: string;
  /** 地址ID */
  addressId?: number;
  /** 客户类型 */
  customerType?: 0 | 1;
  /** 页码（从0开始） */
  page?: number;
  /** 每页大小 */
  size?: number;
  /** 排序字段 */
  sort?: string;
}

/**
 * 客户表单数据
 */
export interface CustomerFormData {
  /** 客户姓名 */
  name: string;
  /** 手机号 */
  phone: string;
  /** 性别 */
  gender: 1 | 2;
  /** 地址ID */
  addressId: number;
  /** 详细地址 */
  addressDetail: string;
  /** 备注 */
  memo?: string;
}
```

### 4.4 通用类型定义

```typescript
// types/common.d.ts
/**
 * 通用类型定义
 */

/**
 * 分页结果
 */
export interface PageResult<T> {
  /** 当前页数据 */
  content: T[];
  /** 总记录数 */
  totalElements: number;
  /** 总页数 */
  totalPages: number;
  /** 每页大小 */
  size: number;
  /** 当前页码（从0开始） */
  number: number;
  /** 当前页记录数 */
  numberOfElements: number;
  /** 是否第一页 */
  first: boolean;
  /** 是否最后一页 */
  last: boolean;
  /** 是否为空 */
  empty: boolean;
}

/**
 * API响应格式
 */
export interface ApiResponse<T = any> {
  /** 响应码 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data: T;
  /** 时间戳 */
  timestamp: number;
}

/**
 * 下拉选项
 */
export interface SelectOption<T = string | number> {
  /** 显示文本 */
  label: string;
  /** 选项值 */
  value: T;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子选项 */
  children?: SelectOption<T>[];
}

/**
 * 键值对
 */
export type KeyValue<K extends string | number = string, V = any> = Record<K, V>;
```

---

## 五、注释规范

### 5.1 文件注释 📄

**每个新建文件必须包含文件注释：**

```typescript
/**
 * 客户管理页面
 * @description 展示客户列表，支持搜索、筛选、新增、编辑、删除
 * @author Core Ledger Team
 * @date 2025-11-27
 */
```

### 5.2 函数注释 📝

**所有导出函数必须包含JSDoc注释：**

```typescript
/**
 * 获取客户列表
 * @description 支持关键词搜索、分类筛选、分页加载
 * @param params 查询参数
 * @param params.keyword 搜索关键词（可选）
 * @param params.page 页码，从0开始（默认0）
 * @param params.size 每页数量（默认20）
 * @returns Promise<PageResult<CustomerVO>> 分页客户列表
 * @throws {ApiError} 当网络请求失败时抛出
 * @example
 * const result = await customerApi.getList({ 
 *   keyword: '张三',
 *   page: 0,
 *   size: 20 
 * });
 */
async function getCustomerList(params: CustomerListParams): Promise<PageResult<CustomerVO>> {
  return customerApi.getList(params);
}
```

### 5.3 复杂逻辑注释 💡

```typescript
// ✅ 推荐：解释为什么这样做
// 使用防抖避免频繁请求API，提升性能
const debouncedSearch = debounce(handleSearch, 300);

// ✅ 推荐：说明业务逻辑
// 计算剩余应收金额 = 总金额 - 已收金额 - 优惠金额
const remaining = totalAmount - paidAmount - discountAmount;

// ❌ 避免：说明代码做了什么（代码本身已经很清楚）
// 将 count 加 1
count = count + 1;
```

### 5.4 TODO/FIXME注释 🚧

```typescript
// TODO: 后续需要添加批量删除功能
// TODO: 优化列表渲染性能，考虑使用虚拟列表

// FIXME: 修复在iOS上日期选择器样式错位的问题
// FIXME: 处理并发编辑冲突

// NOTE: 这里需要兼容旧版本数据格式
// NOTE: 微信小程序不支持template递归，使用组件实现
```

---

## 六、UI组件最佳实践

### 6.1 列表组件 📋

#### 标准列表页面结构

```xml
<!-- pages/customer-list/customer-list.wxml -->
<view class="page">
  <!-- 搜索栏（组件化） -->
  <search-bar 
    placeholder="搜索客户姓名或手机号"
    bind:search="handleSearch"
  />

  <!-- 筛选栏（可选） -->
  <view class="filter-bar" wx:if="{{showFilter}}">
    <dropdown-select 
      options="{{typeOptions}}"
      value="{{filterType}}"
      bind:change="handleTypeChange"
    />
  </view>

  <!-- 列表内容 -->
  <scroll-view 
    class="list-container"
    scroll-y
    refresher-enabled
    refresher-triggered="{{refreshing}}"
    bindrefresherrefresh="handleRefresh"
    bindscrolltolower="handleLoadMore"
  >
    <!-- 数据列表 -->
    <view class="list-content" wx:if="{{list.length > 0}}">
      <customer-card
        wx:for="{{list}}"
        wx:key="id"
        item="{{item}}"
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

  <!-- 加载中 -->
  <loading-spinner wx:if="{{loading}}" />

  <!-- FAB按钮 -->
  <view class="fab-button" catchtap="handleAdd">
    <image src="/images/add.png" />
  </view>
</view>
```

#### 列表页面逻辑

```typescript
// pages/customer-list/customer-list.ts
import { customerApi } from '../../api/modules';
import type { CustomerVO, CustomerListParams } from '../../types/customer';
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
    keyword: '',
    // 筛选条件
    filterType: null as number | null,
    typeOptions: [
      { label: '全部', value: null },
      { label: '潜在客户', value: 0 },
      { label: '活跃客户', value: 1 }
    ]
  },

  onLoad(): void {
    this.loadList();
  },

  /**
   * 加载列表数据
   */
  async loadList(isRefresh = false): Promise<void> {
    if (this.data.loading) return;

    try {
      const page = isRefresh ? 0 : this.data.page;
      this.setData({ loading: true });

      const params: CustomerListParams = {
        keyword: this.data.keyword,
        customerType: this.data.filterType,
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
      console.error('加载列表失败', error);
    } finally {
      this.setData({ loading: false, refreshing: false });
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
   * 筛选条件变化
   */
  handleTypeChange(event: WechatMiniprogram.CustomEvent): void {
    const { value } = event.detail;
    this.setData({ filterType: value, page: 0 });
    this.loadList(true);
  },

  /**
   * 下拉刷新
   */
  handleRefresh(): void {
    this.setData({ refreshing: true, page: 0 });
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
   * 点击列表项
   */
  handleItemClick(event: WechatMiniprogram.CustomEvent): void {
    const { id } = event.detail;
    wx.navigateTo({ url: `/pages/customer-detail/customer-detail?id=${id}` });
  },

  /**
   * 点击操作按钮
   */
  handleItemAction(event: WechatMiniprogram.CustomEvent): void {
    const { item } = event.detail;
    wx.showActionSheet({
      itemList: ['编辑', '删除'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.handleEdit(item);
        } else if (res.tapIndex === 1) {
          this.handleDelete(item);
        }
      }
    });
  },

  /**
   * 编辑客户
   */
  handleEdit(item: CustomerVO): void {
    wx.navigateTo({ 
      url: `/pages/customer-form/customer-form?id=${item.id}` 
    });
  },

  /**
   * 删除客户
   */
  async handleDelete(item: CustomerVO): Promise<void> {
    const result = await wx.showModal({
      title: '确认删除',
      content: `确定要删除客户"${item.name}"吗？`
    });

    if (!result.confirm) return;

    try {
      await customerApi.delete(item.id);
      wx.showToast({ title: '删除成功', icon: 'success' });
      this.loadList(true);
    } catch (error) {
      console.error('删除失败', error);
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

### 6.2 表单组件 📝

#### 标准表单页面

```xml
<!-- pages/customer-form/customer-form.wxml -->
<view class="page">
  <form>
    <!-- 表单项（组件化） -->
    <form-item label="客户姓名" required>
      <input
        class="form-input"
        type="text"
        placeholder="请输入客户姓名"
        value="{{form.name}}"
        data-field="name"
        bindinput="handleInput"
        maxlength="50"
      />
    </form-item>

    <form-item label="手机号" required>
      <input
        class="form-input"
        type="number"
        placeholder="请输入手机号"
        value="{{form.phone}}"
        data-field="phone"
        bindinput="handleInput"
        maxlength="11"
      />
    </form-item>

    <form-item label="性别" required>
      <radio-group data-field="gender" bindchange="handleRadioChange">
        <label class="radio-item">
          <radio value="1" checked="{{form.gender === 1}}" />
          <text>男</text>
        </label>
        <label class="radio-item">
          <radio value="2" checked="{{form.gender === 2}}" />
          <text>女</text>
        </label>
      </radio-group>
    </form-item>

    <form-item label="地址" required>
      <picker
        mode="selector"
        range="{{addressOptions}}"
        range-key="label"
        value="{{addressIndex}}"
        bindchange="handleAddressChange"
      >
        <view class="picker">
          {{addressText || '请选择地址'}}
        </view>
      </picker>
    </form-item>

    <form-item label="详细地址">
      <textarea
        class="form-textarea"
        placeholder="请输入详细地址"
        value="{{form.addressDetail}}"
        data-field="addressDetail"
        bindinput="handleInput"
        maxlength="200"
      />
    </form-item>

    <form-item label="备注">
      <textarea
        class="form-textarea"
        placeholder="请输入备注信息"
        value="{{form.memo}}"
        data-field="memo"
        bindinput="handleInput"
        maxlength="500"
      />
    </form-item>
  </form>

  <!-- 操作按钮 -->
  <view class="form-actions">
    <button class="btn btn-cancel" bindtap="handleCancel">取消</button>
    <button class="btn btn-primary" bindtap="handleSubmit">保存</button>
  </view>
</view>
```

---

## 七、性能优化规范

### 7.1 setData优化 🔴

**强制要求：批量更新，避免频繁调用**

```typescript
// ❌ 错误：连续多次 setData
this.setData({ field1: value1 });
this.setData({ field2: value2 });
this.setData({ field3: value3 });

// ✅ 正确：批量更新
this.setData({
  field1: value1,
  field2: value2,
  field3: value3
});

// ✅ 正确：只更新必要的字段（使用路径）
this.setData({
  'userInfo.name': newName,
  'userInfo.age': newAge
});
```

### 7.2 防抖和节流 ⏱️

```typescript
// utils/debounce.ts
/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 间隔时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  
  return function(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      func(...args);
      lastTime = now;
    }
  };
}
```

### 7.3 图片优化 🖼️

```xml
<!-- 推荐：使用 mode 属性优化显示 -->
<image src="{{avatar}}" mode="aspectFill" />

<!-- 推荐：懒加载图片 -->
<image src="{{item.image}}" lazy-load="{{true}}" />

<!-- 推荐：使用webp格式 -->
<image src="{{image}}.webp" />
```

---

## 八、测试与调试

### 8.1 调试规范 🐛

```typescript
// ✅ 推荐：使用有意义的日志
console.log('加载客户列表', { page, size, keyword });
console.error('创建客户失败', error);

// ❌ 避免：无意义的日志
console.log('test');
console.log(1);
```

### 8.2 错误处理模板

```typescript
/**
 * 标准错误处理
 */
async function safeApiCall(): Promise<void> {
  try {
    this.setData({ loading: true });
    
    const result = await api.getData();
    this.setData({ data: result });
    
  } catch (error) {
    console.error('操作失败', error);
    
    // 特定错误处理
    if (error.code === 40001) {
      wx.showToast({ title: '权限不足', icon: 'none' });
      return;
    }
    
    // 通用错误提示（如果统一处理未覆盖）
    wx.showToast({ 
      title: error.message || '操作失败', 
      icon: 'none' 
    });
    
  } finally {
    this.setData({ loading: false });
  }
}
```

---

## 📌 快速检查清单

### 提交代码前必查项 ✅

- [ ] 所有函数都有类型注解
- [ ] 没有使用 any 类型
- [ ] 所有API调用都有错误处理
- [ ] 重复代码已抽取为组件/函数
- [ ] 所有导出函数都有JSDoc注释
- [ ] setData批量更新，无频繁调用
- [ ] 代码格式化（2空格缩进）
- [ ] 无console.log残留（生产环境）
- [ ] 测试通过

### 新建页面检查清单 📄

- [ ] 4个必需文件（.ts .wxml .wxss .json）
- [ ] 在app.json中注册页面
- [ ] 导航栏配置完整
- [ ] 页面data有类型注解
- [ ] 生命周期函数完整
- [ ] 错误处理完善

### 新建组件检查清单 🧩

- [ ] 4个必需文件 + README.md
- [ ] properties有类型定义
- [ ] 有完整的JSDoc注释
- [ ] 事件使用triggerEvent
- [ ] lifetimes处理生命周期
- [ ] 样式使用BEM命名

---

## ⚠️ 违规处理

**严重违规（必须修改）：**
- 直接使用 wx.request
- 使用 any 类型
- 缺少错误处理
- 无类型注解
- 重复代码未组件化

**一般违规（建议修改）：**
- 注释不完整
- commit消息不规范
- 代码格式不统一
- 命名不规范

---

**本文档为强制执行规范，所有开发人员必须严格遵守。**

**最后更新**: 2025-11-27  
**维护者**: Core Ledger Team
