import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss'],
})
export class SkillsPage implements OnInit {
  jobId: any;
  skills: any;

  constructor(public router: Router, public storage: Storage) {
    this.jobId = 1;
    this.skills = [
      {title: 'Job Title 1', id: 0, skills:[{title: 'Programming'},{title: 'Problem Solving'}]},
      {title: 'Job Title 2', id: 1, skills:[{title: 'Programming'},{title: 'Problem Solving'}]},
      {title: 'Job Title 3', id: 2, skills:[{title: 'Programming'},{title: 'Problem Solving'}]}
    ];
  }

  ngOnInit() {
    this.storage.get('jobId').then((value) => {
      console.log(value);
      this.jobId = value;
    });
  }

  onClick(): void {
    this.router.navigate(['/tags']);
  }

}
