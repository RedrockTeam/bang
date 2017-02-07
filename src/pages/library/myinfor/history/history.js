import utils from '../../utils/utils';
Page({
  data: {
    bookItems: []
  },
  gotoSearch: utils.gotoSearch,
  onLoad () {
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
  }
});
