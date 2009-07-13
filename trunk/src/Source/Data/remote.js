/**
 * Class: Jx.Store.Remote
 * Extends <Jx.Store>. This class adds the ability to load/save data remotely.
 * 
 * Options:
 * In addition to the options for the basic store, it has the following
 * 	
 * dataUrl - The url to load data from
 * autoSave - true | false, indicated whether data should be saved as soon as it's changed
 * saveUrl - the url to send data to
 * 
 * Events:
 * onSaveSuccess() - event fired when all saving happens successfully
 * onSaveError() - event fired when the server returns an error during saving
 */
Jx.Store.Remote = new Class({

    Extends : Jx.Store,

    options : {
        dataUrl : '',
        autoSave : false,
        saveUrl : ''
    },

    saveCount : 0,
    continueSaving : true,

    initialize : function (options) {
        this.parent(options);
        this.addEvent('newrow', this.onNewRow.bind(this));
    },

    /**
     * Method: load
     * Used to load data either locally or remote
     * 
     * Parameters:
     * data - the data to load. Leave this blank to load data from the server
     */
    load : function (data) {
        if ($defined(data)) {
            this.processData(data);
        } else if ($defined(this.options.dataUrl)) {
            this.remoteLoad();
        }
    },

    /** 
     * Method: refresh
     * Override of base function <Jx.Store#refresh>. Allow refreshing data from the server
     * 
     * Parameters:
     * reset - whether to reset the counter after the refresh
     */
    refresh : function (reset) {
        //Call the load function to get the data
        //from the server and reset the counter if requested
        if ($defined(this.options.dataUrl)) {
            this.load();
        } else {
            return null;
        }
        if (reset) {
            this.index = 0;
        }
    
    },
    
    /** 
     * Method: save
     * Determines if a row is dirty and needs to be saved to the server.
     */
    save : function () {
        if ($defined(this.data)) {
            //count how many rows to save
            this.data.each(function (row, index) {
                if (this.isRowDirty(row)) {
                    this.saveCount++;
                }
            }, this);
            //save all dirty rows
            this.data.each(function (row, index) {
                if (this.isRowDirty(row) && this.continueSaving) {
                    row.erase('dirty');
                    this.remoteSave(row);
                }
            }, this);
        } else {
            return null;
        }
    },
    
    /**
     * Method: onNewRow
     * Called when a new row is added (event listener). If autoSave is set, this will
     * fire off the save method.
     */
    onNewRow : function () {
        if (this.options.autoSave) {
            this.save();
        }
    },
    
    /** 
     * Method: remoteSave
     * Private function. Actually does the work of sending the row to the server for saving.
     * 
     * Parameters:
     * data - the row to save
     */
    remoteSave : function (data) {
        //save the data passed in.
        if ($type(data) === 'hash' && this.continueSaving) {
            // save it
            var req = new Request.JSON({
                data : JSON.encode(data),
                url : this.options.saveUrl,
                onSuccess : this.processReturn.bind(this),
                onFailure : this.handleSaveError.bind(this),
                method : 'post'
            });
            req.send();
        } else {
            //don't save it
            return false;
        }
    },
    
    /** 
     * Method: remoteLoad
     * Private function. Calls the server to get data
     */
    remoteLoad : function () {
        var req = new Request.JSON({
            url : this.options.dataUrl,
            onSuccess : this.processGetReturn.bind(this),
            onFailure : this.handleLoadError.bind(this),
            method : 'get'
        });
        req.send();
    },
    
    processReturn : function (data, text) {
        if ($defined(data.success) && data.success === true) {
            this.processSaveReturn(data.data);
        } else {
            this.handleSaveError(data, text);
        }
    },
    
    processGetReturn : function (data, text) {
        if ($defined(data.success) && data.success === true) {
            this.processGetData(data.data);
        } else {
            this.handleLoadError(data, text);
        }
    },
    /** 
     * Method: processSaveReturn
     * Private function. Decreases save counter and fires saveSuccess event when all rows are saved
     * 
     * Parameters:
     * data - json data returned from server
     */
    processSaveReturn : function (data) {
        this.saveCount--;
        if (this.saveCount === 0) {
            this.fireEvent('saveSuccess', this);
        }
    },
    
    /** 
     * Method: handleSaveError
     * Private function. Handles the case where the server returns an error (no JSON object, usually a 500 or 404 type error)
     * Fires saveError event in this case and sets continue saving to false.
     * 
     * Parameters:
     * data - the data returned from the server
     * text - the text version of the data
     */
    handleSaveError : function (data, text) {
        this.continueSaving = false;
        this.fireEvent('saveError', [ this, data, text ]);
    },
    
    /**
     * Method: handleLoadError
     * Private function. Handles problems with loading data by firing the loadError event.
     * 
     * Parameters:
     * data - the data returned from the server
     * text - the text version of the data
     */
    handleLoadError : function (data, text) {
        this.fireEvent('loadError', [ this, data ]);
    },
    
    /** 
     * Method: processGetData
     * Private function. Used to process data retrieved from the server
     * 
     * Parameters:
     * data - the data returned from the server
     * text - the text version of the data
     */
    processGetData : function (data) {
        if ($defined(data.columns)) {
            this.options.columns = data.columns;
        }
        this.processData(data.data);
    }

});