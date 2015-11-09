## Introduction ##

The new JxLib test suite consists of JsSpec for tests that return immediate results and an interactive test framework (thanks go to Aaron over at [Clientcide.com](http://www.clientcide.com/) for making this test suite available) for visual and Ajax based testing.


## How to run the Tests ##

In order to run the tests, you'll need to check out the following parts of the svn:

  * trunk
  * vendors
  * www

Then run the tests target of the ant build file located in the trunk directory (build.xml). That will set everything up so that you can easily run the tests by setting up your local web server to serve the root of the www directory and then go to http://localhost/tests/. Obviously, adjust the path for your configuration.

Eventually, all of these tests will be hosted on the jxlib website at http://jxlib.org/.


## How to write JsSpec Tests ##

Writing JsSpec tests are actually pretty easy. They all fall into the following form:

```
describe('what we are testing', {
    'test title/specific behavior to test':  function(){
        //test here...
	value_of(something producing a value).test(testing against);
    }, more tests....

});
```

You can also add before\_each and after\_each methods to the set of tests. They would act like setup and tear down methods of other frameworks.

Here is an example from the JxLib tests:

```
describe('common tests',{
    'Jx should be defined': function(){
        value_of($defined(Jx)).should_be_true();
    },
    'Family mutator check': function(){
        var c = new Class({
	    Family: 'Jx.Widget'
	});
	newC = new c();
	value_of($type(newC)).should_be('Jx.Widget');
    },
    'Element.getNumber()':function() {
        var body = $(document.body);
        value_of(body.getNumber()).should_be(0);
        value_of(body.getNumber('letter')).should_be(0);
        value_of(body.getNumber(10)).should_be(10);
    }
});
```

If you're writing tests for the framework, please follow these guidelines:

  * One file per class tested
  * Try NOT to add any global varibles as all test files will share the same scope. Any variables you add could affect other tests. For example, if you need a specific data set for a series of tests and it needs to be reset for each test, put it in the before\_each method.
  * Place all tests in the UserTests directory under the path trunk/tests/jsspec.
  * Name the test file Class-specs.js where 'Class' is the name of the class you're testing. For example, to test the file Jx.Object class, the test is named object-specs.js
  * Add a script tag in the index.html in the jsspec directory listing the new file (see the index.html file for an example).

For those who have never written JsSpec tests, you will find a cheat sheet in the jsspec directory in both openOffice format and PDF. It is entitled jsspec-cheat-sheet.odt (.pdf). It will be useful in writing tests.

## How to write Interactive Tests ##

Writing an interactive test requires three things:

  1. Change the tests.json file to reflect the new tests
  1. Write a html file for the test
  1. Write the javascript file for the test

We'll take each part in turn.

### Edit the tests.json file ###

The tests.json file looks like this:

```
{
    "Base": {
        "common": [
        	"dependencies"
        ]
    },
    "Button": {
    	"button": ["all"]
    }
}
```

This is a json object that describes the tests to be run. The first level properties are the folders that the tests, and the source code, can be found in. In this case the tests, and source, can be found in the "Base" or "Button" subdirectories.

The second level is the file to be loaded and corresponds to the scripts.json file in the Source directory of the svn trunk. The test uses this property to determine what files and dependencies to load from the source tree as well as finding the appropriate files to load for the test itself.

Finally, the array lists the individual tests. If there is only one test file, it is called "all" otherwise it should be a comma delimited list of tests. Each test has two files located in the test directory - one HTML and one Javascript - described below.

### Write the HTML file ###

Each test should have a single HTML file. It should be named `<class or file>.<test name>.html`. For example, for the button test shown in the previous section, the HTML file would be `button.all.html`.

The file should only be the portion of HTML that would come between the BODY tags of a full document. For example, the HTML for the button.all.html file is:

```
<style type="text/css">
	@import url('UserTests/assets/themes/crispin/jxtheme.uncompressed.css');
</style>

<div id="button"></div>
```

This imports the needed styles and then just has the div for the button. You'll notice that the path to the css file starts with "UserTests/assets". This directory is where you'll find all of the standard JxLib stylesheets, images, and other assets. Any other assets needed for your test should be located in the test directory itself in an assets folder for easy access. You'll still need to reference them with the "full" url starting with UserTests/.

### Write the Javascript file ###

Each test should also have a single javascript file. It should also be named like the HTML file except with a .js extension instead of .html. For example, `button.all.js` for the button test file.

This file enumerates the tests to be run. It should look like the following:

```
{
    tests: [
       {
        	title: "The test title",
        	description: "A Description of the test",
        	verify: "The question the user should answer to verify the test. Yes/No only.",
        	before: function(){}, //run when the test starts
        	body:"",   // User editable content to run with the test. Run after before().
        	post: function(){}  // run after body code and after before();
        },{
        	title: "",
        	description: "",
        	verify: "",
        	before: function(){},
        	body:"",
        	post: function(){}
        }
        
    ]
}
```

Most of the sections of the test should be self-explanatory. The Button test file looks like this (as of 5/3/2009 anyway):

```
{
    tests: [
        {
            title: "Button - Visual Representation",
            description: "This test is to verify that the button displays properly.",
            verify: "Do you see a fully formed button in window? It won't do anything, just be sure that all the appropriate parts are there and that it looks correct.",
            before: function(){
	        	new Jx.Button({
	        		label: 'Just a label',
	        		tooltip: 'a tooltip',
	        		image: 'UserTests/Button/assets/crispin.png'
	        	}).addTo('button');
            },
            body: "",
            post: function(){
                
            }
        },{
        	title: "Button - Hover",
        	description: "This test is to verify that the hover state is correct.",
        	verify: "Does the button change states when you hover over it?",
        	before: function(){},
        	body:"",
        	post: function(){}
        },{
        	title: "Button - Tooltip",
        	description: "This test is to verify that the tooltip shows up.",
        	verify: "Does the tooltip show when you mouse over the button and pause?",
        	before: function(){},
        	body:"",
        	post: function(){}
        }
        
    ]
}
```

This is just the basics of using this test framework. For further information on this testing format, please see the readme file linked from the test index page (It has a ton more information).