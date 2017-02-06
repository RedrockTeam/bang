import utils from '../utils/utils';
Page({
  data: {
    title: 'rank',
    rankList: [],
    rankListImgSrc: ['gold_icon', 'silver_icon', 'copper_icon'],
    myinforItemsFocusIndex: 0
  },
  onLoad () {
    this.setData({
      rankList: [{
        name: '李立平',
        number: '正在借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '计算机学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '历史借阅 ' + 2,
        academy: '通信与信息工程学院'
      }, {
        name: '李立平',
        number: '欠费书目 ' + 2,
        academy: '通信与信息工程学院'
      }]
    });
  },
  gotoSearch: utils.gotoSearch
});
