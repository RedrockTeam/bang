const app = getApp();
const encodeFormated = require('../../../utils/util').encodeFormated;
const electricityUrl = 'https://redrock.cqupt.edu.cn/weapp/Electric/getInfo';

Page({
  data: {
    elecState: {},
    roomState: {}
  },
  onLoad () {
    wx.getStorage({
      key: 'myinfor_electricity',
      success: res => {
        console.log('myinfor_electricity ', res);
        this.setData({
          elecState: res.data.result.current,
          roomState: res.data
        });
      },
      fail: () => {
        wx.request({
          url: electricityUrl,
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
            params: encodeFormated(wx.getStorageSync('session'))
          },
          success: res => {
            console.log(res);
            res = res.data;
            if (res.status_code === 200) {
              this.setData({
                elecState: res.bags.result.current,
                roomState: res.bags
              });
              wx.setStorage({
                key: 'myinfor_electricity',
                data: res.bags
              });
            } else {
              console.log('获取电费信息失败1', res.status_text);
              app.gotoLogin();
            }
          },
          fail: res => {
            console.log('获取电费信息失败2', res);
            app.gotoLogin();
          }
        });
      }
    });
  }
});
