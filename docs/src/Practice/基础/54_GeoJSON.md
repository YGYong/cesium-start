# GeoJson 数据加载

GeoJson 数据是一种常用的地理数据格式，可以通过 `GeoJsonDataSource` 类来实现。

> **注意**：`GeoJsonDataSource.load` 是异步方法，需使用 `await` 或 `.then()` 处理。

![GeoJson](../../Aassets/Basics/jeojson.png)

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

  // 异步加载中国GeoJson数据
  const geoJsonData = Cesium.GeoJsonDataSource.load(
    "https://geojson.cn/api/china/1.6.2/china.json",
    {
      stroke: Cesium.Color.SKYBLUE, // 边框颜色
      fill: Cesium.Color.PINK, // 填充颜色
      strokeWidth: 3, // 边框宽度
    }
  );

  // 将数据源添加到Viewer中
  geoJsonData.then((dataSource) => {
    viewer.dataSources.add(dataSource);
    // 遍历所有实体
    dataSource.entities.values.forEach((entity) => {
      if (entity.polygon) {
        // 设置随机颜色
        entity.polygon.material = new Cesium.ColorMaterialProperty(
          Cesium.Color.fromRandom({
            alpha: 0.8, // 设置透明度
          })
        );
        // 区域随机拉伸高度
        entity.polygon.extrudedHeight = Math.random() * 100000;
      }
    });
    // 设置视图范围
    viewer.zoomTo(dataSource);
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

<ClientOnly>
  <Demo />
</ClientOnly>

<script setup>
import Demo from "@/Components/基础/54_GeoJSON.vue";
</script>