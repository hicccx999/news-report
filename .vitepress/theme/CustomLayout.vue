<template>
  <Layout>
    <template #doc-before>
      <div v-if="lastUpdated" class="last-updated-header">
        <span class="last-updated-label">最后更新于：</span>
        <time :datetime="isoTime">{{ formattedTime }}</time>
      </div>
      <TextReader />
    </template>
  </Layout>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import TextReader from './components/TextReader.vue'

const { Layout } = DefaultTheme
const { page } = useData()

// 计算属性
const lastUpdated = computed(() => page.value.lastUpdated)

const isoTime = computed(() => 
  lastUpdated.value ? new Date(lastUpdated.value).toISOString() : ''
)

const formattedTime = computed(() => {
  if (!lastUpdated.value) return ''
  return new Date(lastUpdated.value).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
})
</script>
