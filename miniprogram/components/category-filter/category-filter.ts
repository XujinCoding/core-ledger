/**
 * 分类筛选组件
 * @description 支持树形结构的分类选择筛选（可展开/收起）
 * @example
 * <category-filter 
 *   show="{{showFilter}}"
 *   categories="{{categories}}"
 *   selectedId="{{selectedCategoryId}}"
 *   bind:confirm="handleFilterConfirm"
 *   bind:close="handleFilterClose"
 * />
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    show: {
      type: Boolean,
      value: false
    },
    // 分类树数据
    categories: {
      type: Array,
      value: []
    },
    // 当前选中的分类ID
    selectedId: {
      type: Number,
      value: undefined
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tempSelectedId: null as number | null,
    tempSelectedName: '',
    treeCategories: [] as any[]
  },

  /**
   * 监听属性变化
   */
  observers: {
    'show': function(show: boolean) {
      if (show) {
        // 打开时，初始化临时选中状态和树形数据
        const selectedId = this.properties.selectedId === undefined ? null : this.properties.selectedId;
        this.setData({
          tempSelectedId: selectedId,
          tempSelectedName: this.getSelectedCategoryName(selectedId),
          treeCategories: this.initTreeCategories()
        });
      }
    },
    'categories': function() {
      // 分类数据变化时，重新初始化树形数据
      if (this.properties.show) {
        this.setData({
          treeCategories: this.initTreeCategories()
        });
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 初始化树形分类数据（添加expanded属性）
     */
    initTreeCategories(): any[] {
      const categories = this.properties.categories as any[];
      
      const addExpandedProp = (items: any[]): any[] => {
        return items.map(item => ({
          ...item,
          expanded: false,
          children: item.children ? addExpandedProp(item.children) : []
        }));
      };
      
      return addExpandedProp(categories);
    },

    /**
     * 切换展开/收起
     */
    handleToggleExpand(event: WechatMiniprogram.TouchEvent): void {
      const { id } = event.currentTarget.dataset;
      const categoryId = Number(id);
      
      // 递归更新展开状态
      const updateExpanded = (items: any[]): any[] => {
        return items.map(item => {
          if (item.id === categoryId) {
            return { ...item, expanded: !item.expanded };
          }
          if (item.children && item.children.length > 0) {
            return { ...item, children: updateExpanded(item.children) };
          }
          return item;
        });
      };
      
      this.setData({
        treeCategories: updateExpanded(this.data.treeCategories)
      });
    },

    /**
     * 选择分类
     */
    handleSelectCategory(event: WechatMiniprogram.TouchEvent): void {
      const { id, name } = event.currentTarget.dataset;
      // id 可能是 null 或 number
      this.setData({
        tempSelectedId: id === null || id === undefined ? null : Number(id),
        tempSelectedName: name || '全部分类'
      });
    },

    /**
     * 重置选择
     */
    handleReset(): void {
      this.setData({
        tempSelectedId: null,
        tempSelectedName: '全部分类'
      });
    },

    /**
     * 确认选择
     */
    handleConfirm(): void {
      this.triggerEvent('confirm', {
        categoryId: this.data.tempSelectedId,
        categoryName: this.data.tempSelectedName
      });
      this.handleClose();
    },

    /**
     * 关闭面板
     */
    handleClose(): void {
      this.triggerEvent('close');
    },

    /**
     * 获取选中分类名称
     */
    getSelectedCategoryName(id: number | null): string {
      if (!id) return '全部分类';
      
      const categories = this.properties.categories as any[];
      const findName = (list: any[]): string => {
        for (const item of list) {
          if (item.id === id) return item.name;
          if (item.children && item.children.length > 0) {
            const childName = findName(item.children);
            if (childName) return childName;
          }
        }
        return '';
      };
      
      return findName(categories) || '未知分类';
    }
  }
});
