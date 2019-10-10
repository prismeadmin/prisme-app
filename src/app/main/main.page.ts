import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  sliderConfig  = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 2,
    centeredSlides: true
  };

  skills: any = Array;
  moreShow: any = true;
  cvs: any = Object;
  ctx: any = Object;
  w: any = Number;
  h: any = Number;
  x: any = Number;
  y: any = Number;
  d: any = Number;
  dm: any = Number;
  j: any = Number;
  w1: any = Number;
  h1: any = Number;
  X: any = Array;
  Y: any = Array;
  C: any = Array;
  i: any = Number;
  skillId: any;

  constructor(public router: Router, public storage: Storage) {
    this.skills = [
        {title: 'Analytical', id: 1, check: false, color: '#CD5C5C'},
        {title: 'Active Listening', id: 2, check: false, color: '#C71585'},
        {title: 'Collaboration', id: 3, check: false, color: '#FF7F50'},
        {title: 'Negotiating', id: 4, check: false, color: '#FF8C00'},
        {title: 'Teamwork', id: 5, check: false, color: '#4B0082'},
        {title: 'Communication', id: 6, check: false, color: '#BC8F8F'},
        {title: 'Problem Solving', id: 7, check: false, color: '#8B4513'}
    ]
  }

  ngOnInit() {
    //Slides.ionSlideProgress.subscribe(progress => this.onProgress(progress));

    this.cvs = document.getElementById("cvsId");
    this.ctx = this.cvs.getContext("2d");
    this.w = this.cvs.width;
    this.h = this.cvs.height;
    this.x = 0;
    this.y = 0;
    this.d = 0;
    this.dm = 0;
    this.j=0;
    this.w1 = this.w - 2;
    this.h1 = this.h - 2;
    this.X = new Array(this.skills.length);
    this.Y = new Array(this.skills.length);
    this.C = new Array(this.skills.length);
    for (this.i = 0; this.i < this.skills.length; this.i++) {
      this.X[this.i] = this.randgp(this.w1);
      this.Y[this.i] = this.randgp(this.h1);
      this.C[this.i] = this.skills[this.i].color;
    }
    for (this.y = 0; this.y < this.h1; this.y++) {
      for (this.x = 0; this.x < this.w1; this.x++) {
        this.dm = this.metric(this.h1, this.w1, 1);
        this.j = this.j - 1;
        for (this.i = 0; this.i < this.skills.length; this.i++) {
           this.d = this.metric(this.X[this.i] - this.x,this.Y[this.i] - this.y, 1)
           if (this.d < this.dm) {
             this.dm = this.d;
             this.j = this.i;
           }
        }
        this.ctx.fillStyle = this.C[this.j];
  			this.ctx.fillRect(this.x , this.y , 1, 1);
      }
    }
  }

  randgp(max) {
    return Math.floor(Math.random() * max);
  }

  metric(x , y, mt) {
    if(mt==1) {return Math.sqrt(x*x + y*y)}
    if(mt==2) {return Math.abs(x) + Math.abs(y)}
    if(mt==3) {return(Math.pow(Math.pow(Math.abs(x),3) + Math.pow(Math.abs(y),3),0.33333))}
  }

  home() {
    this.router.navigate(['/main']);
  }

  explore() {
    this.router.navigate(['/explore']);
  }

  tags(id = null) {
    this.storage.ready().then(() => {
      let skillId = [];
      if (id == null) {
          this.skills.forEach(function(item){
            skillId.push(item.id);
          })
      } else {
        this.skills.forEach(function(item){
          if (item.id == id) skillId.push(item.id);
        })
      }
      this.storage.set('skillId', skillId).then(() => {
        this.router.navigate(['/tags']);
      })
    });
  }
}
