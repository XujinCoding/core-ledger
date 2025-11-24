# 项目目录结构规范

## 整体结构

```
core-ledger/
├── miniprogram/                # 小程序源代码目录
│   ├── api/                    # API 接口管理
│   │   ├── request.ts         # 请求封装
│   │   ├── config.ts          # API 配置（域名、超时等）
│   │   └── modules/           # API 模块
│   │       ├── user.ts        # 用户相关接口
│   │       ├── ledger.ts      # 账本相关接口
│   │       └── index.ts       # 统一导出
│   │
│   ├── components/            # 公共组件
│   │   ├── navigation-bar/   # 自定义导航栏
│   │   ├── common-button/    # 公共按钮组件
│   │   └── ...               # 其他公共组件
│   │
│   ├── pages/                # 页面目录
│   │   ├── index/           # 首页
│   │   │   ├── index.ts
│   │   │   ├── index.wxml
│   │   │   ├── index.wxss
│   │   │   └── index.json
│   │   ├── logs/            # 日志页
│   │   └── ...              # 其他页面
│   │
│   ├── subPackages/         # 分包目录
│   │   ├── user/           # 用户模块分包
│   │   └── ...             # 其他分包
│   │
│   ├── utils/              # 工具函数
│   │   ├── util.ts        # 通用工具函数
│   │   ├── storage.ts     # 本地存储封装
│   │   ├── validate.ts    # 数据验证工具
│   │   └── date.ts        # 日期处理工具
│   │
│   ├── store/             # 状态管理（如需要）
│   │   ├── index.ts      # 全局状态
│   │   └── modules/      # 模块化状态
│   │
│   ├── constants/         # 常量定义
│   │   ├── index.ts      # 通用常量
│   │   └── enums.ts      # 枚举定义
│   │
│   ├── types/            # TypeScript 类型定义
│   │   ├── api.d.ts     # API 相关类型
│   │   ├── common.d.ts  # 通用类型
│   │   └── index.d.ts   # 类型统一导出
│   │
│   ├── styles/          # 全局样式
│   │   ├── common.wxss  # 公共样式
│   │   ├── theme.wxss   # 主题变量
│   │   └── reset.wxss   # 样式重置
│   │
│   ├── images/          # 图片资源
│   │   ├── common/     # 公共图片
│   │   └── icons/      # 图标
│   │
│   ├── app.ts          # 小程序入口文件
│   ├── app.json        # 小程序配置
│   ├── app.wxss        # 全局样式
│   └── sitemap.json    # 搜索配置
│
├── docs/                # 项目文档
│   ├── PROJECT_STRUCTURE.md  # 项目结构说明
│   ├── CODE_STYLE.md         # 代码规范
│   ├── API_GUIDE.md          # API 使用指南
│   └── GIT_WORKFLOW.md       # Git 工作流
│
├── typings/             # 全局类型声明
├── project.config.json  # 项目配置文件
├── project.private.config.json  # 私有配置
├── tsconfig.json       # TypeScript 配置
├── package.json        # 依赖配置
└── README.md           # 项目说明

```

## 目录说明

### 1. api/ - API 接口管理
- **request.ts**: 封装 wx.request，统一处理请求和响应
- **config.ts**: 配置 API 基础信息（域名、超时时间、token 等）
- **modules/**: 按业务模块划分的 API 接口
  - 每个模块文件导出该模块的所有接口方法
  - 通过 index.ts 统一导出所有 API

### 2. components/ - 公共组件
- 每个组件独立一个文件夹
- 组件命名使用 kebab-case（短横线连接）
- 每个组件包含：.ts、.wxml、.wxss、.json 四个文件

### 3. pages/ - 页面目录
- 每个页面独立一个文件夹
- 页面命名使用 kebab-case
- 页面特定的组件可以放在页面目录下的 components/ 子目录

### 4. subPackages/ - 分包目录
- 按业务模块划分分包
- 分包结构与主包保持一致
- 独立分包使用场景：不依赖主包的功能模块

### 5. utils/ - 工具函数
- **util.ts**: 通用工具函数（格式化、深拷贝等）
- **storage.ts**: 本地存储的封装
- **validate.ts**: 数据验证相关
- **date.ts**: 日期处理相关
- 每个工具文件功能单一，便于维护

### 6. store/ - 状态管理
- 用于管理全局共享状态
- 可使用 MobX、Redux 等状态管理库
- 简单项目可直接使用 globalData

### 7. constants/ - 常量定义
- 存放项目中的常量定义
- 枚举值、配置项等
- 避免魔法数字和字符串

### 8. types/ - 类型定义
- 存放 TypeScript 类型定义
- 按模块划分类型文件
- 接口、类型别名、枚举等

### 9. styles/ - 全局样式
- **common.wxss**: 公共样式类
- **theme.wxss**: 主题变量（颜色、字体等）
- **reset.wxss**: 样式重置

### 10. images/ - 图片资源
- 按用途分类存放
- 使用有意义的命名
- 考虑使用 CDN 存储大图

## 命名规范

### 文件命名
- 页面/组件：kebab-case（如：user-info）
- TypeScript 文件：camelCase（如：userApi.ts）
- 类型定义文件：camelCase.d.ts（如：user.d.ts）

### 代码命名
- 变量/函数：camelCase（如：getUserInfo）
- 常量：UPPER_SNAKE_CASE（如：API_BASE_URL）
- 类/接口：PascalCase（如：UserInfo）
- 私有变量：_camelCase（如：_privateData）

## 最佳实践

1. **模块化开发**：功能模块独立，降低耦合
2. **组件复用**：抽取公共组件，提高开发效率
3. **类型安全**：充分利用 TypeScript 类型系统
4. **按需加载**：使用分包优化首次加载速度
5. **代码规范**：统一代码风格，便于团队协作
6. **文档完善**：及时更新文档，降低维护成本
