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

  // 添加实体
  const pointEntity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(116.3975, 39.9075, 50),
    point: {
      color: Cesium.Color.RED.withAlpha(0.8), // 80%不透明的红色
      pixelSize: 20, // 直径20像素
      outlineColor: Cesium.Color.WHITE, // 白色轮廓
      outlineWidth: 3, // 轮廓宽度3像素
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 贴地显示
    },
  });
  viewer.zoomTo(pointEntity); // 缩放到实体位置

  // 距离越近越大，越远越小
  pointEntity.point.scaleByDistance = new Cesium.NearFarScalar(
    1000, // 相机距离1000米时
    2.0, // 缩放至2倍大小
    5000, // 相机距离5000米时
    0.5 // 缩放至0.5倍大小
  );

  // 距离越近越不透明，越远越透明
  pointEntity.point.translucencyByDistance = new Cesium.NearFarScalar(
    500,
    1.0, // 500米时完全不透明
    2000,
    0.2 // 2000米时20%透明度
  );

  // 相机距离 100-5000 米之间显示点
  pointEntity.point.distanceDisplayCondition =
    new Cesium.DistanceDisplayCondition(
      100, // 最小可见距离（米）
      5000 // 最大可见距离（米）
    );
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