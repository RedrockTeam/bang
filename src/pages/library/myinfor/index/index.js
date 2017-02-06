import utils from '../../utils/utils';
Page({
  data: {
    title: 'index',
    bookItems: []
  },
  gotoSearch: utils.gotoSearch,
  onLoad () {
    utils.getBookInfor(this, 'borrowedBook');
  }
});
