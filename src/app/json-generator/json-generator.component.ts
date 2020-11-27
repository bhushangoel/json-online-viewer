import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {PropertyTypes, Validations, ValidationTypes} from './json-generator.config';
import {JsonGeneratorService} from './json-generator.service';
import {MessageComponentService} from '../shared/message-component/message-component.service';
// @ts-ignore
import hljs from 'node_modules/highlight.js/lib/core';
// @ts-ignore
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', json);

@Component({
  selector: 'app-json-generator',
  templateUrl: './json-generator.component.html',
  styleUrls: ['./json-generator.component.scss']
})
export class JsonGeneratorComponent implements OnInit {
  @ViewChild('htmlPreElement') htmlPreElement: ElementRef | undefined;
  from = 'scratch';
  propertyTypes;
  validations;
  validationTypes;
  selectedProperty = '';
  showValidations = false;
  customRegexMuted = {
    text: 'Common Expressions',
    link: '/regex-help',
    isActiveLink: 'active'
  };
  validationOptionList = {};
  generatedJson = [];
  showGeneratedJson = false;
  showCustomRegexField = false;
  mockJsonObj = {
    numberOfRecords: 1,
    structure: [
      {
        name: '',
        type: '',
        showValidations: false,
        validations: {}
      }
    ]
  };

  constructor(private jsonGenerator: JsonGeneratorService, private mcs: MessageComponentService) {
    this.propertyTypes = PropertyTypes;
    this.validations = Validations;
    this.validationTypes = ValidationTypes;
  }

  ngOnInit(): void {
  }

  addNewRow(): void {
    this.mockJsonObj.structure.push({name: '', type: '', showValidations: false, validations: {}});
  }

  deleteCurrentRow(idx: number): void {
    this.mockJsonObj.structure.splice(idx, 1);
  }

  changeFrom(option: string): void {
    this.from = option;
  }

  propertyTypeSelected(idx: number): void {
    const selectedProperty = this.mockJsonObj.structure[idx].type;
    console.log('selectedProperty : ', selectedProperty);
    this.mockJsonObj.structure[idx].showValidations = false;
    const ignoreValidationsFor = ['id', 'boolean'];
    if (!selectedProperty || ignoreValidationsFor.indexOf(selectedProperty) > -1) {
      return;
    }

    this.mockJsonObj.structure[idx].validations = {
      'minLength': '',
      'maxLength': ''
    };

    if (selectedProperty === 'text' || selectedProperty === 'textarea') {
      this.mockJsonObj.structure[idx].validations = {
        case: '',
        regex: '',
        'minLength': '',
        'maxLength': ''
      };
    }

    // @ts-ignore
    if (this.validations[selectedProperty]) {
      this.mockJsonObj.structure[idx].showValidations = true;
      // @ts-ignore
      const list = this.validations.default;
      this.validationOptionList[idx] = this.validations[selectedProperty];
      this.validationOptionList[idx] = this.validationOptionList[idx].concat(list);
    } else {
      this.mockJsonObj.structure[idx].showValidations = true;
      this.validationOptionList[idx] = this.validations.default;
    }
  }

  generateJson(): void {
    this.showGeneratedJson = false;

    const size = this.mockJsonObj.structure.length;
    this.mockJsonObj.numberOfRecords = +this.mockJsonObj.numberOfRecords;
    if (this.mockJsonObj.numberOfRecords < 1) {
      this.mcs.show({type: 'danger', content: 'Minimum number of records should be 1'});
      return;
    }
    if (this.mockJsonObj.numberOfRecords > 20) {
      this.mcs.show({type: 'danger', content: 'Currently we only support 20 records'});
      return;
    }
    if (size > 20) {
      this.mcs.show({type: 'danger', content: 'Currently we only support 20 properties per object'});
      return;
    }
    for (let i = 0; i < size; i++) {
      if (!this.mockJsonObj.structure[i].name) {
        this.mcs.show({type: 'danger', content: 'Name can not be empty'});
        return;
      }
      if (!this.mockJsonObj.structure[i].type) {
        this.mcs.show({type: 'danger', content: 'Please select type'});
        return;
      }
    }

    setTimeout(() => {
      this.generatedJson = this.jsonGenerator.generateJson(this.mockJsonObj);
      this.showGeneratedJson = true;
      this.highlightJson();
    });
  }

  highlightJson(): void {
    console.log('highlight json called : ');

    setTimeout(() => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    });
  }

  copyToClipboard(containerid: string): void {
    if (navigator.clipboard) {
      const content = JSON.stringify(this.generatedJson);
      navigator.clipboard.writeText(content)
        .then((resp) => {
          /* clipboard successfully set */
          this.mcs.show({type: 'success', content: 'Content copied successfully'});
        }, () => {
          /* clipboard write failed */
          console.log('Error in copying the content...');
        });
    }
  }

  selectedValidationChanged(e: any, option: any, idx: number): void {
    const type = this.mockJsonObj.structure[idx]['validations'][option['inputType']['type']];
    this.showCustomRegexField = option.value === 'regex' && type === 'custom';
  }
}


