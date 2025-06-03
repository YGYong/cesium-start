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
      { text: "进阶", link: "/Advanced/index.md" },
      { text: "实践", link: "/Practice/00_.md" },
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
            { text: "介绍", link: "/Advanced/index.md" },
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
