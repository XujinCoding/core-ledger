/**
 * 枚举类型定义
 */

/**
 * 用户性别
 */
export enum Gender {
  Unknown = 0,
  Male = 1,
  Female = 2
}

/**
 * 订单状态
 */
export enum OrderStatus {
  Pending = 0,
  Paid = 1,
  Shipped = 2,
  Completed = 3,
  Cancelled = 4
}

/**
 * 账本类型
 */
export enum LedgerType {
  Income = 'income',
  Expense = 'expense'
}

/**
 * 请求方法
 */
export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}
