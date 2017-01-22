// const app = getApp();

Page({
  data: {
    service: [
      '水',
      '电',
      '光源类',
      '木工',
      '电器',
      '泥水',
      '管道疏通',
      '换表',
      '多媒体设备'
    ],
    serviceVal: '请选择服务项目',
    detail: [
      [
        '水龙头',
        '水管',
        '水阀、球阀'
      ],
      [
        '室内用电维修',
        '公共区域用电维修'
      ],
      [
        '路灯',
        '室内照明灯'
      ],
      [
        '门窗、锁',
        '桌、椅、家具',
        '窗帘',
        '黑板',
        '配钥匙'
      ],
      [
        '开关',
        '插座',
        '教室多媒体设备',
        '电风扇',
        '开水器'
      ],
      [
        '土建维修'
      ],
      [
        '疏通'
      ],
      [
        '换水表',
        '换电表',
        '高压表'
      ],
      [
        '教室多媒体设备',
        '投影仪故障',
        '电脑硬件故障',
        '软甲故障',
        '网络故障',
        '音响系统故障',
        '电源故障',
        '其他故障'
      ]
    ],
    detailNum: 0,
    detailVal: '请选择服务项目',
    area: [
      '住宅区',
      '教学区',
      '校园公共区',
      '办公区',
      '学生公寓区'
    ],
    areaVal: '请选择区域',
    name: '桥本奈奈未',
    phone: '',
    place: '',
    title: '',
    text: '',
    // 是否显示已上传图片
    showImg: false,
    // 上传图片地址
    imgSrc: ''
  },
  bindServiceChange (e) {
    this.setData({
      serviceVal: this.data.service[e.detail.value],
      detailNum: e.detail.value
    });
  },
  bindDetailChange (e) {
    this.setData({
      detailVal: this.data.detail[this.data.detailNum][e.detail.value]
    });
  },
  bindAreaChange (e) {
    this.setData({
      areaVal: this.data.area[e.detail.value]
    });
  },
  bindPhone (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  bindPlace (e) {
    this.setData({
      place: e.detail.value
    });
  },
  bindTitle (e) {
    this.setData({
      title: e.detail.value
    });
  },
  bindText (e) {
    this.setData({
      text: e.detail.value
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
    let self = this;
    let data = {
      ip: '',
      name: '',
      stuId: '',
      bt: self.data.title,
      bxdh: self.data.phone,
      bxdd: self.data.place,
      bxnr: self.data.text,
      // 对接口这儿没写完
    };

  }
});
