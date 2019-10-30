import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: [
        './styles/login.page.scss'
    ]
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;

    validation_messages = {
        'email': [
            {type: 'required', message: 'Email is required.'},
            {type: 'pattern', message: 'Enter a valid email.'}
        ],
        'password': [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Password must be at least 5 characters long.'}
        ]
    };

    constructor(
        public router: Router,
        public menu: MenuController,
        public http: HttpClient,
        public storage: Storage
    ) {
        this.loginForm = new FormGroup({
            'email': new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            'password': new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required
            ]))
        });
    }

    ngOnInit(): void {
        this.menu.enable(false);
    }

    doLogin(): void {
        console.log('do Log In');
        // this.router.navigate(['/job-title']);
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const postData = {
            'email': this.loginForm.get('email').value,
            'password': this.loginForm.get('password').value,
        };
        this.http.post(environment.url + '/users/login', postData, {})
            .subscribe((data: any) => {
                console.log(data);
                this.storage.ready().then(() => {
                    this.storage.set('token', data.token);
                    this.router.navigate(['/main']);
                });
                // this.router.navigate(['/job-title']);
            }, error => {
                console.log(error);
            });

    }

    goToForgotPassword(): void {
        console.log('redirect to forgot-password page');
    }

    doFacebookLogin(): void {
        console.log('facebook login');
        this.router.navigate(['app/categories']);
    }

    doGoogleLogin(): void {
        console.log('google login');
        this.router.navigate(['app/categories']);
    }

    doTwitterLogin(): void {
        console.log('twitter login');
        this.router.navigate(['app/categories']);
    }
}
