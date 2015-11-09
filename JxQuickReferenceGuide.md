# JxLib 2.0 Quick Reference Guide #



_this will all change for 3.0_

## Mix-ins ##

### Jx.ContentLoader ###
  * Common handler for adding content to a JxLib object such as a Jx.Dialog
  * Methods:
    * loadContent(el) - uses this.options to load content into DOM element
  * Options:
    * content - Jx object, id of DOM element, or string of HTML
    * contentURL - load HTML content via AJAX
    * contentId - id for element into which content is loaded
  * Events:
    * contentLoaded - fired when content has been loaded

### Jx.Addable ###
  * Methods:
    * addTo(ref, where) - injects this into the ref DOM element
    * toElement() - returns the addable object to make working with $() easier
  * Options:
  * Events:
    * addTo - fired when the element is added

### Jx.Chrome ###
  * Display chrome for an object
  * Methods:
    * showChrome(el) - draw chrome for an element
    * hideChrome() - hide chrome that is alreaady
    * resizeChrome(el)
  * Options:
    * chromeOffsets
  * Events:
    * none

### Jx.AutoPosition ###
  * Helper for positioning an element adjacent to another element using a set of rules
  * Methods:
    * position(el, rel, options) - positions DOM el relative to DOM rel using rules from options, tries to keep el visible in the viewport of the browser by trying rules in order
  * Options:
    * horizontal - horizontal placement rule, default 'center center'
    * vertical - vertical placement rule, default 'center center'
    * offsets - top, right, bottom and left pixel offsets

## JxLib Classes ##

### Jx.Button ###
  * Extends:
  * Implements:
    * Options
    * Events
    * Jx.Addable
  * Events:
    * click
    * down
    * up
  * Options:
    * id
    * image
    * tooltip
    * label
    * toggle
    * active
    * enabled
  * Methods:
    * isEnabled
    * setEnabled
    * isActive
    * setActive
    * getLabel
    * setLabel
    * setTooltip
    * setImage

### Jx.Button.Flyout ###
  * Extends:
    * Jx.Button
  * Implements:
    * Jx.ContentLoader
    * Jx.AutoPosition
    * Jx.Chrome
  * Events:
    * open
    * close
  * Options: (inherited)
  * Methods:

### Jx.Button.Multi ###
  * Extends:
    * Jx.Button
  * Implements:
  * Events:
  * Options: items
  * Methods:
    * add
    * remove
    * set

### Jx.Button.Combo ###
  * Extends:
    * Jx.Button.Multi
  * Implements:
  * Events:
    * change
  * Options:
    * editable
  * Methods:
    * add
    * remove
    * setValue
    * getValue

### Jx.Button.Tab ###
  * Extends:
    * Jx.Button
  * Implements:
    * Jx.ContentLoader
  * Events:
    * change
  * Options:
    * close
  * Methods:

### Jx.ButtonSet ###
  * Extends:
  * Implements:
    * Options
    * Events
  * Events:
    * change
  * Options:
  * Methods:
    * add
    * remove
    * setActiveButton

### Jx.ColorPalette ###
  * Extends:
  * Implements:
    * Options
    * Events
    * Jx.Addable
  * Events:
    * change
    * click
  * Options:
    * color
    * alpha
    * alphaLabel
  * Methods:
    * setColor
    * setAlpha

### Jx.Panel ###
  * Extends:
  * Implements:
    * Options
    * Events
    * Jx.ContentLoader
    * Jx.Addable
  * Events:
    * close
    * collapse
    * expand
  * Options:
    * label
    * position
    * height
    * collapse
    * collapseTooltip
    * exapndLabel
    * maximizeTooltip
    * maximizeLabel
    * detach
    * close
    * closeTooltip
    * closeLabel
    * hideTitle
    * toolbars
  * Methods:
    * setLabel
    * getLabel
    * maximize
    * setContent
    * setContentURL
    * toggleCollapse
    * close

### Jx.PanelSet ###
  * Extends:
  * Implements:
    * Options
    * Events
    * Jx.Addable
  * Events:
  * Options:
    * panels
    * barTooltip
  * Methods:
    * maximizePanel
    * 

### Jx.Dialog ###
  * Extends:
    * Jx.Panel
  * Implements:
    * Jx.AutoPosition
    * Jx.Chrome
  * Events:
    * open
    * close
    * change
    * resize
  * Options:
    * modal
    * width
    * height
    * horizontal
    * vertical
    * id
    * resize
    * resizeTooltip
    * move
    * close
    * collapse
  * Methods:
    * resize
    * toggleCollapse
    * openURL
    * open
    * close

