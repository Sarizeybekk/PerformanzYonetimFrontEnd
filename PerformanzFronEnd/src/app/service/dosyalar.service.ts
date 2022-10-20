import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dosya } from '../models/dosyalarModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DosyalarService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getAll(): Observable<ListResponseModel<Dosya>> {
    let api = this.apiUrl + "Dosyalar";
    return this.httpClient.get<ListResponseModel<Dosya>>(api)
  }
  getbyid(id: number): Observable<SingleResponseModel<Dosya>> {
    let api = this.apiUrl + "Dosyalar/" + id;
    return this.httpClient.get<SingleResponseModel<Dosya>>(api)
  }

  deleteDosyaTip(id: number) {
    let api = this.apiUrl + 'Dosyalar/' + id;
    return this.httpClient.delete(api);
  }
  save(dosya:Dosya) {
    let api = this.apiUrl + 'Dosyalar';
    return this.httpClient.post(api,dosya);
  }
  updateDosyaTip(dosya:Dosya): Observable<ResponseModel> {
    let api = this.apiUrl + 'Dosyalar';
    return this.httpClient.put<ResponseModel>(api,dosya);
  }
}
