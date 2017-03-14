const app = getApp();
const urlPrefix = 'https://redrock.cqupt.edu.cn/weapp';
const encodeFormated = require('../../../utils/util').encodeFormated;

/* toggleSearchIcon 点击搜索框切换搜索🔍图标显示
* search_focus:  是否输入了字符
*/
const toggleSearchIcon = function (event) {
  let value = event.detail.value;
  if (value === '') {
    this.setData({
      search_focus: false
    });
  } else {
    this.setData({
      search_focus: true
    });
  }
};
/* gotoSearch 搜索： 输入完成后的点击确认时的跳转
* value： 搜索的内容
* flag: 是否为第一次搜索，在search.xml中设置(true)。如果是，则跳转，否则则重定向，避免无限搜索，无限返回
*/
const gotoSearch = function (event) {
  let value = event.detail.value;
  let flag = event.currentTarget.dataset.flag;
  if (!flag) {
    wx.navigateTo({
      url: `/pages/library/search/search?value=${value}`
    });
  } else {
    wx.redirectTo({
      url: `/pages/library/search/search?value=${value}`
    });
  }
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
    url: urlPrefix + '/Library/getBookInfo',
    method: 'POST',
    data: {
      params: encodeFormated(`${wx.getStorageSync('session')}&${searchValue}`)
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: res => {
      if (res.data.status_code.toString() === '200') {
        self.setData({
          searchItems: res.data.bags
        });
        wx.hideToast();
      } else {
        console.log('网络错误!搜索失败1: ', res.data.status_text);
        app.gotoLogin();
      }
    },
    fail: res => {
      console.log('搜索失败2: ', res);
      app.gotoLogin();
    }
  });
};
/* getBookInfor 获取读者的信息，借阅数目数量和目前欠费的金额
*
* tag: 三个栏目（正在借阅，历史借阅，欠费书目）
*/
const getBookInfor = function (self, tag) {
  wx.request({
    url: urlPrefix + '/Library/getUserInfo',
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      params: encodeFormated(wx.getStorageSync('session'))
    },
    success: res => {
      res = res.data;
      if (res.status_code.toString() === '200') {
        let data = res.bags;
        let bookItems = data[tag];
        let readerInfo = data.readerInfo;

        self.setData({
          bookItems,
          readerInfo
        });
        wx.hideToast();
        wx.setStorage({
          key: 'myinfor_library',
          data: data
        });
      } else {
        console.log('获取图书馆信息(我的信息)失败1: ', res.status_text);
        app.gotoLogin();
      }
    },
    fail: res => {
      console.log('获取图书馆信息(我的信息)失败2：', res);
      app.gotoLogin();
    }
  });
};
// getBookInfor 获取图书借阅排名
const getRankList = function (self) {
  wx.request({
    url: urlPrefix + '/Library/getBoard',
    method: 'POST',
    data: {
      params: encodeFormated(wx.getStorageSync('session'))
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: res => {
      if (res.data.status_code.toString() === '200') {
        let rankList = res.data.bags;

        self.setData({
          rankList: rankList
        });
        wx.setStorage({
          key: 'rankList_library',
          data: rankList
        });
      } else {
        console.log('获取图书馆排名失败：', res.data.status_text);
        app.gotoLogin();
      }
      wx.hideToast();
    },
    fail: res => {
      console.log('获取图书馆排名失败：', res);
      app.gotoLogin();
    }
  });
};

module.exports = {
  gotoSearch,
  getBookInfor,
  getRankList,
  getSearchResult,
  toggleSearchIcon
};
