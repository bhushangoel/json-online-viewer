import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonViewerComponent implements OnInit {
  data: any;
  editorOptions = [
    {
      options: new JsonEditorOptions(),
      data: {
        'prop1': 'abc',
        'obj1': {
          'objProp1': 1
        }
      }
    },
    {
      options: new JsonEditorOptions(),
      data: {
        'products': [{
          'name': 'car',
          'product': [{
            'name': 'honda',
            'model': [{'id': 'civic', 'name': 'civic'}, {'id': 'accord', 'name': 'accord'}, {'id': 'crv', 'name': 'crv'}, {
              'id': 'pilot',
              'name': 'pilot'
            }, {'id': 'odyssey', 'name': 'odyssey'}]
          }]
        }]
      }
    }
  ];
  jsonViewerData = [
    {
      customData: `{
      'foo' : 'abc',
      'bar' : 1,
      'baz' : { 'prop1' : 'value1' }
  }`,
      showType: 'raw',
      customJson: {
        'foo': 'abc',
        'bar': 1,
        'baz': {'prop1': 'value1'}
      },
      enableCopy: false
    },
    {
      customData: `{
      'foo' : 'abc',
      'bar' : 1,
      'baz' : { 'prop1' : 'value1' }
  }`,
      showType: 'raw',
      customJson: {
        'foo': 'abc',
        'bar': 1,
        'baz': {'prop1': 'value1'}
      },
      enableCopy: false
    }
  ];
  @ViewChild(JsonEditorComponent, {static: false}) editor: JsonEditorComponent;

  constructor() {
    this.editorOptions.forEach(o => {
      o.options.modes = ['code', 'tree', 'view'];
      o.options.expandAll = true;
    });
    // this.options.mode = 'code'; //set only one mode

    this.data = {
      'products': [{
        'name': 'car',
        'product': [{
          'name': 'honda',
          'model': [{'id': 'civic', 'name': 'civic'}, {'id': 'accord', 'name': 'accord'}, {'id': 'crv', 'name': 'crv'}, {
            'id': 'pilot',
            'name': 'pilot'
          }, {'id': 'odyssey', 'name': 'odyssey'}]
        }]
      }]
    };
  }

  ngOnInit(): void {
  }

  ngModelChange($event: any, idx: number): void {
    // $event = this.formatJsonHandler($event);
    this.jsonViewerData[idx].enableCopy = false;
    const str = $event.replace(/'/g, '"');
    try {
      this.jsonViewerData[idx].customJson = JSON.parse(str);
      this.jsonViewerData[idx].enableCopy = true;
    } catch (error) {
      // console.log('e : ', error);
    }
  }

  formatJsonHandler(data: any): string {
    console.log('data : ', data);
    const str = data.split('\n');
    console.log('d : ', str);
    str.forEach(d => {
      let s = d.split(':');
      console.log('s : ', s, s.length);
      if (s.length) {

        d = `'${d}'`;
      }
      s = s.join(':');
    });
    console.log('str 2 : ', str);
    return str.join('\n');
  }

  copyToClipboard(idx: number): void {
    if (navigator.clipboard) {
      const content = JSON.stringify(this.editorOptions[idx].data);
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

  onChangeJSON(e: any, idx: number): void {
    this.editorOptions[idx].data = e;
  }

  onTextChange(e: any): void {
    console.log('e : ', e);
  }
}
