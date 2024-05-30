<script setup lang="ts">
import Layout from '@/layouts/PublicLayout.vue'
import AOS from 'aos'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import 'aos/dist/aos.css'
import { onMounted, reactive } from 'vue'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'qrcode-reader-vue3'
import { useAppStore } from '@/stores/app'
import { useToast } from 'primevue/usetoast'
import algosdk, { AtomicTransactionComposer, Transaction } from 'algosdk'
import { sha512_256 } from 'js-sha512'
import { useRoute } from 'vue-router'
import { Buffer } from 'buffer'
const route = useRoute()

import {
  BiatecLearnClient,
  getBiatecLearnAppReferences,
  getBoxReferenceAnswer,
  getBoxReferenceQuestion,
  type IQuestion
} from 'biatec-learn'
import parseBiatecLearnBox from '@/scripts/parseBiatecLearnBox'
const store = useAppStore()
const toast = useToast()

const state = reactive({
  camera: false,
  id: '',
  box: null as IQuestion | null,
  answer: 0
})
const onDecodeQR = (result: any) => {
  console.log('result', result)
  state.id = result
  state.camera = false
}

const auth = async () => {
  store.state.forceAuth = true
}

const load = async () => {
  try {
    if (!store.state.authState.isAuthenticated) {
      store.state.forceAuth = true
      toast.add({
        severity: 'error',
        detail: 'Authenticate first',
        life: 5000
      })
      return
    }
    const ref = getBiatecLearnAppReferences()
    const appId = ref['testnet-v1.0']
    var algod = new algosdk.Algodv2(
      store.state.algodToken,
      store.state.algodHost,
      store.state.algodPort
    )
    const questionHash = sha512_256.arrayBuffer(state.id)
    const questionUint8 = new Uint8Array(questionHash)

    const boxRef = getBoxReferenceQuestion({ app: appId, hash: questionUint8 })
    const box = await algod.getApplicationBoxByName(appId, boxRef.name).do()
    const parsedBox = parseBiatecLearnBox(box.value)
    state.box = parsedBox
    console.log('BOX', parsedBox, Buffer.from(box.value).toString('hex'))
  } catch (exc: any) {
    console.error(exc)
    toast.add({
      severity: 'error',
      detail: exc.message ?? exc,
      life: 5000
    })
  }
}

