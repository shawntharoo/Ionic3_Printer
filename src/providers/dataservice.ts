import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class dataService {

  data: any;
  constructor(public http: Http) {
    this.data = null;
  }

  getLoggedinUser(userData) {
    return new Promise(resolve => {
      this.http.post('http://localhost:8080/api/user' , userData)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getUserHardwares(currentUser) {
    return new Promise(resolve => {
      this.http.get('http://localhost:8080/api/hardwares' + currentUser.email)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      })
    })
  }

}