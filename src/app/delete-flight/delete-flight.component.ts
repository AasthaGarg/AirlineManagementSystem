import { Component, OnInit } from '@angular/core';
import {Airline } from '../shared/model/airline.model';
import { Router } from '@angular/router';
import { AppWebService } from '../shared/service/app-web.service';

@Component({
  selector: 'app-delete-flight',
  templateUrl: './delete-flight.component.html',
  styleUrls: ['./delete-flight.component.css']
})
export class DeleteFlightComponent implements OnInit {

  providerCode = '';
  providerType = '';
  errorOnPage = false;
  providerTypes = ['Domestic', 'International'];
  selectedProvider: any;
  existingAirlines: Airline[] = [];
  isFormValid = false;

  providerNotFound = 'Provider is not present with this code.';
  providerNotFoundWithType = 'Provider code is not present with this provider type.';
  message = '';

  constructor(private router: Router, private appService: AppWebService) {
  }

  ngOnInit(): void {
    this.appService.getAirlines().subscribe(data => {
      this.existingAirlines = data;
    });

  }

  verifyproviderCode(): void {
    this.selectedProvider = this.existingAirlines.find(airline => airline.providerCode === this.providerCode);
    if (this.selectedProvider == null) {
      this.message = this.providerNotFound;
      this.errorOnPage = true;
    } else {
      this.errorOnPage = false;
    }
  }

  verifyproviderType(): void {
    const temp = this.existingAirlines.find(
      airline =>
        airline.providerCode === this.providerCode && airline.providerType === this.providerType
    );
    if (temp != null) {
      this.errorOnPage = false;
    } 
    else {
      this.message = this.providerNotFoundWithType;
      this.errorOnPage = true;
    }
  }

  validateProviderData(): void {
    this.verifyproviderCode();
    if (!this.errorOnPage) {
      this.verifyproviderType();
    }
    this.isFormValid = !this.errorOnPage;
  }

  deleteProvider(): void {

    this.selectedProvider.providerType = this.providerType;
    this.appService.deleteAirline(this.selectedProvider.id).subscribe(data => {
    
      this.router.navigate(['']);
    });

  }

}
