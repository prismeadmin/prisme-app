import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import 'hammerjs';

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


    constructor(public router: Router, public storage: Storage) {
        this.skills = [
            {
                title: 'Product', id: 1, text: 'Product',
                skills: [
                    {title: 'Analytical', id: 1, check: false},
                    {title: 'Active Listening', id: 2, check: false},
                    {title: 'Collaboration', id: 3, check: false},
                    {title: 'Negotiating', id: 4, check: false},
                    {title: 'Teamwork', id: 5, check: false},
                    {title: 'Communication', id: 6, check: false},
                    {title: 'Problem Solving', id: 7, check: false}
                ]
            },
            {
                title: 'Develop', id: 2, text: 'Develop',
                skills: [
                    {title: 'Analytical', id: 1, check: false},
                    {title: 'Active Listening', id: 2, check: false},
                    {title: 'Collaboration', id: 3, check: false},
                    {title: 'Negotiating', id: 4, check: false},
                ]
            },
        ];

    }

    ngOnInit() {
        this.storage.get('jobId').then((jobId) => {
          this.activeSkills = this.skills.filter(function(item){
            if (jobId == item.id) return item;
          });
          this.activeSkills = this.activeSkills[0];
        });
    }

    onClick(): void {
      this.storage.ready().then(() => {
        let skillId = [];
        this.activeSkills.skills.forEach(function(item){
          skillId.push(item.id);
        })
        this.storage.set('skillId', skillId).then(() => {
          this.router.navigate(['/tags']);
        })
      });
    }

    swipeEvent(e) {
      if (e.target.closest('.swipe')) {
        if (e.deltaX < -100){
          if (this.swipeI !== null) {
            this.activeSkills.skills.splice(this.swipeI, 1);
          }
        }
        if (e.deltaX > 100){
          if (this.swipeI !== null) {
            this.activeSkills.skills[this.swipeI].check = true;
          }
        }
        let check = 0;
        this.activeSkills.skills.forEach(function(item){
          if (item.check) check++;
        })
        if (this.activeSkills.skills.length == check) this.next = true;
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
