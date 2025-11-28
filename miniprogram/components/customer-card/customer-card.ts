/**
 * 客户卡片组件
 * @description 展示客户基本信息卡片
 * @example
 * <customer-card 
 *   customer="{{item}}"
 *   bind:click="handleCustomerClick"
 *   bind:action="handleCustomerAction"
 * />
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /** 客户信息 */
    customer: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击卡片
     */
    handleClick(): void {
      this.triggerEvent('click', { 
        customer: this.data.customer 
      });
    },

    /**
     * 点击操作菜单
     */
    handleAction(): void {
      this.triggerEvent('action', { 
        customer: this.data.customer 
      });
    }
  }
});
