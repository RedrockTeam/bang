const app = getApp();
let imgPrefix = 'https://redrock.cqupt.edu.cn/weapp/images';
const encodeFormated = require('../../utils/util').encodeFormated;

Page({
  data: {
    header: imgPrefix + '/logo.png',
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
  backToIndex () {
    wx.switchTab({
      url: '/pages/index/index'
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
    const self = this;
    let info = {
      user: self.data.stunum,
      password: self.data.id,
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

        wx.hideToast();
        if (res.data.status_code.toString() === '200') {
          app.getUserInfo().then(res => {
            // 测试用storage
            wx.setStorage({
              key: 'cleared',
              data: 'used by test'
            });
            wx.showModal({
              title: '恭喜，绑定成功！',
              showCancel: false,
              confirmText: '继续',
              success (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../index/index'
                  });
                }
              }
            });
          });
        } else if (res.data.status_code.toString() === '400') {
          wx.showModal({
            title: '你已经绑定过，点击返回',
            showCancel: false,
            confirmText: '返回',
            success (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../index/index'
                });
              }
            }
          });
        } else if (res.data.status_code.toString() === '404') {
          self.setData({
            id: ''
          });
          wx.showModal({
            title: '账号或者密码错误！',
            showCancel: false,
            confirmText: '重试'
          });
        } else {
          wx.showModal({
            title: '我也不知道是什么错误',
            showCancel: false,
            confirmText: '重试'
          });
        }
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
