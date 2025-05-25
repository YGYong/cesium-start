# 坐标系

## 笛卡尔坐标系
Cartesian3 是 Cesium 中用于表示三维空间中的点的类，它包含三个分量：x、y 和 z。
Cartesion2 是 Cesium 中用于表示二维空间中的点的类，它包含两个分量：x 和 y。
Cartographic 是 Cesium 中用于表示经纬度坐标的类，它包含两个分量：longitude（经度）和 latitude（纬度）。

## 地理坐标系
Geographic3 是 Cesium 中用于表示地理坐标系中的点的类，它包含三个分量：longitude（经度）、latitude（纬度）和 height（高度）。
Geographic2 是 Cesium 中用于表示地理坐标系中的点的类，它包含两个分量：longitude（经度）和 latitude（纬度）。
WGS84 是一种常用的地理坐标系，用于表示地球表面上的点， 它的原点是地球的质心， 坐标轴分别是经度、纬度和高度。

## 投影坐标系
Projection 是 Cesium 中用于表示投影坐标系的类，它包含两个分量：x 和 y。
ProjectionTransform 是 Cesium 中用于表示投影转换的类，它包含两个分量：x 和 y。
WebMercatorProjection 是 Cesium 中用于表示 Web 墨卡托投影的类，它包含两个分量：x 和 y。

## 弧度和角度
弧度是一种用于测量角度的单位，它的定义是：1 弧度等于 180 度除以 π。
角度是一种用于测量角度的单位，它的定义是：1 度等于 π 弧度除以 180。
Cesium 中提供了 Math 类，用于进行弧度和角度之间的转换。
```js
// 弧度和角度之间的转换
const radian = Cesium.Math.toRadians(30); // 30 度转换为弧度
const degree = Cesium.Math.toDegrees(radian); // 弧度转换为度
```

## 转化
### 笛卡尔坐标系转化为地理坐标系
```js
const cartesian3 = new Cesium.Cartesian3(1000000, 2000000, 3000000); // 笛卡尔坐标
const cartographic = Cesium.Cartographic.fromCartesian(cartesian3); // 转换为地理坐标
const longitude = Cesium.Math.toDegrees(cartographic.longitude); // 经度
const latitude = Cesium.Math.toDegrees(cartographic.latitude); // 纬度
const height = cartographic.height; // 高度
```
### 地理坐标系转化为笛卡尔坐标系
```js
const cartographic = new Cesium.Cartographic(Cesium.Math.toRadians(longitude), Cesium.Math.toRadians(latitude), height); // 地理坐标
const cartesian3 = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height); // 转换为笛卡尔坐标
const x = cartesian3.x; // x    
const y = cartesian3.y; // y
const z = cartesian3.z; // z
```
### 投影坐标系转化为地理坐标系
```js
const projectionTransform = new Cesium.ProjectionTransform(); // 投影转换
const cartographic = projectionTransform.unproject(x, y); // 转换为地理坐标
const longitude = Cesium.Math.toDegrees(cartographic.longitude); // 经度
const latitude = Cesium.Math.toDegrees(cartographic.latitude); // 纬度
const height = cartographic.height; // 高度
```
### 地理坐标系转化为投影坐标系
```js
const projectionTransform = new Cesium.ProjectionTransform(); // 投影转换
const cartographic = new Cesium.Cartographic(Cesium.Math.toRadians(longitude), Cesium.Math.toRadians(latitude), height); // 地理坐标
const x = projectionTransform.project(cartographic.longitude, cartographic.latitude); // 转换为投影坐标
const y = projectionTransform.project(cartographic.longitude, cartographic.latitude); // 转换为投影坐标
```
