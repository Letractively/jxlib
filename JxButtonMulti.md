## Jx.Button.Multi ##

button-multi.png

Multi buttons are a special type of button that contain other buttons, displaying only one of them at a time.  A multi button has two parts, a button and a flyout button.  The button represents the currently selected button, and clicking on it fires the events of that button.  The flyout button pops open a list of buttons that have been added to the multi button, allowing the user to click any of the buttons.  When the user does click a button in the flyout, that button becomes the current button in the main interface as well as firing the events of the button.

```
var multi = new Jx.Button.Multi();
multi.add(
    new Jx.Button({label: 'button 1'}),
    new Jx.Button({label: 'button 2'}),
    new Jx.Button({label: 'button 3'}),
    new Jx.Button({label: 'button 4'})
);
multi.addTo('buttonContainer');
```

### Jx.Button.Multi API ###

A multi button is a JxButton sub class and supports the same API.  It extends the normal button API with the following methods:

  * add() - adds one or more buttons to the multi button.  Multiple buttons are passed in a comma separated list.
  * remove(button) - removes a previously added button.
  * addTo(element) - as with Jx.Button, this adds the multi button to an existing element by reference or id.