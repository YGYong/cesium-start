# 相机快速入门

## setView

```js
// 设置相机位置
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(116.404, 39.915, 1000), // 目标位置
  orientation: {
    heading: Cesium.Math.toRadians(0), // 水平方向
    pitch: Cesium.Math.toRadians(-30), // 垂直方向
    roll: 0, // 旋转方向
  },
});
```

## flyTo

```js
// 飞行到指定位置
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(116.404, 39.915, 1000), // 目标位置
  orientation: {
    heading: Cesium.Math.toRadians(0), // 水平方向
    pitch: Cesium.Math.toRadians(-30), // 垂直方向
    roll: 0, // 旋转方向
  },
});
```

## 通过按键控制相机

```js
// 视频中代码
// viewer.camera.moveForward(100); // 向前移动100米
// viewer.camera.moveBackward(100); // 向后移动100米
// viewer.camera.moveLeft(100); // 向左移动100米
// viewer.camera.moveRight(100); // 向右移动100米
// viewer.camera.lookLeft(100); // 向左旋转100度
// viewer.camera.lookRight(100); // 向右旋转100度
// viewer.camera.lookUp(100); // 向上旋转100度
// viewer.camera.lookDown(100); // 向下旋转100度
// viewer.camera.twistLeft(100); //翻滚
// viewer.camera.twistRight(100); // 翻滚
// viewer.camera.moveUp(100); // 向上移动100米
// viewer.camera.moveDown(100); // 向下移动100米
// viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY); // 重置相机
// 监听键盘事件(以下代码自动生成)
document.addEventListener("keydown", function (event) {
  const camera = viewer.camera;
  const cartesian = camera.positionCartographic; // 获取当前相机位置
  const cartesian3 = Cesium.Cartographic.toCartesian(cartesian); // 转换为笛卡尔坐标
  const distance = 100; // 每次移动的距离
  switch (event.key) {
    case "ArrowUp": // 上
      camera.position = Cesium.Cartesian3.add(
        cartesian3,
        new Cesium.Cartesian3(0, 0, distance),
        new Cesium.Cartesian3()
      ); // 向上移动
      break;
    case "ArrowDown": // 下
      camera.position = Cesium.Cartesian3.subtract(
        cartesian3,
        new Cesium.Cartesian3(0, 0, distance),
        new Cesium.Cartesian3()
      ); // 向下移动
      break;
    case "ArrowLeft": // 左
      camera.position = Cesium.Cartesian3.subtract(
        cartesian3,
        new Cesium.Cartesian3(distance, 0, 0),
        new Cesium.Cartesian3()
      ); // 向左移动
      break;
    case "ArrowRight": // 右
      camera.position = Cesium.Cartesian3.add(
        cartesian3,
        new Cesium.Cartesian3(distance, 0, 0),
        new Cesium.Cartesian3()
      ); // 向右移动
      break;
    case "w": // w
      camera.position = Cesium.Cartesian3.add(
        cartesian3,
        new Cesium.Cartesian3(0, distance, 0),
        new Cesium.Cartesian3()
      ); // 向上移动
      break;
    case "s": // s
      camera.position = Cesium.Cartesian3.subtract(
        cartesian3,
        new Cesium.Cartesian3(0, distance, 0),
        new Cesium.Cartesian3()
      ); // 向下移动
      break;
    case "a": // a
      camera.position = Cesium.Cartesian3.subtract(
        cartesian3,
        new Cesium.Cartesian3(distance, 0, 0),
        new Cesium.Cartesian3()
      ); // 向左移动
      break;
    case "d": // d
      camera.position = Cesium.Cartesian3.add(
        cartesian3,
        new Cesium.Cartesian3(distance, 0, 0),
        new Cesium.Cartesian3()
      ); // 向右移动
      break;
    default:
      break;
  }
});
```
