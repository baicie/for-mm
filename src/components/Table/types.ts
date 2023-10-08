export interface TableHeader {
  prop: string
  lable: string
  slot?: string
  option?: string
  sortable?: boolean
}

export interface List {
  id: string
  username: string
  phone: string
  email: string
  roles: string
  status: boolean
  createTime: string
}

export interface Data<T> {
  total: number
  list: T[]
}

export interface TableResult<T> {
  data: Data<T>
  code: number
  message: string
}
