
## 添加 3d 实体

```js
try {
  const tileset = await Cesium.createOsmBuildingsAsync();
  viewer.scene.primitives.add(tileset);
} catch (error) {
  console.log(`Error creating tileset: ${error}`);
}
```

![默认3D实体](../Aassets/Advanced/namol3D.png)