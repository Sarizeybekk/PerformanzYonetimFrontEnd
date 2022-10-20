import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 loginForm: FormGroup
 isLoginButtonActive: boolean=true;
 email:string = "";
 password:string = "";
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder : FormBuilder,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["", (Validators.required,Validators.email)],
      password: ["", Validators.required]
    })
  }


  login(){
    if (this.loginForm.valid) {
      this.isLoginButtonActive=false;
    let loginModel=Object.assign({},this.loginForm.value);
    this.authService.login(loginModel).subscribe((res)=> {
     // next: (res)=>
     console.log(res)

      //error: (err)=> console.log(err)

      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl])
      }
      else{
        this.router.navigate([""])
      }
      console.log(res.data)
      localStorage.setItem("accestoken",res.data.accessToken)
      localStorage.setItem("Id",res.data.userId)
      console.log(res.data)
      this.toastr.success("Giriş Başarılı")


    },(err=>{
      this.isLoginButtonActive=true;

    })
    )
    }//api isteklerinde hataları err kısmı eklemezsen yakalayamazsın
    //subsucribe da artık bunu kullan
    else{
      this.toastr.error("Eksik bilgileri dolurun!","Hata!")
    }
  }
  changeInputClass(text:string){
    if (text != "") {
      return "input-group input-group-outline is-valid my-3"
    }else{
      return "input-group input-group-outline is-invalid my-3"
    }
  }

}