const execute = async () => {
  try {
    if (!store.state.authState.isAuthenticated) {
      store.state.forceAuth = true
      toast.add({
        severity: 'error',
        detail: 'Authenticate first',
        life: 5000
      })
      return
    }
    if (!state.box?.text) {
      toast.add({
        severity: 'error',
        detail: 'Error in box',
        life: 5000
      })
      return
    }
    const ref = getBiatecLearnAppReferences()
    const appId = ref['testnet-v1.0']
    var algod = new algosdk.Algodv2(
      store.state.algodToken,
      store.state.algodHost,
      store.state.algodPort
    )
    const questionHash = sha512_256.arrayBuffer(state.id)
    const questionUint8 = new Uint8Array(questionHash)

    const signer = {
      addr: store.state.authState.account,
      // eslint-disable-next-line no-unused-vars
      signer: async (txnGroup: Transaction[], indexesToSign: number[]) => {
        return txnGroup.map((tx) => {
          console.error('Attempting to sign')
          return new Uint8Array()
        })
      }
    }
    const atc = new AtomicTransactionComposer()
    const clientBiatecLearnClient = new BiatecLearnClient(
      {
        sender: signer,
        resolveBy: 'id',
        id: Number(appId)
      },
      algod
    )
    const boxRefQuestion = getBoxReferenceQuestion({ app: appId, hash: questionUint8 })
    const boxRefAnswer = getBoxReferenceAnswer({
      app: appId,
      address: algosdk.decodeAddress(store.state.authState.account)
    })
    const params = await algod.getTransactionParams().do()
    let txOptin: null | Transaction = null
    if (state.box?.assetId && state.box?.assetId > 0) {
      // check if we need to optin
      const account = await algod.accountInformation(store.state.authState.account).do()
      const has = account.assets.find((a: any) => {
        console.log('a', a)
        return BigInt(a['asset-id']) === BigInt(state.box?.assetId ?? -1)
      })
      console.log('store.state.authState.account', account.assets, has)
      if (!has) {
        txOptin = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          amount: 0,
          assetIndex: Number(state.box.assetId),
          from: store.state.authState.account,
          to: store.state.authState.account,
          suggestedParams: params
        })
      }
    }

    await clientBiatecLearnClient.answerQuestion(
      {
        id: state.id,
        answer: BigInt(state.answer)
      },
      {
        sendParams: {
          atc
        },
        boxes: [boxRefQuestion, boxRefAnswer],
        assets: [Number(state.box?.assetId ?? 0)]
      }
    )
    const toSign: Transaction[] = txOptin
      ? [
          txOptin,
          ...atc.buildGroup().map((tx) => {
            tx.txn.group = undefined
            return tx.txn
          })
        ]
      : atc.buildGroup().map((tx) => tx.txn)
    const toSignGrouped = algosdk.assignGroupID(toSign)
    const groupedEncoded = toSignGrouped.map((tx) => tx.toByte())
    const signedTxs = (await store.state.authComponent.sign(groupedEncoded)) as Uint8Array[]
    const { txId } = await algod.sendRawTransaction(signedTxs).do()
    if (txId) {
      console.log('tx sent to the network', txId)
      toast.add({
        severity: 'success',
        detail: 'Tx sent to the network: ' + txId,
        life: 5000
      })
      state.box = null
    }
    const confirmation = await algosdk.waitForConfirmation(algod, txId, 10)
    if (confirmation?.txn) {
      console.log('tx confifmed by the network', txId)
      toast.add({
        severity: 'success',
        detail: 'Tx has been confirmed: ' + txId,
        life: 5000
      })
      state.box = null
    } else {
      console.error('tx NOT confifmed by the network', txId)
      toast.add({
        severity: 'error',
        detail: 'Tx has not been confirmed by network in 10 rounds',
        life: 5000
      })
    }
  } catch (exc: any) {
    // Network request error. Received status 400 (): TransactionPool.Remember: transaction F3OC2LZSQVMP57HAVXZ6JILKNDANWK6YNHPH6IZSP4UDZZGCVHTA: logic eval error: assert failed pc=405. Details: app=674216950, pc=405, opcodes=intc_1 // 0; >; assert
    console.error(exc)
    if (exc.message.indexOf('pc=405')) {
      toast.add({
        severity: 'error',
        detail: 'This question has been already claimed maximum times',
        life: 5000
      })
    } else {
      toast.add({
        severity: 'error',
        detail: exc.message ?? exc,
        life: 5000
      })
    }
  }
}

onMounted(() => {
  if (route.params.id) {
    state.id = route.params.id as string
  }
})

/* eslint-disable no-useless-escape */
</script>
<template>
  <Layout :hideTopMenu="false">
    <div class="text-center">
      <div class="m-2 md:m-6">
        <Card class="col-12 md:col-offset-3 md:col-6">
          <template #content>
            <div class="grid" v-if="!state.box?.text">
              <div class="col-12">
                <h3>Load the question</h3>
                <p>
                  Use the QR code to fetch the question. If you answer correctly you will receive
                  airdrop.
                </p>
                <InputText v-model="state.id" class="w-full"></InputText>
                <Button
                  :severity="state.id ? 'secondary' : 'primary'"
                  class="m-2"
                  @click="state.camera = !state.camera"
                >
                  Load with camera
                </Button>
                <Button
                  :severity="state.box?.text ? 'secondary' : 'primary'"
                  class="m-2"
                  @click="load"
                  v-if="store.state.authState.isAuthenticated"
                >
                  Load question
                </Button>
                <Button class="m-2" @click="auth" v-else>Authenticate first</Button>
              </div>
              <div class="col-12" v-if="state.camera">
                <QrcodeStream @decode="onDecodeQR" />
                <QrcodeDropZone />
                <QrcodeCapture />
              </div>
            </div>
            <div class="grid" v-if="state.box?.text">
              <div class="col-12">
                <h3>{{ state.box?.title }}</h3>
                <p>{{ state.box.text }}</p>
                <div class="flex align-items-center m-4" v-if="state.box.answer1">
                  <RadioButton v-model="state.answer" inputId="a1" name="answer" value="1" />
                  <label for="a1" class="ml-2">{{ state.box.answer1 }}</label>
                </div>
                <div class="flex align-items-center m-4" v-if="state.box.answer2">
                  <RadioButton v-model="state.answer" inputId="a2" name="answer" value="2" />
                  <label for="a2" class="ml-2">{{ state.box.answer2 }}</label>
                </div>
              </div>
              <div class="col-12">
                <Button class="m-2" @click="execute" v-if="store.state.authState.isAuthenticated">
                  Answer
                </Button>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </Layout>
</template>
<style>
.svg-image {
  height: 8em;
}
</style>
