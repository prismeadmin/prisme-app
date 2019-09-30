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
    jobId: any;
    skills: any;
    swipeI: number = null;
    next: boolean = false;

    constructor(public router: Router, public storage: Storage) {
        this.jobId = 1;
        this.skills = [
            {
                title: 'Product', id: 1, text: 'sample job titles: product manager, product owner, product marketing manager, chief product officer, group product manager',
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
                title: 'Develop', id: 1, text: '12',
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
        ];

    }

    ngOnInit() {
        this.storage.get('jobId').then((value) => {
            this.jobId = value;
        });
    }

    onClick(): void {
        this.router.navigate(['/tags']);
    }

    swipeEvent(e) {
      if (e.target.closest('.swipe')) {
        if (e.deltaX < -100){
          console.log('left');
          if (this.swipeI !== null) {
            this.skills[this.jobId].skills.splice(this.swipeI, 1);
          }
        }
        if (e.deltaX > 100){
          if (this.swipeI !== null) {
            this.skills[this.jobId].skills[this.swipeI].check = true;
          }
        }
        let check = 0;
        this.skills[this.jobId].skills.forEach(function(item){
          if (item.check) check++;
        })
        if (this.skills[this.jobId].skills.length == check) this.next = true;
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
