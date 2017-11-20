//$( ".selector" ).dialog( "close" );
var DataModal = function () {
	var self = this;
	this.showDialog = ko.observable(false);
	var children= ko.observableArray();;

	var doSomething = function () {
    		
    }
	
	var addChildren = function (child) {
    		
    }
		
	this.showDialog.subscribe(doSomething);	
	
    var submit = function () {
	
		self.showDialog(false);
	  
    }	
	var init = function () {
		
	};
	
	$(init);	
	
	return {
		showDialog:showDialog,
		doSomething:doSomething,
		init:init,
		submit:submit
	};	
}
