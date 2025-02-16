<template>
  <div class="w-100">
    <div>
      <HeaderBar :title="'Role Managerment'" @add-record="handleAddRecord"></HeaderBar>
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
      <RoleModal
        :open="openModal"
        @confirm-modal="handleConfirmModal"
        @cancel-modal="handleCancelModal"
        :title="titleModal + ' role'"
        :titleModal="titleModal"
      >
        <template #content>
          <a-form class="mt-4" v-if="!isDeleteModal" layout="vertical" :model="formData">
            <a-form-item label="Name" name="Name">
              <!-- :rules="[{ required: true, message: 'Please input name role' }]" -->

              <a-input :disabled="isDetailModal" v-model:value="formData.name" />
            </a-form-item>
            <a-form-item label="Description" name="description">
              <!-- :rules="[{ required: true, message: 'Please input module' }]" -->

              <a-input :disabled="isDetailModal" v-model:value="formData.description" />
            </a-form-item>

            <a-form-item label="Permission" name="permission">
              <!-- :rules="[{ required: true, message: 'Please select method' }]" -->

              <a-select
                mode="multiple"
                :disabled="isDetailModal"
                v-model:value="formData.permissions"
                :options="optionsPermission"
                :placement="'bottomRight'"
                @change="handleChangePermission"
              >
              </a-select>
            </a-form-item>
          </a-form>
          <div v-else>Are you sure want to delete "{{ roleName }}" role?</div>
        </template>
      </RoleModal>
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
import roleService from '@/services/role'
import permissionService from '@/services/permission'
import RoleModal from '@/views/Role/RoleModal.vue'
import type { Role } from '@/models/role'
import type { Permission } from '@/models/permission'

import { notification } from 'ant-design-vue'
const data = ref()
const sortedInfo = ref()
const count = ref(0)
const openModal = ref(false)
const isDetailModal = ref()

const titleModal = ref('')
const optionsPermission = ref([])
const idRole = ref()

const roleName = ref()
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
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

const handleChangePermission = () => {
  console.log(formData.value.permissions)
}
const roleParams = reactive({
  current: 1,
  pageSize: 15,
})

const formData = ref<Role>({
  name: undefined,
  description: undefined,
  permissions: [],
})

// DETAIL

const handleShowInfoRecord = (id: string | number) => {
  openModal.value = true
  isDetailModal.value = true
  titleModal.value = 'Detail'
  getRoleById(id)
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
    await createRole(formData.value)
    await getAllRole()

    // add
  } else if (isEditModal.value) {
    await editRole(idRole.value, formData.value)
    await getAllRole()

    // edit
  } else if (isDeleteModal.value) {
    await deleteRole(idRole.value)
    await getAllRole()

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
  idRole.value = id
  isDetailModal.value = false
  getRoleById(id)
  openModal.value = true
}

const handleDeleteRecord = (id: string | number, name: string) => {
  titleModal.value = 'Delete'
  console.log(id, name)

  idRole.value = id
  roleName.value = name
  openModal.value = true
}
// TABLE

const handleChangeTable = (page, pageSize) => {
  roleParams.current = page.current
  roleParams.pageSize = page.pageSize
  getAllRole()
}

const pagination = computed(() => {
  return {
    showSizeChanger: true,
    current: roleParams.current,
    pageSize: roleParams.pageSize,
    total: count.value,
  }
})

const getAllRole = async () => {
  const res = await roleService.getAllRole({
    pageNo: roleParams.current,
    pageSize: roleParams.pageSize,
  })
  if (res) {
    data.value = res.result.items
    count.value = res.result.totalItems
  }
}
// need fix
const getAllPermission = async () => {
  const res = await permissionService.getAllPermission({
    pageNo: 1,
    pageSize: 100,
  })
  if (res) {
    optionsPermission.value = res.result.items.map((el: Permission) => {
      return {
        ...el,
        key: el.id?.toString(),
        value: el.id?.toString(),
      }
    })
    console.log(optionsPermission.value)
  }
}

const editRole = async (id: string | number, formData: Role) => {
  const res = await roleService.editRole(id, formData)
  if (res) {
    notification['success']({
      message: 'Update role',
      description: 'Updated role successfully',
    })
  }
}

const createRole = async (formData: Role) => {
  const res = await roleService.createRole(formData)
  if (res) {
    notification['success']({
      message: 'Create role',
      description: 'Created role successfully',
    })
  }
}

const deleteRole = async (id: string | number) => {
  const res = await roleService.deleteRoleById(id)
  if (res) {
    notification['success']({
      message: 'Delete role',
      description: 'Deleted role successfully',
    })
  }
}

const getRoleById = async (id: string | number) => {
  const res = await roleService.getRoleById(id)
  if (res) {
    formData.value = res.result
  }
}
// TABLE
onMounted(() => {
  Promise.all([getAllRole(), getAllPermission()])
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
