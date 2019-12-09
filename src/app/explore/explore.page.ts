import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';
import {environment} from '../../environments/environment';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {Header} from '@ionic/storage';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.page.html',
    styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

    user_task_id: any;
    task: any;
    defTasks: any;
    strings: any;
    days: any;

    time: any;
    rand: any;
    animate: any = false;
    taskTrue: any = false;

    boneDef: any = 1;
    boneCount: any = 1;
    boneDisabled: any = true;
    boneInterval = 500;
    boneTimeout: any = 4000;

    boneTextDef = 1;
    boneTextCount = 0;
    boneTextDisabled: any = false;
    boneTextInterval: any = 500;
    boneTextTimeout: any = 4000;

    valueTask: any = '';
    valueView: any = false;
    goal: any;
    task: any;

    constructor(
        public router: Router,
        public storage: Storage,
        public http: HttpClient,
        public actionSheetController: ActionSheetController,
        public modalController: ModalController
    ) {
        // this.defTasks = [{text: 'Task 1', role: '1', checked: false}, {text: 'Task 2', role: '2', checked: false}, {
        //     text: 'Task 3',
        //     role: '3',
        //     checked: false
        // }];
        this.task = {type: {name: 'Goal', checked: false}, rate: '', task: {}};
        this.days = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6}];
        this.strings = [
          {value: 1, name: 'Learn'},
          {value: 2, name: 'Refine'},
          {value: 3, name: 'Action'},
          {value: 4, name: 'Social'},
          {value: 5, name: 'Fun'},
          {value: 6, name: 'Wild Card'}
        ];
    }

    ngOnInit() {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        this.http.get(environment.url + '/goalList', {})
            .subscribe((data: any) => {
                const g = _.find(data, ['category', 'Refine']);
                this.defTasks = g.tasks.map((task) => {
                    task.text = task.name;
                    task.role = task.name;
                    return task;
                });
                this.defTasks.push({text: 'Add My Own', role: '2'});
            }, errorResp => {
                console.log(errorResp);
            });

        this.http.get(environment.url + '/positions', {})
            .subscribe((data: any) => {
                let that = this;
                this.storage.get('jobId').then((jobId) => {
                    that.goal = data.find((position) => position.id === jobId);
                });

            }, errorResp => {
                console.log(errorResp);
            });


        this.storage.get('token').then((val) => {
          this.http.get(environment.url + '/users/task?filter[where][user_id]=' + val + '&filter[where][status]=open')
              .subscribe((data: any) => {
                if (data[0]) {
                  let that = this;
                  this.user_task_id = data[0].id;
                  this.boneTextDisabled = true;
                  this.boneDisabled = true;
                  this.boneCount = data[0].days;
                  this.boneTextCount = data[0].task_type;
                  this.defTasks.forEach(function(item) {
                    if (item.role == data[0].task_id) {
                      that.task.task = {text: item.text, role: item.role, checked: false};
                    }
                  });
                } else {

                }
                console.log(data)
              }, errorResp => {
                  console.log(errorResp);
              });
        });

    }

    randMath(bone) {
        const rand = Math.floor(1 + Math.random() * (6 + 1 - 1));
        if (rand == bone) {
            return this.randMath(bone);
        } else {
            return rand;
        }
    }

    clickBoneText() {
        const that = this;
        if (that.boneTextDisabled == false) {
            that.animate = true;
            that.boneTextDisabled = true;

            that.time = setInterval(function() {
                that.boneTextCount = that.randMath(that.boneTextCount);
            }, that.boneTextInterval);

            setTimeout(function() {
                clearInterval(that.time);
                that.boneTextCount = that.boneTextDef;
                that.animate = false;
                that.taskTrue = true;
                that.boneDisabled = false;
            }, that.boneTextTimeout);
        }
    }

    clickBone() {
        const that = this;
        if (that.boneDisabled == false) {
            that.animate = true;
            that.boneDisabled = true;
            that.time = setInterval(function() {
                that.boneCount = that.randMath(that.boneCount);
            }, that.boneInterval);
            setTimeout(function() {
                clearInterval(that.time);
                that.boneCount = that.boneCount;
                that.animate = false;
                that.storage.get('token').then((val) => {
                  const postData = {
                      'category_id': String(that.goal.category),
                      'user_id': String(val),
                      'task_type': String(that.boneTextCount),
                      'task_id': String(that.task.task.role),
                      'status' : 'open',
                      'days' : String(that.boneCount),
                      'rate' : '',
                  };
                  that.http.post(environment.url + '/users/task/create', postData, {})
                    .subscribe((data: any) => {
                        if (data.id) {
                          that.user_task_id = data.id;
                        }
                      }, error => {
                        console.log(error);
                    });
                })
            }, that.boneTimeout);
        }
    }

    rateSet(rate) {
      let that = this;
      this.task.rate = rate;
      this.storage.get('token').then((val) => {
          const postData = {
              'user_id': String(val),
              'task_type': String(that.boneTextCount),
              'task_id': String(that.task.task.role),
              'status' : 'completed',
              'days' : String(that.boneCount),
              'rate' : String(that.task.rate),
          };
          that.http.patch(environment.url + '/users/task/' + that.user_task_id, postData, {})
            .subscribe((data: any) => {
                that.task = {type: {name: 'Goal', checked: false}, rate: '', task: {}};
                that.valueView = false;
                that.user_task_id =  null;
                that.boneDisabled = true;
                that.boneTextDisabled = false;
                that.boneTextCount = 0;
                that.animate = false;
                that.taskTrue = false;
                that.boneCount = 1;
                that.router.navigate(['/completed']);
              }, error => {
                console.log(error);
            });
        })
    }

    addTask() {
        if (this.valueTask != '') {
            this.task.task = {text: this.valueTask, role: 1, checked: false};
        }
    }

    async presentActionSheet() {
        const that = this;
        const actionSheet = await this.actionSheetController.create({
            header: 'Select One',
            buttons: this.defTasks,
        });
        await actionSheet.present();
        actionSheet.onWillDismiss().then((response: any) => {
            this.clickBone();
            this.defTasks.forEach(function(item) {
                if (item.role == 2) {
                    that.valueView = true;
                    that.taskTrue = false;
                } else {
                    if (item.role == response.role) {
                        that.task.task = {text: item.text, role: item.role, checked: false};
                    }
                }
            });
        });
    }

    async openModal() {
        const modal: HTMLIonModalElement = await this.modalController.create({
            component: ModalPage
        });

        modal.onDidDismiss().then((result) => {
            console.log(result);
        });

        return await modal.present();
    }

    home() {
        this.router.navigate(['/main']);
    }

    explore() {
        this.router.navigate(['/explore']);
    }

    collect() {
        this.router.navigate(['/collect']);
    }

    user() {
        this.router.navigate(['/user']);
    }

    more() {
        this.router.navigate(['/more']);
    }
}
