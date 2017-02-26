const encodeFormated = require('../../../utils/util').encodeFormated;
Page({
  data: {
    imgUrls: [
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
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
    actIndex: 1,
    actList: [
      {
        title: '双旦快乐，今年过节，我们只玩重邮消消乐',
        date: '06/15',
        day: '周三',
        place: '太极运动场',
        img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      },
      {
        title: '谁是属于重邮的『小杏韵』？快来一起寻找吧！',
        date: '06/15',
        day: '周三',
        place: '太极运动场',
        img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      },
      {
        title: '双旦快乐，今年过节，我们只玩重邮消消乐',
        date: '06/15',
        day: '周三',
        place: '太极运动场',
        img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ]
  },
  actTypeChange (e) {
    this.setData({
      actIndex: e.target.dataset.actIndex
    });
  },
  swiperBar (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  },
  onLoad () {
    this.getData();
  },
  getData () {
    const that = this;
    const key = wx.getStorageSync('session');
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var str = encodeFormated(wx.getStorageSync('session'));

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
        var newImgUrls = [];
        var type = 'school',
            page = 1;
        var str = encodeFormated(`${key}&${type}&${page}`);
        for (var item of res.data.bags) {
          newImgUrls.push(item.img);
        }
        that.setData({
          imgUrls: newImgUrls
        })
        console.log(newImgUrls);
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
            var newActList = [];
            for (var item of res.data.bags) {
              var listItem = {};
              var weekDay = week[new Date(item.date).getDay()];
              var dateStr = item.date.split('-')[1];
              if (dateStr < 10) {
                dateStr = '0' + dateStr;
              }
              dateStr = dateStr + '/' +item.date.split('-')[2];
              listItem.title = item.title;
              listItem.date = dateStr;
              listItem.day = weekDay;
              listItem.place = item.place;
              listItem.img = item.img;
              newActList.push(listItem);
            }
            that.setData({
              actList: newActList
            });
          }
        })
      }
    })
  }
});
