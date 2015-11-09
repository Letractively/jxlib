# 2.0 Open Issues #

  * [issue 84](https://code.google.com/p/jxlib/issues/detail?id=84) - (bug) visual glitch in menu items when using CSS sprites for images on those menu items
  * [issue 32](https://code.google.com/p/jxlib/issues/detail?id=32) - (task) JxLib cheat sheet
  * [issue 86](https://code.google.com/p/jxlib/issues/detail?id=86) - (task) review API docs before final release

We closed 38 known issues between Beta 6 and RC 1 - thanks to jonlb and KASI for providing fixes to some of the issues.

# Issues Closed in this Release #

  * [issue 1](https://code.google.com/p/jxlib/issues/detail?id=1) - panels with toolbars now display correctly in Opera
  * [issue 13](https://code.google.com/p/jxlib/issues/detail?id=13) - removed some event stops in menu and multi buttons so flyouts will close when a menu is clicked.
  * [issue 14](https://code.google.com/p/jxlib/issues/detail?id=14) - fixed an issue with disabled menu items in all IE browsers
  * [issue 15](https://code.google.com/p/jxlib/issues/detail?id=15) - fixed a null object error that occurred in IE 8.
  * [issue 22](https://code.google.com/p/jxlib/issues/detail?id=22) - modal dialogs on Opera now works for some reason :)
  * [issue 23](https://code.google.com/p/jxlib/issues/detail?id=23) - fix a problem with dragging splitters when one side is an iframe.
  * [issue 36](https://code.google.com/p/jxlib/issues/detail?id=36) - added a resize method to Jx.Dialog
  * [issue 40](https://code.google.com/p/jxlib/issues/detail?id=40) - add toElement to Jx.Addable so that the $() function will work on the domObj of various Jx objects directly.
  * [issue 43](https://code.google.com/p/jxlib/issues/detail?id=43) - fix dialog positioning in scrolled pages by fixing Jx.AutoPosition logic to use the scroll offsets of the page.
  * [issue 44](https://code.google.com/p/jxlib/issues/detail?id=44) - fix dialog positioning within other dialogs by fixing Jx.AutoPosition logic.
  * [issue 45](https://code.google.com/p/jxlib/issues/detail?id=45) - fixed modal blanket to be restricted to parent content area
  * [issue 46](https://code.google.com/p/jxlib/issues/detail?id=46) - editable combos are now editable again
  * [issue 47](https://code.google.com/p/jxlib/issues/detail?id=47) - toolbar separators made visible by changing a CSS class name
  * [issue 48](https://code.google.com/p/jxlib/issues/detail?id=48) - panel menu text now changes when expanded, collapsed.
  * [issue 51](https://code.google.com/p/jxlib/issues/detail?id=51) - fix a problem in IE 7 where menus collapsed.
  * [issue 52](https://code.google.com/p/jxlib/issues/detail?id=52) - you can now explicitly turn off scrolling in the tab bar of a tab box by passing the option scroll: false to the tab box constructor
  * [issue 52](https://code.google.com/p/jxlib/issues/detail?id=52) - fixed a problem where delays in loading dialog ajax content sometimes prevents dialogs from opening
  * [issue 54](https://code.google.com/p/jxlib/issues/detail?id=54) - fixed an issue with loading content in dialogs related to inheritance from panels
  * [issue 56](https://code.google.com/p/jxlib/issues/detail?id=56) - update Request to use MooTools 1.2 syntax of including URL in options.
  * [issue 57](https://code.google.com/p/jxlib/issues/detail?id=57) - fixed an infinite recursion problem in Jx.TreeItem contextMenu option
  * [issue 58](https://code.google.com/p/jxlib/issues/detail?id=58) - added barTooltip option to Jx.PanelSet and Jx.Splitter, added alphaLabel option to Jx.ColorPalette, added resizeTooltip option to Jx.Dialog,  added collapseTooltip, collapseLabel, expandTooltip, expandLabel, closeTooltip, closeLable, maximizeTooltip and maximizeLabel to Jx.Panel options
  * [issue 60](https://code.google.com/p/jxlib/issues/detail?id=60) - fixed an issue with IE 8 and the .jxDisabled CSS class
  * [issue 61](https://code.google.com/p/jxlib/issues/detail?id=61) - context menus adjusted to appear above dialogs
  * [issue 62](https://code.google.com/p/jxlib/issues/detail?id=62) - removed extraneous setTitle method from Jx.Dialog since setLabel from Jx.Panel does what setTitle used to do.
  * [issue 63](https://code.google.com/p/jxlib/issues/detail?id=63) - add onStart and onFinish optional methods to the Jx.Splitter that get called when the bar starts to drag and finishes dragging.
  * [issue 64](https://code.google.com/p/jxlib/issues/detail?id=64) - added alt and title attributes to all images to meet the w3c specs
  * [issue 65](https://code.google.com/p/jxlib/issues/detail?id=65) - added an openURL method to dialogs
  * [issue 69](https://code.google.com/p/jxlib/issues/detail?id=69) - added patches to make Jx common code work in Adobe AIR (Thanks jonlb)
  * [issue 70](https://code.google.com/p/jxlib/issues/detail?id=70) - added patches to make Jx dialog code work in Adobe AIR (Thanks jonlb)
  * [issue 71](https://code.google.com/p/jxlib/issues/detail?id=71) - added documentation to make it clear the Dialog inherits Panel
  * [issue 72](https://code.google.com/p/jxlib/issues/detail?id=72) - implement a Class.Mutator.Family for Jx that allows specifying a Family attribute in classes to identify the actual class to the $type operator which then causes $unlink to ignore Jx classes, solving a long standing infinite recursion problem using Options with Jx objects.  Thanks to user KASI for providing the solution.
  * [issue 73](https://code.google.com/p/jxlib/issues/detail?id=73) - update examples to use the latest google code prettifier
  * [issue 74](https://code.google.com/p/jxlib/issues/detail?id=74) - fixed a problem with tree items where the context menu would not appear.
  * [issue 75](https://code.google.com/p/jxlib/issues/detail?id=75) - fixed an exception in IE 8 when scrolling a page while a menu was open
  * [issue 76](https://code.google.com/p/jxlib/issues/detail?id=76) - move focus when changing between menus
  * [issue 82](https://code.google.com/p/jxlib/issues/detail?id=82) - fixed a problem with system context menus appearing over Jx context menus in Safari on tree items
  * [issue 83](https://code.google.com/p/jxlib/issues/detail?id=83) - fix display of multi buttons
  * [issue 85](https://code.google.com/p/jxlib/issues/detail?id=85) - fixed a problem with menu items in sub menus not receiving events due to a change implemented for [issue 13](https://code.google.com/p/jxlib/issues/detail?id=13).