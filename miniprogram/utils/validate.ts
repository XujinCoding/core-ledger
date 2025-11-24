/**
 * 数据验证工具
 */

/**
 * 验证手机号
 */
export function isValidPhone(phone: string): boolean {
  const phoneReg = /^1[3-9]\d{9}$/;
  return phoneReg.test(phone);
}

/**
 * 验证邮箱
 */
export function isValidEmail(email: string): boolean {
  const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailReg.test(email);
}

/**
 * 验证身份证号
 */
export function isValidIdCard(idCard: string): boolean {
  const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return idCardReg.test(idCard);
}

/**
 * 验证密码强度（至少包含字母和数字，长度 6-20）
 */
export function isValidPassword(password: string): boolean {
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  return passwordReg.test(password);
}

/**
 * 验证 URL
 */
export function isValidUrl(url: string): boolean {
  const urlReg = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return urlReg.test(url);
}

/**
 * 验证是否为空
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * 验证数字范围
 */
export function isInRange(num: number, min: number, max: number): boolean {
  return num >= min && num <= max;
}

/**
 * 验证字符串长度
 */
export function isValidLength(str: string, min: number, max: number): boolean {
  const length = str.trim().length;
  return length >= min && length <= max;
}
