const CryptoJS = require('./utils/AES')
const dataUtil = require('./utils/util.js') 
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: (res)=> {
        this.globalData.deviceHeight = res.screenHeight
      }
    })
  },

  Encrypt: function (data) {


    var key = CryptoJS.enc.Latin1.parse('j<r%T.w8*7^6J\"r%T.wm#t*o');
    var iv = CryptoJS.enc.Latin1.parse('o@mt<_7-m.T^&r\"j');

    var ADEData
    if (data == null) {
      ADEData = dataUtil.formatTime1(new Date())
    } else {
      // ADEData = data + '$' + dataUtil.formatTime1(new Date())
      ADEData = data
    }
    // console.log(ADEData)
    return CryptoJS.AES.encrypt(ADEData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString();
  },

  // 转圈的提示
  showLoading:function(){
    wx.showLoading({
      title: '正在加载',
    })
  },

  hideLoading:function(){
    wx.hideLoading()
  },

  showToast:function(msg){
    wx.showToast({
      title: msg,
      duration: 2000,
    })
  },

  showModal:function(msg){
    wx.showModal({
      title: '提示',
      content: msg,
    })
  },


 

  globalData: {
    deviceHeight:0
  }
})