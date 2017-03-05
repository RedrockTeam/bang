const encodeFormated = require('../../../utils/util').encodeFormated;

Page({
  data: {
    apiPrefix: 'https://redrock.cqupt.edu.cn/weapp',
    user: '',
    phone: '',
    area: '',
    title: '',
    content: '',
    image: '',
    status: 0,
    isFeedback: false,
    advise: '',
    stars: 0
  },
  onLoad (params) {
    let self = this;
    let order = params.wx_djh;
    wx.showToast({
      title: '数据获取中',
      icon: 'loading',
      duration: 10000
    });
    // 转个菊花

    wx.request({
      url: `${self.data.apiPrefix}/Repair/getDetail`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        params: encodeFormated(`${wx.getStorageSync('session')}&${order}`)
      },
      success (res) {
        if (res.data.status_code === 200) {
          let data = res.data.bags;
          let status = [
            '未审核',
            '已审核',
            '已受理',
            '已派出',
            '已完工',
            '已验收',
            '已驳回',
            '已回访'
          ].indexOf(data.wx_wxztm) || -1;
          let isFeedback = !!(data.wx_hfmyd && data.wx_hfjy);

          wx.hideToast();
          // 菊花转完
          self.setData({
            user: data.wx_bxr,
            phone: data.wx_bxdh,
            area: data.wx_fwqym,
            title: data.wx_bt,
            content: data.wx_bxnr,
            status: status,
            isFeedback: isFeedback,
            stars: ~~data.wx_hfmyd || 0,
            advise: data.wx_hfjy || '',
            imgSrc: data.picUrl
          });
          // 更新数据
        } else {
          console.log('获取报修详情失败1', res.data.status_text);
          wx.showModal({
            title: '网络错误,请重试',
            showCancel: false,
            confirmText: '确认'
          });
        }
      },
      fail (res) {
        console.log('获取报修详情失败2', res);
        wx.showModal({
          title: '网络错误,请重试',
          showCancel: false,
          confirmText: '确认'
        });
      }
    });
  },
  giveStar (e) {
    let self = this;

    self.setData({
      stars: e.target.dataset.starIndex
    });
  },
  sendAdvise (e) {

  }
});
