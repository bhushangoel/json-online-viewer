import {Component, OnInit, ViewEncapsulation} from '@angular/core';
// @ts-ignore
import hljs from 'node_modules/highlight.js/lib/core';
// @ts-ignore
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', json);

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonViewerComponent implements OnInit {
  data: any;
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


  constructor() {
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
      const content = JSON.stringify(this.jsonViewerData[idx].customJson);
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

  changeType(type: string, idx: number): void {
    if (type === 'code') {
      setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightBlock(block);
        });
      });
    }
    this.jsonViewerData[idx].showType = type;
  }
}
