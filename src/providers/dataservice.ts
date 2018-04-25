import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class dataService {

  data: any;
  constructor(public http: Http) {
    this.data = null;
    this.getItems();
  }


  getItems() {
    return new Promise(resolve => {
      this.http.get('http://localhost:8080/api/items')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}