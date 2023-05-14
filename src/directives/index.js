
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
  install (app) {
    app.directive('img-lazy', {
      // el就是那个使用这个指令的元素。
      mounted (el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if (isIntersecting) {
              el.src = binding.value
              // 在图片第一次加载之后，就停止这个事件的监听。
              stop()
            }
          },
        )
      }
    })
  }
}