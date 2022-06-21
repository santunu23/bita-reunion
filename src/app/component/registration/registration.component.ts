import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { ServiceService } from 'src/app/services/service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessmessageComponent } from '../successmessage/successmessage.component';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  show !:string;
  errorshow !:string;
  fname !:string;
  gtype !:string;
  presentaddress!:string;
  mno!:string;
  emailid!:string;
  img:any;
  a:any;
  ref:any;
  task:any;
  randomId= Math.random().toString(36).substring(2);


  constructor(
    private firebaseservice:ServiceService,
    private asstorage:AngularFireStorage,
    private spinner:NgxSpinnerService,
    private dialog: MatDialog,
    private _elementRef:ElementRef
  ) { }

  ngOnInit(): void {
  }
  upload(event:Event){
    this.a=(event.target as HTMLInputElement).files[0];
    let reader=new FileReader();
    reader.readAsDataURL(this.a);
    reader.onload=()=>{
      this.img=reader.result
    };
  }
async onSubmit(form: NgForm){
  this.spinner.show();
  if(this.a){
    this.ref = this.asstorage.ref(this.randomId);
    this.task = this.ref.put(this.a).then((res:any)=>{
      if(res){
      const downloadURL=this.ref.getDownloadURL().subscribe((url:any)=>{
        URL=url;
        if(URL.length>0){
          let res={
            fname :form.value.fname,
            gtype:form.value. gtype,
            email:form.value.emailid,
            address:form.value.presentaddress,
            mno:form.value.mno,
            img:URL,
            userid:this.randomId
          }
          this.firebaseservice.submitnewmember(res).then(e=>{
                if(e){
                  this.spinner.hide();
                  this.dialog.open(SuccessmessageComponent);
                   form.reset();
                   this.img=""
                }else{
                  this.spinner.hide();
                }
              });
          }
      })
      }
      }).catch((error:any)=>{
            console.log(error); 
    })
  } else {
        this.spinner.hide();
        form.reset();
        alert("You forget to add your photo.")
  }

  }


}
