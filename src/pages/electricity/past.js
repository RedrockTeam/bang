// const app = getApp();

Page({
  data: {
    title: 'past',
    elecState: {},
    cost: [12, 3, 87, 1, 90, 54],
    start: 1
  },
  drawPastCost: function () {
    let windowWidth = 0;
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
      }
    });
    /*
    *  往期用电图表
    *  perWidth： 每一折线的宽， 共七条
    *  ctxWidth, ctxHeight： 折线图的宽高
    *  cost: 近六个月的用电量
    *  costMax， costMin： 六个月电费的最大和最小，及比例
    *  costHeight： 每一个点的高度， 再加上圆点的直径
    */
    function pxToRpx (px) {
      return px * 2 / 750 * windowWidth;
    }
    let ctxWidth = pxToRpx(343),
      perWidth = ctxWidth / 7,
      ctxHeight = pxToRpx(214),
      costMax = Math.max.apply(null, this.data.cost),
      costMin = Math.min.apply(null, this.data.cost),
      costScale = costMin / costMax,
      costHeight = this.data.cost.map((val, idx, arr) => (costMax - val) * costScale * ctxHeight + pxToRpx(12));

    let focusIndex = 5;
    const ctx = wx.createCanvasContext('pastCost');

    // 画线
    ctx.save();
    ctx.beginPath();
    ctx.setLineWidth(pxToRpx(2));
    ctx.setStrokeStyle('#00D0D5');
    ctx.setFillStyle('#F4FFFE');

    ctx.moveTo(perWidth * 0, costHeight[0]);
    ctx.lineTo(perWidth * 1, costHeight[0]);
    ctx.lineTo(perWidth * 2, costHeight[1]);
    ctx.lineTo(perWidth * 3, costHeight[2]);
    ctx.lineTo(perWidth * 4, costHeight[3]);
    ctx.lineTo(perWidth * 5, costHeight[4]);
    ctx.lineTo(perWidth * 6, costHeight[5]);
    ctx.lineTo(perWidth * 7 + pxToRpx(2), costHeight[5]);

    ctx.lineTo(perWidth * 7 + pxToRpx(2), pxToRpx(335));
    ctx.lineTo(pxToRpx(-2), pxToRpx(335));
    ctx.lineTo(pxToRpx(-2), costHeight[0] + pxToRpx(2));

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 画圆
    ctx.beginPath();
    ctx.setFillStyle('#ffffff');
    ctx.setLineWidth(pxToRpx(2));

    let circle = {
      x: perWidth * focusIndex,
      y: costHeight[focusIndex - 1],
      r: pxToRpx(4)
    };
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // 画月份

    ctx.setFontSize(pxToRpx(14));
    
    for (let i = 1; i < 7; i++) {
      if (this.data.start < 10) {
        this.data.start = '0' + this.data.start;
      }
      if (i === focusIndex) {
        ctx.setFillStyle('#00D0D5');
        ctx.fillText(this.data.start, perWidth * i - pxToRpx(6), pxToRpx(280));
      } else {
        ctx.setFillStyle('#C4EAE7');
        ctx.fillText(this.data.start, perWidth * i - pxToRpx(6), pxToRpx(280));
      }
      if (this.data.start++ === 12) {
        this.data.start = 0;
      }
    }

    ctx.draw(true);
  },
  canvasError: function (e) {
    console.log('----------------', e.detail.errMsg);
  },
  onLoad () {
    // TODO: onLoad
    wx.request({
      url: `http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/ElectricityQuery/ElectricityQuery/getElectric`,
      method: `POST`,
      header: {
        'Content-Type': `application/x-www-form-urlencoded`
      },
      data: {
        stuNum: 2015211878
      },
      success: res => {
        if (res.statusCode === 200) {
          if (res.data.status === 200) {
            this.setData({
              elecState: res.data.data
            });
          } else {
            console.log('网络错误!');
          }
        } else {
          console.log('网络错误!');
        }
      }
    });
  },

  onReady () {
    // TODO: onReady
    this.drawPastCost();
  },
  onShow () {
    // TODO: onShow
  },
  onHide () {
    // TODO: onHide
  },
  onUnload () {
    // TODO: onUnload
  }
});
