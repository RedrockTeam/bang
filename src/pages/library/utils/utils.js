const gotoSearch = function (event) {
  let value = event.detail.value;
  wx.redirectTo({
    url: `/pages/library/search/search?value=${value}`
  });
  // wx.request({
  //   url: '',
  //   method: 'POST',
  //   data: value,
  //   success: res => {
  //     if (res.statusCode === 200) {
  //       if (res.data.status === 200) {
  //         console.log(res.data.data);
  //       } else {
  //         console.log('网络错误!');
  //       }
  //     } else {
  //       console.log('网络错误!');
  //     }
  //   }
  // });
};
/*
* self: this
* tag: 三个栏目（正在借阅，历史借阅，欠费书目）
*/
const getBookInfor = function (self, tag) {
  wx.request({
    url: 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/ApiForWx/GetLibInfo/getUserInfo',
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      stuId: 2015210342
    },
    success: res => {
      if (res.statusCode === 200) {
        if (parseInt(res.data.status) === 200) {
          let data = res.data.data;
          let bookItems = data[tag];
          self.setData({
            bookItems: bookItems
          });
          wx.setStorage({
            key: 'myinfor_library',
            data: data
          });
          // wx.clearStorage();
        }
      }
    },
    fail: res => {
      console.log('fail to get user information of library：', res);
    }
  });
};

module.exports = {
  gotoSearch: gotoSearch,
  getBookInfor: getBookInfor
};
