import { Component, OnInit } from '@angular/core';
import {FormControl, 
  FormGroup,
  FormBuilder,
  FormArray,
  Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-yourinvovement',
  templateUrl: './yourinvovement.component.html',
  styleUrls: ['./yourinvovement.component.css']
})

export class YourinvovementComponent implements OnInit {
  projectinvovementForm:FormGroup;
constructor(private fb:FormBuilder,
    private dialogRef:MatDialog,
    private cookieservice:CookieService) { }
  ngOnInit(): void {
    this.projectinvovementForm=this.fb.group({
      involvementarray:this.fb.array([this.createDatafield()],Validators.required)
    });
    this.cookieservice.delete("yourinvolvement");
  }
  addMore(){
    this.involvementarray.push(this.createDatafield());
  }
  submitprojectinvovement(){
   if(this.projectinvovementForm.status=='VALID'){
      console.log(this.projectinvovementForm.value);
      this.cookieservice.set("yourinvolvement",JSON.stringify(this.projectinvovementForm.value),{expires:2,sameSite: 'Lax'})
      this.dialogRef.closeAll();
    }
  }
  createDatafield():FormGroup{
    return this.fb.group({
      projectname:[null,Validators.required],
      start: [null,Validators.required],
      end: [null,Validators.required]
    })
  }
  get involvementarray():FormArray{
    return <FormArray>this.projectinvovementForm.get('involvementarray');
  }
  deleteValue(i){
    this.involvementarray.removeAt(i);
  }
}
