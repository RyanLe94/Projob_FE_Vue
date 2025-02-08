<template>
  <div>
    <h2 class="d-flex justify-content-center mt-4 mb-4">Form Register</h2>
    <a-form
      :model="formState"
      name="registerForm"
      @finish="onRegister"
      @onFinishFailed="onRegisterFailed"
      :layout="'vertical'"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[
          {
            validator: validator.validatorUsernameAsync,
          },
        ]"
      >
        <a-input v-model:value="formState.username"></a-input>
      </a-form-item>
      <a-form-item label="Email" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item label="Password" name="password">
        <a-input-password v-model:value="formState.password"></a-input-password>
      </a-form-item>
      <a-form-item label="Password confirm" name="passwordConfirm">
        <a-input-password v-model:value="formState.passwordConfirm"></a-input-password>
      </a-form-item>
      <a-form-item>
        <div class="d-flex justify-content-center">
          <a-button
            :loading="loading"
            html-type="submit"
            type="primary"
            :disabled="!!disabledRegister"
            >Register</a-button
          >
        </div>
      </a-form-item>
      <div class="d-flex justify-content-end">
        <RouterLink :to="{ name: routerName.login }">Already have an account?</RouterLink>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { loading } from '@/services/httpCommon'
import { reactive, computed } from 'vue'
import { routerName } from '@/constants/routerName'
import type { UserRegister } from '@/models/auth'
import { notification } from 'ant-design-vue'
import authService from '@/services/auth'
import { validator } from '@/utils/validator'
import { useRouter } from 'vue-router'

const router = useRouter()

const formState = reactive<UserRegister>({
  username: undefined,
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
})

const onRegister = async () => {
  const res = await authService.register({
    username: formState.username,
    email: formState.email,
    password: formState.password,
    passwordConfirm: formState.passwordConfirm,
  })
  if (res.data) {
    notification['success']({
      message: 'Đăng ký thành công',
      description: 'Vui lòng đăng nhập lại',
    })
  }
  router.push({ name: routerName.login })
}
const onRegisterFailed = () => {
  console.log('on register fail')
}

const disabledRegister = computed(() => {
  const isValidUsername = validator.validatorUsername(formState.username)
  return isValidUsername
})
</script>

<style lang="scss" scoped></style>
