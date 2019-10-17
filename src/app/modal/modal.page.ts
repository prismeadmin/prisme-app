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

  time: any;
  rand: any;
  animate: any = false;

  boneDef: any = 1;
  boneCount: any = 1;
  boneDisabled: any = true;
  boneInterval = 200;
  boneTimeout: any = 4000;

  boneTextDef = 1;
  boneTextCount = 1;
  boneTextAnimate: any = true;
  boneTextDisabled: any = false;
  boneTextInterval: any = 200;
  boneTextTimeout: any = 4000;

  constructor(
    private modalController: ModalController,
    public actionSheetController: ActionSheetController
  ){
    this.defTasks = [{text: 'Task 1', role: '1', checked: false},{text: 'Task 2', role: '2', checked: false},{text: 'Task 3', role: '3', checked: false}];
    this.task = {type: {name: this.select, checked: false}, rate: '', task: {}};
  }

  ngOnInit () {}

  randMath (bone) {
    const rand = Math.floor(1 + Math.random() * (6 + 1 - 1));
    if (rand == bone) {
      return this.randMath(bone);
    } else {
      return rand;
    }
  }

  clickBoneText () {
    const that = this;
    that.boneTextAnimate = false;
    if (that.boneTextDisabled == false) {
      that.animate = true;
      that.boneTextDisabled = true;
      that.time = setInterval(function(){
        that.boneTextCount = that.randMath(that.boneTextCount);
      }, that.boneTextInterval);
      setTimeout(function(){
        clearInterval(that.time);
        that.boneTextCount = that.boneTextDef;
        that.animate = false;
      }, that.boneTextTimeout);
    }
  }

  clickBone () {
    const that = this;
    if (that.boneDisabled) {
      that.animate = true;
      that.boneDisabled = false;
      that.time = setInterval(function(){
        that.boneCount = that.randMath(that.boneCount);
      }, that.boneInterval);
      setTimeout(function(){
        clearInterval(that.time);
        that.boneTextCount = that.boneTextDef;
        that.animate = false;
      }, that.boneTimeout);
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
      this.clickBone();
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
