type Role = {
  id: string
  name: string
  createAt?: Date
  updateAt?: Date
  createdBy?: string
  updateBy?: string
  description?: string
  permissions: string[]
}
export type { Role }
