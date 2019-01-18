/*
 * @Author: duuliy 
 * @Date: 2018-11-15 11:17:11 
 * @Last Modified by: duuliy
 * @Last Modified time: 2018-11-15 11:17:11 
 */
import qs from 'query-string'

//验证

//手机号
const validatePhone = (value) => {
  return /^1[1|2|3|4|5|6|7|8|9]\d{9}$/.test(value)

}

const validateYzm = (value) => {
  return /^\d{6}$/.test(value)
}

const validateYqm = (value) => {
  return /^[A-Za-z0-9]{6}$/.test(value)
}


const validateChinaPhone = (value) => {
  return /^1[23456789]\d{9}$/.test(value)
}
//邮箱
const validateMail = value => {
  return /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/.test(value)
}

//昵称
const validateName = (value) => {
  return /^[a-zA-Z\u4E00-\u9FA5\._\$!@#^*()+~`\/?,%&\*\!]{1,20}$/.test(value)
}
//密码
const validatePassWord = (value) => {
  return /^[0-9a-zA-Z\._\$!@#^*()+~`\/?,%&\*\!]{6,20}$/.test(value)
}
//交易密码
const validateTraderPwd = (value) => {
  return /^[\d]{6}$/.test(value)
}
//身份证
const validateIdCard = (value) => {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)

  // return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)
}
//文章标签
const validateTag = (value) => {
  // return /^[a-zA-Z0-9\u4e00-\u9fa5]{2,5}$/.test(value);
  var t = value.replace(/[\u4e00-\u9fa5]/g, '22'); //替换中文
  var reg = /^[A-Za-z0-9\s._\$!@#^*()+~`\/?,%&\*\!]{2,16}$/;
  // var reg = /^\w{1,10}$/;
  return (reg.test(t));
}
//专栏名称
const validateColumnName = (value) => {
  // return /^[a-zA-Z\u4E00-\u9FA5]{2,15}$/.test(value)
  return /^[a-zA-Z\u4E00-\u9FA5\d]{2,15}$/.test(value)
}
const validateCompanyName = (value) => {
  // return /^[a-zA-Z\u4E00-\u9FA5]{2,15}$/.test(value)
  // return /^[a-zA-Z\u4E00-\u9FA5\d]{2,150}$/.test(value)
  var t = value.replace(/[\u4e00-\u9fa5]/g, '22'); //替换中文
  var reg = /^[A-Za-z0-9\s]{1,600}$/;
  // var reg = /^\w{1,10}$/;
  return (reg.test(t));
}
//真实姓名
const validateRealName = (value) => {
  return /^[a-zA-Z\u4E00-\u9FA5\·]{2,20}$/.test(value)
}
//正整数
const validateInteger = (value) => {
  return /^[1-9]\d*$/.test(value)
}
//正数
const validatePosNum = (value) => {
  return /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)
}
// 去掉首尾空格
const validateTrimStr = (value) => {
  return value.replace(/(^\s*)|(\s*$)/g, "")
}
//去掉文章中空格
const articleTrimStr = (value) => {
  return value.replace(/<\/?.+?>/g, "").replace(/ /g, "");
}
//校验用户昵称
const checkLength = (v) => {
  var t = v.replace(/[\u4e00-\u9fa5]/g, '22'); //替换中文
  var reg = /^[A-Za-z0-9\s._\$!@#^*()+~`\/?,%&\*\!]{1,30}$/;
  // var reg = /^\w{1,10}$/;
  return (reg.test(t));
}




export {
  validatePhone,
  validateYzm,
  validateYqm,
  validateChinaPhone,
  validateMail,
  validateName,
  validatePassWord,
  validateTraderPwd,
  validateIdCard,
  validateTag,
  validateColumnName,
  validateCompanyName,
  validateRealName,
  validateInteger,
  validatePosNum,
  validateTrimStr,
  articleTrimStr,
  checkLength
};
