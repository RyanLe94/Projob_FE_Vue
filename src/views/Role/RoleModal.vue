<template>
  <RoleModal
    :open="open"
    @cancel-modal="handleCancelModal"
    @confirm-modal="handleConfirmModal"
    :wrapClassName="titleModal"
  >
    <template #parent>
      <div>
        <slot name="content"></slot>
      </div>
    </template>
  </RoleModal>
</template>

<script setup lang="ts">
import RoleModal from '@/components/ModalCommon.vue'
defineProps(['open', 'titleModal'])
const emit = defineEmits(['confirm-modal', 'cancel-modal'])

const handleConfirmModal = (val: string) => {
  emit('confirm-modal', val)
}
const handleCancelModal = (val: string) => {
  emit('cancel-modal', val)
}
</script>

<style lang="scss"></style>
