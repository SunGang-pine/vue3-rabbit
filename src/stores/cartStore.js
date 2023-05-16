// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {

  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  // 1. 定义state - cartList
  const cartList = ref([])
  // 2. 定义action - addCart
  const addCart = async (goods) => {
    const { skuId, count } = goods
    // 如果登录了
    if (isLogin.value) {
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {

      // 添加购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        // item.count++
        item.count = item.count + goods.count
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }

  }

  // 删除
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      updateNewList()
    } else {
      const idx = cartList.value.findIndex(item => item.skuId === skuId)
      cartList.value.splice(idx, 1)
    }
  }

  const updateNewList = async () => {
    const res = await findNewCartListAPI()  // 获取最新的购物车列表
    cartList.value = res.result
  }

  // 清空购物车
  const clearCart = () => {
    cartList.value = []
  }

  const allCount = computed(() => cartList.value.reduce((pre, item) => pre + item.count, 0))
  const allPrice = computed(() => cartList.value.reduce((pre, item) => pre + item.count * item.price, 0))

  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }

  // 如果全部，则选中
  const isAll = computed(() => {
    return cartList.value.every(item => item.selected)
  })

  // 全选
  const allCheck = (selected) => {
    console.log(selected)
    cartList.value.forEach(item => {
      item.selected = selected
    })
  }

  // 3. 已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 4. 已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
}, {
  persist: true,
})