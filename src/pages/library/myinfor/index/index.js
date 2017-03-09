import utils from '../../utils/utils';
Page({
  data: {
    bookItems: [],
    readerInfo: [] // 读者的信息，借阅数目数量和目前欠费的金额
  },
  gotoSearch: utils.gotoSearch,
  toggleSearchIcon: utils.toggleSearchIcon,
  onLoad () {
    wx.getStorage({
      key: 'myinfor_library',
      success: res => {
        this.setData({
          bookItems: res.data.borrowedBook,
          readerInfo: res.data.readerInfo
        });
      },
      fail: (res) => {
        wx.showToast({
          title: '数据加载中...',
          duration: 10000,
          icon: 'loading'
        });
        utils.getBookInfor(this, 'borrowedBook');
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
