var DataTabs = function (url, model_constructor,id) {
	
	var self = this;
	var selected_tab = ko.observable(false);

	var data_client = DataClient(url);
	var DataModel = model_constructor;
	var tabsObject = new Object({id:id,tabsData:ko.observableArray()});
	//tabsObject.id= "id"
	//tabsObject.tabsData = ko.observableArray();
	
	
	var displayMode = {
		view: "VIEW",
		edit: "EDIT"
	};
	var selected_tab_change_callback= function () {	
		
	};	
	
	var init = function () {	
		
		selected_tab.subscribe(selected_tab_change_callback);		
	};
	
	var set_foreign_key = function (fk) {
			foreign_key= fk;
		};
	var retrieveDatas = function () {
		
		//console.log("Retrieving tabsData from server ...");
		data_client.getData(retrieveDatasCallback)
		
	};
	
	
	var removeAll = function () {
		tabsObject.tabsData.removeAll();
	}
	
	var retrieveDatasCallback = function (data) {	
	//	alert(JSON.stringify(data))	;
    
    
		if( typeof data  == 'undefined' )
				console.log("retrive 0 records");
		else{
			data.forEach(function(item) {
				tabsObject.tabsData.push(new DataModel(item,displayMode.view));
			});
			if(data.length>0) {
				selected_tab(data[0].id);
				//alert(data[0].id);
			}
            //alert(data[0].length);

		var tabcnt;
		var tabcntt;
		
        var margintop;
        var margintopp;
		    // Opera 8.0+
		var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		    // Firefox 1.0+
		var isFirefox = typeof InstallTrigger !== 'undefined';
		    // At least Safari 3+: "[object HTMLElementConstructor]"
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		    // Internet Explorer 6-11
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		    // Edge 20+
		var isEdge = !isIE && !!window.StyleMedia;
		    // Chrome 1+
		var isChrome = !!window.chrome && !!window.chrome.webstore;
		    // Blink engine detection
		var isBlink = (isChrome || isOpera) && !!window.CSS;	
        
        $('div#lefttabs').each(
          function() {
            tabcnt=($('.lefttab', $(this)).length);            
          }
        );

        $('div#goalTabs').each(
          function() {
            tabcntt=($('.goalTab', $(this)).length);            
          }
        );

		if(tabcntt>1)
			if(isChrome)
				margintopp=(-((37 * tabcntt)+6)) + 'px'
			else{
				margintopp=(-((37 * tabcntt)+6)) + 'px';
                //alert(tabcnt);
                }
		else
			margintopp= (-39) + 'px'

		if(tabcnt>1)
			if(isChrome)
				margintop=(-((37 * tabcnt)+6)) + 'px'
			else{
				margintop=(-((37 * tabcnt)+6)) + 'px';
                //alert(tabcnt);
                }
		else
			margintop= (-39) + 'px'
		
		$(document).ready(function () {
		        $(this).find('#lefttabContent').css({				
				'margin-top': margintop
			});
		        $(this).find('#goalTabsContent').css({				
				'margin-top': margintopp
			});            
		});



		}	
        
        
		
		
		
	};
	var addData= function (Data) {	
		data_client.addData(Data,addDataCallback)
				
	};
	
	var addDataCallback = function (Data,id) {	
		
		//alert("inside addDataCallback : "+JSON.stringify({id:id,centerID:Data.data.centerID}));
		//Data.data["id"]	=curriculumId;
			//self.tabsData.push(new DataModel(Data.data));
			Data.data.id=ko.observable(id);
			var plainData = ko.toJS(Data.data);
			//alert(JSON.stringify(plainData));
			tabsObject.tabsData.push(new DataModel(plainData,displayMode.view));
		var tabcnt;
		var tabcntt;
		
        var margintop;
        var margintopp;
		    // Opera 8.0+
		var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		    // Firefox 1.0+
		var isFirefox = typeof InstallTrigger !== 'undefined';
		    // At least Safari 3+: "[object HTMLElementConstructor]"
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		    // Internet Explorer 6-11
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		    // Edge 20+
		var isEdge = !isIE && !!window.StyleMedia;
		    // Chrome 1+
		var isChrome = !!window.chrome && !!window.chrome.webstore;
		    // Blink engine detection
		var isBlink = (isChrome || isOpera) && !!window.CSS;	
        
        $('div#lefttabs').each(
          function() {
            tabcnt=($('.lefttab', $(this)).length);            
          }
        );

        $('div#goalTabs').each(
          function() {
            tabcntt=($('.goalTab', $(this)).length);            
          }
        );

		if(tabcntt>1)
			if(isChrome)
				margintopp=(-((37 * tabcntt)+6)) + 'px'
			else{
				margintopp=(-((37 * tabcntt)+6)) + 'px';
                //alert(tabcnt);
                }
		else
			margintopp= (-39) + 'px'

		if(tabcnt>1)
			if(isChrome)
				margintop=(-((37 * tabcnt)+6)) + 'px'
			else{
				margintop=(-((37 * tabcnt)+6)) + 'px';
                //alert(tabcnt);
                }
		else
			margintop= (-39) + 'px'
		
		$(document).ready(function () {
		        $(this).find('#lefttabContent').css({				
				'margin-top': margintop
			});
		        $(this).find('#goalTabsContent').css({				
				'margin-top': margintopp
			});            
		});


		
	};
	var deleteData= function (Data) {	
			//alert('deleteData: '+Data.id());
			//var tempData = 
			//Data.data={id:null};
			//Data.data.id =ko.observable(Data.id());
			data_client.deleteData(Data, deleteDataCallback);
		//data_client.addData(Data,addDataCallback)
		//alert(objToString(Data));
		//
				
	};
	
	var updateData= function (Data) {	
		data_client.updateData(Data,updateDataCalback)
				
	};
	var updateDataCalback= function (Data) {	
		//alert('updateData');
		//parentCallBack(Data);
		//data_client.updateData(Data,addDataCallback)
				
	};
	
	var deleteDataCallback = function (Data) {	
		
		//alert("inside addDataCallback : "+JSON.stringify({id:curriculumId,centerID:Data.data.centerID}));
		//Data.data["id"]	=curriculumId;
			//self.tabsData.push(new DataModel(Data.data));
		tabsObject.tabsData.remove(Data);
		//alert(tabsObject.tabsData()[0].data.id())
		if(tabsObject.tabsData().length>0)
			selected_tab(	tabsObject.tabsData()[0].data.id());
	//	console.log("Data with id [" + Data.data.id()+ "] deleted");
		
		
	};
	

	var length = function () {
		//return 5;
		return tabsObject.tabsData().length;
	};
	
	var at = function ( index) {
		//return 5;
		//alert(index);
		//alert(tblData()[index]);
		return tabsObject.tabsData()[index];
	};
	
	
	function getTabs(){
			return tabsObject.tabsData;
		
		
	}
	
	var getData= function () {	
		selected_tab.subscribe(selected_tab_change_callback);		
	};
	var push= function (data) {	
		//tabsObject.tabsData.push(new DataModel({id:data.id,centerID:data.centerID,name:data.name},displayMode.view))
		tabsObject.tabsData.push(new DataModel(data,displayMode.view))
		//selected_tab.subscribe(selected_tab_change_callback);		
	};
	
	var removeById= function (id) {	
	//	tabsObject.tabsData.push(new DataModel({id:data.id,centerID:data.centerID}))
		//selected_tab.subscribe(selected_tab_change_callback);	
		tabsObject.tabsData.remove( function (item) { return item.data.id == id; } )		;
	};
	//( function (item) { return item.age < 18; } ) 
	 
	
	/* execute the init function when the DOM is ready */
	$(init);	
	
	return {
		selected_tab:selected_tab,
		data_client:data_client,
		DataModel:DataModel,
	//	tabsData:tabsData,
		selected_tab_change_callback:selected_tab_change_callback,
		init:init,
		retrieveDatas:retrieveDatas,
		retrieveDatasCallback:retrieveDatasCallback,
		addData:addData,
		addDataCallback:addDataCallback,
		deleteData:deleteData,
		deleteDataCallback:deleteDataCallback,
		updateData:updateData,
		updateDataCalback:updateDataCalback,
		removeAll:removeAll,
		getTabs:getTabs,
		removeById:removeById,
		push:push,
		displayMode:displayMode,
		length:length,
		at:at,
		
	
		

		
		getData:getData
	
		
	};	
}

