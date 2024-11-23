import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CihazTip } from '../models/cihazTipModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CihazTiplerService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getAll(): Observable<ListResponseModel<CihazTip>> {
    let api = this.apiUrl + "CihazTipler";
    return this.httpClient.get<ListResponseModel<CihazTip>>(api)
  }
  getbyid(id: number): Observable<SingleResponseModel<CihazTip>> {
    let api = this.apiUrl + "CihazTipler/" + id;
    return this.httpClient.get<SingleResponseModel<CihazTip>>(api)
  }

  deleteCihazTip(id: number) {
    let api = this.apiUrl + 'CihazTipler/' + id;
    return this.httpClient.delete(api);
  }
  save(cihazTip:CihazTip) {
    let api = this.apiUrl + 'CihazTipler';
    return this.httpClient.post(api, cihazTip);
  }
  updateCihazTip(cihazTip:CihazTip): Observable<ResponseModel> {
    let api = this.apiUrl + 'CihazTipler';
    return this.httpClient.put<ResponseModel>(api,cihazTip);
  }




}
