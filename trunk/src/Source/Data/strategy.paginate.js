// $Id$
/**
 * Class: Jx.Store.Strategy.Paginate
 * 
 * Extends: <Jx.Store.Strategy>
 * 
 * Store strategy for paginating results in a store.
 *
 * License: 
 * Copyright (c) 2009, Jon Bomgardner.
 * 
 * This file is licensed under an MIT style license
 */
Jx.Store.Strategy.Paginate = new Class({
    
    Extends: Jx.Store.Strategy,
    
    name: 'paginate',
    
    options: {
        /**
         * Option: getPaginationParams
         * a function that returns an object that holds the parameters
         * necessary for getting paginated data from a protocol.
         */
        getPaginationParams: function () {
            return {
                page: this.page,
                itemsPerPage: this.itemsPerPage
            }
        },
        /**
         * Option: startingItemsPerPage
         * Used to set the intial itemsPerPage for the strategy. the pageSize 
         * can be changed using the setPageSize() method.
         */
        startingItemsPerPage: 25,
        /**
         * Option: startingPage
         * The page to start on. Defaults to 1 but can be set to any other 
         * page.
         */
        startingPage: 1,
        /**
         * Option: expirationInterval
         * The interval, in milliseconds (1000 = 1 sec), to hold a page of data
         * before it expires. If the page is expired, the next time the page
         * is accessed it must be retrieved again. Default is 5 minutes (1000 * 60 * 5)
         */
        expirationInterval: (1000 * 60 * 5),
        /**
         * Option: ignoreExpiration
         * Set to TRUE to ignore the expirationInterval setting and never expire
         * pages.
         */
        ignoreExpiration: false
    },
    /**
     * Property: data
     * holds the pages of data keyed by page number.
     */
    data: new Hash(),
    /**
     * property: cacheTimer
     * holds one or more cache timer ids - one per page. Each page is set to 
     * expire after a certain amount of time.
     */
    cacheTimer: new Hash(),
    /**
     * Property: page
     * Tracks the page the store currently holds.
     */
    page: null,
    /**
     * Property: itemsPerPage
     * The number of items on each page
     */
    itemsPerPage: null,
    
    init: function () {
        this.parent();
        //set up bindings that we need here
        this.bound = {
            load: this.load.bind(this),
            loadStore: this.loadStore.bind(this)
        };
        this.itemsPerPage = this.options.startingItemsPerPage;
        this.page = this.options.startingPage;
    },
    
    activate: function () {
        this.parent();
        this.store.addEvent('storeLoad', this.bound.load);
    },
    
    deactivate: function () {
        this.parent();
        this.store.removeEvent('storeLoad', this.bound.load);
    },
    /**
     * APIMethod: load
     * Called to load data into the store
     * 
     * Parameters:
     * params - a Hash of parameters to use in getting data from the protocol.
     */
    load: function (params) {
        this.store.fireEvent('storeBeginDataLoad', this.store);
        this.store.protocol.addEvent('dataLoaded', this.bound.loadStore);
        var opts = {
            data: $merge(params, this.options.getPaginationParams.apply(this))
        };
        this.store.protocol.read(opts);
    },
    /**
     * MethodL loadStore
     * Used to assist in the loading of data into the store. This is 
     * called as a response to the protocol finishing.
     * 
     *  Parameters:
     *  resp - the response object
     */
    loadStore: function (resp) {
        this.store.protocol.removeEvent('dataLoaded', this.bound.loadStore);
        if (resp.success()) {
            if ($defined(resp.meta)) {
                this.parseMetaData(resp.meta);
            }
            this.data.set(this.page,resp.data);
            this.loadData(resp.data);
        } else {
            this.store.fireEvent('storeDataLoadFailed', this.store);
        }
    },
    /**
     * Method: loadData
     * This method does the actual work of loading data to the store. It is called
     * when either the protocol finishes or setPage() has the data and it's not
     * expired.
     * 
     * Parameters:
     * data - the data to load into the store.
     */
    loadData: function (data) {
        this.store.empty();
        this.store.loaded = false;
        if (!this.options.ignoreExpiration) {
            var id = this.expirePage.delay(this.options.expirationInterval, this, this.page);
            this.cacheTimer.set(this.page,id);
        }
        this.store.addRecords(data);
        this.store.loaded = true;
        this.store.fireEvent('storeDataLoaded',this.store);
    },
    /**
     * Method: parseMetaData
     * Takes the metadata returned from the protocol and places it in the appropriate
     * places.
     * 
     * Parameters:
     * meta - the meta data object returned from the protocol.
     */
    parseMetaData: function (meta) {
        if ($defined(meta.columns)) {
            this.store.options.columns = meta.columns;
        }
        if ($defined(meta.totalItems)) {
            this.totalItems = meta.totalItems;
        }
        if ($defined(meta.totalPages)) {
            this.totalPages = meta.totalPages;
        }
        if ($defined(meta.primaryKey)) {
            this.store.options.recordOptions.primaryKey = meta.primaryKey;
        }
            
    },
    /**
     * Method: expirePage
     * Is called when a pages cache timer expires. Will expire the page by 
     * erasing the page and timer. This will force a reload of the data the 
     * next time the page is accessed.
     * 
     * Parameters:
     * page - the page number to expire.
     */
    expirePage: function (page) {
        this.data.erase(page);
        this.cacheTimer.erase(page);
    },
    /**
     * APIMethod: setPage
     * Allows a caller (i.e. a paging toolbar) to move to a specific page.
     * 
     * Parameters:
     * page - the page to move to. Can be any absolute page number, any number
     *        prefaced with '-' or '+' (i.e. '-1', '+3'), 'first', 'last', 
     *        'next', or 'previous'
     */
    setPage: function (page) {
        if (Jx.type(page) === 'string') {
            switch (page) {
                case 'first':
                    this.page = 1;
                    break;
                case 'last':
                    this.page = this.totalPages;
                    break;
                case 'next':
                    this.page++;
                    break;
                case 'previous':
                    this.page--;
                    break;
                default:
                    this.page = this.page + Jx.getNumber(page);
                    break;
            }
        } else {
            this.page = page;
        }
        if (this.cacheTimer.has(this.page)) {
            $clear(this.cacheTimer.get(this.page));
            this.cacheTimer.erase(this.page);
        }
        if (this.data.has(this.page)){
            this.loadData(this.data.get(this.page));
        } else {
            this.load(this.params);
        }
    },
    /**
     * APIMethod: getPage
     * returns the current page
     */
    getPage: function () {
        return this.page;
    },
    /**
     * APIMethod: getNumberOfPages
     * returns the total number of pages.
     */
    getNumberOfPages: function () {
        return this.totalPages;
    },
    /**
     * APIMethod: setPageSize
     * sets the current size of the pages. Calling this will expire every page 
     * and force the current one to reload with the new size.
     */
    setPageSize: function (size) {
        //set the page size 
        this.itemsPerPage = size;
        //invalidate all pages cached and reload the current one only
        this.cacheTimer.each(function(val){
            $clear(val);
        },this);
        this.cacheTimer.empty();
        this.data.empty();
        this.load();
    },
    /**
     * APIMethod: getPageSize
     * returns the current page size
     */
    getPageSize: function () {
        return this.itemsPerPage;
    },
    /**
     * APIMethod: getTotalCount
     * returns the total number of items as received from the protocol.
     */
    getTotalCount: function () {
        return this.totalItems;
    }
    
    
});