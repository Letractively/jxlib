# Introduction #

Jx comprises a set of building blocks that assist a web developer in creating web-based applications.  Typical building blocks are buttons, menus, tabs, dialogs, panels and layout controls.  You pick and choose which components you need and plug them together with your content and custom application logic.  Jx also provides you with a consistent visual style for all the components that you are using, something that really makes an application more pleasant and easy to use for your end user.

Jx is built on the excellent [MooTools](http://mootools.net) library.

## General Concepts ##

This section covers general concepts that are applicable to all or many of the Jx components.  These topics stand alone, but are often refered to by specific components that employ the technique or concept described.

  * [Options](JxOptions.md) - many Jx components have specific options that can be set when the component is created, this covers the general concept.
  * [Events](JxEvents.md) - Jx uses an event mechanism to notify application code of various changes in state, this describes the general mechanisms associated with adding and removing event handlers.
  * [Content Loading](JxContentLoading.md) - Jx components that embed your content use a standardized API for doing so.

## Layout Components ##

This section covers Jx components that specifically manage content and content containers.

  * [Layout](JxLayout.md) - a control that manages the size of elements based on a set of rules
  * [Splitter](JxSplitter.md) - a control that splits an HTML element horizontally or vertically and allows the user to resize the split areas.
  * [Panel Set](JxPanelSet.md) - manages a set of Panels in a vertical area such that the panels can be resized and consume the vertical space of the container (similar to the Outlook bar or an accordion).

## Buttons ##

This section covers various types of buttons, one of the most basic building blocks for applications.  Jx has a fairly sophisticated Button class and several useful sub-classes that implement common variations.

  * [Button](JxButton.md) - a simple clickable button.
  * [Flyout Button](JxButtonFlyout.md) - exposes a panel when the button is clicked.
  * [Color Button](JxButtonColor.md) - exposes a color picker when the button is clicked.
  * [Multi Button](JxButtonMulti.md) - a palette of buttons, one of which is in the toolbar - it can be changed by choosing a new button from a flyout, similar to a photoshop concept.
  * [Combo Button](JxButtonCombo.md) - an editable selection list.
  * [Button Set](JxButtonSet.md) - not a visual widget, but groups toggle buttons together so that only one can be active at a time.

## Toolbars ##

Toolbars are used in a variety of situations to organize buttons, tabs, menus and other content.

  * [Toolbar](JxToolbar.md) - a container for buttons, tabs, menus and other content organized into a horizontal or vertical bar.
  * [Toolbar Item](JxToolbar.md) - a container for non-Jx components that allow them to work in toolbars correctly.
  * [Toolbar Separator](JxToolbar.md) - a visual separator in a toolbar that provides some sense of grouping of tools.

## Tabs ##

Tabs are a useful way of managing a set of content areas in a small visual area by having the content share the same area and allowing the user switch between them using tabs.

  * [Tab](JxTab.md) - a button that shows a content area when activated and hides it when deactivated.
  * [Tab Box](JxTab.md) - a combined tab bar and content area that you can put tabs into
  * [Tab Set](JxTab.md) - manages a set of tabs so that only one is active at a time

## Menus ##

Menus are an excellent way to group hierarchies of functionality into a compact display.

  * [Menu Item](JxMenu.md) - an entry in a menu
  * [Sub Menu](JxMenu.md) - a menu that goes in another menu
  * [Menu](JxMenu.md) - a menu that can contain menu items and sub menus, can be put in a toolbar.
  * [Context Menu](JxMenu.md) - a menu that can be shown anywhere, usually triggered by a right mouse click.

## Trees ##

Trees are excellent for representing hierarchical information

  * [Tree Item](JxTree.md) - an entry in a tree.
  * [Tree Folder](JxTree.md) - a folder in a tree, it contains folders and items.
  * [Tree](JxTree.md) - a root organizer for a tree.

## Panels and Dialogs ##

  * [Panel](JxPanel.md) - a basic layout element with a title bar optional toolbars and a content area.
  * [Dialog](JxDialog.md) - a floating panel that looks like a panel but can be moved and resized.

## Other Components ##

  * [Grid](JxGrid.md) - a tabular control that has fixed headers for rows and columns and scrollable content.