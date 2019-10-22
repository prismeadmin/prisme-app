import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.page.html',
    styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

    task: any;
    defTasks: any;
    strings: any;
    days: any;

    time: any;
    rand: any;
    animate: any = false;

    boneDef: any = 1;
    boneCount: any = 1;
    boneDisabled: any = true;
    boneInterval = 800;
    boneTimeout: any = 4000;
    boneAnimate: any = false;

    boneTextDef = 1;
    boneTextCount = 1;
    boneTextDisabled: any = false;
    boneTextInterval: any = 200;
    boneTextTimeout: any = 4000;

    constructor(
        public router: Router,
        public actionSheetController: ActionSheetController,
        public modalController: ModalController
    ) {
        this.defTasks = [{text: 'Task 1', role: '1', checked: false}, {text: 'Task 2', role: '2', checked: false}, {
            text: 'Task 3',
            role: '3',
            checked: false
        }];
        this.task = {type: {name: 'Goal', checked: false}, rate: '', task: {}};
        this.days = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6}];
        this.strings = [{value: 1, name: 'Learn'}, {value: 2, name: 'Refine'}, {value: 3, name: 'Action'}, {
            value: 4,
            name: 'Social'
        }, {value: 5, name: 'Fun'}, {value: 6, name: 'Wild Card'}];
    }

    ngOnInit() {
    }

    randMath(bone) {
        this.boneAnimate = true;
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
            }, that.boneTextTimeout);
        }
    }

    clickBone() {
        const that = this;
        if (that.boneDisabled) {
            that.animate = true;
            that.boneDisabled = false;
            that.time = setInterval(function() {
                that.boneCount = that.randMath(that.boneCount);
            }, that.boneInterval);
            setTimeout(function() {
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
        actionSheet.onWillDismiss().then((response: any) => {
            this.clickBone();
            this.defTasks.forEach(function(item) {
                if (item.role == response.role) {
                    that.task.task = {text: item.text, role: item.role, checked: false};
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
