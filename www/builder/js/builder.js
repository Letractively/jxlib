/**
 * 
 */
var builder = new Class({
	
	_checked: [],
	_deps: null,
	_includeOpts: false,
	_checkedOpts: [],

	initialize: function(){
		$$('#moo-core .files','#moo-core .library-selector','#moo-more .files','#moo-more .library-selector').each(function(el){
			el = $(el);
			width = el.getStyle('width');
			el.slide('hide');
			el.getParent().setStyles({'margin':'0px auto','width':width});
			if (el.hasClass('files')){
				width = width.toFloat();
				width = width - 12;
				el.setStyle('width',width+"px");
			} else {
				el.setStyle('width','100%');
			}
		},this);
		
		$('mootools-core').addEvent('click',this.showSelector.bind(this, ["core-selector","mootools-core","core-deps"]));
		$('mootools-more').addEvent('click',this.showSelector.bind(this, ["more-selector","mootools-more","more-deps"]));
		$('more-deps').addEvent('click',this.showFiles.bind(this,"more-files"));
		$('core-deps').addEvent('click',this.showFiles.bind(this,"core-files"));
		$('core-full').addEvent('click',this.hideFiles.bind(this,"core-files"));
		$('more-full').addEvent('click',this.hideFiles.bind(this,"more-files"));
		
		//get json file of dependencies
		var req = new Request.JSON({
			url: 'work/deps.json',
			onComplete: this.processDeps.bind(this)
		}).send();
		
		//setup the dependency checking
		$$('.dep').each(function(dep){
			$(dep).addEvent('click',this.check.bindWithEvent(this,dep));
		},this);
		$('opt-deps').addEvent('click',this.optsCheck.bindWithEvent(this));
		
		//add hover and click for files
		$$('.file').each(function(el){
			el = $(el);
			el.addEvents({
				'mouseenter': function(){
					el.addClass('hover');
				},	
				'mouseleave': function(){
					el.removeClass('hover');
				},
				'click': this._handleFileClick.bind(this,el)
			});
		},this);
		
		//add download button
		this._button = new Jx.Button({
			label: 'Download',
			tooltip: 'Download JxLib', 
            onClick: this._download.bind(this)
		}).addTo('download');
	},
	
	showSelector: function(el,origin,selector){
		el = $(el)
		selector = $(selector);
		if ($(origin).get('checked')){
			el.slide('in');
			if (selector.get('checked')){
				var parent = el.getParent();
				var files = parent.getNext();
				files.getFirst().slide('in');
			}
		} else {
			var parent = el.getParent();
			var files = parent.getNext();
			if (files.getStyle('height').toInt() > 0){
				files.getFirst().slide('out');
			}
			if (parent.getStyle('height').toInt() > 0) {
				el.slide('out');
			}
		}
		
	},
	
	showFiles: function(el){
		$(el).slide('in');
	},
	
	hideFiles: function(el){
		$(el).slide('out');
	},
	
	processDeps:function(deps){
		this._deps = new Hash(deps);
	},
	
	check: function(e){
		e.stopPropagation();
		this.dependencyCheck(e.target);
	},
	
	dependencyCheck: function(el){
		el = $(el);
		id = el.get('id');
		this._checked.push(id);
		add = el.get('checked');
		if (add){
			deps = (this._deps.get(id)).deps;
			this._addDeps(deps);
		} else {
			this._removeDeps(id);
		}
	},
	
	_addDeps: function(deps){
		deps.each(function(dep){
			if (!this._checked.contains(dep)){
				$(dep).set('checked',true);
				this._checked.push(dep);
				d = this._deps.get(dep);
				newDeps = d.deps;
				if (this._includeOpts && $defined(d.opt)){
					this._addDeps(d.opt);
				}
				if (newDeps[0].toLowerCase() !== 'none' && dep.toLowerCase() !== 'core'){
					this._addDeps(newDeps);
				}
			}
		},this);
	},
	
	_removeDeps: function(dep){
		//work through the deps looking for items that list this id
		//as a dependency and remove them.
		this._checked.erase(dep);
		this._deps.each(function(obj,key){
			if (this._checked.contains(key)){
				if (obj.deps.contains(dep)){
					$(key).set('checked',false);
					//work through on this dep
					this._removeDeps(key);
				}
			}
		},this);
	},
	
	optsCheck: function(e){
		el = $(e.target);
		this._includeOpts = el.get('checked');
		if (this._includeOpts){
			//loop through the already checked files and add optional dependencies
			//if they aren't already checked
			this._checked.each(function(dep){
				var d = this._deps.get(dep)
				if ($defined(d.opt)){
					this._addOpts(d.opt);
				} 
			},this);
		} else {
			this._removeOpts();
		}
	},
	
	_addOpts: function(deps){
		deps.each(function(dep){
			if (!this._checked.contains(dep) && !this._checkedOpts.contains(dep)){
				this._checkedOpts.push(dep);
				$(dep).set('checked',true);
				newDeps = (this._deps.get(dep)).deps;
				this._addOpts(newDeps);
			}
		},this);
	},
	
	_removeOpts: function(){
		this._checkedOpts.each(function(dep){
			$(dep).set('checked',false);
		},this);
		this._checkedOpts.empty();
	},
	
	_handleFileClick: function(el){
		el = $(el);
		input = el.getFirst().getFirst();
		input.set('checked',!input.get('checked'));
		this.dependencyCheck(input);
	},
	
	/**
	 * My thought is to change this to use Request to prepare the download,
	 * show a "Please wait..." dialog, and then when the server returns that
	 * the  download is ready, have the window redirect to the download url
	 * which should trigger the download (something like download.php?file=...)
	 * This way we can present a nice wait message but still properly trigger the
	 * download.
	 */
	_download: function(){
		this._button.setEnabled(false);
		var d = new Element('div',{
			id: 'progress-message'
		});
		var p = new Element('p',{
			html: 'Please wait while we prepare your download<br/>'
		})
		p.inject(d);
		new Element('img',{
			src: 'img/ajax-loader.gif'
		}).inject(p);
		this.dlg = new Jx.Dialog({
			label: 'JxLib Download Builder',
			content: d,
			modal: true,
			resize: false,
			close: false,
			move: false,
			collapse: false,
			onOpen: this.startRequest.bind(this),
			width: 200,
			height: 200
		});
		this.dlg.open();
		
	},
	
	startRequest: function(){
		this.req = new Request({
			url: 'builder.php',
			data: $('builder-form').toQueryString(),
			method: 'post',
			onSuccess: this.startDownload.bind(this)
		});
		this.req.send();
	},
	
	startDownload: function(responseText, responseXML){
		obj = JSON.decode(responseText);
		this.dlg.close();
		this._button.setEnabled(true);
		if (obj.success){
			window.location = 'download.php?file='+obj.folder+'/'+obj.filename;
		}
	}
});