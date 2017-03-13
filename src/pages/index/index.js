const imgPrefix = 'https://redrock.cqupt.edu.cn/weapp/images';
const encodeFormated = require('../../utils/util').encodeFormated;
const apiPrefix = 'https://redrock.cqupt.edu.cn/weapp';
const app = getApp();

Page({
  data: {
    imgUrls: [
      `${imgPrefix}/bannercopy2.png`,
      `${imgPrefix}/bannercopy.png`,
      `${imgPrefix}/banner.png`
    ],
    course: [
      [
        {
          class: '一二节',
          room: '',
          name: '获取中'
        },
        {
          class: '三四节',
          room: '',
          name: '获取中'
        }
      ],
      [
        {
          class: '五六节',
          room: '',
          name: '获取中'
        },
        {
          class: '七八节',
          room: '',
          name: '获取中'
        }
      ],
      [
        {
          class: '九十节',
          room: '',
          name: '获取中'
        },
        {
          class: '十一二',
          room: '',
          name: '获取中'
        }
      ]
    ],
    services: [
      [
        {
          name: '寝室电费',
          url: '../electricity/index/index',
          img: `${imgPrefix}/index__icon-elec.png`
        },
        {
          name: '图书馆',
          url: '../library/myinfor/index/index',
          img: `${imgPrefix}/index__icon-book.png`
        },
        {
          name: '报修服务',
          url: '../repair/index/index',
          img: `${imgPrefix}/index__icon-repair.png`
        },
        {
          name: '失物招领',
          url: '',
          img: `${imgPrefix}/index_icon_-lose.png`
        }
      ],
      [
        {
          name: '没课约',
          url: '../date/index/index',
          img: `${imgPrefix}/index__icon-yue.png`
        },
        {
          name: '成绩查询',
          url: '',
          img: `${imgPrefix}/index__icon-score.png`
        },
        {
          name: '',
          url: '',
          img: ''
        },
        {
          name: '',
          url: '',
          img: ''
        }
      ]
    ],
    week: 0,
    currentSwiper: 0,
    courseScroll: 0
  },
  onLoad () {
    wx.showModal({
      title: '我的->退出->重新登录',
      showCancel: false,
      confirmText: '确认'
    });
    this.setData({
      courseCopy: this.data.course
    });
    wx.showToast({
      title: '数据获取中',
      icon: 'loading',
      duration: 10000
    });
  },
  onShow () {
    const self = this;

    wx.checkSession({
      success () {
        console.log('session 有效，直接登录');
        // 如果微信 session 有效，但是第三方 session过期.
        if (!wx.getStorageSync('session')) {
          app.loginApp().then(() => {
            self.show();
            wx.hideToast();
          });
        } else {
          self.show();
          wx.hideToast();
        }
      },
      fail () {
        console.log('session 无效，需要重新获取');
        app.loginApp().then(() => {
          self.show();
          wx.hideToast();
        });
      }
    });

    try {
      const stuInfo = wx.getStorageSync('stuInfo');
      if (stuInfo) {
        let userInfor = app.data.stuInfo;

        self.setData({
          stuNumber: userInfor.stuNum,
          stuName: userInfor.name
        });
        self.getKebiaoFunc();
      } else {
        console.log('获取学生信息失败1', 111111);
        self.setData({
          course: self.data.courseCopy
        });
        app.gotoLogin();
        return;
      }
    } catch (e) {
      console.log('获取学生信息失败2', 22222222);
      app.getError();
      return;
    }
  },
  show () {
    const self = this;
    let courseTime = 0;
    let currentHour = new Date().getHours();

    if (currentHour >= 12) {
      courseTime = 1;
    }
    if (currentHour >= 18) {
      courseTime = 2;
    }

    self.setData({
      courseScroll: 130 * courseTime
    });
  },
  getKebiaoFunc () {
    let self = this;

    wx.request({
      url: `${apiPrefix}/Course/getKebiao`,
      method: 'post',
      data: {
        params: encodeFormated(`${wx.getStorageSync('session')}&0&empty`)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode !== 200) {
          app.getError();
        }
        if (res.data.status_code === 200) {
          let resData = res.data.bags.courses;
          let day = new Date().getDay() - 1;

          let courseToday = resData.filter((item) => {
            return item.hash_day === day;
          });
          self.setData({
            week: res.data.bags.week
          });
          let courseTmp = [
            [
              {
                class: '一二节',
                room: '',
                name: '没有课'
              },
              {
                class: '三四节',
                room: '',
                name: '没有课'
              }
            ],
            [
              {
                class: '五六节',
                room: '',
                name: '没有课'
              },
              {
                class: '七八节',
                room: '',
                name: '没有课'
              }
            ],
            [
              {
                class: '九十节',
                room: '',
                name: '没有课'
              },
              {
                class: '十一二',
                room: '',
                name: '没有课'
              }
            ]
          ];

          courseToday.map((item, index) => {
            let stageIndex = ~~(item.begin_lesson / 4);
            let detailIndex = (item.begin_lesson % 4 - 1) / 2;
            /**
             * stageIndex: 上午 中午 下午
             * detailIndex: 每个阶段有两节大课
             */
            courseTmp[stageIndex][detailIndex] = {
              class: item.lesson,
              room: item.classroom,
              name: item.course
            };
            if (item.period === 3) {
              courseTmp[stageIndex][detailIndex + 1] = Object.assign(courseTmp[stageIndex][detailIndex + 1], {
                room: item.classroom,
                name: item.course
              });
            }
          });

          self.setData({
            course: courseTmp
          });
        } else {
          console.log('首页获取课表失败1', res.data.status_text);
          wx.hideToast();
          app.gotoLogin();
          return;
        }
        return false;
      },
      fail: function (res) {
        wx.showModal({
          title: '获取课表信息失败，请重试',
          showCancel: false,
          confirmText: '确认'
        });
        console.log('首页获取课表失败2', res);
      },
      complete: res => {
        wx.hideToast();
      }
    });
  },
  swiperBar (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/page/index/index'
    };
  }
});
