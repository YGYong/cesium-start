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
  }
}