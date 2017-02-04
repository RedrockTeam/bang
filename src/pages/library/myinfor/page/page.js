// const app = getApp();

Page({
  data: {
    title: 'asd',
    myinforItems: [],
    myinforItemsFocusIndex: 0
  },
  onLoad () {
    this.setData({
      myinforItems: [{
        img: 'borrowing_focus',
        text: '正在借阅 ' + 2
      }, {
        img: 'history_borrow',
        text: '历史借阅 ' + 2
      }, {
        img: 'owe_books',
        text: '欠费书目 ' + 2
      }]
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
