import utils from '../../utils/utils';
Page({
  data: {
    title: 'index',
    bookItems: [],
    readerInfo: []
  },
  gotoSearch: utils.gotoSearch,
  onLoad () {
    wx.showToast({
      title: 'Loading',
      duration: 10000,
      icon: 'loading'
    });
    utils.getBookInfor(this, 'borrowedBook');
  }
});
