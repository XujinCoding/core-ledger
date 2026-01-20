# Requirements Document

## Introduction

本文档定义了微信小程序审核合规整改的需求。针对微信审核团队提出的两个核心问题：
1. 隐私政策默认强制同意问题 - 需要提供复选框让用户主动勾选同意
2. 未体验功能即要求授权登录问题 - 需要提供游客模式让用户先浏览体验

本次整改采用简化方案：
- 登录页面添加隐私政策复选框（每次都需要勾选）
- 创建独立的游客模式页面（模拟真实页面但使用示例数据）
- 一次性获取所有必要的用户授权

## Glossary

- **Privacy_Checkbox**: 隐私政策复选框，用户需主动勾选表示同意
- **Agreement_Modal**: 协议详情弹窗，展示用户协议或隐私政策的完整内容
- **Guest_Pages**: 游客模式页面集合，独立于真实业务页面的演示页面
- **Login_Page**: 登录页面，包含身份选择、隐私政策复选框和登录按钮
- **Authorization_Flow**: 授权流程，一次性获取用户的所有必要授权信息

## Requirements

### Requirement 1: 隐私政策复选框机制

**User Story:** 作为小程序用户，我希望通过主动勾选复选框来表示同意隐私政策，而不是被默认强制同意，以便我明确表达自己的意愿。

#### Acceptance Criteria

1. WHEN 用户进入登录页面 THEN THE Login_Page SHALL 在登录按钮上方显示隐私政策复选框
2. WHEN Privacy_Checkbox 展示时 THEN THE Privacy_Checkbox SHALL 默认为未勾选状态
3. WHEN Privacy_Checkbox 展示时 THEN THE Privacy_Checkbox SHALL 显示文本"我已阅读并同意《用户协议》和《隐私政策》"
4. WHEN 用户点击"用户协议"链接 THEN THE Agreement_Modal SHALL 弹出展示用户协议完整内容
5. WHEN 用户点击"隐私政策"链接 THEN THE Agreement_Modal SHALL 弹出展示隐私政策完整内容
6. WHEN 用户未勾选 Privacy_Checkbox 并点击登录按钮 THEN THE Login_Page SHALL 阻止登录并提示"请先阅读并同意用户协议和隐私政策"
7. WHEN 用户勾选 Privacy_Checkbox 并点击登录按钮 THEN THE Authorization_Flow SHALL 开始执行授权登录流程

### Requirement 2: 协议详情弹窗

**User Story:** 作为小程序用户，我希望能够在弹窗中查看完整的用户协议和隐私政策内容，以便充分了解我的权利和义务。

#### Acceptance Criteria

1. WHEN Agreement_Modal 弹出时 THEN THE Agreement_Modal SHALL 显示协议标题（"用户协议"或"隐私政策"）
2. WHEN Agreement_Modal 弹出时 THEN THE Agreement_Modal SHALL 提供可滚动的内容区域展示完整协议文本
3. WHEN Agreement_Modal 弹出时 THEN THE Agreement_Modal SHALL 提供"关闭"按钮允许用户关闭弹窗
4. WHEN 用户点击"关闭"按钮或弹窗外部区域 THEN THE Agreement_Modal SHALL 关闭并返回登录页面
5. WHEN Agreement_Modal 展示时 THEN THE Agreement_Modal SHALL 支持文本选择和复制功能

### Requirement 3: 用户协议内容编写

**User Story:** 作为产品负责人，我需要编写符合法律要求的用户协议，明确说明服务内容、用户权利和义务。

#### Acceptance Criteria

1. THE 用户协议 SHALL 包含服务说明章节，描述账单管理小程序提供的核心功能
2. THE 用户协议 SHALL 包含用户权利章节，说明用户可以使用的功能和享有的权益
3. THE 用户协议 SHALL 包含用户义务章节，说明用户应遵守的使用规范
4. THE 用户协议 SHALL 包含免责声明章节，说明服务提供方的责任范围
5. THE 用户协议 SHALL 包含协议变更说明，告知用户协议更新的通知方式

### Requirement 4: 隐私政策内容编写

**User Story:** 作为产品负责人，我需要编写符合法律要求的隐私政策，明确说明数据收集、使用和保护措施。

#### Acceptance Criteria

