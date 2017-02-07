import utils from '../utils/utils';
Page({
  data: {
    title: 'library',
    searchItems: [{
      name: '书名',
      author: 'llp',
      number: '1234',
      position: '这里',
      hidden: true
    }]
  },
  onLoad (req) {
    this.setData({
      searchValue: req.value
    });
  },
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
