# 代码规范

## TypeScript 规范

### 1. 类型定义

#### 使用接口定义对象类型
```typescript
// 推荐
interface UserInfo {
  id: number;
  name: string;
  avatar?: string;
}

// 避免
type UserInfo = {
  id: number;
  name: string;
  avatar?: string;
}
```

#### 显式类型注解
```typescript
// 推荐：函数参数和返回值显式声明类型
function getUserInfo(userId: number): Promise<UserInfo> {
  return api.user.getInfo(userId);
}

// 避免：依赖类型推断
function getUserInfo(userId) {
  return api.user.getInfo(userId);
}
```

#### 使用枚举管理常量
```typescript
// 推荐
enum OrderStatus {
  Pending = 0,
  Paid = 1,
  Shipped = 2,
  Completed = 3,
  Cancelled = 4
}

// 使用
const status: OrderStatus = OrderStatus.Paid;
```

### 2. 变量声明

```typescript
// 推荐：使用 const 和 let
const API_BASE_URL = 'https://api.example.com';
let currentPage = 1;

// 避免：使用 var
var count = 0;

// 推荐：解构赋值
const { name, age } = userInfo;
const [first, second] = list;

// 推荐：合理使用可选链和空值合并
const userName = userInfo?.name ?? '未知用户';
```

### 3. 函数规范

```typescript
// 推荐：箭头函数
const handleClick = (event: WechatMiniprogram.TouchEvent): void => {
  console.log('clicked', event);
};

// 推荐：async/await 处理异步
async function loadData(): Promise<void> {
  try {
    const data = await api.user.getInfo();
    this.setData({ userInfo: data });
  } catch (error) {
    console.error('加载失败', error);
    wx.showToast({ title: '加载失败', icon: 'none' });
  }
}

// 推荐：函数注释
/**
 * 获取用户信息
 * @param userId 用户ID
 * @returns 用户信息对象
 */
async function getUserInfo(userId: number): Promise<UserInfo> {
  const res = await api.user.getInfo(userId);
  return res.data;
}
```

### 4. 类和接口

```typescript
// 推荐：使用 class 封装复杂逻辑
class DataManager {
  private data: any[] = [];

  constructor(initialData: any[] = []) {
    this.data = initialData;
  }

  public add(item: any): void {
    this.data.push(item);
  }

  public remove(index: number): void {
    this.data.splice(index, 1);
  }
}

// 推荐：接口继承
interface BaseEntity {
  id: number;
  createdAt: string;
}

interface UserInfo extends BaseEntity {
  name: string;
  avatar: string;
}
```

## 小程序页面/组件规范

### 1. 页面结构

```typescript
// pages/user/user.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {} as UserInfo,
    loading: false,
    list: [] as LedgerItem[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: { id?: string }): void {
    const userId = Number(options.id);
    this.loadUserInfo(userId);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(): void {
    // 页面显示时执行
  },

  /**
   * 加载用户信息
   */
  async loadUserInfo(userId: number): Promise<void> {
    try {
      this.setData({ loading: true });
      const userInfo = await api.user.getInfo(userId);
      this.setData({ userInfo });
    } catch (error) {
      console.error('加载失败', error);
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 事件处理函数
   */
  handleEdit(): void {
    wx.navigateTo({
      url: `/pages/user-edit/user-edit?id=${this.data.userInfo.id}`
    });
  }
});
```

### 2. 组件结构

```typescript
// components/user-card/user-card.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object as WechatMiniprogram.Component.FullProperty<UserInfo>,
      value: {} as UserInfo
    },
    showEdit: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isExpanded: false
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached(): void {
      // 组件实例进入页面节点树时执行
    },
    detached(): void {
      // 组件实例被从页面节点树移除时执行
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(): void {
      this.triggerEvent('click', { id: this.properties.userInfo.id });
    },

    toggleExpand(): void {
      this.setData({
        isExpanded: !this.data.isExpanded
      });
    }
  }
});
```

### 3. setData 使用规范

```typescript
// 推荐：批量更新
this.setData({
  'userInfo.name': newName,
  'userInfo.age': newAge,
  loading: false
});

// 避免：多次调用 setData
this.setData({ 'userInfo.name': newName });
this.setData({ 'userInfo.age': newAge });
this.setData({ loading: false });

// 推荐：处理复杂数据更新
const newList = [...this.data.list];
newList[index] = newItem;
this.setData({ list: newList });

// 避免：直接修改 data
this.data.list[index] = newItem; // 错误！
```

## 样式规范（WXSS/Less）

### 1. 样式组织

```less
// pages/user/user.wxss
@import '../../styles/theme.wxss';

.page {
  padding: 32rpx;
  background-color: @bg-color;
}

.user-card {
  padding: 24rpx;
  background-color: #fff;
  border-radius: 16rpx;

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
  }

  &__avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: 32rpx;
    font-weight: 500;
    color: @text-primary;
  }

  &__desc {
    font-size: 28rpx;
    color: @text-secondary;
    margin-top: 8rpx;
  }
}
```

