export interface ItemType {
  label: string
  key: string
  icon?: any
  children?: ItemType[]
  type?: 'group'
  pathName?: string
}
import MasterIcon from '@/assets/img/icons/MasterIcon.vue'
import DashboardIcon from '@/assets/img/icons/DashboardIcon.vue'
import { routerName } from '@/constants/routerName'
import { h } from 'vue'
const menu: ItemType[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: () => h(DashboardIcon),
    children: [
      {
        label: 'User',
        key: 'user',
        pathName: routerName.user,
      },
      {
        label: 'Skill',
        key: 'skill',
        pathName: routerName.skill,
      },

      {
        label: 'Resume',
        key: 'resume',
        pathName: routerName.resume,
      },

      {
        label: 'Job',
        key: 'job',
        pathName: routerName.job,
      },
      {
        label: 'Subscriber',
        key: 'subscriber',
        pathName: routerName.subscriber,
      },
      {
        label: 'File',
        key: 'file',
        pathName: routerName.file,
      },
    ],
  },
  {
    label: 'Master',
    key: 'master',
    icon: () => h(MasterIcon),
    children: [
      {
        label: 'Role',
        key: 'role',
        pathName: routerName.role,
      },
      {
        label: 'Permission',
        key: 'permission',
        pathName: routerName.permission,
      },
    ],
  },
]
export default menu
