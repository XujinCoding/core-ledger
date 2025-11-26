/**
 * 账单模块 API
 */

import { get, post, put, del } from '../../utils/requestUtil';
import type {
  Ledger,
  LedgerListItem,
  CreateLedgerRequest,
  UpdateLedgerItemsRequest,
  ReceivePaymentRequest,
  DiscountSettleRequest,
  PageResponse,
  PaginationParams
} from '../../types';

/**
 * 账单 API
 */
export const ledgerApi = {
  /**
   * 查询账单列表
   */
  getLedgerList(params: Partial<PaginationParams> & {
    customerId?: number;
    ledgerStatus?: number;
  }): Promise<PageResponse<LedgerListItem>> {
    return get<PageResponse<LedgerListItem>>('/ledgers', params);
  },

  /**
   * 查询账单详情
   */
  getLedgerDetail(id: number): Promise<Ledger> {
    return get<Ledger>(`/ledgers/${id}`);
  },

  /**
   * 创建账单
   */
  createLedger(data: CreateLedgerRequest): Promise<Ledger> {
    return post<Ledger>('/ledgers', data, { showLoading: true, loadingText: '创建中...' });
  },

  /**
   * 修改账单明细
   */
  updateLedgerItems(id: number, data: UpdateLedgerItemsRequest): Promise<Ledger> {
    return put<Ledger>(`/ledgers/${id}/items`, data, { showLoading: true, loadingText: '修改中...' });
  },

  /**
   * 收款
   */
  receivePayment(id: number, data: ReceivePaymentRequest): Promise<Ledger> {
    return post<Ledger>(`/ledgers/${id}/receive-payment`, data, { showLoading: true, loadingText: '收款中...' });
  },

  /**
   * 优惠结清
   */
  discountSettle(id: number, data: DiscountSettleRequest): Promise<Ledger> {
    return post<Ledger>(`/ledgers/${id}/discount-settle`, data, { showLoading: true, loadingText: '结清中...' });
  },

  /**
   * 赊账
   */
  setOnCredit(id: number): Promise<Ledger> {
    return post<Ledger>(`/ledgers/${id}/on-credit`, {}, { showLoading: true, loadingText: '处理中...' });
  },

  /**
   * 关闭账单
   */
  closeLedger(id: number): Promise<Ledger> {
    return post<Ledger>(`/ledgers/${id}/close`, {}, { showLoading: true, loadingText: '关闭中...' });
  },

  /**
   * 删除账单
   */
  deleteLedger(id: number): Promise<void> {
    return del<void>(`/ledgers/${id}`, undefined, { showLoading: true, loadingText: '删除中...' });
  }
};
