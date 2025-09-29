<template>
  <div ref="cesiumContainer" style="width: 60vw; height: 60vh"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as Cesium from "cesium";
const cesiumContainer = ref(null);
let viewer = null;

// 设置访问令牌
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZTEwODgwMS1iYTY0LTRhNmYtYWFhMS03MDEzMjlhYWNjOTciLCJpZCI6MzAwMTM5LCJpYXQiOjE3NDY1ODI5MTR9.P4bdCMYyoubNMaQ_-ZkU99mM8Da3o8HIo4A57stHRAg";

onMounted(() => {
  // 初始化Viewer
  viewer = new Cesium.Viewer(cesiumContainer.value, {});
});
</script>