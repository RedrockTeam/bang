const encodeFormated = require('../../../utils/util').encodeFormated;
const apiPrefix = 'https://redrock.cqupt.edu.cn/weapp';
const app = getApp();

Page({
  data: {
    imgUrl: '../../../images',
    firstHidden: true,
    deleteHidden: true,
    resultHidden: true,
    nobodyHidden: false,
    somebodyHidden: true,
    coverHidden: true,
    searchResult: {
      stuName: [],
      stuNum: []
    },
    inputValue: '',
    resultHight: '',
    addStu: {
      stuName: [],
      stuNum: [],
      stuMajor: [],
      stuClass: []
    },
    anotherAdd: 6,
    deleteIndex: '',
    deleteName: ''
  },
  onLoad: function onLoad () {
    let stuInfo = app.data.stuInfo;
    this.setData({
      stuInfo
    });
  },
  bindinputChange: function bindinputChange (e) {
    let value = e.detail.value;
    this.setData({
      inputValue: value
    });
  },
  searchTap: function searchTap (e) {
    let self = this;
    let stuName = [];
    let stuNum = [];
    wx.showToast({
      title: '数据获取中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: `${apiPrefix}/Course/getStuInfo`,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        params: encodeFormated(`${wx.getStorageSync('session')}&${self.data.inputValue}`)
      },
      success: function (res) {
        if (res.data.status_code === 200) {
          let resData = res.data.bags;
          if (resData.length === 0) {
            wx.showModal({
              title: '暂无此人信息',
              showCancel: false,
              confirmText: '确认'
            });
            return;
          }
          for (let resultI = 0; resultI < resData.length; resultI++) {
            stuName.push(resData[resultI].name);
            stuNum.push(resData[resultI].stuNum);
          }
          if (resData.length >= 7) {
            self.setData({
              resultHight: '710rpx'
            });
          } else {
            self.setData({
              resultHight: ''
            });
          }
          self.setData({
            'searchResult.stuName': stuName,
            'searchResult.stuNum': stuNum,
            resultHidden: false
          });
        } else {
          console.log('获取学生信息失败1', res.data.status_text);
          wx.showModal({
            title: '网络错误,请重试',
            showCancel: false,
            confirmText: '确认'
          });
        }
      },
      fail: function (res) {
        console.log('获取学生信息失败2', res);
        wx.showModal({
          title: '网络错误,请重试',
          showCancel: false,
          confirmText: '确认'
        });
      },
      complete: function (res) {
        wx.hideToast();
      }
    });
  },
  addstuName: [],
  addstuNum: [],
  addstuMajor: [],
  addstuClass: [],
  bindtapAdd: function bindtapAdd (e) {
    let self = this;
    wx.showToast({
      title: '数据获取中',
      icon: 'loading',
      duration: 10000
    });
    self.setData({
      nobodyHidden: true,
      somebodyHidden: false,
      resultHidden: true
    });
    let stuId = e.currentTarget.dataset.stunum;
    wx.request({
      url: `${apiPrefix}/Course/getStuInfo`,
      method: 'post',
      data: {
        params: encodeFormated(`${wx.getStorageSync('session')}&${stuId}`)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.status_code === 200) {
          let resData = res.data.bags;
          if (self.addstuNum.indexOf(resData[0].stuNum) === -1 && self.addstuName.length < 6) {
            self.addstuName.push(resData[0].name);
            self.addstuNum.push(resData[0].stuNum);
            self.addstuMajor.push(resData[0].college);
            self.addstuClass.push(resData[0].class);
            self.setData({
              'addStu.stuName': self.addstuName,
              'addStu.stuNum': self.addstuNum,
              'addStu.stuMajor': self.addstuMajor,
              'addStu.stuClass': self.addstuClass,
              anotherAdd: self.data.anotherAdd - 1
            });
            if (self.addstuName.length === 6) {
              self.setData({
                coverHidden: false
              });
            } else {
              self.setData({
                coverHidden: true
              });
            }
          }
        } else {
          console.log('获取学生信息失败3', res.data.status_text);
          wx.showModal({
            title: '网络错误,请重试',
            showCancel: false,
            confirmText: '确认'
          });
        }
      },
      fail: res => {
        console.log('获取学生信息失败4', res);
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
  bindtapData: function bindtapData (e) {
    let stuData = this.data.addStu;
    let hasSelf = false;
    stuData.stuNum.forEach(val => {
      if (val === this.data.stuInfo.stuNum) {
        hasSelf = true;
      }
    });
    if (!hasSelf) {
      stuData.stuClass.push(this.data.stuInfo.classNum + '班');
      stuData.stuMajor.push(this.data.stuInfo.college);
      stuData.stuName.push(this.data.stuInfo.name);
      stuData.stuNum.push(this.data.stuInfo.stuNum);
    }
    wx.setStorage({
      key: 'key',
      data: stuData
    });
    if (this.addstuName.length === 0) {
      this.setData({
        firstHidden: false
      });
    } else {
      wx.navigateTo({
        url: '../result/result'
      });
    }
  },
  bindtapClass: function bindtapClass (e) {
    wx.navigateTo({
      url: '../class/class?stuNumber=' + e.currentTarget.dataset.stunumber + '&stuName=' + e.currentTarget.dataset.stuname
    });
  },
  bindtapaddSure: function bindtapaddSure (e) {
    this.setData({
      firstHidden: true
    });
  },
  bindtapDelete: function bindtapDelete (e) {
    let self = this;
    self.setData({
      deleteIndex: e.currentTarget.dataset.index,
      deleteHidden: false,
      deleteName: self.data.addStu.stuName[e.currentTarget.dataset.index]
    });
  },
  bindtapCancel: function bindtapCancel (e) {
    this.setData({
      deleteHidden: true
    });
  },
  bindtapdeleteSure: function bindtapdeleteSure (e) {
    this.addstuName.splice(this.data.deleteIndex, 1);
    this.addstuNum.splice(this.data.deleteIndex, 1);
    this.addstuMajor.splice(this.data.deleteIndex, 1);
    this.addstuClass.splice(this.data.deleteIndex, 1);
    this.setData({
      'addStu.stuName': this.addstuName,
      'addStu.stuNum': this.addstuNum,
      'addStu.stuMajor': this.addstuMajor,
      'addStu.stuClass': this.addstuClass,
      deleteHidden: true,
      anotherAdd: this.data.anotherAdd + 1
    });
    if (this.data.anotherAdd === 6) {
      this.setData({
        nobodyHidden: false,
        somebodyHidden: true
      });
    }
  }
});
