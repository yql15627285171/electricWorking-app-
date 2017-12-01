const app = getApp()
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../lib/bmap-wx.js');
var wxMarkerData = [];
Page({
  data: {
    color1:'red',
    color2: 'black',
    markers1:[
      {
        id: 0,
        latitude: "22.533958427597",
        longitude: "114.14041014007",
        title: '电表信息:\n电表表号：46273672\n电表地址：深圳莲塘\n检验人员：张三\n检查时间：2017-10-01',
        iconPath: '../../img/marker_red.png',
        // rotate:180
      }
    ],
    markers2:[
      {
        id: 0,
        latitude: "22.533968427597",
        longitude: "114.14521014007",
        title: '电表信息:\n电表表号：46273672\n电表地址：深圳莲塘\n检验人员：李四\n检查时间：2017-10-01',
        iconPath: '../../img/marker_red.png',
        // rotate: 180
      }
    ],
    mapHeight: 0,
    markers: [
      {
        id: 0,
        latitude: "22.533958427597",
        longitude: "114.14521014007",
        title: '电表信息:\n电表表号：46273672\n电表地址：深圳莲塘\n检验人员：张三\n检查时间：2017-10-01',
        iconPath: '../../img/marker_red.png',
        // rotate: 180
      }
    ],
    latitude: '',
    longitude: '',
    placeData: {}
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    wxMarkerData = that.data.markers
    // that.changeMarkerColor(wxMarkerData, id);
  },
  
  onLoad: function () {
    
    var that = this;
    this.setLocation()
    that.setData({
      mapHeight: app.globalData.deviceHeight - 150,
    })
    // console.log(this.color1)
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'olhXDer5l8jbrSy5W66wE8esRPcGxcrX'
    });
  //  var fail = function (data) {
  //     console.log(data)
  //   };
  //   var success = function (data) {
  //     wxMarkerData = data.wxMarkerData; 
  //   }

    //   that.setData({
    //     markers: wxMarkerData
    //   });
    //   that.setData({
    //     latitude: wxMarkerData[0].latitude
    //   });
    //   that.setData({
    //     longitude: wxMarkerData[0].longitude
    //   });
    // }
    // // 发起POI检索请求 
    // BMap.search({
    //   "query": '会所',
    //   fail: fail,
    //   success: success,
    //   // 此处需要在相应路径放置图片文件 
    //   iconPath: '../../img/marker_red.png',
    //   // 此处需要在相应路径放置图片文件 
    //   iconTapPath: '../../img/marker_yellow.png'
    // }); 
  },




  changeMarkerColor: function (data, i) {
    var that = this;
    var temp = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "../../img/marker_yellow.png";
      } else {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "../../img/marker_red.png";
      }
      temp[j] = data[j];
    }
    // console.log(temp)
    that.setData({
      markers: temp
    });
    // console.log(that.data.markers)
  },

  choseType:function(event){ 
    var index = event.target.dataset.headerindex
    var temp1 = [
      {
        id: 0,
        latitude: "22.533958427597",
        longitude: "114.14041014007",
        title: '电表信息:\n电表表号：46273672\n电表地址：深圳莲塘\n检验人员：李四\n检查时间：2017-10-01',
        iconPath: '../../img/marker_red.png',
        // rotate: 180
      }
    ]

    var temp2 = [
      {
        id: 1,
        latitude: "22.534958427597",
        longitude: "114.15041014007",
        title: '电表信息:\n电表表号：46273672\n电表地址：深圳莲塘\n检验人员：王五\n检查时间：2017-10-01',
        iconPath: '../../img/marker_red.png',
        // rotate: 180
      }
    ]
    if (index == '1'){
      this.setData({
        color1:'red',
        color2:'black',
        markers: temp1
      })
    }else{
      this.setData({
        color1: 'black',
        color2: 'red',
        markers: temp2
      })
    }
  },

  // 设置当前位置
  setLocation:function(){
    var that = this
    wx.getLocation({
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  }

  

  
})
