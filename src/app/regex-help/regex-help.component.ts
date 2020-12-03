import {Component, OnInit} from '@angular/core';
import {MessageComponentService} from '../shared/message-component/message-component.service';

@Component({
  selector: 'app-regex-help',
  templateUrl: './regex-help.component.html',
  styleUrls: ['./regex-help.component.scss']
})
export class RegexHelpComponent implements OnInit {
  copied = false;
  regexpList = [
    {
      name: 'Alpha numeric',
      exp: '[A-Za-z0-9]*',
      copied: false,
      desc: `Generates a random length alphanumeric string.<br><br>
            <i>example: <br>1. REUYtLKJCzN8mAr2kcQriZLUhXUGr4h0CmHis5VnPNaNeAaiqKudxuyNAPVo8yIR5kp84DvF77okAd0<br>
            2. JwyI</i>`
    },
    {
      name: 'Alphabets',
      exp: '[A-Za-z]*',
      copied: false,
      desc: `Generates a random length string containing only alphabets.<br><br>
            <i>example: <br>1. REUYtLKJCzNVnPNaNeAaiqKudxuyNAPVo<br>
            2. JwyI</i>`
    },
    {
      name: 'Alphabets UPPERCASE',
      exp: '[A-Z]*',
      copied: false,
      desc: `Generates a random length string containing only uppercase alphabets.<br><br>
            <i>example: <br>1. REUYLKJCPNKNAP<br>
            2. ABHGT</i>`
    },
    {
      name: 'Email ID',
      exp: '[a-z]{3,5}[0-9]{2,3}@[a-z]{4}[.]com',
      copied: false,
      desc: `Generates a random email id.<br><br>
            <i>example: <br>1. wbadh64@hfzx.com<br>
            2. uyz51@bals.com</i>`
    },
    {
      name: 'Phone Number',
      exp: '[7-9]{1}[0-9]{9}',
      copied: false,
      desc: `First digit of a phone number would be between 7 to 9 and other 9 would be between 0 to 9.<br><br>
            <i>example: 9876543210</i>`
    }
  ];


  constructor(private mcs: MessageComponentService) {
  }

  ngOnInit(): void {
  }

  copyToClipboard(data: any): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.exp)
        .then((resp) => {
          /* clipboard successfully set */
          this.mcs.show({type: 'success', content: 'Content copied successfully'});
          data.copied = true;
          setTimeout(() => {
            data.copied = false;
          }, 1000);
        }, () => {
          /* clipboard write failed */
          this.mcs.show({type: 'danger', content: 'console.log(\'Error in copying the content...\');'});
        });
    }
  }
}
