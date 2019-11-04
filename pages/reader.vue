<template>
  <div class="reader-page">
    <div class="title">
      shikAI
    </div>

    <div class="main">
      <div>
        <div>selectedLocation</div>
        {{ selectedLocation }}
      </div>
      <div>
        <div>destinationsArray</div>
        {{ destinationsArray }}
      </div>
      <div>
        <div>routes</div>
        {{ routes }}
      </div>
      <div>
        <div>selectedDestination</div>
        {{ selectedDestination }}
      </div>
      <QrCodeReader @detect="detectQr" @error="errorHandler" />
      <RouteGuidance :routes="routes" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import QrCodeReader from '~/components/QrCodeReader'
import RouteGuidance from '~/components/RouteGuidance'

export default {
  components: {
    QrCodeReader,
    RouteGuidance
  },
  computed: {
    ...mapGetters({
      destinationsArray: 'destinationsArray',
      selectedLocation: 'selectedLocation',
      routes: 'routes',
      selectedDestination: 'selectedDestination'
    })
  },
  created() {
    this.setLocation('pt-main-office')
    this.setDestinationNodeId('DAI-0001-0020')
    this.setRoutes('DAI-0001-0000')
  },
  methods: {
    ...mapActions({
      setLocation: 'setLocation',
      setRoutes: 'setRoutes',
      setDestinationNodeId: 'setDestinationNodeId'
    }),
    detectQr(qrInfo) {
      console.log('detectQr')
      console.log(qrInfo)
      // this.setDestinationNodeId('DAI-0001-0020')
    },
    errorHandler(err) {
      console.error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.reader-page {
}

.title {
  height: 50px;
  line-height: 50px;
  color: $color-white;
  @include text(normal, bold);
}

.main {
  border-radius: 50px 50px 0 0;
  background-color: $color-white;
}
</style>
