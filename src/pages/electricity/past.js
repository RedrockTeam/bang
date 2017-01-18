// const app = getApp();

Page({
  data: {
    title: 'past',
    elecState: {},
    cost: [12, 3, 87, 1, 90, 54],
    start: 11,
    focusIndex: 1,
    lastFocusIndex: 0,
    windowWidth: 0,
    monthsConWidth: [],
    animationData: {},
    canvasData: {} // onload中设置
  },
  pxToRpx: function (px) {
    return px * 2 / 750 * this.data.windowWidth;
  },
  drawLine: function () {
    // 画线
    let canvasData = this.data.canvasData;
    canvasData.ctx.save();
    canvasData.ctx.beginPath();
    canvasData.ctx.setLineWidth(this.pxToRpx(2));
    canvasData.ctx.setStrokeStyle('#00D0D5');
    canvasData.ctx.setFillStyle('#ffffff');

    canvasData.ctx.moveTo(canvasData.perWidth * 0, canvasData.costHeight[0]);
    for (let i = 0; i < 6; i++) {
      canvasData.ctx.lineTo(canvasData.perWidth * (i + 1), canvasData.costHeight[i]);
    }
    // 延长到边界以外， 画蓝色背景
    canvasData.ctx.lineTo(canvasData.perWidth * canvasData.months + this.pxToRpx(2), canvasData.costHeight[canvasData.months - 2]);
    canvasData.ctx.lineTo(canvasData.perWidth * canvasData.months + this.pxToRpx(2), this.pxToRpx(-2));
    canvasData.ctx.lineTo(this.pxToRpx(-2), this.pxToRpx(-2));
    canvasData.ctx.lineTo(this.pxToRpx(-2), canvasData.costHeight[0] + this.pxToRpx(-2));

    canvasData.ctx.closePath();
    canvasData.ctx.fill();
    canvasData.ctx.stroke();
    canvasData.ctx.restore();
    canvasData.ctx.draw(true);
  },
  drawRound: function (circleX, circleY) {
    let canvasData = this.data.canvasData;

    // canvasData.roundCanvas.save();
    // canvasData.roundCanvas.beginPath();
    // canvasData.roundCanvas.setStrokeStyle('#00D0D5');
    // canvasData.roundCanvas.setFillStyle('#ffffff');
    // canvasData.roundCanvas.setLineWidth(this.pxToRpx(2));

    // let circleRadius = this.pxToRpx(4);
    circleX = circleX || canvasData.perWidth * this.data.focusIndex;
    circleY = circleY || canvasData.costHeight[this.data.focusIndex - 1];
    // let setDefaultWidth = wx.createAnimation({
    //   duration: 500,
    //   timingFunction: 'linear'
    // });
    // setDefaultWidth.left(this.data.canvasData.perWidth - this.pxToRpx(11 / 2)).step();
    // this.setData({
    //   animationData: setDefaultWidth.export()
    // });
  },
  clearCanvas: function () {
    let canvasData = this.data.canvasData;
    canvasData.ctx.clearRect(0, 0, this.pxToRpx(343), this.pxToRpx(234));
  },
  // clearRound: function (circleX, circleY) {
  //   let canvasData = this.data.canvasData;
  //   canvasData.roundCanvas.clearRect(0, 0, this.pxToRpx(343), this.pxToRpx(234));
  // },
  drawMonths: function () {
    let canvasData = this.data.canvasData;
    let start = this.data.start;
    canvasData.ctx.setFontSize(this.pxToRpx(14));

    for (let i = 1; i < canvasData.months; i++) {
      if (this.data.start < 10) {
        this.data.start = '0' + this.data.start;
      }
      if (i === this.data.focusIndex) {
        canvasData.ctx.setFillStyle('#00D0D5');
        canvasData.ctx.fillText(this.data.start, canvasData.perWidth * i - this.pxToRpx(6), canvasData.monthsHeight);
      } else {
        canvasData.ctx.setFillStyle('#C4EAE7');
        canvasData.ctx.fillText(this.data.start, canvasData.perWidth * i - this.pxToRpx(6), canvasData.monthsHeight);
      }
      if (this.data.start++ === 12) {
        this.data.start = 0;
      }
    };
    this.setData({
      start: start
    });
    canvasData.ctx.draw(true);
  },
  getPath: function () {
    let preIndex = this.data.lastFocusIndex - 1;
    let currentIndex = this.data.focusIndex - 1;

    function drawPath (currentIndex, that) {
      let canvasData = that.data.canvasData;

      // let preIndexX = (preIndex + 1) * canvasData.perWidth;
      // let preIndexY = canvasData.costHeight[preIndex];
      // console.log(typeof currentIndex);
      let setPosition = wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear'
      });

      if (typeof currentIndex === 'number') {
        let currentIndexX = (currentIndex + 1) * canvasData.perWidth;
        let currentIndexY = canvasData.costHeight[currentIndex];
        // 一元二次方程
        // let k = (currentIndexY - preIndexY) / (currentIndexX - preIndexX);
        // let b = preIndexY - k * preIndexX;
        // let x = preIndexX;
        // let y = k * x + b;
        setPosition.left(currentIndexX - that.pxToRpx(11 / 2))
          .top(currentIndexY + that.pxToRpx(110)).step();
        that.setData({
          animationData: setPosition.export()
        });
      } else if (typeof currentIndex === 'object') {
        currentIndex.forEach((val, idx, arr) => {
          setTimeout(() => {
            let currentIndexX = (val + 1) * canvasData.perWidth;
            let currentIndexY = canvasData.costHeight[val];
            setPosition.left(currentIndexX - that.pxToRpx(11 / 2))
              .top(currentIndexY + that.pxToRpx(110)).step();
            that.setData({
              animationData: setPosition.export()
            });
          }, 1000 * (idx - 1));
        });
      }
      let currentIndexX = (that.data.focusIndex) * canvasData.perWidth;
      let currentIndexY = canvasData.costHeight[that.data.focusIndex];
      setPosition.left(currentIndexX - that.pxToRpx(11 / 2))
        .top(currentIndexY + that.pxToRpx(110)).step();
      that.setData({
        animationData: setPosition.export()
      });
      that.drawMonths();
    }

    if (Math.abs(preIndex - currentIndex) === 1) {
      drawPath(currentIndex, this);
    } else {
      let spots = [];
      if (preIndex > currentIndex) {
        for (let i = preIndex; i >= currentIndex; i--) {
          spots.push(i);
        }
      } else {
        for (let i = preIndex; i <= currentIndex; i++) {
          spots.push(i);
        }
      }
      drawPath(spots, this);
    }
  },
  pastCostChange: function (e) {
    let monthsConWidth = this.data.monthsConWidth;
    let monthsConHeight = this.data.monthsConHeight;
    let touchTarget = e.changedTouches[0];
    let x = touchTarget.x;
    let y = touchTarget.y;

    // console.log(x);
    // console.log(monthsConWidth);

    if (monthsConHeight.yStart <= y && y <= monthsConHeight.yEnd) {
      monthsConWidth.forEach((val, idx, arr) => {
        if (val.xStart <= x && x <= val.xEnd) {
          if (idx + 1 !== this.data.focusIndex) {
            this.setData({
              lastFocusIndex: this.data.focusIndex,
              focusIndex: idx + 1
            });
            this.getPath();
          }
        }
      });
    }
  },
  canvasError: function (e) {
    console.log('----------------', e.detail.errMsg);
  },
  moveRound: function () {
    // this.
  },
  onLoad () {
    // TODO: onLoad
    let windowWidth = 0;
    wx.getSystemInfo({
      success: (res) => {
        windowWidth = res.windowWidth;
        this.setData({
          windowWidth: windowWidth
        });
      }
    });
    /*
    *  往期用电图表
    *  perWidth： 每一折线的宽， 共七条
    *  ctxWidth, ctxHeight： 折线图的宽高
    *  cost: 近六个月的用电量
    *  costMax， costMin： 六个月电费的最大和最小，及比例
    *  costHeight： 每一个点的高度， 再加上圆点的直径
    *  monthsHeight： 月份的高度
    */
    this.setData({
      canvasData: {
        ctxWidth: this.pxToRpx(343),
        months: 7,
        ctxHeight: this.pxToRpx(214),
        costMax: Math.max.apply(null, this.data.cost),
        costMin: Math.min.apply(null, this.data.cost),

        perWidth: this.pxToRpx(343 / 7),
        costHeight: this.data.cost.map((val, idx, arr) => {
          return (Math.max.apply(null, this.data.cost) - val) *
          (Math.min.apply(null, this.data.cost) / Math.max.apply(null, this.data.cost)) *
          this.pxToRpx(214) + this.pxToRpx(12);
        }),
        monthsHeight: this.pxToRpx(280),

        ctx: wx.createCanvasContext('pastCost')
      }
    });

    let firstMonthsContainerWidth = this.data.canvasData.perWidth;
    let MonthsContainerWidth = [];
    for (let i = 1; i <= 6; i++) {
      MonthsContainerWidth[i - 1] = {
        xStart: firstMonthsContainerWidth * i - 20,
        xEnd: firstMonthsContainerWidth * i + 20
      };
    };
    this.setData({
      monthsConWidth: MonthsContainerWidth,
      monthsConHeight: {
        yStart: this.data.canvasData.monthsHeight - 20,
        yEnd: this.data.canvasData.monthsHeight + 20
      }
    });

    let setDefaultHeight = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear'
    });
    setDefaultHeight.top(this.data.canvasData.costHeight[0] + this.pxToRpx(110)).step();
    this.setData({
      animationData: setDefaultHeight.export()
    });

    let setDefaultWidth = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    });
    setDefaultWidth.left(this.data.canvasData.perWidth - this.pxToRpx(11 / 2)).step();
    this.setData({
      animationData: setDefaultWidth.export()
    });

    this.drawLine();
    this.drawMonths();

    wx.request({
      url: 'http://hongyan.cqupt.edu.cn/MagicLoop/index.php?s=/addon/ElectricityQuery/ElectricityQuery/getElectric',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
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
            console.log('网络错误1!');
          }
        } else {
          console.log('网络错误2!');
        }
      }
    });
  },
  onReady () {
    // TODO: onReady
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
