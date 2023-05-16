import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import router from '@/router'


// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    // 注意这里需要使用的是Authorization
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  // 统一错误处理
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })

  // 401token失效处理
  // 1. 清除本地用户数据
  // 2. 跳转到登录页
  if (e.response.status === 401) {
    userStore.clearUserInfo()
    console.log('111')
    router.push('/login')
  }
  return Promise.reject(e)
})


export default httpInstance