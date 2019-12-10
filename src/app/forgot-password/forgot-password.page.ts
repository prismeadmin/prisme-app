import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: [
    './styles/forgot-password.page.scss'
  ]
})

export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  success: any = false;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ]
  };

  constructor(
    public router: Router,
    public menu: MenuController,
    public http: HttpClient,
  ) {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('vj.foenix@gmail.com', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  back(): void {
    this.router.navigate(['/auth/login']);
  }

  recoverPassword(): void {
    let that = this;
    const postData = {
        'email': 'vj.foenix@gmail.com',
        'password': '1',
        'firstName': '1',
        'lastName': '1',
        'active': false,
        'secretToken': '1'
    };
    this.http.post(environment.url + '/users/forgot', postData, {})
    .subscribe((data: any) => {
      that.success = true;
      console.log(data);
    }, errorResp => {
      console.log(errorResp);
    });
  }

}
