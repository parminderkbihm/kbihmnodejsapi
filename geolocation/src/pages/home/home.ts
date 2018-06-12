import { Component, ViewChild, ElementRef, } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';
import { CheckinPage } from '../checkin/checkin';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Uid } from '@ionic-native/uid';
import { Network } from "@ionic-native/network";
import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RequestOptions } from '@angular/http';
var headers = new HttpHeaders();
headers.append("Content-type", "application/json");

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;

  options: GeolocationOptions;
  currentPos: Geoposition;
  latitude: any;
  longitude: any;
  kbihmlatitude: any = 30.67612;
  kbihmlongitude: any = 76.7399696;
  distancebetweenuserandKBIHM: any;
  isInRange: boolean;
  IMEI: any;
  latitude1: any;
  currentdate: any;
  currentTime: any;
  date: any;
  employeeUrl = 'http://localhost:4000/employee';  //get employee dtaa
  attendanceurl = 'http://localhost:4000/addattendence';  //post sttendence
  checkattendanceurl = 'http://localhost:4000/attendencecheck'; //post check is login logout
  logintime: null;
  logouttime: null; 1234
  element: any;
  contentPost: any;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private uid: Uid,
    private network: Network,
    private alertCtrl: AlertController,
    public platform: Platform,
    public httpClient: HttpClient,
    public http: HttpClient) {

    this.getDistance(this.kbihmlatitude, this.kbihmlongitude);
   
  }

 

  openAdminPage() {
    this.navCtrl.push(CheckinPage);
  }

  getDistance(latitude1, longitude1) {

    this.options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
      this.currentPos = pos;
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      var earth_radius = 6371;
      var dLat = (this.latitude - latitude1) * Math.PI / 180;
      var dLon = (this.longitude - longitude1) * Math.PI / 180;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((latitude1) * Math.PI / 180) * Math.cos((this.latitude) * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.asin(Math.sqrt(a));
      var d = earth_radius * c;
      this.distancebetweenuserandKBIHM = d;
      this.isInRange = this.distancebetweenuserandKBIHM < (4);

      if (this.isInRange) {
        this.checkLoginLogoutTime();
        //this.getImei();
      }
    });
  }

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    )
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }
      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
    this.IMEI = this.uid.IMEI;
    alert(this.IMEI);
  }

  getTime() {
    this.date = new Date();
    this.currentdate = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
    this.currentTime = this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds();
  }

  LoginLogout(isLoginClicked: boolean) {
    this.getTime(); // send currentdate and currenttime parameters

    var EmployeeLoginDetails = {
      CurrentDate: this.currentdate, LoginTime: isLoginClicked ? this.currentTime : null,
      LogoutTime: !isLoginClicked ? this.currentTime : null, IMEI: '1234'
    };

    this.httpClient.post(this.attendanceurl, EmployeeLoginDetails, { headers: headers })
      .subscribe(res => {
        console.log(res);
        console.log("New changes");
        this.checkLoginLogoutTime()
      }, (err) => {
        console.log("error");
        console.log(err);
      });
  }

  checkLoginLogoutTime() {
    this.getTime(); // for check attendence date compare with currentdate
    var loggedInOutDetails = { CurrentDate: this.currentdate, IMEI: '1234' };
    this.httpClient.post(this.checkattendanceurl, loggedInOutDetails, { headers: headers })
      .subscribe(res => {
        if (res != null) {
          this.logintime = res[0].LoginTime;
          this.logouttime = res[0].LogoutTime;
        }
      }, (err) => {
        console.log("error :" + err);
      });
  }


}

