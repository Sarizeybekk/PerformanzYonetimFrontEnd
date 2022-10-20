import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gonderi } from '../models/gonderilerModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class GonderilerService {


  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }
  getAll(): Observable<ListResponseModel<Gonderi>> {
    let api = this.apiUrl + "Gonderiler";
    return this.httpClient.get<ListResponseModel<Gonderi>>(api)
  }
  getbyid(id: number): Observable<SingleResponseModel<Gonderi>> {
    let api = this.apiUrl + "Gonderiler/" + id;
    return this.httpClient.get<SingleResponseModel<Gonderi>>(api)
  }
  deleteGonderi(id: number) {
    let api = this.apiUrl + 'Gonderiler/' + id;
    return this.httpClient.delete(api);
  }
  save(gonderi:Gonderi) {
    let api = this.apiUrl + 'Gonderiler';
    return this.httpClient.post(api, gonderi);
  }
  updateGonderi(gonderi:Gonderi): Observable<ResponseModel> {
    let api = this.apiUrl + 'Gonderiler';
    return this.httpClient.put<ResponseModel>(api, gonderi);
  }








}
