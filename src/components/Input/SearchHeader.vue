<template>
  <a-input class="input-search" v-model:value="value" placeholder="Search by name" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string>('')
</script>

<style lang="scss" scoped>
.input-search {
  width: 330px;
  height: 48px;
}
</style>
