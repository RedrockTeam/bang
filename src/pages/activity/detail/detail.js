const encodeFormated = require('../../../utils/util').encodeFormated;
// const app = getApp();
Page({
  data: {
    title: '加载中',
    actInfo: {
      data: '00/00',
      place: '加载中',
      img: '',
      detail: '加载中'
    }
  },
  onLoad (par) {
    const that = this;
    const key = wx.getStorageSync('session');
    let actId = par.act_id;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    wx.request({
      method: 'post',
      url: 'https://redrock.cqupt.edu.cn/weapp/Activity/Show/getInfoById',
      data: {
        params: encodeFormated(`${key}&${actId}`)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        if (res.data.status_code.toString() !== '200') {
          wx.showModal({
            title: '加载失败',
            showCancel: false
          });
          return;
        }
        const resData = res.data.bags[0];
        let newActInfo = {};
        let dateStr = resData.date.split('-')[1];
        wx.hideToast();
        dateStr = dateStr + '/' + resData.date.split('-')[2];
        newActInfo.img = resData.img;
        newActInfo.date = dateStr;
        newActInfo.place = resData.place;
        newActInfo.detail = resData.detail;
        newActInfo.host = resData.host || '红岩网校工作站';
        that.setData({
          title: resData.title,
          actInfo: newActInfo
        });
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
