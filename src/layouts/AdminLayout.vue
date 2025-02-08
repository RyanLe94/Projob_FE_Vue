<template>
  <div class="admin-layout">
    <div class="wrapper-menu">
      <div class="wrapper-logo">
        <img src="@/assets/img/logo2.png" width="256" alt="logo" />
        <div class="d-flex justify-content-center mb-4"><span>Ver 2.0.1</span></div>
      </div>
      <a-divider class="m-0"></a-divider>
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        style="width: 266px"
        mode="inline"
        :open-keys="state.openKeys"
        :items="items"
        class="menu"
        @openChange="onOpenChange"
      ></a-menu>

      <a-button
        style="border: none; border-top: solid 1px gray"
        class="logout"
        @click="handleLogout"
        >Logout</a-button
      >
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
// import AdminPage from '@/views/AdminPage.vue'
import { routerName } from '@/constants/routerName'
import { useRouter } from 'vue-router'
import { ACCESS_TOKEN } from '@/constants/localStorage'
import { VueElement, h, reactive } from 'vue'
import MasterIcon from '@/assets/img/icons/MasterIcon.vue'
import DashboardIcon from '@/assets/img/icons/DashboardIcon.vue'
import type { ItemType } from 'ant-design-vue'

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType
}

const items: ItemType[] = reactive([
  getItem('Dashboard', 'sub1', () => h(DashboardIcon), [
    getItem('Category', '1'),
    getItem('Product', '2'),
    getItem('Partner', '3'),
    getItem('Supplier', '4'),
  ]),
  getItem('Master Management', 'sub2', () => h(MasterIcon), [
    getItem('User', '5'),
    getItem('Role', '6'),
  ]),
  // getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
  //   getItem('Option 9', '9'),
  //   getItem('Option 10', '10'),
  //   getItem('Option 11', '11'),
  //   getItem('Option 12', '12'),
  //   getItem('Option 13', '13'),
  //   getItem('Option 14', '14'),
  //   getItem('Option 15', '15'),
  //   getItem('Option 16', '16'),
  //   getItem('Option 17', '17'),
  //   getItem('Option 18', '18'),
  //   getItem('Option 19', '19'),
  //   getItem('Submenu', 'sub3', null, [getItem('Option 20', '20'), getItem('Option 21', '21')]),
  // ]),
])

