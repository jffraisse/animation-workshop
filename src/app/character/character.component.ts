import { Component, OnChanges, Input, trigger, state, animate, transition, style, keyframes } from '@angular/core';

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
export class CharacterComponent implements OnChanges {
	visibility = 'shown';

  @Input() isVisible : boolean = true;

  ngOnChanges() {
  	this.visibility = this.isVisible ? 'hidden' : 'shown';
  }
  
}