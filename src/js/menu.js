// $Id: menu.js 1094 2008-09-23 22:04:34Z pspencer $
/**
 * Class: Jx.Menu
 * A main menu as opposed to a sub menu that lives inside the menu.
 *
 * TODO: Jx.Menu
 * revisit this to see if Jx.Menu and Jx.SubMenu can be merged into
 * a single implementation.
 *
 * Example:
 * (code)
 * (end)
 *
 * License: 
 * Copyright (c) 2008, DM Solutions Group Inc.
 * 
 * This file is licensed under an MIT style license
 */
Jx.Menu = new Class({
    Implements: [Options, Events, Jx.AutoPosition, Jx.Chrome, Jx.Addable],
    /**
     * Property: domObj
     * {HTMLElement} The HTML element containing the menu.
     */
    domObj : null,
    /**
     * Property: button
     * {<Jx.Button>} The button that represents this menu in a toolbar and
     * opens the menu.
     */
    button : null,
    /**
     * Property: subDomObj
     * {HTMLElement} the HTML element that contains the menu items
     * within the menu.
     */
    subDomObj : null,
    /**
     * Property: items
     * {Array} the items in this menu
     */
    items : null,
    /**
     * Constructor: Jx.Menu
     * Create a new instance of Jx.Menu.
     *
     * Parameters:
     * options - {Object} an options object passed directly to the
     * <Jx.Button> when creating the button that triggers this menu.
     * If options is not passed, then no button is created.
     */
    initialize : function(options) {
        this.setOptions(options);
        /* */
        if (!Jx.Menu.Menus) {
            Jx.Menu.Menus = [];
        }
        /* stores menu items and sub menus */
        this.items = [];
        
        this.contentContainer = new Element('div',{
            'class':'jxMenuContainer'
        });
        
        /* the DOM element that holds the actual menu */
        this.subDomObj = new Element('ul',{
            'class':'jxMenu'
        });
        
        this.contentContainer.adopt(this.subDomObj);
        
        /* if options are passed, make a button inside an LI so the
           menu can be embedded inside a toolbar */
        if (options) {
            this.button = new Jx.Button($merge(options,{
                onClick:this.show.bind(this)
            }));
            this.button.domA.addClass('jxButtonMenu');
            this.button.domA.addEvent('mouseover', this.onMouseOver.bindWithEvent(this));
            
            this.domObj = this.button.domObj;
        }
        
        /* pre-bind the hide function for efficiency */
        this.hideWatcher = this.hide.bindWithEvent(this);
        this.keypressWatcher = this.keypressHandler.bindWithEvent(this);
        
        if (this.options.parent) {
            this.addTo(this.options.parent);
        }
    },
    /**
     * Method: add
     * Add menu items to the sub menu.
     *
     * Parameters:
     * item - {<Jx.MenuItem>} the menu item to add.  Multiple menu items
     * can be added by passing multiple arguments to this function.
     */
    add : function() {
        $A(arguments).each(function(item){
            this.items.push(item);
            item.setOwner(this);
            this.subDomObj.adopt(item.domObj);
        }, this);
        return this;
    },
    /**
     * Method: deactivate
     * Deactivate the menu by hiding it.
     */
    deactivate: function() {this.hide();},
    /**
     * Method: actionPerformed
     * Any action performed in the menu ultimately calls this
     * method to hide the menu.
     */
    actionPerformed : function() {this.hide();},
    /**
     * Method: onMouseOver
     * Handle the user moving the mouse over the button for this menu
     * by showing this menu and hiding the other menu.
     *
     * Parameters:
     * e - {Event} the mouse event
     */
    onMouseOver: function(e) {
        if (Jx.Menu.Menus[0] && Jx.Menu.Menus[0] != this) {
            this.show({event:e});
        }
    },
    
    eventInMenu: function(e) {
        return $(e.target).descendantOf(this.domObj) ||
               $(e.target).descendantOf(this.subDomObj) ||
               this.items.some(
                   function(item) {
                       return item instanceof Jx.Menu.SubMenu && 
                              item.eventInMenu(e);
                   }
               );
    },
    
    /**
     * Method: hide
     * Hide the menu.
     *
     * Parameters:
     * e - {Event} the mouse event
     */
    hide: function(e) {
        if (e) {
            if (this.eventInMenu(e)) {
                return;
            }
        }
        if (Jx.Menu.Menus[0] && Jx.Menu.Menus[0] == this) {
            Jx.Menu.Menus[0] = null;
        }
        if (this.button && this.button.domA) {
            this.button.domA.removeClass('jx'+this.button.options.type+'Active');            
        }
        this.contentContainer.dispose();
        this.items.each(function(item){item.hide(e);});
        document.removeEvent('mousedown', this.hideWatcher);
        document.removeEvent('keyup', this.keypressWatcher);
        this.fireEvent('hide', this); 
    },
    /**
     * Method: show
     * Show the menu
     *
     * Parameters:
     * e - {Event} the mouse event
     */
    show : function(o) {
        var e = o.event;
        if (Jx.Menu.Menus[0] && Jx.Menu.Menus[0] != this) {
            Jx.Menu.Menus[0].hide(e);
        }
        if (this.items.length ==0) {
            return;
        }
        Jx.Menu.Menus[0] = this;
        
        this.contentContainer.setStyle('visibility','hidden');
        $(document.body).adopt(this.contentContainer);            
        /* we have to size the container for IE to render the chrome correctly
         * but just in the menu/sub menu case - there is some horrible peekaboo
         * bug in IE related to ULs that we just couldn't figure out
         */
        this.contentContainer.setContentBoxSize(this.subDomObj.getMarginBoxSize());
        this.showChrome(this.contentContainer);
        
        this.position(this.contentContainer, this.button.domObj, {
            horizontal: ['left left'],
            vertical: ['bottom top', 'top bottom'],
            offsets: this.chromeOffsets
        });

        this.contentContainer.setStyle('visibility','');
        
        if (this.button && this.button.domA) {
            this.button.domA.addClass('jx'+this.button.options.type+'Active');            
        }
        if (e) {
            e.stop();
        }
        /* fix bug in IE that closes the menu as it opens because of bubbling */
        document.addEvent('mousedown', this.hideWatcher);
        document.addEvent('keyup', this.keypressWatcher);
        this.fireEvent('show', this); 
    },
    /**
     * Method: setVisibleItem
     * Set the sub menu that is currently open
     *
     * Parameters:
     * obj- {<Jx.SubMenu>} the sub menu that just became visible
     */
    setVisibleItem: function(obj) {
        if (this.visibleItem != obj) {
            if (this.visibleItem && this.visibleItem.hide) {
                this.visibleItem.hide();
            }
            this.visibleItem = obj;
            this.visibleItem.show();
        }
    },

    /* hide flyout if the user presses the ESC key */
    keypressHandler: function(e) {
        e = new Event(e);
        if (e.key == 'esc') {
            this.hide();
        }
    }
});

