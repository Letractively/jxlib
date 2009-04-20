/**
 * Class: builder
 * Provides functionality for the jxlib.org download builder
 * 
 * Copyright 2009 by Jonathan Bomgardner
 * License: MIT-style
 */
var builder = new Class({
	
	_checked: [],
	_deps: null,
	_includeOpts: false,
	_checkedOpts: [],
	_fileCount: new Hash(),

	initialize: function(){
	
		this._loading = true;
		
		$$('.filelist', 
			'#moo-core .files',
			'#moo-core .library-selector',
			'#moo-more .files',
			'#moo-more .library-selector',
			'#build',
			'#compression'
		).each(function(el){
			new Jx.Slider({
				elem: el
			}).slide('out');
		},this);
		
		$('mootools-core').addEvent('click',this._showSelector.bind(this, ["core-selector","mootools-core","core-deps"]));
		$('mootools-more').addEvent('click',this._showSelector.bind(this, ["more-selector","mootools-more","more-deps"]));
		$('more-deps').addEvent('click',this._showFiles.bind(this,"more-files"));
		$('core-deps').addEvent('click',this._showFiles.bind(this,"core-files"));
		$('core-full').addEvent('click',this._hideFiles.bind(this,"core-files"));
		$('more-full').addEvent('click',this._hideFiles.bind(this,"more-files"));
		
		
		//get json file of dependencies
		var req = new Request.JSON({
			url: 'work/deps.json',
			onComplete: this._processDeps.bind(this)
		}).send();
		
		//setup the dependency checking
		$$('.dep').each(function(dep){
			$(dep).addEvent('click',this._check.bindWithEvent(this,dep));
		},this);
		$('opt-deps').addEvent('click',this._optsCheck.bindWithEvent(this));
		
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
		
		$$('.folder','.toggle').each(function(el){
			el = $(el);
			el.addEvents({
				'mouseenter': function(){
					el.addClass('hover');
				},	
				'mouseleave': function(){
					el.removeClass('hover');
				},
				'click': this._handleToggleClick.bind(this,el)
			});
			if (el.hasClass('folder')){
				numFiles = el.getNext().getChildren().length - 1;
				obj = {count: numFiles, checked: 0};
				this._fileCount.set(el.get('id'),obj);
			}
		},this);
		
		console.log(this._fileCount);
		
		//select all/select none links
		$$('.all').each(function(el){
			$(el).addEvent('click',this._select.bind(this,[el,true]));
		},this);
		$$('.none').each(function(el){
			$(el).addEvent('click',this._select.bind(this,[el,false]));
		},this);
		
		//options radio buttons
		$$('#build div input').each(function(el){
			el = $(el);
			el.addEvent('click',function(){
				label = el.getNext();
				$('build-choice').set('html',label.get('html'));
			});
		},this);
		$$('#j-compress div input').each(function(el){
			el = $(el);
			el.addEvent('click',function(){
				choice = el.getNext().getFirst();
				$('js-choice').set('html',choice.get('html'));
			});
		},this);
		$$('#f-compress div input').each(function(el){
			el = $(el);
			el.addEvent('click',function(){
				choice = el.getNext().getFirst();
				$('file-choice').set('html',choice.get('html'));
			});
		},this);
		
		//add download button
		this._button = new Jx.Button({
			label: 'Download',
			tooltip: 'Download JxLib', 
            onClick: this._download.bind(this)
		}).addTo('download');
		
		this._loading = false;
	},
	
	_select: function(el,flag){
		el = $(el);
		c = el.getParent().getParent().getChildren();
		c.shift();
		c.each(function(elem){
			check = $(elem).getFirst().getFirst();
			check.set('checked',flag);
			id = check.get('id');
			this._checkSection(id)
			this._dependencyCheck(id);
		},this);
	},
	
	_showSelector: function(el,origin,selector){
		el = $(el)
		selector = $(selector);
		if ($(origin).get('checked')){
			el.retrieve('slider').slide('in');
			if (selector.get('checked')){
				var files = el.getNext();
				files.retrieve('slider').slide('in');
			}
		} else {
			var files = el.getNext();
			if (files.getStyle('height') == 'auto'){
				files.retrieve('slider').slide('out');
			}
			if (el.getStyle('height') == 'auto') {
				el.retrieve('slider').slide('out');
			}
		}
		
	},
	
	_showFiles: function(el){
		el = $(el);
		if (el.getStyle('height').toInt() == 0) {
			$(el).retrieve('slider').slide('in');
		}
	},
	
	_hideFiles: function(el){
		el = $(el);
		if (el.getStyle('height') == 'auto') {
			$(el).retrieve('slider').slide('out');
		}
	},
	
	_processDeps:function(deps){
		this._deps = new Hash(deps);
	},
	
	_check: function(e){
		e.stopPropagation();
		dep = $(e.target).get('id');
		this._checkSection(dep);
		this._dependencyCheck(e.target);
	},
	
	_dependencyCheck: function(el){
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
				this._checkSection(dep);
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
					this._checkSection(key);
					//work through on this dep
					this._removeDeps(key);
				}
			}
		},this);
	},
	
	_optsCheck: function(e){
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
				this._checkSection(dep);
				newDeps = (this._deps.get(dep)).deps;
				this._addOpts(newDeps);
			}
		},this);
	},
	
	_removeOpts: function(){
		this._checkedOpts.each(function(dep){
			$(dep).set('checked',false);
			this._checkSection(dep);
		},this);
		this._checkedOpts.empty();
	},
	
	_handleFileClick: function(el){
		el = $(el);
		input = el.getFirst().getFirst();
		input.set('checked',!input.get('checked'));
		this._dependencyCheck(input);
	},
	
	_handleToggleClick: function(el){
		//if (!el.hasClass('full')){
			el.toggleClass('open');
			if (el.hasClass('open')){
				this._showFiles(el.getNext());
			} else {
				this._hideFiles(el.getNext());
			}
		//}
	},
	
	_checkSection: function(dep){
		console.log('Check section for dependency: '+dep);
		var el = $(dep);
		fileList = el.getParent().getParent().getParent();
		folder = fileList.getPrevious();
		folderName = folder.get('id');
		count = 0;
		fileList.getChildren().each(function(el){
			el = $(el);
			if (el.hasClass('file')){
				if (el.getFirst().getFirst().get('checked')){
					count++;
				}
			}
		},this);
		console.log("   folderName:"+folderName);
		obj = this._fileCount.get(folderName);
		obj.checked = count;
		this._fileCount.set(folderName,obj);
		console.log("        count:"+obj.count);
		console.log("      checked:"+obj.checked);
		if (obj.checked === obj.count){
			//all are checked
			if (folder.hasClass('some')){
				folder.removeClass('some');
			}
			folder.addClass('full');
		} else if (obj.checked > 0){
			if (folder.hasClass('full')){
				folder.removeClass('full');
			}
			folder.addClass('some');
		} else if (obj.checked === 0) {
			if (folder.hasClass('full')){
				folder.removeClass('full');
			}
			if (folder.hasClass('some')){
				folder.removeClass('some');
			}
		}
	},
	
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
			onOpen: this._startRequest.bind(this),
			width: 200,
			height: 200
		});
		this.dlg.open();
		
	},
	
	_startRequest: function(){
		this.req = new Request({
			url: 'builder.php',
			data: $('builder-form').toQueryString(),
			method: 'post',
			onSuccess: this._startDownload.bind(this)
		});
		this.req.send();
	},
	
	_startDownload: function(responseText, responseXML){
		obj = JSON.decode(responseText);
		this.dlg.close();
		this._button.setEnabled(true);
		if (obj.success){
			window.location = 'download.php?file='+obj.folder+'/'+obj.filename;
		}
	}
});