import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor (public router: Router) { }

  ngOnInit () {}

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
