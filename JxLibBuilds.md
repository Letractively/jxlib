# Introduction #

This page documents various build configurations for JxLib including the MooTools dependencies.

## Builds ##

There are 4 build configurations of the javascript shipped with JxLib releases:

  * jxlib.js - this combines all of JxLib and all of MooTools Core and More into a single file which is compressed using the YUI Compressor to remove white space, comments and modifies internal variable and function names to reduce their size.  This is suitable for production use.
  * jxlib.uncompressed.js - the same as jxlib.js but not run through the YUI compressor so it is quite a bit larger.  This is suitable for development and testing, but should not be used in production use.
  * jxlib.standalone.js - this combines all of JxLib into a single file which is compressed using the YUI Compressor but it does not include any MooTools code.  You must include MooTools Core and MooTools More files separately in your page.  This is suitable for production use and allows you to customize the MooTools build (typically for minimizing it)
  * jxlib.standalone.uncompressed.js - the same as jxlib.standalone.js but not compressed.  Suitable for debugging and testing but not for production.

The CSS files shipped with JxLib skins include both compressed and uncompressed versions.  The compressed version should be used for production use.  The compressed version is also suitable for investigation because most web inspectors show you the actual CSS values, not what is in the file.  However, if you are trying to fix a problem by modifying the CSS in the combined theme file (rather than building from  the source files) you might want to use the uncompressed version.

## MooTools Dependencies ##

For the moment, the best way to get these dependencies is to use the mootools.net core and more builder. They will automatically include the necessary dependencies (i.e. "Class" depends on "Core", etc.). Eventually, we will have a builder available on jxlib.org that will do this all for you.

### Mandatory ###

If you are building a minimal MooTools to include with jxlib.standalone.js, you must include the following components from MooTools Core along with their dependencies:

  * "Class"
  * "Element"
  * "Browser"
  * "Element.Style"
  * "Request"
  * "Core"
  * "Class.Extras"
  * "Array"
  * "Element.Event"
  * "Element.Dimensions"

### Optional ###

The following components are optional and will add functionality if included:

  * Core
    * Fx.Tween - this will enable smooth scrolling of toolbars that have more buttons than can be displayed in the current container.  Without this, scrolling the toolbar will jump in fixed increments rather than sliding the buttons.
    * More
      * Drag - this will enable dialogs to be moved and disable dragging on various UI elements including the contents of buttons and tree items.  Without this, dialogs will not be moveable or resizable and the user may be able to click and drag sub-elements of buttons such as the image or text labels.