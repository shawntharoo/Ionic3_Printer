import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { dataService } from '../../providers/dataservice';
import { loginService } from '../../providers/loginservice';
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

  constructor(public navCtrl: NavController, private http: Http, public dataservice : dataService, public loginservice : loginService) {
  }

  login(){
    this.dataservice.getLoggedinUser(this.user).then((loggeduser) => {
      if(loggeduser != null){
        if(loggeduser['email'] == this.user.email && loggeduser['password'] == this.user.password){
          this.loginservice.loggedinUser(loggeduser);
          this.navCtrl.push(TabsPage, {}, {animate: false});
        }
      }
      console.log(loggeduser);
    })
  }

}
