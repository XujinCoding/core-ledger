# 核芯账本系统 - 登录模块数据库设计提示词

## 一、项目背景

**项目名称**: 核芯账本系统 (Core Ledger System)  
**模块**: 登录认证模块 (Authentication Module)  
**数据库**: MySQL 8.0+  
**ORM框架**: JPA/Hibernate  
**迁移工具**: Flyway  

## 二、核心业务需求

### 2.1 用户身份体系

系统支持两种用户身份：

1. **商户 (Merchant)**
   - 拥有商户账户，可创建和管理客户
   - 支持微信登录和账号密码登录
   - 一个用户可以拥有多个商户
   - 商户拥有独立的username/password

2. **客户 (Customer)**
   - 属于某个商户，有账单数据
   - 只支持微信登录
   - 一个用户可以是多个商户的客户
   - 一个微信既可以是商户，也可以是客户

### 2.2 关键业务场景

**场景1：商户注册**
- 用户通过微信授权 → 填写手机号、用户名、密码、商户名称 → 一次性提交
- 创建User记录（包括username/password）
- 创建Merchant记录
- 生成商户邀请码和二维码

**场景2：客户注册**
- 用户通过微信授权 → 填写手机号 → 提交
- 创建User记录
- 客户需要扫商户二维码绑定商户

**场景3：商户手动创建客户**
- 商户在后台手动添加客户（客户名称、手机号、地址、性别、年龄）
- 创建Customer记录，user_id为NULL
- 当该手机号的用户后来注册时，自动关联

**场景4：客户扫码绑定商户**
- 客户扫商户二维码 → 检查是否有同手机号的未注册客户
- 如果有 → 提示确认关联；如果没有 → 创建新客户
- 绑定成功后自动切换到该商户的客户身份

**场景5：身份切换**
- 商户可以在多个商户之间切换（需要选择）
- 客户可以在多个商户的客户身份之间切换（可记录上次操作的商户，自动选择）
- 切换时不重新生成Token，只更新Redis中的Session信息

### 2.3 数据隔离策略

- 商户维度隔离：Product、ProductCategory、Ledger、Customer等表需要按merchant_id隔离
- 使用Hibernate @Filter注解实现自动隔离
- 后端在拦截器中启用Filter，ThreadLocal存储当前merchantId

## 三、数据库表结构设计

### 3.1 现有表结构保留

以下表结构已存在，需要保留所有字段和索引：

- `sys_user` - 系统用户表
- `sys_address` - 行政区划地址库
- `customer` - 客户信息表
- `ledger` - 账本主表
- `ledger_item` - 账本明细表
- `payment_record` - 支付流水表
- `product_category` - 商品分类表
- `product` - 商品信息表
- `product_attr` - 商品属性表
- `product_attr_value` - 商品属性值表
- `product_sku` - 商品SKU表
- `product_sku_attr` - 商品SKU属性值表

### 3.2 需要修改的表

#### 表1：sys_user（系统用户表）- 保留

**修改说明**：
- 保留所有现有字段
- username和password都是可选的（允许NULL）
- 用户可以先通过微信登录（无username/password），后续补充
- 一个User对应一套username/password，所有商户共用

**字段清单**：
```
- id (BIGINT, PK, AUTO_INCREMENT)
- username (VARCHAR(50), UNIQUE, NULL)
- password (VARCHAR(100), NULL)
- phone (VARCHAR(20), NOT NULL, UNIQUE) - 必填，用于客户匹配
- role (TINYINT, NOT NULL, DEFAULT 0) - 0=普通用户, 1=管理员
- wx_openid (VARCHAR(100), UNIQUE, NULL)
- wx_nickname (VARCHAR(100), NULL)
- wx_avatar_url (VARCHAR(500), NULL)
- memo (VARCHAR(255), NULL)
- status (INT, NOT NULL, DEFAULT 1) - 1=启用, 0=禁用
- create_instant (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- modify_instant (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE)
- version (INT, NOT NULL, DEFAULT 0) - 乐观锁
```

#### 表2：merchant（商户表）- 新建

**字段清单**：
```
- id (BIGINT, PK, AUTO_INCREMENT)
- merchant_no (VARCHAR(32), UNIQUE, NOT NULL) - 商户编号，格式：M_yyyyMMddHHmmss_随机3位
- merchant_name (VARCHAR(100), NOT NULL) - 商户名称
- owner_user_id (BIGINT, NOT NULL, FK) - 商户所有者User ID
- invite_code (VARCHAR(20), UNIQUE, NOT NULL) - 邀请码，用于生成二维码
- qr_code_url (VARCHAR(500), NULL) - 二维码URL
- status (TINYINT, NOT NULL, DEFAULT 1) - 1=启用, 0=禁用
- memo (VARCHAR(255), NULL) - 备注
- create_instant (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- modify_instant (DATETIME, NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE)
- version (INT, NOT NULL, DEFAULT 0) - 乐观锁

INDEX:
- idx_owner_user_id (owner_user_id)
- idx_invite_code (invite_code)
- idx_merchant_no (merchant_no)

FOREIGN KEY:
- owner_user_id -> sys_user.id
```

