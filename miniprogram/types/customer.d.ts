/**
 * 客户模块类型定义
 */

/**
 * 客户类型枚举
 */
export enum CustomerType {
  POTENTIAL = 0,  // 潜在客户
  ACTIVE = 1      // 活跃客户
}

/**
 * 性别枚举
 */
export enum Gender {
  UNKNOWN = 0,  // 未知
  MALE = 1,     // 男
  FEMALE = 2    // 女
}

/**
 * 账单统计信息
 */
export interface LedgerSummary {
  inProgressCount: number;      // 进行中账单数
  inProgressAmount: number;     // 进行中金额
  partialCount: number;         // 部分缴费账单数
  partialAmount: number;        // 部分缴费剩余金额
  partialPaidAmount: number;    // 部分缴费已付金额
  creditCount: number;          // 赊账账单数
  creditAmount: number;         // 赊账金额
  clearedCount: number;         // 已结清账单数
  totalDebt: number;            // 总欠款（进行中+部分缴费）
  totalCredit: number;          // 总赊账
}

/**
 * 客户详情
 */
export interface Customer {
  id: number;
  name: string;
  phone: string;
  gender: Gender;
  genderDesc: string;
  addressId?: number;
  fullAddress?: string;
  addressDetail?: string;
  customerType: CustomerType;
  customerTypeDesc: string;
  memo?: string;
  ledgerSummary: LedgerSummary;
  createInstant: string;
  modifyInstant: string;
}

/**
 * 客户列表项（简化版，包含欠款统计）
 */
export interface CustomerListItem {
  id: number;
  name: string;
  phone: string;
  gender: Gender;
  genderDesc: string;
  addressId?: number;
  fullAddress?: string;
  addressDetail?: string;
  customerType: CustomerType;
  customerTypeDesc: string;
  debtAmount: number;           // 欠款总额
  creditAmount: number;         // 赊账总额
  activeLedgerCount: number;    // 活跃账单数
  createInstant: string;
}

/**
 * 创建客户请求
 */
export interface CreateCustomerRequest {
  name: string;
  phone: string;
  gender: Gender;
  addressId?: number;
  addressDetail?: string;
  memo?: string;
}

/**
 * 更新客户请求
 */
export interface UpdateCustomerRequest {
  name?: string;
  phone?: string;
  gender?: Gender;
  addressId?: number;
  addressDetail?: string;
  memo?: string;
}
