import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'json-play';
  /*tabs = [
    {
      label: 'Generate mock JSON',
      link: '/generate',
      isActiveLink: 'active',
      selected: true
    },
    {
      label: 'About JSON playground',
      link: '/about',
      isActiveLink: 'active',
      selected: false
    }
  ];*/
  tabs = [
    {
      label: 'JSON playground',
      link: '/generate',
      isActiveLink: 'active',
      selected: true
    }
  ];
}
