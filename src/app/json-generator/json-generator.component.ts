import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {PropertyTypes, Validations, ValidationTypes} from './json-generator.config';
import {JsonGeneratorService} from './json-generator.service';
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
  customRegexMutedText = 'example : [A-Z]{4} | [0-9]{3}[a-z]{4} [A-Z]{2}';
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

  constructor(private jsonGenerator: JsonGeneratorService) {
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
    if (!selectedProperty || selectedProperty === 'id') {
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
    // console.log('final data : ', this.mockJsonObj);

    const size = this.mockJsonObj.structure.length;
    if (this.mockJsonObj.numberOfRecords < 1) {
      alert('Minimum number of records should be 1');
      return;
    }
    if (this.mockJsonObj.numberOfRecords > 20) {
      alert('Currently we only support 20 records');
      return;
    }
    for (let i = 0; i < size; i++) {
      if (!this.mockJsonObj.structure[i].name) {
        alert('Please enter name');
        return;
      }
      if (!this.mockJsonObj.structure[i].type) {
        alert('Please select type');
        return;
      }
    }

    setTimeout(() => {
      this.generatedJson = this.jsonGenerator.generateJson(this.mockJsonObj);
      this.showGeneratedJson = true;
      console.log('generatedJson : ', this.generatedJson);
      this.highlightJson();
    });
  }

  highlightJson(): void {
    console.log('highlight json called : ');

    setTimeout(() => {
      document.querySelectorAll('pre code').forEach((block) => {
        console.log('block called...', block);
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
          console.log('Content copied successfully...');
        }, () => {
          /* clipboard write failed */
          console.log('Error in copying the content...');
        });
    }
  }

  selectedValidationChanged(e: any, option: any, idx: number): void {
    console.log('option : ', option);
    const type = this.mockJsonObj.structure[idx]['validations'][option['inputType']['type']];
    console.log('type : ', type);
    this.showCustomRegexField = option.value === 'regex' && type === 'custom';
  }
}


