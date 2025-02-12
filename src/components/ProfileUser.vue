<template>
  <div class="mt-2 d-flex justify-content-end me-5 mb-4 profile-user">
    <div class="user-img">
      <div class="d-flex align-items-center">
        <UserIcon />
        <span class="pro-icon">Pro</span>
      </div>
      <div class="user-detail">
        <div class="d-flex">
          <UserIcon />
          <div class="ms-2">
            <p>user name</p>
            <p>email</p>
            <p>...</p>
          </div>
        </div>
        <a-divider></a-divider>
        <div class="d-flex flex-column">
          <a-button class="m-2 pro-gradient">Update to Pro</a-button>
          <a-button class="m-2">Setting</a-button>
          <a-button @click="onLogout" class="m-2">Logout</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserIcon from '@/assets/img/icons/UserIcon.vue'
import { handleLogout } from '@/utils/helper'
const onLogout = () => {
  handleLogout()
}
</script>

<style lang="scss" scoped>
.profile-user {
}
.pro-icon {
  background: linear-gradient(259.43deg, #ffb94b -3.83%, #ffe7bf 29.35%, #ffb94b 92.22%);
  //   color: #513101;
  //   display: flex;
  //   font-family: Inter, sans-serif;
  //   font-size: 12px;
  //   font-weight: 600;
  //   height: 17px;
  //   letter-spacing: 0.01em;
  //   line-height: 14.52px;
  //   text-align: center;
  //   width: 33px;
  font-size: 12px;
  border-radius: 50%;
  padding: 2px 6px;
  margin-left: 8px;
}
.pro-gradient {
  background: linear-gradient(259.43deg, #ffb94b -3.83%, #ffe7bf 29.35%, #ffb94b 92.22%);
}
.user-detail {
  padding: 20px;
  display: none;
  position: absolute;
  right: 0px;
  width: 200px;
  z-index: 999;
  background-color: #eee7de;
  border-radius: 8px;
}
.user-img {
  position: relative;
}
.user-img:hover .user-detail {
  display: block;
}
.showInfo {
  display: block;
}
</style>
