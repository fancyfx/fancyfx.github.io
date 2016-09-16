
(function (root, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (root.Bar = factory());
}(this, function () {
  /**
   * [Bar 状图]
   * @param {[type]} node [dom ID]
   * @param {[type]} data [数据]
   * @param {[type]} color [颜色]
   */
  var Bar = function(node, data, color){
    if (!node) return;
    this.cx = document.getElementById(node).getContext('2d');
    this._data = data || [];
    this._color = color || ['#ffbfab'];
    this.init();
  }

  Bar.prototype = {
    init: function() {
      this.draw();
      this.setBar();
    },
    // 绘制 坐标轴
    draw: function() {
        //轴
        this.drawLine(-5,0,500,0,0.5,'#000');
        this.drawLine(0,-5,0,400,0.5,'#000');
        //刻度
        for(var i = 1; i <= 10; i ++){
            this.cx.fillText(i * 40,20,(305 - 40 * i));
            this.drawLine(-5,40 * i,500,40 * i,0.5,'#ccc');
        }
    },
    // 绘制 柱形图
    setBar: function() {
      // 矩形
      var color = this._color;
      var grades = this._data;
      for(var i = 20, j = 0; j< grades.length; j++, i = i + 55){
        this.cx.fillText(grades[j],i + 40,(300 - grades[j]));
        this.drawLine(i,0,i,grades[j],30,color[j]);
      }
    },
    //画线
    drawLine: function(b_x,b_y,e_x,e_y,width,color){
      this.cx.strokeStyle = color;
      this.cx.lineWidth = width;
      this.cx.beginPath();
      this.cx.moveTo(( b_x + 50 ),(300 - b_y));
      this.cx.lineTo((e_x + 50),(300 - e_y));
      this.cx.closePath();
      this.cx.stroke();
    },
    // 动态显示
    changeChart: function(data){
      this._data = data;
      canvas.width = canvas.width;
      this.init();
    }
  }
  return Bar
}));
