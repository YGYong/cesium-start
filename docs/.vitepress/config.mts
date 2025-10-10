import { defineConfig } from "vitepress";
import cesium from "vite-plugin-cesium";
import { resolve } from "path";
import { VueReplMdPlugin } from "vitepress-plugin-vue-repl";

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
      // {
      //   text: "官网更新日志",
      //   link: "/UpdateLog/cesiumlog.md",
      //   },
      {
        text: "赞助",
        link: "/Sponsor/赞助.md",
      },
      {
        text: "相关社区",
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
            text: "GeoJson数据（含区县）",
            link: "https://datav.aliyun.com/portal/school/atlas/area_selector",
          },
          {
            text: "GeoJSON边界数据",
            link: "https://geojson.hxkj.vip/",
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
            { text: "实体材质", link: "/Basics/09_实体材质" },
            { text: "Primitive图元", link: "/Basics/10_Primitive图元" },
            { text: "日期与时钟", link: "/Basics/13_日期与时钟" },
            { text: "3D_Tiles", link: "/Basics/14_3DTiles" },
            { text: "数据加载", link: "/Basics/15_数据加载" },
            { text: "专业名词", link: "/Basics/66_专业名词.md" },
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
                {
                  text: "底图加载",
                  collapsed: true,
                  items: [
                    {
                      text: "天地图影像",
                      link: "/Practice/基础/02_天地图影像.md",
                    },
                    {
                      text: "天地图标注",
                      link: "/Practice/基础/03_天地图标注.md",
                    },
                    { text: "高德地图", link: "/Practice/基础/04_高德地图.md" },
                    { text: "顶级影像", link: "/Practice/基础/05_顶级影像.md" },
                    {
                      text: "底图切换综合案例",
                      link: "/Practice/基础/06_底图综合案例.md",
                    },
                  ],
                },
                {
                  text: "Viewer视图",
                  collapsed: true,
                  items: [
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
                  ],
                },
                {
                  text: "相机控制",
                  collapsed: true,
                  items: [
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
                  ],
                },
                {
                  text: "坐标系转化及事件",
                  collapsed: true,
                  items: [
                    {
                      text: "坐标系转换",
                      link: "/Practice/基础/14_坐标系转换.md",
                    },
                    { text: "屏幕事件", link: "/Practice/基础/15_屏幕事件.md" },
                    { text: "相机事件", link: "/Practice/基础/16_相机事件.md" },
                    { text: "渲染事件", link: "/Practice/基础/17_渲染事件.md" },
                  ],
                },
                {
                  text: "实体基础",
                  collapsed: true,
                  items: [
                    { text: "实体点", link: "/Practice/基础/18_实体点.md" },
                    { text: "聚合点", link: "/Practice/基础/19_聚合点.md" },
                    { text: "实体线", link: "/Practice/基础/20_实体线.md" },
                    { text: "实体面", link: "/Practice/基础/21_实体面.md" },
                    { text: "带孔洞面", link: "/Practice/基础/22_带孔洞面.md" },
                    { text: "模型加载", link: "/Practice/基础/23_模型加载.md" },
                    { text: "模型动画", link: "/Practice/基础/24_模型动画.md" },
                    { text: "模型裁剪", link: "/Practice/基础/25_模型裁剪.md" },
                    { text: "标签", link: "/Practice/基础/26_标签.md" },
                    { text: "广告牌", link: "/Practice/基础/27_广告牌.md" },
                    { text: "矩形", link: "/Practice/基础/28_矩形.md" },
                    { text: "墙", link: "/Practice/基础/29_墙.md" },
                    { text: "椭圆", link: "/Practice/基础/30_椭圆.md" },
                    { text: "椭圆体", link: "/Practice/基础/31_椭圆体.md" },
                    { text: "圆柱体", link: "/Practice/基础/32_圆柱体.md" },
                    { text: "箱", link: "/Practice/基础/33_箱.md" },
                    { text: "走廊", link: "/Practice/基础/34_走廊.md" },
                    {
                      text: "实体生命周期",
                      link: "/Practice/基础/35_实体生命周期.md",
                    },
                  ],
                },
                {
                  text: "材质基础",
                  collapsed: true,
                  items: [
                    {
                      text: "动态颜色材质",
                      link: "/Practice/基础/36_动态颜色材质.md",
                    },
                    { text: "图片材质", link: "/Practice/基础/37_图片材质.md" },
                    { text: "棋盘材质", link: "/Practice/基础/38_棋盘材质.md" },
                    { text: "条纹材质", link: "/Practice/基础/39_条纹材质.md" },
                    { text: "网格材质", link: "/Practice/基础/40_网格材质.md" },
                    {
                      text: "折线发光材质",
                      link: "/Practice/基础/41_折线发光材质.md",
                    },
                    {
                      text: "折线轮廓材质",
                      link: "/Practice/基础/42_折线轮廓材质.md",
                    },
                    {
                      text: "折线虚线材质",
                      link: "/Practice/基础/43_折线虚线材质.md",
                    },
                    {
                      text: "折线箭头材质",
                      link: "/Practice/基础/44_折线箭头材质.md",
                    },
                  ],
                },
                {
                  text: "Primitive",
                  collapsed: true,
                  items: [
                    {
                      text: "矩形图元",
                      link: "/Practice/基础/45_矩形图元.md",
                    },
                    {
                      text: "箱图元",
                      link: "/Practice/基础/46_箱图元.md",
                    },
                    {
                      text: "添加模型",
                      link: "/Practice/基础/47_添加模型.md",
                    },
                    {
                      text: "PerInstanceColorAppearance",
                      link: "/Practice/基础/48_PerInstanceColorAppearance.md",
                    },
                    {
                      text: "EllipsoidSurfaceAppearance",
                      link: "/Practice/基础/49_EllipsoidSurfaceAppearance.md",
                    },
                    {
                      text: "PolylineMaterialAppearance",
                      link: "/Practice/基础/50_PolylineMaterialAppearance.md",
                    },
                  ],
                },
                {
                  text: "3D Tiles",
                  collapsed: true,
                  items: [
                    { text: "全球OSM", link: "/Practice/基础/51_全球OSM.md" },
                    {
                      text: "加载状态监听",
                      link: "/Practice/基础/52_3DTiles加载状态监听.md",
                    },
                    {
                      text: "点击事件及样式表达式",
                      link: "/Practice/基础/53_点击事件及样式表达式.md",
                    },
                  ],
                },
                {
                  text: "数据加载",
                  collapsed: true,
                  items: [
                    { text: "GeoJSON", link: "/Practice/基础/54_GeoJSON.md" },
                    { text: "区域掩膜", link: "/Practice/基础/55_区域掩膜.md" },
                    { text: "CZML", link: "/Practice/基础/56_CZML.md" },
                    { text: "KML", link: "/Practice/基础/57_KML.md" },
                  ],
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
  markdown: {
    config: (md) => {
      md.use(VueReplMdPlugin);
    },
  },
  vite: {
    plugins: [
      cesium()
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, ".", "../src/"),
      },
    },
    ssr: {
      // 完全禁用这些依赖的 SSR
      external: []
    }
  },
  // 添加构建配置以避免 SSR 问题
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('cesium-')
      }
    }
  }
});