export default [
  {
    type: "AInput",
    label: "input1",
    name: "input1",
    rules: [
      {
        required: true
      }
    ]
  },
  {
    type: "DcForm",
    label: "SubForm",
    name: "subForm",
    fields: [
      {
        type: "AInput",
        label: "subformFields1",
        name: "subform_fields1",
        rules: [
          {
            required: true
          }
        ]
      },
      {
        type: "DcForm",
        label: "GrandsonForm",
        name: "GrandsonForm",
        fields: [
          {
            type: "AInput",
            label: "grandsonFields1",
            name: "grandson_fileds_1",
            rules: [
              {
                required: true
              }
            ]
          }
        ],
        listeners: {
          submit: (values) => console.log("GrandsonForm submit:", values)
        }
      },

      {
        type: "AInput",
        label: "subformFields2",
        name: "subform_fields2",
        rules: [
          {
            required: true
          }
        ]
      }
    ],
    listeners: {
      submit: (values) => console.log("Subform submit:", values)
    }
  },
  {
    type: "AInput",
    label: "input2",
    name: "input2",
    rules: [
      {
        required: true
      }
    ]
  }
];
