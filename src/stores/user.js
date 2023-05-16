import { defineStore } from "pinia"
import { ref } from 'vue'
import { loginAPI } from '@/apis/user.js'
import { useCartStore } from "./cartStore"
import { mergeCartAPI } from "@/apis/cart"
export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})

  // 1. 登录
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result

    // 合并购物车
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    // 合并完成获取最新的购物车列表
    cartStore.updateNewList()
  }

  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 清空购物车
    cartStore.clearCart()
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true,
})