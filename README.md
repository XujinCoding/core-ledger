# Core Ledger 小程序

基于 TypeScript + Less 的微信小程序项目，采用模块化架构设计，提供完整的开发规范和最佳实践。

## 项目特点

- 使用 TypeScript 提供类型安全
- 采用 Less 预处理器编写样式
- 完整的 API 请求封装和管理
- 模块化的项目结构
- 统一的代码规范和开发流程
- 支持 Skyline 渲染引擎

## 快速开始

### 环境要求

- 微信开发者工具最新版本
- Node.js >= 14.x
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发

1. 使用微信开发者工具打开项目目录
2. 配置 AppID（在 project.config.json 中）
3. 开始开发

## 项目结构

```
miniprogram/
├── api/                    # API 接口管理
│   ├── config.ts          # API 配置
│   ├── request.ts         # 请求封装
│   └── modules/           # API 模块
├── components/            # 公共组件
├── pages/                # 页面
├── utils/                # 工具函数
├── constants/            # 常量定义
├── types/                # 类型定义
├── styles/               # 全局样式
└── images/               # 图片资源
```

详细结构说明请查看 [项目结构文档](./docs/PROJECT_STRUCTURE.md)

## 开发规范

项目遵循统一的开发规范，确保代码质量和可维护性：

- [项目结构规范](./docs/PROJECT_STRUCTURE.md) - 目录组织和文件命名
- [代码规范](./docs/CODE_STYLE.md) - TypeScript、WXSS 编码规范
- [API 使用指南](./docs/API_GUIDE.md) - API 请求管理和使用
- [Git 工作流](./docs/GIT_WORKFLOW.md) - 分支管理和提交规范

## 技术栈

- **框架**: 微信小程序原生框架
- **语言**: TypeScript
- **样式**: Less
- **渲染**: Skyline 渲染引擎
- **组件**: Glass Easel 组件框架

## 核心功能

### API 请求管理

统一的 API 请求封装，支持：
- 自动添加 Token
- 统一错误处理
- 请求/响应拦截
- Loading 状态管理
- 文件上传下载

```typescript
import { userApi } from '@/api/modules';

// 获取用户信息
const userInfo = await userApi.getInfo();

// 更新用户信息
await userApi.updateInfo({ nickname: '新昵称' });
```

### 本地存储工具

简化的本地存储 API：

```typescript
import { storage } from '@/utils/storage';

// 存储数据
storage.set('key', value);

// 获取数据
const data = storage.get('key');

// 删除数据
storage.remove('key');
```

### 数据验证工具

常用的数据验证方法：

```typescript
import { isValidPhone, isValidEmail } from '@/utils/validate';

if (!isValidPhone(phone)) {
  wx.showToast({ title: '手机号格式不正确', icon: 'none' });
}
```

### 全局样式

提供丰富的样式工具类：

```wxml
<view class="flex-between p-lg">
  <text class="text-primary text-lg">标题</text>
  <text class="text-gray text-sm">副标题</text>
</view>
```

## 开发流程

### 1. 创建功能分支

```bash
git checkout -b feature/your-feature-name
```

### 2. 开发功能

按照项目规范开发新功能或修复问题

### 3. 提交代码

```bash
git add .
git commit -m "feat: 添加新功能描述"
```

### 4. 推送并创建 PR

```bash
git push origin feature/your-feature-name
```

在 GitHub/GitLab 上创建 Pull Request

### 5. 代码审查

等待团队成员审查代码并提供反馈

### 6. 合并代码

审查通过后合并到主分支

## 常用命令

```bash
# 查看项目信息
npm run info

# 清理缓存
npm run clean

# 运行测试
npm test

# 代码检查
npm run lint
```

## 配置说明

### API 配置

在 `miniprogram/api/config.ts` 中配置 API 相关信息：

```typescript
export const config = {
  baseURL: 'https://api.example.com',
  timeout: 10000,
  tokenKey: 'access_token'
};
```

### 主题配置

在 `miniprogram/styles/theme.wxss` 中自定义主题变量：

```css
page {
  --color-primary: #1989fa;
  --text-primary: #323233;
  /* 更多变量... */
}
```

## 常见问题

### 1. 如何添加新的 API 接口？

在 `miniprogram/api/modules/` 目录下创建或编辑对应的模块文件，然后在 `index.ts` 中导出。

### 2. 如何使用全局样式？

在页面的 wxss 文件中导入：

```css
@import '../../styles/common.wxss';
```

### 3. 如何处理请求错误？

请求封装已经统一处理了常见错误，特殊情况可以在业务代码中 catch：

```typescript
try {
  await api.someMethod();
} catch (error) {
  // 处理特定错误
}
```

## 贡献指南

1. Fork 本项目
2. 创建功能分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

请确保：
- 遵循项目代码规范
- 添加必要的注释
- 更新相关文档
- 测试通过

## 版本历史

### v1.0.0 (2024-01-01)
- 初始版本
- 基础项目结构
- API 请求封装
- 工具函数库
- 开发规范文档

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue 或联系项目维护者。
