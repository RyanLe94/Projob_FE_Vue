<template>
  <h2 class="mt-4 mb-4">Forgot password</h2>
  <a-form :model="formState">
    <a-form-item label="Email" name="email">
      <a-input v-model="formState.email"></a-input>
    </a-form-item>
    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button type="primary" size="">Submit</a-button>
      </div>
    </a-form-item>
    <router-link :to="{ name: routerName.login }">
      <div class="d-flex justify-content-end">Back to login page</div>
    </router-link>
  </a-form>
</template>

<script setup lang="ts">
import { routerName } from '@/constants/routerName'
import { reactive } from 'vue'
const formState = reactive<{ email?: string }>({ email: undefined })
</script>

<style lang="scss" scoped></style>
