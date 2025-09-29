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

onMounted(async () => {
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

  // 创建矩形几何体
  const instance = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
      rectangle: Cesium.Rectangle.fromDegrees(
        116.3975,
        39.9075,
        116.4075,
        39.9175
      ),
    }),
    attributes: {
      color: new Cesium.ColorGeometryInstanceAttribute(1.0, 0.0, 0.0, 0.5),
    },
  });

  // 创建另一个几何体
  const anotherInstance = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
      rectangle: Cesium.Rectangle.fromDegrees(
        116.4075,
        39.9175,
        116.4175,
        39.9275
      ),
    }),
    attributes: {
      color: new Cesium.ColorGeometryInstanceAttribute(0.0, 0.0, 1.0, 0.5),
    },
  });

  // 创建Primitive
  const rectanglePrimitive = new Cesium.Primitive({
    geometryInstances: [instance, anotherInstance],
    // 使用PerInstanceColorAppearance以支持每个实例的颜色
    appearance: new Cesium.PerInstanceColorAppearance({
      flat: true, // 不考虑光照
      translucent: true, // 启用透明度
    }),
  });
  viewer.scene.primitives.add(rectanglePrimitive);
  // 定位
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(116.3975, 39.9075, 5000), // 设置初始视角
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