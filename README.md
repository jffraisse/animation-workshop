# AnimationWorkshop


1 hour workshop to understand how Angular animation system works

## Step 1 : A new component to animate

* Create a new component called "character"
	* 'ng g component character'

* Make it appear into the main app layout 
	* `<app-character></app-character>` dans app.component.html

* Use CSS and HTML from workshop project in your component
	* folder 'workshop' dans '/src/assets'
		* copy and paste sprite.png

## Step 2 : Using Angular2 animation system

* Adapt CSS animation 'konami-launch' with Angular system
	* delete previous one in CSS
	* call animation in component metadata with correct parameters

```javascript
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
```


* create a button to trigger animation in app.component.ts

```
<button (click)="isVisible = !isVisible">Toggle</button>
<app-character [isVisible]="isVisible"></app-character>
```

* Use OnChange Class to connect Input value from app.component to character.component

```
export class CharacterComponent implements OnChanges {
	visibility = 'shown';

  @Input() isVisible : boolean = true;

  ngOnChanges() {
  	this.visibility = this.isVisible ? 'hidden' : 'shown';
  }
  
}
```

## Step 2 : Using Angular2 animation system

* Adapt CSS animation 'konami-launch' with Angular system
	* delete previous one in CSS
	* call animation in component metadata with correct parameters

```javascript
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
```


* create a button to trigger animation in app.component.ts

```
<button (click)="isVisible = !isVisible">Toggle</button>
<app-character [isVisible]="isVisible"></app-character>
```

* Use OnChange Class to connect Input value from app.component to character.component

```
export class CharacterComponent implements OnChanges {
	visibility = 'shown';

  @Input() isVisible : boolean = true;

  ngOnChanges() {
  	this.visibility = this.isVisible ? 'hidden' : 'shown';
  }
  
}
```

## Step 3 : Use animation angular lifeCycle to decompose each steps of character mooves

* Use animate angular events to control animation firing steps

```
<div class="layout"
	(@visibilityChanged.start)="animationStart($event)"
	(@visibilityChanged.done)="animationEnd($event)"
	[@visibilityChanged]="visibility">
	<div class="ryu"></div><div class="fireball"></div>
</div>
```

* Adapt character component behavior 
	* change CSS rules to get control of launching fireball animation step

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

	* implement onInit Class to get information needed at animation start

```
export class CharacterComponent implements OnInit, OnChanges {
	visibility;
	el;

  @Input() isVisible : boolean = true;


  ngOnInit() {
		this.el = document.querySelector('.layout');
  	this.visibility = 'hidden';
  }
```

* bind animationStart and animationEnd functions with character component and use it to launch fireball

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

* remove fireball launch step from CSS stylesheet and use angular animationEnd to fire it

```

```

