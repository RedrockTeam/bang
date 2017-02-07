import utils from '../utils/utils';
Page({
  data: {
    title: 'rank',
    rankList: [],
    rankListImgSrc: ['gold_icon', 'silver_icon', 'copper_icon']
  },
  onLoad () {
    wx.getStorage({
      key: 'rankList_library',
      success: res => {
        console.log(res);
        this.setData({
          rankList: res.data
        });
      },
      fail: () => {
        wx.showToast({
          title: 'Loading',
          duration: 10000,
          icon: 'loading'
        });
        utils.getRankList(this);
      }
    });
  },
  gotoSearch: utils.gotoSearch
});
