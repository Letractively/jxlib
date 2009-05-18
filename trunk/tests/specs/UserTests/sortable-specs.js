var comparator = new Jx.Compare();

var dataCopy = [
	new Hash({col0:2,col1:'ghj',col3:'10/22/08'}),
	new Hash({col0:5,col1:'asdga',col3:'10/05/08'}),
	new Hash({col0:3,col1:'hgers',col3:'10/07/08'}),
	new Hash({col0:6,col1:'dgreh',col3:'10/25/08'}),
	new Hash({col0:7,col1:'hjtjhf',col3:'10/22/08'}),
	new Hash({col0:2,col1:'bhtb',col3:'10/13/08'}),
	new Hash({col0:8,col1:'u8hhtej',col3:'10/06/08'}),
	new Hash({col0:9,col1:'jkjtrhg',col3:'10/08/08'}),
	new Hash({col0:0,col1:'jhehyj',col3:'10/16/08'}),
	new Hash({col0:1,col1:'yrhxbxh',col3:'10/09/08'}),
	new Hash({col0:23,col1:'qshny',col3:'10/30/08'})
];

var sorter = new Class({
	Extends: Jx.Store,
	Implements: Jx.Store.Sortable
});

describe('sorting store',{
	before: function(){
		data = dataCopy.slice();		
		object = new sorter({
			colTypes: {col0:'numeric',col1:'alphanumeric',col3:'date'},
			cols: ['col0','col1','col3']
		});
		object.load(data);
	},
	'make sure sortable is implemented': function(){
		value_of($type(object.sort)).should_be('function');
	},
	'numeric heap sort': function(){
		object.sort('col0','heap');
		value_of(object.get('col0')).should_be(0);
	},
	'alphanumeric heap sort': function(){
		object.sort('col1','heap');
		value_of(object.get('col1')).should_be('asdga');
	},
	'date heap sort': function(){
		object.sort('col3','heap');
		value_of(object.get('col3')).should_be('10/05/08');
	},
	'numeric merge sort': function(){
		object.sort('col0','merge');
		value_of(object.get('col0')).should_be(0);
	},
	'alphanumeric merge sort': function(){
		object.sort('col1','merge');
		value_of(object.get('col1')).should_be('asdga');
	},
	'date merge sort': function(){
		object.sort('col3','merge');
		value_of(object.get('col3')).should_be('10/05/08');
	},
	'numeric quick sort': function(){
		object.sort('col0','quick');
		value_of(object.get('col0')).should_be(0);
	},
	'alphanumeric quick sort': function(){
		object.sort('col1','quick');
		value_of(object.get('col1')).should_be('asdga');
	},
	'date quick sort': function(){
		object.sort('col3','quick');
		value_of(object.get('col3')).should_be('10/05/08');
	}
});

var groupData = [
	new Hash({col0:2,col1:'ghj',col3:'10/22/08'}),
	new Hash({col0:5,col1:'asdga',col3:'10/05/08'}),
	new Hash({col0:3,col1:'hgers',col3:'10/07/08'}),
	new Hash({col0:6,col1:'dgreh',col3:'10/25/08'}),
	new Hash({col0:7,col1:'hjtjhf',col3:'10/22/08'}),
	new Hash({col0:2,col1:'bhtb',col3:'10/13/08'}),
	new Hash({col0:8,col1:'u8hhtej',col3:'10/06/08'}),
	new Hash({col0:9,col1:'jkjtrhg',col3:'10/08/08'}),
	new Hash({col0:0,col1:'jhehyj',col3:'10/16/08'}),
	new Hash({col0:1,col1:'yrhxbxh',col3:'10/09/08'}),
	new Hash({col0:8,col1:'qshny',col3:'9/30/08'}),
	new Hash({col0:23,col1:'dgreh',col3:'10/25/08'}),
	new Hash({col0:23,col1:'qshny',col3:'10/08/08'}),
	new Hash({col0:23,col1:'u8hhtej',col3:'10/30/08'}),
	new Hash({col0:23,col1:'u8hhtej',col3:'11/12/08'}),
	new Hash({col0:23,col1:'qshny',col3:'10/30/08'}),
	new Hash({col0:8,col1:'qshny',col3:'08/30/08'}),
	new Hash({col0:23,col1:'u8hhtej',col3:'07/30/08'}),
	new Hash({col0:23,col1:'qshny',col3:'10/30/08'}),
	new Hash({col0:23,col1:'dgreh',col3:'10/31/08'}),
	new Hash({col0:23,col1:'qshny',col3:'10/29/08'})
];


var grouper = new Class({
	Extends: Jx.Store,
	Implements: Jx.Store.Groupable
});

describe('gouping store',{
	before: function(){
		data = groupData.slice();		
		object = new grouper({
			colTypes: {col0:'numeric',col1:'alphanumeric',col3:'date'},
			cols: ['col0','col1','col3'],
			sortCols: ['col0','col1','col3']
		});
		object.load(data);
	},
	'make sure sortable is implemented': function(){
		value_of($type(object.sort)).should_be('function');
	},
	'make sure groupable is implemented': function(){
		value_of($type(object.groupSort)).should_be('function');
	},
	'numeric heap grouping': function(){
		object.groupSort('heap');
		value_of(object.get('col0')).should_be(0);
		object.last();
		value_of(object.get('col3')).should_be('11/12/08');
	},
	'numeric merge grouping': function(){
		object.groupSort('merge');
		value_of(object.get('col0')).should_be(0);
		object.last();
		value_of(object.get('col3')).should_be('11/12/08');
	},
	'numeric quick grouping': function(){
		object.groupSort('quick');
		value_of(object.get('col0')).should_be(0);
		object.last();
		value_of(object.get('col3')).should_be('11/12/08');
	}
});