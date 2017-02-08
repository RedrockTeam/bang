

Page({
  data: {
    imgUrl: "../../../images",
    firstHidden: true,
    deleteHidden: true,
    resultHidden: true,
    nobodyHidden: false,
    somebodyHidden: true,
    coverHidden: true,  
    searchResult: {
      stuName: [],
      stuNum: [],
    },
    inputValue: "",
    resultHight: "",
    addStu: {
      stuName: [],
      stuNum: [],
      stuMajor: [],
      stuClass: [],
    },
    anotherAdd: 6,
  },
  onLoad (params) {
    var self = this;
    wx.request({
      url: 'http://hongyan.cqupt.edu.cn/api/stuinfo',
      method: 'get',
      data: {
        searchKey: '2014210104'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data);
      // console.log(self.data.index);
      }
    });
  },
  bindinputChange: function bindinputChange(e) {
    var value = e.detail.value;
    // console.log(value);
    this.setData({
      inputValue: value,
    });
  },
  searchTap: function searchTap(e) {
    var self = this;
    var stuName = [];
    var stuNum = [];
    wx.showToast({
      title: '数据获取中',
      icon: 'loading',
      duration: 5000
    });
    
    wx.request({
      url: 'http://hongyan.cqupt.edu.cn/api/stuinfo',
      method: 'get',
      data: {
        searchKey: self.data.inputValue
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var result = res.data.data;
        console.log(res.data.data);
        for(var resultI = 0; resultI < result.length; resultI++) {
          stuName.push(res.data.data[resultI].name);
          stuNum.push(res.data.data[resultI].stuNum);
        }
        if(result.length >=7 ) {
          self.setData({
            resultHight: "710rpx",
          });
        } else {
          self.setData({
            resultHight: "",
          });
        }
        // console.log(stuName);
        // console.log(stuNum);
        self.setData({
          'searchResult.stuName': stuName,
          'searchResult.stuNum': stuNum,
          resultHidden: false,
        });
      // console.log(self.data.index);
      }
    });
  },
  addstuName: [],
  addstuNum: [],
  addstuMajor: [],
  addstuClass: [],
  bindtapAdd: function bindtapAdd(e) {
    var self = this;
    wx.showToast({
      title: '数据获取中',
      icon: 'loading',
      duration: 5000
    });
    self.setData({
      nobodyHidden: true,
      somebodyHidden: false,
      resultHidden: true,
    });
    console.log(e.currentTarget.dataset.stunum);
    wx.request({
      url: 'http://hongyan.cqupt.edu.cn/api/stuinfo',
      method: 'get',
      data: {
        searchKey: e.currentTarget.dataset.stunum
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data);
        self.addstuName.push(res.data.data[0].name);
        self.addstuNum.push(res.data.data[0].stuNum);
        self.addstuMajor.push(res.data.data[0].college);
        self.addstuClass.push(res.data.data[0].class);
        self.setData({
          'addStu.stuName': self.addstuName,
          'addStu.stuNum': self.addstuNum,
          'addStu.stuMajor': self.addstuMajor,
          'addStu.stuClass': self.addstuClass,
          anotherAdd: self.data.anotherAdd - 1,
        });
        console.log(self.addstuName.length);
        if(self.addstuName.length == 6) {
          self.setData({
            coverHidden: false,
          });
        } else {
          self.setData({
            coverHidden: true,
          });
        }
        console.log(res.data.data[0].name);
      }
    });
  },
  bindtapData: function bindtapData(e) {
    var stuData = this.data.addStu;
    console.log(this.data.addStu);
    wx.setStorage({
      key:"key",
      data: stuData,
    });
    if(this.addstuName.length == 0) {
      this.setData({
        firstHidden: false,
      });
    } else {
      wx.navigateTo({
        url: '../result/result',
      });
    }
  },
  bindtapClass: function bindtapClass(e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
        url: '../class/class?stuNumber=' + e.currentTarget.dataset.stunumber + '&stuName=' + e.currentTarget.dataset.stuname,
      });
  },
  bindtapaddSure: function bindtapaddSure(e) {
    this.setData({
        firstHidden: true,
      });
  },
});
