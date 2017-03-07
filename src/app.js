const encodeFormated = require('./utils/util').encodeFormated;
const Promise = require('./utils/es6-promise');

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
    },
    userInfo: {
      avatar: '',
      city: '',
      country: ''
    }
  },
  loginApp () {
    const self = this;
    return new Promise((resolve, reject) => {
      wx.login({
        success (res) {
          if (res.code) {
            console.log('code 获取成功');

            // self.getSession(res.code);
            resolve(res.code);
          }
        }
      });
    }).then(code => {
      return new Promise((resolve, reject) => {
        wx.request({
          method: 'post',
          url: 'https://redrock.cqupt.edu.cn/weapp/auth/codeAuth',
          data: {
            params: encodeFormated(code)
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            const retSession = res.data.bags.thirdSession;

            wx.setStorageSync('session', retSession);
            self.getUserInfo();
            resolve();
          }
        });
      });
    });
    /**
     * login 方法获取 code
     * 下一步交给 getSession 获取第三方 session
     */
  },
  // getSession (code) {
  //   const self = this;
  //   return new Promise((resolve, reject) => {
  //     wx.request({
  //       method: 'post',
  //       url: 'https://redrock.cqupt.edu.cn/weapp/auth/codeAuth',
  //       data: {
  //         params: encodeFormated(code)
  //       },
  //       header: {
  //         'content-type': 'application/x-www-form-urlencoded'
  //       },
  //       success (res) {
  //         const retSession = res.data.bags.thirdSession;

  //         wx.setStorageSync('session', retSession);
  //         self.getUserInfo();
  //         resolve();
  //       }
  //     });
  //   }).then(() => {
  //     return {
  //       code: 1,
  //       status: 'get session success'
  //     };
  //   });

  //   /**
  //    * from login
  //    * 获取第三方 session 并存储到本地
  //    */
  // },
  getUserInfo () {
    const self = this;

    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success (res) {
          const { rawData, signature, encryptedData, iv } = res;
          const thirdSession = wx.getStorageSync('session');
          const obj = {
            infoStr: encodeFormated(`${rawData}&${signature}&${thirdSession}`),
            userStr: encodeFormated(`${encryptedData}&${iv}&${thirdSession}`)
          };

          resolve(obj);
        },
        fail () {
          console.log('获取 userInfo 失败');
        }
      });
    }).then((obj) => {
      return new Promise((resolve, reject) => {
        wx.request({
          method: 'post',
          url: 'https://redrock.cqupt.edu.cn/weapp/auth/checkInfo',
          data: {
            params: obj.infoStr
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            if (res.data.status_code !== 200) {
              console.log('code 过期，需要重新获取');
              self.loginApp();
            } else {
              console.log('code 有效，可以继续使用');
              resolve(obj);
            }
          }
        });
      });

      /**
       * 检查 info
       * 返回新的 promise
       */
    }).then((obj) => {
      return new Promise((resolve, reject) => {
        wx.request({
          method: 'post',
          url: 'https://redrock.cqupt.edu.cn/weapp/auth/decryptData',
          data: {
            params: obj.userStr
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            const info = {
              avatar: res.data.bags.avatarUrl,
              city: res.data.bags.city,
              country: res.data.bags.country
            };

            resolve(info);
          }
        });
      });
    }).then((info) => {
      for (let key in info) {
        self.data.userInfo[key] = info[key];
      }
    }).catch((err) => {
      throw new Error(err);
    });
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
  getStuInfo () {
    const self = this;
    const str = encodeFormated(wx.getStorageSync('session'));
    return new Promise((resolve, reject) => {
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
          resolve();
        }
      });
    }).then(() => {
      return {
        code: 1,
        status: 'bind success, llp'
      };
    });
  },
  onLaunch () {
    // 每次进入清空图书馆查询，电费查询清空缓存
    ['myinfor_library', 'rankList_library', 'myinfor_electricity'].forEach(key => {
      wx.removeStorage({
        key
      });
    });

    const self = this;

    wx.checkSession({
      success () {
        console.log('session 有效，直接登录');
        self.getUserInfo();
        self.getStuInfo();
      },
      fail () {
        console.log('session 无效，需要重新获取');
        self.loginApp();
        self.getStuInfo();
      }
    });

    /**
     * 登录 检查 session 是否有效
     * 有效则获取信息，无效则先拿 code
     */
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
  }
});
