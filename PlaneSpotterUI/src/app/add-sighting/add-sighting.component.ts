import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlaneSpotter } from '../models/plane-spotter';
import { PlaneSpotterService } from '../services/plane-spotter.service';

@Component({
  selector: 'app-add-sighting',
  templateUrl: './add-sighting.component.html',
  styleUrls: ['./add-sighting.component.css']
})
export class AddSightingComponent implements OnInit {

  @Input() sighting? : PlaneSpotter;
  @Output() spottersChange = new EventEmitter<PlaneSpotter[]>();
  
  fileToUpload: File | any = null;
  imageSrc: string = "";

  succmsg:boolean = false;
  errmsg:boolean = false;

  constructor(private formBuilder: FormBuilder, private planespotterservise: PlaneSpotterService) { }

  ngOnInit(): void {
  }

  addSighting(sighting:PlaneSpotter){
    this.CloseMsg();
    if (this.imageSrc){
      const fd = new FormData();
      fd.append('image', this.fileToUpload, this.fileToUpload.name);
      this.planespotterservise.uploadImage(fd).subscribe((result:any) =>
      console.log(result));
      sighting.photo = this.imageSrc
    }

    this.planespotterservise.createSpotters(sighting).subscribe((sighting:PlaneSpotter[]) => {
    this.spottersChange.emit(sighting)
    
    this.succmsg = true
    },
    error => {
      this.errmsg = true
      console.log(error)}, 
    );


    // this.pc.ActivateAddEditComp=false;
  }

  UpdateSighting(sighting:PlaneSpotter){
    this.CloseMsg();
    if (this.imageSrc){
      const fd = new FormData();
      fd.append('image', this.fileToUpload, this.fileToUpload.name);
      this.planespotterservise.uploadImage(fd).subscribe((result:PlaneSpotter[]) => {
      // console.log(result);
    }
    );
      sighting.photo = this.imageSrc
    }
   
    this.planespotterservise.updateSpotters(sighting).subscribe((sighting:PlaneSpotter[]) => {
    this.spottersChange.emit(sighting)
    
    this.succmsg = true;
    },
    error => {
      this.errmsg = true
      console.log(error)}, 
    );

    // this.pc.closeClick();
  }

  deleteClick(sighting: PlaneSpotter){
    if(confirm('Are you sure you want to delete?')){
      this.planespotterservise.deleteSpotters(sighting).subscribe((sighting:PlaneSpotter[]) =>
      this.spottersChange.emit(sighting)
      );
    }
  }

  

  onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      this.fileToUpload = <File>event.target.files[0];
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
   
      };
    }
  }

  CloseMsg(){
    this.succmsg = false;
    this.errmsg = false;
  }

}
