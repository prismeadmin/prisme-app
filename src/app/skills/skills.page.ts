import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import 'hammerjs';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.page.html',
    styleUrls: ['./skills.page.scss'],
})
export class SkillsPage implements OnInit {
    user_task_id: any;
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
        this.http.get(environment.url + '/positions', {})
        .subscribe(data => {
          this.skills = data;
          this.storage.get('jobId').then((jobId) => {
              this.activeSkills = this.skills.find((position) => position.id === jobId);
              this.cats = _.groupBy(data, 'category')[this.activeSkills.category];
          });
        }, errorResp => {
          console.log(errorResp);
        });
    }

    onClick(): void {
        this.storage.ready().then(() => {
            let skills = [];
            this.activeSkills.skills.forEach(function(item) {
                skills.push({id: item.id, name: item.name, check: false, balance: 0.00, experiences: []});
            });
            this.storage.get('token').then((token) => {
              const postData = {
                  'category_id': String(this.activeSkills.id),
                  'user_id': String(token),
                  'skills': skills
              };
              this.http.post(environment.url + '/users/skill/new', postData, {})
              .subscribe((data: any) => {
                if (data.id) {
                  this.user_task_id = data.id;
                }
              }, error => {
                console.log(error);
              });
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
