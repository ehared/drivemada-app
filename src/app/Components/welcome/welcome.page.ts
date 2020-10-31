import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts = {
    effect:'flip',
    autoplay:{
        delay:2000,
    },
    loop:true
  }

  
  constructor() { }

  ngOnInit() {
  }

}
