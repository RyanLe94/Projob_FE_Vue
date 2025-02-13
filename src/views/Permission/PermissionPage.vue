<template>
  <div class="w-100">
    <div>
      <HeaderBar :title="'Permission Managerment'" @add-record="handleAddRecord"></HeaderBar>
      <TableCommon
        class="m-4"
        :data="data"
        :columns="columns"
        :pagination="pagination"
        @change="handleChangeTable"
        @edit-record="handleEditRecord"
        @delete-record="handleDeleteRecord"
        @show-info-record="handleShowInfoRecord"
      ></TableCommon>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import TableCommon from '@/components/TableCommon.vue'
import { computed, onMounted } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import { ref, reactive } from 'vue'
import permissionService from '@/services/permission'
// import Pagination from '@/components/PaginationCommon.vue'
interface DataItem {
  key: string
  name: string
  age: number
  address: string
}
const data = ref()
const sortedInfo = ref()
const count = ref(0)
const columns = computed<TableColumnType[]>(() => {
  const sorted = sortedInfo.value || {}
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: DataItem, b: DataItem) => a.name.length - b.name.length,
      sortOrder: sorted.columnKey === 'name' && sorted.order,
      ellipsis: true,
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: 'Api Path',
      dataIndex: 'apiPath',
      key: 'apiPath',
      ellipsis: true,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
    },
  ]
})

const permissionParams = reactive({
  current: 1,
  pageSize: 15,
})

const handleAddRecord = () => {
  console.log('add record')
}

const handleEditRecord = (id: string) => {
  console.log(id)
}

const handleDeleteRecord = (id: string) => {
  console.log(id)
}

const handleShowInfoRecord = (id: string) => {
  console.log(id)
}

const handleChangeTable = (page, pageSize) => {
  permissionParams.current = page.current
  permissionParams.pageSize = page.pageSize
  getPermission()
}

const pagination = computed(() => {
  return {
    showSizeChanger: true,
    current: permissionParams.current,
    pageSize: permissionParams.pageSize,
    total: count.value,
  }
})

const getPermission = async () => {
  const res = await permissionService.getPermission({
    pageNo: permissionParams.current,
    pageSize: permissionParams.pageSize,
  })
  if (res) {
    data.value = res.result.items
    count.value = res.result.totalItems
  }
}
onMounted(() => {
  getPermission()
})
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
}
</style>
