const encodeFormated = require('../../../utils/util').encodeFormated;
const apiPrefix = 'https://redrock.cqupt.edu.cn/weapp';

Page({
  data: {
    imgUrl: 'https://redrock.cqupt.edu.cn/weapp/images',
    hiddenFlag: true,
    array: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周'],
    index: 0,
    name: '',
    stuNumber: '',
    color: [[], [], [], [], [], []],
    height: [[], [], [], [], [], []],
    zIndex: [[], [], [], [], [], []],
    webkitLineClamp: [[], [], [], [], [], []],
    className: {
      oneT: [],
      threeF: [],
      fiveS: [],
      sevenE: [],
      nineT: [],
      elevenT: []
    },
    classRoom: {
      oneT: [],
      threeF: [],
      fiveS: [],
      sevenE: [],
      nineT: [],
      elevenT: []
    },
    classWeekday: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    detailWeek: '',
    detailTime: '',
    detailClassname: '',
    detailClassroom: '',
    getAllClasses: false
  },
  // 切换周数
  bindPickerChange: function bindPickerChange (e) {
    this.setData({
      index: parseInt(e.detail.value) + 1
    });
    this.dataRequest();
  },
  onLoad: function onLoad (params) {
    wx.showToast({
      title: '数据获取中',
      icon: 'loading',
      duration: 10000
    });
    let week = 0;
    if (params.week) {
      week = params.week;
    }
    this.setData({
      stuNumber: params.stuNumber,
      name: params.stuName,
      index: week
    });
    this.dataRequest();
  },
  // 数据请求
  dataRequest: function dataRequest () {
    let self = this;
    wx.request({
      url: `${apiPrefix}/Course/getKebiao`,
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        params: encodeFormated(`${wx.getStorageSync('session')}&${self.data.index}&${self.data.stuNumber}`)
      },
      success: function success (res) {
        if (res.data.status_code.toString() === '200') {
          self.setData({
            index: res.data.bags.week
          });
          let classData = res.data.bags.courses;
          let classLen = classData.length;
          let classWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
          let classTime = ['一二节', '三四节', '五六节', '七八节', '九十节', '十一十二节'];
          let className = [[], [], [], [], [], []];
          let classRoom = [[], [], [], [], [], []];
          let color = [[], [], [], [], [], []];
          let height = [[], [], [], [], [], []];
          let zIndex = [[], [], [], [], [], []];
          let webkitLineClamp = [[], [], [], [], [], []];
          // 课表数据绑定
          for (let i = 0; i < classLen; i++) {
            for (let t = 0; t < classTime.length; t++) {
              if (classData[i].lesson === classTime[t]) {
                for (let j = 0; j < classWeek.length; j++) {
                  if (classData[i].day === classWeek[j]) {
                    className[t][j] = classData[i].course;
                    classRoom[t][j] = classData[i].classroom;
                    if (classData[i].period === 3) {
                      height[t][j] = '265rpx';
                      zIndex[t][j] = 3;
                      webkitLineClamp[t][j] = 6;
                    } else if (classData[i].period === 4) {
                      height[t][j] = '330rpx';
                      zIndex[t][j] = 3;
                      webkitLineClamp[t][j] = 8;
                    }
                  }
                }
              }
            }
          }
          // 背景颜色绑定
          for (let a = 0; a < classTime.length; a++) {
            for (let b = 0; b < classWeek.length; b++) {
              if (!className[a][b]) {
                color[a][b] = '#fff';
              }
            }
          }
          // 设置数据
          self.setData({
            getAllClasses: true,
            'className.oneT': className[0],
            'className.threeF': className[1],
            'className.fiveS': className[2],
            'className.sevenE': className[3],
            'className.nineT': className[4],
            'className.elevenT': className[5],
            'classRoom.oneT': classRoom[0],
            'classRoom.threeF': classRoom[1],
            'classRoom.fiveS': classRoom[2],
            'classRoom.sevenE': classRoom[3],
            'classRoom.nineT': classRoom[4],
            'classRoom.elevenT': classRoom[5],
            color: color,
            height: height,
            zIndex: zIndex,
            webkitLineClamp: webkitLineClamp
          });
        } else {
          console.log('获取课表信息失败1', res.data.status_text);
          wx.showModal({
            title: '网络错误,请重试',
            showCancel: false,
            confirmText: '确认'
          });
        }
      },
      fail: function (res) {
        console.log('获取课表信息失败2', res);
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
  // 弹窗出现
  bindAppear: function bindAppear (e) {
    if (e.currentTarget.dataset.classname) {
      if (e.currentTarget.dataset.classheight === '265rpx') {
        switch (e.currentTarget.dataset.classtime) {
        case '12节':
          e.currentTarget.dataset.classtime = '123节';
          break;
        case '34节':
          e.currentTarget.dataset.classtime = '345节';
          break;
        case '56节':
          e.currentTarget.dataset.classtime = '567节';
          break;
        case '78节':
          e.currentTarget.dataset.classtime = '789节';
          break;
        case '910节':
          e.currentTarget.dataset.classtime = '91011节';
          break;
        default: break;
        }
      } else if (e.currentTarget.dataset.classheight === '330rpx') {
        switch (e.currentTarget.dataset.classtime) {
        case '12节':
          e.currentTarget.dataset.classtime = '1234节';
          break;
        case '34节':
          e.currentTarget.dataset.classtime = '3456节';
          break;
        case '56节':
          e.currentTarget.dataset.classtime = '5678节';
          break;
        case '78节':
          e.currentTarget.dataset.classtime = '78910节';
          break;
        case '910节':
          e.currentTarget.dataset.classtime = '9101112节';
          break;
        default: break;
        }
      }
      this.setData({
        hiddenFlag: !this.data.hiddenFlag,
        detailWeek: e.currentTarget.dataset.classweek,
        detailTime: e.currentTarget.dataset.classtime,
        detailClassname: e.currentTarget.dataset.classname,
        detailClassroom: e.currentTarget.dataset.classroom
      });
    }
  },
  bindDisappear: function bindDisappear (e) {
    this.setData({
      hiddenFlag: !this.data.hiddenFlag
    });
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/page/index/index'
    };
  }
});
