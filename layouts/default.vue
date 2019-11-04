<template>
  <div class="container">
    <nuxt />
  </div>
</template>

<style lang="scss">
body {
  background: linear-gradient(90deg, $color-main-1 0%, $color-main-2 100%);
  color: $color-black;
  @include text(normal, regular);
}
</style>

<style lang="scss" scoped>
.container {
  margin: 0 auto;

  width: 100%;
  @include mq(sm) {
    width: 100%;
  }
  @include mq() {
    width: $container-width;
  }
}
</style>
