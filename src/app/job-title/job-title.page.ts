import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.page.html',
  styleUrls: ['./job-title.page.scss'],
})
export class JobTitlePage implements OnInit {
  job: any;
  array: any;

  constructor(public router: Router, public storage: Storage) {
    this.array = [
      {title: 'Product Manager', id: 1},
      {title: 'Product Owner', id: 2},
      {title: 'Product Marketing Manager', id: 3},
      {title: 'Chief Product Officer', id: 4},
      {title: 'Group Product Manager', id: 5},
      {title: 'Software Developer', id: 6},
      {title: 'Full Stack Developer', id: 7},
      {title: 'Engineer', id: 8},
      {title: 'Backend Developer', id: 9},
      {title: 'Frontend Developer', id: 10},
      {title: 'Web Developer', id: 11},
      {title: 'Programmer', id: 12}

    ];
  }

  ngOnInit() {}

  change(): void {
    this.storage.ready().then(() => {
      this.storage.set('jobId', this.job);
      this.router.navigate(['/skills']);
    });
  }

}

