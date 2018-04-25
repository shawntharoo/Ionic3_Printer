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
  user = {
    email : '',
    password : ''
  }

  constructor(public navCtrl: NavController, private http: Http, public dataservice : dataService) {
  }

  login(){
    this.dataservice.getLoggedinUser(this.user).then((loggeduser) => {
      
    })
    //this.navCtrl.push(TabsPage, {}, {animate: false});
  }

}
