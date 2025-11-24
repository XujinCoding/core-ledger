# Git 工作流规范

## 分支管理

### 主要分支

1. **main**（主分支）
   - 保护分支，只能通过 PR 合并
   - 代码必须经过测试和审核
   - 用于生产环境部署

2. **develop**（开发分支）
   - 日常开发的主分支
   - 集成所有功能分支
   - 用于测试环境部署

### 辅助分支

1. **feature/xxx**（功能分支）
   - 从 develop 创建
   - 用于开发新功能
   - 完成后合并回 develop
   - 示例：`feature/user-login`、`feature/ledger-export`

2. **bugfix/xxx**（bug 修复分支）
   - 从 develop 创建
   - 用于修复测试环境的 bug
   - 完成后合并回 develop
   - 示例：`bugfix/login-error`、`bugfix/data-format`

3. **hotfix/xxx**（热修复分支）
   - 从 main 创建
   - 用于紧急修复生产环境问题
   - 完成后同时合并到 main 和 develop
   - 示例：`hotfix/critical-bug`

4. **release/x.x.x**（发布分支）
   - 从 develop 创建
   - 准备发布新版本
   - 只修复 bug，不添加新功能
   - 完成后合并到 main 和 develop
   - 示例：`release/1.0.0`

## 分支操作流程

### 开发新功能

```bash
# 1. 切换到 develop 分支并更新
git checkout develop
git pull origin develop

# 2. 创建功能分支
git checkout -b feature/user-profile

# 3. 开发并提交代码
git add .
git commit -m "feat: 添加用户资料页面"

# 4. 推送到远程
git push origin feature/user-profile

# 5. 在 GitHub/GitLab 上创建 Pull Request
# 请求将 feature/user-profile 合并到 develop

# 6. 代码审核通过后合并，并删除功能分支
git checkout develop
git pull origin develop
git branch -d feature/user-profile
git push origin --delete feature/user-profile
```

### 修复 Bug

```bash
# 1. 从 develop 创建 bugfix 分支
git checkout develop
git pull origin develop
git checkout -b bugfix/fix-login-error

# 2. 修复 bug 并提交
git add .
git commit -m "fix: 修复登录错误处理"

# 3. 推送并创建 PR
git push origin bugfix/fix-login-error
```

### 紧急热修复

```bash
# 1. 从 main 创建 hotfix 分支
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# 2. 修复问题并提交
git add .
git commit -m "fix: 修复安全漏洞"

# 3. 推送并创建 PR 到 main
git push origin hotfix/critical-security-fix

# 4. 合并到 main 后，还需要合并到 develop
git checkout develop
git merge hotfix/critical-security-fix
git push origin develop
```

## Commit 规范

### Commit 消息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式调整（不影响功能）
- **refactor**: 重构代码
- **perf**: 性能优化
- **test**: 测试相关
- **chore**: 构建过程或辅助工具的变动
- **revert**: 回滚之前的提交

### Scope 范围（可选）

表示影响的范围，如：
- `api`: API 相关
- `pages`: 页面相关
- `components`: 组件相关
- `utils`: 工具函数相关
- `styles`: 样式相关

### Subject 主题

- 简短描述，不超过 50 个字符
- 使用动词开头，如：添加、修复、更新、删除
- 不加句号

### 示例

```bash
# 好的示例
git commit -m "feat(pages): 添加用户资料编辑功能"
git commit -m "fix(api): 修复用户登录接口超时问题"
git commit -m "docs: 更新 API 文档"
git commit -m "style(components): 调整按钮组件样式"
git commit -m "refactor(utils): 重构日期格式化函数"
git commit -m "perf(pages): 优化列表页面渲染性能"

# 避免的示例
git commit -m "修改"
git commit -m "更新代码"
git commit -m "bug fix"
```

### 多行提交消息

