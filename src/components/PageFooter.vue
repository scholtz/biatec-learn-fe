<script setup lang="ts">
import Image from 'primevue/image'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Card from 'primevue/card'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const isMobile = ref(false)

function handleResize() {
  if (window.innerWidth <= 768) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}

onMounted(() => {
  if (window.innerWidth <= 768) {
    isMobile.value = true
  }
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
<template>
  <Card class="m-2 text-center">
    <template #content>
      BiatecLearn is part of the Biatec Group -
      <a href="https://www.biatec.io">https://www.biatec.io</a>
    </template>
  </Card>
</template>
<style scoped>
.use-text-subtitle {
  margin-bottom: 48px;
  font-size: 30px;
  line-height: 36px;
  font-weight: var(--font-medium) !important;
}
.font-style .font-medium {
  font-size: 20px !important;
  font-weight: var(--font-bold);
  text-transform: uppercase;
}
.footer-two {
  padding-top: 40px;
  border-top: 1px solid rgb(216 216 216 / 53%);
  max-width: 100%;
  clip: rect(0, auto, auto, 0);
  height: 100%;
  overflow: hidden;
  top: 0;
  width: 100%;
}
</style>
