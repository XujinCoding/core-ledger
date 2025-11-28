/**
 * 地址选择器组件
 * @description 支持省市区镇村5级懒加载选择
 * @example
 * <address-picker 
 *   visible="{{showAddressPicker}}"
 *   addressId="{{form.addressId}}"
 *   bind:confirm="handleAddressConfirm"
 *   bind:close="handleAddressClose"
 * />
 */

import { addressApi } from '../../api/modules/index';
import type { AddressVO } from '../../types';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /** 是否显示选择器 */
    visible: {
      type: Boolean,
      value: false
    },
    /** 初始地址ID（编辑时传入） */
    addressId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    /** 当前层级的地址列表 */
    currentList: [] as AddressVO[],
    /** 已选择的地址路径 */
    selectedPath: [] as AddressVO[],
    /** 当前选中的地址ID */
    selectedId: 0,
    /** 加载状态 */
    loading: false,
    /** 是否可以确认（必须选择到镇/村级，level >= 4） */
    canConfirm: false
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached() {
      // 组件实例被加载
    }
  },

  /**
   * 监听属性变化
   */
  observers: {
    'visible': function(visible: boolean) {
      if (visible) {
        this.initPicker();
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 初始化选择器
     */
    async initPicker(): Promise<void> {
      const addressId = this.properties.addressId;
      
      if (addressId && addressId > 0) {
        // 编辑模式：加载地址链
        await this.loadAddressChain(addressId);
      } else {
        // 新增模式：加载省份列表
        await this.loadAddressList({ level: 1 });
      }
    },

    /**
     * 加载地址列表（懒加载）
     */
    async loadAddressList(params: { parentId?: number; level?: number }): Promise<void> {
      try {
        this.setData({ loading: true });
        
        const list = await addressApi.getList(params);
        
        this.setData({
          currentList: list,
          loading: false
        });
      } catch (error) {
        console.error('加载地址列表失败', error);
        wx.showToast({ title: '加载失败', icon: 'none' });
        this.setData({ loading: false });
      }
    },

    /**
     * 加载地址链（编辑时使用）
     */
    async loadAddressChain(addressId: number): Promise<void> {
      try {
        this.setData({ loading: true });
        
        const chain = await addressApi.getChain(addressId);
        
        // 重建地址路径
        const path: AddressVO[] = [];
        for (let i = 0; i < chain.addressIds.length; i++) {
          path.push({
            id: chain.addressIds[i],
            name: chain.addressNames[i],
            level: chain.addressLevels[i],
            parentId: i > 0 ? chain.addressIds[i - 1] : 0,
            levelDesc: '',
            mergerName: '',
            isTopLevel: i === 0,
            isVillageLevel: chain.addressLevels[i] >= 4
          });
        }
        
        const lastAddress = path[path.length - 1];
        
        this.setData({
          selectedPath: path,
          selectedId: lastAddress.id,
          canConfirm: lastAddress.level >= 3
        });
        
        // 加载同级地址列表（用于切换）
        if (path.length > 1) {
          const parentId = path[path.length - 2].id;
          await this.loadAddressList({ parentId });
        } else {
          await this.loadAddressList({ level: lastAddress.level });
        }
        
      } catch (error) {
        console.error('加载地址链失败', error);
        wx.showToast({ title: '加载失败', icon: 'none' });
        // 失败时加载省份列表
        await this.loadAddressList({ level: 1 });
      }
    },

    /**
     * 选择地址
     */
    async handleSelectAddress(e: WechatMiniprogram.TouchEvent): Promise<void> {
      const address: AddressVO = e.currentTarget.dataset.address;
      
      // 更新选择路径
      const newPath = [...this.data.selectedPath];
      
      // 如果当前层级已有选择，替换它
      const existingIndex = newPath.findIndex(p => p.level === address.level);
      if (existingIndex >= 0) {
        newPath[existingIndex] = address;
        newPath.splice(existingIndex + 1);  // 删除后续选择
      } else {
        newPath.push(address);
      }
      
      this.setData({
        selectedPath: newPath,
        selectedId: address.id,
        canConfirm: address.level >= 3  // 区县级及以上可确认
      });
      
      // 如果还不是村级，加载下一级
      if (address.level < 5) {
        await this.loadAddressList({ parentId: address.id });
      }
    },

    /**
     * 点击面包屑导航
     */
    async handleBreadcrumbClick(e: WechatMiniprogram.TouchEvent): Promise<void> {
      const index: number = e.currentTarget.dataset.index;
      const path = this.data.selectedPath;
      
      if (index === path.length - 1) {
        // 点击的是当前层级，不处理
        return;
      }
      
      // 截取到点击的层级
      const newPath = path.slice(0, index + 1);
      const selectedAddress = newPath[newPath.length - 1];
      
      this.setData({
        selectedPath: newPath,
        selectedId: selectedAddress.id,
        canConfirm: selectedAddress.level >= 4
      });
      
      // 加载下一级列表
      await this.loadAddressList({ parentId: selectedAddress.id });
    },

    /**
     * 确认选择
     */
    handleConfirm(): void {
      if (!this.data.canConfirm) {
        wx.showToast({ 
          title: '请至少选择到区县级', 
          icon: 'none' 
        });
        return;
      }
      
      const selectedPath = this.data.selectedPath;
      const selectedAddress = selectedPath[selectedPath.length - 1];
      
      // 构建完整地址路径
      const addressPath = selectedPath.map(a => a.name).join('');
      
      this.triggerEvent('confirm', {
        addressId: selectedAddress.id,
        addressPath: addressPath,
        address: selectedAddress,
        fullPath: selectedPath
      });
      
      this.handleClose();
    },

    /**
     * 关闭选择器
     */
    handleClose(): void {
      this.setData({
        currentList: [],
        selectedPath: [],
        selectedId: 0,
        canConfirm: false
      });
      
      this.triggerEvent('close');
    }
  }
});
