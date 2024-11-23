import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cihaz } from '../models/cihazlarModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Guid } from "guid-typescript";
@Injectable({
  providedIn: 'root'
})
export class CihazlarService {


  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }
  getAll(): Observable<ListResponseModel<Cihaz>> {
    let api = this.apiUrl + "Cihazlar";
    return this.httpClient.get<ListResponseModel<Cihaz>>(api)
  }
  getbyid(id:Guid): Observable<SingleResponseModel<Cihaz>> {
    let api = this.apiUrl + "Cihazlar/" + id;
    return this.httpClient.get<SingleResponseModel<Cihaz>>(api)
  }

  deleteCihaz(id: number) {
    let api = this.apiUrl + 'Cihazlar/' + id;
    return this.httpClient.delete(api);
  }
  save(cihaz: Cihaz) {
    let api = this.apiUrl + 'Cihazlar';
    return this.httpClient.post(api, cihaz);
  }

  updateCihaz(cihaz:Cihaz): Observable<ResponseModel> {
    let api = this.apiUrl + 'Cihazlar';
    return this.httpClient.put<ResponseModel>(api, cihaz);
  }


}
