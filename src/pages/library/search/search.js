import utils from '../utils/utils';
const app = getApp();
Page({
  data: {
    searchItems: []
  },
  gotoSearch: utils.gotoSearch,
  setSearchValue: utils.setSearchValue,
  searchIconFocus: utils.searchIconFocus,
  searchIconBlur: utils.searchIconBlur,
  onLoad (req) {
    let stuInfo = wx.getStorageSync('stuInfo');
    if (!stuInfo) {
      app.gotoLogin();
      return;
    }
    this.setData({
      searchValue: req.value
    });
    utils.getSearchResult(this, req.value);
  },
  // 点击改变图书显示图书的详情
  toggleBookInfor (event) {
    let index = event.currentTarget.dataset.index;
    let searchItems = this.data.searchItems;
    searchItems[index].hidden = !searchItems[index].hidden;

    this.setData({
      searchItems: searchItems
    });
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/page/index/index'
    };
  }
});
