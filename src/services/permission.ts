import { instance } from '@/services/httpCommon'

const permissionService = {
  getPermission: async (params: any) => {
    const data = await instance({
      url: 'permissions',
      params: params,
      method: 'GET',
    })
    return data
  },
}
export default permissionService
