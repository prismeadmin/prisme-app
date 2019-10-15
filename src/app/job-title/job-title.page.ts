import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import Konva from 'konva';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.page.html',
  styleUrls: ['./job-title.page.scss'],
})
export class JobTitlePage implements OnInit {
  jobs: any;
  select: any = false;
  select_option: any = 'Select';

  stage: any;
  layer: any;
  poly1: any;
  poly2: any;
  poly3: any;
  poly4: any;
  poly5: any;
  poly6: any;
  poly7: any;
  poly8: any;
  poly9: any;
  poly10: any;
  poly11: any;
  poly12: any;
  poly13: any;
  poly14: any;
  poly15: any;

  constructor(public router: Router, public storage: Storage) {
    this.jobs = [
      {title: 'Product', id: 1, text: 'sample job titles: product manager, product owner, product marketing manager, chief product officer, group product manager'},
      {title: 'Development', id: 2, text: 'sample job titles: software developer, full stack developer, engineer, backend developer, frontend developer, programmer'},
      {title: 'Analyze', id: 3, text: 'sample job titles: business analyst, QA analyst, business process analyst, IT business analyst, data analyst, business intelligence analyst, data scientist'},
    ];
  }

  ngOnInit() {
    /*
    this.stage = new Konva.Stage({
        container: 'crystall',
        width: 100,
        height: 100
      });
    this.layer = new Konva.Layer();
    this.poly1 = new Konva.Line({points: [0, 5, 5, 0, 10, 5],fill: 'red',closed: true});
    this.poly2 = new Konva.Line({points: [9, 1, 18, 4, 13, 5],fill: 'red',closed: true});
    this.poly3 = new Konva.Line({points: [0, 6, 5, 15, 3, 27],fill: 'red',closed: true});
    this.poly4 = new Konva.Line({points: [0, 6, 12, 6, 6, 13],fill: 'red',closed: true});
    this.poly5 = new Konva.Line({points: [13, 7, 7, 15, 20, 17],fill: 'red',closed: true});
    this.poly6 = new Konva.Line({points: [6, 16, 13, 25, 5, 29],fill: 'red',closed: true});
    this.poly7 = new Konva.Line({points: [7, 16, 20, 19, 14, 23],fill: 'red',closed: true});
    this.poly8 = new Konva.Line({points: [15, 7, 20, 5, 35, 19, 35, 25, 22, 17],fill: 'red',closed: true});
    this.poly9 = new Konva.Line({points: [23, 20, 33, 26, 27, 32],fill: 'red',closed: true});
    this.poly10 = new Konva.Line({points: [21, 19, 25, 30, 15, 25],fill: 'red',closed: true});
    this.poly11 = new Konva.Line({points: [5, 31, 14, 26, 23, 31],fill: 'red',closed: true});
    this.poly12 = new Konva.Line({points: [8, 33, 25, 32, 31, 35],fill: 'red',closed: true});
    this.layer.add(this.poly1);
    this.layer.add(this.poly2);
    this.layer.add(this.poly3);
    this.layer.add(this.poly4);
    this.layer.add(this.poly5);
    this.layer.add(this.poly6);
    this.layer.add(this.poly7);
    this.layer.add(this.poly8);
    this.layer.add(this.poly9);
    this.layer.add(this.poly10);
    this.layer.add(this.poly11);
    this.layer.add(this.poly12);
    this.stage.add(this.layer);
    */
  }

  selectJob(jobId) {
    this.storage.ready().then(() => {
      this.storage.set('jobId', jobId).then(() => {
        this.router.navigate(['/skills']);
      })
    });
  }

}
