import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AddnewemployeePage } from "../pages/addnewemployee/addnewemployee";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CheckinPage } from "../pages/checkin/checkin";
import { AdminpanelPage } from "../pages/adminpanel/adminpanel";
import { Geolocation } from "@ionic-native/geolocation";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Uid } from '@ionic-native/uid';
import { Network } from "@ionic-native/network";
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CheckinPage,
    AddnewemployeePage,
    AdminpanelPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CheckinPage,
    AddnewemployeePage,
    AdminpanelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AndroidPermissions,
    Uid,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
   
  ]
})
export class AppModule {}
