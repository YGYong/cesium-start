# CZML 数据加载

CZML（Cesium Language）是一种用于描述动态场景的 JSON 格式，专门为 Cesium 设计。它允许开发者描述`随时间变化`的图形和属性，特别适合用于描述移动对象、传感器范围、轨迹等动态场景。

<video controls width="600">
  <source src="../../Aassets/Basics/CZML.mp4" type="video/mp4" />
  您的浏览器不支持HTML5视频标签。
</video>

:::details 展开代码

```vue
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

  const czml = [
    {
      id: "document",
      name: "CZML Model",
      version: "1.0",
      clock: {
        interval: "2019-06-01T16:00:00Z/2019-06-01T16:10:00Z",
        currentTime: "2019-06-01T16:00:00Z",
        multiplier: 60,
        range: "LOOP_STOP",
        step: "SYSTEM_CLOCK_MULTIPLIER",
      },
    },
    {
      id: "test model",
      name: "Cesium Air",
      position: {
        cartographicDegrees: [-77, 37, 10000],
      },
      model: {
        gltf: "https://cesium.com/public/SandcastleSampleData/launchvehicle.glb",
        scale: 2.0,
        minimumPixelSize: 128,
        runAnimations: false,
        articulations: {
          "Fairing Open": {
            epoch: "2019-06-01T16:00:00Z",
            number: [0, 0, 600, 120],
          },
          "Fairing Separate": {
            epoch: "2019-06-01T16:00:00Z",
            number: [0, 0, 400, -50],
          },
          "Fairing Drop": {
            epoch: "2019-06-01T16:00:00Z",
            interpolationAlgorithm: "LAGRANGE",
            interpolationDegree: 2,
            number: [0, 0, 80, 0, 100, 0, 120, -1, 600, -120],
          },
        },
      },
    },
  ];

  // 加载CZML数据
  viewer.clock.shouldAnimate = true; // 开启动画

  const dataSource = Cesium.CzmlDataSource.load(czml);
  viewer.dataSources
    .add(dataSource)
    .then(function (dataSource) {
      viewer.trackedEntity = dataSource.entities.getById("test model");
    })
    .catch(function (error) {
      console.error(error);
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
  width: 100vw;
  height: 100vh;
}
</style>
```

:::

<Demo />
<script setup>
import Demo from "@/Components/基础/56_CZML.vue";
</script>
