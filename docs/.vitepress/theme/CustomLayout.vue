<template>
  <Layout>
    <template #doc-before>
      <TextReader />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import TextReader from './components/TextReader.vue'

const { Layout } = DefaultTheme
</script>
