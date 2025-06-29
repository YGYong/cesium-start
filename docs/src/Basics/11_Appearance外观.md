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

### MaterialAppearance 通用材质外观

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

#### 创建内置材质

使用`Cesium.Material.fromType`创建材质,材质配置项可参考[基础材质](./09_材质.md),
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

### PerInstanceColorAppearance 实例颜色外观

使用 instance 颜色外观,为每个几何体实例设置不同的颜色，适合批量渲染不同颜色的图元。

```js
const appearance = new Cesium.PerInstanceColorAppearance({
  translucent: true, // 是否半透明
  closed: false, // 是否封闭几何体
  flat: false, // 是否使用平面着色,不考虑光照
  renderState: {
    // 自定义渲染状态
    depthTest: {
      enabled: true,
    },
  },
});
```

代码参考：`自定义两个图元，各自定义不同的颜色`，高性能，适合批量渲染

```js
const instance = new Cesium.GeometryInstance({
  geometry: new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(0.0, 20.0, 10.0, 30.0),
  }),
  attributes: {
    color: new Cesium.ColorGeometryInstanceAttribute(1.0, 0.0, 0.0, 0.5),
  },
});

const anotherInstance = new Cesium.GeometryInstance({
  geometry: new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(0.0, 40.0, 10.0, 50.0),
  }),
  attributes: {
    color: new Cesium.ColorGeometryInstanceAttribute(0.0, 0.0, 1.0, 0.5),
  },
});

const rectanglePrimitive = new Cesium.Primitive({
  geometryInstances: [instance, anotherInstance],
  appearance: new Cesium.PerInstanceColorAppearance({
    flat: true, // 不考虑光照
    translucent: true, // 启用透明度
  }),
});
```

### EllipsoidSurfaceAppearance

椭球表面外观，专门用于渲染贴合地球表面的图元，支持多种材质。

```js
// 1. 定义椭球体几何体
const geometry = new Cesium.PolygonGeometry({
  polygonHierarchy: new Cesium.PolygonHierarchy(
    Cesium.Cartesian3.fromDegreesArray([
      116.39,
      39.9, // 第一个点
      116.4,
      39.9, // 第二个点
      116.4,
      39.91, // 第三个点
      116.39,
      39.91, // 第四个点
    ])
  ),
  height: 0, // 高度为0，表示在地面上
  vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT, // 包含位置和法线信息
});
// 2. 创建几何实例
const geometryInstance = new Cesium.GeometryInstance({
  geometry,
});
// 3. 创建外观
const appearance = new Cesium.EllipsoidSurfaceAppearance({
  material: Cesium.Material.fromType("Stripe"),
});

// 4. 创建 Primitive
const primitive = new Cesium.Primitive({
  geometryInstances: [geometryInstance],
  appearance,
});

viewer.scene.primitives.add(primitive);
```

### PolylineMaterialAppearance

折线材质外观，支持多种材质类型，适合渲染带有特殊效果的折线。

```js
// 1. 定义线段几何体
const geometryInstance = new Cesium.GeometryInstance({
  geometry: new Cesium.PolylineGeometry({
    positions: Cesium.Cartesian3.fromDegreesArray([
      116.39,
      39.9, // 第一个点
      116.4,
      39.9, // 第二个点
      116.4,
      39.91, // 第三个点
      116.39,
      39.91, // 第四个点
    ]),
    width: 10.0,
    vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
  }),
});

// 2. 创建外观
const appearance = new Cesium.PolylineMaterialAppearance({
  material: Cesium.Material.fromType("Color"),
});

// 3. 创建几何体实例
const primitive = new Cesium.Primitive({
  geometryInstances: [geometryInstance],
  appearance,
});
```

<!-- ### Appearance 核心配置

#### 渲染状态 (RenderState)

```js
const renderState = {
  depthTest: {
    enabled: true, // 启用深度测试
    func: Cesium.DepthFunction.LESS, // 深度测试函数
  },
  blending: Cesium.BlendingState.ALPHA_BLEND, // 混合模式
  cull: {
    enabled: true, // 启用面剔除
    face: Cesium.CullFace.BACK, // 剔除背面
  },
  stencilTest: {
    // 模板测试
    enabled: true,
    frontFunction: Cesium.StencilFunction.ALWAYS,
    backFunction: Cesium.StencilFunction.ALWAYS,
  },
  scissorTest: {
    // 裁剪测试
    enabled: false,
  },
};

const appearance = new Cesium.MaterialAppearance({
  renderState: renderState,
});
```

#### 顶点属性格式 (VertexFormat)

```js
// 常用顶点格式组合
const vertexFormat = Cesium.VertexFormat.concat([
  Cesium.VertexFormat.POSITION, // 位置
  Cesium.VertexFormat.NORMAL, // 法线
  Cesium.VertexFormat.ST, // 纹理坐标
  Cesium.VertexFormat.COLOR, // 颜色
]);

const appearance = new Cesium.MaterialAppearance({
  vertexFormat: vertexFormat,
  material: Cesium.Material.fromType("DiffuseMap", {
    image: "texture.jpg",
  }),
});
```

### 着色器自定义

```js
const appearance = new Cesium.MaterialAppearance({
  material: Cesium.Material.fromType("DiffuseMap", {
    image: "texture.jpg",
  }),
  vertexShaderSource: `
    // 扩展内置顶点着色器
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 st;
    
    varying vec3 v_positionEC;
    varying vec3 v_normalEC;
    varying vec2 v_st;
    
    void main() {
      // 调用内置函数
      czm_position = czm_modelViewProjection * vec4(position, 1.0);
      
      // 传递变量
      v_positionEC = (czm_modelView * vec4(position, 1.0)).xyz;
      v_normalEC = czm_normal * normal;
      v_st = st;
      
      // 添加自定义变换
      gl_Position = czm_position;
    }
  `,
  fragmentShaderSource: `
    // 扩展内置片元着色器
    uniform sampler2D diffuseMap;
    
    varying vec3 v_positionEC;
    varying vec3 v_normalEC;
    varying vec2 v_st;
    
    void main() {
      // 基础材质计算
      vec4 color = texture2D(diffuseMap, v_st);
      
      // 添加边缘发光效果
      vec3 viewDir = normalize(-v_positionEC);
      float rim = 1.0 - max(dot(viewDir, v_normalEC), 0.0);
      vec3 emission = vec3(0.0, 0.5, 1.0) * pow(rim, 3.0);
      
      gl_FragColor = vec4(color.rgb + emission, color.a);
    }
  `,
});
``` -->
