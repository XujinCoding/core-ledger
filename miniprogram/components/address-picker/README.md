# 地址选择器组件

## 组件说明

支持省市区镇村5级懒加载地址选择组件，用于客户表单等需要选择地址的场景。

## 功能特性

- ✅ 5级懒加载（省→市→区→镇→村）
- ✅ 支持编辑时回显地址链
- ✅ 面包屑导航，方便返回上级
- ✅ 必须选择到镇/村级（level >= 4）
- ✅ 支持切换同级地址
- ✅ 选中状态标识

## 使用方法

### 1. 在页面json中引用组件

```json
{
  "usingComponents": {
    "address-picker": "/components/address-picker/address-picker"
  }
}
```

### 2. 在wxml中使用

```xml
<!-- 表单中的地址选择触发器 -->
<view bindtap="handleAddressSelect">
  <text>{{form.addressPath || '请选择地址'}}</text>
</view>

<!-- 地址选择器组件 -->
<address-picker
  visible="{{showAddressPicker}}"
  addressId="{{form.addressId}}"
  bind:confirm="handleAddressConfirm"
  bind:close="handleAddressClose"
/>
```

### 3. 在ts中处理事件

```typescript
Page({
  data: {
    showAddressPicker: false,
    form: {
      addressId: null,
      addressPath: ''
    }
  },

  // 打开地址选择器
  handleAddressSelect(): void {
    this.setData({ showAddressPicker: true });
  },

  // 确认选择
  handleAddressConfirm(e: WechatMiniprogram.CustomEvent): void {
    const { addressId, addressPath } = e.detail;
    this.setData({
      'form.addressId': addressId,
      'form.addressPath': addressPath,
      showAddressPicker: false
    });
  },

  // 关闭选择器
  handleAddressClose(): void {
    this.setData({ showAddressPicker: false });
  }
});
```

## 属性说明

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| visible | Boolean | false | 是 | 是否显示选择器 |
| addressId | Number | 0 | 否 | 初始地址ID（编辑时传入） |

## 事件说明

### confirm 事件

选择地址确认时触发

**回调参数**：
```typescript
{
  addressId: number;      // 选中的地址ID
  addressPath: string;    // 完整地址路径（如：广东省深圳市南山区西丽街道）
  address: AddressVO;     // 选中的地址对象
  fullPath: AddressVO[];  // 完整选择路径数组
}
```

### close 事件

关闭选择器时触发，无参数

## 使用场景

### 场景1：新增客户

```typescript
// 用户选择地址
handleAddressSelect(): void {
  this.setData({ showAddressPicker: true });
}

// 确认后保存addressId和addressPath
handleAddressConfirm(e): void {
  const { addressId, addressPath } = e.detail;
  this.setData({
    'form.addressId': addressId,
    'form.addressPath': addressPath
  });
}

// 提交表单时使用addressId
createCustomer({
  name: form.name,
  phone: form.phone,
  addressId: form.addressId,  // 必须为镇/村级ID
  addressDetail: form.addressDetail
});
```

### 场景2：编辑客户

```typescript
// 加载客户详情后，传入addressId
async loadCustomer(id: number): Promise<void> {
  const customer = await customerApi.getDetail(id);
  this.setData({
    'form.addressId': customer.addressId,
    'form.addressPath': customer.addressPath
  });
}

// 打开选择器时，组件会自动加载地址链并回显
handleAddressSelect(): void {
  this.setData({ showAddressPicker: true });
}
```

## 地址层级说明

| Level | 名称 | 说明 | 可作为客户地址 |
|-------|------|------|---------------|
| 1 | 省 | 省级行政区 | ❌ 否 |
| 2 | 市 | 市级行政区 | ❌ 否 |
| 3 | 区县 | 区/县级行政区 | ❌ 否 |
| **4** | **镇/街道** | 镇/乡/街道 | **✅ 是** |
| **5** | **村** | 村/社区 | **✅ 是** |

**重要规则**：
- 客户地址必须选择到镇/村级（level >= 4）
- 选择器会自动验证，未达到要求时禁用确认按钮
- 省/市/区县级地址只能作为中间路径，不能作为最终选择

## API 依赖

组件依赖以下API接口：

1. **查询地址列表**：`GET /api/addresses`
2. **查询地址链**：`GET /api/addresses/chain/{addressId}`

详细API文档请参考：`docs/customer_page_design/ADDRESS_GUIDE.md`

## 性能优化

- ✅ 懒加载模式，按需加载地址数据
- ✅ 内部缓存已加载的地址列表
- ✅ 避免重复请求

## 注意事项

1. 确保API接口返回的地址数据格式正确
2. 编辑时传入的addressId必须有效，否则会fallback到加载省份列表
3. 地址路径使用中文名称拼接，不包含分隔符（如：广东省深圳市南山区）
4. 组件内部会验证地址层级，确保符合业务规则

---

**创建日期**: 2024-11-28  
**版本**: v1.0
