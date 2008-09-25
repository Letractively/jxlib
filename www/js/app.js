var refTree;
var panelContent;
var homeTab, refTab, examplesTab, testsTab;

window.addEvent('load', function() {
    var defaultTab = Cookie.read('JxHomePage.CurrentTab') || 'homeTab';

    /* toolbar to contain the tabs, goes in the panel */
    var toolbar = new Jx.Toolbar({parent:'content'});
    
    /* create the main navigation tabs */
    homeTab = new Jx.Button.Tab({
        label: 'Home', 
        content: 'homePage',
        onDown: function() {
            window.top.main.location.href = 'home.html';
            Cookie.write('JxHomePage.CurrentTab', 'homeTab');
        }
    });
    examplesTab = new Jx.Button.Tab({
        label: 'Examples', 
        content: 'exampleList',
        onDown: function() {
            window.top.main.location.href = '../reference/examples';
            Cookie.write('JxHomePage.CurrentTab', 'examplesTab');
        }
    });
    refTab = new Jx.Button.Tab({
        label: 'API Reference', 
        content: 'refList',
        onDown: function() {
            window.top.main.location.href = '../reference/api';
            Cookie.write('JxHomePage.CurrentTab', 'refTab');
        }
    });
    testsTab = new Jx.Button.Tab({
        label: 'Tests', 
        content: 'testList',
        onDown: function() {
            Cookie.write('JxHomePage.CurrentTab', 'testsTab');
        }
    });
    new Jx.TabSet('tabset').add(homeTab, refTab, examplesTab, testsTab);
    toolbar.add(homeTab, examplesTab, refTab/*, testsTab*/);
    
    switch(defaultTab) {
        case 'homeTab':
            homeTab.setActive(true);
            break;
        case 'refTab':
            refTab.setActive(true);
            break;
        case 'examplesTab':
            examplesTab.setActive(true);
            break;
        case 'testsTab':
            testsTab.setActive(true);
            break;
    }
});