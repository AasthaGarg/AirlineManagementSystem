import { Component, OnInit } from '@angular/core';
import {Airline} from '../shared/model/airline.model';
import {AppWebService } from '../shared/service/app-web.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  constructor(private router: Router, private appService: AppWebService) { }

  provider:any = {
    'INDIGO': '6E-',
    'SPICEJET': 'SG-',
    'AIR ASIA': 'I5-',
    'GO AIR': 'G8-',
    'JET AIRWAYS': '9W-',
    'AIR INDIA': 'AI-'
  };
  proType:any = ['Domestic','International'];
  providerName = '';
  providerCode = '';
  providerType = '';
  isError = false;
  message = '';
  providerNameErrorMessage = 'Please enter valid provider name.';
  providerTypeErrorMessage = 'Please enter valid provider type.';
  providerAlreadyPresent = 'Provider with the given type is already present.';
  buttonDisabled = true;
  airlines = [];
  existingAirlines:Airline[]=[];

  ngOnInit(): void {
    this.appService.getAirlines().subscribe(data => {
      this.existingAirlines = data;
  });
  }

  validateProviderName(): void {
  
    if (this.providerName.toUpperCase() in this.provider) {
      this.providerCode = this.provider[this.providerName.toUpperCase()];
      this.isError = false;
    } else {
      this.providerCode = '';
      this.isError = true;
      this.message = this.providerNameErrorMessage;
    }
    
  }

  validateProviderType(): void {
    this.isError = !this.proType.includes(this.providerType);
    this.message = this.isError ? this.providerTypeErrorMessage : '';
   
  }

  validateProviderData(): void {
    this.validateProviderName();
    if (!this.isError) {
      this.validateProviderType();
    }
    this.buttonDisabled = this.isError;
  }

  saveAirline():void{

    if(this.existingAirlines==null || this.existingAirlines.length==0){
      const airline={
        id:1,
        providerName:this.providerName,
        providerCode:this.providerCode,
        providerType:this.providerType
      };
      this.existingAirlines.push(airline);
      this.appService.saveAirline(airline).subscribe(data=>{
        console.log(data);
        this.router.navigate(['']);
      });
    }
    else {
      const temp = this.existingAirlines.find(
        airline =>
          airline.providerCode === this.providerCode && airline.providerType === this.providerType
      );
      if (temp != null) {
        this.message = this.providerAlreadyPresent;
        this.isError = true;
      } else {
        const maxId = this.existingAirlines.reduce(
          (max, character) => (character.id > max ? character.id : max),
          this.existingAirlines[0].id
        );
        const airline = {
          id: maxId + 1,
          providerName: this.providerName,
          providerCode: this.providerCode,
          providerType: this.providerType
        };
        this.existingAirlines.push(airline);
        this.appService.saveAirline(airline).subscribe(data => {
          console.log(data);
          this.router.navigate(['']);
        });
      }
    }
    
    
  }
    
}