### Jx.Menu.Item ###
  * Extends:
    * Jx.Button
  * Implmements:
  * Events:
  * Options:
  * Methods:

### Jx.Menu.Separator ###
  * Extends:
  * Implements:
  * Events:
  * Options:
  * Methods:

### Jx.Menu.SubMenu ###
  * Extends:
    * Jx.Menu.Item
  * Implements:
    * Jx.AutoPosition
    * Jx.Chrome
  * Events:
  * Options:
  * Methods:

### Jx.Menu ###
  * Extends:
  * Implements:
    * Options
    * Events
    * Jx.AutoPosition
    * Jx.Chrome
    * Jx.Addable
  * Events:
    * show
    * hide
  * Options:
    * <button options>
  * Methods
    * add
    * show
    * hide

### Jx.TabSet ###
  * Extends:
  * Implements:
    * Options
    * Events
  * Events:
    * tabChange
  * Options:
  * Methods:

### Jx.TabBox ###
  * Extends:
  * Implements:
    * Options
    * Events
    * Jx.Addable
  * Events:
  * Options:
    * position
    * scroll
    * height
    * width
  * Methods:
    * add
    * remove

### Jx.Toolbar ###
  * Extends:
  * Implements:
    * Options
    * Events
  * Events: add
    * remove
  * Options:
    * position
    * autoSize
    * scroll
  * Methods:
    * add
    * remove
    * showItem

### Jx.Toolbar.Container ###
  * Extends:
  * Implements:
    * Options
    * Events
    * Jx.Addable
  * Events:
    * add
    * remove
  * Options:
    * position
    * autoSize
    * scroll
  * Methods:
    * add
    * remove

### Jx.Toolbar.Item ###
  * Extends:
  * Implements:
    * Options
  * Events:
  * Options:
    * active
  * Methods:

### Jx.TreeItem ###
  * Extends:
  * Implements:
    * Options
    * Events
  * Events:
    * click
  * Options:
    * label
    * data
    * contextMenu
    * image
    * enabled
  * Methods:

### Jx.TreeFolder ###
  * Extends:
    * Jx.TreeItem
  * Implements:
  * Events: disclosed
  * Options:
    * open
    * folderCloseImage
    * folderOpenImage
  * Methods:
    * append
    * insert
    * remove
    * replace
    * expand
    * collapse
    * findChild

### Jx.Tree ###
  * Extends:
    * Jx.TreeFolder
  * Implements:
    * Jx.Addable
  * Events:
  * Options:
  * Methods: append

### Jx.Splitter ###
  * Extends:
  * Implements:
    * Options
  * Events:
  * Options:
    * useChildren
    * splitInto
    * elements
    * containerOptions
    * barOptions
    * layout
    * snaps
    * barTooltip
  * Methods:

### Jx.Splitter.Snap ###
  * Extends:
  * Implements:
  * Events:
  * Options:
  * Methods:

### Jx.Layout ###
  * Extends:
  * Implements:
    * Options
    * Events
  * Events:
    * sizeChange
  * Options:
    * propagate
    * position
    * left
    * top
    * right
    * bottom
    * width
    * height
    * minWidth
    * minHeight
    * maxWidth
    * maxHeight
  * Methods: resize

### Jx.Grid ###
  * Extends:
  * Implements:
    * Options
    * Events
    * Jx.Addable
  * Options:
    * alternateRowColors
    * rowHeaders
    * columnHeaders
    * rowSelection
    * columnSelection
    * cellPrelight
    * rowPrelight
    * columnPrelight
    * rowHeaderPrelight
    * columnHeaderPrelight
    * cellSelection
  * Events:
  * Methods:
    * setModel
    * selectCell
    * selectColumnHeader
    * selectColumn
    * selectRow
    * selectRowHeader

### Jx.Grid.Model ###
  * Extends:
  * Implements:
    * Options
    * Events
  * Events:
    * select-row
    * select-column
    * select-cell
  * Options:
    * colHeaderHeight
    * rowHeaderWidth
    * colWidth
    * rowHeight
    * rowHeaders
    * columnHeaders
  * Methods:
    * getColumnCount
    * getRowCount
    * getValueAt
    * setValueAt