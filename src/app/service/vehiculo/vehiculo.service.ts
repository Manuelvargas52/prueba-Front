import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private API_SERVER = "http://localhost:8080/vehiculo/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllVehiculo():Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveVehiculo (vehiculo:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,vehiculo)
  }

  public deleteVehiculo(vehiculos: any):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+vehiculos);
  }

}
