export interface UserLogin {
  email: string | undefined
  password: string | undefined
}
// export interface AuthResponse {
//   access_token?: string
//   token_type?: string
//   expires_in?: number
//   name?: string
//   user_id?: number
//   email?: string
//   error?: string
// }
export interface UserRegister {
  username?: string
  email?: string
  password?: string
  passwordConfirm?: string
}
