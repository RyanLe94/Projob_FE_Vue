type Method = {
  string: 'GET' | 'POST' | 'DELETE' | 'CREATE' | 'PATCH' | 'PUT'
}

type Permission = {
  id?: string
  name?: string
  createdAt?: string
  createdBy?: string
  method?: Method
  module?: string
  apiPath?: string
}
export type { Permission }
