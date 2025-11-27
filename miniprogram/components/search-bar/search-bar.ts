/**
 * 搜索框组件
 * @description 带防抖功能的搜索输入框
 * @example
 * <search-bar 
 *   placeholder="搜索商品名称..."
 *   bind:search="handleSearch"
 * />
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 占位文本
    placeholder: {
      type: String,
      value: '请输入关键词'
    },
    // 防抖延迟（毫秒）
    debounceTime: {
      type: Number,
      value: 300
    },
    // 是否显示搜索图标
    showIcon: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    keyword: '',
    searchTimer: null as number | null
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    /**
     * 组件实例被从页面节点树移除时执行
     */
    detached(): void {
      // 清理定时器
      if (this.data.searchTimer) {
        clearTimeout(this.data.searchTimer);
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 输入框变化
     */
    handleInput(event: WechatMiniprogram.Input): void {
      const keyword = event.detail.value;
      this.setData({ keyword });

      // 清除之前的定时器
      if (this.data.searchTimer) {
        clearTimeout(this.data.searchTimer);
      }

      // 设置新的防抖定时器
      const timer = setTimeout(() => {
        this.triggerSearch(keyword);
      }, this.properties.debounceTime) as unknown as number;

      this.setData({ searchTimer: timer });
    },

    /**
     * 确认搜索（按回车）
     */
    handleConfirm(): void {
      // 清除定时器，立即执行搜索
      if (this.data.searchTimer) {
        clearTimeout(this.data.searchTimer);
        this.setData({ searchTimer: null });
      }
      this.triggerSearch(this.data.keyword);
    },

    /**
     * 触发搜索事件
     */
    triggerSearch(keyword: string): void {
      this.triggerEvent('search', { keyword });
    },

    /**
     * 清空搜索
     */
    handleClear(): void {
      this.setData({ keyword: '' });
      this.triggerSearch('');
    }
  }
});
