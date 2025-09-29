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

  // 创建支持聚合的数据源
  const clusteredDataSource = new Cesium.CustomDataSource("clusteredData");

  // 添加到 Viewer
  viewer.dataSources.add(clusteredDataSource);

  // 启用聚合
  clusteredDataSource.clustering.enabled = true;

  // 配置聚合参数
  clusteredDataSource.clustering.pixelRange = 48; // 聚合像素范围
  clusteredDataSource.clustering.minimumClusterSize = 3; // 最小聚合点数

  // 添加点实体
  for (let i = 0; i < 1000; i++) {
    clusteredDataSource.entities.add({
      position: Cesium.Cartesian3.fromDegrees(
        116.3975 + Math.random() * 0.01, // 随机偏移
        39.9075 + Math.random() * 0.01, // 随机偏移
        50
      ),
      point: {
        pixelSize: 15,
        color: Cesium.Color.fromRandom(),
      },
      id: `point-${i}`,
    });
  }
  // 缩放到所有点
  viewer.zoomTo(clusteredDataSource);
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