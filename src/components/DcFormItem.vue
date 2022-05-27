<template>
  <a-form-item v-bind="$props">
    <component
      v-bind:is="type"
      v-decorator="[name, { ...$attrs }]"
      v-bind="{ ...$props, ...$attrs }"
      v-on="$attrs.listeners"
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
  mounted() {
    // console.log(this.$attrs);
  },
};
</script>

<style scoped>
</style>