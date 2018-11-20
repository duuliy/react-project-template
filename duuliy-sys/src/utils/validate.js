/*
 * @Author: duuliy 
 * @Date: 2018-11-15 11:17:11 
 * @Last Modified by: duuliy
 * @Last Modified time: 2018-11-15 11:17:11 
 */


//验证
var Rxports = {
    //手机号
    validatePhone(value) {
      return /^1[1|2|3|4|5|6|7|8|9]\d{9}$/.test(value)
      
    },
  
    validateYzm(value) {
      return /^\d{6}$/.test(value)
    },
  
    validateYqm(value) {
      return /^[A-Za-z0-9]{6}$/.test(value)
    },
  
  
    validateChinaPhone(value) {
      return /^1[23456789]\d{9}$/.test(value)
    },
    //邮箱
    validateMail(value) {
      return /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/.test(value)
    },
    //昵称
    validateName(value) {
      return /^[a-zA-Z\u4E00-\u9FA5\._\$!@#^*()+~`\/?,%&\*\!]{1,20}$/.test(value)
    },
    //密码
    validatePassWord(value) {
      return /^[0-9a-zA-Z\._\$!@#^*()+~`\/?,%&\*\!]{6,20}$/.test(value)
    },
    //交易密码
    validateTraderPwd(value) {
      return /^[\d]{6}$/.test(value)
    },
    //身份证
    validateIdCard(value) {
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
  
      // return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)
    },
    //文章标签
    validateTag(value) {
      // return /^[a-zA-Z0-9\u4e00-\u9fa5]{2,5}$/.test(value);
      var t = value.replace(/[\u4e00-\u9fa5]/g, '22'); //替换中文
      var reg = /^[A-Za-z0-9\s._\$!@#^*()+~`\/?,%&\*\!]{2,16}$/;
      // var reg = /^\w{1,10}$/;
      return (reg.test(t));
    },
    //专栏名称
    validateColumnName(value) {
      // return /^[a-zA-Z\u4E00-\u9FA5]{2,15}$/.test(value)
      return /^[a-zA-Z\u4E00-\u9FA5\d]{2,15}$/.test(value)
    },
    validateCompanyName(value) {
      // return /^[a-zA-Z\u4E00-\u9FA5]{2,15}$/.test(value)
      // return /^[a-zA-Z\u4E00-\u9FA5\d]{2,150}$/.test(value)
      var t = value.replace(/[\u4e00-\u9fa5]/g, '22'); //替换中文
      var reg = /^[A-Za-z0-9\s]{1,600}$/;
      // var reg = /^\w{1,10}$/;
      return (reg.test(t));
    },
    //真实姓名
    validateRealName(value) {
      return /^[a-zA-Z\u4E00-\u9FA5\·]{2,20}$/.test(value)
    },
    //正整数
    validateInteger(value) {
      return /^[1-9]\d*$/.test(value)
    },
    //正数
    validatePosNum(value) {
      return /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)
    },
    // 去掉首尾空格
    validateTrimStr(value) {
      return value.replace(/(^\s*)|(\s*$)/g, "")
    },
    //去掉文章中空格
    articleTrimStr(value) {
      return value.replace(/<\/?.+?>/g, "").replace(/ /g, "");
    },
    //校验用户昵称
    checkLength(v) {
      var t = v.replace(/[\u4e00-\u9fa5]/g, '22'); //替换中文
      var reg = /^[A-Za-z0-9\s._\$!@#^*()+~`\/?,%&\*\!]{1,30}$/;
      // var reg = /^\w{1,10}$/;
      return (reg.test(t));
    }
  
  };
  
  
  export default Rxports;
  