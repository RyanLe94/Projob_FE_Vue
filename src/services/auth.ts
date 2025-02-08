import { instance } from '@/services/httpCommon'
import type { UserLogin, UserRegister } from '@/models/auth'

const authService = {
  login: async (body: UserLogin) => {
    const response = await instance({
      method: 'POST',
      url: '/auth/login',
      data: {
        email: body.email,
        password: body.password,
      },
    })
    return response
  },

  register: async (body: UserRegister) => {
    const response = await instance({
      method: 'POST',
      url: '/auth/signup',
      data: {
        email: body.email,
        name: body.username,
        password: body.password,
        password_confirmation: body.passwordConfirm,
      },
    })
    return response
  },

  refreshTokenFake: async () => {},
}

export default authService
