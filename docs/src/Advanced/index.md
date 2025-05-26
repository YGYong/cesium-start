# 进阶

## 基础

- 快速开始
  - 安装与配置
  - 创建第一个 Cesium 场景
- 核心概念
  - Viewer 与 Scene 容器
  - 坐标系（WGS84/笛卡尔坐标）
  - 时间与时区控制
- 基础功能

  - 加载默认地图（Bing/OSM）
  - 相机控制（平移/缩放/旋转）
  - 添加点、线、面实体（Entity）
  - 加载模型
  - 事件监听
  - 加载 GeoJson
  - 加载 CZML
  - 加载 3D Tiles
  - 纹理与材质
  - 光照与阴影
  - 地形数据
  - 高程地形与影像叠加

  ## 进阶

- 性能优化
  - 数据分块加载（TileLoad）
  - 视锥体裁剪（Frustum Culling）
  - 模型 LOD 控制
- 高级数据可视化
  - 3D 模型（glTF）加载与动画
  - 粒子系统（雨雪/火焰特效）
  - 动态路径可视化（CZML）
- 复杂场景处理

  - 地形挖洞与裁剪
  - 多视口同步（多个 Viewer 联动）
  - 与 Three.js/Mapbox 集成

  ## API

- 核心类库
  - Viewer 与 Scene
  - Camera 与 ScreenSpaceCameraController
  - Entity 与 Primitive
- 数据源与图层
  - CZMLDataSource
  - GeoJsonDataSource
  - ImageryLayerCollection
- 工具与工具类

  - 坐标转换（Cartesian3/Transforms）
  - 拾取（Pick）与事件处理
  - 时间轴（Timeline）/动画（Clock）

  ## 案例

- 常见场景
  - 三维城市建模（倾斜摄影）
  - 飞行轨迹模拟（动态 Entity）
  - 热力图与等高线叠加
- 行业应用
  - 智慧城市（建筑分层显示）
  - 灾害监测（动态扩散效果）
  - 军事仿真（雷达范围可视化）
- 完整项目
  - 从零搭建地理信息平台
  - 结合 Vue/React 的工程化实践
