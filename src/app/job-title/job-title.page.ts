import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.page.html',
  styleUrls: ['./job-title.page.scss'],
})
export class JobTitlePage implements OnInit {
  jobs: any;
  select: any = false;
  select_option: any = 'Select';

  constructor(public router: Router, public storage: Storage) {
    this.jobs = [
      {title: 'Product', id: 1, text: 'sample job titles: product manager, product owner, product marketing manager, chief product officer, group product manager'},
      {title: 'Development', id: 2, text: 'sample job titles: software developer, full stack developer, engineer, backend developer, frontend developer, programmer'},
      {title: 'Analyze', id: 3, text: 'sample job titles: business analyst, QA analyst, business process analyst, IT business analyst, data analyst, business intelligence analyst, data scientist'},
    ];
  }

  ngOnInit() {}

  selectJob(jobId) {
    this.storage.ready().then(() => {
      this.storage.set('jobId', jobId).then(() => {
        this.router.navigate(['/skills']);
      })
    });
  }

}
