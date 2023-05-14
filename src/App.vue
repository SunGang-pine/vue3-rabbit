<script setup>
import { getCategoryAPI } from '@/api/test.js'
import { onMounted } from 'vue'
const getTestData = async () => {
  const result = await getCategoryAPI()
  console.log(result)
}
onMounted(() => {
  getTestData()
})
</script>

<template>
  <div class="box"></div>
  <RouterView />
</template>
<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background: $xtxColor;
}
</style>
