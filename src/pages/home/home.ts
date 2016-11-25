import { Component } from '@angular/core';

import { NavController, Platform, AlertController } from 'ionic-angular';

import { BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  result: string = "";
  gotoWeb: boolean = false;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public alertCtrl: AlertController
  ) {
    this.platform.ready().then(() => {
      this.scan();
    }, (error) => {
      console.log(error);
    });
  }

  scan() {
    BarcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log(barcodeData);
      this.result = barcodeData.text;
      this.presentAlert(this.result);
    }, (err) => {
      // An error occurred
      console.log(err);
    });
  }

  private presentAlert(myAlert) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: myAlert,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
            this.scan();
          }
        }]
    });
    alert.present();
  }
}


