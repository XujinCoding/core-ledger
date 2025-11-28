/**
 * 地址模块 API
 */

import { get } from '../../utils/requestUtil';
import type { AddressVO, AddressQueryDTO, AddressChainVO } from '../../types';

/**
 * 地址 API
 */
export const addressApi = {
  /**
   * 查询地址列表（懒加载）
   * @param params 查询参数
   * @returns 地址列表
   */
  getList(params: AddressQueryDTO): Promise<AddressVO[]> {
    return get<AddressVO[]>('/addresses', params);
  },

  /**
   * 查询地址链（用于编辑时回显）
   * @param addressId 地址ID
   * @returns 地址链信息
   */
  getChain(addressId: number): Promise<AddressChainVO> {
    return get<AddressChainVO>(`/addresses/chain/${addressId}`);
  },

  /**
   * 获取地址详情
   * @param id 地址ID
   * @returns 地址详情
   */
  getDetail(id: number): Promise<AddressVO> {
    return get<AddressVO>(`/addresses/${id}`);
  }
};
