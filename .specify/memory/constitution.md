<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0
- Modified principles: P1–P9 localized to Chinese (内容等效)
- New sections: P10 样式一致性, P11 弹窗交互规范
- Deleted sections: none
- Templates needing update:
  - .specify/templates/plan-template.md → ✅ Updated to v1.1.0
  - .specify/templates/spec-template.md → ✅ No changes required
- Deferred placeholders:
  - TODO(COMMIT_CONVENTION): Define precise Conventional Commits rules or team-specific commit style
-->

# UI 宪法：Core Ledger UI

- 项目：Core Ledger UI（微信小程序）
- 宪法版本：1.1.0
- 通过日期：2025-12-04
- 最后修订：2025-12-04
- 范围：前端小程序 `core-ledger-ui/miniprogram`

## 目的
提供可强制执行、可测试的前端规则，确保一致性、可靠性与可维护性。本文将 Core Ledger UI 的最佳实践固化为 MUST/SHOULD 级别的条款。

## 原则（Principles）

### P1. 组件化优先（MUST）
- 满足以下任一条件必须抽为组件：
  - 复用次数 ≥ 3；
  - 具有独立交互逻辑（如下拉、日期选择、搜索等）；
  - 结构复杂（如分类树、卡片、账单项）。
- 组件必须包含 4 个文件 + README.md；事件输出使用 `triggerEvent`；`properties` 需完整类型定义。
- 理由：复用、可读性、可测试性更强。

### P2. 类型安全（MUST）
- 禁用 `any`；所有函数参数与返回值必须显式类型标注；
- 优先使用 `interface`；确需映射/联合/工具类型时使用 `type`；
- 类型统一存放于 `miniprogram/types`（环境声明在 `typings/`）。
- 理由：降低运行时错误，提升重构与 DX。

### P3. 统一 API 访问（MUST）
- 禁止直接使用 `wx.request`；
- 所有网络请求必须经由 `miniprogram/api/request.ts` 与 `miniprogram/api/modules/*`；
- API 方法必须声明精确返回类型并处理错误。
- 理由：集中认证、拦截与错误策略。

### P4. 错误、日志与用户反馈（MUST）
- 使用统一错误处理；向用户提供友好的提示；
- 日志必须有意义；发布前清理噪声日志；
- 认证失败的跳转遵循统一流程。
- 理由：可预期的体验与快速定位问题。

### P5. 文件组织与命名（MUST）
- 单一职责：>300 行建议拆分；除组件外避免 >500 行；
- 文件/目录命名与导出实体、域模型一致；
- 页面/组件文件集必须完整：`.ts/.wxml/.wxss/.json`。
- 理由：可发现性强，降低认知负担。

### P6. 性能卫生（MUST/SHOULD）
- MUST 批量 `setData`，优先路径更新；
- SHOULD 对高频交互使用防抖/节流；
- SHOULD 图片采用合适 `mode`、懒加载，条件允许使用 webp。
- 理由：流畅度与资源占用更优。

### P7. 文档与注释（MUST）
- 新文件需包含文件头（描述/作者/日期）；
- 导出函数/组件必须有 JSDoc（参数/返回值/示例）；
- 使用 `TODO/NOTE/FIXME` 并简述原因。
- 理由：共享理解与加速新人上手。

### P8. 测试与就绪清单（MUST）
- 提交前必须满足：
  - 类型完整、无 `any`；
  - API 均有错误处理；
  - 重复逻辑已抽取；
  - 导出均有 JSDoc；
  - `setData` 批量、代码已格式化、无多余日志。
- 新页面/组件的专属清单必须通过。
- 理由：防止回归，维持质量门槛。

### P9. API 与类型契约（MUST）
- 遵循下方目录与导入规则；
- 契约集中在 `miniprogram/types/*`，按需由 `index.d.ts` 聚合导出；
- API 模块必须消费这些契约以保证端到端类型安全。
- 理由：数据契约单一事实源。

### P10. 样式一致性（MUST）
- 全局样式集中在 `miniprogram/styles/`：
  - 导入顺序：`reset.wxss` → `theme.wxss` → `common.wxss`；
  - 页面与组件样式应复用 `common.wxss` 的通用样式与工具类；
  - 禁止在页面重复定义主题色/间距常量，统一在 `theme.wxss` 维护。
- 命名采用 BEM 规范：`block__element--modifier`；
- 间距与字号遵循统一刻度（以 `common.wxss`/`theme.wxss` 现有刻度为准）。
- 理由：视觉一致、可维护、可复用。

### P11. 弹窗交互规范（SHOULD/MUST）
- 优先使用底部弹出（bottom sheet）形式的弹层（如 action-sheet 或自定义底部弹层）；
- 仅在关键确认/高危操作时使用阻塞式模态（如 `wx.showModal`）；
- 弹层需支持点击遮罩关闭（高危确认除外），并提供可访问的焦点管理。
- 理由：减少打断、提升操作连续性与一致性。

^ 微信小程序的环境类型扩展应放置于 `core-ledger-ui/typings`。

## 目录与导入

- API
  - `miniprogram/api/config.ts`：基础配置（baseURL/timeout/tokenKey）；
  - `miniprogram/api/request.ts`：请求封装与 `get/post/put/del` 便捷方法；
  - `miniprogram/api/modules/*`：领域 API，通过 `modules/index.ts` 统一导出。
- 类型
  - `miniprogram/types/*.d.ts`：领域契约（如 `customer.d.ts`、`common.d.ts`）；
  - `miniprogram/types/index.d.ts`：按需作为聚合导出入口。
- 组件
  - `miniprogram/components/<kebab-name>/*`：4 文件结构 + README.md。
- 页面
  - `miniprogram/pages/<page-name>/*`：遵循列表/表单模板最佳实践。

所有 UI 代码的导入必须一致地遵循上述相对路径。

## 合规

- PR 必须包含“宪法检查”小节并引用本文；
- CI/评审者必须核对 P8 的就绪清单；
- 高危违规（阻断合并）：
  - 直接使用 `wx.request`；
  - 使用 `any`、缺失错误处理、缺失类型标注；
  - 重复逻辑未组件化；
- 一般违规：JSDoc 缺失、格式不统一、命名不一致。

## 治理

### 修订流程
- 通过 PR 提案，附带动机与示例；
- 至少 1 位领域评审 + 1 位维护者批准；
- 合并即生效，并更新“最后修订”日期。

### 版本策略（语义化）
- MAJOR：不兼容的治理变更或原则删除/重定义；
- MINOR：新增原则/章节或实质性扩展指导；
- PATCH：澄清、表述、拼写等非语义变更。

### 评审节奏与合规
- 每季度进行一次治理评审，或在 UI 平台重大变更时进行；
- 违规在合并前必须修复，除非维护者授予豁免；
- 任何豁免须在 PR 中记录有效期与后续任务。

## 变更记录（Changelog）

- 1.1.0 (2025-12-04)：本地化为中文；新增 P10（样式一致性）与 P11（弹窗交互规范）。
- 1.0.0 (2025-12-04)：初始采纳，基于 `core-ledger-ui/docs/DEVELOPMENT_BEST_PRACTICES.md` 与当前仓库结构。
