import {Injectable} from '@angular/core';
import RandExp from 'randexp';
import {ValidationTypes} from './json-generator.config';

@Injectable()
export class JsonGeneratorService {
  validationTypes;
  charactersMap = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    mixed: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  };

  constructor() {
    this.validationTypes = ValidationTypes;
  }

  generateJson(option: any): any {
    console.log('option : ', option);
    if (option.structType === 'array') {
      const n = option.arrayLength;
      const jsonArr = [];
      for (let i = 0; i < n; i++) {
        option.structure.forEach(o => {
          jsonArr.push(this.getValue(o, i));
        });
      }
      return jsonArr;
    } else if (option.structType === 'arrayOfObject' || option.structType === 'object') {
      const n = option.numberOfRecords || 1;
      const jsonArr = [];
      let jsonObj = {};
      for (let i = 0; i < n; i++) {
        option.structure.forEach(o => {
          console.log('o : ', o);
          if (o.structure.length > 0) {
            const arr = this.generateJson(o);
            console.log('arr : ', arr);
            console.log('jsonArr : ', jsonArr);
            jsonObj[o.name] = arr[0];
          } else {
            jsonObj[o.name] = this.getValue(o, i);
          }
        });
        console.log('jsonObj : ', jsonObj);
        jsonArr.push(jsonObj);
        jsonObj = {};
      }
      console.log('jsonArr : ', jsonArr);
      return jsonArr;
    }
  }

  getValue(data: any, idx?: number): any {
    if (data.structType === 'text' || data.structType === 'textarea') {
      const val = `${data.validations.prefix ? data.validations.prefix : ''}${this.getRandomData(data.validations, data.structType)}${data.validations.postfix ? data.validations.postfix : ''}`;
      return val.trim();
    } else if (data.structType === 'id') {
      return idx += 1;
    } else {
      return this.getRandomData(data.validations, data.structType);
    }
  }

  getRandomData(validation: any, structType: string): any {
    if (validation.regex === 'custom' && validation.customRegex !== '') {
      const randexp = new RandExp(validation.customRegex);
      return randexp.gen();
    } else {
      const minLength = validation.minLength ? parseInt(validation.minLength) : 1;
      const maxLength = validation.maxLength ? parseInt(validation.maxLength) : 10;
      let dataLength = 1;
      if (minLength === maxLength) {
        dataLength = minLength;
      } else {
        dataLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
      }
      if (structType === 'integer') {
        const result = Math.floor(Math.random() * 10) + 1;
        return result * Math.pow(10, dataLength - 1);
      } else if (structType === 'boolean') {
        const result = Math.floor(Math.random() * 10) + 1;
        return result % 2 === 0;
      } else {
        // @ts-ignore
        const regexp = this.validationTypes.regex.filter(v => v.value === validation.regex)[0];
        // @ts-ignore
        const exp = regexp.regex ? regexp.regex.replace('*', `{${minLength},${maxLength}}`) : '[a-zA-Z0-9]*';
        const randexp = new RandExp(exp);
        return randexp.gen();
      }
    }
  }

}
