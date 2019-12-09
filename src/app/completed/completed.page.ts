import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['/explore']);
  }
}
