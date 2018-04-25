import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { dataService } from '../../providers/dataservice';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private http: Http, public dataservice : dataService) {
    this.dataservice.getItems().then((res) => {
      console.log(res);
    })
  }

  login(){
    this.navCtrl.push(TabsPage, {}, {animate: false});
  }

}
