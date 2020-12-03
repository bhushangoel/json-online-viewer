import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

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
    },
    {
      label: 'Docs',
      link: '/docs',
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

  constructor(private router: Router) {
    firebase.initializeApp(this.firebaseConfig);
    firebase.analytics();
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
