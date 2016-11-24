import { Component, OnChanges, OnInit, Input, trigger, state, animate, transition, style, keyframes } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
  animations: [
	  trigger('visibilityChanged', [
	    state('shown' , style({opacity: 1, transform: 'translateY(0)'})),
	    state('hidden', style({opacity: 0, transform: 'translateY(100px)'})),

      transition('shown => hidden', [animate('1000ms ease-out')]),
      transition('hidden => shown', [animate('1000ms ease-out')]),
	  ]),
	]
})
export class CharacterComponent implements OnInit, OnChanges {

	visibility: string;
  readyState: boolean;
  @Input() isVisible : boolean;
  @ViewChild('layout') layout;
  @ViewChild('ryu') ryu;

  constructor(private renderer: Renderer) {
  }

  ngOnInit() {
  	this.visibility = 'hidden';
    this.readyState = false;
  }

  ngOnChanges() {
  	this.visibility = this.isVisible ? 'shown' : 'hidden';
  }

  // First animation sequence, trigger character visibility and appearance

  // Launch animation when character is fully loaded
  animationEnd(event) {
    this.prepare(event);
  }

  prepare(e) {
    if (e.fromState === 'hidden') {
      this.readyState = true;
      this.renderer.setElementClass(this.ryu.nativeElement, 'prepare', true);
      this.renderer.listen(this.ryu.nativeElement, 'webkitAnimationEnd', (event) => {
        this.ryu.nativeElement.classList.remove('prepare');
      })
    }
  }

  // Second animation sequence, character launch fireball
  launch() {
    if (this.visibility === 'shown' && this.readyState ) {

      // Start character 'launching fireball' animation

      // -> restart character sequence if it's not finished
      this.layout.nativeElement.classList.remove('launch-fireball');

      // -> triggering reflow /* The actual magic */ source CSS-Tricks https://css-tricks.com/restart-css-animation/
      void this.layout.nativeElement.offsetWidth;

      this.renderer.setElementClass(this.layout.nativeElement, 'launch-fireball', true);

      // Create fireball and launch
      let fireball = this.renderer.createElement(this.layout.nativeElement, 'div');
      let launchFireball = this.renderer.listen(this.ryu.nativeElement, 'webkitAnimationStart', (event) => {
        if (event.animationName === 'ryu-launch-fireball') {
          this.renderer.setElementClass(fireball, 'fireball', true);
          this.renderer.setElementClass(fireball, 'launched', true);

          // call listener as function to avoid memory leaks
          launchFireball();
        }
      })

      let clearAnimation = this.renderer.listen(fireball, 'webkitAnimationEnd', (event) => {
        if (event.animationName === 'fireball-end') {
          // destroy html element when animation is done
          fireball.remove();
          // call listener as function to avoid memory leaks
          clearAnimation();
        }
      })
    }
  }
  
}