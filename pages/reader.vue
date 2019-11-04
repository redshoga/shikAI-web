<template>
  <div>
    <QrCodeReader @detect="detectQr" @error="errorHandler" />
    <RouteGuidance :routes="routes" />
    <div>
      <h1>selectedLocation</h1>
      {{ selectedLocation }}
    </div>
    <div>
      <h1>destinationsArray</h1>
      {{ destinationsArray }}
    </div>
    <div>
      <h1>routes</h1>
      {{ routes }}
    </div>
    <div>
      <h1>selectedDestination</h1>
      {{ selectedDestination }}
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
