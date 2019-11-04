<template>
  <fieldset class="select-box">
    <div v-if="title" class="slot-container">
      {{ title }}
    </div>
    <select :name="name" class="select" @change="updateValue">
      <template v-for="(option, index) in options">
        <option :key="index" :value="option.value">
          {{ option.label }}
        </option>
      </template>
    </select>
  </fieldset>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      require: true,
      default: null
    },
    options: {
      type: Array,
      require: true,
      default: new Array(0)
    },
    name: {
      type: String,
      require: true,
      default: 'select-box'
    },
    title: {
      type: String,
      require: false,
      default: null
    }
  },
  mounted() {
    if (this.options.length === 0) return
    this.$emit('input', this.options[0].value)
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  border: none;
  padding: 0; // reset

  $base: &;
  & + #{$base} {
    margin-top: 16px;
  }
}

.slot-container {
  color: $color-black !important;
  @include text(small, bold);
  margin-bottom: 4px;
}

.select {
  width: 100%;
  border-radius: 16px;
}
</style>
