# GUI 调试面板

## 介绍

```bash
# 依赖安装
npm install dat.gui --save

# 引入依赖
import * as dat from "dat.gui";

# 创建实例
const gui = new dat.GUI();
```

1. 使用`dat.gui`创建调试面板
2. 可以通过`gui.add()`方法添加控制项，支持多种类型的输入
3. 调试面板可以用于实时修改变量值，便于调试和测试
4. 调试面板可以通过`gui.domElement.style`设置样式

<video controls width="600">
  <source src="../../Aassets/Practice/GUI.mp4" type="video/mp4" />
  您的浏览器不支持HTML5视频标签。
</video>

## 完整代码

:::details 展开代码

```vue
<template>
  <div ref="cesiumContainer" class="container"></div>
</template>

<script setup>
import { ClientOnly } from 'vitepress'
import { ref, onMounted } from "vue";
import * as Cesium from "cesium";
import * as dat from "dat.gui";

const cesiumContainer = ref(null);
let viewer = null;
let heading = 0; // 航向角
let pitch = 0; // 俯仰角
let roll = 0; // 翻滚角
let obj = {};
let model = null; // 模型对象

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

  // 使用dat.gui添加GUI控制面板
  obj = {
    heading: 90,
    pitch: 0,
    roll: 0,
    x: 116.3911,
    y: 39.9067,
    z: 100,
  };
  heading = Cesium.Math.toRadians(obj.heading);
  pitch = Cesium.Math.toRadians(obj.pitch);
  roll = Cesium.Math.toRadians(obj.roll);

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(116.3911, 39.9025, 500), // 设置相机位置
    orientation: {
      heading: 0, // 设置航向角
      pitch: Cesium.Math.toRadians(-30), // 设置俯仰角
      roll: 0, // 设置翻滚角
    },
  });

  const gui = new dat.GUI();
  gui.domElement.style = "position:absolute;top:10px;left:10px;";
  // 加载模型
  model = viewer.entities.add({
    name: "Vue Logo",
    position: Cesium.Cartesian3.fromDegrees(116.3911, 39.9067), // 设置模型位置
    orientation: Cesium.Transforms.headingPitchRollQuaternion(
      Cesium.Cartesian3.fromDegrees(obj.x, obj.y, obj.z),
      new Cesium.HeadingPitchRoll(heading, pitch, roll)
    ), // 设置模型朝向
    model: {
      // uri: "/src/cesium/models/baby/scene.gltf", // 替换为实际模型路径
      uri: new URL("./models//baby/scene.gltf", import.meta.url).href,
      minimumPixelSize: 128, // 最小像素大小
      maximumScale: 20000, // 最大缩放比例
    },
  });
  refresh();
  // 控制相机的视角
  gui
    .add(obj, "heading", 0, 360, 1)
    .name("heading")
    .onChange(() => {
      refresh();
    });
  gui
    .add(obj, "pitch", 0, 360, 1)
    .name("pitch")
    .onChange(() => {
      refresh();
    });
  gui
    .add(obj, "roll", 0, 360, 1)
    .name("roll")
    .onChange(() => {
      refresh();
    });
  gui
    .add(obj, "x", 116.3901, 116.3921, 0.0001)
    .name("经度")
    .onChange(() => {
      refresh();
    });
  gui
    .add(obj, "y", 39.9057, 39.9077, 0.0001)
    .name("纬度")
    .onChange(() => {
      refresh();
    });
  gui
    .add(obj, "z", 0, 1000, 50)
    .name("高度")
    .onChange(() => {
      refresh();
    });
});

// 刷新模型位置和朝向
const refresh = () => {
  model.position = Cesium.Cartesian3.fromDegrees(obj.x, obj.y, obj.z); // 更新模型位置
  model.orientation = Cesium.Transforms.headingPitchRollQuaternion(
    Cesium.Cartesian3.fromDegrees(obj.x, obj.y, obj.z),
    new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(obj.heading),
      Cesium.Math.toRadians(obj.pitch),
      Cesium.Math.toRadians(obj.roll)
    )
  ); // 更新模型朝向
};

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

  // 添加地理标注
  const labelProvider = new Cesium.WebMapTileServiceImageryProvider({
    url:
      "http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&tileMatrix={TileMatrix}&tileRow={TileRow}&tileCol={TileCol}&style=default&format=tiles&tk=" +
      token,
    layer: "img",
    style: "default",
    format: "tiles",
    tileMatrixSetID: "w",
    subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], // 子域名轮询
    maximumLevel: 18,
    credit: new Cesium.Credit("天地图影像"),
  });
  // 天地图影像添加到viewer实例的影像图层集合中
  viewer.imageryLayers.addImageryProvider(tiandituProvider);
  // 天地图地理标注（后添加的会覆盖前面的）
  viewer.imageryLayers.addImageryProvider(labelProvider);
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

<!-- <ClientOnly>
  <Demo />
</ClientOnly>

<script setup>
import { ref, onMounted } from 'vue'

// 只在客户端导入组件
const Demo = ref(null)
onMounted(async () => {
  const demoModule = await import('@/Components/进阶/04_GUI调试.vue')
  Demo.value = demoModule.default
})
</script> -->