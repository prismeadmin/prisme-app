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
      {title: 'Job Title 1', id: 0},
      {title: 'Job Title 2', id: 1},
      {title: 'Job Title 3', id: 2}
    ];
  }

  ngOnInit() {}

  change(): void {
    this.storage.ready().then(() => {
      this.storage.set('jobId', this.job);
      this.router.navigate(['/skills']);
    })
  }

}
