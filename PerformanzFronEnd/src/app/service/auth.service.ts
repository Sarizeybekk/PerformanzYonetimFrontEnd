import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';

import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';

import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl:string;
  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient : HttpClient
  ) { }
  login(loginModel:LoginModel){
    let api= this.apiUrl + "Auth/CreateToken";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,loginModel)
  }
  register(registerModel:RegisterModel){
    let api= this.apiUrl + "User/CreateUser";
    return this.httpClient.post<RegisterModel>(api,registerModel)

  }
  isAuthenticated(){
    if (localStorage.getItem("accestoken")) {
      return true;
    }
    else{
      return false;
    }
  }



}
