<template>
  <div ref="cesiumContainer" class="container"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as Cesium from "cesium";
const cesiumContainer = ref(null);
let viewer = null;

// 天地图TOKEN
const token = "2b34f6afbcd235c2bc4bed3f7735f1f5";

onMounted(() => {
  // 初始化Viewer
  viewer = new Cesium.Viewer(cesiumContainer.value, {
    geocoder: false, // 关闭地理编码搜索
    homeButton: false, // 关闭主页按钮
    sceneModePicker: false, // 关闭场景模式选择器
    baseLayerPicker: false, // 关闭底图选择器
    navigationHelpButton: false, // 关闭导航帮助
    animation: false, // 关闭动画控件
    timeline: false, // 关闭时间轴
    fullscreenButton: false, // 关闭全屏按钮
    baseLayer: false, // 关闭默认地图
  });
  // 清空logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  initMap();

  // 1. 添加地图点击事件，点击后获取经纬度坐标
  viewer.screenSpaceEventHandler.setInputAction(function (e) {
    // 点击后获取点击位置的笛卡尔坐标
    const cartesian = viewer.scene.pickPosition(e.position);

    // 必须判断坐标是否有效（当点击天空盒等位置时会返回undefined）
    if (Cesium.defined(cartesian)) {
      // 笛卡尔坐标转弧度坐标
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      // 弧度转度数并保留6位小数
      const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(
        6
      );
      const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
      const height = cartographic.height.toFixed(2);

      console.log(`经度: ${longitude}, 纬度: ${latitude}, 高度: ${height}米`);
    } else {
      console.log("无法获取有效坐标（可能点击了天空或地形外区域）");
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // 2. 点击实体，输出实体信息
  const circle = viewer.entities.add({
    id: "circle",
    name: "circle",
    description: "This is circle",
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    ellipse: {
      semiMajorAxis: 1000,
      semiMinorAxis: 1000,
      material: Cesium.Color.RED.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.WHITE,
    },
  });
  // 定位到实体
  viewer.zoomTo(circle);

  // 添加鼠标点击事件
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (e) {
    // 使用scene.pick方法获取点击位置的实体
    const pickedObject = viewer.scene.pick(e.position);
    if (
      Cesium.defined(pickedObject) &&
      pickedObject.id instanceof Cesium.Entity
    ) {
      const entity = pickedObject.id;
      console.log("实体信息:", entity); // 输出实体信息
    } else {
      console.log("未点击到实体");
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // 3. 多事件类型绑定同一处理函数
  const handleInput = (movement) => {
    console.log("输入事件:", movement);
  };

  // 批量注册事件
  [
    Cesium.ScreenSpaceEventType.LEFT_CLICK,
    Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  ].forEach((type) => {
    viewer.screenSpaceEventHandler.setInputAction(handleInput, type);
  });
});

// 加载天地图
const initMap = () => {
  // 以下为天地图及天地图标注加载
  const tiandituProvider = new Cesium.WebMapTileServiceImageryProvider({
    url:
      "http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
      token,
    layer: "img",
    style: "default",
    format: "tiles",
    tileMatrixSetID: "w",
    subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], // 子域名
    maximumLevel: 18,
    credit: new Cesium.Credit("天地图影像"),
  });
  // 天地图影像添加到viewer实例的影像图层集合中
  viewer.imageryLayers.addImageryProvider(tiandituProvider);
};
</script>
<style scoped>
.container {
  width: 60vw;
  height: 60vh;
}
</style>