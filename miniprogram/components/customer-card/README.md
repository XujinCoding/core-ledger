# 客户卡片组件

## 组件说明

展示客户基本信息的卡片组件，用于客户列表页面。

## 使用方法

```xml
<customer-card 
  customer="{{item}}"
  bind:click="handleCustomerClick"
  bind:action="handleCustomerAction"
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| customer | Object | {} | 客户信息对象 |

## 事件说明

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击卡片时触发 | event.detail = { customer } |
| action | 点击操作按钮时触发 | event.detail = { customer } |

## 数据结构

```typescript
interface CustomerListItem {
  id: number;
  name: string;
  alias?: string;
  phone: string;
  gender: Gender;
  genderDesc: string;
  age?: number;
  addressPath?: string;
  customerType: CustomerType;
  customerTypeDesc: string;
}
```
