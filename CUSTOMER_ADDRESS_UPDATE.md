# 客户地址更新功能实现说明

## 功能概述

完成了客户编辑时的地址更新功能，支持在编辑客户时修改地址信息（addressId 和 addressDetail）。

## 实现细节

### 1. 数据结构调整

**`customer-form.ts`** - 添加原始地址信息保存：
```typescript
data: {
  // ... 其他字段
  
  /** 原始地址信息（用于编辑时比较） */
  originalAddress: {
    addressId: null as number | null,
    addressDetail: '' as string
  }
}
```

### 2. 加载客户详情时保存原始地址

**`loadCustomerDetail` 方法**：
```typescript
this.setData({
  form: { ... },
  // 保存原始地址信息
  originalAddress: {
    addressId: customer.addressId || null,
    addressDetail: customer.addressDetail || ''
  }
});
```

### 3. 提交时检测地址变化

**`handleSubmit` 方法**：
```typescript
if (isEdit) {
  // 更新基本信息
  await customerApi.updateCustomer(customerId, updateData);

  // 检查地址是否有变化
  const addressChanged = 
    form.addressId !== originalAddress.addressId || 
    (form.addressDetail || '') !== (originalAddress.addressDetail || '');

  if (addressChanged && form.addressId) {
    // 地址有变化，单独调用更新地址接口
    const addressData: UpdateCustomerAddressRequest = {
      addressId: form.addressId,
      addressDetail: form.addressDetail || undefined
    };
    await customerApi.updateCustomerAddress(customerId, addressData);
  }

  wx.showToast({ title: '更新成功', icon: 'success' });
}
```

## API 接口

### 更新客户基本信息
```
PUT /customers/:id
Content-Type: application/json

{
  "name": "客户姓名",
  "phone": "手机号",
  "gender": "性别",
  "age": 年龄,
  "customerType": "客户类型",
  "memo": "备注"
}
```

### 更新客户地址（独立接口）
```
PUT /customers/:id/address
Content-Type: application/json

{
  "addressId": 地址ID,
  "addressDetail": "详细地址"
}
```

## 工作流程

1. **加载客户详情**
   - 获取客户完整信息
   - 保存原始地址信息到 `originalAddress`

2. **用户编辑**
   - 用户可以修改基本信息
   - 用户可以通过地址选择器修改地址
   - 用户可以修改详细地址

3. **提交保存**
   - 首先调用 `updateCustomer` 更新基本信息
   - 比较当前地址和原始地址
   - 如果地址有变化，调用 `updateCustomerAddress` 更新地址
   - 显示成功提示，返回上一页

## 地址变化检测逻辑

```typescript
const addressChanged = 
  form.addressId !== originalAddress.addressId ||           // 地址ID变化
  (form.addressDetail || '') !== (originalAddress.addressDetail || '');  // 详细地址变化
```

## 注意事项

1. **地址ID必填**：更新地址时必须提供有效的 `addressId`
2. **详细地址可选**：`addressDetail` 可以为空
3. **独立接口**：地址更新使用独立的API接口，与基本信息更新分离
4. **原子性**：基本信息和地址信息分两次请求更新，不影响各自的独立性

## 已完成的功能

✅ 表单中已包含 addressId 和 addressDetail 字段  
✅ 地址选择器支持选择到区县级  
✅ 保存原始地址信息用于比较  
✅ 编辑时检测地址变化  
✅ 调用独立的地址更新接口  
✅ 新增客户时一次性提交所有信息（包括地址）  
✅ 编辑客户时分离更新基本信息和地址

## 测试建议

1. 编辑客户不修改地址 - 应该只调用 updateCustomer
2. 编辑客户只修改 addressId - 应该调用两个接口
3. 编辑客户只修改 addressDetail - 应该调用两个接口
4. 编辑客户同时修改 addressId 和 addressDetail - 应该调用两个接口
5. 新增客户 - 一次性提交所有信息
