import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Urun } from '../models/urunlerModel';

@Injectable({
  providedIn: 'root'
})
export class UrunlerService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }
  getAll(): Observable<ListResponseModel<Urun>> {
    let api = this.apiUrl + "Urunler";
    return this.httpClient.get<ListResponseModel<Urun>>(api)
  }
  getbyid(id: number): Observable<SingleResponseModel<Urun>> {
    let api = this.apiUrl + "Urunler/" + id;
    return this.httpClient.get<SingleResponseModel<Urun>>(api)
  }

  deleteUrun(id: number) {
    let api = this.apiUrl + 'Urunler/' + id;
    return this.httpClient.delete(api);
  }
  save(urun:Urun) {
    let api = this.apiUrl + 'Urunler';
    return this.httpClient.post(api, urun);
  }
  updateUrun(urun:Urun): Observable<ResponseModel> {
    let api = this.apiUrl + 'Urunler';
    return this.httpClient.put<ResponseModel>(api, urun);
  }








}
