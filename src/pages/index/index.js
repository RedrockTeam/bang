const app = getApp();

Page({
  data: {
    title: 'Index page',
    userInfo: {}
  },
  onLoad () {
    console.log(' ---------- onLoad ----------');
    app.getUserInfo()
      .then(info => this.setData({ userInfo: info }))
      .catch(console.info);
  },
  onReady () {
    console.log(' ---------- onReady ----------');
  },
  onShow () {
    console.log(' ---------- onShow ----------');
  },
  onHide () {
    console.log(' ---------- onHide ----------');
  },
  onUnload () {
    console.log(' ---------- onUnload ----------');
  },
  onPullDownRefresh () {
    console.log(' ---------- onPullDownRefresh ----------');
  }
});
