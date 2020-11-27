import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {
  sectionList = [
    {
      label: 'Property Type',
      value: 'propertyType'
    },
    {
      label: 'Validations',
      value: 'validations'
    }
  ];
  currentSelectedProperty = 'propertyType';
  showSection = {};

  constructor() {
    this.showSection = {
      propertyType: {
        display: true,
        data: [
          {
            value: 'Unique ID',
            description: 'Sequential unique numbers'
          },
          {
            value: 'Text',
            description: 'Generate text value'
          },
          {
            value: 'Textarea',
            description: 'Generate long text values'
          },
          {
            value: 'Integer',
            description: 'Generate integer values'
          },
          {
            value: 'Boolean',
            description: 'Generate boolean values'
          }
        ]
      },
      validations: {
        display: false,
        data: [
          {
            value: 'Regex',
            description: `Dropdown consists of most used regex and custom regex option. You can select <a target="_blank" [routerLink]="/regex-help">custom regex</a> and write your own regex.`
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
      }
    };
  }

  ngOnInit(): void {
  }

  showSectionHandler(name: string): void {
    console.log('name : ', name);
    this.currentSelectedProperty = name;
    this.sectionList.forEach((s => {
      this.showSection[s.value].display = false;
    }));
    this.showSection[name].display = true;
  }

}
