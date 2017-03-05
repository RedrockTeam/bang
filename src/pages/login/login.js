const app = getApp();
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
    wx.showToast({
      title: '登录中',
      icon: 'loading',
      duration: 10000
    });
    const self = this;
    if (!wx.getStorageSync('session')) {
      // 获取session
      app.loginApp().then(res => {
        self.loginFunction();
      });
    } else {
      self.loginFunction();
    }
  },
  loginFunction () {
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
        if (res.data.status_code === 200) {
          wx.hideToast();
          wx.showModal({
            title: '恭喜，绑定成功！',
            showCancel: false,
            confirmText: '继续',
            success (res) {
              if (res.confirm) {
                console.log('redirect');
                // wx.removeStorageSync('session');
                wx.switchTab({
                  url: '../index/index'
                });
              }
            }
          });
        }
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
