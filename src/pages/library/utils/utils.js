/* gotoSearch 搜索： 输入完成后的点击确认时的跳转
* value： 搜索的内容
*/
const gotoSearch = function (event) {
  let value = event.detail.value;
  wx.redirectTo({
    url: `/pages/library/search/search?value=${value}`
  });
};
/* gotoSearch 搜索： 搜索结果及渲染
*
* searchValue 搜索的内容
*/
const getSearchResult = function (self, searchValue) {
  wx.showToast({
    title: '搜索中',
    duration: 10000,
    icon: 'loading'
  });
  wx.request({
    url: 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/ApiForWx/GetLibInfo/getBookInfo',
    method: 'POST',
    data: {
      content: searchValue
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: res => {
      if (res.statusCode === 200) {
        console.log(res.data.data);
        self.setData({
          searchItems: res.data.data.data
        });
        wx.hideToast();
      } else {
        console.log('网络错误!2');
      }
    },
    fail: () => {
      console.log('网络错误!3_ 搜索');
    }
  });
}
/* getBookInfor
*
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
        let data = res.data.data;
        let bookItems = data[tag];
        let readerInfo = data.readerInfo;
        self.setData({
          bookItems: bookItems,
          readerInfo: readerInfo
        });
        wx.hideToast();
        wx.setStorage({
          key: 'myinfor_library',
          data: data
        });
        wx.clearStorage();
      }
    },
    fail: res => {
      console.log('fail to get user information of library：', res);
    }
  });
};

const getRankList = function (self) {
  wx.request({
    url: 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/ApiForWx/GetLibInfo/getBoard',
    method: 'POST',
    success: res => {
      let rankList = res.data.data;

      self.setData({
        rankList: rankList
      });
      wx.hideToast();
      wx.setStorage({
        key: 'rankList_library',
        data: rankList
      });
    }
  });
}

module.exports = {
  gotoSearch: gotoSearch,
  getBookInfor: getBookInfor,
  getRankList: getRankList,
  getSearchResult: getSearchResult
};
