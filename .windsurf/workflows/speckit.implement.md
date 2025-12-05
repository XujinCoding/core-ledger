---
description: 根据plan.md来执行编码实现
---

## 用户输入

```text
$ARGUMENTS
```

在继续之前，您**必须**考虑用户输入（如果非空）。

## 大纲

1. **获取当前jira任务号**：
   
   a. 通过对话上下文中获取jira任务号`<jira-task>`
   
   b. 如对话上下文中未提供，则必须输出以下提示，并等待用户输入：
      ```markdown
      请输入本次任务的jira任务号`<jira-task>`
      在用户输入前不得继续执行。
      ``` 

2. **加载并分析实现上下文**：
   - **必需**：读取 `specs/<jira-task>/plan.md` 以了解技术栈、架构和文件结构
   - **必需**：读取 `.specify/memory/constitution.md` 以了解项目开发标准
   - **如果存在**：读取 `specs/<jira-task>/data-model.md` 以了解实体和关系
   - **如果存在**：读取 `specs/<jira-task>/contracts/` 以了解 API 规范和测试要求
   - **如果存在**：读取 `specs/<jira-task>/research.md` 以了解技术决策和约束
   - **如果存在**：读取 `specs/<jira-task>/quickstart.md` 以了解集成场景

3. 根据plan.md来执行编码实现

4. 编码实现完成后，输出编码实现总结报告

注意：此命令假定 plan.md 已存在。如果 plan.md 不存在，建议先运行 `/speckit.plan` 以生成设计工件。