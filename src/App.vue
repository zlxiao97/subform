<template>
  <dc-form
    :fields="fields"
    @values-change="handleValuesChange"
    @submit="handleSubmit"
  />
</template>

<script>
import fields from "./fields";

export default {
  name: "App",
  data: () => {
    return {
      fields,
    };
  },
  methods: {
    handleValuesChange(props, values, allValues) {
      console.log("ParemtForm change:", JSON.stringify(allValues));
    },
    handleSubmit(values) {
      console.log("ParentForm submit:", values);
    },
  },
};
</script>

<style>
form {
  border: 1px dotted red;
  margin: 2rem !important;
  padding: 1rem !important;
}
</style>
