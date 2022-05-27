<template>
  <a-form :form="form" @submit="handleSubmit">
    <dc-form-item
      v-for="(field, index) in innerFields"
      :key="index"
      v-bind="field"
    />
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import DcFormItem from "./DcFormItem";

const VALUES_CHANGE_EVENT = "values-change";
const getValueFromEvent = function (props, values, allValues) {
  return allValues;
};

export default {
  name: "DcForm",
  components: {
    "dc-form-item": DcFormItem,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      onValuesChange: (...args) => this.$emit(VALUES_CHANGE_EVENT, ...args),
    });
  },
  computed: {
    innerFields() {
      return this.fields.map((item) => {
        if (item.type === "DcForm") {
          return {
            ...item,
            trigger: VALUES_CHANGE_EVENT,
            getValueFromEvent: getValueFromEvent.bind(this),
            listeners: {
              mounted: (form) => {
                this.form.subForms = {
                  ...(this.form.subForms || {}),
                  [item.name]: form,
                };
              },
            },
          };
        }
        return item;
      });
    },
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const validators = Object.values(this.form.subForms)
        .map(
          (form) =>
            new Promise((resolve, reject) => {
              form.validateFields((err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            })
        )
        .concat(
          new Promise((resolve, reject) => {
            this.form.validateFields((err, values) => {
              if (!err) {
                resolve(values);
              } else {
                reject(err);
              }
            });
          })
        );
      Promise.allSettled(validators).then((res) => {
        if (res.every((item) => item.status === "fulfilled")) {
          this.$emit("submit", res.slice(-1)[0].value);
        } else {
          console.log(
            "subform errs:",
            res.slice(0, -1).map((item) => item.reason)
          );
          console.log(
            "errs:",
            res.slice(-1).map((item) => item.reason)
          );
        }
      });
    },
  },
  mounted() {
    this.$emit("mounted", this.form);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
