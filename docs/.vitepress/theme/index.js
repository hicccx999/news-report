import DefaultTheme from 'vitepress/theme'
import CustomLayout from './CustomLayout.vue'
import TextReader from './components/TextReader.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component('TextReader', TextReader)
    
    // 修复开发模式下 URL 闪烁问题
    if (typeof window !== 'undefined') {
      const base = '/news-report'
      
      router.onBeforeRouteChange = (to) => {
        // 确保 URL 包含 base 路径
        if (to && !to.startsWith(base) && !to.startsWith('http')) {
          return base + to
        }
        return to
      }
    }
  }
}
