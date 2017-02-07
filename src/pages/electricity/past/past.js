Page({
  data: {
    title: 'past',
    elecState: {}, // 返回xml的数据
    cost: [12, 3, 87, 1, 90, 54],
    start: 11, // 开始月份
    focusIndex: 1,
    lastFocusIndex: 0,
    windowWidth: 0,
    monthsConWidth: [],
    moving: false, // 判断圆点是否在移动的标志
    canvasData: {} // onload中设置
  },
  pxToRpx (px) {
    return px * 2 / 750 * this.data.windowWidth;
  },
  drawLine () {
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
  //  画圆
  drawRound (circleX, circleY) {
    let canvasData = this.data.canvasData;

    canvasData.roundCanvas.save();
    canvasData.roundCanvas.beginPath();
    canvasData.roundCanvas.setStrokeStyle('#00D0D5');
    canvasData.roundCanvas.setFillStyle('#ffffff');
    canvasData.roundCanvas.setLineWidth(this.pxToRpx(2));

    let circleRadius = this.pxToRpx(6);
    circleX = circleX || canvasData.perWidth * this.data.focusIndex;
    circleY = circleY || canvasData.costHeight[this.data.focusIndex - 1];

    canvasData.roundCanvas.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    canvasData.roundCanvas.closePath();
    canvasData.roundCanvas.fill();
    canvasData.roundCanvas.stroke();
    canvasData.roundCanvas.restore();
    canvasData.roundCanvas.draw();
  },
  // 清除圆的canvas
  clearCanvas () {
    let canvasData = this.data.canvasData;
    canvasData.roundCanvas.clearRect(0, 0, this.pxToRpx(343), this.pxToRpx(234));
  },

  drawMonths () {
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
        this.data.start = 1;
      }
    };
    this.setData({
      start: start
    });
    canvasData.ctx.draw(true);
  },
  // 获取圆的路径
  getPath () {
    let preIndex = this.data.lastFocusIndex - 1;
    let currentIndex = this.data.focusIndex - 1;

    // 设置圆的路径，step函数是分步进行
    let drawPath = function (preIndex, currentIndex) {
      if (typeof currentIndex === 'number') {
        step(preIndex, currentIndex);
      } else if (typeof currentIndex === 'object') {
        step(preIndex, currentIndex[1], currentIndex);
      }
      this.drawMonths();
    }.bind(this);

    let step = function (preIndex, currentIndex, currentIndexObject) {
      let lastTime = 0;
      function requestAnimationFrame (callback) {
        let currTime = new Date().getTime();
        let timeToCall = Math.max(0, 16 - (currTime - lastTime));
        let id = setTimeout(function () { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
      let canvasData = this.data.canvasData;
      let preIndexX = (preIndex + 1) * canvasData.perWidth;
      let preIndexY = canvasData.costHeight[preIndex];
      let currentIndexX = (currentIndex + 1) * canvasData.perWidth;
      let currentIndexY = canvasData.costHeight[currentIndex];
      // 获取两个点的一元二次方程
      let k = (currentIndexY - preIndexY) / (currentIndexX - preIndexX);
      let b = preIndexY - k * preIndexX;
      let x = preIndexX;
      let y = k * x + b;
      this.clearCanvas();

      let _self = this;
      function _step () {
        if (Math.floor(x) !== Math.floor(currentIndexX)) {
          if (x < currentIndexX) {
            x += 1;
          } else {
            x -= 1;
          }
          y = k * x + b;
          _self.drawRound(x, y);
          requestAnimationFrame(_step);
          _self.setData({
            moving: true
          });
        } else {
          // 如果传递的点是数组，则递归进行step步骤
          if (currentIndexObject) {
            currentIndexObject.shift();
            if (currentIndexObject.length !== 1) {
              step(currentIndexObject[0], currentIndexObject[1], currentIndexObject);
            } else {
              _self.setData({
                moving: false
              });
            }
          } else {
            _self.setData({
              moving: false
            });
          }
        }
      };
      _step();
    }.bind(this);
    // 如果两个是挨着，则直接走，否则传递点的集合过去。
    if (Math.abs(preIndex - currentIndex) === 1) {
      drawPath(preIndex, currentIndex, this);
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
      drawPath(preIndex, spots, this);
    }
  },
  pastCostChange (e) {
    if (!this.data.moving) {
      let monthsConWidth = this.data.monthsConWidth;
      let monthsConHeight = this.data.monthsConHeight;
      let touchTarget = e.changedTouches[0];
      let x = touchTarget.x;
      let y = touchTarget.y;
      if (monthsConHeight.yStart <= y && y <= monthsConHeight.yEnd) {
        monthsConWidth.forEach((val, idx, arr) => {
          if (val.xStart <= x && x <= val.xEnd) {
            if (idx + 1 !== this.data.focusIndex) {  // 两个if，判断时候点击了月份
              this.setData({
                lastFocusIndex: this.data.focusIndex,
                focusIndex: idx + 1
              });
              this.getPath();
            }
          }
        });
      }
    }
  },
  canvasError (e) {
    console.log('----------------', e.detail.errMsg);
  },
  onLoad () {
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

        ctx: wx.createCanvasContext('pastCost'),
        roundCanvas: wx.createCanvasContext('round')
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

    this.drawLine();
    this.drawRound();
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
  }
});
