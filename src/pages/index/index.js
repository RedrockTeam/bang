const imgPrefix = 'http://kjcx.yaerma.com/static/imgs/wxapp/images';
const app = getApp();

Page({
  data: {
    imgUrls: [
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    course: [
      [
        {
          class: '一二节',
          room: '3108',
          name: '线性代数实验课'
        },
        {
          class: '三四节',
          room: '3108',
          name: '信号与系统'
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
          room: '3108',
          name: '信号与系统'
        }
      ],
      [
        {
          class: '九十节',
          room: '3108',
          name: '线性代数'
        },
        {
          class: '十一二',
          room: '3108',
          name: '信号与系统'
        }
      ]
    ],
    services: [
      [
        {
          name: '寝室电费',
          url: '',
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
          img: `${imgPrefix}/index__icon-laf.png`
        }
      ],
      [
        {
          name: '没课约',
          url: '',
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
    week: 10,
    currentSwiper: 0
  },
  onShow () {
    let courseUrl = 'http://hongyan.cqupt.edu.cn/redapi2/api/kebiao';
    let userInfo = app.getUserInfo();

    console.log(userInfo);

    wx.showToast({
      title: '数据获取中',
      icon: 'loading',
      duration: 10000
    });
    // 转个菊花

    wx.request({
      url: courseUrl,
      method: 'post',
      data: {
        stuNum: 2014211766,
        idNum: 232935,
        week: 16
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // let resData = res.data.data;
        // let day = new Date().getDay() - 1;
        // let courseToday = resData.filter((item) => {
        //   return item.hash_day === day;
        // });

        wx.hideToast();
        // 菊花转完
      }
    });
  },
  swiperBar (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  }
});
