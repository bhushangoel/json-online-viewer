import {Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import {PropertyTypes, Validations, ValidationTypes} from './json-generator.config';
import {JsonGeneratorService} from './json-generator.service';
import {MessageComponentService} from '../shared/message-component/message-component.service';
import {JsonGeneratorTableComponent} from '../json-generator-table/json-generator-table.component';
import {JsonEditorOptions} from 'ang-jsoneditor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-json-generator',
  templateUrl: './json-generator.component.html',
  styleUrls: ['./json-generator.component.scss']
})
export class JsonGeneratorComponent implements OnInit {
  @ViewChild('htmlPreElement') htmlPreElement: ElementRef | undefined;
  @ViewChild('myModal') modalElement: ElementRef | undefined;
  from = 'ui';
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
  moreInfo: Object;
  editorOptions: any;
  mockJsonObj = {
    numberOfRecords: 1,
    structType: 'arrayOfObject',
    arrayLength: 1,
    structure: []
  };
  structTypeObj = [
    {
      label: 'Array of objects',
      value: 'arrayOfObject',
      min: 1,
      max: 20,
      name: true,
      type: true,
      structureSizeLimit: true
    },
    {
      label: 'Array',
      value: 'array',
      min: 1,
      max: 100,
      name: false,
      type: true,
      structureSizeLimit: false
    }
  ];


  constructor(private jsonGenerator: JsonGeneratorService,
              private mcs: MessageComponentService,
              private modalService: NgbModal) {
    this.propertyTypes = PropertyTypes;
    this.validations = Validations;
    this.validationTypes = ValidationTypes;
    this.moreInfo = {
      numberOfRecords: this.mockJsonObj.numberOfRecords,
      structType: this.mockJsonObj.structType,
      arrayLength: this.mockJsonObj.arrayLength,
    };
  }

  ngOnInit(): void {
    this.initMockJsonObjStructure();
  }

  initMockJsonObjStructure(): void {
    this.mockJsonObj.structure = [
      {
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
      }
    ];
  }

  onInfoChange(): void {
    this.moreInfo = {
      numberOfRecords: this.mockJsonObj.numberOfRecords,
      structType: this.mockJsonObj.structType,
      arrayLength: this.mockJsonObj.arrayLength,
    };
    this.initMockJsonObjStructure();
  }

  changeFrom(option: string): void {
    this.from = option;
  }

  saveObjectArrayData(): void {

  }

  generateJson(content: any): void {
    console.log('generate json called...');
    console.log(this.mockJsonObj);
    this.showGeneratedJson = false;

    const size = this.mockJsonObj.structure.length;
    this.mockJsonObj.numberOfRecords = +this.mockJsonObj.numberOfRecords;
    const structTypeData = this.structTypeObj.filter(data => data.value === this.mockJsonObj.structType)[0];

    /*if (this.mockJsonObj.numberOfRecords < structTypeData.min) {
      this.mcs.show({type: 'danger', content: 'Minimum number of records should be 1'});
      return;
    }
    if (this.mockJsonObj.numberOfRecords > structTypeData.max) {
      this.mcs.show({type: 'danger', content: `Currently we only support ${structTypeData.max} records`});
      return;
    }
    if (structTypeData.structureSizeLimit && size > 20) {
      this.mcs.show({type: 'danger', content: 'Currently we only support 20 properties per object'});
      return;
    }
    for (let i = 0; i < size; i++) {
      if (!this.mockJsonObj.structure[i].name && structTypeData.name) {
        this.mcs.show({type: 'danger', content: 'Name can not be empty'});
        return;
      }
      if (!this.mockJsonObj.structure[i].type && structTypeData.type) {
        this.mcs.show({type: 'danger', content: 'Please select type'});
        return;
      }
    }*/

    setTimeout(() => {
      // this.mockJsonObj = {"numberOfRecords":1,"structType":"arrayOfObject","arrayLength":1,"structure":[{"name":"_id","structType":"id","showValidations":false,"validations":{"regex":"","minLength":"","maxLength":"","showCustomRegexField":false},"structure":[]},{"name":"propertyName","structType":"object","showValidations":false,"validations":{"regex":"","minLength":"","maxLength":"","showCustomRegexField":false},"structure":[{"name":"_id","structType":"id","showValidations":false,"validations":{"regex":"","minLength":"","maxLength":"","showCustomRegexField":false},"structure":[]},{"name":"e","structType":"text","showValidations":true,"validations":{"regex":"email","minLength":"","maxLength":"","showCustomRegexField":false},"structure":[]},{"name":"phone","structType":"text","showValidations":true,"validations":{"regex":"phone","minLength":"","maxLength":"","showCustomRegexField":false},"structure":[]}]},{"name":"size","structType":"text","showValidations":true,"validations":{"regex":"custom","minLength":"","maxLength":"","showCustomRegexField":true,"customRegex":"[1-9]{4}","postfix":" sqft"},"structure":[]}]}
      this.generatedJson = this.jsonGenerator.generateJson(this.mockJsonObj);
      this.showGeneratedJson = true;
      this.modalService
        .open(content, {
          ariaLabelledBy: 'mock-json',
          size: 'xl'
        })
        .result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      this.highlightJson();
    });
  }

  highlightJson(): void {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
    this.editorOptions.modes = ['code', 'tree'];
    // this.editorOptions.expandAll = true;
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
          this.mcs.show({type: 'danger', content: 'Error in copying the content'});
        });
    }
  }

  // moved : unused here
  /*addNewRow(): void {
    this.mockJsonObj.structure.push({
      name: '',
      type: '',
      showValidations: false,
      validations: {
        regex: '',
        minLength: '',
        maxLength: '',
        showCustomRegexField: false
      },
      childStructure: []
    });
  }
  deleteCurrentRow(idx: number): void {
    this.mockJsonObj.structure.splice(idx, 1);
  }
  propertyTypeSelected(idx: number): void {
    const selectedProperty = this.mockJsonObj.structure[idx].type;
    this.mockJsonObj.structure[idx].showValidations = false;
    const ignoreValidationsFor = ['id', 'boolean'];
    if (!selectedProperty || ignoreValidationsFor.indexOf(selectedProperty) > -1) {
      return;
    }

    if (selectedProperty === 'object' || selectedProperty === 'array') {
      this.mockJsonObj.structure[idx].childStructure.push({
        name: '',
        type: '',
        showValidations: false,
        validations: {
          regex: '',
          minLength: '',
          maxLength: '',
          showCustomRegexField: false
        },
        childStructure: []
      });
      return;
    }

    if (selectedProperty === 'text' || selectedProperty === 'textarea') {
      this.mockJsonObj.structure[idx].validations = {
        regex: '',
        minLength: '',
        maxLength: '',
        showCustomRegexField: false
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
  selectedValidationChanged(e: any, option: any, idx: number): void {
    const type = this.mockJsonObj.structure[idx].validations[option.inputType.type];
    this.mockJsonObj.structure[idx].validations.showCustomRegexField = option.value === 'regex' && type === 'custom';
  }*/
}


