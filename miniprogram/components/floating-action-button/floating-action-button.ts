/**
 * 浮动操作按钮（FAB）组件
 * @description 圆形按钮，固定在页面右下角
 * @example
 * <floating-action-button 
 *   icon="/images/add.png"
 *   bind:click="handleAdd"
 * />
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /** 按钮图标路径 */
    icon: {
      type: String,
      value: ''
    },
    
    /** 按钮文字（当没有icon时显示） */
    text: {
      type: String,
      value: '+'
    },
    
    /** 按钮颜色 */
    color: {
      type: String,
      value: '#07C160'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击按钮
     */
    handleClick(): void {
      this.triggerEvent('click');
    }
  }
});
