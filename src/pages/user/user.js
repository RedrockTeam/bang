const app = getApp();
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
        wx.removeStorageSync('session');
        wx.switchTab({
          url: '../index/index'
        });
      }
    });
  },
  onLoad () {
    const openIdUrl = 'https://redrock.cqupt.edu.cn/weapp/auth/getOpenid';

    wx.request({
      method: 'post',
      url: openIdUrl,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        params: encodeFormated(wx.getStorageSync('session'))
      },
      success (res) {
        if (res.data.bags.stuid === 'empty') {
          wx.redirectTo({
            url: '../login/login'
          });
        }
      }
    });

    const tmpInfo = {
      stuid: app.data.stuInfo.stuNum,
      detail_info: [
        {
          name: '学院',
          message: app.data.stuInfo.college
        },
        {
          name: '专业',
          message: app.data.stuInfo.major
        },
        {
          name: '年级',
          message: app.data.stuInfo.grade
        },
        {
          name: '班级',
          message: app.data.stuInfo.classNum
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
      stu_info: tmpInfo
    });
    this.setData({
      avatar: app.data.userInfo.avatar
    });
  }
});
