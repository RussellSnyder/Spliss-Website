import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import anime from 'animejs'

@Component({
  selector: 'app-animated-logo',
  templateUrl: './animated-logo.component.html',
  styleUrls: ['./animated-logo.component.css']
})
export class AnimatedLogoComponent implements AfterViewInit {
  @Input() logoType: string;
  headerAnimationComplete = false;

  constructor() { }

  ngAfterViewInit() {
    if (!this.headerAnimationComplete && this.logoType === 'header-animation') {
      this.drawHeaderAnimation()
    }
    if (this.logoType === 'loading') {
      this.runLoadingAnimation()
    }
  }

  drawHeaderAnimation() {
    anime({
      targets: '#header-animation .lines path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInSine',
      duration: 2000,
      delay: function(el, i) { return i * 75 },
      direction: 'forward',
      complete: function(anim) {
        var d = document.getElementById("header-animation");
        d.setAttribute("class", "spliss-logo-animation done");
        this.headerAnimationComplete = true;
      }
    });
  };
  runLoadingAnimation() {
    anime({
      targets: '.spliss-logo-animation#loading .lines path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: 500,
      delay: function(el, i) { return i * 175 },
      direction: 'forward',
    });
  };

}
