import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Sehir } from '../models/sehirlerModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SehirlerService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }
  getAll(): Observable<ListResponseModel<Sehir>> {
    let api = this.apiUrl + "Sehirler";
    return this.httpClient.get<ListResponseModel<Sehir>>(api)
  }
  getbyid(id: number): Observable<SingleResponseModel<Sehir>> {
    let api = this.apiUrl + "Sehirler/" + id;
    return this.httpClient.get<SingleResponseModel<Sehir>>(api)
  }

  deleteSehir(id: number) {
    let api = this.apiUrl + 'Sehirler/' + id;
    return this.httpClient.delete(api);
  }
  save(sehir:Sehir) {
    let api = this.apiUrl + 'Sehirler';
    return this.httpClient.post(api, sehir);
  }
  updateSehir(sehir:Sehir): Observable<ResponseModel> {
    let api = this.apiUrl + 'Sehirler';
    return this.httpClient.put<ResponseModel>(api, sehir);
  }








}
