import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageComponentState} from './message-component.interface';
import {MessageComponentService} from './message-component.service';

@Component({
  selector: 'app-message-component',
  templateUrl: './message-component.component.html',
  styleUrls: ['./message-component.component.scss']
})
export class MessageComponentComponent implements OnInit {

  public msg = {
    hide: true,
    type: '',
    content: ''
  };
  private subscription: Subscription;
  public msgVisible = false;
  public autoCloseTimer;

  constructor(private mcs: MessageComponentService) {
  }

  ngOnInit(): void {
    this.subscription = this.mcs.msgState
      .subscribe((state: MessageComponentState) => {
        if (state.content && state.type) {
          this.msgVisible ? this.updateMessage(state) : this.showMessage(state);
        }
      });
  }

  showMessage(state): void {
    this.msg = {
      hide: state.hideMessage,
      type: state.type,
      content: state.content
    };

    this.msgVisible = true;

    if (!state.hideMessage) {
      this.autoCloseErrorPopup();
    }
  }

  updateMessage(state): void {
    this.msg.hide = true;
    clearTimeout(this.autoCloseTimer);
    setTimeout(() => {
      this.showMessage(state);
    }, 500);
  }

  autoCloseErrorPopup(): void {
    this.autoCloseTimer = setTimeout(() => {
      this.msg.hide = true;
      this.msgVisible = false;
    }, 5000);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
