let predefinedRegex = [
  {
    key: 'alphanumeric',
    value: 'Alpha Numeric',
    for: ['text', 'textarea'],
    expression: '^[a-zA-Z0-9]+$'
  }, {
    key: 'amount',
    value: 'Amount',
    for: ['integer', 'text'],
    expression: ''
  }, {
    key: 'natural',
    value: 'Natural Numbers',
    for: ['integer', 'text'],
    expression: ''
  }, {
    key: 'alphabets',
    value: 'Alphabets',
    for: ['text', 'textarea'],
    expression: ''
  }
]

let mockJsonObj = {
  numberOfRecords: 3,
  structure: [
    {
      name: '_id',
      type: 'id'
    },
    {
      name: 'propertyName',
      type: 'text',
      validations: {
        maxLength: 20,
        minLength: 3,
        case: 'upper',  // lower, upper, mixed, first
        regex: 'alpha',
        prefix: ''
      }
    },
    {
      name: 'price',
      type: 'integer',
      validations: {
        maxLength: 8,
        minLength: 8,
        regex: 'amount'
      }
    },
    {
      name: 'description',
      type: 'textarea',
      validations: {
        minLength: 30,
        maxLength: 100,
        regex: 'alpha',
        case: 'mixed'
      }
    },
    {
      name: 'size',
      type: 'text',
      validations: {
        maxLength: 4,
        minLength: 4,
        case: 'normal',  // lower, upper, mixed
        regex: 'natural',
        postfix: 'sqft'
      }
    }
  ]
}

let charactersMap = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  mixed: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
}

let getRandomData = (validation, type) => {
  // console.log('get random data called...')
  let dataLength = 1;
  if (validation.minLength === validation.maxLength) {
    dataLength = validation.minLength;
  } else {
    dataLength = Math.floor(Math.random() * (validation.maxLength - validation.minLength)) + validation.minLength;
  }

  if (type === 'integer') {
    const result = Math.floor(Math.random() * 10) + 1;
    // console.log('result integer : ', result);
    return result * Math.pow(10, dataLength - 1);
  } else {
    let result = '';
    let characters = '';
    if (validation.regex === 'alphanumeric') {
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    } else if (validation.regex === 'alpha') {
      characters = validation.case && charactersMap[validation.case] ? charactersMap[validation.case] : charactersMap[mixed];
    } else if (validation.regex === 'natural') {
      characters = '123456789';
    }

    const charactersLength = characters.length;
    for (let i = 0; i < dataLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

let getValue = (data, obj, idx) => {
  // console.log('get value data : ');
  if (data.type === 'text' || data.type === 'textarea') {
    const val = `${data.validations.prefix ? data.validations.prefix : ''} ${getRandomData(data.validations, data.type)} ${data.validations.postfix ? data.validations.postfix : ''}`;
    return val.trim();
  } else if (data.type === 'id') {
    return idx += 1;
  } else {
    return getRandomData(data.validations, data.type);
  }
}

let generateJson = (option) => {
  const n = option.numberOfRecords;
  let jsonArr = [];
  let jsonObj = {};
  loop1(n, option);
  for (let i = 0; i < n; i++) {
    option.structure.forEach(o => {
      jsonObj[o.name] = getValue(o, jsonObj, i);
      // console.log('json obj : ', jsonObj)
    });
    jsonArr.push(jsonObj);
  }

  console.log(jsonArr);
}

let loop1 = (i, option) => {
  if (i < 0) {
    return;
  }
  objLoop(option, i, cb = () => {

  });
}

let objLoop = (option, i, cb) => {
  const o = option.structure[i];
  jsonObj[o.name] = getValue(o, jsonObj, i);
  // console.log('json obj : ', jsonObj)
}

generateJson(mockJsonObj)
