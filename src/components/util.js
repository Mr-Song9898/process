const moveFuc = (document, target) => {
  let mode = document.getElementById(`${target}`);
  console.log('target=>>', target);
  console.log('mode=>>', mode);

  mode.onmousedown = function (e) {
  console.log('mode=>>', mode);

      var event = e || window.event;  //兼容IE浏览器
      // 鼠标点击标题栏那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      let diffX = event.clientX - mode.offsetLeft;
      let diffY = event.clientY - mode.offsetTop;
      if (typeof mode.setCapture !== 'undefined') {
          mode.setCapture();
      }
      mode.onmousemove = function (e) {
          var event = e || window.event;
          let moveX = event.clientX - diffX;
          let moveY = event.clientY - diffY;
          if (moveX < 0) {
              moveX = 0
          } else if (moveX > window.innerWidth - mode.offsetWidth) {
              moveX = window.innerWidth - mode.offsetWidth
          }
          if (moveY < 0) {
              moveY = 0
          } else if (moveY > window.innerHeight - mode.offsetHeight) {
              moveY = window.innerHeight - mode.offsetHeight
          }
          mode.style.left = moveX + 'px';
          mode.style.top = moveY + 'px'
      }
      mode.onmouseup = function (e) {
        mode.onmousemove = null;
        mode.onmouseup = null;
          //修复低版本ie bug
          if (typeof mode.releaseCapture != 'undefined') {
              mode.releaseCapture();
          }
      }
  }
};

const moveFucmin = () => {
  let mode = document.getElementById('mode');
  // let title = document.getElementById('title');
  let text = document.getElementById('text');
  text.onmousedown = function (e) {
      var event = e || window.event;  //兼容IE浏览器
      // 鼠标点击标题栏那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      let diffX = event.clientX - mode.offsetLeft;
      let diffY = event.clientY - mode.offsetTop;
      if (typeof mode.setCapture !== 'undefined') {
          mode.setCapture();
      }
      document.onmousemove = function (e) {
          var event = e || window.event;
          let moveX = event.clientX - diffX;
          let moveY = event.clientY - diffY;
          if (moveX < 0) {
              moveX = 0
          } else if (moveX > window.innerWidth - mode.offsetWidth) {
              moveX = window.innerWidth - mode.offsetWidth
          }
          if (moveY < 0) {
              moveY = 0
          } else if (moveY > window.innerHeight - mode.offsetHeight) {
              moveY = window.innerHeight - mode.offsetHeight
          }
          mode.style.left = moveX + 'px';
          mode.style.top = moveY + 'px'
      }
      document.onmouseup = function (e) {
          this.onmousemove = null;
          this.onmouseup = null;
          //修复低版本ie bug
          if (typeof mode.releaseCapture != 'undefined') {
              mode.releaseCapture();
          }
      }
  }
}

export { moveFucmin, moveFuc };