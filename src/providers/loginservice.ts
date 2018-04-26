import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class loginService {

  user: any;
  constructor(public http: Http) {
    this.user = null;
  }

  loggedinUser(userData) {
   this.user = userData;
  }

  getLoggedinUser() {
    return new Promise(resolve => {
      resolve(this.user);
    });
  }

}