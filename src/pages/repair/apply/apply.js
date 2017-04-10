const app = getApp();
const encodeFormated = require('../../../utils/util').encodeFormated;
const apiPrefix = 'https://redrock.cqupt.edu.cn/weapp';

Page({
  data: {
    service: [
      '水',
      '电',
      '光源类',
      '木工',
      '电器',
      '泥水',
      '管道疏通',
      '换表',
      '多媒体设备'
    ],
    serviceVal: '请选择服务项目',
    detail: [
      [
        '水龙头',
        '水管',
        '水阀、球阀'
      ],
      [
        '室内用电维修',
        '公共区域用电维修'
      ],
      [
        '路灯',
        '室内照明灯'
      ],
      [
        '门窗、锁',
        '桌、椅、家具',
        '窗帘',
        '黑板',
        '配钥匙'
      ],
      [
        '开关',
        '插座',
        '教室多媒体设备',
        '电风扇',
        '开水器'
      ],
      [
        '土建维修'
      ],
      [
        '疏通'
      ],
      [
        '换水表',
        '换电表',
        '高压表'
      ],
      [
        '教室多媒体设备',
        '投影仪故障',
        '电脑硬件故障',
        '软甲故障',
        '网络故障',
        '音响系统故障',
        '电源故障',
        '其他故障'
      ]
    ],
    detailNum: 0,
    detailVal: '请选择服务项目',
    area: [
      '住宅区',
      '教学区',
      '校园公共区',
      '办公区',
      '学生公寓区'
    ],
    areaVal: '请选择区域',
    name: '',
    phone: '',
    place: '',
    title: '',
    text: '',
    // 是否显示已上传图片
    showImg: false,
    // 上传图片地址
    imgSrc: 'https://redrock.cqupt.edu.cn/weapp/images/wt.jpg'
  },
  onLoad () {
    let stuInfo = wx.getStorageSync('stuInfo');
    if (!stuInfo) {
      app.gotoLogin();
      return;
    }
    let name = stuInfo.name;
    if (name) {
      this.setData({
        name
      });
    } else {
      app.gotoLogin();
    }
  },
  bindServiceChange (e) {
    this.setData({
      serviceVal: this.data.service[e.detail.value],
      detailNum: e.detail.value
    });
  },
  bindDetailChange (e) {
    this.setData({
      detailVal: this.data.detail[this.data.detailNum][e.detail.value]
    });
  },
  bindAreaChange (e) {
    this.setData({
      areaVal: this.data.area[e.detail.value]
    });
  },
  bindPhone (e) {
    let phone = e.detail.value;
    if ((/^1[34578]\d{9}$/.test(phone))) {
      this.setData({
        phone
      });
    } else {
      wx.showModal({
        title: '电话号码格式不对，请重新输入',
        showCancel: false,
        confirmText: '确认'
      });
    }
  },
  bindPlace (e) {
    this.setData({
      place: e.detail.value
    });
  },
  bindTitle (e) {
    this.setData({
      title: e.detail.value
    });
  },
  bindText (e) {
    this.setData({
      text: e.detail.value
    });
  },
  uploadImg: function () {
    let self = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;

        self.setData({
          showImg: true,
          imgSrc: tempFilePaths[0]
        });
      }
    });
  },
  // 差一个反馈，打分的接口
  submitApply () {
    const self = this;
    const {name, title, phone, place, text, areaVal, detailVal} = self.data;
    if (name && title && phone && place && text && areaVal && detailVal) {
      wx.showToast({
        title: '正在上传报修信息',
        icon: 'loading',
        duration: 10000
      });
      // 如果显示了图片，说明选取了图片，否则使用默认图片
      if (this.data.showImg) {
        wx.uploadFile({
          url: `${apiPrefix}/Common/upload`,
          filePath: self.data.imgSrc,
          name: 'file',
          success (res) {
            let resData = JSON.parse(res.data);
            if (resData.bags) {
              self.uploadApplyInfo(name, title, phone, place, text, areaVal, detailVal, resData.bags);
            } else {
              console.log('图片上传失败-报修1', resData);
              wx.hideToast();
              wx.showModal({
                title: '图片上传失败，请重试',
                showCancel: false,
                confirmText: '确认'
              });
              return false;
            }
          },
          fail (res) {
            wx.hideToast();
            console.log('图片上传失败-报修2', res);
            wx.showModal({
              title: '图片上传失败，请重试',
              showCancel: false,
              confirmText: '确认'
            });
          }
        });
      } else {
        self.uploadApplyInfo(name, title, phone, place, text, areaVal, detailVal);
      }
    } else {
      wx.showModal({
        title: '请把内容填写完整',
        showCancel: false,
        confirmText: '确认'
      });
    }
  },
  uploadApplyInfo (name, title, phone, place, text, areaVal, detailVal, imgUrl) {
    if (!imgUrl) {
      imgUrl = this.data.imgSrc;
    }
    wx.request({
      url: `${apiPrefix}/Repair/saveInfo`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        params: encodeFormated(`${wx.getStorageSync('session')}&${name}&${title}&${phone}&${place}&${text}&${areaVal}&${detailVal}&${imgUrl}`)
      },
      success (res) {
        if (res.data.status_code.toString() === '200') {
          wx.redirectTo({
            url: '../info/info'
          });
        } else {
          console.log('报修申请失败1', res.data.status_text);
          wx.showModal({
            title: '网络错误,请重试',
            showCancel: false,
            confirmText: '确认'
          });
        }
      },
      fail: res => {
        console.log('报修申请失败2', res);
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
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/pages/index/index'
    };
  }
});
