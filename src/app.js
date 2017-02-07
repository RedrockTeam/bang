const wechat = require('./utils/wechat');
const Promise = require('./utils/es6-promise');

App({
  data: {
    name: 'CQUPT Bang',
    version: '0.1.0',
    userInfo: null
  },
  other: 'other variables',
  getUserInfo () {
    return new Promise((resolve, reject) => {
      if (this.data.userInfo) {
        return reject(this.data.userInfo);
      }
      wechat.login()
        .then(() => wechat.getUserInfo())
        .then(res => res.userInfo)
        .then(info => (this.data.userInfo = info))
        .then(info => {
          resolve(info);
        })
        .catch(error => console.error('failed to get user info, error: ' + error));
    });
  },
  onLaunch () {
    // 初始化完成
  },
  onShow () {
    // 显示
  },
  onHide () {
    // 图书馆查询清空缓存
    wx.removeStorage({
      key: 'myinfor_library',
      success: res => {
        console.log('---------removestorage', wx.getStorage({
          key: 'myinfor_library'
        }));
      }
    });
  }
});
