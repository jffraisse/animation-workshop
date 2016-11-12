
import { Component, OnChanges, OnInit, Input, 
         trigger, state, animate, transition, style, 
         Renderer, ViewChild } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
  animations: [
	  trigger('visibilityChanged', [
	    state('shown' , style({opacity: 1, transform: 'translateY(0)'})),
	    state('hidden', style({opacity: 0, transform: 'translateY(100px)'})),
	  	transition('void => hidden', [
	  	]),
      transition('shown => hidden', [
        animate('1000ms ease-out')
      ]),
      transition('hidden => shown', [
        animate('1000ms ease-out')
      ]),
	  ])
	]
})
export class CharacterComponent implements OnInit, OnChanges {
	visibility: string;
  fireballEvent: string;
  @Input() isVisible : boolean = true;
  @Input() isFired : boolean = true;
  @ViewChild('fireball') fireball;
  @ViewChild('layout') layout;

  constructor(private renderer: Renderer) {
  }

  ngOnInit() {
  	this.visibility = 'hidden';
    this.fireballEvent = '';
    this.renderer.listen(this.fireball.nativeElement, 'webkitAnimationEnd', (event) => {
      if (event.animationName === "fireball-end") {
        this.layout.nativeElement.classList.remove('launch-fireball');
      }
    })
  }

  ngOnChanges() {
  	this.visibility = this.isVisible ? 'shown' : 'hidden';
    this.fireballEvent = this.isFired ? 'fire' : 'empty';
    if (this.visibility === 'shown' && this.isFired) {
      this.layout.nativeElement.classList.remove('launch-fireball');

      // -> triggering reflow /* The actual magic */ source CSS-Tricks https://css-tricks.com/restart-css-animation/
      void this.layout.nativeElement.offsetWidth;

      this.layout.nativeElement.classList.add('launch-fireball');
  
    }
  }

  animationStart() {
  	console.log('i am starting!');
  }

  
}