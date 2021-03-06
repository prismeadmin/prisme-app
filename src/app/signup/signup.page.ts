import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalController, MenuController} from '@ionic/angular';

import {TermsOfServicePage} from '../terms-of-service/terms-of-service.page';
import {PrivacyPolicyPage} from '../privacy-policy/privacy-policy.page';
import {PasswordValidator} from '../validators/password.validator';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: [
        './styles/signup.page.scss'
    ]
})
export class SignupPage implements OnInit {
    signupForm: FormGroup;
    matching_passwords_group: FormGroup;

    validation_messages = {
        email: [
            {type: 'required', message: 'Email is required.'},
            {type: 'pattern', message: 'Enter a valid email.'}
        ],
        firstName: [
            {type: 'required', message: 'First Name  is required.'},
            {type: 'text', message: 'Enter a valid first name.'}
        ],
        lastName: [
            {type: 'required', message: 'Last Name is required.'},
            {type: 'text', message: 'Enter a valid last name.'}
        ],
        password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Password must be at least 5 characters long.'}
        ],
        confirm_password: [
            {type: 'required', message: 'Confirm password is required'}
        ],
        matching_passwords: [
            {type: 'areNotEqual', message: 'Password mismatch'}
        ]
    };
    error: any;

    constructor(
        public router: Router,
        public modalController: ModalController,
        public menu: MenuController,
        public http: HttpClient
    ) {
        this.matching_passwords_group = new FormGroup({
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required
            ])),
            confirm_password: new FormControl('', Validators.required)
        }, (formGroup: FormGroup) => {
            return PasswordValidator.areNotEqual(formGroup);
        });

        this.signupForm = new FormGroup({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            matching_passwords: this.matching_passwords_group
        });
    }

    ngOnInit(): void {
        this.menu.enable(false);
    }

    async showTermsModal() {
        const modal = await this.modalController.create({
            component: TermsOfServicePage
        });
        return await modal.present();
    }

    async showPrivacyModal() {
        const modal = await this.modalController.create({
            component: PrivacyPolicyPage
        });
        return await modal.present();
    }

    doSignup(): void {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const postData = {
            'email': this.signupForm.get('email').value,
            'password': this.signupForm.value.matching_passwords.password,
            'firstName': this.signupForm.get('firstName').value,
            'lastName': this.signupForm.get('lastName').value
        };
        this.http.post(environment.url + '/users/signup', postData, {})
            .subscribe(data => {
                console.log(data);
                this.router.navigate(['/auth/login']);
            }, errorResp => {
                this.error = errorResp.error.error;
            });
        // console.log('ss', this.signupForm.value);
        // console.log('do sign up');
        // this.router.navigate(['app/categories']);
    }

    doFacebookSignup(): void {
        console.log('facebook signup');
        this.router.navigate(['app/categories']);
    }

    doGoogleSignup(): void {
        console.log('google signup');
        this.router.navigate(['app/categories']);
    }

    doTwitterSignup(): void {
        console.log('twitter signup');
        this.router.navigate(['app/categories']);
    }
}
