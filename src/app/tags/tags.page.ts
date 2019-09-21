import { Component, OnInit } from '@angular/core';
import {IonTagsInputModule} from "ionic-tags-input";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.page.html',
  styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {

  tags: any;

  constructor() { }

  ngOnInit() {
  }

}
