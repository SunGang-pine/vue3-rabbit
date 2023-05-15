
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
// 引入初始化样式文件
import '@/styles/common.scss'
// import { useIntersectionObserver } from '@vueuse/core'
import { lazyPlugin } from '@/directives'
// 引入全局组件插件
import { componentPlugin } from '@/components'
const app = createApp(App)

// app.directive('img-lazy', {
//   // el就是那个使用这个指令的元素。
//   mounted (el, binding) {
//     const { stop } = useIntersectionObserver(
//       el,
//       ([{ isIntersecting }]) => {
//         console.log(isIntersecting)
//         if (isIntersecting) {
//           el.src = binding.value
//           stop()
//         }
//       },
//     )
//   }
// })

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// 使用插件 
app.use(lazyPlugin)
app.use(componentPlugin)
app.use(pinia)
app.use(router)
app.mount('#app')
