// import PinYin from '@/assets/json/PinYin';
/**
 * @method chineseTopinyin  中文转拼音
 * @param {String} str 需要转换的字符串
 * @returns {String,Boolean} 转换之后的字符串或者false
 * @author duuliy
 */


// const chineseTopinyin = str => {
//   for (let key in PinYin) {
//     if (PinYin[key].indexOf(str) !== -1) {
//       return key;
//     }
//   }
//   return false;
// };


/**
 * @method filterDate  转换时间格式
 * @param {number} time 需要转换的时间格式
 * @returns {String} 转换之后的时间格式
 * * @author duuliy
 */
const filterDate = time => {
  return `${new Date(time).toLocaleDateString().replace(/\//g,'-')} ${new Date(time).toTimeString()}`.replace('GMT','').replace(/\((.*)\)/g,'').trim();
};

/**  权限验证
 * @method validCtr  验证按钮是否有效
 * @param {string} id 按钮id
 * @returns {boolean} 是否有权限
 * * @author duuliy
 */
global.validCtr = id => {
  let userRight = JSON.parse(unescape(localStorage.getItem("userRight")));
  for (let item of userRight.resRight){
    if(id === item.ctrlId){
      return true;
    }
  }
  return false;
};


export {
//   chineseTopinyin,
  filterDate,
  // validCtr
};
