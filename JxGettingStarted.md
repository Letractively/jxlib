# Introduction #

This is a quick start guide to get you up and running with Jx.  Here are the steps we'll be going through:

  * prerequisites
  * downloading Jx
  * setting up a simple HTML page
  * adding the jx library and css to your page
  * creating a couple of basic Jx components

## Prerequisites ##

There aren't many, but you will need:

  * a web server and sufficient permissions and knowledge to configure it.  We can't help you with system administration 101, sorry.
  * some way of editing HTML pages
  * a web browser (but then, how are you reading this page?)

## Downloading Jx ##

Head on over to the [download page](http://code.google.com/p/jxlib/downloads/list) and grab the latest release.  Once you've downloaded it, create a new directory (let's assume you've called it jxtest) in a web-accessible location and extract the downloaded archive in that directory.  You should end up with something like this:

```
/www               <- this is a web accessible directory
/www/jxtest/       <- this is the new directory you just created
/www/jxtest/jx/    <- this has the extracted files in it
```

## A Simple HTML Page ##

Now lets create a simple HTML page for our first Jx application.

**note:**
> We really, really, really (no, really) recommend that you use a valid doctype to ensure that your web page is rendered in Standards Compliance mode.  If you don't know what a doctype is, you can find out all about it over at the fantastic [Quirks Mode](http://www.quirksmode.org/css/quirksmode.html) site.  For now, just copy the example below.

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <title>Hello World</title>
</head>
<body>
</body>
</html>
```


## Adding Jx to Your Page ##

Now we need to get Jx in there.  You need to include two things in your page to get Jx working, the jxlib.js javascript library and one of the Jx CSS skin files.  Here's how it looks:


```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <title>Hello World</title>
  
 <!-- include the jx delicious skin -->
   <link rel="stylesheet" href="jx/themes/delicious/jxtheme.css" type="text/css" media="screen" charset="utf-8">
  <!-- IE specific style sheets -->
  <!--[if LTE IE 6]>
  <link rel="stylesheet" href="jx/themes/delicious/ie6.css" type="text/css" media="screen" charset="utf-8">
  <![endif]-->
  <!--[if IE 7]>
  <link rel="stylesheet" href="jx/themes/delicious/ie7.css" type="text/css" media="screen" charset="utf-8">
  <![endif]-->
 <!-- include the jx library -->
  <script src="jx/jxlib.js" type="text/javascript" charset="utf-8"></script>

</head>
<body>
</body>
</html>
```

Jx is ready to use!

## Adding Jx Components ##

Lets create a resizable layout that fills the browser window and has a toolbar.  For this, we'll need to use Jx.Layout, Jx.Panel, Jx.Button and Jx.Toolbar.

### Jx.Layout ###

First, the layout.  Let's add a `script` tag to contain our javascript code and a `div` tag to hold our application.

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <title>Hello World</title>
  
 <!-- include the jx delicious skin -->
   <link rel="stylesheet" href="jx/themes/delicious/jxtheme.css" type="text/css" media="screen" charset="utf-8">
  <!-- IE specific style sheets -->
  <!--[if LTE IE 6]>
  <link rel="stylesheet" href="jx/themes/delicious/ie6.css" type="text/css" media="screen" charset="utf-8">
  <![endif]-->
  <!--[if IE 7]>
  <link rel="stylesheet" href="jx/themes/delicious/ie7.css" type="text/css" media="screen" charset="utf-8">
  <![endif]-->

  <!-- this prevents scrollbars from appearing on the page -->
  <style type="text/css">
  body {
    overflow: hidden;
  }
  </style>

 <!-- include the jx library -->
  <script src="jx/jxlib.js" type="text/javascript" charset="utf-8"></script>


  <!-- our application code -->
  <script type='text/javascript'>
    window.addEvent('load', function() {
      // our custom javascript goes in here.

    });   
  </script>

</head>
<body>
<div id="theApp"></div>
</body>
</html>
```

From here on, the code snippets will just include the code that goes in the new script tag above unless otherwise stated.

To create a new layout object that makes our `theApp` div fill the browser, add the following:

```
  // our custom javascript goes in here.
  new Jx.Layout('theApp');
  $('theApp').resize();
```

You can try this out.  Although nothing very exciting is happening visually, our `theApp` is now filling the entire browser viewport and resizes when the browser is resized.  Try changing the background color of `theApp` in the HTML to see what is happening by adding a style attribute to it:

```
<div id="theApp" style="background-color: orange"></div>
```

The code is creating a new Jx.Layout object to manage the layout of our `theApp` div.  Conveniently, the default options are to make the element fill its parent (in this case, the browser window) and to resize automatically when the browser resizes.

### Adding a Jx.Panel ###

Next, we will create a panel to add to our page so we can finally see something happening!

```
new Jx.Layout('theApp');

var panel = new Jx.Panel({
  label: 'Hello World'
});

panel.addTo('theApp');

$('theApp').resize();
```

The new code creates a new Jx.Panel object with a label to go in the title bar and adds it to `theApp`.  Note how the panel resizes when the browser is resized, this is because panels are also managed by Jx.Layout and `theApp` automatically resizes things inside it when it changes size.

### Adding a Toolbar ###

Now we'll add a toolbar to our panel and put some buttons in it.

```
new Jx.Layout('theApp');

var toolbar = new Jx.Toolbar();

var sayHello = new Jx.Button({
  label: 'Say Hello',
  onClick: function() {
    alert('Hello!');
  }
});

toolbar.add(sayHello);

var panel = new Jx.Panel({
  label: 'Hello World',
  toolbars: [toolbar]
});

panel.addTo('theApp');

$('theApp').resize();
```

In this code, we first create a new Jx.Toolbar object to hold our button.  Next, we create a button with an event handler to say hello to us when it is clicked and add it to the toolbar.  Finally, we updated the Jx.Panel constructor with a new option to add the toolbar.

## Doing More ##

If you made it this far, then you've got Jx installed and working.  Now you are ready to head on over to the [Jx Lib Home Page](http://jxlib.org/) to check out the examples!