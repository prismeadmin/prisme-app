import { Component, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

@Component({
  selector: 'modal-page',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})

export class ModalPage {

  goal: any;
  goals: any;

  constructor(
    private modalController: ModalController,
    private storage: Storage,
    private http: HttpClient,
  ){
    this.goal = null;
    this.goals = [
      {id: 0, name: 'Goal 1', tasks: [{id: 0, name: 'Task 1', rate: 'bad'},{id: 1, name: 'Task 2', rate: 'good'}]},
      {id: 1, name: 'Goal 2', tasks: [{id: 0, name: 'Task 1', rate: 'good'},{id: 1, name: 'Task 2', rate: 'bad'}]},
      {id: 2, name: 'Goal 3', tasks: [{id: 0, name: 'Task 1', rate: 'good'},{id: 1, name: 'Task 2', rate: 'bad'}]},
    ];
    this.goals = [];
    let that = this;
    this.storage.get('token').then((val) => {
      this.http.get(environment.url + '/users/task?filter[where][user_id]=' + val + '&filter[where][status]=completed')
          .subscribe((data: any) => {
            data.forEach(function(item, index){
              let bool = true;
              that.goals.forEach(function(item2, index2){
                if (item2.name == item.category_id) {
                  bool = false;
                }
              })
              if (bool) {
                that.goals.push({id: index, name: item.category_id, tasks: []});
              }
            });
            that.goals.forEach(function(item, index){
              data.forEach(function(item2, index2){
                if (item.name == item2.category_id) {
                  that.goals[index].tasks.push({id: index2, name: item2.task_id, rate: item2.rate});
                }
              })
            })
          }, errorResp => {
              console.log(errorResp);
          });
    });    
  }

  goalSet(goal) {
    if (this.goal != goal) {
      this.goal = goal;
    } else {
      this.goal = null;
    }
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

}
