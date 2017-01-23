// const app = getApp();

Page({
  data: {
    userInfo: {
      stuNum: 2015211535
      // stuNum: 2014211767
    },
    repairList: {
      finish: [],
      send: [],
      verify: []
    },
    apiPrefix: 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/RepairAndSuggest/Repair',
    emptyData: true
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
        let dataList = {};
        let dataEmpty = true;

        if (~~resData.count > 0) {
          dataList = {
            verify: resData.verify,
            send: resData.send,
            finish: resData.finish
          };
          dataEmpty = false;
          for (let key in dataList) {
            dataList[key].forEach((item) => {
              if (item.wx_bxsj) {
                item.wx_bxsj = item.wx_bxsj.split(' ')[0].split('-').join('/').slice(2);
              }
            });
          }
        }
        // 针对返回数据格式做一些调整
        wx.hideToast();
        // 菊花转完
        self.setData({
          repairList: dataList,
          emptyData: dataEmpty
        });
        // 更新数据
      }
    });
  }
});
