//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    user:'',
    psd:''
  },

  onLoad: function () {
  
  },

  login:function(){
    var that = this

    var psd = this.data.psd
    var user = this.data.user;
    if (psd.length > 0 && user.length > 0){
      var params = {
        userNo: user,
        userPw: app.Encrypt(psd),
        evalue: app.Encrypt()
      }
      console.log(params)
      app.showLoading()
      wx.request({
        url: 'https://www.stsidea.com/OMT.asmx/UserLoad',
        data: params,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "POST",
        dataType: "json",
        success: function(res) {
          console.log(res.data)
          var result = JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, "")) 
          console.log(result)
          app.hideLoading()
          if (result.status == '成功'){
            // 把账号密码记录在缓存里
            wx.setStorageSync("user", user)
            wx.setStorageSync("psd", psd)
            wx.setStorageSync("alreadyLogin", true)

            // 记录用户数据
            var info = result.data[0]
            wx.setStorage({
              key: 'userName',
              data: info.userName,
            })

            wx.setStorage({
              key: 'userMobile',
              data: info.userMobile,
            })
            
            wx.setStorage({
              key: 'team',
              data: info.team,
            })

            wx.setStorage({
              key: 'userType',
              data: info.userType,
            })
            // 跳转页面
            wx.switchTab({
              url: '../scan/scan',
            })
          }else if(result.status == '失败'){
            app.showToast("账号密码错误")
          }
        },
        fail: function(res) {
          console.log(res.data)
          app.showToast("登录失败")
        },
        complete: function(res) {},
      })
    }
  },

  // 记录用户
  userChange:function(e){
    this.setData({
      user: e.detail.value.trim()
    })
  },

    // 记录密码
  psdChange:function(e){
    this.setData({
      psd: e.detail.value.trim()
    })
  }


})