const state = reactive({
  rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
  openKeys: ['sub1'],
  selectedKeys: [],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onOpenChange = (openKeys: string[]) => {
  // const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
  // if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //   state.openKeys = openKeys
  // } else {
  //   state.openKeys = latestOpenKey ? [latestOpenKey] : []
  // }
}
const router = useRouter()
const handleLogout = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  router.push({ name: routerName.login })
}
</script>

<style lang="scss" scoped>
.admin-layout {
  background-color: $primary-50;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  .wrapper-menu {
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .menu {
      width: 266px;
      height: 100vh;
      max-height: 100vh;
      overflow-y: auto;
    }
    .logout {
      border-radius: none;
    }
  }
  .wrapper-logo {
    background-color: white;
  }
}
// $transition-time: 0.3s;
// .default-layout {
//   &__lhs-wrapper {
//     width: 300px;
//     height: 100%;
//     background-color: $white;
//     box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.02);
//     z-index: 1;
//     transition: width $transition-time;

//     &__collapsed {
//       width: 52px !important;
//     }
//   }

//   &__logo {
//     height: 90px;
//     cursor: pointer;

//     &__signature {
//       height: 56px;

//       svg {
//         transition:
//           opacity,
//           width $transition-time;
//       }

//       &__collapsed {
//         svg {
//           width: 0;
//           opacity: 0;
//         }
//       }
//     }
//   }

//   &__greeting {
//     min-width: 300px;
//     height: 48px;
//     font-style: normal;
//     font-weight: 700;
//     font-size: 16px;
//     line-height: 20px;
//     color: $neutral-600;
//     transition: opacity $transition-time;

//     &__collapsed {
//       min-width: 0;
//       transition: opacity 0.15s !important;
//       opacity: 0 !important;
//     }
//   }

//   &__menu-wrapper {
//     height: calc(100% - 90px - 48px - 1px);

//     &__collapsed {
//       padding-top: 12px;
//     }
//   }

//   &__menu {
//     overflow-y: auto;
//     overflow-x: hidden;
//     .ant-menu-root {
//       border: none !important;
//     }
//   }

//   &__menu-title {
//     font-style: normal;
//     font-weight: 400;
//     font-size: 16px;
//     line-height: 20px;
//     color: $neutral-600;
//   }

//   &__sub-menu-title {
//     font-style: normal;
//     font-weight: 400;
//     font-size: 16px;
//     line-height: 20px;
//     color: $neutral-400;
//   }

//   &__icon {
//     color: $neutral-400;
//   }

//   &__menu-item-wrapper {
//     &:hover {
//       .default-layout {
//         &__icon {
//           color: $primary-400;
//         }

//         &__menu-title {
//           color: $primary-400;
//         }
//       }
//     }
//   }

//   &__expand-icon {
//     svg {
//       transition: transform $transition-time;
//       transform: rotate(180deg);
//     }

//     &__expanded {
//       svg {
//         transition: transform $transition-time;
//         transform: rotate(0deg);
//       }
//     }
//   }

//   &__logout-btn-wrapper {
//     height: 58px;

//     &__collapsed {
//       width: 52px;
//     }

//     &__logout-btn {
//       font-style: normal;
//       font-weight: 400;
//       font-size: 16px;
//       line-height: 20px;
//       color: $neutral-600;
//       border: none;

//       svg {
//         color: $neutral-400;
//         transition: color 0.3s;
//       }

//       &:focus {
//         background-color: transparent;
//       }

//       &:hover {
//         color: $primary;

//         svg {
//           color: $primary;
//         }
//       }
//     }
//   }

//   &__content-wrapper {
//     background-color: $neutral-50;
//     overflow: auto;
//     flex-grow: 1;
//   }

//   &__logout-content {
//     box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.06);

//     &__collapsed {
//       flex-direction: column;
//     }
//   }

//   &__toggle-menu-btn-wrapper {
//     width: 52px;
//     height: 58px;
//     border-left: 1px solid $neutral-100;

//     &__collapsed {
//       border-top: 1px solid $neutral-100;
//     }

//     &__toggle-btn {
//       transform: rotate(-90deg);
//       color: $neutral-400;
//       border: none;

//       &:focus {
//         background-color: transparent;
//       }

//       &:hover {
//         color: $primary;
//       }

//       &__close {
//         transform: rotate(90deg) !important;
//       }
//     }
//   }
// }

// :deep(.default-layout__menu-item-wrapper) {
//   .default-layout__menu-title {
//     &:hover {
//       color: $primary-400;
//     }
//   }

//   .ant-menu {
//     &-item-active {
//       .default-layout__sub-menu-title {
//         color: $primary-400;
//       }
//     }

//     &-sub {
//       .ant-menu {
//         &-item-selected {
//           border-left: 3px solid transparent;
//           background-color: $white;

//           .ant-menu {
//             &-title-content {
//               background: $neutral-50;
//               border-radius: 8px;
//             }
//           }
//         }

//         &-title-content {
//           padding-left: 34px;
//         }
//       }
//     }

//     &-item {
//       height: 48px !important;
//       border-left: 3px solid transparent;
//       padding-left: 12px !important;
//       line-height: 20px !important;
//       white-space: normal;

//       &::after {
//         transition: background $transition-time !important;
//       }

//       &-selected {
//         border-left: 3px solid $primary-400;

//         &::after {
//           border-right: none !important;
//         }

//         .default-layout {
//           &__menu-title {
//             font-style: normal;
//             font-weight: 600;
//             font-size: 16px;
//             line-height: 20px;
//             color: $primary-400;
//           }

//           &__sub-menu-title {
//             font-style: normal;
//             font-weight: 600;
//             font-size: 16px;
//             line-height: 20px;
//             color: $primary-400;
//           }

//           &__icon {
//             color: $primary-400;
//           }
//         }
//       }
//     }

//     &-submenu {
//       .ant-menu {
//         &-sub {
//           background-color: $white;
//         }

//         &-title-content {
//           height: 48px;
//           display: flex;
//           align-items: center;
//           padding-right: 10px;
//         }
//       }

//       .default-layout__arrow-icon {
//         display: flex;
//         align-items: center;

//         svg {
//           transition: transform $transition-time;
//           transform: rotate(180deg);
//         }
//       }

//       &-open {
//         .default-layout__arrow-icon {
//           svg {
//             transition: transform $transition-time;
//             transform: rotate(0deg);
//           }
//         }
//       }

//       &-title {
//         transition: background $transition-time !important;
//         border-left: 3px solid transparent;
//         padding-left: 12px !important;
//         height: 48px;
//         padding-right: 18px;
//         white-space: normal;
//       }

//       &-selected {
//         .default-layout {
//           &__menu-title {
//             font-style: normal;
//             font-weight: 600;
//             font-size: 16px;
//             line-height: 20px;
//             color: $primary-400;
//           }

//           &__icon {
//             color: $primary-400;
//           }
//         }
//       }
//     }
//   }
// }
</style>
