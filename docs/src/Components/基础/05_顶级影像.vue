<template>
  <div ref="cesiumContainer" class="container"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as Cesium from "cesium";
import img from "@/assets/earthbump1k.jpg";
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

// 加载单图像图层
const initMap = () => {
  const singleTileLayer = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.SingleTileImageryProvider.fromUrl(img, {
      rectangle: Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
    })
  );
  // singleTileLayer.alpha = 0.8; // 设置透明度
  viewer.imageryLayers.add(singleTileLayer);
};
</script>
<style scoped>
.container {
  width: 60vw;
  height: 60vh;
}
</style>
