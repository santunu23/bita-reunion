import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ServiceService } from './../../services/service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 show;
 uname:any;
 upass:any;
 
  constructor(
    private cookieservice:CookieService,
    private router: Router,
    private service:ServiceService,
    private spineerservice:NgxSpinnerService
  ) { }
  ngOnInit() {
    if(this.cookieservice.get('username')) {
      this.router.navigateByUrl('updatedashboardforadmin');
    }else{
      this.cookieservice.delete('username');
   }
  }

  onSubmit(form:NgForm){
    this.spineerservice.show();
    let res={
      uname:form.value.uname,
      pword:form.value.upass,
    }
    this.service.searchadminuser(res).subscribe(result => {
      this.spineerservice.hide();
      console.log(result.length);
        if(result.length>0){
          this.cookieservice.set('username',form.value.uname,{expires:2,sameSite: 'Lax'});
          this.router.navigateByUrl('home');
        }else{
          this.show=true;
          form.reset();
        }
    });
  
  }

}
 