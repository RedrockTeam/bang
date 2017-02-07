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
  }
});
