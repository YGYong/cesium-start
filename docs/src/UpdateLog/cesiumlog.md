# 更新日志

浏览器默认翻译，主要记录 新的 API 和废弃 API

重要更新：

- xxx：更新了 xxx API ，废弃了 xxx API

### Cesium 1.130.1 (2025-06-24)

[日志](https://github.com/CesiumGS/cesium/blob/1.130.1/CHANGES.md)

- 增加了对使用草稿 glTF 扩展加载使用 SPZ 压缩编码的高斯图案 3D Tiles 的实验性支持
- 增加了对整数纹理格式的支持：R32I、RG32I、RGB32I、RGBA32I、R32UI、RG32UI、RGB32UI、RGBA32UI

### Cesium 1.130 (2025-06-02)

- 添加对在 3D Tiles 上叠加图像的基本支持。
- 添加了对 3D 纹理的支持，并附带一个 Volume Cloud 沙堡示例。
- 更新了 FragmentInput 体素着色器的结构，使其与其他 CustomShaders 更加一致。
- 修复了正交相机的体素渲染问题。
