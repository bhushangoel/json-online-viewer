const PropertyTypes = [
  {label: 'Choose type', value: ''},
  {label: 'Unique Id', value: 'id'},
  {label: 'Text', value: 'text'},
  {label: 'Text Area', value: 'textarea'},
  {label: 'Integer', value: 'integer'}
];

const Validations = {
  default: [
    {
      label: 'Max Length',
      value: 'maxLength',
      inputType: {
        state: 'default',
        tag: 'input',
        type: 'number'
      },
      showWithCustomRegex: false,
      mutedText: 'Default value is 10'
    },
    {
      label: 'Min Length',
      value: 'minLength',
      inputType: {
        state: 'default',
        tag: 'input',
        type: 'number'
      },
      showWithCustomRegex: false,
      mutedText: 'Default value is 1'
    }
  ],
  text: [
    {
      label: 'Regex',
      value: 'regex',
      inputType: {
        state: 'validationType',
        tag: 'select',
        type: 'regex'
      },
      mutedText: 'Default value is Alphanumeric',
      showWithCustomRegex: true,
    },
    {
      label: 'Case',
      value: 'case',
      inputType: {
        state: 'validationType',
        tag: 'select',
        type: 'case'
      },
      showWithCustomRegex: false,
    },
    {
      label: 'Prefix',
      value: 'prefix',
      inputType: {
        state: 'default',
        tag: 'input',
        type: 'text'
      },
      showWithCustomRegex: true,
    },
    {
      label: 'Postfix',
      value: 'postfix',
      inputType: {
        state: 'default',
        tag: 'input',
        type: 'text'
      },
      showWithCustomRegex: true,
    }
  ],
  textarea: [
    {
      label: 'Regex',
      value: 'regex',
      inputType: {
        state: 'validationType',
        tag: 'select',
        type: 'regex'
      },
      mutedText: 'Default value is Alphanumeric',
      showWithCustomRegex: true,
    },
    {
      label: 'Case',
      value: 'case',
      inputType: {
        state: 'validationType',
        tag: 'select',
        type: 'case'
      },
      showWithCustomRegex: false,
    },
    {
      label: 'Prefix',
      value: 'prefix',
      inputType: {
        state: 'default',
        tag: 'input',
        type: 'text'
      },
      showWithCustomRegex: true,
    },
    {
      label: 'Postfix',
      value: 'postfix',
      inputType: {
        state: 'default',
        tag: 'input',
        type: 'text'
      },
      showWithCustomRegex: true,
    }
  ]
};

const ValidationTypes = {
  case: [
    {
      label: 'Select Case',
      value: ''
    },
    {
      label: 'Upper',
      value: 'upper'
    },
    {
      label: 'Lower',
      value: 'lower'
    },
    {
      label: 'Mixed',
      value: 'mixed'
    }
  ],
  regex: [
    {
      label: 'Select Regex',
      value: ''
    },
    {
      label: 'Alpha numeric',
      value: 'alphanumeric'
    },
    {
      label: 'Alphabets',
      value: 'alpha'
    },
    {
      label: 'Natural numbers',
      value: 'natural'
    },
    {
      label: 'Custom Regex',
      value: 'custom'
    }
  ]
};

export {PropertyTypes, Validations, ValidationTypes};
