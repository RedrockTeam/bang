// const app = getApp();
let imgPrefix = 'https://app.liuwenxi.me/';
Page({
  data: {
    logout: imgPrefix + 'logout.png',
    stu_info: {
      stuid: 2014212818,
      detail_info: [
        {
          name: '学院',
          message: '自动化学院'
        },
        {
          name: '专业',
          message: '自动化卓越工程师班'
        },
        {
          name: '年级',
          message: '2014级'
        },
        {
          name: '班级',
          message: '0891401班'
        }
      ],
      room_feedback_info: [
        {
          name: '寝室信息',
          message: '22栋(兴业苑6栋)',
          url: imgPrefix + 'arrow.png'
        },
        {
          name: '意见反馈',
          message: '',
          url: imgPrefix + 'arrow.png'
        }
      ]
    }
  },
  onLoad () {
    // TODO: onLoad
  },
  onReady () {
    // TODO: onReady
  },
  onShow () {
    // TODO: onShow
  },
  onHide () {
    // TODO: onHide
  },
  onUnload () {
    // TODO: onUnload
  }
});
