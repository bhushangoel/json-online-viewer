import {Component, OnInit} from '@angular/core';

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
      label: 'Property Type',
      value: 'propertyType'
    },
    {
      label: 'Validations',
      value: 'validations'
    }
  ];
  currentSelectedProperty = 'how';
  showSection = {};

  constructor() {
    this.showSection = {
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
            2. Select the type of structure you want to create (<i>currently we only support : Array of object or Simple Array</i>).<br><br>
            3. Enter the number of records.<br><br>
            4. Enter name of the first property and select its data type (<i>unique id, text, integer, boolean or object</i>).<br><br>
            5. Select any validations (<i>optional</i>).<br><br>
            6. Click on Add more properties, if you want to add more.<br><br>
            7. After finalising the structure, click on <b>Generate JSON button</b>.<br><br>
            8. You will the generated data in a popup.<br><br>
            9. Click on <b>Copy JSON</b> to copy the data. Currently, we do not save any data, so remember to copy the data.`
          },
          {
            value: `What the are supported strucutres?`,
            description: `Currently, we only support array of objects with 3 level nesting and a simple array.`
          },
          {
            value: `I want to generate single object. How to do it?`,
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

}
