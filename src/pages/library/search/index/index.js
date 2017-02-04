// const app = getApp();

Page({
  data: {
    title: 'library',
    searchItems: [{
      name: '书名',
      author: 'llp',
      number: '1234',
      position: '这里',
      hidden: true
    }, {
      name: '书名',
      author: 'llp',
      number: '1234',
      position: '这里',
      hidden: true
    }, {
      name: '书名',
      author: 'llp',
      number: '1234',
      position: '这里',
      hidden: true
    }, {
      name: '书名',
      author: 'llp',
      number: '1234',
      position: '这里',
      hidden: true
    }]
  },
  onLoad () {

  },
  showBookInfor: function (event) {
    let index = event.currentTarget.dataset.index;
    let searchItems = this.data.searchItems;
    searchItems[index].hidden = !searchItems[index].hidden;

    this.setData({
      searchItems: searchItems
    });
  },
  onReady () {
    // TODO: onReady
  },
  onShow () {
    // TODO: onShow
  },
  onHide () {
    // TODO: onHide
  },
  onUnload () {
    // TODO: onUnload
  }
});
