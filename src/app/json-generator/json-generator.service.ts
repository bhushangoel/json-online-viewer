import {Injectable} from '@angular/core';
import RandExp from 'randexp';
import {ValidationTypes} from './json-generator.config';

@Injectable()
export class JsonGeneratorService {
  validationTypes;

  constructor() {
    this.validationTypes = ValidationTypes;
  }

  generateJson(option: any): any {
    if (option.structType === 'array') {
      return this.generateArray(option);
    } else if (option.structType === 'arrayOfObject' || option.structType === 'object') {
      return this.generateObject(option);
    } else if (option.structType === 'arrayOfObjectFixed') {
      return this.generateFixedObject(option);
    }
  }

  generateArray(option: any): any {
    const n = option.arrayLength;
    const jsonArr = [];
    for (let i = 0; i < n; i++) {
      option.structure.forEach(o => {
        jsonArr.push(this.getValue(o, i));
      });
    }
    return jsonArr;
  }

  generateObject(option: any): any {
    const n = option.numberOfRecords || 1;
    const jsonArr = [];
    let jsonObj = {};
    for (let i = 0; i < n; i++) {
      option.structure.forEach(o => {
        if (o.structure.length > 0) {
          const arr = this.generateJson(o);
          jsonObj[o.name] = arr[0];
        } else {
          jsonObj[o.name] = this.getValue(o, i);
        }
      });
      jsonArr.push(jsonObj);
      jsonObj = {};
    }
    return jsonArr;
  }

  generateFixedObject(option: any): any {
    const n = option.numberOfRecords || 1;
    const jsonArr = [];
    for (let i = 0; i < n; i++) {
      jsonArr.push({});
    }
    for (let i = 0; i < n; i++) {
      option.structure.forEach(o => {
        jsonArr[i][o.name] = this.getFixedValue(jsonArr, n, o, i);
      });
    }
    return jsonArr;
  }


  getFixedValue(jsonArr: any, n: number, data: any, idx?: number): any {
    if (data.structType.indexOf('fixed') > -1) {
      if (data.structType !== 'fixedObject') {
        const valueArr = data.validations.fixedValues.split(';');
        if (data.structType === 'fixedText') {
          return idx < valueArr.length ? valueArr[idx].trim() : valueArr[valueArr.length - 1].trim();
        } else if (data.structType === 'fixedInteger') {
          return idx < valueArr.length ? +valueArr[idx].trim() : +valueArr[valueArr.length - 1].trim();
        } else if (data.structType === 'fixedBoolean') {
          return idx < valueArr.length
            ? valueArr[idx].trim() === 'true' || valueArr[idx].trim().toLowerCase() === 't' || valueArr[idx].trim() === '1'
            : valueArr[valueArr.length - 1].trim() === 'true' || valueArr[valueArr.length - 1].trim().toLowerCase() === 't' || valueArr[valueArr.length - 1].trim() === '1';
        }
      } else if (data.structType === 'fixedObject') {
        data.structure.forEach((d, i) => {
          if (!jsonArr[idx][data.name]) {
            jsonArr[idx][data.name] = {};
          }
          jsonArr[idx][data.name][d.name] = this.getFixedValue(jsonArr, n, d, idx);
        });
        return jsonArr[idx][data.name];
      }
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
    if (validation.regex === 'custom' && validation.customRegex && validation.customRegex !== '') {
      const randexp = new RandExp(validation.customRegex);
      return randexp.gen();
    } else if (validation.regex === 'custom' && !validation.customRegex) {
      const randexp = new RandExp('');
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
