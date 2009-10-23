// $Id$
/**
 * Class: Jx.TreeFolder
 * 
 * Extends: <Jx.TreeItem>
 *
 * A Jx.TreeFolder is an item in a tree that can contain other items.  It is
 * expandable and collapsible.
 *
 * Example:
 * (code)
 * (end)
 *
 * Extends:
 * <Jx.TreeItem>
 *
 * License: 
 * Copyright (c) 2008, DM Solutions Group Inc.
 * 
 * This file is licensed under an MIT style license
 */
Jx.TreeFolder = new Class({
    Family: 'Jx.TreeFolder',
    Extends: Jx.TreeItem,
    /**
     * Property: tree
     * {<Jx.Tree>} a Jx.Tree instance for managing the folder contents
     */
    tree : null,

    options: {
        /* Option: open
         * is the folder open?  false by default.
         */
        open: false,
        template: '<li class="jxTreeContainer jxTreeBranch"><img class="jxTreeImage" src="'+Jx.aPixel.src+'" alt="" title=""><a class="jxTreeItem" href="javascript:void(0);"><img class="jxTreeIcon" src="'+Jx.aPixel.src+'" alt="" title=""><span class="jxTreeLabel"></span></a><ul class="jxTree"></ul></li>'
    },
    classes: ['jxTreeContainer','jxTreeImage','jxTreeItem','jxTreeIcon','jxTreeLabel','jxTree'],
    /**
     * APIMethod: render
     * Create a new instance of Jx.TreeFolder
     */
    render : function() {
        this.parent();

        var node = this.elements.get('jxTreeImage');
        if (node) {
            document.id(node).addEvent('click', this.clicked.bindWithEvent(this));
            this.addEvent('click', this.clicked.bindWithEvent(this));
        }
                
        this.tree = new Jx.Tree({template: this.options.template});
        if (this.options.open) {
            this.expand();
        } else {
            this.collapse();
        }
        
        this.addEvent('postDestroy',function() {
            this.tree.destroy();
        }.bind(this));
    },

    /**
     * Method: clone
     * Create a clone of the TreeFolder
     * 
     * Returns: 
     * {<Jx.TreeFolder>} a copy of the TreeFolder
     */
    clone : function() {
        var node = new Jx.TreeFolder(this.options);
        this.nodes.each(function(n){node.append(n.clone());});
        return node;
    },
    /**
     * Method: isLastNode
     * Indicates if a node is the last thing in the folder.
     *
     * Parameters:
     * node - {Jx.TreeItem} the node to check
     *
     * Returns:
     *
     * {Boolean}
     */
    isLastNode : function(node) {
        return this.tree.isLastNode(node);
    },
    /**
     * Method: update
     * Update the CSS of the TreeFolder's DOM element in case it has changed
     * position.
     *
     * Parameters:
     * shouldDescend - {Boolean} propagate changes to child nodes?
     */
    update : function(shouldDescend) {
        /* avoid update if not attached to tree yet */
        if (!this.parent) return;
        var isLast = false;
        if (arguments.length > 1) {
            isLast = arguments[1];
        } else {
            isLast = (this.owner && this.owner.isLastNode(this));
        }
        
        ['jxTreeBranchOpen','jxTreeBranchLastOpen','jxTreeBranchClosed','jxTreeBranchLastClosed'].each(function(c){this.removeClass(c);}.bind(this.domObj));
        var c = 'jxTreeBranch';
        c += isLast ? 'Last' : '';
        c += this.options.open ? 'Open' : 'Closed';
        
        this.domObj.addClass(c);
        
        if (isLast) {
            this.subDomObj.removeClass('jxTreeNest');
        } else {
            this.subDomObj.addClass('jxTreeNest');
        }
        
        if (this.nodes && shouldDescend) {
            var that = this;
            this.nodes.each(function(n,i){
                n.update(false, i==that.nodes.length-1);
            });
        }
    },
    /**
     * Method: append
     * append a node at the end of the sub-tree
     *
     * Parameters:
     * node - {Object} the node to append.
     */
    append : function( node ) {
        node.owner = this;
        this.nodes.push(node);
        this.subDomObj.appendChild( node.domObj );
        this.update(true);
        return this;
    },
    /**
     * Method: insert
     * insert a node after refNode.  If refNode is null, insert at beginning
     *
     * Parameters:
     * node - {Object} the node to insert
     * refNode - {Object} the node to insert before
     */
    insert : function( node, refNode ) {
        node.owner = this;
        //if refNode is not supplied, insert at the beginning.
        if (!refNode) {
            this.nodes.unshift(node);
            //sanity check to make sure there is actually something there
            if (this.subDomObj.childNodes.length ==0) {
                this.subDomObj.appendChild(node.domObj);
            } else {
                this.subDomObj.insertBefore(node.domObj, this.subDomObj.childNodes[0]);                
            }
        } else {
            //walk all nodes looking for the ref node.  Track if it actually
            //happens so we can append if it fails.
            var b = false;
            for(var i=0;i<this.nodes.length;i++) {
                if (this.nodes[i] == refNode) {
                    //increment to append after ref node.  If this pushes us
                    //past the end, it'll get appended below anyway
                    i = i + 1;
                    if (i < this.nodes.length) {
                        this.nodes.splice(i, 0, node);
                        this.subDomObj.insertBefore(node.domObj, this.subDomObj.childNodes[i]);
                        b = true;
                        break;
                    }
                }
            }
            //if the node wasn't inserted, it is because refNode didn't exist
            //and so the fallback is to just append the node.
            if (!b) {
                this.nodes.push(node); 
                this.subDomObj.appendChild(node.domObj); 
            }
        }
        this.update(true);
        return this;
    },
    /**
     * Method: remove
     * remove the specified node from the tree
     *
     * Parameters:
     * node - {Object} the node to remove
     */
    remove : function(node) {
        node.owner = null;
        for(var i=0;i<this.nodes.length;i++) {
            if (this.nodes[i] == node) {
                this.nodes.splice(i, 1);
                this.subDomObj.removeChild(this.subDomObj.childNodes[i]);
                break;
            }
        }
        this.update(true);
        return this;
    },
    /**
     * Method: replace
     * Replace a node with another node
     *
     * Parameters:
     * newNode - {Object} the node to put into the tree
     * refNode - {Object} the node to replace
     *
     * Returns:
     * {Boolean} true if the replacement was successful.
     */
    replace: function( newNode, refNode ) {
        //walk all nodes looking for the ref node. 
        var b = false;
        for(var i=0;i<this.nodes.length;i++) {
            if (this.nodes[i] == refNode) {
                if (i < this.nodes.length) {
                    newNode.owner = this;
                    this.nodes.splice(i, 1, newNode);
                    this.subDomObj.replaceChild(newNode.domObj, refNode.domObj);
                    return true;
                }
            }
        }
        return false;
    },
    
    /**
     * Method: clicked
     * handle the user clicking on this folder by expanding or
     * collapsing it.
     *
     * Parameters: 
     * e - {Event} the event object
     */
    clicked : function(e) {
        if (this.options.open) {
            this.collapse();
        } else {
            this.expand();
        }
    },
    /**
     * Method: expand
     * Expands the folder
     */
    expand : function() {
        this.options.open = true;
        this.subDomObj.setStyle('display', 'block');
        this.update(true);
        this.fireEvent('disclosed', this);    
    },
    /**
     * Method: collapse
     * Collapses the folder
     */
    collapse : function() {
        this.options.open = false;
        this.subDomObj.setStyle('display', 'none');
        this.update(true);
        this.fireEvent('disclosed', this);
    },
    /**
     * Method: findChild
     * Get a reference to a child node by recursively searching the tree
     * 
     * Parameters:
     * path - {Array} an array of labels of nodes to search for
     *
     * Returns:
     * {Object} the node or null if the path was not found
     */
    findChild : function(path) {
        //path is empty - we are asking for this node
        if (path.length == 0) {
            return this;
        }
        var i;
        //path has only one thing in it - looking for something in this folder
        if (path.length == 1) {
            for (i=0; i<this.nodes.length; i++) {
                if (this.nodes[i].getName() == path[0]) {
                    return this.nodes[i];
                }
            }
            return null;
        }
        //path has more than one thing in it, find a folder and descend into it    
        var name = path.shift();
        for (i=0; i<this.nodes.length; i++)
        {
            if (this.nodes[i].getName() == name && this.nodes[i].findChild) {
                return this.nodes[i].findChild(path);
            }
        }
        return null;
    }
});