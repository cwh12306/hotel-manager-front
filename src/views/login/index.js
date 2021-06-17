export function pixalMove() {
  //back div用来存放例子特效
  var back = document.querySelector(".back");
  //定义一个数组用来存放粒子的各种属性
  var pixalData = [];
  //定义一个变量用来设置粒子的生命周期
  var pixalLife = 300;
  //每次鼠标移动，生成一个默认样式的粒子加到back div中，
  //并向粒子数组中加入随机生成的该粒子的样式
  window.addEventListener("mousemove", function(evt) {
    evt = evt || window.event;
    //span作为粒子特效
    var span = document.createElement("span");
    span.className = "pixal";
    back.appendChild(span);
    pixalData.push({
      //每个新生粒子都是0岁
      age: 0,
      //每个粒子随机的颜色和透明度
      color:
        "rgba(" +
        parseInt(Math.random() * 255) +
        "," +
        parseInt(Math.random() * 255) +
        "," +
        parseInt(Math.random() * 255) +
        "," +
        Math.random() +
        ")",
      //随机的移动速度
      vx: Math.random() * 0.5,
      vy: Math.random() * 0.75,
      sx: evt.x,
      sy: evt.y,
    });
  });
  //每一毫秒都让粒子移动并生长。。。
  setInterval(draw, 1);
  function draw() {
    for (var i = 0; i < pixalData.length; i++) {
      var pixal = pixalData[i];
      var children = back.children[i];
      pixal.age++;
      pixal.sx += pixal.vx * 2;
      pixal.sy += pixal.vy * 2;
      children.style.background = pixal.color;
      children.style.left = pixal.sx + "px";
      children.style.top = pixal.sy + "px";
      //如果粒子时间到了，就干掉他
      if (pixal.age > pixalLife) {
        pixalData.splice(i, 1);
        back.removeChild(children);
      }
    }
  }
}
