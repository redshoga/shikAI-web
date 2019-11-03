<template>
  <div>
    <QrCodeReader @detect="detectQr" @error="errorHandler" />
    hello
  </div>
</template>

<script>
import QrCodeReader from '~/components/QrCodeReader'

export default {
  components: {
    QrCodeReader
  },
  methods: {
    detectQr(qrInfo) {
      console.log('detectQr')
      console.log(qrInfo)
    },
    errorHandler(err) {
      console.error(err)
    }
  }
}
</script>
