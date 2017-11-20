var DataGrid = function (baseUrl,model_constructor) {

	/* add members here */
	var self = this;
	var url = baseUrl;
	if (typeof baseUrl  == 'undefined')
		url = configURL.CenterURL								
	var data_client = DataClient(url);
	//var DataModal = DataModal();
//	var strandTabs = StrandTabs();
	
	/* display modes for the grid */
	var displayMode = {
		view: "VIEW",
		edit: "EDIT"
	};
	var DataModel=model_constructor;
	/* model for tblData */
	
	
	/* Data observable array */
	var tblData = ko.observableArray();
	
	/* method to retrieve tblData using the data_client */
	var retrieveDatas = function () {
		////console.log("Retrieving tblData from server ...");
		data_client.getData(retrieveDatasCallback);
	};
	
	/* callback for when the tblData are retrieved from the server */
	var retrieveDatasCallback = function (data) {
	/*		//alert(JSON.stringify(data));*/
	
		if( typeof data  == 'undefined' )
				console.log("retrive 0 records");
		else
			data.forEach(function(item) {
				tblData.push(new DataModel(item, displayMode.view));
				
			});
		
		
		//alert("data.length: "+data.length);
		
	};
	
	/* method to cancel request to the data_client */
	var cancelData = function (Data) {
		//alert("i am outside");
		//console.log( Data.data.id());
		if (typeof Data.data.id()  == 'undefined'){
			//data_client.deleteData(Data, deleteDataCallback);
			//alert("i am here");
			tblData.remove(Data);
			}
		else if (Data.data.id()  == null){
			//data_client.deleteData(Data, deleteDataCallback);
			//alert("i am here");
			tblData.remove(Data);
			}
		Data.displayMode(displayMode.view);
			//Data.data.displayMode(displayMode.view);
	};
	/* method to send delete request to the data_client */
	var deleteData = function (Data) {
		
		if (typeof Data.data.id()  != 'undefined')
			data_client.deleteData(Data, deleteDataCallback);
		else
			tblData.remove(Data);
	};
	
	/* callback on successful delete request */
	var deleteDataCallback = function (Data) {
		
		tblData.remove(Data);
		//console.log("Data with id [" + Data.data.id()+ "] deleted");
	};
	
	/* method to add a blank Data to the tblData array */
	var addData = function () {
		var item = { sku: null, name: null, description: null, price: null};
		tblData.push(new DataModel(item, displayMode.edit));
	};
	var addDataParam = function (item) {
		
		tblData.push(new DataModel(item, displayMode.edit));
	};
	/* method to send add request to the data_client */
	var saveData = function (Data) {
		data_client.addData(Data, saveDataCallback);
	};
	
	/* callback on successful add request */
	var saveDataCallback = function (Data, id) {
		
		Data.data.id(id);
		Data.displayMode(displayMode.view);
		//console.log("Data saved with id [" + Data.data.id() + "]");
	};
	
	/* method to edit a Data */
	var editData = function (Data) {
		
		Data.displayMode(displayMode.edit);
	};
	
	/* method to send update request to the data_client */
	var updateData = function (Data) {
		data_client.updateData(Data, updateDataCallback);
	};
	
	/* callback on successful update request */
	
	var updateDataCallback = function (Data) {
		//console.log("Data updated with id [" + Data.data.id() + "]");
		Data.displayMode(displayMode.view);
	};
	var removeAll = function (Data) {
		tblData.removeAll();
	};
	var length = function () {
		//return 5;
		return tblData().length;
	};
	
	var at = function ( index) {
		//return 5;
		//alert(index);
		//alert(tblData()[index]);
		return tblData()[index];
	};
	
	var init = function () {
		/* add code to initialise this module */
		//retrieveDatas();

		//apply ko bindings
		//ko.applyBindings(DataGrid);	
		//DataModal.DataId(5706163895140352);
		
	};
	/* method to open A central Modal */
	
	
	/* execute the init function when the DOM is ready */
	$(init);	
	
	return {
		/* add members that will be exposed publicly */
		tblData: tblData,
		deleteData: deleteData,
		addData: addData,
		saveData: saveData,
		editData: editData,
		updateData: updateData,
		cancelData: cancelData,
		retrieveDatas: retrieveDatas,
		retrieveDatasCallback: retrieveDatasCallback,
		data_client: data_client,
		removeAll: removeAll,
		length: length,
		addDataParam: addDataParam,
		at: at,
		//openDataModal: openDataModal,
		//DataModal: DataModal,
		//strandTabs: strandTabs,
		displayMode: displayMode
	};
}