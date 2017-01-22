// const app = getApp();

Page({
  data: {
    /**
     * [service 服务类型（大范围）]
     * @type {Array}
     */
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
    serviceArr: [
      {
        id: 0,
        name: '水'
      },
      {
        id: 1,
        name: '电'
      },
      {
        id: 2,
        name: '光源类'
      },
      {
        id: 3,
        name: '木工'
      },
      {
        id: 4,
        name: '电器'
      },
      {
        id: 5,
        name: '泥水'
      },
      {
        id: 6,
        name: '管道疏通'
      },
      {
        id: 7,
        name: '换表'
      },
      {
        id: 8,
        name: '多媒体设备'
      }
    ],
    serviceIndex: 0,
    /**
     * [detail 服务类型（小范围）]
     * @type {Array}
     */
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
        '气一号',
        '气二号'
      ]
    ],
    detailArr: [
      [
        {
          id: 0,
          name: '水一号'
        },
        {
          id: 1,
          name: '水二号'
        }
      ],
      [
        {
          id: 0,
          name: '电一号'
        },
        {
          id: 1,
          name: '电二号'
        }
      ],
      [
        {
          id: 0,
          name: '气一号'
        },
        {
          id: 1,
          name: '气二号'
        }
      ]
    ],
    detailIndex: 0,
    /**
     * [area 报修区域]
     * @type {Array}
     */
    area: [
      '一栋',
      '二栋',
      '十五栋'
    ],
    areaArr: [
      {
        id: 0,
        name: '一栋'
      },
      {
        id: 1,
        name: '二栋'
      },
      {
        id: 2,
        name: '十五栋'
      }
    ],
    areaIndex: 0,
    // 是否显示已上传图片
    showImg: false,
    // 上传图片地址
    imgSrc: ''
  },
  bindServiceChange: function (e) {
    this.setData({
      serviceIndex: e.detail.value,
      detailIndex: 0
    });
  },
  bindDetailChange: function (e) {
    this.setData({
      detailIndex: e.detail.value
    });
  },
  bindAreaChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
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
  }
});
