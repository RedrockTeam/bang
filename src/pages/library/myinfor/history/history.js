import utils from '../../utils/utils';
const app = getApp();
Page({
  data: {
    bookItems: []
  },
  gotoSearch: utils.gotoSearch,
  toggleSearchIcon: utils.toggleSearchIcon,
  onLoad () {
    let stuInfo = wx.getStorageSync('stuInfo');
    if (!stuInfo) {
      app.gotoLogin();
      return;
    }
    wx.getStorage({
      key: 'myinfor_library',
      success: res => {
        this.setData({
          bookItems: res.data.historyBook,
          readerInfo: res.data.readerInfo
        });
      },
      fail: (res) => {
        wx.showToast({
          title: 'Loading',
          duration: 10000,
          icon: 'loading'
        });
        utils.getBookInfor(this, 'historyBook');
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
