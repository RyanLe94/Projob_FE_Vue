import type { Rule } from 'ant-design-vue/lib/form'
const validatorUsername = (value: string | undefined) => {
  if (!value) {
    return 'field is required'
  }
  return ''
}
const validatorUsernameAsync = (rule: Rule, value: string) => {
  const validUsername = validator.validatorUsername(value)
  if (validUsername) {
    return Promise.reject(validUsername)
  }
  return Promise.resolve()
}
export const validator = {
  validatorUsername,
  validatorUsernameAsync,
}
