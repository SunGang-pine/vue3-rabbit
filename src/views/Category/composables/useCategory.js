import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getTopCategoryAPI } from '@/apis/category'

export function useCategory () {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id) => {
    // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
    const res = await getTopCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => {
    getCategory(route.params.id)
  })
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })
  return {
    getCategory,
    categoryData
  }
}