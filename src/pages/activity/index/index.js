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
  }
});
