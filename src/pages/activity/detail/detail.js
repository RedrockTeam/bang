const encodeFormated = require('../../../utils/util').encodeFormated;

Page({
  data: {
    title: '谁是属于重邮的“小杏韵”？快来一起寻找吧!',
    actInfo: {
      data: '01/17',
      place: '太极运动场',
      img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      detail: '写点什么写点什么参与方式面向同学们征集银杏主题的照片方式一：女生在银杏树下的留影方式二：女生拿着银杏叶在重邮内的留影方式三：用银杏叶摆出某种图案后与之留影照片下面附上自己对重邮的秋日寄语，字数在30字以内，照片+文字以姓名，学号，学院，联系方式打包发送至 i@redrock.com评选方式初选由摄影协会在投稿中选取20份优秀作品并由重邮小帮手微信公众号完成后期的线上投票评选票选出一、二、三等奖和人气奖奖项设置 一等奖：500G移动硬盘  二等奖：20000mAh移动电源 个/名  三等奖：小台灯 个/名 人气奖：耳机 个/名'
    }
  },
  onLoad (par) {
    const that = this;
    const key = wx.getStorageSync('session');
    let actId = par.act_id;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    wx.request({
      method: 'post',
      url: 'https://redrock.cqupt.edu.cn/weapp/Activity/Show/getInfoById',
      data: {
        params: encodeFormated(`${key}&${actId}`)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        let newActInfo = {};
        let dateStr = res.data.bags[0].date.split('-')[1];
        wx.hideToast();
        if (dateStr < 10) {
          dateStr = '0' + dateStr;
        }
        dateStr = dateStr + '/' + res.data.bags[0].date.split('-')[2];
        newActInfo.img = res.data.bags[0].img;
        newActInfo.date = dateStr;
        newActInfo.place = res.data.bags[0].place;
        newActInfo.detail = res.data.bags[0].detail;
        that.setData({
          title: res.data.bags[0].title,
          actInfo: newActInfo
        });
        console.log(res.data);
      }
    });
  }
});
