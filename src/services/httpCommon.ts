import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import CONFIG from '@/configs/appSetting'
import { ACCESS_TOKEN } from '@/constants/localStorage'
import { notification } from 'ant-design-vue'
import { ref } from 'vue'

const loading = ref(false)

const instance = axios.create({
  baseURL: CONFIG.BASE_URL,
  timeout: CONFIG.REQUEST_TIMEOUT,
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    loading.value = true
    return config as InternalAxiosRequestConfig
  },
  (error: AxiosError): Promise<void> => {
    return Promise.reject(error)
  },
)
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    loading.value = false
    return handleResponseResolve(response)
    // return response
  },
  (error: AxiosError) => {
    const data = handleResponseReject(error)
    loading.value = false
    return Promise.reject(data)
    // return Promise.reject(error)
  },
)

const handleResponseResolve = (response: AxiosResponse): AxiosResponse => {
  //  thong bao dang nhap thanh cong
  // neu request api thanh cong data tra ve se co dang :
  // {data,=> day chinh la response fe nhan duoc
  // config,headers,request,status,statusText}
  return response
}

const handleResponseReject = (error: AxiosError | any): AxiosError | any => {
  // Axios dataerror mac dinh se co dang {code, config,message,name,request,status,response:{
  // data => day chinh la response fe nhan duoc
  // config,,headers,request,status,statusText
  // }}
  // hien thi loi dua vao status hoac code
  // xu ly refresh token
  const status = error.response?.status
  switch (status) {
    case 500:
      notification['error']({
        message: 'Server Error',
        description: 'Vui lòng thử lại sau',
      })
      break

    case 422:
      if (error.response) {
        const errors = error.response.data.errors
        const firstKey = Object.keys(errors)[0]
        notification['error']({
          message: errors[firstKey][0],
          description: error.response.data.message,
        })
      }

      break
    case 404:
      notification['error']({
        message: 'Not Found',
        description: 'Dữ liệu không tồn tại',
      })
      break
    case 401:
      notification['error']({
        message: 'Unauthorized',
        description: error.response.data.error,
      })

      break
    default:
      notification['error']({
        message: 'Lỗi không xác định',
        description: error.response?.data.message,
      })
  }
  return error
}

export { instance, loading }
