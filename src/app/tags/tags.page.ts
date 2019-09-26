import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.page.html',
    styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {

    tags: any;

    constructor(public router: Router,) {
    }

    ngOnInit() {

    }

    save() {
        this.router.navigate(['/main']);
    }
}