### 2. 命名规范

```less
// 推荐：BEM 命名规范
.block {}                    // 块
.block__element {}          // 元素
.block--modifier {}         // 修饰符
.block__element--modifier {}

// 示例
.user-list {}
.user-list__item {}
.user-list__item--active {}
.user-list__header {}

// 避免：嵌套过深
.page .container .list .item .content {} // 不推荐
```

### 3. 尺寸单位

```less
// 推荐：使用 rpx 适配不同屏幕
.box {
  width: 750rpx;    // 屏幕宽度
  height: 200rpx;   // 高度
  font-size: 28rpx; // 字体大小
  padding: 20rpx;   // 内边距
}

// 特殊情况使用 px（如 1px 边框）
.border {
  border: 1px solid #eee;
}
```

## 代码格式化

### 1. 缩进和空格
- 使用 2 个空格缩进（已配置在 project.config.json）
- 操作符前后加空格
- 逗号后加空格
- 花括号前加空格

```typescript
// 推荐
const sum = a + b;
const arr = [1, 2, 3];
if (condition) {
  // code
}

// 避免
const sum=a+b;
const arr=[1,2,3];
if(condition){
  // code
}
```

### 2. 分号和引号
- 语句结尾使用分号
- 字符串优先使用单引号
- 对象属性名不需要引号（除非必要）

```typescript
// 推荐
const name = 'John';
const obj = { name: 'John', age: 20 };

// 避免
const name = "John"
const obj = { "name": "John", "age": 20 }
```

### 3. 换行
- 链式调用超过 2 个方法时换行
- 函数参数过多时换行
- 三元表达式过长时换行

```typescript
// 推荐：链式调用换行
const result = array
  .filter(item => item.active)
  .map(item => item.name)
  .join(', ');

// 推荐：参数换行
function createUser(
  name: string,
  age: number,
  email: string,
  phone: string
): User {
  // code
}
```

## 注释规范

### 1. 文件注释

```typescript
/**
 * 用户信息页面
 * @description 展示用户详细信息，支持编辑和删除
 * @author Your Name
 * @date 2024-01-01
 */
```

### 2. 函数注释

```typescript
/**
 * 获取用户列表
 * @param page 页码，从 1 开始
 * @param pageSize 每页数量，默认 10
 * @returns 用户列表数据
 */
async function getUserList(page: number, pageSize: number = 10): Promise<UserListResponse> {
  // implementation
}
```

### 3. 代码注释

```typescript
// 推荐：解释为什么这样做
// 使用防抖避免频繁请求
const debouncedSearch = debounce(handleSearch, 300);

// 避免：说明代码做了什么（代码本身已经很清楚）
// 将 count 加 1
count = count + 1;

// 推荐：TODO 注释
// TODO: 后续需要添加分页功能
// FIXME: 修复在 iOS 上的样式问题
// NOTE: 这里需要兼容旧版本数据格式
```

## 性能优化规范

### 1. 避免频繁 setData

```typescript
// 推荐：合并更新
this.setData({
  field1: value1,
  field2: value2,
  field3: value3
});

// 避免：连续多次 setData
this.setData({ field1: value1 });
this.setData({ field2: value2 });
this.setData({ field3: value3 });
```

### 2. 使用防抖和节流

```typescript
// utils/debounce.ts
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

// 使用
const debouncedSearch = debounce((keyword: string) => {
  this.searchData(keyword);
}, 300);
```

### 3. 图片优化

```typescript
// 推荐：使用 mode 属性优化图片显示
<image src="{{avatar}}" mode="aspectFill" />

// 推荐：懒加载图片
<image src="{{item.image}}" lazy-load="{{true}}" />
```

## 错误处理规范

```typescript
// 推荐：统一的错误处理
async function loadData(): Promise<void> {
  try {
    const data = await api.getData();
    this.setData({ data });
  } catch (error) {
    console.error('加载数据失败', error);
    wx.showToast({
      title: error.message || '加载失败',
      icon: 'none'
    });
  }
}

// 推荐：自定义错误类
class ApiError extends Error {
  constructor(
    message: string,
    public code: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

## 安全规范

### 1. 数据验证

```typescript
// 推荐：验证用户输入
function validatePhone(phone: string): boolean {
  const phoneReg = /^1[3-9]\d{9}$/;
  return phoneReg.test(phone);
}

if (!validatePhone(phone)) {
  wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
  return;
}
```

### 2. 敏感信息处理

```typescript
// 推荐：不在代码中硬编码敏感信息
// 使用环境变量或配置文件
import { API_KEY } from '@/api/config';

// 避免
const API_KEY = 'sk_live_xxxxxxxxxxxxx'; // 不要这样做
```

### 3. 防止 XSS

```wxml
<!-- 推荐：使用双花括号自动转义 -->
<text>{{userInput}}</text>

<!-- 避免：不要使用 rich-text 显示用户输入 -->
<rich-text nodes="{{userInput}}"></rich-text>
```
