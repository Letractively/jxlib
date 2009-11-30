// $Id$
/**
 * Class: Jx.List
 * 
 * Manage a list of DOM elements and provide an API and events for managing
 * those items within a container.  Works with Jx.Selection to manage
 * selection of items in the list.  You have two options for managing
 * selections.  The first, and default, option is to specify select: true
 * in the constructor options and any of the <Jx.Selection> options as well.
 * This will create a default Jx.Selection object to manage selections.  The
 * second option is to pass a Jx.Selection object as the third constructor
 * argument.  This allows sharing selection between multiple lists.
 *
 * Example:
 * (code)
 * (end)
 *
 * Events:
 * add - fired when an item is added
 * remove - fired when an item is removed
 * mouseenter - fired when the user mouses over an element
 * mouseleave - fired when the user mouses out of an element
 * select - fired when an item is selected
 * unselect - fired when an item is selected
 *
 * License: 
 * Copyright (c) 2008, DM Solutions Group Inc.
 * 
 * This file is licensed under an MIT style license
 */
Jx.List = new Class({
    Family: 'Jx.List',
    Extends: Jx.Object,
    parameters: ['container', 'options', 'selection'],
    /* does this object own the selection object (and should clean it up) */
    ownsSelection: false,
    /**
     * APIProperty: container
     * the element that will contain items as they are added
     */
    container: null,
    /**
     * APIProperty: selection
     * <Jx.Selection> a selection object if selection is enabled
     */
    selection: null,
    options: {
        /**
         * Option: items
         * an array of items to add to the list right away
         */
        items: null,
        /**
         * Option: hover
         * {Boolean} default true.  If set to true, the wrapper element will
         * obtain the defined hoverClass if set and mouseenter/mouseleave
         * events will be emitted when the user hovers over and out of elements
         */
        hover: false,
        /**
         * Option: hoverClass
         * the CSS class name to add to the wrapper element when the mouse is
         * over an item
         */
        hoverClass: 'jxHover',

        /**
         * Option: press
         * {Boolean} default true.  If set to true, the wrapper element will
         * obtain the defined pressClass if set and mousedown/mouseup
         * events will be emitted when the user clicks on elements
         */
        press: false,
        /**
         * Option: pressedClass
         * the CSS class name to add to the wrapper element when the mouse is
         * down on an item
         */
        pressClass: 'jxPressed',
        
        /**
         * Option: select
         * {Boolean} default true.  If set to true, the wrapper element will
         * obtain the defined selectClass if set and select/unselect events
         * will be emitted when items are selected and unselected.  For other
         * selection objects, see <Jx.Selection>
         */
        select: false
    },
    
    /**
     * Method: init
     * internal method to initialize this object
     */
    init: function() {
        this.container = document.id(this.options.container);
        this.container.store('jxList', this);
        
        var target = this;
        var isEnabled = function(el) {
            var item = el.retrieve('jxListTargetItem') || el;
            return !item.hasClass('jxDisabled');
        };
        var isSelectable = function(el) {
            var item = el.retrieve('jxListTargetItem') || el;
            return !item.hasClass('jxUnselectable');
        };
        this.bound = {
            mousedown: function() {
                if (isEnabled(this)) {
                    this.addClass(target.options.pressClass);
                    target.fireEvent('mousedown', this, target);
                }
            },
            mouseup: function() {
                if (isEnabled(this)) {
                    this.removeClass(target.options.pressClass);
                    target.fireEvent('mouseup', this, target);
                }
            },
            mouseenter: function() {
                if (isEnabled(this)) {
                    this.addClass(target.options.hoverClass);
                    target.fireEvent('mouseenter', this, target);
                }
            },
            mouseleave: function() {
                if (isEnabled(this)) {
                    this.removeClass(target.options.hoverClass);
                    target.fireEvent('mouseleave', this, target);
                }
            },
            keydown: function(e) {
                if (e.key == 'enter' && isEnabled(this)) {
                    this.addClass('jxPressed');
                }
            },
            keyup: function(e) {
                if (e.key == 'enter' && isEnabled(this)) {
                    this.removeClass('jxPressed');
                }
            },
            click: function () {
                if (target.selection && 
                    isEnabled(this) && 
                    isSelectable(this)) {
                    target.selection.select(this, target);
                }
            },
            select: function(item) {
                if (isEnabled(item)) {
                    var itemTarget = item.retrieve('jxListTargetItem') || item;
                    target.fireEvent('select', itemTarget);
                }
            },
            unselect: function(item) {
                if (isEnabled(item)) {
                    var itemTarget = item.retrieve('jxListTargetItem') || item;
                    target.fireEvent('unselect', itemTarget);
                }
            }
        };
        
        if (this.options.selection) {
            this.selection = this.options.selection;
            this.options.select = true;
        } else if (this.options.select) {
            this.selection = new Jx.Selection(this.options);
            this.ownsSelection = true;
        }
            
        if ($defined(this.options.items)) {
            this.add(this.options.items);
        }
    },
    
    /**
     * Method: cleanup
     * destroy the list and release anything it references
     */
    cleanup: function() {
        this.container.getChildren().each(function(item){
            this.remove(item);
        }, this);
        this.setSelection(null);
        this.bound = null;
        this.container.eliminate('jxList');
    },
    
    /**
     * APIMethod: add
     * add an item to the list of items at the specified position
     *
     * Parameters:
     * item - {mixed} the object to add, a DOM element or an
     * object that provides a getElement method.  An array of items may also
     * be provided.  All items are inserted sequentially at the indicated
     * position.
     * position - {mixed} optional, the position to add the element, either
     * an integer position in the list or another item to place this item
     * after
     */
    add: function(item, position) {
        if (Jx.type(item) == 'array') {
            item.each(function(what){ this.add(what, position); }.bind(this) );
            return;
        }
        /* the element being wrapped */
        var el = document.id(item);
        var target = el.retrieve('jxListTarget') || el;
        if (target) {
            target.store('jxListTargetItem', el);
            if (this.options.press && this.options.pressClass) {
                target.addEvents({
                    mousedown: this.bound.mousedown,
                    mouseup: this.bound.mouseup,
                    keyup: this.bound.keyup,
                    keydown: this.bound.keydown
                });
            }
            if (this.options.hover && this.options.hoverClass) {
                target.addEvents({
                    mouseenter: this.bound.mouseenter,
                    mouseleave: this.bound.mouseleave
                });
            }
            if (this.selection) {
                target.addEvents({
                    click: this.bound.click
                });
            }
            if ($defined(position)) {
                if ($type(position) == 'integer') {
                    if (position < this.container.childNodes.length) {
                        el.inject(this.container.childNodes[position],' before');
                    } else {
                        el.inject(this.container, 'bottom');
                    }
                } else if (this.container.hasChild(position)) {
                    el.inject(position,'after');
                }
                this.fireEvent('add', item, this);
            } else {
                el.inject(this.container, 'bottom');
                this.fireEvent('add', item, this);
            }
            if (this.selection) {
                this.selection.defaultSelect(el);
            }
        }
    },
    /**
     * APIMethod: remove
     * remove an item from the list of items
     *
     * Parameters:
     * item - {mixed} the item to remove or the index of the item to remove. 
     * An array of items may also be provided.
     *
     * Returns:
     * {mixed} the item that was removed or null if the item is not a member
     * of this list.
     */
    remove: function(item) {
        var el = document.id(item);
        if (el && this.container.hasChild(el)) {
            this.unselect(el, true);
            el.dispose();
            var target = el.retrieve('jxListTarget') || el;
            target.removeEvents(this.bound);
            this.fireEvent('remove', item, this);
            return item;
        }
        return null;
    },
    /**
     * APIMethod: replace
     * replace one item with another
     *
     * Parameters:
     * item - {mixed} the item to replace or the index of the item to replace
     * withItem - {mixed} the object, DOM element, Jx.Object or an object 
     * implementing getElement to add
     *
     * Returns:
     * {mixed} the item that was removed
     */
    replace: function(item, withItem) {
        if (this.container.hasChild(item)) {
            this.add(withItem, item);
            this.remove(item);
        }
    },
    /**
     * APIMethod: indexOf
     * find the index of an item in the list
     *
     * Parameters:
     * item - {mixed} the object, DOM element, Jx.Object or an object 
     * implementing getElement to find the index of
     * 
     * Returns:
     * {integer} the position of the item or -1 if not found
     */
    indexOf: function(item) {
        return $A(this.container.childNodes).indexOf(item);
    },
    /**
     * APIMethod: count
     * returns the number of items in the list
     */
    count: function() {
        return this.container.childNodes.length;
    },
    /**
     * APIMethod: items
     * returns an array of the items in the list
     */
    items: function() {
        return $A(this.container.childNodes);
    },
    /**
     * APIMethod: each
     * applies the supplied function to each item
     *
     * Parameters:
     * func - {function} the function to apply, it will receive the item and
     * index of the item as parameters
     */
    each: function(f) {
        $A(this.container.childNodes).each(f);
    },
    /**
     * APIMethod: select
     * select an item
     *
     * Parameters:
     * item - {mixed} the object to select, a DOM element, a Jx.Object, or an
     * object that provides a getElement method.  An array of items may also be
     * provided.
     */
    select: function(item) {
        if (this.selection) {
            this.selection.select(item);
        }
    },
    /**
     * APIMethod: unselect
     * unselect an item or items
     *
     * Parameters:
     * item - {mixed} the object to select, a DOM element, a Jx.Object, or an
     * object that provides a getElement method.  An array of elements may also
     * be provided.
     * force - {Boolean} force deselection even if this violates the minimum
     * selection constraint (used internally when removing items)
     */
    unselect: function(item, force) {
        if (this.selection) {
            this.selection.unselect(item);
        }
    },
    /**
     * APIMethod: selected
     * returns the selected item or items
     *
     * Returns:
     * {mixed} the selected item or an array of selected items
     */
    selected: function() {
        return this.selection ? this.selection.selected : [];
    },
    /**
     * APIMethod: empty
     * clears all of the items from the list
     */
    empty: function(){
        this.container.getChildren().each(function(item){
            this.remove(item);
        }, this);
    },
    /**
     * APIMethod: setSelection
     * sets the <Jx.Selection> object that this list will use for selection
     * events.
     *
     * Parameters:
     * {<Jx.Selection>} the selection object, or null to remove it.
     */
    setSelection: function(selection) {
        if (this.selection) {
            this.selection.removeEvents(this.bound);
            if (this.ownsSelection) {
                this.selection.destroy();
                this.ownsSelection = false;
            }
        }
        
        this.selection = selection;
        if (this.selection) {
            this.selection.addEvents({
                select: this.bound.select,
                unselect: this.bound.unselect
            });
        }
    }

});