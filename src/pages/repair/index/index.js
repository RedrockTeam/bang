// const app = getApp();

Page({
  data: {
    userInfo: {
      stuNum: 2015211535
    },
    repairList: {
      finish: [],
      send: [],
      verify: []
    },
    apiPrefix: 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/RepairAndSuggest/Repair'
  },
  onLoad () {
    let self = this;

    wx.showToast({
      title: '数据获取中',
      icon: 'loading',
      duration: 10000
    });
    // 转个菊花
    wx.request({
      url: `${self.data.apiPrefix}/getRepairInfo`,
      method: 'post',
      data: {
        stunum: self.data.userInfo.stuNum
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let resData = res.data.data;
        let dataList = {
          verify: resData.verify,
          send: resData.send,
          finish: resData.finish
        };

        wx.hideToast();
        self.setData({
          repairList: dataList
        });
      }
    });
  }
  // 页面渲染之前发个请求
});
