# 地址管理功能快速参考

> **本文档**：地址管理功能的快速参考指南，包含API使用、组件设计和最佳实践。

---

## 📋 地址管理接口总览

### 可用接口

| 接口 | 方法 | 路径 | 用途 | 优先级 |
|-----|------|------|------|--------|
| 查询地址列表 | GET | `/api/addresses` | 懒加载地址列表 | ⭐⭐⭐ 必用 |
| 查询地址链 | GET | `/api/addresses/chain/{addressId}` | 编辑时回显地址 | ⭐⭐⭐ 必用 |
| 获取地址详情 | GET | `/api/addresses/{id}` | 获取单个地址信息 | ⭐⭐ 可选 |
| 查询村级地址 | GET | `/api/addresses/village/{parentId}` | 快捷查询村级 | ⭐ 暂不用 |
| 创建地址 | POST | `/api/addresses` | 创建新地址 | ⭐ 管理员功能 |

---

## 🔍 查询地址列表接口详解

### API签名
```typescript
GET /api/addresses?parentId={id}&level={level}
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 | 优先级 |
|-----|------|-----|------|--------|
| `parentId` | number | 否 | 父级地址ID | **高**（有则优先使用） |
| `level` | number | 否 | 地址层级（1-5） | **低**（parentId为空时使用） |

### 查询规则

1. **优先级规则**：`parentId` > `level`
   - 如果传了 `parentId`，忽略 `level`
   - 如果只传 `level`，返回该层级的所有地址
   
2. **具体示例**：

```typescript
// ✅ 示例1：加载所有省份
const provinces = await addressApi.getList({ level: 1 });
// 返回：[{id:1, name:"广东省", level:1}, {id:2, name:"江苏省", level:1}, ...]

// ✅ 示例2：加载广东省的所有市
const cities = await addressApi.getList({ parentId: 1 });
// 返回：[{id:101, name:"深圳市", level:2, parentId:1}, {id:102, name:"广州市", level:2, parentId:1}, ...]

// ✅ 示例3：加载深圳市的所有区县
const districts = await addressApi.getList({ parentId: 101 });
// 返回：[{id:1001, name:"南山区", level:3, parentId:101}, ...]

// ⚠️ 示例4：同时传递（parentId优先）
const result = await addressApi.getList({ parentId: 1, level: 3 });
// 实际执行：GET /api/addresses?parentId=1
// 返回：广东省的所有市（忽略level=3）
```

---

## 🔗 查询地址链接口详解

### API签名
```typescript
GET /api/addresses/chain/{addressId}
```

### 用途
**编辑客户时回显地址选择器**，根据客户的 `addressId` 查询完整的地址链路。

### 响应数据结构

```typescript
interface AddressChainVO {
  addressIds: number[];       // [1, 101, 1001, 10001, 100001]
  addressNames: string[];     // ["广东省", "深圳市", "南山区", "西丽街道", "留仙村"]
  addressLevels: number[];    // [1, 2, 3, 4, 5]
  fullPath: string;           // "广东省-深圳市-南山区-西丽街道-留仙村"
  targetAddressId: number;    // 100001
  targetAddressName: string;  // "留仙村"
}
```

### 使用示例

```typescript
/**
 * 编辑客户时加载地址链
 */
async loadCustomerAddress(addressId: number): Promise<void> {
  try {
    // 1. 调用地址链接口
    const chain = await addressApi.getChain(addressId);
    
    // 2. 重建地址路径数组
    const addressPath: AddressVO[] = [];
    for (let i = 0; i < chain.addressIds.length; i++) {
      addressPath.push({
        id: chain.addressIds[i],
        name: chain.addressNames[i],
        level: chain.addressLevels[i],
        // ... 其他字段
      });
    }
    
    // 3. 在地址选择器中回显
    this.setData({
      selectedAddressPath: addressPath,
      displayAddressPath: chain.fullPath  // "广东省-深圳市-南山区-西丽街道-留仙村"
    });
    
  } catch (error) {
    console.error('加载地址链失败', error);
  }
}
```

---

## 🌳 地址层级说明

### 层级定义

| Level | 名称 | 说明 | 可作为客户地址 |
|-------|------|------|---------------|
| 1 | 省 | 省级行政区 | ❌ 否 |
| 2 | 市 | 市级行政区 | ❌ 否 |
| 3 | 区县 | 区/县级行政区 | ❌ 否 |
| **4** | **镇/街道** | 镇/乡/街道 | **✅ 是** |
| **5** | **村** | 村/社区 | **✅ 是** |

### 业务规则

```typescript
/**
 * 客户地址必须满足：level >= 4
 * 
 * 即：只能选择镇/街道或村级地址
 */

// ✅ 合法的客户地址
addressLevel = 4  // 镇/街道
addressLevel = 5  // 村

