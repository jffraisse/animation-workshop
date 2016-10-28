![Animate with angular](https://github.com/jffraisse/animation-workshop/raw/master/src/assets/workshop/animateWithAngular.png)

## Disclaimer

The purpose of this workshop is to provide a cool way to learn and use animations in Angular 2.
You will have to animate a character using Angular2 differents methods. 
Materials are given in the src/assets/workshop folder of this repository, a sprite.png and a stylesheet (sprite.css).
You can check sources at the end of this document if you want to learn more about different technics i used.
Maybe it's not the best practice for animating layouts but anyway, it's funnier than regular tutorial so let's get it on!

* First of all download angular-cli as global dependency 

 'npm install -g angular-cli'

## Step 1 : A new component to animate

* checkout project in your test folder
  * 'git clone git@github.com:jffraisse/animation-workshop.git'

* checkout "init" workshop tag
  * 'git checkout init'

* install npm dependencies
  * 'npm i'

* create a new component called "character"
	* 'ng g component character'

* inject html into character component

```
<div class="layout">
  <div class="ryu"></div><div class="fireball"></div>
</div>
```

* make it appear into the main app layout 
	* `<app-character></app-character>` into app.component.html

* use CSS and HTML from workshop project in your component
	* folder 'workshop' into '/src/assets'
		* copy and paste content of sprite.css into css character's component stylesheet

* start app with 'ng serve' in command prompt and check result in http://localhost:4200

## Step 2 : Using Angular2 animation system

* Adapt CSS animation 'konami-launch' with Angular system
	* Remove "konami-launch" CSS animation call into "layout" class

```
.layout {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;

  // remove or comment
  // animation: konami-launch 2s 0s 1;
  transform: translateZ(0); /* permet l'accélération matériel */
}
```

  * import animation utilities from angular core

```
import { Component, OnInit, OnChanges, Input, style, trigger, state, transition, keyframes, animate } from '@angular/core';
```

	* describe animation in character component metadata

```javascript
	animations: [
	  trigger('visibilityChanged', [
	    state('shown', style({opacity: 1, transform: 'translateY(0)'})),
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
```

  * this is a shorter way to create same transition

```javascript
  animations: [
    trigger('visibilityChanged', [
      state('shown' , style({opacity: 1, transform: 'translateY(0)'})),
      state('hidden', style({opacity: 0, transform: 'translateY(100px)'})),
      transition('shown => hidden', [animate('1000ms ease-out')]),
      transition('hidden => shown', [animate('1000ms ease-out')]),
    ]),
  ]
```

* call animation into character's layout

```
<div class="layout" [@visibilityChanged]="visibility">
  <div class="ryu"></div><div class="fireball"></div>
</div>

```

* create a button to trigger animation in app.component.html

```
<button (click)="isVisible = !isVisible">Toggle</button>
<app-character [isVisible]="isVisible"></app-character>
```

* Use OnChange to fire event into angular animation

```
export class CharacterComponent implements OnInit, OnChanges {
  visibility = 'shown';

  @Input() isVisible : boolean = true;

  ngOnInit() {
  }

  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
  }
}
```

## Step 3 : Trigger fireball launching with angular animation

* Use angular animation's events to chain moves

```
<div class="layout"
	(@visibilityChanged.start)="animationStart($event)"
	(@visibilityChanged.done)="animationEnd($event)"
	[@visibilityChanged]="visibility">
	<div class="ryu"></div><div class="fireball"></div>
</div>
```


* bind animationStart and animationEnd functions with character component

```
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
```

* Adapt character component behaviors
	* change CSS rules to get control of launching fireball animation steps

```
.layout .ryu {
  position: absolute;
  bottom: 0;
  left: 0;
  background: url("assets/workshop/sprite.png") 0 0 no-repeat; 

  animation: ryu 2.5s steps(11) 0s 1;              

  transform: translateZ(0);

}
.layout.launch-fireball .fireball {
  position: absolute;
  left: 90px;
  bottom: 0;

  animation: fireball-start 0.2s steps(2) 2.5s 1,
             fireball-road 3.7s 2.5s 1,
             fireball-animation-road 0.5s steps(4) 2.7s 5,
             fireball-end 0.2s steps(2) 5.2s 1;
}

.layout.launch-fireball .ryu {

  animation:  ryu-prepare-fireball 2s steps(12) 1s 1,
              ryu-launch-fireball 0.5s steps(1) 2.5s 1,
              ryu-launched-fireball 0.5s steps(2) 3s 6,
              ryu-wind 1s steps(3) 8s infinite;
}
```

* implement onInit class to setup starting parameters

```
export class CharacterComponent implements OnInit, OnChanges {
  visibility;
  el;

  @Input() isVisible : boolean = true;

  ngOnInit() {
    this.el = document.querySelector('.layout');
    this.visibility = 'hidden';
  }

  ...

}
```

## Going further

* You can check 'advanced' branch to see how to deal with a more complicated use case, with some comments in code too.
  * 'git checkout advanced'



Sources:

[Angular animation documentation](https://angular.io/docs/ts/latest/guide/animations.html)
[Thomas Burleson nice blog post](http://blog.thoughtram.io/angular/2016/09/16/angular-2-animation-important-concepts.html)

Feel free to contact me on Twitter [@Jeffwebdesign](https://twitter.com/Jeffwebdesign) if you have any questions, remarks about this workshop.
