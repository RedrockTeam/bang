const app = getApp();
const encodeFormated = require('../../../utils/util').encodeFormated;

Page({
  data: {
    repairList: {
      finish: [],
      send: [],
      verify: []
    },
    apiPrefix: 'https://redrock.cqupt.edu.cn/weapp',
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
      url: `${self.data.apiPrefix}/Repair/getInfo`,
      method: 'POST',
      data: {
        params: encodeFormated(wx.getStorageSync('session'))
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.status_code === 200) {
          let resData = res.data.bags;
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
          self.setData({
            repairList: dataList,
            emptyData: dataEmpty
          });
          // 更新数据
        } else {
          console.log('获取报修信息失败3', res.data.status_text);
          app.gotoLogin();
        }
      },
      fail: res => {
        console.log('获取报修信息失败4', res);
        wx.showModal({
          title: '网络错误,请重试',
          showCancel: false,
          confirmText: '确认'
        });
      },
      complete: res => {
        wx.hideToast();
      }
    });
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/page/index/index'
    };
  }
});
