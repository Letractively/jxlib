# Getting Started #

In this tutorial we are going to create a "Image Viewer Application" using jxlib and some php.

To start we need to include the jxlib in the head section of our html document and as well add the include for the crispin css:
```
<html>
    <head>
    <title>Creating a Image Viewer Application Using JX.Layout</title>
    <script src="jxlib.uncompressed.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="../../../lib/jxskin_crispin.css" type="text/css" media="screen" charset="utf-8">
    </head>
    <body>
    </body>
</html>
```

# A Layout For The Application #

![http://jxlib.googlecode.com/svn/wiki/images/layout.png](http://jxlib.googlecode.com/svn/wiki/images/layout.png)

There are three elements that are needed to create this layout:

  1. The Page Container (red)
  1. Left Column (green)
  1. Right Column (blue)

## The Page Container ##

This main page container houses the two child containers, these children break up this parent "thePage" into two  column's (left and right).
```
<body>
    <div id="thePage">
        <div id="leftLayout"></div>
        <div id="rightLayout"></div>
    </div>
</body>
```

Our left column is goint to be the image navigation section and the right is where the displayed image is going to go. So we will make the left column more narrow then the right column as it is shown above.

Here is how we initialize this layout:
```
<script  type="text/javascript">
window.addEvent('load', function() {

    var mainContainer = new Jx.Layout('thePage', {bottom: 35}); 
    var leftLayout = new Jx.Layout('leftLayout', {width: 200, left: 0, right: null, top: 35, bottom: 0, minWidth: 100});
    var rightLayout = new Jx.Layout('rightLayout',  {width: null, left: 200, right: 0, top: 35, bottom: 0});
    mainContainer.resize();
});
</script>
```

## mainContainer.resize(); ##

This is a pretty important function call resize() on layout objects recalculate their parents position and size. I will keep this "mainContainer.resize();" call at the bottom of my "load" function object. as I build up this application.

## The onLoad Event ##

Add a event handler to the "onLoad" event see http://www.w3.org/TR/REC-html40/interact/scripts.html#h-18.2.3 for more information the DOM and event handler's

Using this window.addEvent method instead of window.onLoad = function(){} allows us script independence for other onLoad items you might want to attach to the window.onLoad event.

You could use  window.onLoad = function(){...} directly however no other script will be able to be attached to this window.onLoad event.

## Building the Layout (Jx.Layout) ##
Lets setup how Jx.Layout is going to behave.

Using  a main container and a left and right container  we can specify the default dimensions.

```
    var leftLayout = new Jx.Layout('leftLayout', {width: 200, left: 0, right: null, top: 35, bottom: 0, minWidth: 100});
    var rightLayout = new Jx.Layout('rightLayout',  {width: null, left: 200, right: 0, top: 35, bottom: 0});
```

In Jx.Layout a width or height of "null" tells it to fill the div within all the available space.

Now that we have setup our basic layout lets go ahead and add some style properties so we can see how these div's are positioned in the browser.

```
<style type="text/css">
/*
    The Main Page Container
*/
#thePage {
  border: 1px solid red;
  margin: 10px;
  padding: 10px;
}

/*
    The Left Side:
*/

#leftLayout {
  border: 1px solid green;
}

/*
    The Right Side:
*/

#rightLayout {
  border: 1px solid blue;
}
</style>
```

Here's a screen shot of what our application should now look like:

![http://jxlib.googlecode.com/svn/wiki/images/layout.png](http://jxlib.googlecode.com/svn/wiki/images/layout.png)

## Creating the ToolBar (Jx.Toolbar) ##

Our application is going to need a Jx.menu in a Jx.toolbar so lets add this toolbar at the top of the application  inside “thePage”

Here's our Body Section:
```
<body>
    <div id="thePage">
        <div id="theToolBar"></div>
        <div id="leftLayout"></div>
        <div id="rightLayout"></div>
    </div>
</body>

```

We'll use Jx.Layout to handle the sizing of this Jx.toolbar:

```

    var mainContainer = new Jx.Layout('thePage', {bottom: 35});
    var theToolBar = new Jx.Layout('theToolBar', {width: null, height:35, left: 0, right: null, top: 0, bottom: 0, minWidth: 100});
    var leftLayout = new Jx.Layout('leftLayout', {width: 200, left: 0, right: null, top: 35, bottom: 0, minWidth: 100});
    var rightLayout = new Jx.Layout('rightLayout',  {width: null, left: 200, right: 0, top: 35, bottom: 0});

```

As you can see I simply added a new JX.Layout item and set it's height to be 35 and then adjusted leftLayout and rightLayout to have a top of 35.

Now lets go ahead add the JX.Toolbar :

```
    var theToolBar = new Jx.Toolbar({parent: 'theToolBar'});
```

and wel'll add some css the toolbar so we can see what the structure looks like now:

```

/*
    The Toolbar:
*/
#theToolBar{
  border: 1px solid orange;
}

```

Here's our layout: we are done with the layout aspects now and you will notice that when you resize your browser this layout also resizes.

![http://jxlib.googlecode.com/svn/wiki/images/layout2.png](http://jxlib.googlecode.com/svn/wiki/images/layout2.png)

Let's keep the  "ugly" div outlines on as we go through this tutorial.

## Adding the Menu (JX.Menu) ##

Now that we have a Jx.toolbar we can add a Jx.menu to it. Jx.menus can get complicated depending on the nesting so for this exercise lets create a options menu and a help menu:

Here's the JavaScript:
```
  // create the root menu item container
    var optionMenu = new Jx.Menu({label: 'Options'});

    // create menu item
    var menuitem1 = new Jx.Menu.Item({
      label: ' Display Settings',
      onClick:function(){alert('One way to skin a cat')}
    });

    // add the menu item to the menu container
    optionMenu.add(menuitem1);

    // add the menu to the toolbar
    theToolBar.add(optionMenu);
```
and now the help menu:
```
    // create the root menu item container
    var helpMenu = new Jx.Menu({label: 'Help'});
    // create menu item
    var menuItem1 = new Jx.Menu.Item({
        label: 'Info' ,
        onClick:myInfoFunction.bind()
    });
    // create menu item
    var menuItem2 = new Jx.Menu.Item({label: 'About'});

    // add the menu item to the menu container
    helpMenu.add(menuItem1,menuItem2);
    
    // add the menu to the toolbar
    theToolBar.add(helpMenu);
```

Notice in both of these menus we have a different onClick value, The beauty of JavaScript in general is that their is usually numerous ways you can implement the same thing and this is also the case in Jx.

You can create a function object inline or call the function using a prototypic style with bind(), though if we do that we need to create the referenced function outside of this load object

Here it is:
```
    function myInfoFunction(){
        alert("another.. way to skin a cat");
    }
```

Now our application is really shaping up with some functionality:

![http://jxlib.googlecode.com/svn/wiki/images/layout1.png](http://jxlib.googlecode.com/svn/wiki/images/layout1.png)

## Creating the tree ##

We'll use JX.tree for the image navigation.

### Getting the tree data ###
in our JavasScript we need to add a bunch of functions

### updateTree() ###
With this function we will trigger a ajax call to our getImages.php script which in turn returns a json array of the images in our ./samples/ directory. we will pass that along to the updateTree\_CB function.


```

function updateTree(){

    // get the file listings in a JSON Array from "getImages.php"
    new Request({url:"./getImages.php", onComplete: updateTree_CB}).send();
}
```



### updateTree\_CB(oObject) ###
Using the json from updateTree() we will populate  our global variable gaImages to this object and begin building the tree with the buildTree function. WARNING: Notice we are not trapping for any errors here. to keep this tutorial focused on Jx I won't get into Json and error trapping.

```
function updateTree_CB(oObject){
    // create / set the images global
    eval("gaImages = "+oObject);

    // call buildTree and start working with Jx.Tree
    buildTree();
}
```

Now we need to add a call to "updateTree();" in our "load" object and add also add couple globals in our application "gaImages and gFitToWindow" we'll get to that later.

```
var gaImages = [];
var gFitToWindow = true;
window.addEvent('load', function() {

    var mainContainer = new Jx.Layout('thePage', {bottom: 35});
    var theToolBar = new Jx.Layout('theToolBar', {width: null, height:35, left: 0, right: null, top: 0, bottom: 0, minWidth: 100});
    var leftLayout = new Jx.Layout('leftLayout', {width: 200, left: 0, right: null, top: 35, bottom: 0, minWidth: 100});
    var rightLayout = new Jx.Layout('rightLayout',  {width: null, left: 200, right: 0, top: 35, bottom: 0});

    var theToolBar = new Jx.Toolbar({parent: 'theToolBar'});

  // create the root menu item container
    var optionMenu = new Jx.Menu({label: 'Options'});

    // create menu item
    var menuitem1 = new Jx.Menu.Item({
      label: ' Display Settings',
      onClick:function(){alert('One way to skin a cat')}
    });

    // add the menu item to the menu container
    optionMenu.add(menuitem1);

    // add the menu to the toolbar
    theToolBar.add(optionMenu);

    // create the root menu item container
    var helpMenu = new Jx.Menu({label: 'Help'});
    // create menu item
    var menuItem1 = new Jx.Menu.Item({
        label: 'Info' ,
        onClick:myInfoFunction.bind()
    });
    // create menu item
    var menuItem2 = new Jx.Menu.Item({label: 'About'});

    // add the menu item to the menu container
    helpMenu.add(menuItem1,menuItem2);
    
    // add the menu to the toolbar
    theToolBar.add(helpMenu);

    //build the jx.tree
    updateTree();

    // resize the layout
    mainContainer.resize();
});

```

### buildTree() ###

This is the meat and potatoes of our tree. Simply put we will create the main Jx.Tree Object then add a Jx.TreeFolder to it and then cycle through our gaImages array adding Jx.TreeItem's to this Jx.folder.

Then we need to add an eventListener for the click event to the Jx.TreeItem's that we create here, which will then in turn call the next function  "treeItemClicked" with the Jx.treeItem object so will know which item has been clicked.

Here's the updated body HTML:
```
<body>
    <div id="thePage">
        <div id="theToolBar"></div>
        <div id="leftLayout">
            <div id="treeArea"></div>
            <div id="exifArea"></div>
        </div>
        <div id="rightLayout">
            <img id="largeImage" src="">
        </div>
    </div>
</body>
```

and the javaScript:

```

function buildTree(){

    // create the root Jx.Tree
    var tree = new Jx.Tree('treeArea');

    // create a folder to be added to Jx.Tree
    var folder = new Jx.TreeFolder({
        label: 'My Folder',
        image: 'images/blue_folder.png',
        imageClass: 'blueFolder'
    });

    // add the folder to the tree
    tree.append(folder);

    // cycle through the global gaImages and add Jx.TreeItem's 
    for(var i=0;i<gaImages.length;i++){
        var item = new Jx.TreeItem({
            label: gaImages[i]
        });
        
        // create a evenListener for click on the JX.TreeItem Dom Object. fire "treeItemClicked Func and bind the treeItem Object"
        item.domObj.addEvent('click', treeItemClicked.bind(item));

        // add the item to the folder
        folder.append(item);
    }
}
```

We are going to want to have the image scroll inside that area, so let's add overflow:auto to our rightLayout.

```
#rightLayout {
  border: 1px solid blue;
  overflow:auto;
  /*margin: 10px;*/
}
```

## Supporting PHP scripts ##

We can start implementing some core functionality to this application now.

Here's a couple scripts were going to use for our ImageViewer

  1. getImages.php
  1. viewImage.php

### getImages.php ###

This script returns a JSON object of JPG files that reside in the ./samples/ directory. It also is used to fetch a files EXIF data so we can view some stats on the viewed JPG.

With no parameters this script will return the json array.

If you specify:
exif=[filename](filename.md)

it will then return a json object of the images Exif metadata using the specified filename.

### viewImage.php ###

viewImage.php uses gd to resize the  image to the leftLayout's width.

### treeItemClicked() ###

We have couple new globals here, we will set gImageFileName so we can track the active filename. And also not yet discussed is the global "gFitToWindow" I going to assume that we would want the image to fit inside of the rightLayout window and not scroll horizontally.  Later we will create a Combo menu item to toggle this global.

This function behaves like this:

  1. set the global so we know what filename is active
  1. check to see if gFitToWindow is true/false
  1. if true is sets the image src to our viewImage.php script to resample the image
  1. if false it sets the image src to the image itself
  1. then trigger the "treeItemClicked\_CB" function with the EXIF data from the selected image

```
function treeItemClicked(){
    // store the active fileName in a global
    gImageFileName = this.options.label;

    // see what the width of the rightLayout is set to currently
    var divWidth = $('rightLayout').offsetWidth-17;

    // if the global gFitToWindow is set to true then we will resize the images on the fly to fit in the rightLayout
    if(gFitToWindow == true){
        $('largeImage').src = "./viewImage.php?f="+gImageFileName+"&w="+divWidth;
    }
    else
    {
        // just change the src of the image. 
        $('largeImage').src = "./samples/"+gImageFileName
    }
    
    // get the exif Data for the image
    new Request({url:"./getImages.php?exif="+this.options.label, onComplete: treeItemClicked_CB}).send();

}
```


### Jx.Splitter ###
Now we will add a splitter in the leftLayout inbetween the Jx.Tree and the exifArea.

Lets define our Jx.splitter object just below the Jx.Layout section but above the mainContainer.resize() function call.
```
    new Jx.Splitter('leftLayout', {
      elements: ['treeArea','exifArea'],
      containerOptions: [{height:200}],
      layout: 'vertical',
    });
```

### Populating the Exif Div ###

We now have a call back function when the tree item is clicked that fetches the Image Exif Data. Now lets create a function that uses that exif data and populates the exifArea div

```
function treeItemClicked_CB(oObject){
    eval("var ExifData = "+oObject);
    var oDiv = $('exifArea');
    oDiv.innerHTML = "";
    var szInnerHtml = "";
    var szTheValue = "";
    
    for(item in ExifData){
        
        if(ExifData[item] == null){
            szTheValue = "";
        }
        else
        {
            szTheValue = ExifData[item];
        }
        szInnerHtml = szInnerHtml +"<span class='exifTitle'>"+ item+ "</span>:<span class='exifValue'>"+szTheValue +"<br>";
    }
    oDiv.innerHTML = szInnerHtml;
}
```

Now some final touches on the Exif Css

```
#exifArea {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  line-height: 18px;
  overflow:auto;
  padding:3px;
}

#exifArea .exifTitle{
  font-weight:bold;
}
```

## Review ##

So at this point we should have a fluid application that resized in the browser window with a left and right layout. A toolbar with a menu and a tree of our images with a splitter.

![http://jxlib.googlecode.com/svn/wiki/images/layout3.png](http://jxlib.googlecode.com/svn/wiki/images/layout3.png)

Here's a snapshot on where we should be now in the html document:

```
<html>
    <head>
    <title>Creating a Image Viewer Application Using JX.Layout</title>
    <script src="../../../lib/jxlib.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="../../../lib/jxskin_crispin.css" type="text/css" media="screen" charset="utf-8">
    
<script  type="text/javascript">
var gaImages = [];
var gFitToWindow = true;
window.addEvent('load', function() {

    var mainContainer = new Jx.Layout('thePage', {bottom: 35});
    var theToolBar = new Jx.Layout('theToolBar', {width: null, height:35, left: 0, right: null, top: 0, bottom: 0, minWidth: 100});
    var leftLayout = new Jx.Layout('leftLayout', {width: 200, left: 0, right: null, top: 35, bottom: 0, minWidth: 100});
    var rightLayout = new Jx.Layout('rightLayout',  {width: null, left: 200, right: 0, top: 35, bottom: 0});

    var theToolBar = new Jx.Toolbar({parent: 'theToolBar'});

    new Jx.Splitter('leftLayout', {
      elements: ['treeArea','exifArea'],
      containerOptions: [{height:200}],
      layout: 'vertical',
    });

  // create the root menu item container
    var optionMenu = new Jx.Menu({label: 'Options'});

    // create menu item
    var menuitem1 = new Jx.Menu.Item({
      label: ' Display Settings',
      onClick:function(){alert('One way to skin a cat')}
    });

    // add the menu item to the menu container
    optionMenu.add(menuitem1);

    // add the menu to the toolbar
    theToolBar.add(optionMenu);

    // create the root menu item container
    var helpMenu = new Jx.Menu({label: 'Help'});
    // create menu item
    var menuItem1 = new Jx.Menu.Item({
        label: 'Info' ,
        onClick:myInfoFunction.bind()
    });
    // create menu item
    var menuItem2 = new Jx.Menu.Item({label: 'About'});

    // add the menu item to the menu container
    helpMenu.add(menuItem1,menuItem2);
    
    // add the menu to the toolbar
    theToolBar.add(helpMenu);

    //build the jx.tree
    updateTree();

    // resize the layout
    mainContainer.resize();
});

function myInfoFunction(){
    alert("another.. way to skin a cat");
}

function updateTree(){
    // get the file listings in a JSON Array from "getImages.php"
    new Request({url:"./getImages.php", onComplete: updateTree_CB}).send();
}

function updateTree_CB(oObject){
// create / set the images global
eval("gaImages = "+oObject);

// call buildTree and start working with Jx.Tree
buildTree();
}

function buildTree(){

    // create the root Jx.Tree
    var tree = new Jx.Tree('treeArea');

    // create a folder to be added to Jx.Tree
    var folder = new Jx.TreeFolder({
        label: 'My Folder',
        image: 'images/blue_folder.png',
        imageClass: 'blueFolder'
    });

    // add the folder to the tree
    tree.append(folder);

    // cycle through the global gaImages and add Jx.TreeItem's
    for(var i=0;i<gaImages.length;i++){
        var item = new Jx.TreeItem({
            label: gaImages[i]
        });

        // create a evenListener for click on the JX.TreeItem Dom Object. fire "treeItemClicked Func and bind the treeItem Object"
        item.domObj.addEvent('click', treeItemClicked.bind(item));

        // add the item to the folder
        folder.append(item);
    }
}
function treeItemClicked(){
    // store the active fileName in a global
    gImageFileName = this.options.label;

    // see what the width of the rightLayout is set to currently
    var divWidth = $('rightLayout').offsetWidth-17;

    // if the global gFitToWindow is set to true then we will resize the images on the fly to fit in the rightLayout
    if(gFitToWindow == true){
        $('largeImage').src = "./viewImage.php?f="+gImageFileName+"&w="+divWidth;
    }
    else
    {
        // just change the src of the image.
        $('largeImage').src = "./samples/"+gImageFileName
    }

    // get the exif Data for the image
    new Request({url:"./getImages.php?exif="+this.options.label, onComplete: treeItemClicked_CB}).send();
}

function treeItemClicked_CB(oObject){
    eval("var ExifData = "+oObject);
    var oDiv = $('exifArea');
    oDiv.innerHTML = "";
    var szInnerHtml = "";
    var szTheValue = "";
    
    for(item in ExifData){
        
        if(ExifData[item] == null){
            szTheValue = "";
        }
        else
        {
            szTheValue = ExifData[item];
        }
        szInnerHtml = szInnerHtml +"<span class='exifTitle'>"+ item+ "</span>:<span class='exifValue'>"+szTheValue +"<br>";
    }
    oDiv.innerHTML = szInnerHtml;
}
</script>

<style type="text/css">
/*
    The Main Page Container
*/
#thePage {
  border: 1px solid red;
  margin: 10px;
  padding: 10px;
}

/*
    The Left Side:
*/

#leftLayout {
  border: 1px solid green;
}

/*
    The Right Side:
*/

#rightLayout {
  border: 1px solid blue;
  overflow:auto;
  /*margin: 10px;*/
}

/*
    The Toolbar:
*/
#theToolBar{
  border: 1px solid orange;
}

#exifArea {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  line-height: 18px;
  overflow:auto;
  padding:3px;
}

#exifArea .exifTitle{
  font-weight:bold;
}
</style>

</head>
<body>
    <div id="thePage">
        <div id="theToolBar"></div>
        <div id="leftLayout">
            <div id="treeArea"></div>
            <div id="exifArea"></div>
        </div>
        <div id="rightLayout">
            <img id="largeImage" src="../../../lib/images/a_pixel.png">
        </div>
    </div>
</body>
</html>
```


### Adding A Dialog ###
We are going to now add a Jx.Dialog with Jx.Tabset

Our dialog is going to be a fixed size 400px x 400px we will alow it to be moved around and also be resizeable

Here's the javascript for our "about" dialog, lets put it directly under our jx.Layout definitions:

It is a good idea to have all your container objects like layout dialog splitter panel to appear in the top of your document. For example if you are trying to have a menu item's onClick call a dialog, you should have that dialog defined already. So in some cases you need to pay attention to the order of which the objects are defined.

```
    var aboutDialog = new Jx.Dialog(
        {
            label: 'About',
            modal: false,
            resize: true,
            move: true,
            width: 400,
            height: 400,
            parent: 'thePage',
            content: 'aboutDialog'
        }
    );
```

Create a div in our body called aboutDialog.


Here's the body block:
```
<body>
    <div id="thePage">
        <div id="theToolBar"></div>
        <div id="leftLayout">
            <div id="treeArea"></div>
            <div id="exifArea"></div>
        </div>
        <div id="rightLayout">
            <img id="largeImage" src="">
        </div>
        <div id="aboutDialog"></div>
    </div>
</body>
```

This dialog is to open up when we use the Help / About menu item, so change the menu item to call the dialog's open function

JavaScript:
```
    var menuItem2 = new Jx.Menu.Item({
        label: 'About',
        onClick: aboutDialog.open.bind(aboutDialog)
    });
```

### Adding Jx.Tabset ###

Now on to adding our tabset. Tabset's work with three basic elements's.

Here is the structure:
```
   <div id="aboutDialog_ToolBar"></div>
   <div id="aboutDialog_TabArea" ></div>
   <div id="aboutDialog_TabContent_1">Content for Tab 1</div>
   <div id="aboutDialog_TabContent_2">Content for Tab 2</div>
   <div id="aboutDialog_TabContent_3">Content for Tab 3</div>
```

  * aboutDialog\_ToolBar is the  Jx.Toolbar that we are going to put our tabset into.
  * aboutDialog\_TabArea  is the Jx.TabSet where the tabs and tab content get appended to.
  * The remaining three divs are for the tab content.

Lets look at the Javascrip for this:
```
    var tb = new Jx.Toolbar({parent:'aboutDialog_ToolBar'});
    var ts = new Jx.TabSet('aboutDialog_TabArea');
    
    var t1 = new Jx.Button.Tab({label: 'Tab 1', content: 'aboutDialog_TabContent_1'});
    var t2 = new Jx.Button.Tab({label: 'Tab 2', content: 'aboutDialog_TabContent_2'});
    var t3 = new Jx.Button.Tab({label: 'Tab 3', content: 'aboutDialog_TabContent_3'});
    
    ts.add(t1, t2, t3);
    tb.add(t1, t2, t3);
```

  * Our Toolbar belongs to "aboutDialog\_ToolBar".
  * Then we create the TabSet which is "aboutDialog\_TabArea".
  * add the tabs to the tabset.
  * add the tabs to the toolbar.

Here's our new body html:
```
<body>
    <div id="thePage">
        <div id="theToolBar"></div>
        <div id="leftLayout">
            <div id="treeArea"></div>
            <div id="exifArea"></div>
        </div>
        <div id="rightLayout">
            <img id="largeImage" src="../../../lib/images/a_pixel.png">
        </div>
    </div>
    
    <div id="aboutDialog">
        <div id="aboutDialog_ToolBar"></div>
        <div id="aboutDialog_TabArea" ></div>
        <div id="aboutDialog_TabContent_1">Content for Tab 1</div>
        <div id="aboutDialog_TabContent_2">Content for Tab 2</div>
        <div id="aboutDialog_TabContent_3">Content for Tab 3</div>
    </div>
</body>
```

# Closing #

I will continue on this tutorial until we are using all of the jxlib's toolkit. I have included the source here below for the two script this application uses

Cheers

Paul Deschamps
Applications Specialist.
DM Solutions Group.


Here's "getImages.php"

```
<?php

if(isset($_GET["exif"])){
    // get the images exif data
    $aExtension = split("\.",$_GET["exif"]);
    //print_r(exif_read_data(dirname(__FILE__)."/samples/".$_GET["exif"]));
    if(strtolower($aExtension[count($aExtension)-1]) == "jpg"){
        echo var2json(createExifObject(exif_read_data(dirname(__FILE__)."/samples/".$_GET["exif"])));
    }
    else
    {
        echo "null";
    }

}
else
{
    // show the directory
    getImagesDirectory();
}

function getImagesDirectory(){
    $handle = opendir(dirname(__FILE__)."/samples") or die("Unable to open this directory");
    $aFiles = array();
    /* loop through files in directory */
    while (false!==($file = readdir($handle))) {
        $aExtension = split("\.",$file);
        switch(strtolower($aExtension[count($aExtension)-1])){
            case "png":
            case "gif":
            case "jpg":{
                array_push($aFiles,$file);
            break;
            }
        }
    }

    /* close the directory */
    closedir($handle);
    echo var2json($aFiles);
}
function var2json($var) {
    $result = "";
    if (is_object($var)) {
        $result .= "{";
        $sep = "";
        foreach($var as $key => $val) {
            $result .= $sep.'"'.$key.'":'.var2json($val);
            $sep = ",";
        }
        $result .= "}";
    } else if (is_array($var)) {
        $result .= "[";
        $sep = "";
        for($i=0; $i<count($var); $i++) {
            $result .= $sep.var2json($var[$i]);
            $sep = ",";
        }
        $result .= "]";
    } else if (is_string($var)) {
        //$tmpStr = str_replace("'", "\'", $var);
        $tmpStr = str_replace('"', '\"', $var);
        $result = '"'.str_replace("\n", '\n', $tmpStr).'"';
    } else if (is_bool($var)) {
        $result = $var ? 'true' : 'false';
    } else if (is_null($var)) {
        $result = 'null';
    }else {
        $result = $var;
    }
    return $result;
}


function createExifObject($aArray){

    $oTmp = NULL;
    $oTmp->make = @$aArray["Make"];
    $oTmp->model = @$aArray["Model"];
    $oTmp->fsize = @$aArray["FileSize"];
    $oTmp->width = @$aArray["COMPUTED"]["Width"];
    $oTmp->height = @$aArray["COMPUTED"]["Height"];
    $oTmp->datetime = @$aArray["DateTime"];
    $oTmp->exposure = @$aArray["ExposureTime"];
    $oTmp->apature = @$aArray["MaxApertureValue"];
    $oTmp->bias = @$aArray["ExposureBiasValue"];
    $oTmp->focalLength = @$aArray["FocalLength"];

    return $oTmp;

}

?>
```

Here's "viewImage.php"

```
<?

$szWidth =  isset($_GET["w"])?$szWidth = $_GET["w"]: $szWidth = "";
$szFileName =  isset($_GET["f"])?$szFileName =$_GET["f"]: $szFileName = "";
$szPercent = isset($_GET["p"])?$szPercent =$_GET["p"]: $szPercent = "";

$szFilePath = dirname(__FILE__)."/samples/".$szFileName;


if($szWidth >0){
    // resize by with with aspect
    
    if($szFileName != ""){

        $width = $szWidth;
        /*** the image file to thumbnail ***/

        if(!file_exists($szFilePath))
        {
            echo 'No file found';
        }
        else
        {
            /*** image info ***/
            list($width_orig, $height_orig, $image_type) = getimagesize($szFilePath);
            /*** check for a supported image type ***/
            if($image_type !== 2){
                echo 'invalid image';
                }
                else
                {
                /*** thumb image name ***/
                $thumb = 'thumb.jpg';

                /*** maintain aspect ratio ***/
                $height = (int) (($width / $width_orig) * $height_orig);

                /*** resample the image ***/
                $image_p = imagecreatetruecolor($width, $height);
                $image = imageCreateFromJpeg($szFilePath);
                imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
                header('Content-type: image/jpeg');
                imageJpeg($image_p, null, 100);
            }
        }
    }
}

if($szPercent != ""){
    //resize by percent

    // Get new dimensions
    list($width, $height, $image_type) = getimagesize($szFilePath);

    if($image_type !== 2){
        echo 'invalid image';
        }
        else
        {    
        $new_width = $width * $szPercent;
        $new_height = $height * $szPercent;

        // Resample
        $image_p = imagecreatetruecolor($new_width, $new_height);
        $image = imagecreatefromjpeg($szFilePath);
        imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

        // Output
        header('Content-type: image/jpeg');
        imagejpeg($image_p, null, 100);
    }
}

?>
```