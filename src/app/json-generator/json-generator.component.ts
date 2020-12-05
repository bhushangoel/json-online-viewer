import {Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import {PropertyTypes, Validations, ValidationTypes, StructType} from './json-generator.config';
import {JsonGeneratorService} from './json-generator.service';
import {MessageComponentService} from '../shared/message-component/message-component.service';
import {JsonGeneratorTableComponent} from '../json-generator-table/json-generator-table.component';
import {JsonEditorOptions} from 'ang-jsoneditor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-json-generator',
  templateUrl: './json-generator.component.html',
  styleUrls: ['./json-generator.component.scss']
})
export class JsonGeneratorComponent implements OnInit {
  @ViewChild('htmlPreElement') htmlPreElement: ElementRef | undefined;
  @ViewChild('myModal') modalElement: ElementRef | undefined;
  private storageKey = '_mockJsonObj';
  from = 'ui';
  propertyTypes;
  validations;
  validationTypes;
  selectedProperty = '';
  showValidations = false;
  showResetBtn;
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
  structTypeObj;


  constructor(private jsonGenerator: JsonGeneratorService,
              private mcs: MessageComponentService,
              private modalService: NgbModal,
              private localStorage: LocalStorageService) {
    this.propertyTypes = PropertyTypes;
    this.validations = Validations;
    this.validationTypes = ValidationTypes;
    this.structTypeObj = StructType;
    this.moreInfo = {
      numberOfRecords: this.mockJsonObj.numberOfRecords,
      structType: this.mockJsonObj.structType,
      arrayLength: this.mockJsonObj.arrayLength,
    };
  }

  ngOnInit(): void {
    this.localStorage.get(this.storageKey)
      .subscribe(resp => {
        if (resp.found) {
          this.mockJsonObj = resp.data;
          this.moreInfo = {
            numberOfRecords: this.mockJsonObj.numberOfRecords,
            structType: this.mockJsonObj.structType,
            arrayLength: this.mockJsonObj.arrayLength,
          };
          this.showResetBtn = true;
        } else {
          this.initMockJsonObjStructure();
        }
      }, err => {
        this.initMockJsonObjStructure();
      });
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

  onObjUpdate(e: any): void {
    this.addToLocalStorage(this.mockJsonObj);
  }

  addToLocalStorage(data: any): void {
    this.localStorage.set(this.storageKey, data)
      .subscribe(resp => {
        // saved to local storage
        this.showResetBtn = true;
      }, err => {

      });
  }

  onInfoChange(type: string): void {
    this.moreInfo = {
      numberOfRecords: this.mockJsonObj.numberOfRecords,
      structType: this.mockJsonObj.structType,
      arrayLength: this.mockJsonObj.arrayLength,
    };
    if (type === 'structType') {
      this.initMockJsonObjStructure();
    }
  }

  changeFrom(option: string): void {
    this.from = option;
  }

  generateJson(content: any): void {
    this.showGeneratedJson = false;

    if (!this.checkValidations()) {
      return;
    }

    this.addToLocalStorage(this.mockJsonObj);

    setTimeout(() => {
      this.generatedJson = this.jsonGenerator.generateJson(this.mockJsonObj);
      this.showGeneratedJson = true;
      this.modalService
        .open(content, {
          ariaLabelledBy: 'mock-json',
          size: 'xl'
        })
        .result.then((result) => {
      }, (reason) => {
      });
      this.highlightJson();
    });
  }

  checkValidations(): boolean {
    const size = this.mockJsonObj.structure.length;
    this.mockJsonObj.numberOfRecords = +this.mockJsonObj.numberOfRecords;
    const structTypeData = this.structTypeObj.filter(data => data.value === this.mockJsonObj.structType)[0];
    if (this.mockJsonObj.numberOfRecords < structTypeData.min) {
      this.mcs.show({type: 'danger', content: 'Minimum number of records should be 1'});
      return false;
    }
    if (this.mockJsonObj.numberOfRecords > structTypeData.max) {
      this.mcs.show({type: 'danger', content: `Currently we only support ${structTypeData.max} records`});
      return false;
    }
    if (structTypeData.structureSizeLimit && size > 20) {
      this.mcs.show({type: 'danger', content: 'Currently we only support 20 properties per object'});
      return false;
    }
    for (let i = 0; i < size; i++) {
      if (!this.mockJsonObj.structure[i].name && structTypeData.name) {
        this.mcs.show({type: 'danger', content: 'Name can not be empty'});
        return false;
      }
      if (!this.mockJsonObj.structure[i].structType && structTypeData.type) {
        this.mcs.show({type: 'danger', content: 'Please select type'});
        return false;
      }
    }
    return true;
  }

  resetStorage(): void {
    this.localStorage.remove(this.storageKey)
      .subscribe(resp => {
        if (resp) {
          this.showGeneratedJson = false;
          this.showResetBtn = false;
          this.mockJsonObj = {
            numberOfRecords: 1,
            structType: 'arrayOfObject',
            arrayLength: 1,
            structure: []
          };
          this.initMockJsonObjStructure();
        }
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
}


