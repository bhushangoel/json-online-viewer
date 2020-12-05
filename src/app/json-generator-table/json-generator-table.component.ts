import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
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
  @Output() objUpdated = new EventEmitter<any>();
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
    if (changes.moreInfo && !changes.moreInfo.firstChange) {
      const currentValue = changes.moreInfo.currentValue;
      this.showArrayOfObjStruct = currentValue.structType !== 'array';
      this.propertyTypes = PropertyTypes[currentValue.structType] || PropertyTypes.default;
    } else if (changes.moreInfo && changes.moreInfo.currentValue) {
      const currentValue = changes.moreInfo.currentValue;
      this.propertyTypes = PropertyTypes[currentValue.structType] || PropertyTypes.default;
    } else {
      this.propertyTypes = PropertyTypes.default;
    }
  }

  ngOnInit(): void {
    this.mockJsonObj.forEach((o, i) => {
      this.propertyTypeSelected(i, 1);
    });
  }

  addNewRow(level: number): void {
    if (level > 2 && this.moreInfo.structType === 'arrayOfObjectFixed') {
      this.mcs.show({
        type: 'warning',
        content: 'Only 2 levels are allowed.'
      });
      return;
    } else if (level > 3) {
      this.mcs.show({
        type: 'warning',
        content: 'Only 3 levels are allowed.'
      });
      return;
    }
    this.objUpdated.emit();
    this.mockJsonObj.push({
      name: '',
      structType: '',
      showValidations: false,
      validations: {
        regex: '',
        minLength: '',
        maxLength: '',
        showCustomRegexField: false,
        showFixedInputField: false
      },
      structure: []
    });
  }

  deleteCurrentRow(idx: number): void {
    this.mockJsonObj.splice(idx, 1);
    this.objUpdated.emit();
  }

  propertyTypeSelected(idx: number, level: number): void {
    this.currentIndex = idx;
    const selectedProperty = this.mockJsonObj[idx].structType;
    this.currentSelectedProperty = this.mockJsonObj[idx].structType;
    if (level > 3 && selectedProperty === 'object') {
      this.mcs.show({
        type: 'warning',
        content: 'Only 3 levels are allowed.'
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
        return;
      }

      if (selectedProperty === 'text' || selectedProperty === 'textarea') {
        this.mockJsonObj[idx].validations = this.mockJsonObj[idx].validations || {
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
      if (selectedProperty.indexOf('fixed') > -1) {
        const i = this.validationOptionList[idx].findIndex(list => list.value === 'fixedValues');
        if (i === -1 && selectedProperty !== 'fixedObject') {
          this.validationOptionList[idx].forEach(list => list.hidden = true);
          this.validationOptionList[idx].unshift(
            {
              label: 'Values',
              value: 'fixedValues',
              inputType: {
                state: 'default',
                tag: 'input',
                type: 'text'
              },
              mutedText: 'Enter semi-colon(;) separated values',
              showWithCustomRegex: false,
            }
          );
        }
      } else {
        const i = this.validationOptionList[idx].findIndex(list => list.value === 'fixedValues');
        if (i > -1) {
          this.validationOptionList[idx].splice(i, 1);
        }
        this.validationOptionList[idx].forEach(list => list.hidden = false);
      }
    }

  }

  selectedValidationChanged(e: any, option: any, idx: number): void {
    const type = this.mockJsonObj[idx].validations[option.inputType.type];
    this.mockJsonObj[idx].validations.showCustomRegexField = option.value === 'regex' && type === 'custom';
  }

}
