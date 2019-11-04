<template>
  <div class="index-page">
    <div class="title">
      shikAI
    </div>
    <div class="description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </div>
    <div class="button" @click="$router.push('/reader')">
      使う
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.index-page {
  text-align: center;
}

.title {
  @include text(huge, bold);
  color: $color-white;
  margin-top: 50px;
}

.description {
  @include text(small, bold);
  width: 400px;
  margin: 20px auto 0;
  color: $color-white;
}

.button {
  @include text(large, bold);
  color: $color-main-1;
  width: 400px;
  height: 50px;
  border-radius: 50px;
  line-height: 50px;
  margin: 0 auto;
  background-color: $color-white;
  cursor: pointer;
  margin-top: 150px;

  &:hover {
    opacity: .75;
  }
}
</style>
