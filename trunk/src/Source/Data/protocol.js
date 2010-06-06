/*
---

name: Jx.Store.Protocol

description: Base class for all store protocols.

license: MIT-style license.

requires:
 - Jx.Store.Response

provides: [Jx.Store.Protocol]

...
 */
// $Id$
/**
 * Class: Jx.Store.Protocol
 * 
 * Extends: <Jx.Object>
 * 
 * Base class for all protocols. Protocols are used for communication, primarily,
 * in Jx.Store. It may be possible to adapt them to be used in other places but
 * that is not their intended function.
 *
 * License: 
 * Copyright (c) 2009, Jon Bomgardner.
 * 
 * This file is licensed under an MIT style license
 */
Jx.Store.Protocol = new Class({
    
    Extends: Jx.Object,
    Family: 'Jx.Store.Protocol',
    
    parser: null,
    
    options: {},
    
    init: function () {
        this.parent();
        
        if ($defined(this.options.parser)) {
            this.parser = this.options.parser;
        }
    },
    
    cleanup: function () {
        this.parser = null;
        this.parent();
    },
    
    /**
     * APIMethod: read
     * Supports reading data from a location. Abstract method that subclasses
     * should implement.
     * 
     * Parameters:
     * options - optional options for configuring the request
     */
    read: $empty,
    /**
     * APIMethod: insert
     * Supports inserting data from a location. Abstract method that subclasses
     * should implement.
     * 
     * Parameters:
     * data - the data to use in creating the record in the form of one or more
     *        Jx.Store.Record instances
     * options - optional options for configuring the request
     */
    insert: $empty,
    /**
     * APIMethod: update
     * Supports updating data at a location. Abstract method that subclasses
     * should implement.
     * 
     * Parameters:
     * data - the data to update (one or more Jx.Store.Record objects)
     * options - optional options for configuring the request
     */
    update: $empty,
    /**
     * APIMethod: delete
     * Supports deleting data from a location. Abstract method that subclasses
     * should implement.
     * 
     * Parameters:
     * data - the data to update (one or more Jx.Store.Record objects)
     * options - optional options for configuring the request
     */
    "delete": $empty,
    /**
     * APIMethod: abort
     * used to abort any of the above methods (where practical). Abstract method
     * that subclasses should implement.
     */
    abort: $empty
});