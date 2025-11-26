/**
 * 账单模块类型定义
 */

/**
 * 账单状态枚举
 */
export enum LedgerStatus {
  IN_PROGRESS = 1,  // 进行中
  PARTIAL = 2,      // 部分缴费
  CLEARED = 3,      // 已结清
  ON_CREDIT = 4,    // 赊账中
  CLOSED = 5        // 已关闭
}

/**
 * 支付方式枚举
 */
export enum PaymentMethod {
  CASH = 1,           // 现金
  WECHAT = 2,         // 微信
  ALIPAY = 3,         // 支付宝
  BANK_TRANSFER = 4   // 银行转账
}

/**
 * 账单明细项
 */
export interface LedgerItem {
  id: number;
  skuId: number;
  skuName: string;
  attrValueMap: Record<string, string>;
  price: number;
  quantity: number;
  subtotal: number;
}

/**
 * 支付记录
 */
export interface PaymentRecord {
  id: number;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentMethodDesc: string;
  memo?: string;
  createInstant: string;
}

/**
 * 账单详情
 */
export interface Ledger {
  id: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  customerAddressDetail?: string;
  totalAmount: number;
  paidAmount: number;
  discountAmount: number;
  remainingAmount: number;
  ledgerStatus: LedgerStatus;
  ledgerStatusDesc: string;
  items: LedgerItem[];
  paymentRecords: PaymentRecord[];
  memo?: string;
  createInstant: string;
  modifyInstant: string;
  version: number;
}

/**
 * 账单列表项（简化版）
 */
export interface LedgerListItem {
  id: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  ledgerStatus: LedgerStatus;
  ledgerStatusDesc: string;
  createInstant: string;
}

/**
 * 创建账单请求
 */
export interface CreateLedgerRequest {
  customerId: number;
  items: {
    skuId: number;
    productId: number;
    productName: string;
    skuName: string;
    attrValueMap: Record<string, string>;
    price: number;
    quantity: number;
  }[];
  memo?: string;
}

/**
 * 修改账单明细请求
 */
export interface UpdateLedgerItemsRequest {
  addItems?: {
    skuId: number;
    productId: number;
    productName: string;
    skuName: string;
    attrValueMap: Record<string, string>;
    price: number;
    quantity: number;
  }[];
  updateItems?: {
    id: number;
    price: number;
    quantity: number;
  }[];
  deleteItemIds?: number[];
}

/**
 * 收款请求
 */
export interface ReceivePaymentRequest {
  amount: number;
  paymentMethod: PaymentMethod;
  memo?: string;
}

/**
 * 优惠结清请求
 */
export interface DiscountSettleRequest {
  discountAmount: number;
  memo?: string;
}
