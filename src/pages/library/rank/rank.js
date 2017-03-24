import utils from '../utils/utils';
const app = getApp();
Page({
  data: {
    rankList: [],
    rankListImgSrc: ['gold_icon', 'silver_icon', 'copper_icon'] // 前三排名的图标名称
  },
  gotoSearch: utils.gotoSearch,
  setSearchValue: utils.setSearchValue,
  searchIconFocus: utils.searchIconFocus,
  searchIconBlur: utils.searchIconBlur,
  onLoad () {
    const stuInfo = wx.getStorageSync('stuInfo');
    if (!stuInfo) {
      app.gotoLogin();
      return;
    }
    const rankList = wx.getStorageSync('rankList_library');
    if (rankList) {
      this.setData({
        rankList
      });
    } else {
      wx.showToast({
        title: '数据获取中',
        duration: 10000,
        icon: 'loading'
      });
      utils.getRankList(this);
    }
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/page/index/index'
    };
  }
});
