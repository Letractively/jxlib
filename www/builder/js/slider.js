Jx.Slider = new Class({
	
	Implements: [Options,Events],
	
	options: {
		elem: null,		//the element that we'll be sliding
		trigger: null,
		onSlideOut: $empty,	//called when a panel slides out (shows)
		onSlideIn: $empty, //called when a panel slides in (hides)
	},
	
	initialize: function(options){
		
		this.setOptions(options);
		
		this.elem = $(this.options.elem);
		
		this.elem.set('tween',{onComplete:this.setDisplay.bind(this)});
		
		if ($defined(this.options.trigger)){
			this.trigger = $(this.options.trigger);
			this.trigger.addEvent('click',this._handleClick.bindWithEvent(this));
		}
		
		this.elem.store('slider',this);

	},
	
	_handleClick: function(e){
		h = this.elem.getStyle('height').toInt();
		if (h==0) {
			this.slide('in');
		} else {
			this.slide('out');
		}
	},
	
	setDisplay: function(){
		h = this.elem.getStyle('height').toInt();
		if (h==0){
			this.elem.setStyle('display','none');
			this.fireEvent('slideIn', this.elem);
		} else {
			this.elem.setStyles({
				'overflow':'auto',
				'height':'auto'
			});
			this.fireEvent('slideOut', this.elem);
		}	
	},
	
	slide: function(dir){
		if (dir == 'in') {
			h = this.elem.retrieve('height');
			this.elem.setStyles({
				'overflow':'hidden',
				'display':'block',
				'height':0
			});
			this.elem.tween('height',h);	
		} else {
			h = this.elem.getSize().y;
			this.elem.store('height',h);
			this.elem.setStyles({
				'overflow':'hidden',
				'height':h
			});
			this.elem.tween('height',0);
		}		
	}
});