# 3D Tiles 大规模三维地理空间数据

## 什么是 3D Tiles？

简单理解：想象一下你要在手机上查看整个城市的三维模型，但手机内存有限装不下所有数据。3D Tiles 就像一个智能的"数据快递员"：

- 它把庞大的 3D 模型切成小块（瓦片）
- 只加载你当前能看到的部分
- 当你移动时，动态加载新区域
- 离得远时显示简化版，离得近时显示精细版

[3D Tiles 官方介绍](https://github.com/CesiumGS/3d-tiles/tree/main/specification)。

### 核心优势

| 特性           | 说明                             | 价值               |
| -------------- | -------------------------------- | ------------------ |
| **分层细节**   | 根据视距动态加载不同精度模型     | 平衡性能与视觉质量 |
| **空间索引**   | 基于四叉树/八叉树的瓦片组织      | 实现高效视锥体剔除 |
| **流式传输**   | 按需加载可见区域数据             | 降低初始加载时间   |
| **语义元数据** | 保留要素级属性信息               | 支持交互查询与分析 |
| **格式开放**   | 基于 glTF 标准，兼容主流 3D 生态 | 确保长期可访问性   |

## 数据规范与结构

### 核心文件组成

一个完整的 3D Tiles 数据集包含：

1. **tileset.json** - 数据集根描述文件

   - 元数据与全局属性
   - 瓦片层级结构定义
   - 扩展功能声明

2. **瓦片内容文件** - 实际 3D 数据

   - .b3dm：批量 3D 模型
   - .i3dm：实例化 3D 模型
   - .pnts：点云数据
   - .cmpt：复合瓦片
   - .gltf/.glb：通用 3D 模型

3. **元数据文件** - 属性定义与数据
   - 模式定义(schema.json)
   - 属性表(propertyTables)
   - 批量元数据(batchTable)

### tileset.json 结构解析

```json
{
  "asset": {
    "version": "1.1", // 规范版本
    "tilesetVersion": "1.0.0" // 数据集版本
  },
  "geometricError": 500, // 根节点几何误差
  "root": {
    "boundingVolume": {
      "region": [-180, -90, 180, 90, 0, 1000] // 经纬度范围+高度
    },
    "geometricError": 250, // 节点几何误差
    "refine": "REPLACE", // 细化方式：REPLACE/ADD
    "content": { "uri": "root.glb" }, // 瓦片内容
    "children": [
      /* 子瓦片 */
    ]
  },
  "extensions": {
    "3DTILES_metadata": {
      /* 元数据定义 */
    },
    "3DTILES_implicit_tiling": {
      /* 隐式瓦片配置 */
    }
  }
}
```

## 加载与配置

### 加载全球建筑

`createOsmBuildingsAsync` 为 Cesium OSM 建筑瓦片集创建一个 Cesium3DTileset 实例

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
    baseLayer: false, // 关闭默认地图
  });
  // 清空logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  initMap();

  // 添加OSM建筑物数据
  const tileset = await Cesium.createOsmBuildingsAsync();
  viewer.scene.primitives.add(tileset);
  // 定位到北京天安门
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(116.3911, 39.9067, 500),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: Cesium.Math.toRadians(0),
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

![OsmBuildings](../Aassets/Basics/tiles.png)

### 基础加载流程

使用异步方法 `Cesium.Cesium3DTileset.fromUrl(url, options)` 加载 3D Tiles 数据集。

- `maximumScreenSpaceError`: 最大屏幕空间误差，值越小越精细（默认 16）

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
  viewer.scene.primitives.add(tileset);
  viewer.zoomTo(tileset); // 缩放到3D Tileset
});
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
```

:::

![3D Tileset 加载](../Aassets/Basics/tiles3.png)

### 关键配置参数

| 参数                        | 类型    | 默认值    | 说明               | 性能影响 |
| --------------------------- | ------- | --------- | ------------------ | -------- |
| `maximumScreenSpaceError`   | Number  | 16        | 最大屏幕空间误差   | 高       |
| `maximumCacheOverflowBytes` | Number  | 536870912 | 最大缓存溢出字节数 | 中       |
| `skipLevelOfDetail`         | Boolean | false     | 是否跳过中间 LOD   | 高       |
| `dynamicScreenSpaceError`   | Boolean | false     | 动态误差计算       | 中       |
| `cullWithChildrenBounds`    | Boolean | true      | 使用子瓦片边界剔除 | 中       |
| `preferLeaves`              | Boolean | false     | 优先加载细节瓦片   | 高       |
| `loadSiblings`              | Boolean | false     | 预加载兄弟瓦片     | 高       |
| `cullWithChildrenBounds`    | Boolean | true      | 使用子瓦片边界剔除 | 中       |

### 加载状态监听

```js
// 监听加载进度
tileset.loadProgress.addEventListener((pending, processing) => {
  console.log(pending, processing, "tileset.totalTilesCount");
  if (pending === 0 && processing === 0) {
    console.log("瓦片集加载完成");
  }
});
```

## 高级功能应用

### 属性查询与交互

添加点击事件，当前点击的瓦片会变为黄色，并打印出该瓦片的属性。

```js
viewer.screenSpaceEventHandler.setInputAction((click) => {
  const picked = viewer.scene.pick(click.position);
  if (picked instanceof Cesium.Cesium3DTileFeature) {
    // 当前点击为黄色
    picked.color = Cesium.Color.YELLOW;
    const properties = picked.getPropertyIds();
    // 获取属性并打印
    properties.forEach((name) => {
      console.log(`${name}: ${picked.getProperty(name)}`);
    });
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

![3D Tiles 属性](../Aassets/Basics/tiles1.png)

#### 添加调试面板

```js
viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
```

#### 样式表达与可视化

3DTiles 支持强大的样式表达能力，可基于要素属性动态调整外观，[Cesium3DTileStyle 文档](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileStyle.html?classFilter=Cesium3DTileStyle)

```js
tileset.style = new Cesium.Cesium3DTileStyle({
  color: {
    conditions: [
      ["${Height} >= 80", "color('purple')"], // 高楼红色
      ["${Height} >= 50", "color('red')"], // 中楼橙色
      ["${Height} >= 10", "color('green')"], // 低楼绿色
      ["true", "color('blue')"], // 其他蓝色
    ],
  },
});
```

![3D Tiles 样式](../Aassets/Basics/tiles2.png)

## 浅谈

> 记得设置`Cesium.Ion`

工作中还真没有加载过 3D Tiles 数据集，拿一个官网的例子简单介绍一下基本使用
