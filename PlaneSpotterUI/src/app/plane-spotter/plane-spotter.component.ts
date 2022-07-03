import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlaneSpotter } from '../models/plane-spotter';
import { PlaneSpotterService } from '../services/plane-spotter.service';

@Component({
  selector: 'app-plane-spotter',
  templateUrl: './plane-spotter.component.html',
  styleUrls: ['./plane-spotter.component.css']
})
export class PlaneSpotterComponent implements OnInit {

  @Output() spottersChange = new EventEmitter<PlaneSpotter[]>();
  
  ModalTitle:string="";
  sightings: PlaneSpotter[] = [];
  sighting : PlaneSpotter | any = null;

  ActivateAddEditComp:boolean=false;

  planemakeFilter : string="";
  planemodelFilter : string="";
  planeregistrationFilter : string="";
  spotterListWithoutFilter : PlaneSpotter[]=[];

  constructor(private planeSpotterService: PlaneSpotterService) { }

  ngOnInit(): void {
    this.getAllSightings();
  }

  refreshSightings(sightings:PlaneSpotter[]){
    this.sightings = sightings;
  }

  getAllSightings(){
    this.planeSpotterService.getAllSpotters().subscribe((result : PlaneSpotter[]) =>
    {
      this.sightings=result;
      this.spotterListWithoutFilter=result;
      //console.log(this.sightings);
    });
  }

  addClick(){
    this.ModalTitle="Add Sighting";
    this.ActivateAddEditComp=true;

    this.sighting = new PlaneSpotter();
  }

  editClick(sighting: PlaneSpotter){
    this.ActivateAddEditComp=true;

    this.sighting = sighting;
  }

  closeClick(){
    this.ActivateAddEditComp=false;
    this.getAllSightings();
  }

  filterFn(){
    var planemakeFilter = this.planemakeFilter;
    var planemodelFilter = this.planemodelFilter;
    var planeregistrationFilter = this.planeregistrationFilter;

    this.sightings = this.spotterListWithoutFilter.filter(function (el:any){
      return el.planemake.toString().toLowerCase().includes(
        planemakeFilter.toString().trim().toLowerCase()
      )&&
        el.planemodel.toString().toLowerCase().includes(
          planemodelFilter.toString().trim().toLowerCase()
      )&&
      el.planeregistration.toString().toLowerCase().includes(
        planeregistrationFilter.toString().trim().toLowerCase()
    )
    });
  }

}
