import { defineConfig } from 'vitepress'
import { readdirSync } from 'fs'
import { join } from 'path'

// 新闻类别配置（统一管理）
const NEWS_CATEGORIES = [
  { text: 'AI 人工智能', prefix: 'ai' },
  { text: '科技前沿', prefix: 'tech' },
  { text: '国内新闻', prefix: 'domestic' },
  { text: '国际新闻', prefix: 'international' },
  { text: '股市财经', prefix: 'stocks' }
]

// 获取新闻存档文件列表
function getNewsFiles() {
  const newsArchivePath = join(__dirname, '../../news-archive')
  return readdirSync(newsArchivePath)
    .filter(file => file.endsWith('.md'))
    .sort()
    .reverse()
}

// 自动生成侧边栏配置
function generateSidebar() {
  const files = getNewsFiles()
  
  return NEWS_CATEGORIES
    .map(({ text, prefix }) => {
      // 匹配 prefix.md（不带日期）或 prefix_日期.md（带日期）
      const categoryFiles = files.filter(f => 
        f === `${prefix}.md` || f.startsWith(`${prefix}_`)
      )
      if (categoryFiles.length === 0) return null
      
      return {
        text,
        collapsed: false,
        items: categoryFiles.map(file => {
          // 提取日期或使用"最新"标识
          const dateMatch = file.match(/(\d{4}-\d{2}-\d{2})/)
          const displayText = dateMatch ? dateMatch[1] : '📰 最新'
          
          return {
            text: displayText,
            link: `/news-archive/${file.replace('.md', '')}`
          }
        })
      }
    })
    .filter(Boolean)
}

// 生成动态导航链接
function generateNavLinks() {
  const files = getNewsFiles()
  
  return NEWS_CATEGORIES.map(({ text, prefix }) => {
    const latestFile = `${prefix}.md`
    
    return {
      text,
      link: `/news-archive/${latestFile.replace('.md', '')}`
    }
  })
}

export default defineConfig({
  title: '每日新闻报告',
  description: '每日新闻汇总 - AI、科技、财经、国内外要闻',
  lang: 'zh-CN',
  base: '/news-report/',
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
  ]
})
