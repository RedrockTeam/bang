const encodeFormated = require('../../../utils/util').encodeFormated;

Page({
  data: {
    type: [
      '校级',
      '院级',
      '班级'
    ],
    typeIndex: 0,
    isHeadline: false,
    place: '',
    title: '',
    host: '',
    detail: '',
    phone: '',
    date: '请选择时间',
    // 是否显示已上传图片
    showImg: false,
    // 上传图片地址
    imgSrc: ''
  },
  typeChange (e) {
    this.setData({
      typeIndex: e.target.dataset.typeIndex
    });
  },
  headlineChange (e) {
    this.setData({
      isHeadline: !this.data.isHeadline
    });
    console.log(this.data.isHeadline);
  },
  bindPlace (e) {
    this.setData({
      place: e.detail.value
    });
  },
  bindDate (e) {
    this.setData({
      date: e.detail.value
    });
  },
  bindTitle (e) {
    this.setData({
      title: e.detail.value
    });
  },
  bindDetail (e) {
    this.setData({
      detail: e.detail.value
    });
  },
  bindHost (e) {
    this.setData({
      host: e.detail.value
    });
  },
  bindPhone (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  uploadImg: function () {
    let self = this;

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;

        self.setData({
          showImg: true,
          imgSrc: tempFilePaths[0]
        });
      }
    });
  },
  // 差一个上传图片的接口
  submitApply () {
    let data = {
      type: this.data.typeIndex,
      headline: this.data.isHeadline,
      place: this.data.place,
      host: this.data.host,
      title: this.data.title,
      detail: this.data.detail,
      date: this.data.date,
      phone: this.data.phone,
      imgSrc: this.data.imgSrc
    };
    const actType = ['school', 'academy', 'class'];
    const key = wx.getStorageSync('session');
    wx.uploadFile({
      url: 'https://redrock.cqupt.edu.cn/weapp/Activity/Apply/fileUpload',
      filePath: data.imgSrc,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        key: key,
        file: data.imgSrc
      },
      success (res) {
        let path = JSON.parse(res.data).bags.path;
        let str = encodeFormated(`${key}&${data.title}&${data.host}&${data.date}&${data.place}&${actType[data.type]}&${data.headline}&${data.detail}&${data.phone}&${path}`);
        wx.request({
          method: 'post',
          url: 'https://redrock.cqupt.edu.cn/weapp/Activity/Apply/upload',
          data: {
            params: str
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            console.log(res.data);
            wx.redirectTo({
              url: '../info/info'
            });
          }
        });
      }
    });
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/page/index/index'
    };
  }
});
