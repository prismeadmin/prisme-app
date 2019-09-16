import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss'],
})
export class SkillsPage implements OnInit {

  constructor(public router: Router) {
    this.jobId = localStorage.jobId;
    this.skills = [
      {title: 'Job Title 1', id: 0, skills:[{title: 'Programming'},{title: 'Problem Solving'}]},
      {title: 'Job Title 2', id: 1, skills:[{title: 'Programming'},{title: 'Problem Solving'}]},
      {title: 'Job Title 3', id: 2, skills:[{title: 'Programming'},{title: 'Problem Solving'}]}
    ];
  }

  ngOnInit() {
    if(!localStorage.jobId) {
      this.router.navigate(['/job-title']);
    }
  }

  ngOnDestroy() {
    if (localStorage.jobId) {
      localStorage.removeItem('jobId');
    }
  }

  onClick(): void {
    this.router.navigate(['/tags']);
  }

}
