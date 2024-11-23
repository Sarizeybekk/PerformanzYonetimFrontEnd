import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gorusme } from '../models/gorusmeModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class GorusmeService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<ListResponseModel<Gorusme>> {
    let api = this.apiUrl + "Gorusme";
    return this.httpClient.get<ListResponseModel<Gorusme>>(api)
  }
  getbyid(id: number): Observable<SingleResponseModel<Gorusme>> {
    let api = this.apiUrl + "Gorusme/" + id;
    return this.httpClient.get<SingleResponseModel<Gorusme>>(api)
  }

  save(gorusme:Gorusme) {
    let api = this.apiUrl + 'Gorusme';
    return this.httpClient.post(api, gorusme);
  }


  deleteEmanet(id: number) {
    let api = this.apiUrl + 'Gorusme/' + id;
    return this.httpClient.delete(api);
  }

  updateEmanet(gorusme:Gorusme): Observable<ResponseModel> {
    let api = this.apiUrl + 'Gorusme';
    return this.httpClient.put<ResponseModel>(api, gorusme);
  }







}
