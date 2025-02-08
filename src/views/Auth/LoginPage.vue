<template>
  <div class="">
    <div>
      <h2 class="mt-4 mb-4">Login Page</h2>
    </div>
    <a-form
      :model="formState"
      :layout="'vertical'"
      name="normal_login"
      class="login-form d-flex flex-column"
      @finish="onLogin"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please input your email!' }]"
      >
        <a-input v-model:value="formState.email">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <div class="d-flex justify-content-between">
          <a-button :loading="loading" @click="handleRegister">Register now!</a-button>
          <a-button
            :loading="loading"
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
        </div>
      </a-form-item>
      <!-- <div class="d-flex justify-content-end">
        <RouterLink :to="{ name: routerName.forgot }">
          <span>Forgot password</span>
        </RouterLink>
      </div> -->
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import authService from '@/services/auth'
import type { UserLogin } from '@/models/auth'
// import type { PromiseApi } from '@/models/promiseApi'
import { ACCESS_TOKEN } from '@/constants/localStorage'
import { useRouter } from 'vue-router'
import { routerName } from '@/constants/routerName'
import { loading } from '@/services/httpCommon'

const router = useRouter()

const onLogin = async (values: UserLogin): Promise<void> => {
  const res = await authService.login({
    email: values.email,
    password: values.password,
  })

  if (res.data) {
    const accessToken = res.data.access_token
    localStorage.setItem(ACCESS_TOKEN, accessToken)
    router.push({ name: routerName.home })
  }
}

interface FormState {
  email: string
  password: string
}

const formState = reactive<FormState>({
  email: '',
  password: '',
})

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.email && formState.password)
})
const handleRegister = () => {
  router.push({ name: routerName.register })
}
</script>

<style lang="scss" scoped></style>
