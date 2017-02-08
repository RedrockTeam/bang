// const app = getApp();

Page({
  data: {
    imgUrl: "../../../images",
    hiddenFlag: true,
    array: ['本学期','第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周', '第十九周', '第二十周'],
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
    classWeekday: ['周一','周二','周三','周四','周五','周六','周日'],
    detailWeek: "",
    detailTime: "",
    detailClassname: [],
  },
  // 改变周数
  bindPickerChange: function bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    });
    
    // console.log(this.data.index);
    this.dataRequest();
  },
  onLoad: function onLoad(params) {
    let self = this;
    // 获取缓存数据
    wx.getStorage({
      key: 'key',
      success: function(res) {
        console.log(res.data);
        self.setData({
          stuName: res.data.stuName,
          stuNumber: res.data.stuNum
        });
        // 确定当前周数
        console.log(self.data.stuNumber[0]);
        wx.request({
          url: 'http://hongyan.cqupt.edu.cn/redapi2/api/kebiao',
          method: 'post',
          data: {
            stuNum: self.data.stuNumber[0],
            idNum: "",
            week: ""
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res.data);
            self.setData({
              index: res.data.nowWeek
            });
            if(self.data.index >20 ) {
              self.setData({
                index: 0
              });
            }
            
          }
        });
        self.dataRequest();
      } 
    });
    
  },
  // 数据请求
  dataRequest: function dataRequest(e) {
    let self = this;
    let dataIndex = parseInt(self.data.index);
    console.log(self.data.stuName.length);
    let className = [[], [], [], [], [], []];     
    
    for(let stuI = 0; stuI < self.data.stuNumber.length; stuI++) {
      wx.request({
        url: 'http://hongyan.cqupt.edu.cn/redapi2/api/kebiao',
        method: 'post',
        data: {
          stuNum: self.data.stuNumber[stuI],
          idNum: "",
          week: dataIndex
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function success(res) {
          console.log(res.data);
          let classData = res.data.data;
          let classLen = classData.length;
          let classWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
          let classTime = ['一二节', '三四节', '五六节', '七八节', '九十节', '十一十二节'];
          let temclassName = [[], [], [], [], [], []];
          

          // 课表数据绑定

          for (let i = 0; i < classLen; i++) {
          // console.log(classData[i].day);
            for (let t = 0; t < classTime.length; t++) {
              if (classData[i].lesson == classTime[t]) {
                for (let j = 0; j < classWeek.length; j++) {
                  if (classData[i].day == classWeek[j]) {
                    temclassName[t][j] = "";
                  }
                }
              }
            }
          }
          // console.log(temclassName);
          
          for (let a = 0; a < classTime.length; a++) {
            for (let b = 0; b < classWeek.length; b++) {
              if(temclassName[a][b] != "") {
                if(className[a][b]) {
                  className[a][b].push(self.data.stuName[stuI]);
                } else {
                  className[a][b] = new Array();
                  className[a][b].push(self.data.stuName[stuI]);
                }
                
              }
            } 
          }
          // console.log(className);
          let color = [[], [], [], [], [], []];
          for(let colorI = 0; colorI < 6; colorI++) {
            for(let colorJ = 0; colorJ < 7; colorJ++) {
              // console.log(typeof className[colorI][colorJ]);
              if(!(className[colorI][colorJ] instanceof Object)) {
                color[colorI][colorJ] = "#fff";
              }
            }
          }
          self.setData({
            'className.oneT': className[0],
            'className.threeF': className[1],
            'className.fiveS': className[2],
            'className.sevenE': className[3],
            'className.nineT': className[4],
            'className.elevenT': className[5],
            color: color
          });
        }

      });  
    }
    // console.log(className);
    
    // console.log(color);
     
    
    
  },
  bindAppear: function bindAppear(e) {
    console.log(e);
    if(e.currentTarget.dataset.classname) {
      this.setData({
        hiddenFlag: !this.data.hiddenFlag,
        detailWeek: e.currentTarget.dataset.classweek,
        detailTime: e.currentTarget.dataset.classtime,
        detailClassname: e.currentTarget.dataset.classname,
        
      });  
    }
    
  },
  bindDisappear:function bindDisappear(e) {
    this.setData({
      hiddenFlag: !this.data.hiddenFlag
    });
  },
  
});
