import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminpanelPage } from '../adminpanel/adminpanel';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RequestOptions } from '@angular/http';
var headers = new HttpHeaders();
headers.append("Content-type", "application/json");

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',

})
export class CheckinPage {
  pos: any;
  currentlati: any;
  currentlongi: any;
  admin = { LoginId: '', Password: '' };
  apiUrl = 'http://localhost:4000/admin';
 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public http: HttpClient) {


  }

  ionViewDidLoad() {
    console.log('AdminLogin');
  }

  logForm(admin) {
    console.log(this.admin);

    this.httpClient.post(this.apiUrl, this.admin, { headers: headers })
      .subscribe(res => {
        debugger
        if (res) {
          this.navCtrl.push(AdminpanelPage);
        }
        else {
          console.log(res);
          console.log('Invalid User');
        }
      }, (err) => {
        console.log(err);
      });

  }
}
