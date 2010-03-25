// $Id$
/**
 * Class: Jx.Column
 *
 * Extends: <Jx.Object>
 *
 * The class used for defining columns for grids.
 *
 * Example:
 * (code)
 * (end)
 *
 * License:
 * Copyright (c) 2009, Jon Bomgardner.
 *
 * This file is licensed under an MIT style license
 */
Jx.Column = new Class({

	Family: 'Jx.Column',
    Extends: Jx.Widget,

    options: {
        /**
         * Option: renderMode
         * The mode to use in rendering this column to determine its width. 
         * Valid options include
         * 
         * fit - auto calculates the width for the best fit to the text. This 
         * 			is the default.
         * fixed - uses the value passed in the width option, doesn't 
         * 			auto calculate.
         * expand - uses the value in the width option as a minimum width and 
         * 			allows this column to expand and take up any leftover space. 
         * 			NOTE: there can be only 1 expand column in a grid. The 
         * 			Jx.Columns object will only take the first column with this 
         * 			option as the expanding column. All remaining columns marked 
         * 			"expand" will be treated as "fixed".
         */
        renderMode: 'fit',
        /**
         * Option: width
         * Determines the width of the column when using 'fixed' rendering mode
         * or acts as a minimum width when using 'expand' mode.
         */
        width: null,
        /**
         * Option: isEditable
         * allows/disallows editing of the column contents
         */
        isEditable: false,
        /**
         * Option: isSortable
         * allows/disallows sorting based on this column
         */
        isSortable: false,
        /**
         * Option: isResizable
         * allows/disallows resizing this column dynamically
         */
        isResizable: false,
        /**
         * Option: isHidden
         * determines if this column can be shown or not
         */
        isHidden: false,
        /**
         * Option: name
         * The name given to this column
         */
        name: '',
        /**
         * Option: template
         */
        template: '<span class="jxGridCellContent">Header</span>',
        /**
         * Option: renderer
         * an instance of a Jx.Grid.Renderer to use in rendering the content
         * of this column.
         */
        renderer: null,
        /**
         * Option: dataType
         * The type of the data in this column, used for sorting. Can be
         * alphanumeric, numeric, currency, boolean, or date
         */
        dataType: 'alphanumeric'
    },
    
    classes: $H({
    	domObj: 'jxGridCellContent'
    }),
    /**
     * Property: model
     * holds a reference to the model (an instance of <Jx.Store> or subclass)
     */
    model: null,

    parameters: ['options','grid'],

    /**
     * Constructor: Jx.Column
     * initializes the column object
     */
    init : function () {
    	
    	
        this.parent();
        if ($defined(this.options.grid) && this.options.grid instanceof Jx.Grid) {
            this.grid = this.options.grid;
        }
        this.name = this.options.name;
        //check renderer
        if ($defined(this.options.renderer)
                && !(this.options.renderer instanceof Jx.Grid.Renderer)) {
            var t = Jx.type(this.options.renderer);
            if (t === 'object') {
                this.options.renderer = new Jx.Grid.Renderer[this.options.renderer.name](
                        this.options.renderer.options);
            }
        } else {
        	//set a default renderer
        }
        
        this.options.renderer.setColumn(this);
        
    },
    	
    /**
     * APIMethod: getHeaderHTML
     */
    getHeaderHTML : function () {
    	if (this.isSortable()) {
    		new Element('img', {
	          src: Jx.aPixel.src
	        }).inject(this.domObj);	
    	}
        return this.domObj;
    },

    setWidth: function(newWidth) {
    	this.width = parseInt(newWidth,10);
        if (this.rule && parseInt(newWidth,10) >= 0) {
            this.rule.style.width = parseInt(newWidth,10) + "px";
        }
    },
    
    getWidth: function () {
    	return this.width;
    },
    /**
     * APIMethod: calculateWidth
     * returns the width of the column.
     *
     * Parameters:
     * recalculate - {boolean} determines if the width should be recalculated
     *          if the column is set to autocalculate. Has no effect if the width is
     *          preset
     * rowHeader - flag to tell us if this calculation is for the row header
     */
    calculateWidth : function (rowHeader) {
        //if this gets called then we assume that we want to calculate the width
    	rowHeader = $defined(rowHeader) ? rowHeader : false;
        var maxWidth;
        
        //calculate the width
        var model = this.grid.getModel();
        var oldPos = model.getPosition();
        maxWidth = 0;
        model.first();
        while (model.valid()) {
            //check size by placing text into a TD and measuring it.
        	this.options.renderer.render();
            var text = $(this.options.renderer);
            var klass = 'jxGridCell';
            if (this.grid.row.useHeaders()
                    && this.options.name === this.grid.row
                    .getRowHeaderColumn()) {
                klass = 'jxGridRowHead';
            }
            var s = this.measure(text, klass, rowHeader, model.getPosition());
            if (s.width > maxWidth) {
                maxWidth = s.width;
            }
            if (model.hasNext()) {
                model.next();
            } else {
                break;
            }
        }

        //check the column header as well (unless this is the row header)
        if (!(this.grid.row.useHeaders() && this.options.name === this.grid.row
                .getRowHeaderColumn())) {
            klass = 'jxGridColHead';
            if (this.isEditable()) {
                klass += ' jxColEditable';
            }
            if (this.isResizable()) {
                klass += ' jxColResizable';
            }
            if (this.isSortable()) {
                klass += ' jxColSortable';
            }
            s = this.measure(this.domObj.clone(), klass);
            if (s.width > maxWidth) {
                maxWidth = s.width;
            }
        }
        this.width = maxWidth;
        model.moveTo(oldPos);
        return this.width;
    },
    /**
     * Method: measure
     * This method does the dirty work of actually measuring a cell
     *
     * Parameters:
     * text - the text to measure
     * klass - a string indicating and extra classes to add so that
     *          css classes can be taken into account.
     */
    measure : function (text, klass, rowHeader, row) {
        var d = new Element('span', {
            'class' : klass
        });
        text.inject(d);
        //d.setStyle('height', this.grid.row.getHeight(row));
        d.setStyles({
            'visibility' : 'hidden',
            'width' : 'auto'
        });
        d.inject(document.body, 'bottom');
        var s = d.measure(function () {
            //if not rowHeader, get size of innner span
            if (!rowHeader) {
                return this.getFirst().getContentBoxSize();
            } else {
                return this.getMarginBoxSize();
            }
        });
        d.destroy();
        return s;
    },
    /**
     * APIMethod: isEditable
     * Returns whether this column can be edited
     */
    isEditable : function () {
        return this.options.isEditable;
    },
    /**
     * APIMethod: isSortable
     * Returns whether this column can be sorted
     */
    isSortable : function () {
        return this.options.isSortable;
    },
    /**
     * APIMethod: isResizable
     * Returns whether this column can be resized
     */
    isResizable : function () {
        return this.options.isResizable;
    },
    /**
     * APIMethod: isHidden
     * Returns whether this column is hidden
     */
    isHidden : function () {
        return this.options.isHidden;
    },
    /**
     * APIMethod: getHTML
     * calls render method of the renderer object passed in.
     */
    getHTML : function () {
        this.options.renderer.render();
        return document.id(this.options.renderer);
    }

});