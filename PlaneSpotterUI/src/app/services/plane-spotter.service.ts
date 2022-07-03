import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlaneSpotter } from '../models/plane-spotter';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PlaneSpotterService {
  private Url = "PlaneSpotter";

  constructor(private HttpClient : HttpClient) { }

  public getAllSpotters() : Observable<PlaneSpotter[]> {
    return this.HttpClient.get<PlaneSpotter[]>(`${environment.apiUrl}/${this.Url}`);
  }

  public updateSpotters(sighting:PlaneSpotter) : Observable<PlaneSpotter[]> {
    return this.HttpClient.put<PlaneSpotter[]>(`${environment.apiUrl}/${this.Url}`, sighting);
  }

  public createSpotters(sighting:PlaneSpotter) : Observable<PlaneSpotter[]> {
    return this.HttpClient.post<PlaneSpotter[]>(`${environment.apiUrl}/${this.Url}`, sighting);
  }

  public deleteSpotters(sighting:PlaneSpotter) : Observable<PlaneSpotter[]> {
    return this.HttpClient.delete<PlaneSpotter[]>(`${environment.apiUrl}/${this.Url}/${sighting.id}`);
  }

  public uploadImage(image:FormData) : Observable<PlaneSpotter[]> {
    return this.HttpClient.post<PlaneSpotter[]>(`${environment.apiUrl}/${this.Url}/${"import"}`, image);
  }

}
  

