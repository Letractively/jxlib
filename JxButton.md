# Working with Jx Buttons #

Buttons are basic building blocks for most web applications.  They provide the user with something to click on in order to trigger some action.  In regular HTML pages, this would be represented as a hyperlink (using an <a> tag) or an HTML button (using a <br>
<br>
<button><br>
<br>
 or an <br>
<br>
<input><br>
<br>
 of type submit or reset).  Jx provides a basic button object as well as some other types of buttons that can be used in your applications.<br>
<br>
<h2>Jx.Button</h2>

The basic button object is Jx.Button.  Visually, a button may contain an image, some text or both.  When the button is clicked, it fires an event that the application developer can listen for and take some action on.<br>
<br>
A button has several visual states.  How each state looks depends on the <a href='JxSkins.md'>skin</a> in use, these are taken from the Delicious skin:<br>
<br>
<table><thead><th> State </th><th> Not In Toolbar </th><th> In Toolbar </th><th> Description </th></thead><tbody>
<tr><td> normal </td><td> <img src='http://jxlib.googlecode.com/svn/wiki/images/button-normal.png' /> </td><td> <img src='http://jxlib.googlecode.com/svn/wiki/images/button-normal-toolbar.png' /> </td><td> the button is just sitting there </td></tr>
<tr><td> hover </td><td> <img src='http://jxlib.googlecode.com/svn/wiki/images/button-hover.png' /> </td><td> <img src='http://jxlib.googlecode.com/svn/wiki/images/button-hover-toolbar.png' /> </td><td>  the button glows when the mouse hovers over it </td></tr>
<tr><td> active </td><td> <img src='http://jxlib.googlecode.com/svn/wiki/images/button-active.png' /> </td><td> <img src='http://jxlib.googlecode.com/svn/wiki/images/button-active-toolbar.png' /> </td><td> the button is being clicked </td></tr>
<tr><td> on    </td><td> <img src='http://jxlib.googlecode.com/svn/wiki/images/button-on.png' /> </td><td> <img src='http://jxlib.googlecode.com/svn/wiki/images/button-on-toolbar.png' /> </td><td> the button looks depressed when the button is pressed or a toggle button is considered 'down' </td></tr></tbody></table>

Creating a new instance of Jx.Button is straightforward:<br>
<br>
<pre><code>var button = new Jx.Button();<br>
</code></pre>

