/**
 * Class: Jx.Grid.Renderer
 * This is the base class and namespace for all grid renderers.
 * 
 * Extends: <Jx.Widget>
 * We extended Jx.Widget to take advantage of templating support.
 */
Jx.Grid.Renderer = new Class({
  
  Family: 'Jx.Grid.Renderer',
  Extends: Jx.Widget,
  
  parameters: ['options'],
  
  options: {
    deferRender: true,
    /**
     * Option: template
     * The template for rendering this cell. Will be processed as per
     * the Jx.Widget standard.
     */
    template: '<span class="jxGridCellContent"></span>'
  },
    /**
     * APIProperty: attached
     * tells whether this renderer is used in attached mode
     * or not. Should be set by renderers that get a reference to
     * the store.
     */
  attached: null,

  classes: $H({
    domObj: 'jxGridCellContent'
  }),

  column: null,

  init: function () {
    this.parent();
    this.attached = false;
  },
  
  render: function () {
    this.parent();
  },
  
  setColumn: function (column) {
    if (column instanceof Jx.Column) {
      this.column = column;
    }
  }
  
});