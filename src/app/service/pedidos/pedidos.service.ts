import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private API_SERVER = "http://localhost:8080/pedidos/";
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllPedidos():Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }
}
