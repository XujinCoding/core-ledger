/**
 * 空状态组件
 * @description 展示无数据时的提示信息和操作
 * @example
 * <empty-state 
 *   icon="📦"
 *   text="暂无商品"
 *   buttonText="新增商品"
 *   bind:action="handleAdd"
 * />
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 图标（emoji或图片路径）
    icon: {
      type: String,
      value: '📦'
    },
    // 提示文本
    text: {
      type: String,
      value: '暂无数据'
    },
    // 按钮文本（可选）
    buttonText: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击操作按钮
     */
    handleAction(): void {
      this.triggerEvent('action');
    }
  }
});
