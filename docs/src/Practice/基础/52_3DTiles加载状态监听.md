# 3D Tiles 加载状态监听

`Cesium.Cesium3DTileset.fromUrl(url, options)` 加载 3D Tiles 数据集时，可以通过 `tileset.loadProgress` 监听加载状态

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

// 设置访问令牌
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZTEwODgwMS1iYTY0LTRhNmYtYWFhMS03MDEzMjlhYWNjOTciLCJpZCI6MzAwMTM5LCJpYXQiOjE3NDY1ODI5MTR9.P4bdCMYyoubNMaQ_-ZkU99mM8Da3o8HIo4A57stHRAg";

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
  });
  // 清空logo
  viewer.cesiumWidget.creditContainer.style.display = "none";

  // 添加3D Tileset
  const tileset = await Cesium.Cesium3DTileset.fromUrl(
    new URL("./models/Tileset/tileset.json", import.meta.url).href,
    {
      maximumScreenSpaceError: 16, // 最大屏幕空间误差
      maximumCacheOverflowBytes: 536870912, // 最大缓存溢出字节数
      skipLevelOfDetail: true, // 跳过细节层级
      dynamicScreenSpaceError: true, // 动态屏幕空间误差
      dynamicScreenSpaceErrorDensity: 0.001, // 动态屏幕空间误差密度
    }
  );
  monitorTilesetLoading(tileset);
  viewer.scene.primitives.add(tileset);
  viewer.zoomTo(tileset); // 缩放到3D Tileset
});
// 瓦片集加载状态监听
function monitorTilesetLoading(tileset) {
  // 加载进度
  tileset.loadProgress.addEventListener((pending, processing) => {
    console.log(pending, processing, "tileset.totalTilesCount");
    if (pending === 0 && processing === 0) {
      console.log("瓦片集加载完成");
    }
  });
}
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
```

:::
