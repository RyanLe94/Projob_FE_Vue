<script setup lang="ts">
import theme from '@/configs/theme'
</script>

<template>
  <a-config-provider :theme="theme">
    <RouterView></RouterView>
  </a-config-provider>
</template>

<style scoped lang="scss"></style>
