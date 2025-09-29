<template>
  <div ref="cesiumContainer" class="container"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as Cesium from "cesium";
const cesiumContainer = ref(null);
let viewer = null;

onMounted(() => {
  // 初始化Viewer
  viewer = new Cesium.Viewer(cesiumContainer.value, {
    baseLayer: false, // 关闭默认地图
    baseLayerPicker: false, // 关闭底图选择器
  });
  initMap();
});

// 加载高德地图
const initMap = () => {
  const gaodeProvider = new Cesium.UrlTemplateImageryProvider({
    url: "https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    subdomains: ["1", "2", "3", "4"],
  });
  viewer.imageryLayers.addImageryProvider(gaodeProvider);
};
</script>
<style scoped>
.container {
  width: 60vw;
  height: 60vh;
}
</style>