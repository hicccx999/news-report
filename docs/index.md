---
layout: home

hero:
  name: "每日新闻报告"
  text: "全球要闻 · 每日更新"
  tagline: AI 科技 | 国内外要闻 | 财经股市 | 专业汇总
---

<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'

// 获取中国时区的当前日期
const getTodayDate = () => {
  const now = new Date()
  const chinaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }))
  return `${chinaTime.getFullYear()}-${String(chinaTime.getMonth() + 1).padStart(2, '0')}-${String(chinaTime.getDate()).padStart(2, '0')}`
}

const today = ref(getTodayDate())

// 动态生成新闻链接
const getNewsLink = (category) => withBase(`/news-archive/${category}_${today.value}`)

// 新闻分类配置
const categories = [
  { id: 'ai', icon: '🤖', title: 'AI 人工智能', desc: '追踪全球人工智能前沿动态，大模型、智能体、产业应用等最新进展' },
  { id: 'tech', icon: '🚀', title: '科技前沿', desc: '量子计算、航空航天、半导体等前沿科技领域的重大突破' },
  { id: 'domestic', icon: '🏠', title: '国内新闻', desc: '国内政经要闻、社会热点、科技发展等重要资讯汇总' },
  { id: 'international', icon: '🌍', title: '国际新闻', desc: '全球政治、经济、外交等国际要闻的深度追踪' },
  { id: 'stocks', icon: '📈', title: '股市财经', desc: '股市动态、财经分析、投资热点等金融市场资讯' }
]
</script>

<div class="home-hero-actions">
  <a class="action-button brand" :href="getNewsLink('ai')">查看最新新闻</a>
  <a class="action-button alt" :href="getNewsLink('tech')">浏览所有新闻</a>
</div>

<div class="features-grid">
  <a v-for="cat in categories" :key="cat.id" :href="getNewsLink(cat.id)" class="feature feature-link-wrapper">
    <div class="feature-icon">{{ cat.icon }}</div>
    <h2 class="feature-title">{{ cat.title }}</h2>
    <p class="feature-details">{{ cat.desc }}</p>
    <span class="feature-link-arrow">查看详情 →</span>
  </a>
  
  <div class="feature">
    <div class="feature-icon">🔍</div>
    <h2 class="feature-title">全文搜索</h2>
    <p class="feature-details">支持全站内容搜索，快速找到您关注的新闻和话题</p>
  </div>
</div>

<style scoped>
.home-hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 32px 0 48px;
}

.action-button {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s;
}

.action-button.brand {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.action-button.brand:hover {
  background: var(--vp-button-brand-hover-bg);
}

.action-button.alt {
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  border: 1px solid var(--vp-button-alt-border);
}

.action-button.alt:hover {
  background: var(--vp-button-alt-hover-bg);
  border-color: var(--vp-button-alt-hover-border);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 48px 0;
  padding: 0 24px;
}

.feature {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.25s;
}

.feature-link-wrapper {
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
}

.feature-link-wrapper:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature:not(.feature-link-wrapper):hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.feature-details {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
}

.feature-link-arrow {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  display: inline-block;
}

.feature-link-wrapper:hover .feature-link-arrow {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .features-grid {
    padding: 0 16px;
    gap: 16px;
  }
  
  .feature {
    padding: 20px;
  }
  
  .feature-icon {
    font-size: 36px;
  }
}
</style>

---

<div style="text-align: center; margin-top: 40px; color: var(--vp-c-text-3);">
  <p>🔊 每篇新闻页面都配备了智能朗读功能，支持语速调节</p>
  <p>💡 使用顶部搜索框快速查找您感兴趣的新闻话题</p>
  <p>📅 每日更新 · 专业汇总 · 全面覆盖</p>
</div>