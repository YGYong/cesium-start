// theme/index.ts
import Playground from 'vitepress-plugin-vue-repl/components/index.vue'
import DefaultTheme from 'vitepress/theme';

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
      ctx.app.component('VuePlayground', Playground);
    },
};