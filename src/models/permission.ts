type Method = 'GET' | 'POST' | 'DELETE' | 'CREATE' | 'PATCH' | 'PUT'

export type Permission = {
  id?: string
  name?: string
  createdAt?: string
  createdBy?: string
  method?: Method
  module?: string
  apiPath?: string
}
