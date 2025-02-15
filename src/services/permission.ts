import { instance } from '@/services/httpCommon'
import type { Permission } from '@/models/permission'

const permissionService = {
  getAllPermission: async (params: any) => {
    const res = await instance({
      url: 'permissions',
      params: params,
      method: 'GET',
    })
    return res
  },
  getPermissionById: async (id: string | number) => {
    const res = instance({
      url: `permission/${id}`,
      method: 'GET',
    })
    return res
  },
  deletePermissionById: async (id: string | number) => {
    const res = instance({
      url: `permission/${id}`,
      method: 'DELETE',
    })
    return res
  },
  createPermission: async (data: Permission) => {
    const res = instance({
      url: 'permission',
      method: 'POST',
      data: {
        name: data.name,
        module: data.module,
        apiPath: data.apiPath,
        method: data.method,
      },
    })
    return res
  },

  editPermission: async (id: string | number, data: Permission) => {
    const res = instance({
      url: `permission/${id}`,
      method: 'PUT',
      // params: { id: id },
      data: {
        name: data.name,
        module: data.module,
        apiPath: data.apiPath,
        method: data.method,
      },
    })
    return res
  },
}
export default permissionService
