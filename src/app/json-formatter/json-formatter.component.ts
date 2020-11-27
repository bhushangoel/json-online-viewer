import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {isUndefined, isObject, isArray, isString, isNumber, isBoolean} from '../../utils/utils';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss']
})
export class JsonFormatterComponent implements OnInit, OnChanges {

  private _data: object;
  @Input()
  set data(data: object) {
    this._data = data;
    this.isInit && this.init();
  }

  get data(): object {
    return this._data;
  }

  @Input() key: string;
  @Input() level: number = 0;
  @Input() levelOpen: number;
  @Input() levelLabels: { [key: number]: { [key: string]: string } };

  isOpen = false;
  childrenKeys: string[];
  hasChildren = false;
  dataType: string;
  value: any;
  valueType: string;
  isObject = false;
  isArray = false;
  isInit = false;
  _levelLabels = {};

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.init();
    this.isInit = true;
  }

  init(): void {
    this.levelLabelHandle();
    this.levelOpenHandle();
    this.childrenKeysHandle();
    this.dataHandle();
  }

  levelLabelHandle(): void {
    if (this.levelLabels !== undefined) {
      this._levelLabels = this.levelLabels[this.level] || {};
    }
  }

  levelOpenHandle(): void {
    if (!isUndefined(this.levelOpen)) {
      (this.level <= this.levelOpen) && (this.isOpen = true);
    }
  }

  childrenKeysHandle(): void {
    if (isObject(this.data)) {
      this.childrenKeys = Object.keys(this.data);
      this.childrenKeys && this.childrenKeys.length && (this.hasChildren = true);
    }
  }

  dataHandle(): void {
    if (isObject(this.data)) {
      this.isObject = true;
      this.dataType = 'Object';
      if (isArray(this.data)) {
        this.isArray = true;
        this.dataType = 'Array';
      }
      if (this._levelLabels[this.key]) {
        this.dataType = this._levelLabels[this.key];
      }
    } else {
      this.value = this.data;
      if (isString(this.data)) {
        this.valueType = 'string';
      } else if (isNumber(this.data)) {
        this.valueType = 'number';
      } else if (isBoolean(this.data)) {
        this.valueType = 'boolean';
      } else if (null === this.data) {
        this.valueType = 'null';
        this.value = 'null';
      }
    }
  }

  toggle(): void {
    if (!(this.childrenKeys && this.childrenKeys.length)) {
      return;
    }
    this.isOpen = !this.isOpen;
  }

}
