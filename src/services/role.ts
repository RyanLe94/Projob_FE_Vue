import { instance } from '@/services/httpCommon'
import type { Role } from '@/models/role'

const roleService = {
  getAllRole: async (params: any) => {
    const res = await instance({
      url: 'roles',
      params: params,
      method: 'GET',
    })
    return res
  },
  getRoleById: async (id: string | number) => {
    const res = instance({
      url: `role/${id}`,
      method: 'GET',
    })
    return res
  },
  deleteRoleById: async (id: string | number) => {
    const res = instance({
      url: `role/${id}`,
      method: 'DELETE',
    })
    return res
  },
  createRole: async (data: Role) => {
    const res = instance({
      url: 'role',
      method: 'POST',
      data: {
        name: data.name,
        description: data.description,
        permissions: data.permissions,
      },
    })
    return res
  },

  editRole: async (id: string | number, data: Role) => {
    const res = instance({
      url: `role/${id}`,
      method: 'PUT',
      data: {
        name: data.name,
        description: data.description,
        permissions: data.permissions,
      },
    })
    return res
  },
}
export default roleService