#### 表3：customer（客户信息表）- 修改

**修改说明**：
- 保留现有字段：name, phone, alias, gender, age, address_id, address_detail
- 新增字段：user_id, merchant_id, customer_no, is_registered
- 采用多条记录方案：一个用户在每个商户下一条记录
- 支持商户手动创建客户（user_id为NULL）

**新增字段**：
```
- customer_no (VARCHAR(32), NOT NULL) - 客户编号，格式：C_yyyyMMddHHmmss_随机3位
- user_id (BIGINT, NULL, FK) - 关联的User ID，允许为空（商户手动创建时）
- merchant_id (BIGINT, NOT NULL, FK) - 所属商户ID
- is_registered (TINYINT, NOT NULL, DEFAULT 0) - 是否已注册：0=未注册, 1=已注册

UNIQUE KEY:
- uk_user_merchant (user_id, merchant_id) - 同一用户在同一商户只能有一条记录
- uk_customer_no_merchant (customer_no, merchant_id) - 客户编号在商户内唯一

INDEX:
- idx_merchant_id (merchant_id)
- idx_user_id (user_id)
- idx_phone (phone)

FOREIGN KEY:
- user_id -> sys_user.id (允许NULL)
- merchant_id -> merchant.id
```

**字段说明**：
- `user_id`: 为NULL表示商户手动创建的未注册客户；不为NULL表示已关联用户
- `is_registered`: 0表示未注册（user_id为NULL），1表示已注册（user_id不为NULL）
- `merchant_id`: 必填，表示客户属于哪个商户

#### 表4：ledger（账本主表）- 修改

**修改说明**：
- 保留现有字段
- 新增merchant_id字段用于数据隔离

**新增字段**：
```
- merchant_id (BIGINT, NOT NULL, FK) - 所属商户ID，用于数据隔离

INDEX:
- idx_merchant_id (merchant_id)

FOREIGN KEY:
- merchant_id -> merchant.id
```

#### 表5：product（商品信息表）- 修改

**修改说明**：
- 保留现有字段
- 新增merchant_id字段用于数据隔离

**新增字段**：
```
- merchant_id (BIGINT, NOT NULL, FK) - 所属商户ID，用于数据隔离

INDEX:
- idx_merchant_id (merchant_id)

FOREIGN KEY:
- merchant_id -> merchant.id
```

#### 表6：product_category（商品分类表）- 修改

**修改说明**：
- 保留现有字段
- 新增merchant_id字段用于数据隔离

**新增字段**：
```
- merchant_id (BIGINT, NOT NULL, FK) - 所属商户ID，用于数据隔离

INDEX:
- idx_merchant_id (merchant_id)

FOREIGN KEY:
- merchant_id -> merchant.id
```

## 四、Flyway迁移文件生成指导

### 4.1 文件命名规范

```
V10.0.0.202512061100__redesign_auth_module.sql
```

格式说明：
- `V` - 版本前缀
- `10.0.0` - 项目版本号
- `202512061100` - 时间戳（年月日时分）
- `__` - 分隔符
- `redesign_auth_module` - 描述性名称

### 4.2 生成要求

1. **保留现有表结构**
   - 不修改已存在的表（除了需要新增字段的表）
   - 保留所有现有字段、索引、约束
   - 保留所有注释

2. **新建merchant表**
   - 完整的CREATE TABLE语句
   - 所有必要的索引
   - 外键约束指向sys_user.id

3. **修改customer表**
   - 使用ALTER TABLE添加新字段
   - 添加新的UNIQUE KEY和INDEX
   - 保留现有字段和索引

4. **修改ledger表**
   - 使用ALTER TABLE添加merchant_id字段
   - 添加INDEX

5. **修改product表**
   - 使用ALTER TABLE添加merchant_id字段
   - 添加INDEX

6. **修改product_category表**
   - 使用ALTER TABLE添加merchant_id字段
   - 添加INDEX

### 4.3 SQL编写规范

```sql
-- 1. 注释规范
-- =====================================================
-- 表名称说明
-- =====================================================

-- 2. 字段注释
`field_name` TYPE COMMENT '字段说明'

-- 3. 索引命名规范
-- 主键: PK
-- 唯一键: uk_字段名
-- 普通索引: idx_字段名

-- 4. 字符集
CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

-- 5. 引擎
ENGINE=InnoDB
```

### 4.4 重要注意事项

1. **不要删除现有字段**
   - 所有修改都是新增或ALTER
   - 不涉及字段删除或重命名

2. **保留现有索引**
   - 新增索引不要覆盖现有索引
   - 保留所有现有的KEY定义

3. **外键约束**
   - merchant.owner_user_id -> sys_user.id
   - customer.merchant_id -> merchant.id
   - customer.user_id -> sys_user.id (允许NULL)
   - ledger.merchant_id -> merchant.id
   - product.merchant_id -> merchant.id
   - product_category.merchant_id -> merchant.id

