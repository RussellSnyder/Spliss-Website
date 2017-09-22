import {Component, Input, OnInit} from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {
  @Input() tab: string;

  constructor(private fb: FacebookService) {

  }

  ngOnInit() {
    let initParams: InitParams = {
      appId: '120491195263473',
      xfbml: true,
      version: 'v2.8'
    };


    this.fb.init(initParams);
  }

}
