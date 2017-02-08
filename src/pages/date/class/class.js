Page({
  data: {
    imgUrl: "../../../images",
    hiddenFlag: true,
    array: ['本学期','第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周'],
    index: 0,
    name: "曾玉",
    stuNumber: '2014210104',
    color: [[], [], [], [], [], []],
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
    classWeekday: ['周一','周二','周三','周四','周五','周六','周日'],
    detailWeek: "",
    detailTime: "",
    detailClassname: "",
    detailClassroom: ""
  },
  // 切换周数
  bindPickerChange: function bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    });
    
    console.log(this.data.index);
    this.dataRequest();
    // this.onLoad();
  },
  // setInterval(onLoad,3000);
  onLoad: function onLoad(params) {
    
    // console.log(params);
    // 确定当前周数
    var self = this;
    self.setData({
      stuNumber: params.stuNumber,
      name: params.stuName,
    });
    wx.request({
      url: 'http://hongyan.cqupt.edu.cn/redapi2/api/kebiao',
      method: 'post',
      data: {
        stuNum: self.data.stuNumber,
        idNum: "",
        week: ""
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        self.setData({
          index: res.data.nowWeek
        });
        if(self.data.index >20 ) {
          self.setData({
            index: 0
          });
        }
      // console.log(self.data.index);
      }
    });
    this.dataRequest();
  },
  // 数据请求
  dataRequest: function dataRequest(e) {
    var self = this;
    var dataIndex = parseInt(self.data.index);
    wx.request({
      url: 'http://hongyan.cqupt.edu.cn/redapi2/api/kebiao',
      method: 'post',
      data: {
        stuNum: self.data.stuNumber,
        idNum: "",
        week: dataIndex
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function success(res) {
        console.log(res.data);
        var classData = res.data.data;
        var classLen = classData.length;
        var classWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
        var classTime = ['一二节', '三四节', '五六节', '七八节', '九十节', '十一十二节'];

        var className = [[], [], [], [], [], []];
        var classRoom = [[], [], [], [], [], []];
        var color = [[], [], [], [], [], []];

        // 课表数据绑定
        for (var i = 0; i < classLen; i++) {
          // console.log(classData[i].day);
          for (var t = 0; t < classTime.length; t++) {
            if (classData[i].lesson == classTime[t]) {
              for (var j = 0; j < classWeek.length; j++) {
                if (classData[i].day == classWeek[j]) {
                  className[t][j] = classData[i].course;
                  classRoom[t][j] = classData[i].classroom;
                }
              }
            }
          }
        }
        // 背景颜色绑定
        for (var a = 0; a < classTime.length; a++) {
          for (var b = 0; b < classWeek.length; b++) {
            if (className[a][b] == null) {
              color[a][b] = "#fff";
            }
          }
          // console.log(className);
        }
        // console.log(color);
        // 设置数据
        self.setData({
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
          color: color
        });
        // if (self.data.classRoom.oneT[4] == "") {
        //   self.setData({
        //     className.oneT: className[0]
        //   });
        // }
      }
    });
  },
  // 弹窗出现
  bindAppear: function bindAppear(e) {
    // console.log(e);
    if(e.currentTarget.dataset.classname) {
      this.setData({
        hiddenFlag: !this.data.hiddenFlag,
        detailWeek: e.currentTarget.dataset.classweek,
        detailTime: e.currentTarget.dataset.classtime,
        detailClassname: e.currentTarget.dataset.classname,
        detailClassroom: e.currentTarget.dataset.classroom
      });  
    }
    
  },
  bindDisappear:function bindDisappear(e) {
    this.setData({
      hiddenFlag: !this.data.hiddenFlag
    });
  }
});