import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ServiceService } from 'src/app/services/service.service';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-pdfex',
  templateUrl: './pdfex.component.html',
  styleUrls: ['./pdfex.component.css']
})
export class PdfexComponent implements OnInit {
 user$:any[]=[];
;
 @ViewChild('content',{static:true}) el!:ElementRef
  constructor(
    private service:ServiceService
  ) { }

  ngOnInit(): void {
    this.service.getalldata().subscribe(data=>{
      this.user$=data.map(e=>{
        return {
          id:e.payload.doc['id'],
          fname: e.payload.doc.data()['fullname'],
          gtype: e.payload.doc.data()['gtype'],
          imgurl: e.payload.doc.data()['imgurl'],
          mno: e.payload.doc.data()['mno'],
          email: e.payload.doc.data()['email'],
          registrationdate: e.payload.doc.data()['createdate'],
          registrationtime: e.payload.doc.data()['createtime']
        }
      });
  });

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
