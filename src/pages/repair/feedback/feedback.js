const app = getApp();
const encodeFormated = require('../../../utils/util').encodeFormated;
const apiPrefix = 'https://redrock.cqupt.edu.cn/weapp';

Page({
  data: {
    service: [
      '物业管理服务',
      '餐饮服务',
      '接待服务',
      '医疗服务',
      '幼教服务',
      '校园一卡通',
      '学生公寓管理与服务'
    ],
    serviceVal: '请选择服务项目',
    detail: [
      [
        '维修服务物业管理中心',
        '保洁服务物业管理中心',
        '校园物业管理服务物业管理中心',
        '能源管理服务物业管理中心',
        '直饮水服务物业管理中心',
        '集中供热物业管理中心',
        '洗衣服务物业管理中心',
        '教材供应服务物业管理中心',
        '校园绿化养护物业管理中心',
        '门面管理物业管理中心'
      ],
      [
        '中心食堂饮食服务中心',
        '兴业苑一楼饮食服务中心',
        '兴业苑三楼重庆红高粱快餐管理咨询有限公司',
        '大学城二楼基建后勤管理处',
        '大学城三楼河北千喜鹤饮食股份有限公司',
        '清真餐厅大西北清真餐厅',
        '兴业苑二楼饮食服务中心'
      ],
      [
        '会议服务接待服务中心',
        '公务用车服务接待服务中心',
        '驾驶培训服务接待服务中心',
        '校园观光车接待服务中心'
      ],
      [
        '医疗服务校医院',
        '医保校医院'
      ],
      [
        '幼教服务幼儿园'
      ],
      [
        '一卡通校园“一卡通”系统管理与服务中心'
      ],
      [
        '门岗服务基建后勤管理处'
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
    type: '投诉',
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
    let name = app.data.stuInfo.name;
    if (name) {
      this.setData({
        name
      });
    } else {
      app.gotoLogin();
    }
  },
  bindType (e) {
    this.setData({
      type: e.target.dataset.feedbackType
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
  submitApply () {
    const self = this;
    const {name, title, phone, place, text, areaVal, detailVal, type} = self.data;

    if (name && title && phone && place && text && areaVal && detailVal && type) {
      wx.showToast({
        title: '正在上传您的' + self.data.type,
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
              self.uploadApplyInfo(name, title, phone, place, text, areaVal, detailVal, type, resData.bags);
            } else {
              console.log('图片上传失败-反馈1', resData);
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
            console.log('图片上传失败-反馈2', res);
            wx.showModal({
              title: '图片上传失败，请重试',
              showCancel: false,
              confirmText: '确认'
            });
          }
        });
      } else {
        self.uploadApplyInfo(name, title, phone, place, text, areaVal, detailVal, type);
      }
    } else {
      wx.showModal({
        title: '请把内容填写完整',
        showCancel: false,
        confirmText: '确认'
      });
    }
  },
  uploadApplyInfo (name, title, phone, place, text, areaVal, detailVal, type, imgUrl) {
    if (!imgUrl) {
      imgUrl = this.data.imgSrc;
    }
    wx.request({
      url: `${apiPrefix}/Suggest/saveInfo`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        params: encodeFormated(`${wx.getStorageSync('session')}&${name}&${title}&${phone}&${text}&${place}&${detailVal}&${type}&${imgUrl}`)
      },
      success (res) {
        if (res.data.status_code === 200) {
          wx.redirectTo({
            url: '../info/info'
          });
        } else {
          console.log('建议提交失败1', res.data.status_text);
          wx.showModal({
            title: '网络错误,请重试',
            showCancel: false,
            confirmText: '确认'
          });
        }
      },
      fail: res => {
        console.log('建议提交失败2', res);
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
      path: '/page/index/index'
    };
  }
});
