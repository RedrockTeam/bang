// const app = getApp();

Page({
  data: {
    apiPrefix: 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/RepairAndSuggest/Repair',
    userInfo: {
      stuNum: 2015211535
      // stuNum: 2014211767
    },
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
      url: `${self.data.apiPrefix}/getRepairDetail`,
      method: 'post',
      data: {
        stunum: self.data.userInfo.stuNum,
        appId: order
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        let data = res.data.data;
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
          image: data.wx_picUrl,
          status: status,
          isFeedback: isFeedback,
          stars: ~~data.wx_hfmyd || 0,
          advise: data.wx_hfjy || ''
        });
        // 更新数据
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
