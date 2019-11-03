<template>
  <div class="route-guidance">
    <div v-if="routes === null">
      ルートを選択してください
    </div>
    <div v-else class="routes">
      <div v-for="route in routes" :key="route.id" class="route">
        {{ route.id }}<br>
        {{ route.distance }}<br>
        {{ route.direction }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
  }
}
</script>

<style lang="scss" scoped>

</style>
