import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class LocalStorageService {
  constructor() {

  }

  set(key: string, value: object, type?: object): Observable<any> {
    return new Observable<boolean>((observer) => {
      try {
        let finalValue = {};
        localStorage.removeItem(`${key}`);
        const currentItem = JSON.parse(localStorage.getItem(key)) || {};

        for (const v in value) {
          if (value.hasOwnProperty(v)) {
            currentItem[v] = value[v];
          }
        }
        finalValue = currentItem;

        localStorage.setItem(key, JSON.stringify(finalValue));
        observer.next(true);
      } catch (e) {
        observer.next(false);
      }
    });
  }

  get(key: string): Observable<any> {
    return new Observable<object>((observer) => {
      try {
        const resp = localStorage.getItem(`${key}`);
        const output = resp ? {found: true, data: JSON.parse(resp)} : {found: false, data: {}};
        observer.next(output);
      } catch (e) {
        observer.next({found: false, data: {}});
      }
    });
  }

  remove(key: string): Observable<any> {
    return new Observable<boolean>((observer) => {
      try {
        localStorage.removeItem(`${key}`);
        observer.next(true);
      } catch (e) {
        observer.next(false);
      }
    });
  }

  update(key: string, value: object): Observable<any> {
    return new Observable<boolean>((observer) => {
      localStorage.setItem(key, JSON.stringify(value));
      observer.next(true);
    });
  }

  checkItemInLocalstorage(resp, key): boolean {
    const result = localStorage.getItem(`${key}`) || '{}';
    return !!Object.keys(JSON.parse(result)).length;
  }

  clear(): Observable<any> {
    return new Observable<boolean>((observer) => {
      try {
        localStorage.clear();
        observer.next(true);
      } catch (e) {
        observer.next(false);
      }
    });
  }
}
