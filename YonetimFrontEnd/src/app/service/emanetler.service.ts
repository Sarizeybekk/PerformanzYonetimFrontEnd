import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emanet } from '../models/emanetModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class EmanetlerService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<ListResponseModel<Emanet>> {
    let api = this.apiUrl + "Emanetler";
    return this.httpClient.get<ListResponseModel<Emanet>>(api)
  }
  getbyid(id: number): Observable<SingleResponseModel<Emanet>> {
    let api = this.apiUrl + "Emanetler/" + id;
    return this.httpClient.get<SingleResponseModel<Emanet>>(api)

  }

  save(emanet: Emanet) {
    let api = this.apiUrl + 'Emanetler';
    return this.httpClient.post(api, emanet);
  }


  deleteEmanet(id: number) {
    let api = this.apiUrl + 'Emanetler/' + id;
    return this.httpClient.delete(api);
  }

  updateEmanet(emanet: Emanet): Observable<ResponseModel> {
    let api = this.apiUrl + 'Emanetler';
    return this.httpClient.put<ResponseModel>(api, emanet);
  }

}
