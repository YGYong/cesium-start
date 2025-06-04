import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cesium学习之路",
  description: "Cesium docs",
  srcDir: "src",
  lastUpdated: true,
  themeConfig: {
    // aside: false,
    outline: {
      level: "deep",
      label: "目录",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "基础", link: "/Basics/00_简介.md" },
      { text: "进阶", link: "/Advanced/00_时间.md" },
      { text: "实践", link: "/Practice/00_.md" },
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
            text: "优秀开源博客(cesium.xin)",
            link: "http://cesium.xin/",
          },
        ],
      },
      {
        text: "更新日志",
        link: "/UpdateLog/mydocs.md",
      },
    ],

    sidebar: {
      "/Basics/": [
        {
          text: "基础",
          items: [
            { text: "介绍", link: "/Basics/00_简介.md" },
            { text: "快速开始", link: "/Basics/01_快速开始" },
            { text: "页面控件及logo隐藏", link: "/Basics/02_页面控件" },
            { text: "Viewer视图", link: "/Basics/03_Viewer视图" },
            { text: "添加底图", link: "/Basics/04_添加底图" },
            { text: "相机", link: "/Basics/05_相机" },
            { text: "坐标系", link: "/Basics/06_坐标系" },
            { text: "事件", link: "/Basics/07_事件" },
            { text: "实体类型", link: "/Basics/08_实体" },
            { text: "材质", link: "/Basics/09_材质" },
          ],
        },
      ],
      "/Advanced/": [
        {
          text: "进阶",
          items: [
            { text: "时间", link: "/Advanced/00_时间.md" },
            { text: "Scene场景", link: "/Advanced/01_Scene场景.md" },
            { text: "Primitive图元", link: "/Advanced/02_Primitive图元.md" },
            { text: "Appearance外观", link: "/Advanced/03_Appearance外观.md" },
            { text: "3DTiles", link: "/Advanced/04_3DTiles.md" },
            { text: "自定义材质", link: "/Advanced/05_自定义材质.md" },
            { text: "事件进阶", link: "/Advanced/06_事件进阶.md" },
          ],
        },
      ],
      "/UpdateLog/": [
        {
          text: "更新日志",
          items: [
            { text: "本文档", link: "/UpdateLog/mydocs.md" },
            { text: "cesium官网", link: "/UpdateLog/cesiumlog.md" },
          ],
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
    lastUpdatedText: "最后更新时间",
    search: {
      provider: "local",
    },
  },
});
