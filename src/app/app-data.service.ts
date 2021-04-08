import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService implements InMemoryDbService{

  constructor() { }
  createDb(): {} | Observable<{}> | Promise<{}> {
    const airlines = [
      {
        id: 1, providerName: 'Jet Airways',
        providerCode: '9W-', providerType: 'Domestic'
      },
      {
        id: 2, providerName: 'Emirates',
        providerCode: 'EK-', providerType: 'International'
      }
    ];
    return {airlines};
  }

}
