<template>
  <a-table
    :scroll="{
      y: 660,
    }"
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
  />
</template>
<script lang="ts" setup>
// import { ref } from 'vue'
// import type { TableProps } from 'ant-design-vue'
defineProps(['columns', 'data', 'pagination'])
// const filteredInfo = ref()
// const sortedInfo = ref()

// const handleChange: TableProps['onChange'] = (pagination, filters, sorter) => {
//   console.log('Various parameters', pagination, filters, sorter)
//   filteredInfo.value = filters
//   sortedInfo.value = sorter
// }
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
