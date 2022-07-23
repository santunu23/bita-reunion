import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  ref:any;
   task:any;
   randomId= Math.random().toString(36).substring(2);
  constructor(
    public db: AngularFirestore, 
    private asstorage:AngularFireStorage) { }

   submitnewmember(item:any){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let newdate = day + "/" + month + "/" + year;
     function formatAMPM(date:any) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
       return [newdate,strTime]
    }
            return this.db.collection('/bita-reunion').add({
              fname:item.fname,
              gtype:item.gtype,
              email:item.email,
              address:item.address,
              mno:item.mno,
              imgurl:item.img,
              randomid:item.userid,
              involvedata:item.involvedata.involvementarray,
              createdate:formatAMPM(new Date)[0],
              createtime:formatAMPM(new Date)[1]
           });
}
  getalldata(){
    return this.db.collection('bita-reunion').snapshotChanges();
  }
  searchadminuser(res){
    console.log(res);
    return this.db.collection('bita-reunion-adminuser',ref=> ref
    .where('uname','==',res.uname.toLowerCase())
    .where('upass','==',res.pword))
  .snapshotChanges()
  }
}
