# Introduction #

This is a compatibility matrix for tracking the status of testing the examples in each of the major browsers.  This doesn't mean that we are targeting full functionality in all browsers.

## Legend ##

  * ? - untested
  * Pass - Jx works in this browser
  * Fail - Jx doesn't work in this browser
  * Partial - Jx works but something is wrong, either visual or functional

# Overall Status #

| IE 6 | IE 7 | IE 8 | Firefox 2 | Firefox 3 | Safari 2 | Safari 3 | Chrome | Opera |
|:-----|:-----|:-----|:----------|:----------|:---------|:---------|:-------|:------|
| Partial | Partial | Partial | Partial   | Partial   | Partial  | Partial  | Partial | Partial |

# Specific Status #

## Page Layout ##
| Browser     | Layout | Splitter | Splitter Integrated |
|:------------|:-------|:---------|:--------------------|
| IE 6        | Pass   | Pass     | Pass                |
| IE 7        | ?      | ?        | ?                   |
| IE 8 Beta   | ?      | ?        | ?                   |
| Firefox 2   | Pass   | Pass     | Pass                |
| Firefox 3   | ?      | ?        | ?                   |
| Safari 2    | ?      | ?        | ?                   |
| Safari 3    | ?      | ?        | ?                   |
| Chrome Beta | ?      | ?        | ?                   |
| Opera  9.27 | pass   | pass     | pass                |

## Panels and Dialogs ##
| Browser     | Panel | Panel Set | Panels Integrated | Dialog     | Dialogs Integrated |
|:------------|:------|:----------|:------------------|:-----------|:-------------------|
| IE 6        | Partial | Pass      | Pass              | Partial    | Pass                  |
| IE 7        | ?     | ?         | ?                 | ?          | ?                  |
| IE 8 Beta   | ?     | ?         | ?                 | ?          | ?                  |
| Firefox 2   | Pass  | Pass      | Pass              | Pass       | Fail (4)           |
| Firefox 3   | ?     | ?         | ?                 | ?          | ?                  |
| Safari 2    | ?     | ?         | ?                 | ?          | ?                  |
| Safari 3    | ?     | ?         | ?                 | ?          | ?                  |
| Chrome Beta | ?     | ?         | ?                 | ?          | ?                  |
| Opera  9.27 | fail (1) | pass      | pass              | fail (2,3) | ?                  |

## Content Areas ##
| Browser     | Grid | Tree |
|:------------|:-----|:-----|
| IE 6        | Partial | Pass |
| IE 7        | ?    | ?    |
| IE 8 Beta   | ?    | ?    |
| Firefox 2   | ?    | ?    |
| Firefox 3   | ?    | ?    |
| Safari 2    | ?    | ?    |
| Safari 3    | ?    | ?    |
| Chrome Beta | ?    | ?    |
| Opera  9.27 | ?    | ?    |

## Bars and Buttons ##
| Browser     | Toolbar | Button | Flyouts | Flyouts Integrated | Combo | Multi | Color |
|:------------|:--------|:-------|:--------|:-------------------|:------|:------|:------|
| IE 6        | Partial | Partial | Partial | Pass               | Partial | Partial | Partial |
| IE 7        | ?       | ?      | ?       | ?                  | ?     | ?     | ?     |
| IE 8 Beta   | ?       | ?      | ?       | ?                  | ?     | ?     | ?     |
| Firefox 2   | ?       | ?      | ?       | ?                  | ?     | ?     | ?     |
| Firefox 3   | ?       | ?      | ?       | ?                  | ?     | ?     | ?     |
| Safari 2    | ?       | ?      | ?       | ?                  | ?     | ?     | ?     |
| Safari 3    | ?       | ?      | ?       | ?                  | ?     | ?     | ?     |
| Chrome Beta | ?       | ?      | ?       | ?                  | ?     | ?     | ?     |
| Opera  9.27 | ?       | ?      | ?       | ?                  | ?     | ?     | ?     |

## Tabs and Menus ##
| Browser     | Tabs | Tab Set | Tabs Integrated | Menu | Menu Bar | Context Menu |
|:------------|:-----|:--------|:----------------|:-----|:---------|:-------------|
| IE 6        | Partial | Pass    | Pass            | Partial | Pass     | Partial             |
| IE 7        | ?    | ?       | ?               | ?    | ?        | ?            |
| IE 8 Beta   | ?    | ?       | ?               | ?    | ?        | ?            |
| Firefox 2   | ?    | ?       | ?               | ?    | ?        | ?            |
| Firefox 3   | ?    | ?       | ?               | ?    | ?        | ?            |
| Safari 2    | ?    | ?       | ?               | ?    | ?        | ?            |
| Safari 3    | ?    | ?       | ?               | ?    | ?        | ?            |
| Chrome Beta | ?    | ?       | ?               | ?    | ?        | ?            |
| Opera  9.27 | ?    | ?       | ?               | ?    | ?        | ?            |

## Notes ##

(1) The toolbars in panels examle fails to layout the toolbars and content properly in Opera 9.27 on Mac OS X ([Issue 1](https://code.google.com/p/jxlib/issues/detail?id=1)).

(2) The button for the 'Positioned' dialog example fails to launch the dialog.  This is the only modal dialog on the page.

(3) None of the basic dialogs are resizable.

(4) The PanelSet example, resize smaller and the dialog content area gets disabled scroll bars.  Investigating using firebug causes them to disappear.