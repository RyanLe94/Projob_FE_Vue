<template>
  <a-modal v-model:open="open" @cancel="handleCancel" @ok="handleOk" centered>
    <slot name="parent"></slot>
  </a-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['open'])
const emit = defineEmits(['update:open', 'confirm-modal', 'cancel-modal'])
const open = computed({
  get() {
    return props.open
  },
  set(val) {
    emit('update:open', val)
  },
})

const handleOk = (e: MouseEvent) => {
  emit('confirm-modal', 'val')
  // open.value = false
}

const handleCancel = (e: MouseEvent) => {
  emit('cancel-modal', 'val')
}
</script>

<style lang="scss" scoped>
.Detail .ant-modal-footer {
  display: none;
}
</style>
