import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private cookieservice:CookieService) { }

  ngOnInit(): void {
    if(this.cookieservice.get('username')){
      this.cookieservice.deleteAll();
    }
   
  }

}
