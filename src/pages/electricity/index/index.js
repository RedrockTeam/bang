const app = getApp();
const encodeFormated = require('../../../utils/util').encodeFormated;
const urlprefix = 'https://redrock.cqupt.edu.cn/weapp/Electric/';

Page({
  data: {
    elecState: {},
    roomState: {},
    array: [12, 34, 31, 75, 45, 23]
  },
  isOwnEmpty (obj) {
    for (let name in obj) {
      if (obj.hasOwnProperty(name)) {
        return false;
      }
    }
    return true;
  },
  onLoad () {
    let stuInfo = wx.getStorageSync('stuInfo');
    if (!stuInfo) {
      app.gotoLogin();
      return;
    }
    const res = wx.getStorageSync('myinfor_electricity');
    if (res) {
      this.setData({
        elecState: res.result.current,
        roomState: res
      });
      wx.hideToast();
    } else {
      wx.showToast({
        title: '数据获取中',
        icon: 'loading',
        duration: 10000
      });
      wx.request({
        url: urlprefix + 'getInfo',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          params: encodeFormated(wx.getStorageSync('session'))
        },
        success: res => {
          res = res.data;
          console.log(this.isOwnEmpty(res.bags));
          if (this.isOwnEmpty(res.bags)) {
            let defaultElec = {
              'result': {
                'current': {
                  'elec_end': '0000',
                  'elec_start': '0000',
                  'elec_free': '30',
                  'elec_spend': '000',
                  'elec_cost': ['000', '00'],
                  'record_time': '00/00',
                  'elec_month': 4
                }
              }
            };
            this.setData({
              elecState: defaultElec.result.current,
              roomState: false,
              myRoom: '- - -',
              roomInfor: ['1栋 (知行苑1舍)', '2栋 (知行苑2舍)', '3栋 (知行苑3舍)', '4栋 (知行苑4舍)', '5栋 (知行苑5舍)', '6栋 (知行苑6舍)', '8栋 (宁静苑1舍)', '9栋 (宁静苑2舍)', '10栋 (宁静苑3舍)', '11栋 (宁静苑4舍)', '12栋 (宁静苑5舍)', '15栋 (知行苑7舍)', '16栋 (知行苑8舍)', '17栋 (兴业苑1舍)', '18栋 (兴业苑2舍)', '19栋 (兴业苑3舍)', '20栋 (兴业苑4舍)', '21栋 (兴业苑5舍)', '22栋 (兴业苑6舍)', '23A栋 (兴业苑7舍)', '23B栋 (兴业苑8舍)', '24栋 (明理苑1舍)', '25栋 (明理苑2舍)', '26栋 (明理苑3舍)', '27栋 (明理苑4舍)', '28栋 (明理苑5舍)', '29栋 (明理苑6舍)', '30栋 (明理苑7舍)', '31栋 (明理苑8舍)', '32栋 (宁静苑6舍)', '33栋 (宁静苑7舍)', '34栋 (宁静苑8舍)', '35栋 (宁静苑9舍)', '36栋 (四海苑1舍)', '37栋 (四海苑2舍)', '39栋 (明理苑9舍)']
            });
            return false;
          }
          this.setData({
            elecState: res.bags.result.current,
            roomState: res.bags
          });
          wx.setStorage({
            key: 'myinfor_electricity',
            data: res.bags
          });
        },
        fail: res => {
          console.log('获取电费信息失败', res);
          wx.showModal({
            title: '网络错误,请重试',
            showCancel: false,
            confirmText: '确认'
          });
        },
        complete: res => {
          wx.hideToast();
        }
      });
    }
  },
  changeRoom () {
    this.setData({
      isChangingRoom: true
    });
  },
  closeRoomchanging (e) {
    const target = e.target.id;
    if (target === 'room') {
      this.setData({
        isChangingRoom: false
      });
    }
  },
  changeBuilding (e) {
    this.setData({
      myBuilding: this.data.roomInfor[e.detail.value]
    });
  },
  bindRoomInput (e) {
    this.setData({
      myRoom: e.detail.value
    });
  },
  submitBindRoom () {
    let myBuilding = this.data.myBuilding || 'placeholder';
    myBuilding = myBuilding.split('栋 ')[0];
    const myRoom = this.data.myRoom;
    if (!myBuilding || !Number(myRoom) || myRoom.toString().length !== 3) {
      wx.showModal({
        title: '请正确填写寝室信息',
        showCancel: false
      });
      return;
    }
    wx.request({
      url: urlprefix + 'bindroom',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        params: encodeFormated(`${wx.getStorageSync('session')}&${myBuilding}&${myRoom}`)
      },
      success: res => {
        res = res.data;
        if (res.status_code !== 200) {
          wx.showModal({
            title: res.status_text,
            showCancel: false
          });
          return;
        } else {
          wx.showModal({
            title: '绑定寝室成功',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/electricity/index/index'
                });
              }
            }
          });
        }
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
