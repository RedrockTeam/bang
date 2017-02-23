// const app = getApp();
// let imgPrefix = 'https://app.liuwenxi.me/';
const encodeFormated = require('../../utils/util').encodeFormated;

Page({
  data: {
    header: 'login-header.png',
    stunum: '',
    id: ''
  },
  changeStu (e) {
    this.setData({
      stunum: e.detail.value
    });
  },
  changeId (e) {
    this.setData({
      id: e.detail.value
    });
  },
  loginAction () {
    let info = {
      user: this.data.stunum,
      password: this.data.id,
      key: wx.getStorageSync('session')
    };
    const apiPrefix = 'https://redrock.cqupt.edu.cn/weapp';

    wx.request({
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: `${apiPrefix}/bind/doBind`,
      data: {
        params: encodeFormated(`${info.user}&${info.password}&${info.key}`)
      },
      success: function (res) {
        console.log(res);
        wx.removeStorageSync('session');
        wx.switchTab({
          url: '../index/index'
        });
        console.log('redirect');
      }
    });
  },
  onLoad () {
    // TODO: onLoad
  },
  onReady () {
    // TODO: onReady
  },
  onShow () {
    // TODO: onShow
  },
  onHide () {
    // TODO: onHide
  },
  onUnload () {
    // TODO: onUnload
  }
});
