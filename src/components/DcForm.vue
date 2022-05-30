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
import { last, partial, assign, get } from "lodash";
import DcFormItem from "./DcFormItem";
const VALUES_CHANGE_EVENT = "values-change";

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
    // 初始化表单实例，绑定 自定义 onChange 事件
    this.form = this.$form.createForm(this, {
      onValuesChange: partial(this.$emit, VALUES_CHANGE_EVENT).bind(this),
    });
  },
  computed: {
    innerFields() {
      // 对子表单做特殊处理，实现自定义表单的约定，参考https://1x.antdv.com/components/form-cn/#components-form-demo-customized-form-controls
      return this.fields.map((field) => {
        if (field.type === "DcForm") {
          return assign({}, field, {
            trigger: VALUES_CHANGE_EVENT,
            getValueFromEvent: this.getValueFromEvent,
            listeners: assign({}, get(field, "listeners", {}), {
              mounted: partial(this.subFormMounted, field).bind(this), // 将子表单实例关联到父表单实例
            }),
          });
        }
        return field;
      });
    },
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      // 根据表单实例，递归获取所有表单实例数组（包含子表单）
      const validators = this.getValidators();
      // 全部表单实例校验通过后，认为表单校验成功
      Promise.allSettled(validators)
        .then((res) => {
          if (res.every((item) => item.status === "fulfilled")) {
            this.$emit("submit", get(last(res), "value"));
          } else {
            throw new Error(res.map((item) => item.reason));
          }
        })
        .catch((errs) => {
          // TODO: 结构化的报错 log
          console.log("subform errs:", errs(errs.slice(0, -1)));
          console.log("errs:", errs.slice(-1));
        });
    },
    getDeepSubforms(formInstance) {
      if (!formInstance.subForms) {
        return [];
      }
      return Object.values(formInstance.subForms).reduce((acc, item) => {
        return [...acc, item, ...this.getDeepSubforms(item)];
      }, []);
    },
    getForms() {
      return this.getDeepSubforms(this.form).concat(this.form);
    },
    getValidators() {
      const forms = this.getForms();
      return forms.map(
        (form) =>
          new Promise((resolve, reject) => {
            form.validateFields((err, values) => {
              if (err) {
                reject(err);
              } else {
                resolve(values);
              }
            });
          })
      );
    },
    getValueFromEvent: (props, values, allValues) => {
      return allValues;
    },
    subFormMounted: (field, subForm) => {
      console.log(`SubForm： ${field.name} mounted`);
      this.form.subForms = {
        ...(this.form.subForms || {}),
        [field.name]: subForm,
      };
    },
  },
  mounted() {
    // 子表单挂载时，通知父表单，派发子表单实例
    this.$emit("mounted", this.form);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
