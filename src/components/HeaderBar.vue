<template>
  <div class="header d-flex justify-content-between align-items-center">
    <div class="header__title">{{ title }}</div>
    <div class="header__right-content">
      <SearchHeader></SearchHeader>
      <a-button v-if="showDelete" class="btn-delete btn-header" danger type="primary"
        >Delete</a-button
      >
      <a-button v-if="showImportExport" class="btn-import btn-header">Import</a-button>
      <a-button v-if="showImportExport" class="btn-export btn-header">Export</a-button>
      <a-button class="btn-add btn-header" type="primary">Add</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchHeader from '@/components/Input/SearchHeader.vue'
defineProps(['title', 'showImportExport', 'showDelete'])
</script>

<style lang="scss" scoped>
.header {
  margin: 30px;
  height: 48px;
}
.btn-header {
  height: 48px;
  font-weight: 600;
  font-size: 18px;
  margin: 0 8px;
}
.btn-delete,
.btn-add {
  color: white;
}
</style>
