const app = getApp();
let imgPrefix = 'https://app.liuwenxi.me/';
const encodeFormated = require('../../utils/util').encodeFormated;

Page({
  data: {
    logout: imgPrefix + 'logout.png',
    avatar: '',
    stu_info: {
      stuName: '',
      stuid: '',
      detail_info: [
        {
          name: '学院',
          message: ''
        },
        {
          name: '专业',
          message: ''
        },
        {
          name: '年级',
          message: ''
        },
        {
          name: '班级',
          message: ''
        }
      ],
      room_feedback_info: [
        {
          name: '意见反馈',
          message: '',
          url: imgPrefix + 'arrow.png'
        }
      ]
    }
  },
  onLoad () {
    this.setData({
      stu_info_copy: this.data.stu_info
    });
  },
  feedback () {
    wx.showModal({
      title: '请加入重邮帮',
      content: '我们的反馈QQ群： 470455840',
      showCancel: false,
      confirmText: '确认'
    });
  },
  logoutAction () {
    wx.request({
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://redrock.cqupt.edu.cn/weapp/bind/cancleBind',
      data: {
        params: encodeFormated(wx.getStorageSync('session'))
      },
      success: function (res) {
        wx.clearStorage();
        if (res.data.status_code.toString() !== '200') {
          return;
        }
        wx.showModal({
          title: '退出成功，点击返回',
          showCancel: false,
          confirmText: '确认',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../index/index'
              });
            }
          }
        });
      }
    });
  },
  setStuInfo (stuInfo) {
    const academyObj = {
      '0101': '通信工程',
      '0102': '电子信息工程',
      '0104': '信息工程',
      '0105': '广播电视工程',
      '0190': '通信工程专业卓越工程师班',
      '0191': '通信学院IT精英班',
      '0192': '通信工程国际实验班',
      '0115': '广电与数字媒体类',
      '0114': '通信与信息类',
      '0205': '光电信息科学与工程',
      '0203': '电子科学与技术',
      '0204': '电磁场与无线技术',
      '0103': '电子信息科学与技术',
      '0211': '电子工程类',
      '0202': '微电子科学与工程',
      '0301': '信息管理与信息系统',
      '0313': '物流管理',
      '0302': '会计学',
      '0303': '经济学',
      '0304': '市场营销',
      '0305': '工商管理',
      '0306': '电子商务',
      '0308': '工程管理',
      '0392': '市场营销专业实验班',
      '0393': '信息管理与商务智能创新实验班',
      '0318': '国际化会计人才培养实验班',
      '0312': '工商管理类',
      '0316': '电子商务类',
      '0401': '计算机科学与技术',
      '0406': '地理信息科学',
      '0403': '网络工程',
      '0404': '信息安全',
      '0405': '智能科学与技术',
      '0491': '计算机科学与技术专业卓越工程师班',
      '0407': '空间信息与数字技术',
      '0492': '信息安全专业卓越工程师班',
      '0412': '计算机与智能科学类',
      '0502': '翻译',
      '0501': '英语',
      '0511': '英语类',
      '0601': '生物医学工程',
      '0604': '制药工程',
      '0602': '生物技术',
      '0605': '生物信息学',
      '0701': '法学',
      '0711': '法学类',
      '0702': '知识产权',
      '0801': '自动化',
      '0803': '电气工程及其自动化',
      '0802': '测控技术与仪器',
      '0805': '物联网工程',
      '0812': '自动化与电气工程类',
      '0890': '自动化专业卓越工程师班',
      '0806': '智能电网信息工程',
      '0804': '机械设计制造及其自动化',
      '1411': '先进制造大类',
      '0901': '社会体育指导与管理',
      '1112': '数理科学与信息技术类',
      '1192': '应用物理学专业实验班',
      '1191': '信息与计算科学专业实验班',
      '1103': '数学与应用数学',
      '1102': '信息与计算科学',
      '1101': '应用物理学',
      '1201': '广播电视编导',
      '1205': '视觉传达设计',
      '1204': '环境设计',
      '1202': '动画',
      '1212': '数字媒体艺术与动画大类',
      '1207': '产品设计',
      '1290': '广播电视编导专业实验班',
      '1208': '数字媒体艺术',
      '1211': '艺术设计类',
      '1611': '集成电路工程类',
      '1300': '软件工程',
      '3406': '英语(中加)',
      '1602': '集成电路设计与集成系统',
      '1306': '英语+软件',
      '1307': '日语+软件',
      '1390': '软件工程专业卓越工程师班',
      '1620': '微电子科学与工程专业实验班',
      '1311': '软件工程类',
      '3407': '电子信息工程(中美)',
      'L123': '动画(留学生)',
      'L141': '机械设计制造及其自动化(留学生)',
      'L022': '微电子科学与工程(留学生)',
      'L121': '广播电视编导(留学生)',
      'L012': '电子信息工程(留学生)',
      'L011': '通信工程(留学生)',
      'L033': '市场营销(留学生)',
      'L032': '工商管理(留学生)',
      'L061': '生物医学工程(留学生)',
      'L071': '法学(留学生)',
      'L031': '经济学(留学生)',
      'L051': '英语(留学生)',
      'L043': '信息安全(留学生)'
    };
    const tmpInfo = {
      stuid: stuInfo.stuNum,
      stuName: stuInfo.name,
      detail_info: [
        {
          name: '学院',
          message: stuInfo.college
        },
        {
          name: '专业',
          message: academyObj[stuInfo.major]
        },
        {
          name: '年级',
          message: stuInfo.grade
        },
        {
          name: '班级',
          message: stuInfo.classNum
        }
      ],
      room_feedback_info: [
        {
          name: '意见反馈',
          message: '',
          url: imgPrefix + 'arrow.png'
        }
      ]
    };

    this.setData({
      stu_info: tmpInfo,
      avatar: stuInfo.avatar
    });
  },
  onShow () {
    const self = this;
    let stuInfo = wx.getStorageSync('stuInfo');

    // 如果有，则绑定
    if (stuInfo) {
      self.setStuInfo(stuInfo);
    } else {
      app.gotoLogin();
      self.setData({
        stu_info: self.data.stu_info_copy
      });
    }
  },
  onShareAppMessage () {
    return {
      title: '重邮帮',
      path: '/page/index/index'
    };
  }
});
