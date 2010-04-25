
Jx.Adaptor.Combo.Fill = new Class({

    Family: 'Jx.Adaptor.Combo.Fill',
    Extends: Jx.Adaptor,
    name: 'combo.fill',
    Binds: ['fill'],

    /**
     * Note: option.template is used for constructing the text for the label
     */
    options: {
        /**
         * Option: imagePathColumn
         * points to a store column that holds the image information
         * for the combo items.
         */
        imagePathColumn: null,
        /**
         * Option: imageClassColumn
         * Points to a store column that holds the image class
         * information for the combo items
         */
        imageClassColumn: null,
        /**
         * Option: selectedFn
         * This should be a function that could be run to determine if
         * an item should be selected. It will get passed the current store
         * record as the only parameter. It should return either true or false.
         */
        selectedFn: null,
        /**
         * Option: noRepeats
         * This option allows you to use any store even if it has duplicate
         * values in it. With this option set to true the adaptor will keep
         * track of all of teh labels it adds and will not add anything that's
         * a duplicate.
         */
        noRepeats: false
    },

    labels: null,

    init: function () {
        this.parent();

        if (this.options.noRepeat) {
            this.labels = [];
        }
    },

    attach: function (combo) {
        this.parent(combo);

        this.store.addEvent('storeDataLoaded', this.fill);
        if (this.store.loaded) {
            this.fill();
        }
    },

    detach: function () {

    },

    fill: function () {
        //empty the combo
        this.widget.empty();
        //reset the store and cycle through creating the objects
        //to pass to combo.add()
        this.store.first();
        var items = [];
        this.store.each(function(record){
            var template = this.store.fillTemplate(record,this.options.template,this.columnsNeeded);
            if (!this.options.noRepeat || (this.options.noRepeat && !this.labels.contains(template))) {
                var selected = false;
                if ($type(this.options.selectedFn) == 'function') {
                    selected = this.options.selectedFn.run(record);
                }
                var obj = {
                    label: template,
                    image: record.get(this.options.imagePathColumn),
                    imageClass: record.get(this.options.imageClassColumn),
                    selected: selected
                }
                items.push(obj);

                if (this.options.noRepeat) {
                    this.labels.push(template);
                }
            }

        },this);
        //pass all of the objects at once
        this.widget.add(items);
    }
});