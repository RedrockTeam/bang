const app = getApp();
const urlPrefix = 'https://redrock.cqupt.edu.cn/weapp';
const encodeFormated = require('../../../utils/util').encodeFormated;

/* searchIconFocus, searchIconBlur 点击搜索框切换搜索🔍图标显示
* search_input_focus:  是否输入了字符
*/
const setSearchValue = function (event) {
  let value = event.detail.value.trim();
  this.setData({
    searchValue: value
  });
};
const searchIconFocus = function () {
  this.setData({
    search_input_focus: true
  });
};
const searchIconBlur = function (event) {
  let value = event.detail.value;
  if (!value) {
    this.setData({
      search_input_focus: false
    });
  }
};
/* gotoSearch 搜索： 输入完成后的点击确认时的跳转
* value： 搜索的内容
* flag: 是否为第一次搜索，在search.xml中设置(true)。如果是，则跳转，否则则重定向，避免无限搜索，无限返回
*/
const gotoSearch = function (event) {
  let value = this.data.searchValue;
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
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: res => {
      self.setData({
        searchItems: res.data.bags
      });
      wx.hideToast();
    },
    fail: res => {
      console.log('获取搜索书目信息失败', res);
      wx.showModal({
        title: '网络错误,请重试',
        showCancel: false,
        confirmText: '确认'
      });
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
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      params: encodeFormated(wx.getStorageSync('session'))
    },
    success: res => {
      res = res.data;
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
    },
    fail: res => {
      console.log('获取我的信息失败-图书馆', res);
      wx.showModal({
        title: '网络错误,请重试',
        showCancel: false,
        confirmText: '确认'
      });
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
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: res => {
      let rankList = res.data.bags;

      self.setData({
        rankList: rankList
      });
      wx.setStorage({
        key: 'rankList_library',
        data: rankList
      });
      wx.hideToast();
    },
    fail: res => {
      console.log('获取图书馆排名信息失败', res);
      wx.showModal({
        title: '网络错误,请重试',
        showCancel: false,
        confirmText: '确认'
      });
    }
  });
};

module.exports = {
  gotoSearch,
  getBookInfor,
  getRankList,
  getSearchResult,
  setSearchValue,
  searchIconFocus,
  searchIconBlur
};
