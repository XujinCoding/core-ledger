/**
 * 商品卡片组件
 * @description 展示商品列表项信息
 * @example
 * <product-card 
 *   item="{{product}}"
 *   bind:click="handleItemClick"
 *   bind:action="handleAction"
 * />
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 商品数据
    item: {
      type: Object,
      value: {}
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
     * 点击卡片
     */
    handleClick(): void {
      this.triggerEvent('click', { 
        id: this.properties.item.id,
        item: this.properties.item
      });
    },

    /**
     * 点击操作按钮
     * 使用catchtap自动阻止事件冒泡
     */
    handleAction(): void {
      this.triggerEvent('action', { 
        item: this.properties.item 
      });
    }
  }
});
