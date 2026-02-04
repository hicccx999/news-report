import { defineConfig } from 'vitepress'
import { readdirSync } from 'fs'
import { join } from 'path'

// 类型定义
interface NewsCategory {
  text: string
  prefix: string
}

interface SidebarItem {
  text: string
  link: string
}

interface SidebarGroup {
  text: string
  collapsed: boolean
  items: SidebarItem[]
}

// 新闻类别配置（统一管理）
const NEWS_CATEGORIES: NewsCategory[] = [
  { text: 'AI 人工智能', prefix: 'ai' },
  { text: '科技前沿', prefix: 'tech' },
  { text: '国内新闻', prefix: 'domestic' },
  { text: '国际新闻', prefix: 'international' },
  { text: '股市财经', prefix: 'stocks' }
]

// 日期正则（复用）
const DATE_REGEX = /(\d{4}-\d{2}-\d{2})/

// 新闻存档目录路径
const NEWS_ARCHIVE_PATH = join(__dirname, '../news-archive')

// 获取新闻存档文件列表（缓存结果）
const getNewsFiles = (() => {
  let cache: string[] | null = null
  return (): string[] => {
    if (cache) return cache
    cache = readdirSync(NEWS_ARCHIVE_PATH)
      .filter(file => file.endsWith('.md'))
      .sort()
      .reverse()
    return cache
  }
})()

// 获取指定类别的文件
const getCategoryFiles = (files: string[], prefix: string): string[] =>
  files.filter(f => f === `${prefix}.md` || f.startsWith(`${prefix}_`))

// 文件名转链接
const fileToLink = (file: string): string =>
  `/news-archive/${file.replace('.md', '')}`

// 提取显示文本
const getDisplayText = (file: string): string => {
  const match = file.match(DATE_REGEX)
  return match ? match[1] : '📰 最新'
}

// 自动生成侧边栏配置
function generateSidebar(): SidebarGroup[] {
  const files = getNewsFiles()
  
  return NEWS_CATEGORIES
    .map(({ text, prefix }): SidebarGroup | null => {
      const categoryFiles = getCategoryFiles(files, prefix)
      if (categoryFiles.length === 0) return null
      
      return {
        text,
        collapsed: false,
        items: categoryFiles.map(file => ({
          text: getDisplayText(file),
          link: fileToLink(file)
        }))
      }
    })
    .filter((item): item is SidebarGroup => item !== null)
}

// 生成动态导航链接
function generateNavLinks(): SidebarItem[] {
  return NEWS_CATEGORIES.map(({ text, prefix }) => ({
    text,
    link: fileToLink(`${prefix}.md`)
  }))
}

export default defineConfig({
  title: '每日新闻报告',
  description: '每日新闻汇总 - AI、科技、财经、国内外要闻',
  lang: 'zh-CN',
  base: '/news-report/',
  cleanUrls: false,
  ignoreDeadLinks: true,
  
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
