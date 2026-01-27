import { defineConfig } from 'vitepress'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

// 获取中国时区的当前日期
function getTodayDate() {
  const now = new Date()
  // 转换为中国时区 (UTC+8)
  const chinaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }))
  const year = chinaTime.getFullYear()
  const month = String(chinaTime.getMonth() + 1).padStart(2, '0')
  const day = String(chinaTime.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 自动生成侧边栏配置
function generateSidebar() {
  const newsArchivePath = join(__dirname, '../../news-archive')
  const files = readdirSync(newsArchivePath)
    .filter(file => file.endsWith('.md'))
    .sort()
    .reverse() // 最新的在前面

  // 按类别分组
  const categories = {
    'AI 人工智能': files.filter(f => f.startsWith('ai_')),
    '科技前沿': files.filter(f => f.startsWith('tech_')),
    '国内新闻': files.filter(f => f.startsWith('domestic_')),
    '国际新闻': files.filter(f => f.startsWith('international_')),
    '股市财经': files.filter(f => f.startsWith('stocks_'))
  }

  const sidebar = []
  
  for (const [category, categoryFiles] of Object.entries(categories)) {
    if (categoryFiles.length > 0) {
      sidebar.push({
        text: category,
        collapsed: false,
        items: categoryFiles.map(file => {
          const date = file.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || ''
          return {
            text: date,
            link: `/news-archive/${file.replace('.md', '')}.html`
          }
        })
      })
    }
  }

  return sidebar
}

// 生成动态导航链接
function generateNavLinks() {
  const today = getTodayDate()
  const newsArchivePath = join(__dirname, '../../news-archive')
  const files = readdirSync(newsArchivePath).filter(file => file.endsWith('.md'))
  
  const categories = [
    { text: 'AI 人工智能', prefix: 'ai' },
    { text: '科技前沿', prefix: 'tech' },
    { text: '国内新闻', prefix: 'domestic' },
    { text: '国际新闻', prefix: 'international' },
    { text: '股市财经', prefix: 'stocks' }
  ]
  
  return categories.map(cat => {
    const todayFile = `${cat.prefix}_${today}.md`
    const latestFile = files
      .filter(f => f.startsWith(cat.prefix + '_'))
      .sort()
      .reverse()[0]
    
    // 优先使用今天的文件，如果不存在则使用最新的
    const targetFile = files.includes(todayFile) ? todayFile : latestFile
    
    return {
      text: cat.text,
      link: targetFile ? `/news-archive/${targetFile.replace('.md', '')}.html` : '/'
    }
  })
}

export default defineConfig({
  title: '每日新闻报告',
  description: '每日新闻汇总 - AI、科技、财经、国内外要闻',
  lang: 'zh-CN',
  base: '/news-report/',   // ⚠️ 必须有前后两个 /,
  cleanUrls: false,
  
  // 主题配置
  themeConfig: {
    // 导航栏 - 动态生成
    nav: [
      { text: '首页', link: '/' },
      ...generateNavLinks(),
      { text: '📖 使用指南', link: '/reader-guide' }
    ],

    // 侧边栏
    sidebar: generateSidebar(),

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hicccx999/news-report' }
    ],

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索新闻',
            buttonAriaLabel: '搜索新闻'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 页脚
    footer: {
      message: '每日新闻汇总',
      copyright: 'Copyright © 2026'
    },

    // 文档页脚
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 大纲配置
    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',

    // 外部链接图标
    externalLinkIcon: true,

    // 深色模式切换
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    // 侧边栏菜单标签
    sidebarMenuLabel: '菜单',
  },

  // Markdown 配置
  markdown: {
    lineNumbers: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  // 头部配置
  head: [
    ['link', { rel: 'icon', href: '/news-report/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  // Vite 配置
  vite: {
    server: {
      // 确保开发服务器正确处理 base 路径
      fs: {
        strict: false
      }
    }
  }
})
