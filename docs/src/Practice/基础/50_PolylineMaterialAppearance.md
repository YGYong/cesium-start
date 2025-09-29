# 折线材质外观

`PolylineMaterialAppearance` 用于为折线图元设置材质外观。

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
const token = "05be06461004055923091de7f3e51aa6";

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

  // 1. 定义线段几何体
  const geometryInstance = new Cesium.GeometryInstance({
    geometry: new Cesium.PolylineGeometry({
      positions: Cesium.Cartesian3.fromDegreesArray([
        116.39,
        39.9, // 第一个点
        116.4,
        39.9, // 第二个点
        116.4,
        39.91, // 第三个点
        116.39,
        39.91, // 第四个点
      ]),
      width: 10.0,
      vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
    }),
  });

  // 2. 创建外观
  const appearance = new Cesium.PolylineMaterialAppearance({
    material: Cesium.Material.fromType("PolylineGlow", {
      color: Cesium.Color.CYAN,
      glowPower: 0.2,
    }),
  });

  // 3. 创建几何体实例
  const primitive = new Cesium.Primitive({
    geometryInstances: [geometryInstance],
    appearance,
  });

  viewer.scene.primitives.add(primitive);
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 5000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0,
    },
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

![折线材质外观](../../Aassets/Basics/appearence4.png)
