<template>
  <div id="yoin"></div>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount,
  nextTick,
  onMounted,
  watch
} from 'vue'
import '../../../yoin/ui/dist/client/client.js'

let instance: any = null

const initYoin = async () => {
  if (instance && typeof instance.destroy === 'function') {
    instance.destroy()
  }
  await nextTick()
  if (typeof window !== 'undefined' && (window as any).YoinClient) {
    const YoinClient = (window as any).YoinClient

    instance = new YoinClient({
      containerId: 'yoin',
      api_base: "http://127.0.0.1:7410",
      site_id: 1
    })
  }
}

onMounted(() => {
  initYoin();
})

onBeforeUnmount(() => {
  if (instance && typeof instance.destroy === 'function') {
    instance.destroy()
  }
})
</script>

<style scoped>
#yoin {
  all: initial;
  font-family: inherit;
  box-sizing: border-box;
}
</style>