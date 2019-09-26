import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.page.html',
  styleUrls: ['./account-activation.page.scss'],
})
export class AccountActivationPage implements OnInit {
  loader: any='.';
  success: any=false;
  error: any=false;
  redirect: any=false;
  time: any;

  constructor(
    public router: Router,
    public http: HttpClient,
  ) { }

  ngOnInit() {
    let that = this;
    let queryDict = {email: null, token: null}
    location.search.substr(1).split("&").forEach(function(item) {
      queryDict[item.split("=")[0]] = item.split("=")[1];
    })
    if (queryDict.email == null || queryDict.token == null) {
      this.router.navigate(['/auth/login']);
    }
    this.time = setInterval(function(){
      if (that.loader == '...') that.loader = '';
      that.loader = that.loader + '.';
    },1000);

    const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
    const postData = {
      'email': queryDict.email,
      'password': queryDict.token,
    };
    this.http.post('http://prisme.free.beeceptor.com/', postData, {})
        .subscribe((data:any) => {
            that.success = true;
            that.redirect = true;
            setTimeout(function(){
              that.router.navigate(['/auth/login']);
            },2000);
        }, error => {
            that.error = true;
            that.redirect = true;
            setTimeout(function(){
              that.router.navigate(['/auth/login']);
            },2000);
        });
  }

}
