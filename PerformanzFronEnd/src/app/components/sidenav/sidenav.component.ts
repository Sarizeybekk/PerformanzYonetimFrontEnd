import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  jwtHelper: JwtHelperService=new JwtHelperService;
  isAuthenticated:boolean;
  name :string;
  emanetUrl:string;

  constructor(
    private authService:AuthService,
    private toastr :ToastrService,
  private router:Router
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    // this.refresh();
  }
  changeClass(url:string){
this.emanetUrl=this.router.routerState.snapshot.url;
if (url==this.emanetUrl) {
return "nav-link text-white active bg-gradient-primary";
}
else{
  return "nav-link text-white"
}
  }

  // refresh(){
  //   if (this.isAuthenticated) {
  //     let accesstoken = localStorage.getItem("accestoken");
  //     let decode = this.jwtHelper.decodeToken(accesstoken);
  //     let name= Object.keys(decode).filter(x=> x.endsWith("/name"))[0];
  //     this.name = decode[name];
  //     console.log(decode);
  //   }

  // }
  logout(){
    localStorage.removeItem("accestoken");
    this.toastr.warning("Başarıyla çıkış yaptınız");
    this.router.navigate(["/login"]);
    this.isAuthenticated = false;
  }

}
