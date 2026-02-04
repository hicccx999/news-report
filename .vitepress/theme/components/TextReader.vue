<template>
  <div class="text-reader">
    <div class="reader-controls">
      <button @click="toggleReading" class="control-btn" :class="{ active: isReading }">
        <span class="icon">{{ buttonIcon }}</span>
        <span class="text">{{ buttonText }}</span>
      </button>
      
      <button v-if="isReading || isPaused" @click="stopReading" class="control-btn stop-btn">
        <span class="icon">⏹️</span>
        <span class="text">停止</span>
      </button>
      
      <div class="speed-control">
        <label for="speed-slider">
          <span class="icon">⚡</span>
          <span>速度: {{ speed.toFixed(1) }}x</span>
        </label>
        <input
          id="speed-slider"
          type="range"
          min="0.5"
          max="3.0"
          step="0.1"
          v-model.number="speed"
          @input="updateSpeed"
          class="speed-slider"
        />
      </div>
    </div>
    
    <div v-if="isReading && currentText" class="reading-progress">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      <p class="current-text">{{ currentText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// 状态
const isReading = ref(false)
const isPaused = ref(false)
const speed = ref(1.0)
const progress = ref(0)
const currentText = ref('')

// 内部变量
let speechSynthesis = null
let utterance = null
let sentences = []
let currentIndex = 0
let preferredVoice = null

// 计算属性：按钮图标和文本
const buttonIcon = computed(() => {
  if (isReading.value) return '⏸️'
  if (isPaused.value) return '▶️'
  return '🔊'
})

const buttonText = computed(() => {
  if (isReading.value) return '暂停朗读'
  if (isPaused.value) return '继续朗读'
  return '朗读新闻'
})

// 中文语音名称优先级列表
const PREFERRED_VOICE_NAMES = [
  'tingting', 'xiaoxiao', 'xiaoyi', 'xiaoyou', 'xiaochen',
  'yunxi', 'yunxia', 'yunyang', 'google 中文'
]

// 获取优先语音
const getPreferredVoice = () => {
  if (!speechSynthesis) return null
  
  const voices = speechSynthesis.getVoices()
  
  // 按优先级查找语音
  for (const name of PREFERRED_VOICE_NAMES) {
    const voice = voices.find(v => v.name.toLowerCase().includes(name))
    if (voice) return voice
  }
  
  // 回退：任何中文语音
  return voices.find(v => v.lang.includes('zh') || v.lang.includes('CN'))
}

// 从页面提取文本
const extractTextFromPage = () => {
  const article = document.querySelector('.vp-doc') || document.querySelector('main')
  if (!article) return ''
  
  const clone = article.cloneNode(true)
  
  // 移除不需要朗读的元素
  const selectorsToRemove = 'script, style, .text-reader, nav, .VPNav, .VPSidebar, .vp-code-group, code, .last-updated-header'
  clone.querySelectorAll(selectorsToRemove).forEach(el => el.remove())
  
  return (clone.textContent || '')
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .replace(/[#*`]+/g, '')
    .trim()
}

// 按句子分割
const splitIntoSentences = (text) =>
  text.match(/[^。！？.!?]+[。！？.!?]+/g) || [text]

// 切换朗读状态
const toggleReading = () => {
  if (!speechSynthesis) {
    alert('您的浏览器不支持语音合成功能')
    return
  }
  
  if (isReading.value) {
    speechSynthesis.pause()
    isReading.value = false
    isPaused.value = true
  } else if (isPaused.value) {
    speechSynthesis.resume()
    isReading.value = true
    isPaused.value = false
  } else {
    startReading()
  }
}

// 开始朗读
const startReading = () => {
  const text = extractTextFromPage()
  
  if (!text) {
    alert('未找到可朗读的内容')
    return
  }
  
  sentences = splitIntoSentences(text)
  currentIndex = 0
  progress.value = 0
  
  speakNextSentence()
}

// 朗读下一句
const speakNextSentence = () => {
  if (currentIndex >= sentences.length) {
    stopReading()
    return
  }
  
  const sentence = sentences[currentIndex]
  currentText.value = sentence.trim()
  
  utterance = new SpeechSynthesisUtterance(sentence)
  utterance.lang = 'zh-CN'
  utterance.rate = speed.value
  utterance.pitch = 1
  utterance.volume = 1
  
  // 设置优先语音
  preferredVoice = preferredVoice || getPreferredVoice()
  if (preferredVoice) {
    utterance.voice = preferredVoice
  }
  
  utterance.onend = () => {
    currentIndex++
    progress.value = Math.round((currentIndex / sentences.length) * 100)
    
    if (currentIndex < sentences.length && isReading.value) {
      speakNextSentence()
    } else if (currentIndex >= sentences.length) {
      stopReading()
    }
  }
  
  utterance.onerror = (event) => {
    console.error('语音合成错误:', event)
    stopReading()
  }
  
  isReading.value = true
  isPaused.value = false
  speechSynthesis.speak(utterance)
}

// 停止朗读
const stopReading = () => {
  speechSynthesis?.cancel()
  isReading.value = false
  isPaused.value = false
  currentText.value = ''
  progress.value = 0
  currentIndex = 0
}

// 更新速度
const updateSpeed = () => {
  if (utterance && speechSynthesis && isReading.value) {
    speechSynthesis.cancel()
    speakNextSentence()
  }
}

// 生命周期
onMounted(() => {
  if (typeof window !== 'undefined') {
    speechSynthesis = window.speechSynthesis
    
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        preferredVoice = getPreferredVoice()
      })
    } else {
      preferredVoice = getPreferredVoice()
    }
  }
})

onBeforeUnmount(() => {
  speechSynthesis?.cancel()
})
</script>

<style scoped>
.text-reader {
  position: sticky;
  top: 64px;
  z-index: 10;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.reader-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s;
}

.control-btn:hover {
  background: var(--vp-button-brand-hover-bg);
  transform: translateY(-1px);
}

.control-btn.active {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.control-btn.active:hover {
  background: var(--vp-c-divider);
}

.stop-btn {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.stop-btn:hover {
  background: var(--vp-c-divider);
}

.icon {
  font-size: 16px;
  line-height: 1;
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.speed-control label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.speed-slider {
  width: 120px;
  height: 4px;
  border-radius: 2px;
  background: var(--vp-c-divider);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.speed-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  cursor: pointer;
}

.speed-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  cursor: pointer;
  border: none;
}

.reading-progress {
  margin-top: 12px;
}

.progress-bar {
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}

.current-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin: 0;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .text-reader {
    padding: 12px 16px;
    top: 56px;
  }
  
  .reader-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .speed-control {
    margin-left: 0;
    justify-content: space-between;
  }
  
  .control-btn {
    justify-content: center;
  }
}
</style>
