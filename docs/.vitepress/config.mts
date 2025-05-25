import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cesium学习之路",
  description: "Cesium docs2",
  srcDir: "src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "基础", link: "/Basics/index.md" },
      { text: "进阶", link: "/Advanced/index.md" },
    ],

    sidebar: {
      "/Basics/": [
        {
          text: "基础",
          items: [
            { text: "介绍", link: "/Basics/index.md" },
            { text: "快速开始", link: "/Basics/QuickStart" },
            { text: "页面控件及logo隐藏", link: "/Basics/Controls" },
            { text: "Viewer视图", link: "/Basics/Viewer" },
            { text: "添加自定义底图", link: "/Basics/ReplaceBaseMap" },
            { text: "相机", link: "/Basics/Camera" },
            { text: "坐标系", link: "/Basics/Coordinate" },
            { text: "事件", link: "/Basics/HandleClick" },
            { text: "实体类型", link: "/Basics/entityAdd" },
          ],
        },
      ],
      "/Advanced/": [
        {
          text: "进阶",
          items: [
            { text: "介绍2", link: "/Advanced/index.md" },
            { text: "安装2", link: "/Advanced/Installation.md" },
            { text: "快速开始2", link: "/Advanced/QuickStart.md" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
