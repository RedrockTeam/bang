const encodeFormated = require('../../../utils/util').encodeFormated;

Page({
  data: {
    imgUrls: [],
    currentSwiper: 0,
    actType: [
      {
        type: '全部'
      },
      {
        type: '校级'
      },
      {
        type: '院级'
      },
      {
        type: '班级'
      }
    ],
    actIndex: 0,
    actList: [
      {
        title: '活动获取中',
        date: '00/00',
        day: '未定',
        place: '获取中',
        img: ''
      }
    ],
    page: 1
  },
  actTypeChange (e) {
    const key = wx.getStorageSync('session');
    const actType = ['null', 'school', 'academy', 'class'];
    let that = this;
    that.setData({
      actIndex: e.target.dataset.actIndex,
      page: 1
    });
    let type = actType[that.data.actIndex];
    wx.request({
      method: 'post',
      url: 'https://redrock.cqupt.edu.cn/weapp/Activity/Show/getList',
      data: {
        params: encodeFormated(`${key}&${type}&${1}`)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        let newActList = [];
        that.handleData(res.data.bags, newActList);
        that.setData({
          actList: newActList
        });
      }
    });
  },
  swiperBar (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  },
  onLoad (params) {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    this.getData();
  },
  getData () {
    const that = this;
    const key = wx.getStorageSync('session');
    let str = encodeFormated(wx.getStorageSync('session'));

    wx.request({
      method: 'post',
      url: 'https://redrock.cqupt.edu.cn/weapp/Activity/Show/getHeadline',
      data: {
        params: str
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        let newImgUrls = [];
        let type = 'null';
        let str = encodeFormated(`${key}&${type}&${that.data.page}`);
        wx.hideToast();

        for (let item of res.data.bags) {
          newImgUrls.push(item.img);
        }
        that.setData({
          imgUrls: newImgUrls
        });
        wx.request({
          method: 'post',
          url: 'https://redrock.cqupt.edu.cn/weapp/Activity/Show/getList',
          data: {
            params: str
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            let newActList = [];
            that.handleData(res.data.bags, newActList);
            that.setData({
              actList: newActList
            });
          }
        });
      }
    });
  },
  onReachBottom () {
    const that = this;
    const actType = ['null', 'school', 'academy', 'class'];
    let key = wx.getStorageSync('session');
    let type = actType[this.data.actIndex];
    let newActList = that.data.actList;

    that.setData({
      page: that.data.page + 1
    });
    wx.request({
      method: 'post',
      url: 'https://redrock.cqupt.edu.cn/weapp/Activity/Show/getList',
      data: {
        params: encodeFormated(`${key}&${type}&${that.data.page}`)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        if (res.data.bags.length > 0) {
          that.handleData(res.data.bags, newActList);
          that.setData({
            actList: newActList
          });
        } else {
          return;
        }
      }
    });
  },
  handleData (data, newActList) {
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    for (let item of data) {
      let listItem = {};
      let weekDay = week[new Date(item.date).getDay()];
      let dateStr = item.date.split('-')[1];
      dateStr = dateStr + '/' + item.date.split('-')[2];
      listItem.title = item.title;
      listItem.date = dateStr;
      listItem.day = weekDay;
      listItem.place = item.place;
      listItem.img = item.img;
      listItem.id = item.id;
      newActList.push(listItem);
    };
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/page/index/index'
    };
  }
});
