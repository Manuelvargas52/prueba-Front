import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private API_SERVER = "http://localhost:8080/conductor/";
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllConductor():Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveConductor (conductor:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,conductor)
  }

  public deleteConductor(conducto: any):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+conducto);
  }

}
