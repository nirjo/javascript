var DataClient = function (url) {
	
	/* the base url for the rest service */
	var baseUrl = url;
	var readUrl = url;
	var updateCallbacks= Array();
	
	/* method to retrieve Data */
	var getData = function(callback) {
		
		$.ajax({
		    url: readUrl ,
		    type: "GET",
		    success: function(result) {
				//console.log("Data retrieved: " + JSON.stringify(result.items));
		    	callback(result.items);
		    }
		});
	};
	var setReadUrl = function(URL) {
		readUrl=  URL;
		
	};
	
	var getReadUrl = function() {
		return readUrl;
		
	};
	
	
	
	var getDataByForeignKey = function(Url,callback) {
		
		$.ajax({
		    url: Url ,
		    type: "GET",
		    success: function(result) {
				//console.log("Data retrieved: " + JSON.stringify(result.items));
		    	callback(result.items);
		    }
		});
	};
	/* method to delete a Data */
	var deleteData = function(Data, callback) {
		//alert(baseUrl + Data.data.id());
		//console.log("Deleting Data with id [" + Data.data.id() + "]");
		$.ajax({
		    url: baseUrl + Data.data.id(),
		    type: "DELETE",
		    success: function(result) {
		    	callback(Data);
		    }
		});
	};
	
	/* method to delete by Id */
	var deleteById = function(id, callback) {
		//alert(baseUrl + id);
		//console.log("Deleting Data with id [" + id + "]");
		$.ajax({
		    url: baseUrl + id,
		    type: "DELETE",
		    success: function(result) {
		    	callback(Data);
		    }
		});
	};
	
	/* method to add a Data */
	var addData = function(Data, callback,parentCallBack) {
		var plainData = ko.toJS(Data.data);
		//console.log("Saving Data [" + JSON.stringify(plainData) + "]");
		$.ajax({
		    url: baseUrl,
		    type: "POST",
		    data:  JSON.stringify(plainData),
		    contentType: "application/json",
		    success: function(response) {
				
		    	callback(Data, response.id,parentCallBack);
		    }
		});
	};
	
	/* method to update a Data */
	var updateData = function(Data, callback,parentCallBack) {
	
		var plainData = ko.toJS(Data.data);
		
		//console.log("Updating Data [" + JSON.stringify(plainData) + "]");
		$.ajax({
		    url: baseUrl ,
		    type: "PUT",
		    data:  JSON.stringify(plainData),
		    contentType: "application/json",
		    success: function(result) {
				/*for(var i=0;i<updateCallbacks.length; i++)	
					updateCallbacks[i](Data);*/
		    	callback(Data,parentCallBack);
		    }
		});
	};
	
	return {
		/* add members that will be exposed publicly */
		getData: getData,
		getDataByForeignKey: getDataByForeignKey,
		deleteData: deleteData,
		deleteById: deleteById,
		addData: addData,
		updateCallbacks: updateCallbacks,
		updateData: updateData,
		setReadUrl: setReadUrl,
		getReadUrl: getReadUrl,
		baseUrl: baseUrl
	};	
};