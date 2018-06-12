import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';
var headers = new HttpHeaders();
headers.append("Content-type", "application/json");

@IonicPage()
@Component({
  selector: 'page-addnewemployee',
  templateUrl: 'addnewemployee.html',
})
export class AddnewemployeePage {
addemployee={Fullname:'',Email:'',IMEI:'',JoiningDate:''};
apiUrl = 'http://localhost:4000/employee';

constructor(public navCtrl: NavController,
   public navParams: NavParams ,
   public httpClient: HttpClient,
  public http: HttpClient,
  private toastCtrl: ToastController) {
  }
  
  NewUserForm(addemployee){
    console.log(this.addemployee);
    return this.httpClient.post(this.apiUrl, this.addemployee, { headers: headers })
    .subscribe(res => {
      console.log(res);
      console.log("New Employee Added !!!!!!!!!");
      this.addemployee.Fullname  = '';
      this.addemployee.Email = '';
      this.addemployee.IMEI = '';
      this.addemployee.JoiningDate = '';
      this.presentToast()
          }, (err) => {
      console.log(err);
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Employee was added successfully',
      duration: 3000,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
    toast.present();
  }

}
