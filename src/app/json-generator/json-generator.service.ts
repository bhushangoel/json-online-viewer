import {Injectable} from '@angular/core';
import RandExp from 'randexp';

@Injectable()
export class JsonGeneratorService {
  charactersMap = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    mixed: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  };

  constructor() {

  }

  generateJson(option: any): any {
    const n = option.numberOfRecords;
    const jsonArr = [];
    let jsonObj = {};
    for (let i = 0; i < n; i++) {
      option.structure.forEach(o => {
        jsonObj[o.name] = this.getValue(o, jsonObj, i);
      });
      jsonArr.push(jsonObj);
      jsonObj = {};
    }
    return jsonArr;
  }

  getValue(data: any, obj: any, idx: number): any {
    // console.log('get value data : ');
    if (data.type === 'text' || data.type === 'textarea') {
      const val = `${data.validations.prefix ? data.validations.prefix : ''} ${this.getRandomData(data.validations, data.type)} ${data.validations.postfix ? data.validations.postfix : ''}`;
      return val.trim();
    } else if (data.type === 'id') {
      return idx += 1;
    } else {
      return this.getRandomData(data.validations, data.type);
    }
  }

  getRandomData(validation: any, type: string): any {
    /*
    * case: ""
customRegex: "/[a-z]{6}/"
maxLength: ""
minLength: ""
regex: "custom"
    * */
    if (validation.regex === 'custom' && validation.customRegex !== '') {
      const randexp = new RandExp(validation.customRegex);
      return randexp.gen();
    } else {
      const minLength = validation.minLength ? parseInt(validation.minLength) : 1;
      const maxLength = validation.maxLength ? parseInt(validation.maxLength) : 10;
      // console.log('get random data called...')
      let dataLength = 1;
      if (minLength === maxLength) {
        dataLength = minLength;
      } else {
        dataLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
      }

      if (type === 'integer') {
        const result = Math.floor(Math.random() * 10) + 1;
        // console.log('result integer : ', result);
        return result * Math.pow(10, dataLength - 1);
      } else {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        if (validation.regex === 'alphanumeric') {
          characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        } else if (validation.regex === 'alpha') {
          characters = validation.case && this.charactersMap[validation.case] ? this.charactersMap[validation.case] : this.charactersMap.mixed;
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
  }

}
