// pages/scan/scan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alreadyLogin:false
  },
  // 扫码登录设备的系统
  loginSystem(){
    if (this.data.alreadyLogin){
      // 只允许从相机扫码
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          console.log(res.result)
          this.loginRequest(res.result)
        }
      })
    }else{
      this.showLoginMessage()
    }
    
  },

  loginRequest:function(guid){
    var evalue = app.Encrypt()
    var userNo = wx.getStorageSync("user")
    var params = {
      guid: guid,
      userNo: '1013',
      evalue: evalue
    }
    console.log(params)
    wx.request({
      url: 'https://www.stsidea.com/OMT.asmx/QRCodeScanResult',
      data: params,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log(res.data)
        // var result = res.data.replace(/<[^>]+>/g, "").replace(/[\r\n]/g, "").split("：")
        // console.log(result)
        // if (result[0] == '失败') {
        //   wx.showModal({
        //     title: result[1],
        //   })
        // }

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
  //扫码判断设备的好坏
  judgeStatus(){
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  } ,

  // 自动登录
  autoLogin:function(){
    var that = this

    var psd = wx.getStorageSync("psd")
    var user = wx.getStorageSync("user")
   
    var params = {
      userNo: user,
      userPw: app.Encrypt(psd),
      evalue: app.Encrypt()
    }
    console.log(params)
    wx.request({
      url: 'https://www.stsidea.com/OMT.asmx/UserLoad',
      data: params,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log(res.data)
        var result = JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
        if (result.status == '成功') {
          that.setData({
            alreadyLogin:true
          })
        } else if (result.status == '失败') {
          // 清除缓存
          wx.clearStorage()
          // 重新登录
          that.showLoginMessage()
        }
      },
      fail: function (res) {
        console.log(res.data)

      },
      complete: function (res) { },
    })
    
  },
  // 显示没登录的提示
  showLoginMessage: function () {
    wx.showModal({
      title: '提示',
      content: '您未能成功的登录，请登录',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../index/index',
          })
        } else if (res.cancel) {

        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var alreadyLogin = wx.getStorageSync("alreadyLogin")
    if (!alreadyLogin){
      this.showLoginMessage()
    }else{
      // 自动登录
      this.autoLogin()
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})