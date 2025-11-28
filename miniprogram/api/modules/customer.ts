/**
 * 客户模块 API
 */

import { get, post, put, del } from '../../utils/requestUtil';
import type {
  Customer,
  CustomerListItem,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  UpdateCustomerAddressRequest,
  PageResponse,
  PaginationParams
} from '../../types';

/**
 * 客户 API
 */
export const customerApi = {
  /**
   * 查询客户列表
   */
  getCustomerList(params: Partial<PaginationParams> & {
    keyword?: string;
    addressId?: number;
    customerType?: number;
  }): Promise<PageResponse<CustomerListItem>> {
    return get<PageResponse<CustomerListItem>>('/customers', params);
  },

  /**
   * 查询客户详情
   */
  getCustomerDetail(id: number): Promise<Customer> {
    return get<Customer>(`/customers/${id}`);
  },

  /**
   * 创建客户
   */
  createCustomer(data: CreateCustomerRequest): Promise<Customer> {
    return post<Customer>('/customers', data, { showLoading: true, loadingText: '创建中...' });
  },

  /**
   * 更新客户信息
   */
  updateCustomer(id: number, data: UpdateCustomerRequest): Promise<Customer> {
    return put<Customer>(`/customers/${id}`, data, { showLoading: true, loadingText: '更新中...' });
  },

  /**
   * 更新客户地址
   */
  updateCustomerAddress(id: number, data: UpdateCustomerAddressRequest): Promise<Customer> {
    return put<Customer>(`/customers/${id}/address`, data, { showLoading: true, loadingText: '更新中...' });
  },

  /**
   * 删除客户
   */
  deleteCustomer(id: number): Promise<void> {
    return del<void>(`/customers/${id}`, undefined, { showLoading: true, loadingText: '删除中...' });
  }
};
