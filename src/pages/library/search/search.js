import utils from '../utils/utils';
Page({
  data: {
    searchItems: []
  },
  onLoad (req) {
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
  gotoSearch: utils.gotoSearch
});