4. **数据一致性**
   - 修改customer表时，为现有记录的merchant_id和user_id赋予合理的默认值
   - 或使用UPDATE语句在ALTER后进行数据迁移

5. **字符编码**
   - 所有VARCHAR字段使用utf8mb4编码
   - 确保支持中文和emoji

## 五、表结构关系图

```
sys_user (1)
    |
    +---> merchant (多) [owner_user_id]
    |
    +---> customer (多) [user_id]

merchant (1)
    |
    +---> customer (多) [merchant_id]
    |
    +---> ledger (多) [merchant_id]
    |
    +---> product (多) [merchant_id]
    |
    +---> product_category (多) [merchant_id]

customer (1)
    |
    +---> ledger (多) [customer_id]

ledger (1)
    |
    +---> ledger_item (多) [ledger_id]
    |
    +---> payment_record (多) [ledger_id]

product (1)
    |
    +---> product_sku (多) [product_id]
    |
    +---> ledger_item (多) [product_id]

product_category (1)
    |
    +---> product (多) [category_id]
```

## 六、编号生成规则

### 6.1 商户编号 (merchant_no)

格式：`M_yyyyMMddHHmmss_随机3位数`

示例：`M_20231201143025_001`

生成逻辑：
- M: 固定前缀
- yyyyMMddHHmmss: 当前时间戳（年月日时分秒）
- 随机3位数: 000-999的随机数，用于同一秒内的唯一性

### 6.2 客户编号 (customer_no)

格式：`C_yyyyMMddHHmmss_随机3位数`

示例：`C_20231201143025_001`

生成逻辑：
- C: 固定前缀
- yyyyMMddHHmmss: 当前时间戳（年月日时分秒）
- 随机3位数: 000-999的随机数

### 6.3 邀请码 (invite_code)

格式：`6位随机字符（大小写字母+数字）`

示例：`aB3xYz`

生成逻辑：
- 从[A-Za-z0-9]中随机选择6个字符
- 用于生成商户二维码
- 需要在merchant表中UNIQUE

## 七、迁移执行顺序

1. 创建merchant表
2. 修改customer表（添加user_id, merchant_id, customer_no, is_registered）
3. 修改ledger表（添加merchant_id）
4. 修改product表（添加merchant_id）
5. 修改product_category表（添加merchant_id）

## 八、验证清单

生成的SQL文件需要满足以下条件：

- [ ] merchant表创建成功，包含所有必要字段和索引
- [ ] customer表新增字段成功，保留现有字段
- [ ] ledger表新增merchant_id字段
- [ ] product表新增merchant_id字段
- [ ] product_category表新增merchant_id字段
- [ ] 所有外键约束正确
- [ ] 所有索引命名规范
- [ ] 所有字段注释完整
- [ ] 字符编码统一为utf8mb4
- [ ] 没有删除或修改现有字段
- [ ] 没有删除或修改现有索引

## 九、输出格式

生成的Flyway文件应该是单个SQL文件，包含：

1. 文件头注释（项目名、版本、作者、描述）
2. 所有CREATE TABLE语句（新建表）
3. 所有ALTER TABLE语句（修改表）
4. 所有INDEX创建语句（如果需要）
5. 所有外键约束语句
6. 可选的初始化数据INSERT语句

## 十、补充说明

### 10.1 关于数据隔离

- 使用Hibernate @Filter注解实现自动隔离
- 需要在以下Entity类上添加@Filter注解（在Java代码中）：
  - Product
  - ProductCategory
  - Ledger
  - Customer

- Filter定义示例：
  ```java
  @FilterDef(name = "merchantFilter", parameters = @ParamDef(name = "merchantId", type = "long"))
  @Filter(name = "merchantFilter", condition = "merchant_id = :merchantId")
  public class Product { }
  ```

### 10.2 关于Session管理

- 使用Redis存储Session信息：
  ```
  Key: session:{token}
  Value: {
    "userId": 123,
    "role": "MERCHANT",  // MERCHANT / CUSTOMER
    "merchantId": 456,
    "customerId": null
  }
  TTL: 7天
  ```

### 10.3 关于Token

- 使用JWT Token
- Token中只包含userId和role
- 当前身份信息（merchantId, customerId）存储在Redis
- 切换身份时不重新生成Token，只更新Redis

## 十一、生成完成后的步骤

1. 将生成的SQL文件放在：`src/main/resources/db/migration/`
2. 文件名格式：`V10.0.0.202512061100__redesign_auth_module.sql`
3. 运行应用，Flyway会自动执行迁移
4. 验证数据库表结构是否正确

---

**生成日期**: 2025年12月6日  
**项目**: 核芯账本系统  
**模块**: 登录认证模块  
**版本**: 1.0.0  
**用途**: 指导生成式AI生成Flyway迁移文件
