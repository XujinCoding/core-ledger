/**
 * 商品管理页面
 * Phase 1: 基础功能 - 商品分类管理 + 商品列表管理
 */

import { productApi, categoryApi } from '../../api/modules/index';
import type { ProductListItem, CategoryTreeVO } from '../../types';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // Tab切换
    activeTab: 0, // 0-商品列表, 1-商品分类
    
    // 商品分类数据
    categories: [] as CategoryTreeVO[],
    categoryLoading: false,
    
    // 商品列表数据
    products: [] as ProductListItem[],
    loading: false,
    hasMore: true,
    page: 0,
    size: 20,
    keyword: '',
    selectedCategoryId: undefined as number | undefined,
    selectedCategoryName: '',
    selectedStatus: undefined as string | undefined,
    
    // 筛选面板
    showFilter: false,
    
    // 修改分类选择器
    showChangeCategoryFilter: false,
    changingProduct: null as ProductListItem | null
  },

  // 防抖定时器
  searchTimer: null as number | null,
  // 页面加载标记
  isFirstLoad: true,

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload(): void {
    // 清理定时器
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
      this.searchTimer = null;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(): void {
    // 标记为首次加载
    this.isFirstLoad = true;
    
    // 根据activeTab加载对应数据
    if (this.data.activeTab === 0) {
      this.loadProducts();
    } else {
      this.loadCategories();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(): void {
    // 首次加载时不刷新（已在onLoad中加载）
    if (this.isFirstLoad) {
      this.isFirstLoad = false;
      return;
    }
    
    // 从其他页面返回时，根据当前Tab刷新数据
    // 确保从表单页返回后能看到最新数据
    if (this.data.activeTab === 0) {
      // 商品列表Tab - 刷新列表
      if (this.data.products.length > 0) {
        this.refreshProducts();
      }
    } else if (this.data.activeTab === 1) {
      // 分类Tab - 始终刷新
      this.loadCategories();
    }
  },

  /**
   * Tab切换
   */
  handleTabChange(event: WechatMiniprogram.TouchEvent): void {
    const { index } = event.currentTarget.dataset;
    const newIndex = Number(index);
    const currentIndex = this.data.activeTab;
    
    // 如果点击的是当前Tab，不做处理
    if (newIndex === currentIndex) {
      return;
    }
    
    this.setData({ activeTab: newIndex });
    
    // 切换后加载对应数据
    if (newIndex === 0) {
      // 切换到商品列表Tab
      // 确保分类数据已加载（筛选需要）
      if (this.data.categories.length === 0) {
        this.loadCategories();
      }
      if (this.data.products.length === 0) {
        this.loadProducts();
      }
    } else if (newIndex === 1) {
      // 切换到分类Tab
      if (this.data.categories.length === 0) {
        this.loadCategories();
      }
    }
  },

  /**
   * 加载商品分类树
   */
  loadCategories(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.setData({ categoryLoading: true });
        
        const categories = await categoryApi.getCategoryTree();
        // 为每个节点添加 expanded 属性，默认展开第一层
        const categoriesWithExpanded = this.addExpandedProperty(categories, true);
        this.setData({ categories: categoriesWithExpanded });
        resolve();
      } catch (error) {
        console.error('加载分类失败', error);
        wx.showToast({
          title: '加载分类失败',
          icon: 'none'
        });
        reject(error);
      } finally {
        this.setData({ categoryLoading: false });
      }
    });
  },

  /**
   * 为分类树添加 expanded 属性
   */
  addExpandedProperty(categories: CategoryTreeVO[], defaultExpanded = false): CategoryTreeVO[] {
    return categories.map(category => ({
      ...category,
      expanded: defaultExpanded,
      children: category.children ? this.addExpandedProperty(category.children, false) : []
    }));
  },

  /**
   * 处理分类展开/折叠（来自组件事件）
   */
  handleCategoryToggle(event: WechatMiniprogram.CustomEvent): void {
    const { id } = event.detail;
    const categories = this.toggleCategoryExpanded(this.data.categories, id);
    this.setData({ categories });
  },

  /**
   * 递归切换分类展开状态
   */
  toggleCategoryExpanded(categories: CategoryTreeVO[], targetId: number): CategoryTreeVO[] {
    return categories.map(category => {
      if (category.id === targetId) {
        return { ...category, expanded: !category.expanded };
      }
      if (category.children && category.children.length > 0) {
        return {
          ...category,
          children: this.toggleCategoryExpanded(category.children, targetId)
        };
      }
      return category;
    });
  },

  /**
   * 加载商品列表
   */
  async loadProducts(): Promise<void> {
    if (this.data.loading || !this.data.hasMore) return;

    try {
      this.setData({ loading: true });

      // 构建查询参数，过滤掉undefined值
      const params: any = {
        page: this.data.page,
        size: this.data.size,
        sort: 'createInstant,desc'
      };

      // 只有在有值时才添加可选参数
      if (this.data.keyword && this.data.keyword.trim()) {
        params.keyword = this.data.keyword.trim();
      }
      if (this.data.selectedCategoryId) {
        params.categoryId = this.data.selectedCategoryId;
      }

      const response = await productApi.getProductList(params);

      // 处理数据：添加 skuCount 字段
      const processedContent = response.content.map(item => ({
        ...item,
        skuCount: item.skus?.length || 0
      }));

      const newProducts = [...this.data.products, ...processedContent];
      const hasMore = !response.last;

      this.setData({
        products: newProducts,
        hasMore,
        page: this.data.page + 1
      });
    } catch (error) {
      console.error('加载商品列表失败', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  /**
   * 刷新商品列表
   */
  async refreshProducts(): Promise<void> {
    try {
      this.setData({
        products: [],
        page: 0,
        hasMore: true
      });

      await this.loadProducts();
    } catch (error) {
      console.error('刷新商品列表失败', error);
    }
  },

  /**
   * 搜索商品（组件已实现防抖）
   */
  handleSearch(event: WechatMiniprogram.CustomEvent): void {
    const { keyword } = event.detail;
    this.setData({ keyword });
    this.refreshProducts();
  },

  /**
   * 下拉刷新
   */
  async onPullDownRefresh(): Promise<void> {
    await this.refreshProducts();
    wx.stopPullDownRefresh();
  },

  /**
   * 上拉加载更多
   */
  onReachBottom(): void {
    this.loadProducts();
  },

  /**
   * 点击列表项查看商品详情
   */
  handleItemClick(event: WechatMiniprogram.CustomEvent): void {
    const { id } = event.detail;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${id}`
    });
  },

  /**
   * 商品操作菜单
   */
  handleProductAction(event: WechatMiniprogram.CustomEvent): void {
    const { item: product } = event.detail;
    
    const itemList = [
      '查看详情',
      '编辑商品',
      '配置属性',
      '修改分类',
      '删除商品'
    ];

    wx.showActionSheet({
      itemList,
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            // 查看详情
            this.handleViewProductDetail(product);
            break;
          case 1:
            // 编辑商品
            this.handleEditProduct(product);
            break;
          case 2:
            // 配置属性
            this.handleConfigProductAttrs(product);
            break;
          case 3:
            // 修改分类
            this.handleChangeProductCategory(product);
            break;
          case 4:
            // 删除商品
            this.handleDeleteProduct(product);
            break;
        }
      }
    });
  },

  /**
   * 查看商品详情
   */
  handleViewProductDetail(product: ProductListItem): void {
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${product.id}`
    });
  },

  /**
   * 编辑商品
   */
  handleEditProduct(product: ProductListItem): void {
    wx.navigateTo({
      url: `/pages/product-form/product-form?mode=edit&id=${product.id}`
    });
  },

  /**
   * 配置商品属性
   */
  handleConfigProductAttrs(product: ProductListItem): void {
    wx.navigateTo({
      url: `/pages/product-attrs/product-attrs?id=${product.id}&name=${encodeURIComponent(product.name)}`
    });
  },

  /**
   * 修改商品分类
   */
  async handleChangeProductCategory(product: ProductListItem): Promise<void> {
    // 确保分类数据已加载
    if (this.data.categories.length === 0) {
      await this.loadCategories();
    }
    
    // 显示树形分类选择器
    this.setData({
      changingProduct: product,
      showChangeCategoryFilter: true
    });
  },

  /**
   * 修改分类确认
   */
  async handleChangeCategoryConfirm(event: WechatMiniprogram.CustomEvent): Promise<void> {
    const { categoryId } = event.detail;
    const product = this.data.changingProduct;
    
    if (!product) return;
    
    if (categoryId === product.categoryId) {
      wx.showToast({
        title: '分类未变更',
        icon: 'none'
      });
      this.setData({ showChangeCategoryFilter: false });
      return;
    }
    
    try {
      await productApi.updateProduct(product.id, {
        name: product.name,
        categoryId: categoryId,
        imageUrl: product.imageUrl,
        description: product.description,
        price: product.price,
        spec: product.spec,
        unit: product.unit,
        location: product.location,
        memo: product.memo
      });
      
      wx.showToast({
        title: '分类修改成功',
        icon: 'success'
      });
      
      this.setData({ showChangeCategoryFilter: false });
      
      // 重新加载商品列表
      this.refreshProducts();
    } catch (error) {
      console.error('修改分类失败', error);
    }
  },

  /**
   * 关闭修改分类选择器
   */
  handleChangeCategoryClose(): void {
    this.setData({ 
      showChangeCategoryFilter: false,
      changingProduct: null
    });
  },

  /**
   * 删除商品
   */
  async handleDeleteProduct(product: ProductListItem): Promise<void> {
    wx.showModal({
      title: '确认删除',
      content: `确定要删除商品"${product.name}"吗？删除后不可恢复！`,
      confirmColor: '#EE0A24',
      success: async (res) => {
        if (res.confirm) {
          try {
            await productApi.deleteProduct(product.id);
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            });
            // 重新加载商品列表
            this.refreshProducts();
          } catch (error) {
            console.error('删除商品失败', error);
          }
        }
      }
    });
  },

  /**
   * 搜索分类
   */
  handleCategorySearch(event: WechatMiniprogram.Input): void {
    const keyword = event.detail.value.trim();
    if (!keyword) {
      // 如果搜索关键词为空，重新加载分类树
      this.loadCategories();
      return;
    }
    // TODO: 实现分类搜索逻辑（过滤匹配的分类并自动展开）
    console.log('搜索分类:', keyword);
  },

  /**
   * 浮动按钮点击
   */
  handleFabClick(): void {
    if (this.data.activeTab === 0) {
      this.handleAddProduct();
    } else {
      this.handleAddCategory();
    }
  },

  /**
   * 新增顶级分类
   */
  handleAddCategory(): void {
    wx.navigateTo({
      url: '/pages/category-form/category-form?mode=create&parentId=0'
    });
  },

  /**
   * 显示筛选面板
   */
  handleShowFilter(): void {
    // 确保分类数据已加载
    if (this.data.categories.length === 0) {
      this.loadCategories().then(() => {
        this.setData({ showFilter: true });
      });
    } else {
      this.setData({ showFilter: true });
    }
  },

  /**
   * 筛选确认
   */
  handleFilterConfirm(event: WechatMiniprogram.CustomEvent): void {
    const { categoryId, categoryName } = event.detail;
    this.setData({
      selectedCategoryId: categoryId,
      selectedCategoryName: categoryName || '',
      showFilter: false
    });
    this.refreshProducts();
  },

  /**
   * 关闭筛选面板
   */
  handleFilterClose(): void {
    this.setData({ showFilter: false });
  },

  /**
   * 清除分类筛选
   */
  handleClearCategoryFilter(): void {
    this.setData({ 
      selectedCategoryId: undefined,
      selectedCategoryName: ''
    });
    this.refreshProducts();
  },

  /**
   * 清除状态筛选
   */
  handleClearStatusFilter(): void {
    this.setData({ selectedStatus: undefined });
    this.refreshProducts();
  },

  /**
   * 新增商品
   */
  handleAddProduct(): void {
    wx.navigateTo({
      url: '/pages/product-form/product-form?mode=create'
    });
  },

  /**
   * 分类操作菜单
   */
  handleCategoryAction(event: WechatMiniprogram.CustomEvent): void {
    const { category } = event.detail;
    
    const itemList = [
      '查看商品',
      '编辑分类',
      '新增子分类',
      '删除分类'
    ];

    wx.showActionSheet({
      itemList,
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            // 查看商品
            this.handleViewCategoryProducts(category);
            break;
          case 1:
            // 编辑分类
            this.handleEditCategory(category);
            break;
          case 2:
            // 新增子分类
            this.handleAddSubCategory(category);
            break;
          case 3:
            // 删除分类
            this.handleDeleteCategory(category);
            break;
        }
      }
    });
  },

  /**
   * 查看分类下的商品
   */
  handleViewCategoryProducts(category: CategoryTreeVO): void {
    // 切换到商品Tab
    this.setData({ activeTab: 0 });
    
    // 设置分类筛选
    this.setData({
      selectedCategoryId: category.id,
      selectedCategoryName: category.name
    });
    
    // 刷新商品列表
    this.refreshProducts();
    
    wx.showToast({
      title: `已筛选“${category.name}”`,
      icon: 'success',
      duration: 1500
    });
  },

  /**
   * 编辑分类
   */
  handleEditCategory(category: CategoryTreeVO): void {
    wx.navigateTo({
      url: `/pages/category-form/category-form?mode=edit&id=${category.id}`
    });
  },

  /**
   * 新增子分类
   */
  handleAddSubCategory(category: CategoryTreeVO): void {
    wx.navigateTo({
      url: `/pages/category-form/category-form?mode=create&parentId=${category.id}&parentName=${encodeURIComponent(category.name)}`
    });
  },

  /**
   * 删除分类
   */
  async handleDeleteCategory(category: CategoryTreeVO): Promise<void> {
    wx.showModal({
      title: '确认删除',
      content: `确定要删除分类"${category.name}"吗？删除后不可恢复！`,
      confirmColor: '#EE0A24',
      success: async (res) => {
        if (res.confirm) {
          try {
            await categoryApi.deleteCategory(category.id);
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            });
            // 重新加载分类列表
            this.loadCategories();
          } catch (error) {
            console.error('删除分类失败', error);
          }
        }
      }
    });
  }
});
