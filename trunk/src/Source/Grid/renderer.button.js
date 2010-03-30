/**
 * Class: Jx.Grid.Renderer.Button
 * Renders a <Jx.Button> into the cell. You can add s many buttons as you'd like per column by passing button configs
 * in as an array option to options.buttonOptions
 *
 * Extends: <Jx.Grid.Renderer>
 *
 */
Jx.Grid.Renderer.Button = new Class({

    Family: 'Jx.Grid.Renderer.Checkbox',
    Extends: Jx.Grid.Renderer,

    Binds: [],

    options: {
        template: '<span class="buttons"></span>',
        /**
         * Option: buttonOptions
         * an array of option configurations for <Jx.Button>
         */
        buttonOptions: null
    },

    classes:  $H({
        domObj: 'buttons'
    }),

    init: function () {
        this.parent();
    },

    render: function () {
        this.parent();

        $A(this.options.buttonOptions).each(function(opts){
            var button = new Jx.Button(opts);
            this.domObj.grab(document.id(button));
        },this);

    }
});