At this point, the button doesn’t actually appear on your web page anywhere because we haven’t told it where we want it to go.  Buttons can be added to a web page in two different ways, in a <a href='JxToolbar.md'>Toolbar</a> (discussed there) or directly to an existing HTML element using the <b>addTo</b> method (discussed here).<br>
<br>
First, we need a simple web page to work with:<br>
<br>
<pre><code>&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"&gt;<br>
&lt;html&gt;<br>
&lt;head&gt;<br>
&lt;title&gt;Jx.Button Examples&lt;/title&gt;<br>
&lt;script type="text/javascript" src="jx/jxlib.js"&gt;&lt;/script&gt;<br>
&lt;link rel="stylesheet" href="jx/jxskin_delicious.css" type="text/css"&gt;<br>
&lt;script type="text/javascript"&gt;<br>
window.addEvent('load', function() {<br>
// add example code here<br>
}<br>
&lt;/script&gt;<br>
&lt;/head&gt;<br>
&lt;body&gt;<br>
&lt;div id="buttonContainer"&gt;&lt;/div&gt;<br>
&lt;/body&gt;<br>
&lt;html&gt;<br>
</code></pre>

You can try out the examples below by pasting the code into the <i>load</i> event handling function.<br>
<br>
To make the button visible in your web page, use the <b>addTo(element)</b> method:<br>
<br>
<pre><code>var button = new Jx.Button();<br>
button.addTo('buttonContainer');<br>
</code></pre>

The <b>addTo</b> method takes one argument, a reference to an HTML element or the id of an HTML element to which the button is to be added.  In most examples, we are only using the id method.  But you can also do this:<br>
<br>
<pre><code>// $ is a MooTools helper function that is equivalent to <br>
// document.getElementById(‘buttonContainer’);  See the <br>
// MooTools documentation for more details.<br>
<br>
var el = $(‘buttonContainer);<br>
var button = new Jx.Button();<br>
button.addTo(el);<br>
<br>
// alternately you can do it in one step if you don’t need to keep a reference<br>
// to the created button object:<br>
// new Jx.Button().addTo(el);<br>
</code></pre>

You should see something like this:<br>
<br>
<img src='http://jxlib.googlecode.com/svn/wiki/images/button-empty.png' />

This creates an empty button that isn’t very useful for the user because it has no indication of what it is for!  But it has all the behaviour of a button, including all the various states - try it out!<br>
<br>
To create a more useful button, you can pass in one or more options.<br>
<br>
<pre><code>var button = new Jx.Button({<br>
    image: 'images/star.png'<br>
    label: 'Label and Icon'<br>
});<br>
button.addTo('buttonContainer');<br>
</code></pre>

<img src='http://jxlib.googlecode.com/svn/wiki/images/button-icon-label.png' />

So now we have a good looking button that provides the user with an indication of what the button will do when they click on it, but it doesn’t actually do anything when they click on it!  This is where <a href='JxEvents.md'>Events</a> come in.<br>
<br>
A normal button fires a <i>click</i> event when the user presses and releases a mouse button with the cursor over the button.  You can add an event handler for the <i>click</i> event in one of two ways.<br>
<br>
The first method is to provide the event handler as an option to the button constructor.  The option name is <i>onClick</i> and the value is any function.<br>
<br>
<pre><code>var button1 = new Jx.Button({<br>
    label: 'click me',<br>
    onClick: function(button) {<br>
        alert('I was clicked!');<br>
    }<br>
});<br>
button1.addTo('buttonContainer');<br>
</code></pre>

The second method is to use the <i>addEvent</i> method on an existing button object, passing the event name (<i>click</i> in this case) and a function.<br>
<br>
<pre><code>var button2 = new Jx.Button({<br>
    label: 'click me too'<br>
});<br>
button2.addTo('buttonContainer');<br>
button2.addEvent('click', function(button){<br>
   alert ('I was clicked too!') <br>
});<br>
</code></pre>

The function you provide is called with the button that was clicked as the first, and only, argument.  The context of the function (what <i>this</i> refers to) is determined by you when you create the function.  See <a href='JxEvents.md'>Events</a> for details on how to bind a function to a particular context or scope.<br>
<br>
Both methods produce identical results, namely a function gets called when the button is clicked.  Which one you use is really a matter of choice and, sometimes, necessity.  In most cases, you know what you want the button to do when you make it and it is easiest just to provide a handler in the constructor options.  However, there will be instances where you don’t know what the button will do when it is made, or you want several different things to happen (you can call addEvent multiple times with the same event and different functions).  You can also remove existing event handlers using the removeEvent method (see <a href='JxEvent.md'>Events</a>).<br>
<br>
<h3>Toggle Buttons</h3>

<img src='http://jxlib.googlecode.com/svn/wiki/images/button-on.png' />

A toggle button is one that has a particular state, up or down, and persists in that state.  The user changes the state by clicking the button to toggle it.  This is equivalent to an HTML checkbox.<br>
<br>
You don't need to do much to make a normal button become a toggle button.  Its the same Jx object with an extra option, <i>toggle</i>, passed to the constructor:<br>
<br>
<pre><code>var button = new Jx.Button({<br>
    toggle: true,<br>
    image: 'images/bug.png'<br>
    label: 'toggle button'<br>
});<br>
button.addTo('buttonContainer');<br>
</code></pre>

When you try this, you’ll notice it looks the same as a normal button.  But when you click it, it will stay ‘pressed in’ until you click it again.<br>
<br>
When a button is a toggle button, it no longer fires a <i>click</i> event (which wouldn’t really tell you anything useful about the state of the button) but adds two new events, <i>down</i> and <i>up</i>.  The <i>down</i> event is fired when the button becomes active (it is presed in) and the <i>up</i> is fired when the button becomes inactive.<br>
<br>
<pre><code>var button = new Jx.Button({<br>
    toggle: true,<br>
    image: 'images/bug.png'<br>
    label: 'toggle button',<br>
    onDown: function(button) {<br>
        alert('the toggle button was toggled on');<br>
    },<br>
    onUp: function(button) {<br>
        alert('the toggle button was toggled off');<br>
    }<br>
});<br>
button.addTo('buttonContainer');<br>
</code></pre>

<h3>Jx.Button Constructor Options</h3>

There are a few more options that you can pass to the Jx.Button constructor that we haven’t covered yet.  We’ll cover the full list now.<br>
<br>
<br>
<ul><li>image - the url to an image to use as the icon on a button.  The default value is no image.<br>
</li><li>imageClass - a CSS class to add to the icon element in the button.  This is typically used to implement a CSS sprite technique where multiple icons are in the same image and the imageClass is used to set the background position to get the right image to show up.<br>
</li><li>label - the text to display in the button.  The default value is no label.<br>
</li><li>tooltip - text to display when the user hovers their mouse over the button. The default value is no tooltip.<br>
</li><li>active - a boolean value that indicates if the button should be initially active, useful only if toggle is true.  This is false by default.<br>
</li><li>enabled - a boolean value that indicates if the button should be initially enabled or disabled.  This is true by default.<br>
</li><li>halign - the horizontal alignment of the label in the button.  Currently only ‘center’ and ‘left’ are supported.  The default value is ‘center’.<br>
</li><li>valign - the vertical alignment of the label in the button.  Currently, only ‘top’ and ‘middle’ are supported.  The default value is ‘middle’.<br>
</li><li>onClick - a function to call when the button is clicked (if toggle is false)<br>
</li><li>onUp - a function to call when the button is toggled off (if toggle is true)<br>
</li><li>onDown - a function to call when the button is toggled on (if toggle is true)</li></ul>


<h3>Jx.Button API</h3>

The Jx button has a few other methods that allow you to work with button objects that you have already created.  We’ll cover the full API now.<br>
<br>
<br>
<ul><li>setLabel(label) - allows you to change the label displayed in the button after it has been created.<br>
</li><li>setImage(url) - allows you to change the image being displayed as the icon in a button.<br>
</li><li>setTooltip(tip) - allows you to change the tooltip displayed for the button.<br>
</li><li>setEnabled(isEnabled) - allows you to set the button as enabled or disabled.<br>
</li><li>isEnabled() - returns whether the button is currently enabled (true) or disabled (false).<br>
</li><li>setActive(isActive) - allows you to set the active state of the button (if it is a toggle button).  True means the button is active (pressed down).  Calling this method causes the appropriate event (up or down) to fire if the new state is different from the old state.<br>
</li><li>isActive() - returns the active state of the button.</li></ul>

<h2>Button Sub Classes</h2>

<ul><li><a href='JxButtonFlyout.md'>Flyout buttons</a>
</li><li><a href='JxButtonMulti.md'>Multi buttons</a>
</li><li><a href='JxButtonCombo.md'>Combo buttons</a>
</li><li><a href='JxButtonColor.md'>Color buttons</a>