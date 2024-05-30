<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import Menubar from 'primevue/menubar'
import Badge from 'primevue/badge'
import Logo from '@/assets/projects/biatec.svg?raw'
const store = useAppStore()

const makeMenu = () => {
  items.value = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      route: '/'
    },
    {
      label: 'Our Projects',
      icon: 'pi pi-star',
      items: [
        {
          label: 'Wallet',
          icon: 'pi pi-star',
          items: [
            {
              label: 'A-Wallet web',
              icon: 'pi pi-star',
              url: 'https://www.a-wallet.net'
            },
            {
              label: 'Source code',
              icon: 'pi pi-star',
              url: 'https://github.com/scholtz/wallet'
            }
          ]
        },
        {
          label: 'Gold token',
          icon: 'pi pi-star',
          items: [
            {
              label: 'ASA.Gold Web',
              icon: 'pi pi-star',
              url: 'https://www.asa.gold'
            },
            {
              label: 'ASA.Gold Api',
              icon: 'pi pi-star',
              url: 'https://bff.asa.gold/swagger/index.html'
            },
            {
              label: 'Source code',
              icon: 'pi pi-star',
              url: 'https://github.com/scholtz/wallet'
            }
          ]
        },
        {
          label: 'Concentrated liquidity AMM',
          icon: 'pi pi-star',
          items: [
            {
              label: 'Biatec DEX',
              icon: 'pi pi-star',
              url: 'https://dex.biatec.io'
            }
          ]
        },
        {
          label: 'Decentralized scheduler',
          icon: 'pi pi-star',
          items: [
            {
              label: 'Scheduler builder',
              icon: 'pi pi-star',
              url: 'https://scheduler.biatec.io'
            },
            {
              label: 'Scheduler API',
              icon: 'pi pi-star',
              url: 'https://api-scheduler.biatec.io'
            },
            {
              label: 'Documentation',
              icon: 'pi pi-star',
              url: 'https://docs-scheduler.biatec.io/'
            },
            {
              label: 'Source code BE',
              icon: 'pi pi-star',
              url: 'https://github.com/scholtz/BiatecCron'
            },
            {
              label: 'Source code builder',
              icon: 'pi pi-star',
              url: 'https://github.com/scholtz/BiatecCronBuilder'
            },
            {
              label: 'Wallet integration source code',
              icon: 'pi pi-star',
              url: 'https://github.com/scholtz/wallet/blob/master/src/pages/Account/ScheduledPayments.vue'
            }
          ]
        },
        {
          label: 'Aramid Bridge',
          icon: 'pi pi-star',
          items: [
            {
              label: 'Aramid Bridge Web',
              icon: 'pi pi-star',
              url: 'https://www.aramid.finance'
            },
            {
              label: 'Aramid Bridge - Voi2Algo',
              icon: 'pi pi-star',
              url: 'https://voitest.k8s.aramid.finance'
            }
          ]
        },
        {
          label: 'Accounting',
          icon: 'pi pi-star',
          items: [
            {
              label: 'Biatec Accounting Web',
              icon: 'pi pi-star',
              url: 'https://accounting.biatec.io'
            }
          ]
        },
        {
          label: 'NFTs',
          icon: 'pi pi-star',
          items: [
            {
              label: 'Biatec NFTs Web',
              icon: 'pi pi-star',
              url: 'https://nft.biatec.io'
            }
          ]
        },
        {
          label: 'Voting',
          icon: 'pi pi-star',
          items: [
            {
              label: 'Vote Coin Standard',
              icon: 'pi pi-star',
              url: 'https://www.vote-coin.com'
            },
            {
              label: 'Vote Coin app',
              icon: 'pi pi-star',
              url: 'https://app.vote-coin.com'
            },
            {
              label: 'Vote Coin API',
              icon: 'pi pi-star',
              url: 'https://api.vote-coin.com/swagger/index.html'
            }
          ]
        }
      ]
    },
    {
      label: 'Contact us',
      icon: 'pi pi-phone',
      route: '/contact-biatec'
    },
    {
      label: 'Theme',
      icon: 'pi pi-palette',
      items: makeThemes()
    }
  ]
}

const items = ref<any>([])
const makeThemes = () => {
  const allowed = [
    { name: 'Lara Dark Teal', file: 'lara-dark-teal', icon: 'pi pi-moon' },
    { name: 'Lara Light Teal', file: 'lara-light-teal', icon: 'pi pi-sun' },

    { name: 'Aura Dark Teal', file: 'aura-dark-teal', icon: 'pi pi-moon' },
    { name: 'Aura Light Teal', file: 'aura-light-teal', icon: 'pi pi-sun' },

    { name: 'Saga Blue', file: 'saga-blue', icon: 'pi pi-sun' },
    { name: 'Rhea Light', file: 'rhea', icon: 'pi pi-sun' },
    { name: 'Arya Purple', file: 'arya-purple', icon: 'pi pi-moon' },
    { name: 'Nova Alt', file: 'nova-alt', icon: 'pi pi-sun' },

    { name: 'Soho Dark', file: 'soho-dark', icon: 'pi pi-moon' },
    { name: 'Soho Light', file: 'soho-light', icon: 'pi pi-sun' },

    {
      name: 'Bootstrap Dark Purple',
      file: 'bootstrap4-dark-purple',
      icon: 'pi pi-moon'
    },
    {
      name: 'Bootstrap Light Purple',
      file: 'bootstrap4-light-purple',
      icon: 'pi pi-sun'
    }
  ]

  const ret = []
  for (const item of allowed) {
    ret.push({
      label: item.name,
      icon: item.icon,
      command: async () => {
        store.state.theme = item.file
        localStorage.setItem('lastTheme', item.file)
      }
    })
  }
  return ret
}
makeMenu()
</script>

<template>
  <div class="card m-2">
    <div class="svg-image" v-html="Logo"></div>
  </div>
</template>
<style>
.p-submenu-list {
  min-width: 300px;
}
</style>
