const encodeFormated = require('../../../utils/util').encodeFormated;

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
        let newActInfo = {};
        let dateStr = res.data.bags[0].date.split('-')[1];
        wx.hideToast();
        if (dateStr < 10) {
          dateStr = dateStr;
        }
        dateStr = dateStr + '/' + res.data.bags[0].date.split('-')[2];
        newActInfo.img = res.data.bags[0].img;
        newActInfo.date = dateStr;
        newActInfo.place = res.data.bags[0].place;
        newActInfo.detail = res.data.bags[0].detail;
        that.setData({
          title: res.data.bags[0].title,
          actInfo: newActInfo
        });
        console.log(res.data);
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
