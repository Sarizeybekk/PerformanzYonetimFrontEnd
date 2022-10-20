import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }
  getAll(): Observable<ListResponseModel<User>> {
    let api = this.apiUrl + "User";
    return this.httpClient.get<ListResponseModel<User>>(api)
  }
  getbyid(id: number): Observable<SingleResponseModel<User>> {
    let api = this.apiUrl + "User/" + id;
    return this.httpClient.get<SingleResponseModel<User>>(api)
  }


  save(user:User) {
    let api = this.apiUrl + 'User/CreateUser';
    return this.httpClient.post(api, user);
  }
  saveSuperAdmin(user:User) {
    let api = this.apiUrl + 'User/CreateSuperAdminUser';
    return this.httpClient.post(api, user);
  }

  updateUser(user:User): Observable<ResponseModel> {
    let api = this.apiUrl + 'User';
    return this.httpClient.put<ResponseModel>(api, user);
  }





}
