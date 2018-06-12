import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddnewemployeePage } from '../addnewemployee/addnewemployee';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { RequestOptions } from '@angular/http';
var headers = new HttpHeaders();
headers.append("Content-type", "application/json");
@IonicPage()
@Component({
  selector: 'page-adminpanel',
  templateUrl: 'adminpanel.html',
  
})
export class AdminpanelPage {
 // apiUrl = 'http://localhost:4000/attendencedetail';
  //attendenceapi= 'http://localhost:4000/attendencedetail';
  employeedata:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public httpClient: HttpClient,
    public http: HttpClient) {

      this.httpClient.get('http://localhost:4000/attendencedetail')
      .subscribe(data => {
        debugger
        this.employeedata = data;
        
        console.log('my data: ', data);
      });
  }

  
  addemployee()
  {
    this.navCtrl.push(AddnewemployeePage);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminpanelPage');
  }

}
