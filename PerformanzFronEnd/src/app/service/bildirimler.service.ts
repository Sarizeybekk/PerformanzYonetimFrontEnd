import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Bildirim } from '../models/bildirimlerModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BildirimlerService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getAll(): Observable<ListResponseModel<Bildirim>> {
    let api = this.apiUrl + "Bildirimler";
    return this.httpClient.get<ListResponseModel<Bildirim>>(api)
  }
}