// ❌ 非法的客户地址
addressLevel = 1  // 省
addressLevel = 2  // 市
addressLevel = 3  // 区县
```

### 验证示例

```typescript
/**
 * 验证地址是否可用于客户
 */
function isValidCustomerAddress(address: AddressVO): boolean {
  return address.level >= 4;
  // 或者使用后端返回的字段
  // return address.isVillageLevel === true;
}

/**
 * 地址选择器中的验证
 */
handleConfirmAddress(): void {
  const selectedAddress = this.data.selectedPath[this.data.selectedPath.length - 1];
  
  if (selectedAddress.level < 4) {
    wx.showToast({
      title: `请选择到${selectedAddress.level === 3 ? '镇' : '村'}级`,
      icon: 'none'
    });
    return;
  }
  
  // 继续处理...
}
```

---

## 🎯 地址选择器实现要点

### 1. 懒加载模式

**核心思想**：点击上层，动态加载下层，避免一次性加载全部地址数据。

```typescript
// 用户交互流程
打开选择器
  ↓
加载省份列表 (GET /addresses?level=1)
  ↓
点击"广东省"
  ↓
加载市列表 (GET /addresses?parentId=1)
  ↓
点击"深圳市"
  ↓
加载区县列表 (GET /addresses?parentId=101)
  ↓
点击"南山区"
  ↓
加载镇街道列表 (GET /addresses?parentId=1001)
  ↓
点击"西丽街道" (level=4，可确认)
  ↓
用户可选择：
  - [确认] 选择"西丽街道"
  - [继续] 加载村列表 (GET /addresses?parentId=10001)
```

### 2. 组件状态管理

```typescript
data: {
  // 当前层级的地址列表
  currentLevelList: [] as AddressVO[],
  
  // 已选择的地址路径（从省到当前）
  selectedPath: [] as AddressVO[],
  // 示例：[
  //   {id:1, name:"广东省", level:1},
  //   {id:101, name:"深圳市", level:2},
  //   {id:1001, name:"南山区", level:3}
  // ]
  
  // 当前所在层级
  currentLevel: 0,  // 0=未开始, 1-5=对应层级
  
  // 加载状态
  loading: false,
  
  // 选择器是否可见
  visible: false
}
```

### 3. 关键方法

#### 3.1 加载地址列表

```typescript
/**
 * 加载地址列表（懒加载）
 */
async loadAddressList(parentId: number | null, level: number): Promise<void> {
  try {
    this.setData({ loading: true });
    
    const params: AddressQueryDTO = {};
    if (parentId !== null) {
      // 有父级ID，加载子地址
      params.parentId = parentId;
    } else {
      // 无父级ID，按层级加载（通常是level=1加载省份）
      params.level = level;
    }
    
    const list = await addressApi.getList(params);
    
    this.setData({
      currentLevelList: list,
      currentLevel: level
    });
  } catch (error) {
    console.error('加载地址失败', error);
    wx.showToast({ title: '加载失败', icon: 'none' });
  } finally {
    this.setData({ loading: false });
  }
}
```

#### 3.2 选择地址

```typescript
/**
 * 选择地址项
 */
async handleSelectAddress(address: AddressVO): Promise<void> {
  // 1. 更新选择路径
  const newPath = [...this.data.selectedPath];
  
  // 如果当前层级已有选择，替换它（允许切换）
  const existingIndex = newPath.findIndex(p => p.level === address.level);
  if (existingIndex >= 0) {
    newPath[existingIndex] = address;
    newPath.splice(existingIndex + 1);  // 删除后续选择
  } else {
    newPath.push(address);
  }
  
  this.setData({ selectedPath: newPath });
  
  // 2. 判断是否需要继续选择下一级
  if (address.level < 5) {
    // 还没到村级，加载下一级
    await this.loadAddressList(address.id, address.level + 1);
  } else {
    // 已经是村级，自动确认
    this.handleConfirm();
  }
}
```

#### 3.3 编辑时回显

```typescript
/**
 * 加载地址链（编辑时回显）
 */
async loadAddressChain(addressId: number): Promise<void> {
  try {
    this.setData({ loading: true });
    
    // 1. 调用地址链接口
    const chain = await addressApi.getChain(addressId);
    
    // 2. 重建选择路径
    const path: AddressVO[] = [];
    for (let i = 0; i < chain.addressIds.length; i++) {
      path.push({
        id: chain.addressIds[i],
        name: chain.addressNames[i],
        level: chain.addressLevels[i],
        parentId: i > 0 ? chain.addressIds[i - 1] : 0,
        // ... 其他字段根据需要填充
      } as AddressVO);
    }
    
    this.setData({
      selectedPath: path,
      currentLevel: chain.addressLevels[chain.addressLevels.length - 1]
    });
    
    // 3. 加载同级地址列表（用于切换）
    const parentId = chain.addressIds[chain.addressIds.length - 2] || null;
    const currentLevel = chain.addressLevels[chain.addressLevels.length - 1];
    await this.loadAddressList(parentId, currentLevel);
    
  } catch (error) {
    console.error('加载地址链失败', error);
  } finally {
    this.setData({ loading: false });
  }
}
```

#### 3.4 返回上一级

```typescript
/**
 * 返回上一级
 */
