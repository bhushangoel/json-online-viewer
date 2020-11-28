import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'json-play';
  currentRoute: string;
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

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }

  tabClicked(tab: any): void {
    this.tabs.forEach(t => {
      t.selected = false;
    });
    const currentTab = this.tabs.filter(t => t.label === tab.label)[0];
    currentTab.selected = true;
  }

}
