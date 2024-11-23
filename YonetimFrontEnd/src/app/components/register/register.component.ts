import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm :FormGroup;

  userName:string="";
  email:string ="";
  password:string ="";
  termsAndConditionsCheck:boolean = false;
  isRegisterButtonActive:boolean=true;
  isRegisterComplete:boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();

  }
  register(){
    if (this.termsAndConditionsCheck) {
    if (this.registerForm.valid) {
      this.isRegisterButtonActive=false;
    let registerModel=Object.assign({},this.registerForm.value);

    console.log(registerModel)
    this.authService.register(registerModel).subscribe((res)=>{
      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl])
      }
      else{
        this.router.navigate([""])
      }
      this.toastr.success("Kayıt Başarılı")
    },
    (err)=>{
      this.isRegisterButtonActive=true;

    }


    )
  }else{
      this.toastr.error("Eksik bilgileri dolurun!","Hata!")
    }

  }else{
    this.toastr.warning("Kullanıcı sözleşmesini onaylamadan kayıt olamazsınız","Hata!")
  }
  }
  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      userName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],

    })
  }
  changeInputClass(text:string){
    if (text != "") {
      return "input-group input-group-outline is-valid my-3"
    }else{
      return "input-group input-group-outline is-invalid my-3"
    }
  }

}
