import utils from '../../utils/utils';
const app = getApp();
Page({
  data: {
    bookItems: []
  },
  gotoSearch: utils.gotoSearch,
  setSearchValue: utils.setSearchValue,
  searchIconFocus: utils.searchIconFocus,
  searchIconBlur: utils.searchIconBlur,
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
          bookItems: res.data.owedBook,
          readerInfo: res.data.readerInfo
        });
      },
      fail: () => {
        wx.showToast({
          title: 'Loading',
          duration: 10000,
          icon: 'loading'
        });
        utils.getBookInfor(this, 'owedBook');
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
