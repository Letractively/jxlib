// $Id$
/**
 * Class: Jx.Menu.Context
 *
 * Extends: Jx.Menu
 *
 * A <Jx.Menu> that has no button but can be opened at a specific
 * browser location to implement context menus (for instance).
 *
 * Example:
 * (code)
 * (end)
 *
 * Events:
 * TODO - add open/close events?
 *
 * License:
 * Copyright (c) 2008, DM Solutions Group Inc.
 *
 * This file is licensed under an MIT style license
 */
Jx.Menu.Context = new Class({
    Family: 'Jx.Menu.Context',
    Extends: Jx.Menu,

    parameters: ['id'],

    /**
     * APIMethod: render
     * create a new context menu
     */
    render: function() {
        this.id = document.id(this.options.id);
        if (this.id) {
            this.id.addEvent('contextmenu', this.show.bindWithEvent(this));
        }
        this.parent();
    },
    /**
     * Method: show
     * Show the context menu at the location of the mouse click
     *
     * Parameters:
     * e - {Event} the mouse event
     */
    show : function(e) {
        if (this.list.count() ==0) {
            return;
        }

        this.contentContainer.setStyle('visibility','hidden');
        this.contentContainer.setStyle('display','block');
        document.id(document.body).adopt(this.contentContainer);
        /* we have to size the container for IE to render the chrome correctly
         * but just in the menu/sub menu case - there is some horrible peekaboo
         * bug in IE related to ULs that we just couldn't figure out
         */
        this.contentContainer.setContentBoxSize(this.subDomObj.getMarginBoxSize());

        this.position(this.contentContainer, document.body, {
            horizontal: [e.page.x + ' left'],
            vertical: [e.page.y + ' top', e.page.y + ' bottom'],
            offsets: this.chromeOffsets
        });

        this.contentContainer.setStyle('visibility','');
        this.showChrome(this.contentContainer);

        document.addEvent('mousedown', this.hide);
        document.addEvent('keyup', this.keypressHandler);

        e.stop();
    }
});