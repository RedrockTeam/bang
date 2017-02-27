const encodeFormated = require('../../../utils/util').encodeFormated;

Page({
  data: {
    title: ['谁是属于重邮的“小杏韵”？', '快来一起寻找吧!'],
    acInfo: {
      data: '01/17',
      place: '太极运动场',
      img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      context: '写点什么写点什么参与方式面向同学们征集银杏主题的照片方式一：女生在银杏树下的留影方式二：女生拿着银杏叶在重邮内的留影方式三：用银杏叶摆出某种图案后与之留影照片下面附上自己对重邮的秋日寄语，字数在30字以内，照片+文字以姓名，学号，学院，联系方式打包发送至 i@redrock.com评选方式初选由摄影协会在投稿中选取20份优秀作品并由重邮小帮手微信公众号完成后期的线上投票评选票选出一、二、三等奖和人气奖奖项设置 一等奖：500G移动硬盘  二等奖：20000mAh移动电源 个/名  三等奖：小台灯 个/名 人气奖：耳机 个/名'
    }
  },
  onLoad (params) {
    const key = wx.getStorageSync('session');
    let act_id = params.act_id;
    wx.request({
      method: 'post',
      url: 'https://redrock.cqupt.edu.cn/weapp/Activity/Show/getInfoById`',
      data: {
        params: encodeFormated(`${key}&${act_id}`)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log(res);
      }
    })
  }
});
