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
      label: 'Generate mock JSON',
      link: '/generate',
      isActiveLink: 'active',
      selected: true
    },
    {
      label: 'JSON viewer',
      link: '/json-viewer',
      isActiveLink: 'active',
      selected: false
    }
  ];

  constructor() {

  }

  tabClicked(tab: any): void {
    console.log('tab : ', tab);
    this.tabs.forEach(t => {
      t.selected = false;
    });
    const currentTab = this.tabs.filter(t => t.label === tab.label)[0];
    currentTab.selected = true;
  }

}
