import router from '@/router'
import { routerName } from '@/constants/routerName'
import { ACCESS_TOKEN } from '@/constants/localStorage'
export const handleLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  router.push({ name: routerName.login })
}
