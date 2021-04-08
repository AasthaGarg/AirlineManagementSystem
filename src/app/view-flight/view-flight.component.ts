import { Component, OnInit } from '@angular/core';
import {AppWebService} from '../shared/service/app-web.service';
import {Airline} from '../shared/model/airline.model';

@Component({
  selector: 'app-view-flight',
  templateUrl: './view-flight.component.html',
  styleUrls: ['./view-flight.component.css']
})
export class ViewFlightComponent implements OnInit {

  headers = ['ProviderCode', 'ProviderName', 'ProviderType'];
  private airlineProviders: Airline[]=[];
  filteredProviders: Airline[]=[];

  constructor(private appService: AppWebService) {
  }

  ngOnInit(): void {
    this.appService.getAirlines().subscribe(
      data => {
        this.airlineProviders = data;
        this.filteredProviders = this.airlineProviders.slice();
      }
    );
  }

  filterAirlineProviders(event:any): void {
    
    const filterValue = event.target.value;
    this.filteredProviders = [];
    this.filteredProviders = this.airlineProviders.slice();
    if (['Domestic', 'International'].includes(filterValue)) {
      this.filteredProviders = this.filteredProviders.filter((value) => value.providerType === filterValue);
    }
  }


}
