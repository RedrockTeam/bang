const encodeFormated = require('../../../utils/util').encodeFormated;
const apiPrefix = 'https://redrock.cqupt.edu.cn/weapp';
// const app = getApp();

Page({
  data: {
    imgUrl: 'https://redrock.cqupt.edu.cn/weapp/images',
    hiddenFlag: true,
    array: ['本学期', '第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周'],
    index: 0,
    color: [[], [], [], [], [], []],
    className: {
      oneT: [],
      threeF: [],
      fiveS: [],
      sevenE: [],
      nineT: [],
      elevenT: []
    },
    stuNumber: [],
    stuName: [],
    classWeekday: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    detailWeek: '',
    detailTime: '',
    detailClassname: [],
    getAllClasses: false
  },
  // 改变周数
  bindPickerChange: function bindPickerChange (e) {
    this.setData({
      index: e.detail.value
    });
    this.dataRequest();
  },
  onLoad: function onLoad (params) {
    let self = this;
    // 获取缓存数据
    wx.showToast({
      title: '数据获取中',
      icon: 'loading',
      duration: 10000
    });
    wx.getStorage({
      key: 'key',
      success: function (res) {
        self.setData({
          stuName: res.data.stuName,
          stuNumber: res.data.stuNum
        });
        // console.log()
        self.dataRequest();
      }
    });
  },
  // 数据请求
  dataRequest: function dataRequest (e) {
    let self = this;
    let dataIndex = parseInt(self.data.index);
    if (!dataIndex) {
      dataIndex = 0;
    }
    let className = [[], [], [], [], [], []];
    for (let stuI = 0; stuI < self.data.stuNumber.length; stuI++) {
      wx.request({
        url: `${apiPrefix}/Course/getKebiao`,
        method: 'post',
        data: {
          params: encodeFormated(`${wx.getStorageSync('session')}&${dataIndex}&${self.data.stuNumber[stuI]}`)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function success (res) {
          self.setData({
            index: res.data.bags.week
          });
          let classData = res.data.bags.courses;
          let classLen = classData.length;
          let classWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
          let classTime = ['一二节', '三四节', '五六节', '七八节', '九十节', '十一十二节'];
          let temclassName = [[], [], [], [], [], []];
          // 课表数据绑定
          for (let i = 0; i < classLen; i++) {
            for (let t = 0; t < classTime.length; t++) {
              if (classData[i].lesson === classTime[t]) {
                for (let j = 0; j < classWeek.length; j++) {
                  if (classData[i].day === classWeek[j]) {
                    temclassName[t][j] = '';
                  }
                }
              }
            }
          }
          for (let a = 0; a < classTime.length; a++) {
            for (let b = 0; b < classWeek.length; b++) {
              if (temclassName[a][b] !== '') {
                if (className[a][b]) {
                  className[a][b].push(self.data.stuName[stuI]);
                } else {
                  className[a][b] = [];
                  className[a][b].push(self.data.stuName[stuI]);
                }
              }
            }
          }
          let color = [[], [], [], [], [], []];
          for (let colorI = 0; colorI < 6; colorI++) {
            for (let colorJ = 0; colorJ < 7; colorJ++) {
              if (!(className[colorI][colorJ] instanceof Object)) {
                color[colorI][colorJ] = '#fff';
              }
            }
          }
          self.setData({
            getAllClasses: true,
            'className.oneT': className[0],
            'className.threeF': className[1],
            'className.fiveS': className[2],
            'className.sevenE': className[3],
            'className.nineT': className[4],
            'className.elevenT': className[5],
            color: color
          });
        },
        fail: res => {
          console.log('获取无课表信息失败2', res);
          wx.showModal({
            title: '网络错误,请重试',
            showCancel: false,
            confirmText: '确认'
          });
        },
        complete: res => {
          wx.hideToast();
        }
      });
    }
  },
  bindAppear: function bindAppear (e) {
    if (e.currentTarget.dataset.classname) {
      this.setData({
        hiddenFlag: !this.data.hiddenFlag,
        detailWeek: e.currentTarget.dataset.classweek,
        detailTime: e.currentTarget.dataset.classtime,
        detailClassname: e.currentTarget.dataset.classname
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