async handleGoBack(): Promise<void> {
  const path = this.data.selectedPath;
  
  if (path.length === 0) {
    // 已经在顶级，关闭选择器
    this.handleClose();
    return;
  }
  
  // 删除最后一级
  const newPath = [...path];
  newPath.pop();
  this.setData({ selectedPath: newPath });
  
  // 重新加载上一级列表
  if (newPath.length === 0) {
    // 返回省份列表
    await this.loadAddressList(null, 1);
  } else {
    // 加载上一级的子地址列表
    const lastSelected = newPath[newPath.length - 1];
    await this.loadAddressList(lastSelected.id, lastSelected.level + 1);
  }
}
```

---

## ⚠️ 常见问题

### Q1: 为什么不一次性加载整个地址树？

**A**: 全国地址数据量巨大（省市区镇村5级，预估数万条），一次性加载会导致：
- 首次加载时间过长
- 内存占用过大
- 不必要的数据传输
- 用户体验差

懒加载模式只在用户需要时才加载数据，体验更好。

### Q2: 如果用户选择了镇级（level=4），还能继续选择村级吗？

**A**: 可以。设计支持两种模式：
1. **直接确认镇级**：用户在镇级点击确认按钮
2. **继续选择村级**：用户点击镇级后，自动加载该镇的村列表

组件应该提供"确认"按钮和"继续"提示。

### Q3: 地址数据如何缓存？

**A**: 建议的缓存策略：
```typescript
// 1. 内存缓存：存储已加载的地址列表
const addressCache = new Map<string, AddressVO[]>();

async function getCachedAddressList(params: AddressQueryDTO): Promise<AddressVO[]> {
  const cacheKey = params.parentId ? `parent_${params.parentId}` : `level_${params.level}`;
  
  // 先查缓存
  if (addressCache.has(cacheKey)) {
    return addressCache.get(cacheKey)!;
  }
  
  // 无缓存，调用接口
  const list = await addressApi.getList(params);
  
  // 存入缓存
  addressCache.set(cacheKey, list);
  
  return list;
}
```

### Q4: 后端返回的 `mergerName` 字段用途是什么？

**A**: `mergerName` 是后端自动生成的完整地址路径，可以直接用于显示，无需前端拼接。

```typescript
// ✅ 推荐：直接使用后端返回的 mergerName
displayText = address.mergerName;  // "广东省-深圳市-南山区-西丽街道-留仙村"

// ❌ 不推荐：前端手动拼接（容易出错）
displayText = addressPath.map(a => a.name).join('-');
```

### Q5: `isVillageLevel` 字段的含义是什么？

**A**: `isVillageLevel` 表示该地址是否可用于客户地址（level >= 4）。

```typescript
// 后端已经计算好，前端可以直接使用
if (address.isVillageLevel) {
  // 可以作为客户地址
  enableConfirmButton();
} else {
  // 不能作为客户地址，必须继续选择下一级
  disableConfirmButton();
}

// 等价于
if (address.level >= 4) {
  enableConfirmButton();
}
```

---

## 📝 最佳实践

### 1. 错误处理

```typescript
try {
  const list = await addressApi.getList(params);
  // 处理数据
} catch (error: any) {
  // 根据错误码处理
  if (error.statusCode === 404) {
    wx.showToast({ title: '地址不存在', icon: 'none' });
  } else if (error.statusCode === 500) {
    wx.showToast({ title: '服务器错误', icon: 'none' });
  } else {
    wx.showToast({ title: '加载失败，请重试', icon: 'none' });
  }
}
```

### 2. 加载状态提示

```typescript
// 显示加载中
this.setData({ loading: true });

try {
  const list = await addressApi.getList(params);
  this.setData({ currentLevelList: list });
} finally {
  // 始终隐藏加载状态
  this.setData({ loading: false });
}
```

### 3. 空状态处理

```typescript
const list = await addressApi.getList(params);

if (list.length === 0) {
  // 显示空状态
  this.setData({
    currentLevelList: [],
    isEmpty: true,
    emptyTip: '该地区暂无下级地址'
  });
} else {
  this.setData({
    currentLevelList: list,
    isEmpty: false
  });
}
```

---

**文档版本**: v1.0  
**创建日期**: 2024-11-28  
**适用场景**: 客户管理页面地址选择功能  
**维护人**: Core Ledger Team
