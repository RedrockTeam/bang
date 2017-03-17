// const app = getApp();
let imgPrefix = 'https://app.liuwenxi.me/';
const encodeFormated = require('../../utils/util').encodeFormated;

Page({
  data: {
    logout: imgPrefix + 'logout.png',
    avatar: '',
    stu_info: {
      stuid: '',
      detail_info: [
        {
          name: '学院',
          message: ''
        },
        {
          name: '专业',
          message: ''
        },
        {
          name: '年级',
          message: ''
        },
        {
          name: '班级',
          message: ''
        }
      ],
      room_feedback_info: [
        // {
        //   name: '寝室信息',
        //   message: '',
        //   url: imgPrefix + 'arrow.png'
        // },
        {
          name: '意见反馈',
          message: '',
          url: imgPrefix + 'arrow.png'
        }
      ]
    }
  },
  logoutAction () {
    wx.request({
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://redrock.cqupt.edu.cn/weapp/bind/cancleBind',
      data: {
        params: encodeFormated(wx.getStorageSync('session'))
      },
      success: function (res) {
        wx.clearStorage();
        wx.showModal({
          title: '退出成功，点击返回',
          showCancel: false,
          confirmText: '确认',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../index/index'
              });
            }
          }
        });
      }
    });
  },
  setStuInfo (stuInfo) {
    const tmpInfo = {
      stuid: stuInfo.stuNum,
      detail_info: [
        {
          name: '学院',
          message: stuInfo.college
        },
        {
          name: '专业',
          message: stuInfo.major
        },
        {
          name: '年级',
          message: stuInfo.grade
        },
        {
          name: '班级',
          message: stuInfo.classNum
        }
      ],
      room_feedback_info: [
        {
          name: '意见反馈',
          message: '',
          url: imgPrefix + 'arrow.png'
        }
      ]
    };
    this.setData({
      stu_info: tmpInfo,
      avatar: stuInfo.avatar
    });
  },
  onShow () {
    const self = this;
    let stuInfo = wx.getStorageSync('stuInfo');

    // 如果有，则绑定
    if (stuInfo) {
      self.setStuInfo(stuInfo);
    } else {
      wx.redirectTo({
        url: '../login/login'
      });
    }
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/page/index/index'
    };
  }
});
