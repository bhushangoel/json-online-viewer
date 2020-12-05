import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {
  sectionList = [
    {
      label: 'How to',
      value: 'how'
    },
    {
      label: 'Structure Types',
      value: 'structureTypes'
    },
    {
      label: 'Property Types',
      value: 'propertyType'
    },
    {
      label: 'Validations',
      value: 'validations'
    }
  ];
  currentSelectedProperty = 'how';
  currentImage = '';
  showSection = {};

  constructor(private modalService: NgbModal) {
    this.showSection = {
      structureTypes: {
        display: false,
        type: 'table',
        data: [
          {
            value: 'Array of Objects',
            descType: 'gallery',
            description: [
              {
                text: 'Defining structure - ',
                img: '../../assets/images/docs/arrOfObj.png',
                alt: 'Array of Object Structure'
              },
              {
                text: 'Result JSON - ',
                img: '../../assets/images/docs/arrOfObj-json.png',
                alt: 'Array of Object Result'
              }
            ]
          },
          {
            value: 'Array of Objects : Fixed value',
            descType: 'gallery',
            description: [
              {
                text: 'Defining structure: Useful in generating fixed config related to any plugin. \n In this, we have generated the colDef config for ag-grid plugin- ',
                img: '../../assets/images/docs/arrOfObj-fixed.png',
                alt: 'Array of Object : Fixed Structure'
              },
              {
                text: 'Result JSON - ',
                img: '../../assets/images/docs/arrOfObj-fixed-json.png',
                alt: 'Array of Object : Fixed value Result'
              }
            ]
          },
          {
            value: 'Array',
            descType: 'gallery',
            description: [
              {
                text: 'Defining structure: Useful in generating array of text, integers, boolean or unique id ',
                img: '../../assets/images/docs/arr.png',
                alt: 'Array Structure'
              },
              {
                text: 'Result JSON - ',
                img: '../../assets/images/docs/arr-json.png',
                alt: 'Array Result'
              }
            ]
          }
        ]
      },
      propertyType: {
        display: false,
        type: 'table',
        data: [
          {
            value: 'Unique ID',
            description: 'Sequential unique numbers'
          },
          {
            value: 'Text',
            description: 'Generate string value'
          },
          {
            value: 'Integer',
            description: 'Generate integer values'
          },
          {
            value: 'Boolean',
            description: 'Generate boolean values'
          },
          {
            value: 'Object',
            description: 'Generate nested object'
          }
        ]
      },
      validations: {
        display: false,
        type: 'table',
        data: [
          {
            value: 'Regex',
            description: `Dropdown consists of commonly used regex and custom regex option. You can select <a target="_blank" [routerLink]="/regex-help">custom regex</a> and write your own regex.`
          },
          {
            value: 'Prefix',
            description: 'Add a constant value in front.'
          },
          {
            value: 'Postfix',
            description: 'Add a constant value at the end.'
          },
          {
            value: 'Max length',
            description: 'Maxlength of string or integer.'
          },
          {
            value: 'Min length',
            description: 'Minlength of string or integer.'
          }
        ]
      },
      how: {
        display: true,
        type: 'table',
        data: [
          {
            value: `How to generate mock JSON?`,
            description: `1. Click on the <b>Generate mock JSON</b> link on the navigation bar.<br><br>
            2. Select the type of structure you want to create (<i>currently we support : Array of object, Array of object: fixed values and Simple array</i>).<br><br>
            3. Enter the number of records or length of an array.<br><br>
            4. Enter name of the first property (<i>Not applicable for Simple array</i>) and select its data type (<i>unique id, text, integer, boolean or object</i>).<br><br>
            5. Select any validations (<i>optional</i>).<br><br>
            6. Click on Add more properties, if you want to add more. (<i>Not applicable for Simple array</i>)<br><br>
            7. After finalising the structure, click on <b>Generate JSON button</b>.<br><br>
            8. You will the generated data in a popup.<br><br>
            9. Click on <b>Copy JSON</b> to copy the data.`
          },
          {
            value: `What the are supported strucutres?`,
            description: `Currently, we support array of objects with 3 level nesting, Array of object: fixed values and a simple array.`
          },
          {
            value: `I want to generate a single object. How to do it?`,
            description: `You can select Array of objects with length 1 and start defining properties. Once the JSON generates, you can copy the first object from that array.`
          },
          {
            value: `I want to create an array inside an object. How to do it?`,
            description: `Currently we don't support that. But we will soon add that feature.`
          }
        ]
      }
    };
  }

  ngOnInit(): void {
  }

  showSectionHandler(name: string): void {
    this.currentSelectedProperty = name;
    this.sectionList.forEach((s => {
      this.showSection[s.value].display = false;
    }));
    this.showSection[name].display = true;
  }

  openInModal(content: any, url: string): void {
    this.currentImage = url;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'mock-json',
        size: 'xl'
      })
      .result.then((result) => {
    }, (reason) => {
    });
  }

}
