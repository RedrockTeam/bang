import utils from '../utils/utils';
Page({
  data: {
    rankList: [],
    rankListImgSrc: ['gold_icon', 'silver_icon', 'copper_icon'] // 前三排名的图标名称
  },
  gotoSearch: utils.gotoSearch,
  toggleSearchIcon: utils.toggleSearchIcon,
  onLoad () {
    wx.getStorage({
      key: 'rankList_library',
      success: res => {
        this.setData({
          rankList: res.data
        });
      },
      fail: () => {
        wx.showToast({
          title: '数据获取中',
          duration: 10000,
          icon: 'loading'
        });
        utils.getRankList(this);
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
