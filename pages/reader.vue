<template>
  <div class="reader-page">
    <div class="title">
      shikAI
    </div>

    <div class="main">
      <!-- {{ selectedLocationId }}
      {{ locationsArray }} -->
      <SelectBox
        :v-value="selectedLocationId"
        :options="locationsArray"
        name="select-location"
        title="場所を選択してください"
        @input="setLocationId"
      />

      <!-- {{ selectedDestinationNodeId }}
      {{ destinationsArray }} -->
      <SelectBox
        :v-value="selectedDestinationNodeId"
        :options="destinationsArray"
        name="select-destination"
        title="目的地を選択してください"
        @input="setDestinationNodeId"
      />

      <QrCodeReader
        class="qr-code-reader"
        overlay-text="点字ブロックのQRコードを読み込んでください"
        @detect="detectQr"
        @error="cameraErrorHandler"
      />

      <!-- {{ routes }} -->
      <RouteGuidance
        no-data-text="目的地を設定してQRコードを読み込むとガイドが表示されます"
        class="route-guidance"
        :routes="routes"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import QrCodeReader from '~/components/QrCodeReader'
import RouteGuidance from '~/components/RouteGuidance'
import SelectBox from '~/components/SelectBox'
import toastr from '~/plugins/toastr'

export default {
  components: {
    QrCodeReader,
    RouteGuidance,
    SelectBox
  },
  computed: {
    ...mapGetters({
      destinationsArray: 'destinationsArray',
      selectedLocationId: 'selectedLocationId',
      routes: 'routes',
      locationsArray: 'locationsArray',
      selectedDestinationNodeId: 'selectedDestinationNodeId'
    })
  },
  created() {
    this.setLocationId('pt-main-office')
    this.setDestinationNodeId('DAI-0001-0020')
    this.setRoutes('DAI-0001-0000')
  },
  methods: {
    ...mapActions({
      setRoutes: 'setRoutes',
      setDestinationNodeId: 'setDestinationNodeId',
      setLocationId: 'setLocationId'
    }),
    detectQr(qrInfo) {
      console.log('detectQr', qrInfo)
      // this.setDestinationNodeId('DAI-0001-0020')
    },
    cameraErrorHandler(err) {
      console.error(err)
      toastr.error('カメラの設定に失敗しました.カメラの使用を許可してページを再読み込みしてください.')
    }
  }
}
</script>

<style lang="scss" scoped>
// .reader-page { }

.title {
  height: 50px;
  line-height: 50px;
  color: $color-white;
  @include text(normal, bold);
}

.main {
  border-radius: 16px;
  background-color: $color-white;
  padding: 16px;
}

.qr-code-reader, .route-guidance {
  margin-top: 16px;
}
</style>
