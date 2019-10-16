import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  select: any;
  goal: any;
  goals: any;

  constructor(
    public router: Router,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController
  ) {
    this.goal = null;
    this.goals = [
      {id: 0, name: 'Goal 1', tasks: [{id: 0, name: 'Task 1', rate: 'bad'},{id: 1, name: 'Task 2', rate: 'good'}]},
      {id: 1, name: 'Goal 2', tasks: [{id: 0, name: 'Task 1', rate: 'good'},{id: 1, name: 'Task 2', rate: 'bad'}]},
      {id: 2, name: 'Goal 3', tasks: [{id: 0, name: 'Task 1', rate: 'good'},{id: 1, name: 'Task 2', rate: 'bad'}]},
    ];
  }

  ngOnInit() {
  }

  goalSet(goal) {
    if (this.goal != goal) {
      this.goal = goal;
    } else {
      this.goal = null;
    }
  }

  async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Select One',
        buttons: [{
          text: 'Goal 1',
          handler: () => {
            this.select = 'Goal 1';
            this.presentModal();
          }
        }, {
          text: 'Goal 2',
          handler: () => {
            this.select = 'Goal 2';
            this.presentModal();
          }
        }, {
          text: 'Goal 3',
          handler: () => {
            this.select = 'Goal 3';
            this.presentModal();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }]
      });
      await actionSheet.present();
    }

    async presentModal() {
      const modal = await this.modalController.create({
        component: ModalPage,
        componentProps: {
          select: this.select,
        }
      });

      modal.onDidDismiss().then((result) => {
        console.log(result);
      });

      return await modal.present();
    }

    home () {
      this.router.navigate(['/main']);
    }

    explore () {
      this.router.navigate(['/explore']);
    }

    collect () {
      this.router.navigate(['/collect']);
    }

    user () {
      this.router.navigate(['/user']);
    }

    more () {
      this.router.navigate(['/more']);
    }    
}
