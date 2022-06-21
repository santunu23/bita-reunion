import { CookieService } from 'ngx-cookie-service';
import { ServiceService } from './../../services/service.service';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import { Base64 } from 'js-base64';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user$:any[]=[];
  totalregistration:number;
  gmale:number=0;
  gfemale:number=0;
  

  constructor(
    private service:ServiceService,
    private cookieservice:CookieService,
    private router:Router,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if(!this.cookieservice.get('username')){
      this.router.navigateByUrl('login');
    }else{
        this.service.getalldata().subscribe(data=>{
          this.user$=data.map(e=>{
            return {
              id:e.payload.doc['id'],
              fname: e.payload.doc.data()['fname'],
              gtype: e.payload.doc.data()['gtype'],
              imgurl: e.payload.doc.data()['imgurl'],
              mno: e.payload.doc.data()['mno'],
              email: e.payload.doc.data()['email'],
              registrationdate: e.payload.doc.data()['createdate'],
              registrationtime: e.payload.doc.data()['createtime']
            }
          });
          this.totalregistration=this.user$.length;
          this.user$.forEach(e=>{
              if(e.gtype==="Male"){
                 this.gmale++;
              }else{
                this.gfemale++;
              }
          })
        });
     

    }

  }
downloadpdf(){
  if(this.user$.length>0){
    const doc=new jsPDF();
       this.user$.forEach(e=>{
                      doc.text("Name: "+e.fname,50,40);
                      doc.text("Mobile No: "+e.mno,50,50);
                      doc.text("Email: "+e.email,50,60);
                      doc.text("Gender: "+e.gtype,50,70);
                      doc.text("Registration Date:"+e.registrationdate,50,80);
                      doc.addPage();
         });
    doc.save("bita-reunion.pdf");
  }else{
    alert('Check your internet connection')
  }

    console.log(this.user$.length);


    // doc.addImage();
   
   
  }

  downloadxml( json: any[],excelFileName: string):void{
    console.log(this.user$);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
  fileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
}
}
