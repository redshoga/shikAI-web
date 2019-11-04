<template>
  <div class="route-guidance">
    <div v-if="routes === null && noDataText">
      {{ noDataText }}
    </div>
    <div v-else class="routes">
      <div v-for="route in routes" :key="route.id" class="route">
        <img :src="arrowIcons[route.direction]" class="arrow-icon">
        {{ guideTexts[route.direction] }} {{ route.distance }}m 進む
      </div>
    </div>
  </div>
</template>

<script>
import IconArrowRight from '~/assets/icons/arrow-right-solid.svg'
import IconArrowLeft from '~/assets/icons/arrow-left-solid.svg'
import IconArrowUp from '~/assets/icons/arrow-up-solid.svg'

export default {
  props: {
    noDataText: {
      type: String,
      required: false,
      default: null
    },
    routes: {
      type: Array,
      required: false,
      default: null,
      validator(routes) {
        if (routes === null) return true

        return routes.every((route) => {
          return ['id', 'distance', 'direction'].every((key) => {
            return Object.keys(route).includes(key)
          })
        })
      }
    }
  },
  data() {
    return {
      arrowIcons: {
        'Front': IconArrowUp,
        'Left': IconArrowLeft,
        'Right': IconArrowRight
      },
      guideTexts: {
        'Front': '前に',
        'Left': '左に',
        'Right': '右に'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow-icon {
  transform: translateY(4px);
  width: 20px;
}
</style>
