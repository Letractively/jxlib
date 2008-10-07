// $Id: colorpalette.js 1094 2008-09-23 22:04:34Z pspencer $
/**
 * Class: Jx.ColorPalette
 * A Jx.ColorPalette presents a user interface for selecting colors.  Currently,
 * the user can either enter a HEX colour value or select from a palette of
 * web-safe colours.  The user can also enter an opacity value.
 *
 * A Jx.ColorPalette can be embedded anywhere in a web page by appending its
 * <Jx.ColorPalette.domObj> property to an HTML element.  However, a
 * a <Jx.Button> subclass  is provided ( <Jx.Button.Color> ) that embeds a
 * colour panel inside a button for easy use in toolbars.
 *
 * Colour changes are propogated via a changed event.  To
 * be notified of changes in a Jx.ColorPalette, use the addEvent method.
 *
 * Example:
 * (code)
 * (end)
 *
 * Events:
 * change - triggered when the color changes.
 * click - the user clicked on a color swatch (emitted after a change event)
 *
 * Implements:
 * Options - MooTools Class.Extras
 * Events - MooTools Class.Extras
 *
 * License: 
 * Copyright (c) 2008, DM Solutions Group Inc.
 * 
 * This file is licensed under an MIT style license
 */

Jx.ColorPalette = new Class({
    Implements: [Options, Events, Jx.Addable],
    /**
     * Property: {HTMLElement} domObj
     * the HTML element representing the color panel
     */
    domObj: null,
    options: {
        parent: null,
        color: '#000000',
        alpha: 1
    },
    /**
     * Property: {Array} hexColors
     * an array of valid hex values that are used to build a web-safe
     * palette
     */
    hexColors: ['00', '33', '66', '99', 'CC', 'FF'],
    /**
     * Constructor: Jx.ColorPalette
     * initialize a new instance of Jx.ColorPalette
     *
     * Parameters:
     * options - {Object} an object containing a variable list of optional initialization
     * parameters.
     *
     * Options:
     * parent - an html element to add the color palette to if provided.
     * color - a colour to initialize the panel with, defaults to #000000
     *         (black) if not specified.
     * alpha - an alpha value to initialize the panel with, defaults to 1
     *         (opaque) if not specified.
     */
    initialize: function(options) {
        this.setOptions(options);

        this.domObj = new Element('div', {
            id: this.options.id,
            'class':'jxColorPalette'
        });

        var top = new Element('div', {'class':'jxColorBar'});
        var d = new Element('div', {'class':'jxColorPreview'});

        this.selectedSwatch = new Element('div', {'class':'jxColorSelected'});
        this.previewSwatch = new Element('div', {'class':'jxColorHover'});
        d.adopt(this.selectedSwatch);
        d.adopt(this.previewSwatch);
        
        top.adopt(d);

        this.colorInputLabel = new Element('label', {'class':'jxColorLabel', html:'#'});
        top.adopt(this.colorInputLabel);

        var cc = this.changed.bind(this);
        this.colorInput = new Element('input', {
            'class':'jxHexInput',
            'type':'text',
            'maxLength':6,
            events: {
                'keyup':cc,
                'blur':cc,
                'change':cc
            }
        });

        top.adopt(this.colorInput);

        this.alphaLabel = new Element('label', {'class':'jxAlphaLabel', 'html':'alpha (%)'});
        top.adopt(this.alphaLabel);

        this.alphaInput = new Element('input', {
            'class':'jxAlphaInput',
            'type':'text',
            'maxLength':3,
            events: {
                'keyup': this.alphaChanged.bind(this)
            }
        });
        top.adopt(this.alphaInput);

        this.domObj.adopt(top);

        d = new Element('div', {'class':'jxClearer'});
        this.domObj.adopt(d);

        var swatchClick = this.swatchClick.bindWithEvent(this);
        var swatchOver = this.swatchOver.bindWithEvent(this);

        var table = new Element('table', {'class':'jxColorGrid'});
        var tbody = new Element('tbody');
        table.adopt(tbody);
        for (var i=0; i<12; i++) {
            var tr = new Element('tr');
            for (var j=-3; j<18; j++) {
                var bSkip = false;
                var r, g, b;
                /* hacky approach to building first three columns
                 * because I couldn't find a good way to do it
                 * programmatically
                 */

                if (j < 0) {
                    if (j == -3 || j == -1) {
                        r = g = b = 0;
                        bSkip = true;
                    } else {
                        if (i<6) {
                            r = g = b = i;
                        } else {
                            if (i == 6) {
                                r = 5; g = 0; b = 0;
                            } else if (i == 7) {
                                r = 0; g = 5; b = 0;
                            } else if (i == 8) {
                                r = 0; g = 0; b = 5;
                            } else if (i == 9) {
                                r = 5; g = 5; b = 0;
                            } else if (i == 10) {
                                r = 0; g = 5; b = 5;
                            } else if (i == 11) {
                                r = 5; g = 0; b = 5;
                            }
                        }
                    }
                } else {
                    /* remainder of the columns are built
                     * based on the current row/column
                     */
                    r = parseInt(i/6)*3 + parseInt(j/6);
                    g = j%6;
                    b = i%6;
                }
                var bgColor = '#'+this.hexColors[r]+this.hexColors[g]+this.hexColors[b];

                var td = new Element('td');
                if (!bSkip) {
                    td.setStyle('backgroundColor', bgColor);

                    var a = new Element('a', {
                        'class': 'colorSwatch ' + (((r > 2 && g > 2) || (r > 2 && b > 2) || (g > 2 && b > 2)) ? 'borderBlack': 'borderWhite'),
                        'href':'javascript:void(0)',
                        'title':bgColor,
                        'alt':bgColor,
                        events: {
                            'mouseover': swatchOver,
                            'click': swatchClick
                        }
                    });
                    a.store('swatchColor', bgColor);
                    td.adopt(a);
                } else {
                    var span = new Element('span', {'class':'emptyCell'});
                    td.adopt(span);
                }
                tr.adopt(td);
            }
            tbody.adopt(tr);
        }
        this.domObj.adopt(table);
        this.updateSelected();
        if (this.options.parent) {
            this.addTo(this.options.parent);
        }
    },

    /**
     * Method: swatchOver
     * handle the mouse moving over a colour swatch by updating the preview
     *
     * Parameters:
     * e - {Event} the mousemove event object
     */
    swatchOver: function(e) {
        var a = e.target;

        this.previewSwatch.setStyle('backgroundColor', a.retrieve('swatchColor'));
    },

    /**
     * Method: swatchClick
     * handle mouse click on a swatch by updating the color and hiding the
     * panel.
     *
     * Parameters:
     * e - {Event} the mouseclick event object
     */
    swatchClick: function(e) {
        var a = e.target;

        this.options.color = a.retrieve('swatchColor');
        this.updateSelected();
        this.fireEvent('click', this);
    },

    /**
     * Method: changed
     * handle the user entering a new colour value manually by updating the
     * selected colour if the entered value is valid HEX.
     */
    changed: function() {
        var color = this.colorInput.value;
        if (color.substring(0,1) == '#') {
            color = color.substring(1);
        }
        if (color.toLowerCase().match(/^[0-9a-f]{6}$/)) {
            this.options.color = '#' +color.toUpperCase();
            this.updateSelected();
        }
    },

    /**
     * Method: alphaChanged
     * handle the user entering a new alpha value manually by updating the
     * selected alpha if the entered value is valid alpha (0-100).
     */
    alphaChanged: function() {
        var alpha = this.alphaInput.value;
        if (alpha.match(/^[0-9]{1,3}$/)) {
            this.options.alpha = parseFloat(alpha/100);
            this.updateSelected();
        }
    },

    /**
     * Method: setColor
     * set the colour represented by this colour panel
     *
     * Parameters:
     * color - {String} the new hex color value
     */
    setColor: function( color ) {
        this.colorInput.value = color;
        this.changed();
    },

    /**
     * Method: setAlpha
     * set the alpha represented by this colour panel
     *
     * Parameters:
     * alpha - {Integer} the new alpha value (between 0 and 100)
     */
    setAlpha: function( alpha ) {
        this.alphaInput.value = alpha;
        this.alphaChanged();
    },

    /**
     * Method: updateSelected
     * update the colour panel user interface based on the current
     * colour and alpha values
     */
    updateSelected: function() {
        var styles = {'backgroundColor':this.options.color};

        this.colorInput.value = this.options.color.substring(1);

        this.alphaInput.value = parseInt(this.options.alpha*100);
        if (this.options.alpha < 1) {
            styles.opacity = this.options.alpha;
            styles.filter = 'Alpha(opacity='+(this.options.alpha*100)+')';
        } else {
            styles.opacity = '';
            styles.filter = '';
        }
        this.selectedSwatch.setStyles(styles);
        this.previewSwatch.setStyles(styles);
        this.fireEvent('change', this);
    }
});
