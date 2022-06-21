import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HomeComponent } from './component/home/home.component';
import { LogoutComponent } from './component/logout/logout.component';


const routes: Routes = [
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
  {path:'registration',component:RegistrationComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
