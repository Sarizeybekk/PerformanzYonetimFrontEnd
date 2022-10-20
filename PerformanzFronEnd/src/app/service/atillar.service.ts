import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atil } from '../models/atilanlarModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AtillarService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }
  getAll(): Observable<ListResponseModel<Atil>> {
    let api = this.apiUrl + "Atillar";
    return this.httpClient.get<ListResponseModel<Atil>>(api)
  }
  getbyid(id: number): Observable<SingleResponseModel<Atil>> {
    let api = this.apiUrl + "Atillar/" + id;
    return this.httpClient.get<SingleResponseModel<Atil>>(api)
  }

  deleteAtil(id: number) {
    let api = this.apiUrl + 'Atillar/' + id;
    return this.httpClient.delete(api);
  }
  save(atil:Atil) {
    let api = this.apiUrl + 'Atillar';
    return this.httpClient.post(api, atil);
  }
  updateAtil(atil:Atil): Observable<ResponseModel> {
    let api = this.apiUrl + 'Atillar';
    return this.httpClient.put<ResponseModel>(api, atil);
  }




}
