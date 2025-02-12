<template>
  <a-table
    :scroll="{
      y: 640,
    }"
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
  />
</template>
<script lang="ts" setup>
defineProps(['columns', 'data', 'pagination'])
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
