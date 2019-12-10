import { Component, OnInit  } from '@angular/core';
import { NavigationExtras, Router} from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
  itemSkill: any;
  skill_id: any;
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

  constructor(public router: Router, public storage: Storage, public http: HttpClient) {
    this.skills = [];
  }

  ngOnInit() {
    let that = this;
    this.storage.get('token').then((token) => {
        this.http.get(environment.url + '/users/skill?filter[where][user_id]=' + token, {})
        .subscribe((data:any) => {
            let that = this;
            data.forEach(function(item){
              that.skill_id = item.id;
              item.skills.forEach(function(item2){
                that.skills.push(item2);
              })
            })
        }, errorResp => {
          console.log(errorResp);
        });
    });
  }

  randgp(max) {
    return Math.floor(Math.random() * max);
  }

  metric(x , y, mt) {
    if(mt==1) {return Math.sqrt(x*x + y*y)}
    if(mt==2) {return Math.abs(x) + Math.abs(y)}
    if(mt==3) {return(Math.pow(Math.pow(Math.abs(x),3) + Math.pow(Math.abs(y),3),0.33333))}
  }

  tags(id = null) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    };
    this.router.navigate(['/tags'], navigationExtras);
  }

  home () {
    this.router.navigate(['/main']);
  }

  explore () {
    this.router.navigate(['/explore']);
  }

  collect () {
    this.router.navigate(['/collect']);
  }

  user () {
    this.router.navigate(['/user']);
  }

  more () {
    this.router.navigate(['/more']);
  }
}
