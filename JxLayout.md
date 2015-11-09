# Working with the Jx Layout Component #

## Introduction ##

Jx contains several components that help you organize and manage content in your application.  The Jx.Layout component is the most fundamental of these and is used extensively throughout Jx.  The [Jx.Splitter](JxSplitter.md) is a more generic component that splits an HTML element into two or more areas and allows the user to resize them.  [Jx.PanelSet](JxPanel.md) is a specialized version of [Jx.Splitter](JxSplitter.md) that manages [Jx.Panel](JxPanel.md) instances in a vertical layout.

## Overview ##

Jx.Layout is not a user interface widget, but it is key component to how other Jx components control their layout. Jx.Layout is designed to help solve common problems in designing the user interface of web-based applications, namely predictable sizing of components in the web page.  Jx.Layout is also very useful in laying out non-Jx components.

A common desire for web-based application is to want to _fill_ the browser window with the user interface of the application, without _overflowing_ the window and creating scrollbars that the user needs to use to see parts of the application. This can sometimes be accomplished using CSS styling rules and some javascript logic. However, it often fails or requires a lot of custom code because:

  * when giving a size of 100% to HTML elements, browsers interpret the padding, borders and margins of elements differently (known as the box model of the browser). If you want a border around an element that should 'fill' the browser window, and then set 100% width, horizontal scrollbars will appear in some browsers
  * when giving a height of 100% to HTML elements, the element assumes 100% of the height of its parent. This is irrespective of the height of the sibling elements. One common layout is to have a fixed height header and footer element, with a _workspace_ element vertically filling the space between them. This is impossible to achieve purely with CSS.

Jx.Layout solves this problem by attaching a new layout constraint model to HTML elements using reliable cross-browser compatible methods of measuring and sizing elements.

## Using Jx.Layout ##

To use Jx.Layout, you create a new instance of Jx.Layout and pass it an element or element id and an options object. For example:

```
new Jx.Layout('myElement', options);
```

The options argument is may be null (by not specifying it) or an object containing some, all or none of the following properties:

  * left
  * top
  * right
  * bottom
  * width
  * height
  * minWidth
  * maxWidth
  * minHeight
  * maxHeight

The meaning of these options is discussed below. The options object is normally built using object literal notation, for instance:

```
new Jx.Layout('myElement', {
    left: 10, 
    top: 10, 
    right: 10, 
    bottom: 10}); 
```

or

```
var options = {};
options.left = 10;
options.right = 10;
options.top = 10;
options.bottom = 10;
new Jx.Layout('myElement', options);
```

It is not normally necessary to retain a reference to a Jx.Layout object after it has been created since the Jx.Layout object _store\_s a jxLayout property on the element that refers to the Jx.Layout object which you can retrieve using the_retrieve_method thusly:_

```
    $('myElement').retrieve('jxLayout');
```

_store_ and _retrieve_ are methods provided by the [MooTools](http://docs.mootools.net/) Element interface.

## Jx.Layout Resizing Logic ##

Jx.Layout creates a resize() method reference on the element that is used to apply the Jx.Layout's constraint rules to the object. This allows for dynamic modification of element sizes at run time. The resize() method can be called on an element as follows:

```
$('myElement').resize();
```

When an element is a direct child of the **BODY** of the page, Jx.Layout registers for the _window.onresize_ event and automatically calla its resize() method when the browser window is resized.

As part of the resizing process, a Jx.Layout object also checks the child elements of its element to see if they have a resize() method and calls it if they do. This allows nested elements to be automatically resized when the browser window is resized, or when the resize() function of an element is called directly by the program.

## Jx.Layout Sizing Rules ##

Jx.Layout constraints involve predicable placement of an element within its parent. The rule system is designed to provide maximum flexibility while minimizing coding needs. Each Jx.Layout instance applies a set of rules to the element that it is controlling. There are 6 sizing rules and 4 constraint rules. The sizing rules control the actual size or placement of the element in a particular dimension, while the constraint rules apply minimum and maximum constraints to the width and height.
The basic sizing rules are:

  * left - the distance from the inside, left edge of the parent element to the outside, left edge of the element.
  * top - the distance from the inside, top edge of the parent element to the outside, top edge of the element.
  * right - the distance from the inside, right edge of the parent element to the outside, right edge of the element.
  * bottom - the distance from the inside, bottom edge of the parent element to the outside, bottom edge of the element.
  * width - the outside width of the element.
  * height - the outside height of the element.

Each rule can take on either a fixed, positive integer value or null. If the value is not null, it specifies an amount in pixels for that particular rule. If the value is null, it means that the size is variable in that dimension and is to be computed from the other rules and constraints. The default values for the basic sizing rules are:

  * left: 0
  * top: 0
  * right: 0
  * bottom: 0
  * width: null
  * height: null

This creates a layout rule that causes the element to fill its container completely and exactly.

This system allows you to create flexible layouts. For instance, a common layout for web applications is to have a fixed header, footer, sidebar and variable content area. To create this using Jx.Layout, you could do the following:

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Layout Sample</title>
<script src="jx/jxlib.js" type="text/javascript"></script>
<script type="text/javascript">
/* fill the page */

new Jx.Layout('thePage');
/* fixed height header, let bottom stretch */
new Jx.Layout('header', {height: 75, bottom: null});
/* fixed height footer, let top stretch */
new Jx.Layout('footer', {height: 24, top: null});
/* fixed width side bar on the left */
new Jx.Layout('sidebar', {top: 75, bottom: 24, width: 200, right: null});
/* variable sized content */
new Jx.Layout('content', {top: 75, left: 200, bottom: 24});
$('thePage').resize();

</script>
<body>
<div id="thePage">
	<div id="header"></div>
	<div id="sidebar"></div>
	<div id="content"></div>
	<div id="footer"></div>
</div>
</body>
</html>
```

It is not strictly necessary to use a single div to wrap the other divs that are the layout, but it makes it a bit more convenient.

## Jx.Layout Constraint Rules ##

The Jx.Layout constraint rules allow specifying minimum and maximum constraints on the width and height basic sizing rules as follows:

  * minWidth - constrain an element's width to have a minimum width in pixels. The default value is 0, meaning there is no minimum width.
  * maxWidth - constrain an element's width to have a maximum width in pixels. The default value is -1, meaning there is no maximum width.
  * minHeight - constrain an element's height to have a minimum height in pixels. The default value is 0, meaning there is no minimum height.
  * maxHeight - constrain an element's height to have a maximum height in pixels. The default value is -1, meaning there is no maximum height.

## Jx.Layout Rule Priority and Guidelines ##

Jx.Layout makes it possible to build flexible, dynamic layouts. But it also makes it possible to set up a series of rules that cannot be satisified.

For instance, setting the left, right and width values to fixed values makes it impossible for Jx.Layout to satisfy all the conditions unless the values happen to add up to the exact width of the parent element. In these cases, Jx.Layout will always obey the left, top, width and height values over the right and bottom values.  It is also possible to set up constraint rules that cannot be satisfied.

Additionally, setting more than one value to be variable in a particular dimension creates problems. In these cases, Jx.Layout will attempt to distribute available space evenly. This is most commonly used to center a fixed size element within its container (either vertically or horizontally) by setting the edge rules to null and the width or height to a fixed value.

Setting a minimum value that is greater than a valid maximum value will result in the maximum value being used. Within these limitations, Jx.Layout will do its best to provide a predictable response to the rules you set up.