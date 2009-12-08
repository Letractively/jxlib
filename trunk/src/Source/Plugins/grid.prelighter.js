// $Id$
/**
 * Class: Jx.Plugin.Prelighter
 *
 * Extends: <Jx.Plugin>
 *
 * Grid plugin to prelight rows, columns, and cells
 *
 * Inspired by the original code in Jx.Grid
 *
 * License:
 * Original Copyright (c) 2008, DM Solutions Group Inc.
 * This version Copyright (c) 2009, Jon Bomgardner.
 *
 * This file is licensed under an MIT style license
 */
Jx.Plugin.Grid.Prelighter = new Class({

    Extends : Jx.Plugin,

    options : {
        /**
         * Option: cell
         * defaults to false.  If set to true, the cell under the mouse is
         * highlighted as the mouse moves.
         */
        cell : false,
        /**
         * Option: row
         * defaults to false.  If set to true, the row under the mouse is
         * highlighted as the mouse moves.
         */
        row : false,
        /**
         * Option: column
         * defaults to false.  If set to true, the column under the mouse is
         * highlighted as the mouse moves.
         */
        column : false,
        /**
         * Option: rowHeader
         * defaults to false.  If set to true, the row header of the row under
         * the mouse is highlighted as the mouse moves.
         */
        rowHeader : false,
        /**
         * Option: columnHeader
         * defaults to false.  If set to true, the column header of the column
         * under the mouse is highlighted as the mouse moves.
         */
        columnHeader : false
    },
    /**
     * Property: bound
     * storage for bound methods useful for working with events
     */
    bound: {},
    /**
     * APIMethod: init
     * construct a new instance of the plugin.  The plugin must be attached
     * to a Jx.Grid instance to be useful though.
     */
    init: function() {
        this.parent();
        this.bound.lighton = this.lighton.bind(this);
        this.bound.lightoff = this.lightoff.bind(this);
        this.bound.mouseleave = this.mouseleave.bind(this);
    },
    /**
     * APIMethod: attach
     * Sets up the plugin and connects it to the grid
     */
    attach: function (grid) {
        if (!$defined(grid) && !(grid instanceof Jx.Grid)) {
            return;
        }
        this.grid = grid;
        this.grid.addEvent('gridCellEnter', this.bound.lighton);
        this.grid.addEvent('gridCellLeave', this.bound.lightoff);
        this.grid.addEvent('gridMouseLeave', this.bound.mouseleave);
    },
    /**
     * APIMethod: detach
     */
    detach: function() {
        if (this.grid) {
            this.grid.removeEvent('gridCellEnter', this.bound.lighton);
            this.grid.removeEvent('gridCellLeave', this.bound.lightoff);
            this.grid.removeEvent('gridMouseLeave', this.bound.mouseleave);
        }
        this.grid = null;
    },
    /**
     * APIMethod: activate
     * Allows programatic access to turning prelighting on.
     * 
     * Parameters:
     * opt - the option to turn on. One of 'cell', 'row', 'rowHeader', 'column', or 'columnHeader'
     */
    activate: function (opt) {
        this.options[opt] = true;
    },
    /**
     * APIMethod: deactivate
     * Allows programatic access to turning prelighting off.
     * 
     * Parameters:
     * opt - the option to turn off. One of 'cell', 'row', 'rowHeader', 'column', or 'columnHeader'
     */
    deactivate: function (opt) {
        this.options[opt] = false;
    },
    /**
     * Method: lighton
     */
    lighton : function (cell, list, grid) {
        this.light(cell, list, grid, true);

    },
    /**
     * Method: lightoff
     */
    lightoff : function (cell, list, grid) {
        this.light(cell, list, grid, false);

    },
    /**
     * Method: light
     * dispatches the event to the various prelight methods.
     */
    light: function (cell, list, grid, on) {
        var data = cell.retrieve('jxCellData');

        if (this.options.cell) {
            this.prelightCell(cell, on);
        }
        if (this.options.row) {
            this.prelightRow(data.row, on);
        }
        if (this.options.column) {
            if (this.grid.row.useHeaders()) {
                this.prelightColumn(data.index - 1, on);
            } else {
                this.prelightColumn(data.index, on);
            }
        }
        if (this.options.rowHeader) {
            this.prelightRowHeader(data.row, on);
        }
        if (this.options.columnHeader) {
            this.prelightColumnHeader(data.index - 1, on);
        }
    },

    /**
     * Method: prelightRowHeader
     * apply the jxGridRowHeaderPrelight style to the header cell of a row.
     * This removes the style from the previously pre-lit row header.
     *
     * Parameters:
     * row - {Integer} the row to pre-light the header cell of
     */
    prelightRowHeader : function (row, on) {
        if ($defined(this.prelitRowHeader) && !on) {
            this.prelitRowHeader.removeClass('jxGridRowHeaderPrelight');
        } else if (on) {
            this.prelitRowHeader = (row >= 0 && row < this.grid.rowTableHead.rows.length) ? this.grid.rowTableHead.rows[row].cells[0] : null;
            if (this.prelitRowHeader) {
                this.prelitRowHeader.addClass('jxGridRowHeaderPrelight');
            }
        }
    },
    /**
     * Method: prelightColumnHeader
     * apply the jxGridColumnHeaderPrelight style to the header cell of a column.
     * This removes the style from the previously pre-lit column header.
     *
     * Parameters:
     * col - {Integer} the column to pre-light the header cell of
     * on - flag to tell if we're lighting on or off
     */
    prelightColumnHeader : function (col, on) {
        if (this.grid.colTableBody.rows.length === 0) {
            return;
        }

        if ($defined(this.prelitColumnHeader) && !on) {
            this.prelitColumnHeader.removeClass('jxGridColumnHeaderPrelight');
        } else if (on) {
            this.prelitColumnHeader = (col >= 0 && col < this.grid.colTableBody.rows[0].cells.length) ? this.grid.colTableBody.rows[0].cells[col] : null;
            if (this.prelitColumnHeader) {
                this.prelitColumnHeader.addClass('jxGridColumnHeaderPrelight');
            }
        }

    },
    /**
     * Method: prelightRow
     * apply the jxGridRowPrelight style to row.
     * This removes the style from the previously pre-lit row.
     *
     * Parameters:
     * row - {Integer} the row to pre-light
     * on - flag to tell if we're lighting on or off
     */
    prelightRow : function (row, on) {
       if ($defined(this.prelitRow) && !on) {
            this.prelitRow.removeClass('jxGridRowPrelight');
        } else if (on) {
            this.prelitRow = (row >= 0 && row < this.grid.gridTableBody.rows.length) ? this.grid.gridTableBody.rows[row] : null;
            if (this.prelitRow) {
                this.prelitRow.addClass('jxGridRowPrelight');
            }
        }
        this.prelightRowHeader(row, on);
    },
    /**
     * Method: prelightColumn
     * apply the jxGridColumnPrelight style to a column.
     * This removes the style from the previously pre-lit column.
     *
     * Parameters:
     * col - {Integer} the column to pre-light
     * on - flag to tell if we're lighting on or off
     */
    prelightColumn : function (col, on) {
        if (col >= 0 && col < this.grid.gridTable.rows[0].cells.length) {
            if ($defined(this.prelitColumn) && !on) {
                for (var i = 0; i < this.grid.gridTable.rows.length; i++) {
                    this.grid.gridTable.rows[i].cells[this.prelitColumn].removeClass('jxGridColumnPrelight');
                }
            } else if (on) {
                this.prelitColumn = col;
                for (i = 0; i < this.grid.gridTable.rows.length; i++) {
                    this.grid.gridTable.rows[i].cells[col].addClass('jxGridColumnPrelight');
                }
            }
            this.prelightColumnHeader(col, on);
        }
    },
    /**
     * Method: prelightCell
     * apply the jxGridCellPrelight style to a cell.
     * This removes the style from the previously pre-lit cell.
     *
     * Parameters:
     * cell - the cell to lighton/off
     * on - flag to tell if we're lighting on or off
     */
    prelightCell : function (cell, on) {
        if ($defined(this.prelitCell) && !on) {
            this.prelitCell.removeClass('jxGridCellPrelight');
        } else if (on) {
            this.prelitCell = cell;
            if (this.prelitCell) {
                this.prelitCell.addClass('jxGridCellPrelight');
            }
        }
    },
    
    mouseleave: function() {
        //turn off all prelights when the mouse leaves the grid
        if ($defined(this.prelitCell)) {
            this.prelitCell.removeClass('jxGridCellPrelight');
        }
        if ($defined(this.prelitColumn)) {
            for (var i = 0; i < this.grid.gridTable.rows.length; i++) {
                this.grid.gridTable.rows[i].cells[this.prelitColumn].removeClass('jxGridColumnPrelight');
            }
        }
        if ($defined(this.prelitRow)) {
            this.prelitRow.removeClass('jxGridRowPrelight');
        }
        if ($defined(this.prelitColumnHeader)) {
            this.prelitColumnHeader.removeClass('jxGridColumnHeaderPrelight');
        }
        if ($defined(this.prelitRowHeader)) {
            this.prelitRowHeader.removeClass('jxGridRowHeaderPrelight');
        }
    }
});
