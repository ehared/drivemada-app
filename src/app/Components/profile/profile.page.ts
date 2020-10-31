import { Component, OnInit } from '@angular/core';

import * as Mock from 'mockjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public foods:any;
  public driver:any;

  constructor() { }

  ngOnInit() {

    var Random = Mock.Random;
    this.driver = Mock.mock({
        driver:{
        "photo":"@image('600x600',#b7ef7c)",
        "name": Random.first(),
        "trips|100-1000":1,
        "rating|1-4.1":1,
        "year|1-8": 1,
        "language": 0,
        "call": Random.ip(),
        "location": "@time"
        }
    });
  }
  
 
}
