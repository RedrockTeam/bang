import utils from '../../utils/utils';
Page({
  data: {
    bookItems: [],
    readerInfo: [] // 读者的信息，借阅数目数量和目前欠费的金额
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
