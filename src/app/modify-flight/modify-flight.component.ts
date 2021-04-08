import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppWebService } from '../shared/service/app-web.service';
import { Airline } from '../shared/model/airline.model';

@Component({
  selector: 'app-modify-flight',
  templateUrl: './modify-flight.component.html',
  styleUrls: ['./modify-flight.component.css']
})
export class ModifyFlightComponent implements OnInit {

  providerCode = '';
  providerType = '';
  errorOnPage = false;
  providerTypes = ['Domestic', 'International'];
  selectedProvider: any;
  existingAirlines: Airline[] = [];
  isFormValid = false;

  providerTypeErrorMessage = 'Provider type already present for this provider code.';
  providerNotFound = 'Provider is not present with this code.';
  providerNotFoundWithType = 'Provider is not present with this provider type.';
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
      this.message = this.providerTypeErrorMessage;
      this.errorOnPage = true;
    } else if (temp == null && this.providerTypes.includes(this.providerType)) {
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

  modifyProvider(): void {

    this.selectedProvider.providerType = this.providerType;
    this.appService.updateAirline(this.selectedProvider).subscribe(data => {
    
      this.router.navigate(['']);
    });

  }

}





