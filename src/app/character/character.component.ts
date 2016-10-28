import { Component, OnChanges, OnInit, Input, trigger, state, animate, transition, style, keyframes } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
  animations: [
	  trigger('visibilityChanged', [
	    state('shown' , style({opacity: 1, transform: 'translateY(0)'})),
	    state('hidden', style({opacity: 0, transform: 'translateY(100px)'})),
	  	transition('shown => hidden', [
	      animate(1000, keyframes([
	        style({opacity: 1, transform: 'translateY(0)', offset: 0}),
	        style({opacity: 0, transform: 'translateY(100px)', offset: 1.0})
	      ]))
	  	]),
	    transition('hidden => shown', [
	      animate(1000, keyframes([
	        style({opacity: 0, transform: 'translateY(100px)', offset: 0}),
	        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
	      ]))
	  	]),
	  ])
	]
})
export class CharacterComponent implements OnInit, OnChanges {
	visibility;
	el;

  @Input() isVisible : boolean = true;


  ngOnInit() {
		this.el = document.querySelector('.layout');
  	this.visibility = 'hidden';
  }

  ngOnChanges() {
  	this.visibility = this.isVisible ? 'shown' : 'hidden';
  }

  animationStart() {
  	console.log('i am starting!');
  }

  animationEnd() {
  	if (this.visibility === 'shown') {
  		this.el.classList.add('launch-fireball');
  	} else {
  		this.el.classList.remove('launch-fireball');
  	}
  }
  
}