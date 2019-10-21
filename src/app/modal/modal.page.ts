import { Component, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

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
  ){
    this.goal = null;
    this.goals = [
      {id: 0, name: 'Goal 1', tasks: [{id: 0, name: 'Task 1', rate: 'bad'},{id: 1, name: 'Task 2', rate: 'good'}]},
      {id: 1, name: 'Goal 2', tasks: [{id: 0, name: 'Task 1', rate: 'good'},{id: 1, name: 'Task 2', rate: 'bad'}]},
      {id: 2, name: 'Goal 3', tasks: [{id: 0, name: 'Task 1', rate: 'good'},{id: 1, name: 'Task 2', rate: 'bad'}]},
    ];
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
