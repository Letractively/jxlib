# Working with Jx Flyout Buttons #

Flyout buttons are a special type of button that display a content area when the button is clicked.  The content 'flys' out next to the button.  Clicking the button again, or clicking outside of the flyout or hitting the ESC key will close the flyout.  The content can be anything you wish, including static HTML, a reference to dynamically created HTML objects, or content loaded asychronously.  See [Content Loading](JxContentLoading.md) for details on how content is loaded by components.

A flyout button supports all the same options as a regular button, with two exceptions.  First, the toggle option is forced to true and cannot be changed.  Second, there is an additional content option as per the [Content Loading](JxContentLoading.md) documentation.

```
var flyout = new Jx.Flyout({
    image: 'images/bug.png',
    label: 'Options',
    tooltip: 'Debugging Options',
    content: 'optionsPane'
});
```

## Flyout Events ##

Although the flyout button is a toggle button, it fires open and close events instead of the down and up events.

```
var flyout = new Jx.Flyout({
    image: 'images/bug.png',
    label: 'Options',
    tooltip: 'Debugging Options',
    content: 'optionsPane',
    onOpen: function() {
        alert('flyout was opened');
    },
    onClose: function() {
        alert('flyout was opened');
    }
});
```

When using a flyout button, its content is not part of the DOM tree when it is not open and so you cannot directly reference elements in the content by id.