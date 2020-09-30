/**
 * @type {RegExp}
 */

// 电话正则验证
export const phonePattern = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;

//新运营商电话验证
export const newPhonePattern = /^1[0-9]{10}$/;

// 用户名正则验证
export const userNamePattern = /^[a-zA-Z0-9]+$/;

// 密码正则验证 必须包含数字、大写字母、小写字母、特殊字符，8-16位 ~`_|\:;"<,>'?/
// let test = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$*%^&~`_|\:;"<,>'
export const pwdPattern = () =>
  new RegExp(
    `(?=^.{${sessionStorage.minPassword ||
      6},50}$)(?=.*\\d)(?=.*[\\W | _]+)(?=.*[A-Z])(?=.*[a-z])(?!.*\\s).*$`
  );

//只能中文
export const Chinese = /^[\u0391-\uFFE5]+$/;
// 部门正则验证 汉字 大写字母、小写字母
export const departmentPattern = /^\S{0,30}$/;

//只能输入中文 英文字母大小写 数字
export const userNamePatterns = /^[\u0391-\uFFE5a-zA-Z0-9]+$/;

// 电子邮箱正则验证
export const emailPattern = /^\w+@[a-zA-Z0-9]+(?:\.[a-z]{2,4}){1,3}$/;

export const instructionsPattern = /^(rar|zip|7z|doc|docx|pdf|JPG|PNG|txt)$/i;

// 软件安装包包说明书文件正则验证 RAR、ZIP、7z、DOC、DOCX、PDF、JPG、PNG、TXT、xlsx、xls忽略大小写
export const softInstructionsPattern = /^(rar|zip|7z|doc|docx|pdf|JPG|PNG|txt|xlsx|xls)$/i;

//去掉浮点数
export const validateFloatingPoint = value => {
  return value.replace(/\D/g, '');
};

// 导出弹框起始值正整数
export const exportValuePattern = /^([1-9]\d*|0)$/;

// 0-10000000.00 小数的正则
export const sevenNumberTwoFloatPattern = /^(0(\.\d{1,2})?|[1-9]\d{0,5}(\.\d{1,2})?|[1-9]\d{0,6}|[1-9]\d{0,5}[0-8](\.\d{1,2})?)$/;

//手机号码验证
export const MobilePhonePattern = /^1[34578]\d{9}$/;

//最少输入5个字符
export const minStringPattern = /^.{5,}$/;

// MD5码 值得格式验证
export const MD5Regex = /^([A-Z]|[a-z]|[0-9]){32}$/;

// http(s) 格式验证
export const httpRegex = /^(http(s?):\/\/)/;

//ip验证，默认网关
export const ipRegex = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;

//mac验证
export const macRegex = /^(([a-f0-9A-F]{2}:)|([a-f0-9A-F]{2}-)){5}[a-f0-9A-F]{2}$/;
//子网掩码
export const subnetMaskRegex = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;

// 序列号正则验证
export const serialNumberPattern = /^[a-zA-Z0-9]+$/;

// 数字正则验证
export const numberPattern = /^[0-9]*$/;
// 正整数及0正则验证
export const numberOrZeroPattern = /^[1-9]\d*|0$/;
// 正整数正则校验
export const numberPositivePattern = /^[+]{0,1}(\d+)$/;

// 小数正则验证
export const floatNumberPattern = /^\d+(\.\d+)?$/;

// 整数或者1-2位小数
export const numberOrFloatPattern = /^[0-9]+([.]{1}[0-9]{1,2})?$/;

// 网口数目
export const networkPortPattern = /^[1-9][0-9]?$/;

// 接口数目
export const interfacePattern = /^([1-9]\d*|0)$/;

// QQ
export const QQPattern = /^[0-9]{4,11}$/;

// 微信
export const WXPattern = /\w/g;

//保留一位小数
export const validateOneFloat = value => {
  return value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3');
};
export const validatePort = /^\d+(-\d+)$/;

export const Portvalid = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

//0-255
export const ipLast = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])$/;

//不包含 \/:*?<>|"
export const errString = /^[^\\/:*?<>|"]+$/;

//小数点数字
export const decimalPointNumber = /^\d+$|^\d*\.\d+$/g;

//数字和字母
export const numbersAndLetters = /^[0-9a-zA-Z]*$/g;
