---
layout: home

hero:
  name: "每日新闻报告"
  text: "全球要闻 · 每日更新"
  tagline: AI 科技 | 国内外要闻 | 财经股市 | 专业汇总
---

<script setup>
import { ref, computed } from 'vue'
import { useData, useRouter } from 'vitepress'

const { site } = useData()
const router = useRouter()

// 获取中国时区的当前日期
const getTodayDate = () => {
  const now = new Date()
  // 转换为中国时区 (UTC+8)
  const chinaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }))
  const year = chinaTime.getFullYear()
  const month = String(chinaTime.getMonth() + 1).padStart(2, '0')
  const day = String(chinaTime.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const today = ref(getTodayDate())

// 动态生成新闻链接（相对路径，不包含 base）
const getNewsLink = (category) => {
  return `/news-archive/${category}_${today.value}`
}

// 处理导航
const navigateTo = (category) => {
  router.go(getNewsLink(category))
}

// 格式化日期显示
const formatDate = computed(() => {
  const [year, month, day] = today.value.split('-')
  return `${year}年${month}月${day}日`
})
</script>

<div class="home-hero-actions">
  <a class="action-button brand" @click.prevent="navigateTo('ai')" href="javascript:void(0)">查看最新新闻</a>
  <a class="action-button alt" @click.prevent="navigateTo('tech')" href="javascript:void(0)">浏览所有新闻</a>
</div>

<div class="features-grid">
  <div class="feature">
    <div class="feature-icon">🤖</div>
    <h2 class="feature-title">AI 人工智能</h2>
    <p class="feature-details">追踪全球人工智能前沿动态，大模型、智能体、产业应用等最新进展</p>
    <a @click.prevent="navigateTo('ai')" href="javascript:void(0)" class="feature-link">查看详情 →</a>
  </div>
  
  <div class="feature">
    <div class="feature-icon">🚀</div>
    <h2 class="feature-title">科技前沿</h2>
    <p class="feature-details">量子计算、航空航天、半导体等前沿科技领域的重大突破</p>
    <a @click.prevent="navigateTo('tech')" href="javascript:void(0)" class="feature-link">查看详情 →</a>
  </div>
  
  <div class="feature">
    <div class="feature-icon">🏠</div>
    <h2 class="feature-title">国内新闻</h2>
    <p class="feature-details">国内政经要闻、社会热点、科技发展等重要资讯汇总</p>
    <a @click.prevent="navigateTo('domestic')" href="javascript:void(0)" class="feature-link">查看详情 →</a>
  </div>
  
  <div class="feature">
    <div class="feature-icon">🌍</div>
    <h2 class="feature-title">国际新闻</h2>
    <p class="feature-details">全球政治、经济、外交等国际要闻的深度追踪</p>
    <a @click.prevent="navigateTo('international')" href="javascript:void(0)" class="feature-link">查看详情 →</a>
  </div>
  
  <div class="feature">
    <div class="feature-icon">📈</div>
    <h2 class="feature-title">股市财经</h2>
    <p class="feature-details">股市动态、财经分析、投资热点等金融市场资讯</p>
    <a @click.prevent="navigateTo('stocks')" href="javascript:void(0)" class="feature-link">查看详情 →</a>
  </div>
  
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

.feature:hover {
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

.feature-link {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
}

.feature-link:hover {
  text-decoration: underline;
}
</style>

## 📰 最新更新

### {{ formatDate }}

<div class="news-links">
  <p><strong><a @click.prevent="navigateTo('ai')" href="javascript:void(0)">AI 人工智能</a></strong> - 大模型最新进展与产业动态</p>
  <p><strong><a @click.prevent="navigateTo('tech')" href="javascript:void(0)">科技前沿</a></strong> - 量子计算、航空航天、半导体突破</p>
  <p><strong><a @click.prevent="navigateTo('domestic')" href="javascript:void(0)">国内新闻</a></strong> - 最新国内要闻汇总</p>
  <p><strong><a @click.prevent="navigateTo('international')" href="javascript:void(0)">国际新闻</a></strong> - 全球政经动态追踪</p>
  <p><strong><a @click.prevent="navigateTo('stocks')" href="javascript:void(0)">股市财经</a></strong> - 市场热点与投资分析</p>
</div>

<style scoped>
.news-links {
  margin: 24px 0;
}

.news-links p {
  margin: 12px 0;
  padding-left: 8px;
}

.news-links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}

.news-links a:hover {
  text-decoration: underline;
}

.action-button, .feature-link {
  cursor: pointer;
}
</style>

---

<div style="text-align: center; margin-top: 40px; color: #666;">
  <p>💡 使用顶部搜索框快速查找您感兴趣的新闻话题</p>
  <p>📅 每日更新 · 专业汇总 · 全面覆盖</p>
</div>