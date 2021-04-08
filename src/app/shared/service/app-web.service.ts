import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Airline} from '../model/airline.model';

@Injectable({
  providedIn: 'root'
})
export class AppWebService {

  private airlinesUrl = 'api/airlines';

  constructor(private http: HttpClient) {
  }


  getAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>(this.airlinesUrl);
  }

  saveAirline(airlineData: Airline): Observable<any> {
    return this.http.post(this.airlinesUrl, airlineData);
  }

  updateAirline(airlineData: Airline): Observable<any> {
    return this.http.put(this.airlinesUrl, airlineData);
  }

  deleteAirline(airlineId:any): Observable<any> {
    return this.http.delete(this.airlinesUrl + '/' + airlineId);
  }
}
