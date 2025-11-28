# 浮动操作按钮组件（FAB）

## 组件说明

圆形浮动按钮，固定在页面右下角，用于主要操作入口（如新增）。

## 使用方法

```xml
<floating-action-button 
  icon="/images/add.png"
  bind:click="handleAdd"
/>
```

或使用文字：

```xml
<floating-action-button 
  text="+"
  color="#07C160"
  bind:click="handleAdd"
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| icon | String | '' | 按钮图标路径 |
| text | String | '+' | 按钮文字（当没有icon时显示） |
| color | String | '#07C160' | 按钮背景颜色 |

## 事件说明

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击按钮时触发 | 无 |

## 样式自定义

按钮默认固定在右下角，位置：`right: 30rpx; bottom: 100rpx;`

如需调整位置，可以在页面的wxss中覆盖：

```css
floating-action-button .fab-container {
  bottom: 200rpx;
}
```
