import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {MessageComponentService} from '../shared/message-component/message-component.service';

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

  constructor(private mcs: MessageComponentService) {
    this.editorOptions.forEach((o, i) => {
      o.options.modes = ['code', 'tree', 'view'];
      o.options.mode = i === 0 ? 'code' : 'tree';
      o.options.expandAll = o.options.mode === 'tree';
    });

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
    const str = data.split('\n');
    str.forEach(d => {
      let s = d.split(':');
      if (s.length) {
        d = `'${d}'`;
      }
      s = s.join(':');
    });
    return str.join('\n');
  }

  copyToClipboard(idx: number): void {
    if (navigator.clipboard) {
      const content = JSON.stringify(this.editorOptions[idx].data);
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

  onChangeJSON(e: any, idx: number): void {
    this.editorOptions[idx].data = e;
  }

  onTextChange(e: any): void {
    // console.log('e : ', e);
  }
}
