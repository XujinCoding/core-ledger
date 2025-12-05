---
description: 执行实现规划工作流，使用规划模板生成设计工件。
---

## 用户输入

```text
$ARGUMENTS
```

在继续之前，您**必须**考虑用户输入（如果非空）。

## 大纲

1. **创建plan相关文档**：
   
   a. 通过对话上下文中获取jira任务号`<jira-task>`

   b. 如对话上下文中未提供，则必须输出以下提示，并等待用户输入：
      ```markdown
      请输入本次任务的jira任务号`<jira-task>`
      在用户输入前不得继续执行。
      ``` 
      
   c. 复制plan模板文件, 运行命令：`cp ".specify/templates/plan-template.md" "specs/<jira-task>/plan.md"`。(上层目录已存在无需创建)

2. **加载上下文**：读取 `specs/<jira-task>/spec.md` 和 `.specify/memory/constitution.md`。加载 `specs/<jira-task>/plan.md` 模板（已复制）。

3. **执行规划工作流**：按照 `specs/<jira-task>/plan.md` 模板的结构进行：
   - 根据功能描述和`<jira-task>`（参数）派生的具体细节替换占位符，同时保留部分顺序和标题。
   - 填写技术上下文（将未知项标记为 "NEEDS CLARIFICATION"）
   - 从宪法中填写宪法检查部分
   - 评估门禁（如果违规未得到合理解释则报错）
   - 阶段 0：生成 research.md（解决所有 NEEDS CLARIFICATION）
   - 阶段 1：生成 data-model.md、contracts/、quickstart.md
   - 阶段 1：通过运行代理脚本更新代理上下文
   - 设计后重新评估宪法检查

4. **停止并报告**：命令在阶段 2 规划后结束。报告分支、`specs/<jira-task>/plan.md` 路径和生成的工件。

## 阶段

### 阶段 0：大纲与研究

1. **从上述技术上下文中提取未知项**：
   - 对于每个 NEEDS CLARIFICATION → 研究任务
   - 对于每个依赖项 → 最佳实践任务
   - 对于每个集成 → 模式任务

2. **生成并派遣研究代理**：

   ```text
   对于技术上下文中的每个未知项：
     任务："研究 {unknown} 以了解 {feature context}"
   对于每个技术选择：
     任务："查找 {domain} 中 {tech} 的最佳实践"
   ```

3. **将发现结果整合到 `research.md` 中，格式如下**：
   - 决策：[选择了什么]
   - 理由：[为什么选择]
   - 考虑的替代方案：[评估了哪些其他选项]

**输出**：解决了所有 NEEDS CLARIFICATION 的 research.md

### 阶段 1：设计与契约

**前提条件**：`research.md` 已完成

1. **从功能规范中提取实体** → `data-model.md`：
   - 实体名称、字段、关系
   - 来自需求的验证规则
   - 如果适用，状态转换

2. **根据功能需求生成 API 契约**：
   - 如本次功能没有API相关依赖，则不应创建生成API契约
   - 如上下文已提供具体API文件，则将相应API文档输出到 `/contracts/`
   - 对于每个用户操作 → 端点
   - 使用标准的 REST/GraphQL 模式
   - 将 OpenAPI/GraphQL 模式输出到 `/contracts/`

**输出**：data-model.md、/contracts/*、quickstart.md、代理特定文件

## 关键规则

- 使用绝对路径
- 在门禁失败或未解决澄清时抛出错误