import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.page.html',
  styleUrls: ['./job-title.page.scss'],
})
export class JobTitlePage implements OnInit {

  constructor(public router: Router) {
    this.array = [
      {title: 'Job Title 1', id: 0},
      {title: 'Job Title 2', id: 1},
      {title: 'Job Title 3', id: 2}
    ];
  }

  ngOnInit() {
    console.log(this.modeKeys);
  }

  change(): void {
    localStorage.jobId = this.job;
    this.router.navigate(['/skills']);
  }

}
