import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import 'hammerjs';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.page.html',
    styleUrls: ['./skills.page.scss'],
})
export class SkillsPage implements OnInit {
    skills: any = [];
    activeSkills: any = {};
    swipeI: any = null;
    next: any = false;
    cats: any;

    constructor(public router: Router, public storage: Storage, public http: HttpClient) {
    }

    ngOnInit() {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        this.http.get('http://127.0.0.1:3000/positions', {})
            .subscribe(data => {
                this.skills = data;
                let that = this;
                this.storage.get('jobId').then((jobId) => {
                    console.log(jobId);
                    this.activeSkills = that.skills.find((position) => position.id === jobId);
                    console.log(this.activeSkills);
                    this.cats = _.groupBy(data, 'category')[this.activeSkills.category];

                });

            }, errorResp => {
                console.log(errorResp);
            });

    }

    onClick(): void {
        this.storage.ready().then(() => {
            let skillId = [];
            this.activeSkills.skills.forEach(function(item) {
                skillId.push(item.id);
            });
            this.storage.set('skillId', skillId).then(() => {
                this.router.navigate(['/tags']);
            });
        });
    }

    swipeEvent(e) {
        if (e.target.closest('.swipe')) {
            if (e.deltaX < -100) {
                if (this.swipeI !== null) {
                    this.activeSkills.skills.splice(this.swipeI, 1);
                }
            }
            if (e.deltaX > 100) {
                if (this.swipeI !== null) {
                    this.activeSkills.skills[this.swipeI].check = true;
                }
            }
            let check = 0;
            this.activeSkills.skills.forEach(function(item) {
                if (item.check) {
                    check++;
                }
            });
            if (this.activeSkills.skills.length == check) {
                this.next = true;
            }
        }
    }

    swipePan(e, index) {
        this.swipeI = index;
        e.target.style.transition = '0s';
        e.target.style.left = e.deltaX + 'px';
    }

    swipeEnd(e) {
        e.target.style.transition = '0.3s';
        e.target.style.left = '0px';
        this.swipeI = null;
    }

}
