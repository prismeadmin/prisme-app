import { Component, Input } from '@angular/core';
import { ActionSheetController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'modal-example',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})

export class ModalPage {

  rate: any;
  @Input() select: any;
  task: any;
  tasks: any = [];
  defTasks: any;
  count: any = 1;

  constructor(
    private modalController: ModalController,
    public actionSheetController: ActionSheetController
  ){
    this.defTasks = {id: 0, name: 'Task 1', checked: false, select: false, tasks: [{text: 'Task 1', role: '1'},{text: 'Task 2', role: '2'},{text: 'Task 3', role: '3'}]};
    this.task = 0;
  }

  ngOnInit() { }

  rateSet(rate) {
    this.rate = rate;
  }

  async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Select One',
        buttons: this.defTasks.tasks,
      });
      await actionSheet.present();
      actionSheet.onWillDismiss().then((response:any) => {
        const defTasks = this.defTasks;
          defTasks.name = 'Taks ' + response.role;
        this.tasks.push(defTasks);
      });
  }

  async dismiss() {
    const result: Date = new Date();
    await this.modalController.dismiss(result);
  }

}
