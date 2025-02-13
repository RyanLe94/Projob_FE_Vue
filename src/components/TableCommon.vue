<template>
  <a-table
    :scroll="{
      y: 640,
    }"
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
  >
    <template v-slot:bodyCell="{ text, record, index, column }">
      <template v-if="column.key == 'action'">
        <InfoCircleOutlined
          @click="handleShowInfoRecord(record.id)"
          :style="{ fontSize: '20px', top: '4px', position: 'relative' }"
          class="mx-3 delete-action action"
        />
        <EditIcon @click="handleEditRecord(record.id)" class="mx-3 delete-action action" />
        <DeleteIcon @click="handleDeleteRecord(record.id)" class="mx-3 edit-action action" />
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import DeleteIcon from '@/assets/img/icons/DeleteIcon.vue'
import EditIcon from '@/assets/img/icons/EditIcon.vue'
defineProps(['columns', 'data', 'pagination'])
const emit = defineEmits(['edit-record', 'delete-record', 'show-info-record'])
const handleEditRecord = (id: string) => {
  emit('edit-record', id)
}
const handleDeleteRecord = (id: string) => {
  emit('delete-record', id)
}

const handleShowInfoRecord = (id: string) => {
  emit('show-info-record', id)
}
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}
.action {
  cursor: pointer;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
