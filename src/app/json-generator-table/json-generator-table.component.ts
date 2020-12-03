import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PropertyTypes, Validations, ValidationTypes} from '../json-generator/json-generator.config';
import {MessageComponentService} from '../shared/message-component/message-component.service';

@Component({
  selector: 'app-json-generator-table',
  templateUrl: './json-generator-table.component.html',
  styleUrls: ['./json-generator-table.component.scss']
})
export class JsonGeneratorTableComponent implements OnInit, OnChanges {
  @Input() mockJsonObj: any;
  @Input() moreInfo: any;
  @Input() level: number;
  propertyTypes;
  validations;
  validationTypes;
  validationOptionList = {};
  customRegexMuted = {
    text: 'Common Expressions',
    link: '/regex-help',
    isActiveLink: 'active'
  };
  showArrayOfObjStruct = true;
  currentSelectedProperty;
  currentIndex: number;

  constructor(private mcs: MessageComponentService) {
    this.propertyTypes = PropertyTypes;
    this.validations = Validations;
    this.validationTypes = ValidationTypes;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.moreInfo) {
      const currentValue = changes.moreInfo.currentValue;
      this.showArrayOfObjStruct = currentValue.structType !== 'array';
      this.propertyTypes = PropertyTypes[currentValue.structType] || PropertyTypes.default;
    } else {
      this.propertyTypes = PropertyTypes.default;
    }
  }

  ngOnInit(): void {

  }

  addNewRow(level: number): void {
    if (level > 3) {
      this.mcs.show({
        type: 'warning',
        content: 'Only 3 levels are allowed. If you want to create more complex structure than please use Schema method.'
      });
      return;
    }
    console.log('level : ', level);
    this.mockJsonObj.push({
      name: '',
      structType: '',
      showValidations: false,
      validations: {
        regex: '',
        minLength: '',
        maxLength: '',
        showCustomRegexField: false
      },
      structure: []
    });
  }

  deleteCurrentRow(idx: number): void {
    this.mockJsonObj.splice(idx, 1);
  }

  propertyTypeSelected(idx: number, level: number): void {
    this.currentIndex = idx;
    const selectedProperty = this.mockJsonObj[idx].structType;
    this.currentSelectedProperty = this.mockJsonObj[idx].structType;
    if (level > 3 && selectedProperty === 'object') {
      this.mcs.show({
        type: 'warning',
        content: 'Only 3 levels are allowed. If you want to create more complex structure than please use Schema method.'
      });
      return;
    } else {

      this.mockJsonObj[idx].showValidations = false;
      const ignoreValidationsFor = ['id', 'boolean'];
      if (!selectedProperty || ignoreValidationsFor.indexOf(selectedProperty) > -1) {
        return;
      }

      if (selectedProperty === 'object') {
        this.mockJsonObj[idx].structure.push({
          name: '',
          structType: '',
          showValidations: false,
          validations: {
            regex: '',
            minLength: '',
            maxLength: '',
            showCustomRegexField: false
          },
          structure: []
        });
        console.log('this.mockJsonObj : ', this.mockJsonObj);
        return;
      }

      if (selectedProperty === 'text' || selectedProperty === 'textarea') {
        this.mockJsonObj[idx].validations = {
          regex: '',
          minLength: '',
          maxLength: '',
          showCustomRegexField: false
        };
      }

      // @ts-ignore
      if (this.validations[selectedProperty]) {
        this.mockJsonObj[idx].showValidations = true;
        // @ts-ignore
        const list = this.validations.default;
        this.validationOptionList[idx] = this.validations[selectedProperty];
        this.validationOptionList[idx] = this.validationOptionList[idx].concat(list);
      } else {
        this.mockJsonObj[idx].showValidations = true;
        this.validationOptionList[idx] = this.validations.default;
      }
    }

  }

  selectedValidationChanged(e: any, option: any, idx: number): void {
    const type = this.mockJsonObj[idx].validations[option.inputType.type];
    this.mockJsonObj[idx].validations.showCustomRegexField = option.value === 'regex' && type === 'custom';
  }

}
