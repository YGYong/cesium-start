// theme/index.js
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  async enhanceApp({ app }) {
    // 只在客户端注册组件
    if (!import.meta.env.SSR) {
      const { default: Playground } = await import('vitepress-plugin-vue-repl/components/index.vue')
      app.component('VuePlayground', Playground)
    }
  },
  // 添加客户端路由处理
  setup() {
    // 只在客户端执行
    if (typeof window !== 'undefined') {
      // 可以在这里添加一些客户端特定的设置
    }
  }
}