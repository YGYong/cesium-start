```js
// 以后加载中国geojson数据时，设置不同面的材质颜色
entities.forEach(
  (entity, i) =>
    (entity.polygon.material = new cesium.colorMaterialProperty(
      Cesium.Color.fromRandom({ alpha: 0.5 })
    ))
);
```
