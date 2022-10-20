import { NgModule , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { APP_BASE_HREF, CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { EmanetlerComponent } from './components/emanetler/emanetler.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EmanetlerPipe } from './pipe/emanetler.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EmanetFilterPipe } from './pipe/emanet-filter.pipe';

import { AtilanlarComponent } from './components/atilanlar/atilanlar.component';

import { StoklarComponent } from './components/stoklar/stoklar.component';
import { GorusmelerComponent } from './components/gorusmeler/gorusmeler.component';
import { CihazlarComponent } from './components/cihazlar/cihazlar.component';
import { CihazlarPipe } from './pipe/cihazlar.pipe';
import { UrunlerComponent } from './components/urunler/urunler.component';
import { UrunlerPipe } from './pipe/urunler.pipe';
import { UserComponent } from './components/user/user.component';
import { UserPipe } from './pipe/user.pipe';
import { SehirlerComponent } from './components/sehirler/sehirler.component';
import { CihazTiplerComponent } from './components/cihaz-tipler/cihaz-tipler.component';
import { CihazTipPipe } from './pipe/cihaz-tip.pipe';
import { DosyaTiplerComponent } from './components/dosya-tipler/dosya-tipler.component';
import { AtilPipe } from './pipe/atillar.pipe';

import { DosyaTiplerPipe } from './pipe/dosya-tipler.pipe';

import { DosyalarPipe } from './pipe/dosyalar.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    SidenavComponent,
    EmanetlerComponent,
    EmanetlerPipe,
    EmanetFilterPipe,


    AtilanlarComponent,

    StoklarComponent,
    GorusmelerComponent,
    CihazlarComponent,
    CihazlarPipe,
    UrunlerComponent,
    UrunlerPipe,
    UserComponent,
    UserPipe,
    SehirlerComponent,

    CihazTiplerComponent,
     CihazTipPipe,
     DosyaTiplerComponent,
     AtilPipe,

     DosyaTiplerPipe,
     DosyalarPipe,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
   NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      progressBar :true,
      closeButton:true

    })
  ],
 schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide :'apiUrl',useValue:'https://localhost:44393/api/'},
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
