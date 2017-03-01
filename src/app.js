const encodeFormated = require('./utils/util').encodeFormated;

App({
  data: {
    stuInfo: {
      name: '',
      college: '',
      stuNum: '',
      gender: '',
      major: '',
      grade: '',
      classNum: '',
      idNum: ''
    }
  },
  loginApp () {
    const self = this;

    wx.login({
      success (res) {
        if (res.code) {
          console.log('code 获取成功');

          self.getSession(res.code);
        }
      }
    });

    /**
     * login 方法获取 code
     * 下一步交给 getSession 获取第三方 session
     */
  },
  getSession (code) {
    const self = this;
    const authUrl = 'https://redrock.cqupt.edu.cn/weapp/auth/codeAuth';

    wx.request({
      method: 'post',
      url: authUrl,
      data: {
        params: encodeFormated(code)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        const retSession = res.data.bags.thirdSession;

        wx.setStorageSync('session', retSession);
        self.userInfo();
      }
    });

    /**
     * from login
     * 获取第三方 session 并存储到本地
     */
  },
  getOpenId () {
    const openIdUrl = 'https://redrock.cqupt.edu.cn/weapp/auth/getOpenid';

    wx.request({
      method: 'post',
      url: openIdUrl,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        params: encodeFormated(wx.getStorageSync('session'))
      },
      success (res) {
        // console.log(res.data.bags.stuid);
      }
    });
  },
  checkInfo (str) {
    const self = this;

    wx.request({
      method: 'post',
      url: 'https://redrock.cqupt.edu.cn/weapp/auth/checkInfo',
      data: {
        params: str
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        if (res.data.status_code !== 200) {
          console.log('code 过期，需要重新获取');
          self.loginApp();
        } else {

        }
      }
    });

    /**
     * 检查用户状态是否有效
     */
  },
  stuInfo () {
    const self = this;
    const str = encodeFormated(wx.getStorageSync('session'));

    wx.request({
      method: 'post',
      url: 'https://redrock.cqupt.edu.cn/weapp/User/getUserInfo',
      data: {
        params: str
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        for (let key in res.data.bags) {
          self.data.stuInfo[key] = res.data.bags[key];
        }
        // 获取学生信息
      }
    });
  },
  userInfo () {
    const self = this;

    wx.getUserInfo({
      success (res) {
        const { rawData, signature } = res;
        const thirdSession = wx.getStorageSync('session');
        const str = encodeFormated(`${rawData}&${signature}&${thirdSession}`);

        self.checkInfo(str);
      },
      fail () {
        console.log('userInfo fail');
      }
    });
  },
  onLaunch () {
    const self = this;

    wx.checkSession({
      success () {
        console.log('session 有效，直接登录');
        self.userInfo();
      },
      fail () {
        console.log('session 无效，需要重新获取');
        self.loginApp();
      }
    });

    self.stuInfo();

    /**
     * 登录 检查 session 是否有效
     * 有效则获取信息，无效则先拿 code
     */
  },
  onShow () {

  },
  gotoLogin (url) {
    wx.showModal({
      title: '请先登录',
      showCancel: true,
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/login/login'
          });
        }
      }
    });
  },
  removeStorages (key) {
    wx.removeStorage({
      key: key,
      success: res => {
        console.log('---------removestorage', wx.getStorage({
          key: key
        }));
      }
    });
  },
  onHide () {
    // 图书馆查询，电费查询清空缓存
    ['myinfor_library', 'rankList_library', 'myinfor_electricity'].forEach(value => {
      this.removeStorages(value);
    });
    // wx.removeStorage({
    //   key: 'myinfor_library',
    //   success: res => {
    //     console.log('---------removestorage', wx.getStorage({
    //       key: 'myinfor_library'
    //     }));
    //   }
    // });
    // wx.removeStorage({
    //   key: 'rankList_library',
    //   success: res => {
    //     console.log('---------removestorage', wx.getStorage({
    //       key: 'rankList_library'
    //     }));
    //   }
    // });
  }
});
