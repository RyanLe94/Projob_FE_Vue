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
      <PermissionModal
        :open="openModal"
        @confirm-modal="handleConfirmModal"
        @cancel-modal="handleCancelModal"
        :title="titleModal + ' permission'"
        :titleModal="titleModal"
      >
        <template #content>
          <a-form class="mt-4" v-if="!isDeleteModal" layout="vertical" :model="formData">
            <a-form-item label="Name" name="Name">
              <!-- :rules="[{ required: true, message: 'Please input name permission' }]" -->

              <a-input :disabled="isDetailModal" v-model:value="formData.name" />
            </a-form-item>
            <a-form-item label="Module" name="module">
              <!-- :rules="[{ required: true, message: 'Please input module' }]" -->

              <a-input :disabled="isDetailModal" v-model:value="formData.module" />
            </a-form-item>
            <a-form-item label="Api path" name="apiPath">
              <!-- :rules="[{ required: true, message: 'Please input api path' }]" -->

              <a-input :disabled="isDetailModal" v-model:value="formData.apiPath" />
            </a-form-item>
            <a-form-item label="Method" name="method">
              <!-- :rules="[{ required: true, message: 'Please select method' }]" -->

              <a-select
                :disabled="isDetailModal"
                v-model:value="formData.method"
                :options="optionsMethod"
              ></a-select>
            </a-form-item>
          </a-form>
          <div v-else>Are you sure want to delete "{{ permissionName }}" permission?</div>
        </template>
      </PermissionModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import TableCommon from '@/components/TableCommon.vue'
import { MODAL_TYPE } from '@/constants/common'
import { computed, onMounted } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import { ref, reactive, watch } from 'vue'
import permissionService from '@/services/permission'
import PermissionModal from '@/views/Permission/PermissionModal.vue'
import type { Permission } from '@/models/permission'
import { notification } from 'ant-design-vue'
const data = ref()
const sortedInfo = ref()
const count = ref(0)
const openModal = ref(false)
const isDetailModal = ref()

const titleModal = ref('')
const optionsMethod = ref([
  { value: 'POST', label: 'POST' },
  { value: 'GET', label: 'GET' },
  { value: 'PUT', label: 'PUT' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'DELETE', label: 'DELETE' },
])
const idPermission = ref()

const permissionName = ref()
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

const formData = ref<Permission>({
  name: undefined,
  module: undefined,
  apiPath: undefined,
  method: undefined,
})

// DETAIL

const handleShowInfoRecord = (id: string | number) => {
  openModal.value = true
  isDetailModal.value = true
  titleModal.value = 'Detail'
  getPermissionById(id)
}

const isDetailPage = computed(() => {
  if (MODAL_TYPE.DETAIL == titleModal.value.toUpperCase()) {
    return true
  }
  return false
})

const isCreateModal = computed(() => {
  if (MODAL_TYPE.CREATE == titleModal.value.toUpperCase()) {
    return true
  }
  return false
})

const isEditModal = computed(() => {
  if (MODAL_TYPE.EDIT == titleModal.value.toUpperCase()) {
    return true
  }
  return false
})

const isDeleteModal = computed(() => {
  if (MODAL_TYPE.DELETE == titleModal.value.toUpperCase()) {
    return true
  }
  return false
})

const handleConfirmModal = async (val: string | number) => {
  if (isCreateModal.value) {
    await createPermission(formData.value)
    await getAllPermission()

    // add
  } else if (isEditModal.value) {
    await editPermission(idPermission.value, formData.value)
    await getAllPermission()

    // edit
  } else if (isDeleteModal.value) {
    await deletePermission(idPermission.value)
    await getAllPermission()

    //delete
  } else if (isDetailPage.value) {
    //detail
  }
  openModal.value = false
}
const handleCancelModal = (val: string) => {
  console.log(val)
  openModal.value = false
}

const handleAddRecord = () => {
  titleModal.value = 'Create'
  openModal.value = true

  formData.value = {}
}
// END ADD RECORD
const handleEditRecord = (id: string) => {
  titleModal.value = 'Edit'
  idPermission.value = id
  isDetailModal.value = false
  getPermissionById(id)
  openModal.value = true
}

const handleDeleteRecord = (id: string | number, name: string) => {
  titleModal.value = 'Delete'
  console.log(id, name)

  idPermission.value = id
  permissionName.value = name
  openModal.value = true
}
// TABLE

const handleChangeTable = (page, pageSize) => {
  permissionParams.current = page.current
  permissionParams.pageSize = page.pageSize
  getAllPermission()
}

const pagination = computed(() => {
  return {
    showSizeChanger: true,
    current: permissionParams.current,
    pageSize: permissionParams.pageSize,
    total: count.value,
  }
})

const getAllPermission = async () => {
  const res = await permissionService.getAllPermission({
    pageNo: permissionParams.current,
    pageSize: permissionParams.pageSize,
  })
  if (res) {
    data.value = res.result.items
    count.value = res.result.totalItems
  }
}

const editPermission = async (id: string | number, formData: Permission) => {
  const res = await permissionService.editPermission(id, formData)
  if (res) {
    notification['success']({
      message: 'Update permission',
      description: 'Updated permission successfully',
    })
  }
}

const createPermission = async (formData: Permission) => {
  const res = await permissionService.createPermission(formData)
  if (res) {
    notification['success']({
      message: 'Create permission',
      description: 'Created permission successfully',
    })
  }
}

const deletePermission = async (id: string | number) => {
  const res = await permissionService.deletePermissionById(id)
  if (res) {
    notification['success']({
      message: 'Delete permission',
      description: 'Deleted permission successfully',
    })
  }
}

const getPermissionById = async (id: string | number) => {
  const res = await permissionService.getPermissionById(id)
  if (res) {
    formData.value = res.result
  }
}
// TABLE
onMounted(() => {
  getAllPermission()
})
watch(data, () => {
  console.log('update')
})
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
}
</style>