```bash
git commit -m "feat(ledger): 添加账本导出功能

- 支持导出为 Excel 格式
- 支持按日期范围筛选
- 添加导出进度提示

Closes #123"
```

## Pull Request 规范

### PR 标题

遵循 commit 规范，清晰描述 PR 内容：

```
feat(user): 添加用户认证功能
fix(ledger): 修复账本统计错误
```

### PR 描述模板

```markdown
## 变更类型
- [ ] 新功能
- [ ] Bug 修复
- [ ] 重构
- [ ] 文档更新
- [ ] 性能优化

## 变更说明
简要描述这次变更的内容和原因

## 测试
- [ ] 已在本地测试通过
- [ ] 已添加单元测试
- [ ] 已在开发环境验证

## 截图（如适用）
添加相关截图

## 关联 Issue
Closes #123
```

### PR 审核清单

- 代码符合项目规范
- 没有引入新的 bug
- 功能完整且可用
- 代码可读性良好
- 必要的注释已添加
- 测试已通过

## 版本标签

### 版本号规范

遵循语义化版本（SemVer）：`MAJOR.MINOR.PATCH`

- **MAJOR**: 不兼容的 API 变更
- **MINOR**: 新增功能，向下兼容
- **PATCH**: Bug 修复，向下兼容

### 创建标签

```bash
# 1. 切换到 main 分支
git checkout main
git pull origin main

# 2. 创建标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 3. 推送标签
git push origin v1.0.0

# 或推送所有标签
git push origin --tags
```

### 查看标签

```bash
# 列出所有标签
git tag

# 查看标签详情
git show v1.0.0
```

## .gitignore 配置

```gitignore
# 微信开发者工具生成的文件
project.private.config.json
.DS_Store

# 依赖目录
node_modules/

# 日志文件
*.log
npm-debug.log*

# 编辑器配置
.vscode/
.idea/
*.swp
*.swo

# 临时文件
.tmp/
.cache/

# 构建产物
dist/
build/

# 环境变量
.env.local
.env.*.local

# 测试覆盖率
coverage/

# 系统文件
Thumbs.db
.DS_Store
```

## 最佳实践

### 1. 及时同步

```bash
# 开始工作前，先同步最新代码
git checkout develop
git pull origin develop
```

### 2. 小步提交

- 每完成一个小功能就提交
- 提交粒度要小，便于追踪和回滚
- 避免一次提交包含多个不相关的修改

### 3. 提交前检查

```bash
# 查看修改的文件
git status

# 查看具体修改内容
git diff

# 只添加需要的文件
git add <specific-file>
```

### 4. 保持分支整洁

```bash
# 合并前先 rebase
git checkout feature/xxx
git rebase develop

# 解决冲突后
git add .
git rebase --continue

# 推送（需要强制推送）
git push -f origin feature/xxx
```

### 5. 删除已合并的分支

```bash
# 删除本地分支
git branch -d feature/xxx

# 删除远程分支
git push origin --delete feature/xxx
```

### 6. 回滚操作

```bash
# 撤销最近一次提交（保留修改）
git reset --soft HEAD~1

# 撤销最近一次提交（不保留修改）
git reset --hard HEAD~1

# 撤销某个文件的修改
git checkout -- <file>

# 回滚到指定提交
git revert <commit-hash>
```

## 协作规范

### 1. 代码审查

- 所有代码必须经过至少一人审查
- 审查者应检查代码质量、规范性和可维护性
- 及时给出建设性的反馈

### 2. 冲突解决

- 发生冲突时，优先与相关开发者沟通
- 仔细检查冲突内容，避免丢失他人的修改
- 解决冲突后重新测试

### 3. 分支保护

- main 和 develop 分支设为保护分支
- 禁止直接推送到保护分支
- 必须通过 PR 合并代码

### 4. 定期清理

- 定期删除已合并的分支
- 清理本地无用的远程分支引用

```bash
# 清理远程已删除的分支引用
git fetch --prune
git remote prune origin
```
