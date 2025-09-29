# GeoJson 数据添加

以下为一个简单的 GeoJson 示例

```js
// 模拟一个GeoJson数据
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "City A",
      },
      geometry: {
        type: "Point",
        coordinates: [116.404, 39.915],
      },
    },
  ],
};

// 加载GeoJson数据
const dataSource = await Cesium.GeoJsonDataSource.load(geojson);
viewer.dataSources.add(dataSource);
viewer.flyTo(dataSource);
```

> **注意**：`GeoJsonDataSource.load` 是异步方法，需使用 `await` 或 `.then()` 处理。

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

  // 模拟一个GeoJson数据
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "City A",
        },
        geometry: {
          type: "Point",
          coordinates: [116.404, 39.915],
        },
      },
    ],
  };

  // 加载GeoJson数据
  const dataSource = await Cesium.GeoJsonDataSource.load(geojson);
  viewer.dataSources.add(dataSource);
  viewer.flyTo(dataSource);
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
import Demo from '@/Components/基础/09_加载GeoJSON.vue'
</script>

<!-- ![GeoJson数据添加](../../Aassets/Basics/03_添加GeoJSon.png) -->
