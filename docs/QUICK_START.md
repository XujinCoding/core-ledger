# 快速开始指南

本指南帮助你快速了解项目结构和开发流程。

## 📁 核心目录说明

```
miniprogram/
├── api/              # 后台接口请求统一放这里
├── pages/            # 页面文件（每个页面一个文件夹）
├── components/       # 公共组件
├── utils/            # 工具函数（storage、validate等）
├── constants/        # 常量定义（避免魔法数字）
├── types/            # TypeScript 类型定义
└── styles/           # 全局样式（theme、common、reset）
```

## 🚀 开发新功能的标准流程

### 1. 创建新页面

```bash
# 在 miniprogram/pages/ 下创建页面文件夹
# 包含 4 个文件：.ts .wxml .wxss .json
pages/
  └── user-profile/
      ├── user-profile.ts
      ├── user-profile.wxml
      ├── user-profile.wxss
      └── user-profile.json
```

### 2. 添加 API 接口

在 `miniprogram/api/modules/` 下创建或编辑模块文件：

```typescript
// miniprogram/api/modules/user.ts
export const userApi = {
  getInfo(): Promise<UserInfo> {
    return get<UserInfo>('/user/info');
  },

  updateInfo(data: Partial<UserInfo>): Promise<UserInfo> {
    return put<UserInfo>('/user/info', data);
  }
};
```

### 3. 在页面中使用 API

```typescript
// pages/user-profile/user-profile.ts
import { userApi } from '../../api/modules';

Page({
  data: {
    userInfo: {} as UserInfo
  },

  async onLoad() {
    try {
      const userInfo = await userApi.getInfo();
      this.setData({ userInfo });
    } catch (error) {
      // 错误已被统一处理
    }
  }
});
```

## 📝 代码规范速查

### 命名规范

```typescript
// ✅ 好的命名
const userInfo = { name: 'John' };           // 变量：camelCase
const MAX_COUNT = 100;                       // 常量：UPPER_SNAKE_CASE
interface UserInfo { }                       // 接口：PascalCase
function getUserInfo() { }                   // 函数：camelCase

// ❌ 避免的命名
const UserInfo = { };                        // 变量不用 PascalCase
const max_count = 100;                       // 常量不用 snake_case
const a = { };                               // 避免无意义命名
```

### 页面结构

```typescript
Page({
  data: {
    // 数据定义，添加类型注解
    list: [] as Item[]
  },

  onLoad(options: { id?: string }) {
    // 生命周期
  },

  // 自定义方法
  async loadData() {
    // 业务逻辑
  },

  // 事件处理
  handleClick() {
    // 处理点击
  }
});
```

### 样式规范

```less
// 使用 BEM 命名
.user-card {
  &__header { }
  &__content { }
  &__footer { }
  &--active { }
}

// 使用 CSS 变量
.button {
  color: var(--color-primary);
  padding: var(--spacing-md);
}
```

## 🛠 常用工具函数

### 本地存储

```typescript
import { storage } from '@/utils/storage';

// 存储
storage.set('token', 'xxx');

// 读取
const token = storage.get('token');

// 删除
storage.remove('token');
```

### 数据验证

```typescript
import { isValidPhone, isValidEmail } from '@/utils/validate';

if (!isValidPhone(phone)) {
  wx.showToast({ title: '手机号格式错误', icon: 'none' });
  return;
}
```

### 日期格式化

```typescript
import { formatTime } from '@/utils/util';

const timeStr = formatTime(new Date()); // "2024/01/01 12:00:00"
```

## 🎨 使用全局样式

```wxml
<!-- Flex 布局 -->
<view class="flex-between p-lg">
  <text>左侧</text>
  <text>右侧</text>
</view>

<!-- 文字样式 -->
<text class="text-primary text-lg">主要文字</text>
<text class="text-gray text-sm">次要文字</text>

<!-- 间距 -->
<view class="m-lg p-md">内容</view>

<!-- 文字省略 -->
<text class="ellipsis">单行溢出省略</text>
<text class="ellipsis-2">两行溢出省略</text>
```

## 🔄 Git 工作流速查

### 开发新功能

```bash
# 1. 创建功能分支
git checkout -b feature/user-profile

# 2. 开发并提交
git add .
git commit -m "feat(pages): 添加用户资料页面"

# 3. 推送
git push origin feature/user-profile

# 4. 创建 Pull Request（在 GitHub/GitLab 上）
```

### Commit 消息规范

```bash
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
perf: 性能优化
test: 测试相关
chore: 构建工具或辅助工具变动

# 示例
git commit -m "feat(api): 添加用户登录接口"
git commit -m "fix(pages): 修复列表页面加载问题"
git commit -m "docs: 更新 README 文档"
```

## 🐛 常见问题解决

### 1. API 请求失败

检查：
- `api/config.ts` 中的 baseURL 是否正确
- 是否有 token（登录状态）
- 网络是否正常
- 接口路径是否正确

### 2. 样式不生效

检查：
- 是否导入了全局样式
- CSS 变量是否正确使用
- 选择器优先级是否被覆盖

### 3. TypeScript 类型错误

检查：
- 是否定义了对应的类型
- 类型导入路径是否正确
- 是否使用了正确的类型注解

### 4. 页面不显示

检查：
- `app.json` 中是否注册了页面
- 页面路径是否正确
- 页面文件是否完整（4个文件）

## 📚 进阶阅读

完成快速开始后，建议阅读：

1. [项目结构详细说明](./PROJECT_STRUCTURE.md)
2. [完整代码规范](./CODE_STYLE.md)
3. [API 使用指南](./API_GUIDE.md)
4. [Git 工作流详解](./GIT_WORKFLOW.md)

## 💡 开发技巧

### 1. 使用 VSCode 代码片段

创建常用代码模板，提高开发效率

### 2. 利用微信开发者工具的调试功能

- Console 查看日志
- Network 查看网络请求
- Storage 查看本地存储
- AppData 查看页面数据

### 3. 合理使用组件化

重复使用的 UI 抽取为组件，提高复用性

### 4. 性能优化注意事项

- 减少 setData 调用频率
- 避免传输大数据
- 使用图片懒加载
- 合理使用分包

## 🔗 相关链接

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Less 官方文档](https://less.bootcss.com/)

---

如有疑问，请查看详细文档或联系团队成员。
