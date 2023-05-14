
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
              stop()
            }
          },
        )
      }
    })
  }
}