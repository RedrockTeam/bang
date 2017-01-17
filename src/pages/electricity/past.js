// const app = getApp();

Page({
  data: {
    title: 'past',
    elecState: {}
  },
  onLoad () {
    // TODO: onLoad
    wx.request({
      url: `http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/ElectricityQuery/ElectricityQuery/getElectric`,
      method: `POST`,
      header: {
        'Content-Type': `application/x-www-form-urlencoded`
      },
      data: {
        stuNum: 2015211878
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.status === 200) {
            console.log(res);
            this.setData({
              elecState: res.data.data
            });
          } else {
            console.log('网络错误!');
          }
        } else {
          console.log('网络错误!');
        }
      }
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
