import { Injectable } from '@angular/core';
import {AlertController} from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Injectable()
export class PrintProvider {

  constructor(private btSerial:BluetoothSerial,private alertCtrl:AlertController) {
    
  }

  searchBt()
  {
    return this.btSerial.list();
  }

  connectBT(address)
  {
    return this.btSerial.connect(address);

  }

  testPrint(address, printData, hardware)
  {
    //printData="Test hello this is a test \n\n\n\n Hello Test 123 123 123\n\n\n"
    let formattedData = "Hardware : "+hardware +"\nDate : "+ printData.myDate + "\nPayed Mathod : " + printData.PayingType + "\nCheck Number : " + printData.check_no + "\nBank Code : " + printData.bank_code + "\nBranch Code : " + printData.branch_code + "\nCheck Date : " + printData.checkDate + "\nAmount : " + printData.amount;

    console.log(formattedData);
    
    let xyz=this.connectBT(address).subscribe(data=>{
      this.btSerial.write(formattedData).then(dataz=>{
        console.log("WRITE SUCCESS",dataz);
        let mno=this.alertCtrl.create({
          title:"Print SUCCESS!",
          buttons:['Dismiss']
        });
        mno.present();
        xyz.unsubscribe();
      },errx=>{
        console.log("WRITE FAILED",errx);
        let mno=this.alertCtrl.create({
          title:"Print ERROR "+errx,
          buttons:['Dismiss']
        });
        mno.present();
      });
      },err=>{
        console.log("CONNECTION ERROR",err);
        let mno=this.alertCtrl.create({
          title:"Connection ERROR "+err,
          buttons:['Dismiss']
        });
        mno.present();
      });

  }

}
