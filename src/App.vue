<template>
  <div id="app">
    <dc-form
      :fields="fields"
      @values-change="handleValuesChange"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      fields: [
        {
          type: "AInput",
          label: "input1",
          name: "input1",
          rules: [
            {
              required: true,
            },
          ],
        },
        {
          type: "DcForm",
          label: "SubForm",
          name: "subForm",
          fields: [
            {
              type: "AInput",
              label: "innerFields1",
              name: "inner_fields1",
              rules: [
                {
                  required: true,
                },
              ],
            },
            {
              type: "AInput",
              label: "innerFields2",
              name: "inner_fields2",
              rules: [
                {
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleValuesChange(props, values, allValues) {
      console.log("change:", JSON.stringify(allValues));
    },
    handleSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style>
</style>
