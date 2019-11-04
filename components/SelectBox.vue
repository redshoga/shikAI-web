<template>
  <fieldset>
    <select :name="name" @change="updateValue">
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
    }
  },
  mounted() {
    this.$emit('input', this.options[0].value)
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
