/**
 * 地址模块类型定义
 */

/**
 * 地址信息
 */
export interface AddressVO {
  /** 地址ID */
  id: number;
  /** 父级ID（0表示顶级） */
  parentId: number;
  /** 地址名称 */
  name: string;
  /** 地址层级（1=省, 2=市, 3=区县, 4=镇, 5=村） */
  level: number;
  /** 地址层级描述 */
  levelDesc: string;
  /** 全称路径（如：广东省-深圳市-南山区-西丽街道-留仙村） */
  mergerName: string;
  /** 是否为顶级 */
  isTopLevel: boolean;
  /** 是否为村级及以上（可用于客户地址，level >= 4） */
  isVillageLevel: boolean;
}

/**
 * 地址查询参数
 */
export interface AddressQueryDTO {
  /** 父级ID（优先级高，传此参数返回子地址） */
  parentId?: number;
  /** 地址层级（如：1=省，传level=1返回所有省份） */
  level?: number;
}

/**
 * 地址链信息（用于编辑时回显）
 */
export interface AddressChainVO {
  /** 地址ID数组（从省到当前地址）如：[1,101,1001,10001,100001] */
  addressIds: number[];
  /** 地址名称数组 如：["广东省","深圳市","南山区","西丽街道","留仙村"] */
  addressNames: string[];
  /** 地址层级数组 如：[1,2,3,4,5] */
  addressLevels: number[];
  /** 完整地址路径 */
  fullPath: string;
  /** 最终地址ID */
  targetAddressId: number;
  /** 最终地址名称 */
  targetAddressName: string;
}
