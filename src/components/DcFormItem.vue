<template>
  <a-form-item v-bind="$props">
    <component
      v-bind:is="type"
      v-decorator="[name, { ...$attrs }]"
      v-bind="{ ...$props, ...$attrs }"
      v-on="listeners"
    ></component>
  </a-form-item>
</template>

<script>
export default {
  name: "DcFormItem",
  props: {
    label: {
      type: String,
      default: "label",
    },
    name: {
      type: String,
      default: "name",
    },
    type: {
      type: String,
      default: "AInput",
    },
    placeholder: {
      type: String,
      default: "placeholder",
    },
  },
  computed: {
    listeners() {
      return this.$attrs.listeners || {};
    },
  },
};
</script>

<style scoped>
</style>