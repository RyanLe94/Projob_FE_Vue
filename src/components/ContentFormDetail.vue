<template>
  <div>
    <div v-for="(item, index) in data" :key="item.id">
      <p v-if="item.key != 'id'">{{ item.key }}:{{ item.value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['formDataDetail'])
const data = computed(() => {
  let data: any = []
  for (const [key, value] of Object.entries(props.formDataDetail)) {
    data.push({ key: key, value: value })
  }
  console.log('data', data)

  return data
})
</script>

<style lang="scss" scoped></style>
