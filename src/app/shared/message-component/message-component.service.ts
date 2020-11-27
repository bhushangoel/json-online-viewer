import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MessageComponentState} from './message-component.interface';

@Injectable()
export class MessageComponentService {
  private messageSubject = new Subject<MessageComponentState>();
  msgState = this.messageSubject.asObservable();

  contentMap = {
    'AP-404': {
      msg: 'Data not available for selected filters',
      type: 'warning'
    },
    'AP-500': {
      msg: 'Something went wrong',
      type: 'danger'
    },
    'PD-404': {
      msg: 'Price Id is null, Chart data not valid for Cleaning',
      type: 'warning'
    }
  };

  constructor() {
  }

  show(options): void {
    this.messageSubject.next({
      content: this.contentMap[options.content] ? this.contentMap[options.content].msg : options.content || this.contentMap['AP-500'].msg,
      type: this.contentMap[options.content] ? this.contentMap[options.content].type : options.type || this.contentMap['AP-500'].type,
      hideMessage: false
    } as MessageComponentState);
  }

  hide(): void {
    this.messageSubject.next({
      hideMessage: true,
      content: '',
      type: ''
    } as MessageComponentState);
  }
}
