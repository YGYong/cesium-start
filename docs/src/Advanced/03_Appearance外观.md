# Cesium Appearance（外观）系统深度解析

## 什么是 Appearance？

Appearance（外观） 是 Cesium 中控制图元视觉呈现的核心组件，它定义了如何渲染几何体的表面特性。Appearance 系统包含以下核心功能：

- 材质系统：定义颜色、纹理和表面特性
- 着色器控制：自定义 GLSL 着色器代码
- 渲染状态：配置深度测试、混合模式等 WebGL 状态
- 顶点处理：控制几何数据的处理方式

## Appearance 类型体系

| 外观类型                   | 描述         | 典型应用             |
| -------------------------- | ------------ | -------------------- |
| MaterialAppearance         | 通用材质外观 | 大多数表面渲染       |
| PerInstanceColorAppearance | 实例颜色外观 | 批量渲染不同颜色对象 |
| EllipsoidSurfaceAppearance | 椭球表面外观 | 贴合地球表面的图元   |
| PolylineMaterialAppearance | 折线材质外观 | 带材质的折线         |
| PolylineColorAppearance    | 折线颜色外观 | 固定颜色的折线       |
| DebugAppearance            | 调试外观     | 显示几何结构         |

## Appearance 核心配置选项

### MaterialAppearance 通用配置

```js
const appearance = new Cesium.MaterialAppearance({
  // 材质定义
  material: Cesium.Material.fromType("DiffuseMap"),

  // 是否半透明
  translucent: true,

  // 是否闭合几何（用于背面渲染）
  closed: false,

  // 是否启用平面着色
  flat: false,
});
```

### 创建内置材质

使用`Cesium.Material.fromType`创建材质,材质配置项可参考[基础材质](../Basics/09_材质.md),
更多内置材质可参考[内置材质](https://cesium.com/learn/cesiumjs/ref-doc/Material.html)

```js
// 创建棋盘格材质
const checkerboardMaterial = Cesium.Material.fromType("Checkerboard", {
  evenColor: Cesium.Color.WHITE,
  oddColor: Cesium.Color.BLACK,
  repeat: new Cesium.Cartesian2(10, 10),
});

// 创建条纹材质
const stripeMaterial = Cesium.Material.fromType("Stripe", {
  evenColor: Cesium.Color.RED,
  oddColor: Cesium.Color.BLUE,
  repeat: 5,
  orientation: Cesium.StripeOrientation.VERTICAL,
});

// 创建网格材质
const gridMaterial = Cesium.Material.fromType("Grid", {
  color: Cesium.Color.YELLOW,
  cellAlpha: 0.2,
  lineCount: new Cesium.Cartesian2(8, 8),
  lineThickness: new Cesium.Cartesian2(2.0, 2.0),
});
```
