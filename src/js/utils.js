/**
 * 查看大图 （单张）
 */
export function imagePreview(imageSrc) {
    wx.previewImage({
      current: imageSrc, // 当前显示图片的http链接
      urls: [imageSrc] // 需要预览的图片http链接列表
    });
  }
  
  /**
   * 查看大图 （单张）
   */
  export function imageListPreview(imageSrc, imageSrcArr ) {
      wx.previewImage({
          current: imageSrc, // 当前显示图片的http链接
          urls: imageSrcArr // 需要预览的图片http链接列表
      });
  }
  /**
   * 上传图片
   */
  export function chooseImage(count=9,sizeType,sourceType) {
      let tempSizeType = ['original', 'compressed'];
      let tempSourceType = ['album','camera'];
      if(sizeType){
          tempSizeType = [sizeType];
      }
      if(sourceType){
          tempSourceType = [sourceType];
      }
      return new Promise((resolve,reject)=>{
          wx.chooseImage({
              count: count,
              sizeType: tempSizeType,
              sourceType: tempSourceType,
              success: res => {
                  const tempFilePaths = res.tempFilePaths
                  resolve(tempFilePaths)
              },
              fail:err => {
                  reject(err)
              }
          })
      })
  
      
  }
  
  export function trim(str){ 
      return str.replace(/(^\s*)|(\s*$)/g, ""); 
  }
  
  // 秒转年月日
  export function secondToDate(data) {
      let time = Number(data) *1000;
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth()<9 ? '0'+ (date.getMonth()+1):date.getMonth()+1;
      let day = date.getDate()<10?'0'+date.getDate():date.getDate();
      return `${year}年${month}月${day}日`
  }
  
  
  /*
  ** randomWord 产生任意长度随机字母数字组合
  ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
  ** xuanfeng 2014-08-28
  */
   
  export function randomWord(randomFlag, min, max){
      var str = "",
          range = min,
          arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
   
      // 随机产生
      if(randomFlag){
          range = Math.round(Math.random() * (max-min)) + min;
      }
      for(var i=0; i<range; i++){
          pos = Math.round(Math.random() * (arr.length-1));
          str += arr[pos];
      }
      return str;
  }
  
  export function formatChatDate(date) {
      let weeks = ['周一','周二','周三','周四','周五','周六','周日'];
      let recordDate = new Date(date.replace(/-/g,'/'));
      let nowDate = new Date();
      let recordYear = recordDate.getFullYear();
      let recordMonth = recordDate.getMonth()+1 >9? recordDate.getMonth()+1:'0'+(recordDate.getMonth()+1);
      let recordDay = recordDate.getDate()>9?recordDate.getDate():'0'+recordDate.getDate();
      let recordWeek = recordDate.getDay() == 0 ? 7 : recordDate.getDay();
      let recordHour = recordDate.getHours()>9?recordDate.getHours():'0'+recordDate.getHours();
      let recordMinutes = recordDate.getMinutes()>9?recordDate.getMinutes():'0'+recordDate.getMinutes();
      let nowYear = nowDate.getFullYear();
      let nowMonth = nowDate.getMonth()+1>9?nowDate.getMonth()+1:'0'+(nowDate.getMonth()+1);
      let nowDay = nowDate.getDate()>9?nowDate.getDate():'0'+nowDate.getDate();
      let nowWeek = nowDate.getDay() == 0 ? 7 : nowDate.getDay();
      let temp = '';
      if(recordYear == nowYear){
          if(recordMonth == nowMonth){
              if(nowDay - recordDay > 6 || recordWeek > nowWeek){
                  temp = `${recordMonth}月${recordDay}日`
              }else {
                  if(nowDay == recordDay){
                      if(recordHour<12){
                          temp=`早上${recordHour}:${recordMinutes}`
                      }else if(recordHour<18){
                          temp=`下午${recordHour}:${recordMinutes}`
                      }else{
                          temp=`晚上${recordHour}:${recordMinutes}`
                      }
                  }
                  if(nowDay - recordDay == 1){
                      temp = "昨天"
                  }
                  if(nowDay - recordDay > 1){
                      temp = weeks[recordWeek-1];
                  }
              }
  
          }else {
              temp = `${recordMonth}月${recordDay}日`
          }
      }else {
         temp = `${recordYear}年${recordMonth}月${recordDay}日`
      }
      return temp;
  }