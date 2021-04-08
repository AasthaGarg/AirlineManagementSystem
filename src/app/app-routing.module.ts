import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { DeleteFlightComponent } from './delete-flight/delete-flight.component';
import { HomeComponent } from './home/home.component';
import { ModifyFlightComponent } from './modify-flight/modify-flight.component';
import { ViewFlightComponent } from './view-flight/view-flight.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'createFlight',component:CreateFlightComponent},
  {path:'modifyFlight',component:ModifyFlightComponent},
  {path:'viewFlight',component:ViewFlightComponent},
  {path:'deleteFlight',component:DeleteFlightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent,CreateFlightComponent,ModifyFlightComponent,ViewFlightComponent,
                                  DeleteFlightComponent]
