import { Component, Input } from '@angular/core';
import { ActionSheetController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'modal-example',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})

export class ModalPage {

  @Input() select: any = 'Select';
  task: any;
  defTasks: any;
  defBone: any = 4;
  bone: any = 6;
  time: any;
  rand: any;
  animate: any = false;
  boneIteral = false;

  constructor(
    private modalController: ModalController,
    public actionSheetController: ActionSheetController
  ){
    this.defTasks = [{text: 'Task 1', role: '1', checked: false},{text: 'Task 2', role: '2', checked: false},{text: 'Task 3', role: '3', checked: false}];
    this.task = {type: {name: this.select, checked: false}, rate: '', task: {}};
  }

  ngOnInit () {}

  randMath () {
    const rand = Math.floor(1 + Math.random() * (6 + 1 - 1));
    if (rand == this.bone) {
      return this.randMath();
    } else {
      return rand;
    }
  }

  startBone () {
    const that = this;
    if (!that.boneIteral) {
      that.boneIteral = true;
      that.animate = true;
      that.time = setInterval(function(){
        that.bone = that.randMath();
        console.log(that.bone);
      },200);
      setTimeout(function(){
        clearInterval(that.time);
        that.bone = that.defBone;
        that.animate = false;
      }, 4000);
    }
  }

  rateSet(rate) {
    this.task.rate = rate;
  }

  async presentActionSheet() {
    const that = this;
    const actionSheet = await this.actionSheetController.create({
      header: 'Select One',
      buttons: this.defTasks,
    });
    await actionSheet.present();
    actionSheet.onWillDismiss().then((response:any) => {
      this.defTasks.forEach(function(item){
        if (item.role == response.role) {
          that.task.task = {text: item.text, role: item.role, checked: false};
        }
      });
    });
  }

  async dismiss() {
    await this.modalController.dismiss(this.task);
  }

}
