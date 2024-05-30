<script setup lang="ts">
import Layout from '@/layouts/PublicLayout.vue'
import AOS from 'aos'
import Card from 'primevue/card'
import Button from 'primevue/button'
import 'aos/dist/aos.css'
import { onMounted } from 'vue'
onMounted(() => {
  setTimeout(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    })
  }, 10)
})

/* eslint-disable no-useless-escape */
</script>
<template>
  <Layout :hideTopMenu="false">
    <h1 class="text-center">Contact us</h1>
    <p class="text-center">Prefered communication channel is Discord.</p>

    <div data-aos="fade-left" class="m-2 md:m-6">
      <Card class="col-12 md:col-6 md:col-offset-1">
        <template #content>
          <div class="grid">
            <div class="col-12">
              <h2>Discord</h2>
              <p>
                Join our discord channel to show us support or if you need any help with our
                products.
              </p>
              <a href="https://discord.gg/4YeC4MFMA9" target="_blank">
                <Button>
                  Join <span class="p-button-icon pi pi-discord ml-2" data-pc-section="icon"></span>
                </Button>
              </a>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div data-aos="fade-right" class="m-2 md:m-6">
      <Card class="col-12 md:col-offset-5 md:col-6">
        <template #content>
          <div class="grid">
            <div class="col-12">
              <h2>Telegram</h2>
              <p>Join our telegram group - t.me/biatecgroup</p>
              <a href="https://t.me/biatecgroup" target="_blank">
                <Button>
                  Join
                  <span class="p-button-icon pi pi-telegram ml-2" data-pc-section="icon"></span>
                </Button>
              </a>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div data-aos="fade-left" class="m-2 md:m-6">
      <Card class="col-12 md:col-6 md:col-offset-1">
        <template #content>
          <div class="grid">
            <div class="col-12">
              <h2>Twitter</h2>
              <p>Follow us on twitter/X to receive the latest news - x.com/BiatecGroup</p>
              <a href="https://x.com/BiatecGroup" target="_blank">
                <Button>
                  DYOR
                  <span class="p-button-icon pi pi-twitter ml-2" data-pc-section="icon"></span>
                </Button>
              </a>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div data-aos="fade-right" class="m-2 md:m-6">
      <Card class="col-12 md:col-offset-5 md:col-6">
        <template #content>
          <div class="grid">
            <div class="col-12">
              <h2>Email</h2>
              <div class="grid">
                <div class="col-12 md:col-6">
                  <p>General inquires by email</p>
                  <a href="mailto:info@biatec.io" target="_blank">
                    <Button>
                      <span class="p-button-icon pi pi-at mr-2" data-pc-section="icon"></span>
                      info@biatec.io
                    </Button>
                  </a>
                </div>
                <div class="col-12 md:col-6">
                  <p>Investor relation inquires</p>
                  <a href="mailto:investor@biatec.io" target="_blank">
                    <Button>
                      <span class="p-button-icon pi pi-at mr-2" data-pc-section="icon"></span>
                      investor@biatec.io
                    </Button>
                  </a>
                </div>
                <div class="col-12 md:col-6">
                  <p>Media coverage</p>
                  <a href="mailto:press@biatec.io" target="_blank">
                    <Button>
                      <span class="p-button-icon pi pi-at mr-2" data-pc-section="icon"></span>
                      press@biatec.io
                    </Button>
                  </a>
                </div>
                <div class="col-12 md:col-6">
                  <p>Legal inquires</p>
                  <a href="mailto:legal@biatec.io" target="_blank">
                    <Button>
                      <span class="p-button-icon pi pi-at mr-2" data-pc-section="icon"></span>
                      legal@biatec.io
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </Layout>
</template>
