import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cesium快速入门",
  sitemap: {
    hostname: "http://c.ygyong.cn",
  },
  description: "Cesium快速入门、Cesium中文网、Cesium案例集合",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "description",
        content: "Cesium快速入门、Cesium中文网、Cesium案例集合、Webgis入门",
      },
    ],
  ],
  srcDir: "src",
  // lastUpdated: true,
  themeConfig: {
    // aside: false,
    logo: "/favicon.ico",
    outline: {
      level: "deep",
      label: "目录",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "基础", link: "/Basics/00_简介.md" },
      { text: "实践", link: "/Practice/声明.md" },
      {
        text: "外部链接",
        items: [
          {
            text: "Cesium 官网",
            link: "https://cesium.com/",
          },
          {
            text: "Cesium API",
            link: "https://cesium.com/learn/cesiumjs/ref-doc/",
          },
          {
            text: "Cesium Demo",
            link: "https://sandcastle.cesium.com/index.html?src=3D%20Models.html&label=All",
          },
          {
            text: "3D模型",
            link: "https://sketchfab.com/feed",
          },
          {
            text: "GeoJson数据",
            link: "https://geojson.cn/data/atlas/china",
          },
          {
            text: "Cesium-Examples",
            link: "https://github.com/jiawanlong/Cesium-Examples",
          },
          {
            text: "cesium.xin",
            link: "http://cesium.xin/",
          },
          {
            text: "vue for cesium",
            link: "https://zouyaoji.top/vue-cesium/#/zh-CN",
          },
        ],
      },
      {
        text: "更新日志",
        link: "/UpdateLog/cesiumlog.md",
      },
    ],

    sidebar: {
      "/Basics/": [
        {
          text: "基础",
          items: [
            { text: "介绍", link: "/Basics/00_简介.md" },
            { text: "快速开始", link: "/Basics/01_快速开始" },
            { text: "添加底图", link: "/Basics/04_添加底图" },
            { text: "Viewer视图", link: "/Basics/03_Viewer视图" },
            { text: "相机", link: "/Basics/05_相机" },
            { text: "坐标系", link: "/Basics/06_坐标系" },
            { text: "事件系统", link: "/Basics/07_事件" },
            { text: "实体类型", link: "/Basics/08_实体" },
            { text: "材质", link: "/Basics/09_材质" },
            { text: "Primitive图元", link: "/Basics/10_Primitive图元" },
            { text: "Appearance外观", link: "/Basics/11_Appearance外观" },
            { text: "自定义材质", link: "/Basics/12_自定义材质" },
            { text: "日期与时钟", link: "/Basics/13_日期与时钟" },
            { text: "3D_Tiles", link: "/Basics/14_3DTiles" },
            { text: "数据加载", link: "/Basics/15_数据加载" },
            { text: "常用实例", link: "/Basics/17_常用实例.md" },
          ],
        },
      ],
      "/Practice/": [
        {
          text: "实践",
          items: [
            { text: "声明", link: "/Practice/声明.md" },
            { text: "公共函数", link: "/Practice/公共函数.md" },
            {
              text: "基础案例",
              collapsed: false,
              items: [
                { text: "初始化", link: "/Practice/基础/01_初始化.md" },
                { text: "天地图影像", link: "/Practice/基础/02_天地图影像.md" },
                { text: "天地图标注", link: "/Practice/基础/03_天地图标注.md" },
                { text: "高德地图", link: "/Practice/基础/04_高德地图.md" },
                { text: "顶级影像", link: "/Practice/基础/05_顶级影像.md" },
                {
                  text: "底图切换综合案例",
                  link: "/Practice/基础/06_底图综合案例.md",
                },
                { text: "气泡窗口", link: "/Practice/基础/07_气泡窗口.md" },
                {
                  text: "自定义天空盒",
                  link: "/Practice/基础/08_自定义天空盒.md",
                },
                {
                  text: "加载GeoJSON",
                  link: "/Practice/基础/09_加载GeoJSON.md",
                },
                { text: "海量图标", link: "/Practice/基础/10_海量图标.md" },
                {
                  text: "默认相机视角",
                  link: "/Practice/基础/11_默认相机视角.md",
                },
                {
                  text: "相机常用方法",
                  link: "/Practice/基础/12_相机常用方法.md",
                },
                {
                  text: "键盘控制相机交互",
                  link: "/Practice/基础/13_键盘控制相机交互.md",
                },
                {
                  text: "坐标系转换",
                  link: "/Practice/基础/14_坐标系转换.md",
                },
              ],
            },
            {
              text: "进阶案例",
              collapsed: true,
              items: [
                { text: "网格", link: "/Practice/进阶/01_网格.md" },
                { text: "飞机飞行", link: "/Practice/进阶/02_飞机飞行.md" },
                { text: "加载控件", link: "/Practice/进阶/03_加载控件.md" },
                { text: "GUI调试", link: "/Practice/进阶/04_GUI调试.md" },
                { text: "动态时序图", link: "/Practice/进阶/05_动态时序图.md" },
                { text: "沿线标注", link: "/Practice/进阶/06_沿线标注.md" },
              ],
            },
          ],
        },
      ],
      "/UpdateLog/": [
        {
          text: "更新日志",
          items: [{ text: "更新日志", link: "/UpdateLog/cesiumlog.md" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/YGYong/cesium-start" },
    ],
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    // lastUpdatedText: "最后更新时间",
    search: {
      provider: "local",
    },
  },
});
