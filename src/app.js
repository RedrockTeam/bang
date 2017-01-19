const wechat = require('./utils/wechat');
const Promise = require('./es6-promise');

App({
  data: {
    name: 'WeApp Boilerplate',
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
        .then(info => resolve(info))
        .catch(error => console.error('failed to get user info, error: ' + error));
    });
  },
  onLaunch () {
    console.log(' ========== Application is launched ========== ');
  },
  onShow () {
    console.log(' ========== Application is showed ========== ');
  },
  onHide () {
    console.log(' ========== Application is hid ========== ');
  }
});
