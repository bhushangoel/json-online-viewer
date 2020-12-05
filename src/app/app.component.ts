import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'json playground';
  currentRoute: string;
  titleMap = {
    generate: {
      title: 'JSON online viewer: Generate mock JSON',
      description: `JSON online viewer: Generate mock JSON for creating dummy data and use it with your project or plugin.
      Generate array of objects or simple arrays.`
    },
    view: {
      title: 'JSON online viewer: View or Edit JSON',
      description: `JSON online viewer: View, edit or compare your multiple JSON files.`
    },
    regexHelp: {
      title: 'JSON online viewer: Regex help page',
      description: `JSON online viewer: Get help with the commonly used custom regex to generate mock JSON.`
    },
    docs: {
      title: 'JSON online viewer: Docs',
      description: `JSON online viewer: Help page.`
    }
  };
  tabs = [
    {
      label: 'Generate mock JSON',
      link: '/generate',
      value: 'generate',
      isActiveLink: 'active',
      selected: true
    },
    {
      label: 'JSON viewer',
      link: '/json-viewer',
      value: 'view',
      isActiveLink: 'active',
      selected: false
    },
    {
      label: 'Regex help',
      link: '/regex-help',
      value: 'regexHelp',
      isActiveLink: 'active',
      selected: false
    },
    {
      label: 'Docs',
      link: '/docs',
      value: 'docs',
      isActiveLink: 'active',
      selected: false
    }
  ];

  firebaseConfig = {
    apiKey: 'AIzaSyBUS1lRnnkqCzTSD0ZiLXgie9vA5eLrEYY',
    authDomain: 'json-playground.firebaseapp.com',
    databaseURL: 'https://json-playground.firebaseio.com',
    projectId: 'json-playground',
    storageBucket: 'json-playground.appspot.com',
    messagingSenderId: '751003239170',
    appId: '1:751003239170:web:091bb7589a21e8efe9f81b',
    measurementId: 'G-8FG161M23S'
  };

  constructor(private router: Router,
              private titleService: Title,
              private meta: Meta) {
    firebase.initializeApp(this.firebaseConfig);
    firebase.analytics();
  }

  ngOnInit(): void {
    this.setMetaInfo();
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
  }

  setMetaInfo(): void {
    const currentTab = this.tabs.filter(t => t.selected)[0] || {value: 'generate'};
    const currentMap = this.titleMap[currentTab.value];
    this.titleService.setTitle(currentMap.title);
    this.meta.updateTag({name: 'description', content: currentMap.description});
  }

  tabClicked(tab: any): void {
    this.tabs.forEach(t => {
      t.selected = false;
    });
    const currentTab = this.tabs.filter(t => t.label === tab.label)[0];
    currentTab.selected = true;
    this.setMetaInfo();
  }

}
