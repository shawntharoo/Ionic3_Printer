import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { PrintProvider } from '../../providers/print/print';
import { PrinterListModalPage } from '../printer-list-modal/printer-list-modal';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { loginService } from '../../providers/loginservice';
import { dataService } from '../../providers/dataservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedPrinter: any = [];
  items: any = ["asdas", "saff", "hdhfd", "zjndnf"];
  hardwares = [];
  myInput: any;
  hardware_details = {
    PayingType: '',
    myDate: '',
    check_no: '',
    bank_code: '',
    branch_code: '',
    checkDate: '',
    amount: ''
  };
  loggedInUser;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private printProvider: PrintProvider,
    private alertCtrl: AlertController,
    private printer: Printer,
    public loginservice: loginService,
    public dataservice: dataService) {

    this.loginservice.getLoggedinUser().then((loggedUser) => {
      this.loggedInUser = loggedUser;
      this.dataservice.getUserHardwares(this.loggedInUser).then((hardwares) => {
        this.items = hardwares;
      })
    })
    
  }

  listBTDevice() {
    let formattedData = "Hardware : " + this.myInput + "\nDate : \t" + this.hardware_details.myDate + "\nPayed Mathod : \t" + this.hardware_details.PayingType + "\nCheck Number : \t" + this.hardware_details.check_no + "\nBank Code : \t" + this.hardware_details.bank_code + "\nBranch Code : \t" + this.hardware_details.branch_code + "\nCheck Date : \t" + this.hardware_details.checkDate + "\nAmount : \t" + this.hardware_details.amount;

    console.log(formattedData);
    this.printProvider.searchBt().then(datalist => {
      let abc = this.modalCtrl.create(PrinterListModalPage, { data: datalist });
      abc.onDidDismiss(data => {
        this.selectedPrinter = data;
        this.testPrinter(this.hardware_details, this.myInput);
      });
      abc.present();
    }, err => {
      console.log("ERROR", err);
      let mno = this.alertCtrl.create({
        title: "ERROR " + err,
        buttons: ['Dismiss']
      });
      mno.present();
    })
  }

  testPrinter(hardware_details, hardware) {
    var id = this.selectedPrinter.id;
    if (id == null || id == "" || id == undefined) {
    }
    else {
      let foo = this.printProvider.testPrint(id, hardware_details, hardware);
      let xyz = this.alertCtrl.create({
        title: "Succes",
        buttons: ['Dismiss']
      });
      xyz.present();
    }
  }

  onInput(searchTerm) {
    this.hardwares = [];
    this.items.filter((item) => {
      if (item.toLowerCase().indexOf(searchTerm.target.value.toLowerCase()) > -1) {
        this.hardwares.push(item);
      }
    });
  }

  fillBox(selHard) {
    this.myInput = selHard;
    this.hardwares = null;
  }







  print() {
    var content = "test printing";
    this.printer.isAvailable().then(onSuccess => {
      let mno = this.alertCtrl.create({
        title: "success",
        buttons: ['Dismiss']
      });
      mno.present();
    }).catch(e => console.log("reject: " + e));

    let options: PrintOptions = {
      name: 'MyDocument',
      printerId: 'printer007',
      duplex: true,
      landscape: true,
      grayscale: true
    };

    this.printer.print(content, options).then(onSuccess => {
      let mno = this.alertCtrl.create({
        title: "success",
        buttons: ['Dismiss']
      });
      mno.present();
    }).catch(e => console.log("reject: " + e));
  }

  testConnectPrinter() {
    var id = this.selectedPrinter.id;
    if (id == null || id == "" || id == undefined) {
    }
    else {
      let foo = this.printProvider.connectBT(id).subscribe(data => {
        console.log("CONNECT SUCCESSFUL", data);

        let mno = this.alertCtrl.create({
          title: "Connect successful",
          buttons: ['Dismiss']
        });
        mno.present();

      }, err => {
        console.log("Not able to connect", err);
        let mno = this.alertCtrl.create({
          title: "ERROR " + err,
          buttons: ['Dismiss']
        });
        mno.present();
      });
    }
  }

}
