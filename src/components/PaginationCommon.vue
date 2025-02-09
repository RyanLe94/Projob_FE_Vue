<template>
  <a-pagination v-model:current="current" :total="500" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const current = ref(6)
</script>

<style lang="scss" scoped>
.ant-pagination {
  margin-right: 40px;
  margin-bottom: 20px;
  max-height: 80vh;
}
</style>
