<template>
  <div class="admin-layout">
    <div class="wrapper-menu">
      <div>
        <div class="wrapper-logo">
          <img class="logo" src="@/assets/img/logo.jpg" width="120" alt="logo" />
          <div class="d-flex justify-content-center mb-4"><span>Ver 2.0.1</span></div>
        </div>
        <a-divider class="m-0"></a-divider>
        <a-menu
          v-model:selectedKeys="state.selectedKeys"
          style="width: 266px"
          mode="inline"
          :open-keys="state.openKeys"
          class="menu"
          :items="menus"
          @click="handleClickMenu"
          @openChange="onOpenChange"
        >
        </a-menu>
      </div>

      <!-- <div>
        <a-button
          style="border: none; border-top: solid 1px gray"
          class="logout w-100"
          @click="handleLogout"
          >Logout</a-button
        >
      </div> -->
    </div>
    <div class="content w-100">
      <ProfileUser></ProfileUser>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import AdminPage from '@/views/AdminPage.vue'
import ProfileUser from '@/components/ProfileUser.vue'

import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import menus from '@/utils/sideBar'
const router = useRouter()

const handleClickMenu = ({ item, key, keyPath }) => {
  console.log(item, key, keyPath)
  router.push({ name: item.pathName })
}

const state = reactive({
  openKeys: ['sub1'],
  selectedKeys: [],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onOpenChange = (openKeys: string[]) => {}
</script>

<style lang="scss" scoped>
.admin-layout {
  background-color: $primary-50;
  // width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;

  .wrapper-menu {
    // height: 100vh;
    // max-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    .menu {
      width: 266px;
      // height: 100vh;
      // max-height: 100vh;
      overflow-y: auto;
    }
    .logout {
      border-radius: none;
    }
  }
  .wrapper-logo {
    background-color: white;
    display: flex;
    flex-direction: column;
    .logo {
      border-radius: 50%;
      margin: 20px auto;
      display: block;
    }
  }
  .content {
    height: 100%;
    height: 100vh;
  }
}
</style>
