const PropertyTypes = {
  default: [
    {label: 'Choose type', value: ''},
    {label: 'Unique Id', value: 'id'},
    {label: 'Text', value: 'text'},
    {label: 'Integer', value: 'integer'},
    {label: 'Boolean', value: 'boolean'},
    {label: 'Object', value: 'object'}
  ],
  array:  [
    {label: 'Choose type', value: ''},
    {label: 'Unique Id', value: 'id'},
    {label: 'Text', value: 'text'},
    {label: 'Integer', value: 'integer'},
    {label: 'Boolean', value: 'boolean'}
  ]
};

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
      value: 'alphanumeric',
      regex: '[A-Za-z0-9]*'
    },
    {
      label: 'Alphabets',
      value: 'alpha',
      regex: '[A-Za-z]*'
    },
    {
      label: 'Natural numbers',
      value: 'natural',
      regex: '[1-9]*'
    },
    {
      label: 'Phone Number',
      value: 'phone',
      regex: '[7-9]{1}[0-9]{9}'
    },
    {
      label: 'Email ID',
      value: 'email',
      regex: '[a-z]{3,5}[0-9]{2,3}@[a-z]{4}[.]com'
    },
    {
      label: 'Custom Regex',
      value: 'custom'
    }
  ]
};

export {PropertyTypes, Validations, ValidationTypes};
