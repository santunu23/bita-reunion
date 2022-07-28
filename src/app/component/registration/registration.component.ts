import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { NgForm,FormBuilder,FormGroup, Validators,FormArray } from '@angular/forms';
import * as $ from 'jquery';
import { ServiceService } from 'src/app/services/service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessmessageComponent } from '../successmessage/successmessage.component';
import { ElementRef } from '@angular/core';
import { YourinvovementComponent } from './yourinvovement/yourinvovement.component';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // show !:string;
  // errorshow !:string;
  // fname !:string;
  // gtype !:string;
  // presentaddress!:string;
  // mno!:string;
  // emailid!:string;
  // img:any;
  // a:any;
  // ref:any;
  // task:any;
  // randomId= Math.random().toString(36).substring(2);
  // yourinvolvement:[];
   registrationForm:FormGroup;
   involvewithBITA:FormGroup;
  constructor(
    private firebaseservice:ServiceService,
    private asstorage:AngularFireStorage,
    private spinner:NgxSpinnerService,
    private dialog: MatDialog,
    private cookieservice:CookieService,
    private fb:FormBuilder

  ) { }

  ngOnInit(): void {
    this.registrationForm=this.fb.group({
      fullname:[null,Validators.required,Validators.minLength],
      gender:[null,Validators.required],
      address:[null,Validators.required,Validators.minLength],
      mno:[null,Validators.required,Validators.pattern,Validators.maxLength,Validators.minLength],
      email:[null,Validators.required,Validators.pattern],
      involvewithBITA:this.fb.group({
        tickets:this.fb.array([this.createField()],Validators.required)
              }) 
      
    })


  }
  // upload(event:Event){
  //   this.a=(event.target as HTMLInputElement).files[0];
  //   let reader=new FileReader();
  //   reader.readAsDataURL(this.a);
  //   reader.onload=()=>{
  //     this.img=reader.result
  //   };
  // }
// async onSubmit(form: NgForm){
//   this.spinner.show();
//   const getProjectInvovementdata=JSON.parse(this.cookieservice.get('yourinvolvement'));
//   if(this.a){
//     this.ref = this.asstorage.ref(this.randomId);
//     this.task = this.ref.put(this.a).then((res:any)=>{
//       if(res){
//       const downloadURL=this.ref.getDownloadURL().subscribe((url:any)=>{
//         URL=url;
//         if(URL.length>0){
//           let res={
//             fname :form.value.fname,
//             gtype:form.value. gtype,
//             email:form.value.emailid,
//             address:form.value.presentaddress,
//             mno:form.value.mno,
//             img:URL,
//             userid:this.randomId,
//             involvedata:getProjectInvovementdata
//           }
//           this.firebaseservice.submitnewmember(res).then(e=>{
//                 if(e){
//                   this.spinner.hide();
//                   this.dialog.open(SuccessmessageComponent);
//                    form.reset();
//                    this.img=""
//                 }else{
//                   this.spinner.hide();
//                 }
//               });
//           }
//       })
//       }
//       }).catch((error:any)=>{
//             console.log(error); 
//     })
//   } else {
//         this.spinner.hide();
//         form.reset();
//         alert("You forget to add your photo.")
//   }

//   }
  yourinvolvementdetails(){
    this.dialog.open(YourinvovementComponent,{
      width:'70%',
    });
  }
  onSubmit(){ }
  createField():FormGroup{
    return this.fb.group({
      name:[null,Validators.required],
      age:[null,Validators.required]
    })
  }
  get tickets():FormArray{
    return <FormArray>this.registrationForm.get('tickets')
  }
  deleteValue(i){
    this.tickets.removeAt(i);
  }
}
