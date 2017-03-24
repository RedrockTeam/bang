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
    const res = wx.getStorageSync('myinfor_library');
    if (res) {
      this.setData({
        bookItems: res.historyBook,
        readerInfo: res.readerInfo
      });
    } else {
      wx.showToast({
        title: '数据加载中...',
        duration: 10000,
        icon: 'loading'
      });
      utils.getBookInfor(this, 'historyBook');
    }
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/page/index/index'
    };
  }
});
