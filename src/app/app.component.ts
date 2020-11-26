import {Component} from '@angular/core';

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
      label: 'Generate mock JSON',
      link: '/generate',
      isActiveLink: 'active',
      selected: true
    }
  ];
}
