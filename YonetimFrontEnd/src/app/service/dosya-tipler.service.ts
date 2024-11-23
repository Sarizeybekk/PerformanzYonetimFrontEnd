import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DosyaTip } from '../models/dosyaTipModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DosyaTiplerService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }
  getAll(): Observable<ListResponseModel<DosyaTip>> {
    let api = this.apiUrl + "DosyaTipler";
    return this.httpClient.get<ListResponseModel<DosyaTip>>(api)
  }
  getbyid(id: number): Observable<SingleResponseModel<DosyaTip>> {
    let api = this.apiUrl + "DosyaTipler/" + id;
    return this.httpClient.get<SingleResponseModel<DosyaTip>>(api)
  }

  deleteDosyaTip(id: number) {
    let api = this.apiUrl + 'DosyaTipler/' + id;
    return this.httpClient.delete(api);
  }
  save(dosyaTip:DosyaTip) {
    let api = this.apiUrl + 'DosyaTipler';
    return this.httpClient.post(api,dosyaTip);
  }
  updateDosyaTip(dosyaTip:DosyaTip): Observable<ResponseModel> {
    let api = this.apiUrl + 'DosyaTipler';
    return this.httpClient.put<ResponseModel>(api,dosyaTip);
  }









}