1. THE 隐私政策 SHALL 包含信息收集章节，列出收集的用户信息类型（微信昵称、头像）
2. THE 隐私政策 SHALL 包含信息使用章节，说明收集信息的具体用途（身份认证、账单管理等）
3. THE 隐私政策 SHALL 包含信息存储章节，说明数据存储的位置和期限
4. THE 隐私政策 SHALL 包含信息保护章节，说明采取的安全保护措施
5. THE 隐私政策 SHALL 包含用户权利章节，说明用户可以查询、修改、删除个人信息的方式

### Requirement 5: 游客模式页面设计

**User Story:** 作为小程序用户，我希望在未登录状态下能够浏览应用的主要功能界面，以便在决定是否授权登录前了解应用的实际使用体验。

#### Acceptance Criteria

1. WHEN 用户首次打开小程序 THEN THE Guest_Pages SHALL 展示游客模式的主页面
2. WHEN Guest_Pages 展示时 THEN THE Guest_Pages SHALL 模拟真实页面的布局和交互方式
3. WHEN Guest_Pages 展示时 THEN THE Guest_Pages SHALL 使用预设的示例数据（示例客户、示例账单等）
4. WHEN Guest_Pages 展示时 THEN THE Guest_Pages SHALL 在页面顶部或底部显示"当前为游客模式，登录后可使用完整功能"提示
5. WHEN 用户在 Guest_Pages 点击需要登录的操作 THEN THE Guest_Pages SHALL 弹出提示并引导用户前往登录页面
6. THE Guest_Pages SHALL 与真实业务页面完全独立，不共享代码和数据

### Requirement 6: 游客模式示例数据

**User Story:** 作为产品设计者，我需要为游客模式准备合理的示例数据，让用户能够直观地理解应用的功能和价值。

#### Acceptance Criteria

1. THE Guest_Pages SHALL 包含 3-5 个示例客户数据（姓名、联系方式、欠款金额等）
2. THE Guest_Pages SHALL 包含 5-10 条示例账单记录（日期、商品、金额、状态等）
3. THE Guest_Pages SHALL 包含示例商品分类和商品数据
4. THE Guest_Pages SHALL 在示例数据中使用明显的标识（如"示例客户"、"演示数据"）
5. WHEN 用户尝试修改示例数据 THEN THE Guest_Pages SHALL 提示"游客模式下无法修改数据，请登录后使用"

### Requirement 7: 游客模式导航和引导

**User Story:** 作为小程序用户，我希望在游客模式下能够清晰地知道如何登录使用完整功能。

#### Acceptance Criteria

1. WHEN Guest_Pages 展示时 THEN THE Guest_Pages SHALL 在导航栏或固定位置显示"登录"按钮
2. WHEN 用户点击"登录"按钮 THEN THE Guest_Pages SHALL 跳转到登录页面
3. WHEN 用户在 Guest_Pages 停留超过 30 秒 THEN THE Guest_Pages SHALL 显示浮动提示"登录后可管理真实账单数据"
4. WHEN 用户尝试执行写操作（添加、修改、删除） THEN THE Guest_Pages SHALL 弹出提示"此功能需要登录后使用"并提供"立即登录"按钮

### Requirement 8: 微信授权流程

**User Story:** 作为小程序用户，我希望在登录时完成微信授权，获取我的昵称和头像用于身份展示。

#### Acceptance Criteria

1. WHEN 用户勾选隐私政策复选框并点击登录 THEN THE Authorization_Flow SHALL 请求微信用户信息授权（昵称、头像）
2. WHEN 用户完成微信用户信息授权 THEN THE Authorization_Flow SHALL 将用户信息提交到后端完成登录
3. WHEN 用户拒绝授权 THEN THE Authorization_Flow SHALL 终止登录流程并返回登录页面
4. WHEN 授权流程执行时 THEN THE Login_Page SHALL 显示加载状态提示用户等待

### Requirement 9: 应用启动流程

**User Story:** 作为系统架构师，我需要设计一个符合微信规范的应用启动流程，确保用户首次打开时进入游客模式而不是登录页面。

#### Acceptance Criteria

1. WHEN 应用启动时 THEN THE 应用 SHALL 检查用户登录状态
2. WHEN 用户未登录 THEN THE 应用 SHALL 直接进入游客模式主页面
3. WHEN 用户已登录 THEN THE 应用 SHALL 自动恢复用户会话并进入真实业务主页面
4. WHEN 应用启动过程中 THEN THE 应用 SHALL NOT 主动弹出任何授权请求或登录页面
5. WHEN 应用启动过程中 THEN THE 应用 SHALL NOT 自动跳转到登录页面
