import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtilanlarComponent } from './components/atilanlar/atilanlar.component';
import { CihazTiplerComponent } from './components/cihaz-tipler/cihaz-tipler.component';
import { CihazlarComponent } from './components/cihazlar/cihazlar.component';
import { DosyaTiplerComponent } from './components/dosya-tipler/dosya-tipler.component';

import { EmanetlerComponent } from './components/emanetler/emanetler.component';

import { GorusmelerComponent } from './components/gorusmeler/gorusmeler.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SehirlerComponent } from './components/sehirler/sehirler.component';
import { UrunlerComponent } from './components/urunler/urunler.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard] },

  { path: 'dosyaTipler', component: DosyaTiplerComponent, canActivate: [LoginGuard] },
  { path: 'cihazTipler', component:CihazTiplerComponent, canActivate: [LoginGuard] },
  { path: 'gorusmeler', component: GorusmelerComponent, canActivate: [LoginGuard] },
  { path: 'sehirler', component: SehirlerComponent, canActivate: [LoginGuard] },
  { path: 'user', component: UserComponent, canActivate: [LoginGuard] },
  { path: 'urunler', component: UrunlerComponent, canActivate: [LoginGuard] },
  { path: 'cihazlar', component: CihazlarComponent, canActivate: [LoginGuard] },
  { path: 'atillar', component: AtilanlarComponent, canActivate: [LoginGuard] },
  { path: 'emanetler', component: EmanetlerComponent, canActivate: [LoginGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
