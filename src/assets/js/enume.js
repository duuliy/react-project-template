/**
 * 语言类型
 * @type {{name: string, label: string, value: String}}
 */
export const ZH = { name: '中文', label: '中文', language: 'english', value: 'chinese' }
export const EN = { name: '英文', label: '英文', language: 'chinese', value: 'english' }
export const LANGUAGE = [ZH, EN]

/**
 * 需要处理重新登录的错误码
 */
export const LOGINOUT_CODES = {
  NOT_PERMISSION: 401, // 没有权限
  OUT_PERMISSION: 403, // 权限过期
  SYS_TOKEN_EXPIRE: 421, // 您的登录状态已经失效,请重新登录
  ACCOUNT_REPEAT_LOGIN: 422, // 当前账号已有其他人使用，您被退出，请检查账号信息或联系管理员
  ACCOUNT_NOT_LOGIN: 423, // 没有登录
  ACCOUNT_FORCED_RETURN: 426, // 您的账号权限被修改，请重新登录
  SYS_TOKEN_INVALID: 427, // 无效令牌
}
