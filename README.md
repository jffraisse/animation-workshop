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


