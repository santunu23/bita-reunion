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
  // yourinvolvement:[];

    img:any;
    a:any;
    ref:any;
    task:any;
   randomId= Math.random().toString(36).substring(2);
   registrationForm:FormGroup;

  constructor(
    private firebaseservice:ServiceService,
    private asstorage:AngularFireStorage,
    private spinner:NgxSpinnerService,
    private dialog: MatDialog,
    private cookieservice:CookieService,
    private fb:FormBuilder,
) { }

  ngOnInit(): void {
    this.registrationForm=this.fb.group({
      fullname:[null,[Validators.required,Validators.minLength(3)]],
      gender:[null,[Validators.required]],
      address:[null,[Validators.required,Validators.minLength(3)]],
      mno:[null,[Validators.required,Validators.pattern,Validators.minLength(10),Validators.maxLength(11)]],
      email:[null,[Validators.required,Validators.pattern]],
      tickets:this.fb.array([this.createProjectname()],[Validators.required])
   })
  }
  upload(event:Event){
    this.a=(event.target as HTMLInputElement).files[0];
    let reader=new FileReader();
    reader.readAsDataURL(this.a);
    reader.onload=()=>{
      this.img=reader.result
    };
  }
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

  submitData(){
   if(this.registrationForm.status=='VALID'){
      this.spinner.show();
       if(this.a){
          this.ref = this.asstorage.ref(this.randomId);
          this.task = this.ref.put(this.a).then((res:any)=>{
            if(res){
            const downloadURL=this.ref.getDownloadURL().subscribe((url:any)=>{
              URL=url;
              if(URL.length>0){
                let res={
                  fullname :this.registrationForm.value['fullname'],
                  gtype:this.registrationForm.value['gender'],
                  email:this.registrationForm.value['email'],
                  address:this.registrationForm.value['address'],
                  mno:this.registrationForm.value['mno'],
                  img:URL,
                  userid:this.randomId,
                  projectinvolvement:this.registrationForm.value['tickets']
                }
                this.firebaseservice.submitnewmember(res).then(e=>{
                      if(e){
                        this.spinner.hide();
                        this.dialog.open(SuccessmessageComponent);
                        // form.reset();
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
              // form.reset();
              alert("You forget to add your photo.")
        }
    }
   }
  addData(){
    this.tickets.push(this.createProjectname());
  }
  createProjectname():FormGroup{
    return this.fb.group({
      pname:[null,[Validators.required]],
      jdate:['',[Validators.required,Validators.pattern]],
      rdate:['',[Validators.required,Validators.pattern]]
    })
  }
  get tickets():FormArray{
    return <FormArray>this.registrationForm.get('tickets')
  }
  deleteValue(i){
    this.tickets.removeAt(i);
  }
}
