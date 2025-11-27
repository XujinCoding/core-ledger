/**
 * 分类树项组件（支持递归）
 */
import type { CategoryTreeVO } from '../../types';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 分类数据
    item: {
      type: Object as any,
      value: {} as CategoryTreeVO
    },
    // 层级（0表示顶层）
    level: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 切换展开/折叠
     */
    handleToggleExpand() {
      const item = this.data.item as CategoryTreeVO;
      // 触发自定义事件，向父组件传递
      this.triggerEvent('toggle', { 
        id: item.id,
        expanded: !item.expanded 
      });
    },

    /**
     * 处理操作按钮点击
     */
    handleAction() {
      const item = this.data.item as CategoryTreeVO;
      // 触发自定义事件，向父组件传递
      this.triggerEvent('action', { category: item });
    },

    /**
     * 处理子组件的toggle事件（向上冒泡）
     */
    onChildToggle(event: WechatMiniprogram.CustomEvent) {
      // 继续向上传递
      this.triggerEvent('toggle', event.detail);
    },

    /**
     * 处理子组件的action事件（向上冒泡）
     */
    onChildAction(event: WechatMiniprogram.CustomEvent) {
      // 继续向上传递
      this.triggerEvent('action', event.detail);
    }
  }
});
