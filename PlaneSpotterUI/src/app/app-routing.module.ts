import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaneSpotterComponent } from './plane-spotter/plane-spotter.component';

const routes: Routes = [
  {path:'plane-spotter',component:PlaneSpotterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
