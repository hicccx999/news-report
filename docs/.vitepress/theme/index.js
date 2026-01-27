import DefaultTheme from 'vitepress/theme'
import CustomLayout from './CustomLayout.vue'
import TextReader from './components/TextReader.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('TextReader', TextReader)
  }
}
