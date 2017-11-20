var index_view = function () {
	var glbl_centerId = ko.observable(false);
	var glbl_curriculumId = ko.observable(false);
	var glbl_strandId = ko.observable(false);
	var glbl_goalId = ko.observable(false);
	
	var newCurriculumName=ko.observable("Curriculum...");
	var newStrandName=ko.observable("Strand...");
	var newGoalTitle=ko.observable("Goal...");
	
	var flgAddNewCurriculum=ko.observable(false);
	var flgEditCurriculum=ko.observable(false);
	var flgEditGoal=ko.observable(false);
	var flgEditStrand=ko.observable(false);
	var flgAddNewStrand=ko.observable(false);
	var flgAddNewGoal=ko.observable(false);
	
	var centers_grid = new DataGrid(configURL.CenterURL,function(item,itemMode) {
														this.data = {};
														this.data.id =ko.observable(item.id);
														this.data.name = ko.observable(item.name);
														this.displayMode = ko.observable(itemMode);
														
													});
													
												
	var center_modal = DataModal();
	
	var strand_modal = DataModal();
	
	var tabs_curriculum = new  DataTabs(
									configURL.Curriculum.CurriculumURL,
										
									function(item,itemMode) {
													this.data = {};
													this.data.id = ko.observable(item.id);
													this.data.curriculumId	 = ko.observable(item.curriculumId);
													this.data.centerID		 = ko.observable(item.centerID	);
													this.data.name = ko.observable(item.name);
													
												},
									"tabs_curriculum"
									);

									
	var tabs_strands = new DataTabs(
									configURL.Strand.SrandURL,
									
									function(item,itemMode) {
													this.data = {};
													this.data.id = ko.observable(item.id);
													this.data.curriculumId	 = ko.observable(item.curriculumId);
													this.data.name = ko.observable(item.name);
													this.data.displayOrder = ko.observable(item.displayOrder);
													this.displayMode = ko.observable(itemMode);
												},
									"tabs_strands"
									);
;			
;
			
;									
	var tabs_goals = new DataTabs(
									configURL.Goal.GoalURL,
									
									function(item,itemMode) {
													this.data = {};
													this.data.id = ko.observable(item.id);
													this.data.strandId	 = ko.observable(item.strandId);
													this.data.goalTitle = ko.observable(item.goalTitle);
													this.data.goalNumber = ko.observable(item.goalNumber);
													this.displayMode = ko.observable(itemMode);
												},
									"tabs_strands"
									);
	var strands_grid = new DataGrid(configURL.Strand.SrandURL,
									
									function(item,itemMode) {
													this.data = {};
													
													this.data.id = ko.observable(item.id);
													this.data.curriculumId	 = ko.observable(item.curriculumId);
													this.data.name = ko.observable(item.name);
													this.data.displayOrder = ko.observable(item.displayOrder);
													this.displayMode = ko.observable(itemMode);
												});
		
	
	var outcome_grid = new DataGrid(configURL.Outcome.OutcomeURL,
									
									function(item,itemMode) {
													this.data = {};
													
													this.data.id = ko.observable(item.id);
													this.data.goalId	 = ko.observable(item.goalId);
													this.data.outcomeText = ko.observable(item.outcomeText);
													//this.data.displayOrder = ko.observable(item.displayOrder);
													this.displayMode = ko.observable(itemMode);
												});

	
	var centerIdChangedCallBack = function () { 
			flgEditStrand(false);
			flgEditGoal(false);
		flgEditCurriculum(false);
		flgAddNewCurriculum(false)
	
	
	};
	
	var test_function = function () { 
		var my_tabs = tabs_strands.getTabs();
		var my_tabs2 = tabs_curriculum.getTabs();
		
		for(var index = 0; index<my_tabs.length;index++){
			
		//	console.log("#"+index+". ="+my_tabs[0].name);
			
		}
	
	};
	//tabs_curriculum.tabs_data.subscribe(test_function);	
	var testTabs = function () { 
										centers_grid.editData(Data); 
										
							}
		
	var openCenterModal = function (Data) { 
											
											glbl_centerId=Data.data.id();
											tabs_curriculum.removeAll();									
											tabs_curriculum.data_client.setReadUrl(	configURL.Curriculum.listCurriculumByCenterdId.replace("{centerID}",glbl_centerId));
															
											tabs_curriculum.retrieveDatas();
											test_function();
											center_modal.showDialog(true);
											 flgAddNewCurriculum(false);
											
											//return false;
											}
	var openCenterModalModified = function (center_id) { 
											
											glbl_centerId=center_id;
											tabs_curriculum.removeAll();									
											tabs_curriculum.data_client.setReadUrl(	configURL.Curriculum.listCurriculumByCenterdId.replace("{centerID}",glbl_centerId));
															
											tabs_curriculum.retrieveDatas();
											test_function();
											center_modal.showDialog(true);
											 flgAddNewCurriculum(false);
											
											//return false;
											}
	

	var editCenter = function (Data) { centers_grid.editData(Data); }
	var deleteCenter = function (Data) { centers_grid.deleteData(Data);}

	var updateCenter = function (Data) { centers_grid.updateData(Data); }
	var saveCenter = function (Data) {  centers_grid.saveData(Data);;}
	var cancelCenter = function (Data) {  centers_grid.cancelData(Data);}
	var addCenter = function () {  centers_grid.addData();}
	//var deleteCenter = function () { }

	var addCurriculum = function (Data) {
											
											flgAddNewCurriculum(true);
											
										}
	var saveNewCurriculum = function () {
											

											tabs_curriculum.addData({data:{"centerID": glbl_centerId,"id":null,"name":newCurriculumName}});
												flgAddNewCurriculum(false);
										}
											

	var editCurriculum = function (Data) {
												var plainData = ko.toJS(Data);
											//alert(JSON.stringify(plainData));
										flgEditCurriculum(true);
											
										}
									
	var cancelEditCurriculum = function (Data) {
											
											flgEditCurriculum(false);
											
										}
	var saveCurriculumName = function (Data) {
											//alert(JSON.stringify(Data));
											
											tabs_curriculum.updateData(Data);
											flgEditCurriculum(false);
										}									
									
	/*var saveNewCurriculumCallback = function (Data) {
											tabs_curriculum.push(Data.data)										
										}										
										*/
										
	var deleteCurriculum = function (Data) {
											
											//alert(objToString(Data));
											//alert(json.stringify(Data));
											tabs_curriculum.deleteData(Data);
										}
	var deleteCurriculumCallback = function (Data) {
											
											//alert(objToString(Data));
											//alert(json.stringify(Data));
											tabs_curriculum.deleteData(Data);
										}
										
										
										
	var saveCurriculumCallback = function (Data){
		
		}
	var centers_retrived_callback = function (Data) {
		
		};
	var populate_strand_tabs = function () {
		
				tabs_strands.removeAll();									
				tabs_strands.data_client.setReadUrl(
							configURL.Strand.listStrandsByCurriculumId.replace(
							"{curriculumId}",
							glbl_curriculumId));
				//console.log("inside populate_strand_tabs ")	;								
				//console.log("ReadUrl : "+tabs_strands.data_client.getReadUrl());

				tabs_strands.retrieveDatas();

				//center_modal.showDialog(true);
		};
		
	var populate_goal_tabs = function () {
		
				tabs_goals.removeAll();									
				tabs_goals.data_client.setReadUrl(
							configURL.Goal.listGoalsByStrandId.replace(
							"{strandId}",
							glbl_strandId));
				//console.log("inside populate_goal_tabs ")	;								
				///console.log("ReadUrl : "+tabs_goals.data_client.getReadUrl());

				tabs_goals.retrieveDatas();

				//center_modal.showDialog(true);
		};
		
	var strandChanged = function () {
		
		glbl_strandId = tabs_strands.selected_tab();
		//populate_strand_tabs();
		populate_goal_tabs();
	
		flgEditStrand(false);
		//flgEditCurriculum(false);
		//flgAddNewCurriculum(false)
	
	};
	
	var populate_outcome_grids = function () {
		
		outcome_grid.removeAll();									
		outcome_grid.data_client.setReadUrl(
		configURL.Outcome.listOutcomesByGoalId.replace(
		"{goalId}",
		glbl_goalId));
		//console.log("inside populate_goal_tabs ")	;								
		//console.log("ReadUrl : "+outcome_grid.data_client.getReadUrl());

		outcome_grid.retrieveDatas();
	
		flgAddNewGoal(false);
		//flgEditCurriculum(false);
		//flgAddNewCurriculum(false)
	
	}
	var goalsChanged = function () {
		
		glbl_goalId = tabs_goals.selected_tab();
		//populate_strand_tabs();
		populate_outcome_grids();
	
		flgEditGoal(false);
		flgAddNewGoal(false);
		//flgEditCurriculum(false);
		//flgAddNewCurriculum(false)
	
	}
	
	
	var curriculumChanged = function () {
		
		glbl_curriculumId = tabs_curriculum.selected_tab();
		populate_strand_tabs();
		
	
		flgEditGoal(false);
		flgEditStrand(false);
		flgEditCurriculum(false);
		flgAddNewCurriculum(false)
	
	};
	
	var editGoal = function (Data) {
											//var plainData = ko.toJS(Data);
											//alert(JSON.stringify(plainData));
											//flgEditStrand(true);
											flgEditGoal(true);
											//alert('299');
											
							}	
	var cancelEditGoal = function (Data) {
											
											flgEditGoal(false);
											
										}
	var saveGoalName = function (Data) {
										
											var plainData = ko.toJS(Data.data);
											//console.log(plainData);
											//alert(JSON.stringify(plainData));
											tabs_goals.updateData(Data);
											flgEditGoal(false);
											
											/*	var tabs_goals = new DataTabs(
									configURL.Goal.GoalURL,
									
									function(item,itemMode) {
													this.data = {};
													this.data.id = ko.observable(item.id);
													this.data.strandId	 = ko.observable(item.strandId);
													this.data.goalTitle = ko.observable(item.goalTitle);
													this.data.goalNumber = ko.observable(item.goalNumber);
													this.displayMode = ko.observable(itemMode);
												},
									"tabs_strands"
									);*/
										}	
										
										
	var editStrand = function (Data) {
											var plainData = ko.toJS(Data);
											//alert(JSON.stringify(plainData));
											flgEditStrand(true);
											
										}
	var cancelEditStrand = function (Data) {
											
											flgEditStrand(false);
											
										}
	var saveStrandName = function (Data) {
										
											var plainData = ko.toJS(Data.data);
											//alert(JSON.stringify(plainData));
											tabs_strands.updateData(Data);
											flgEditStrand(false);
										}									
									
										
	var deleteStrand = function (Data) {										
											
											tabs_strands.deleteData(Data);
										}
	
	
	

	
	var updateStrandCallBack = function (Data) { 
		//alert("205");
		//populate_strand_tabs();
	
	}
	
	
		
	var addNewStrand = function (Data) { 
		var plainData = ko.toJS(Data);
	//	alert(JSON.stringify(plainData));
		//alert("242");
		//populate_strand_tabs();
		flgAddNewStrand(true);
	
	}
	var saveNewStrand = function (Data) { 
		var newDisplayOrder =0;
		if( tabs_strands.length() >0){ 
			var item = tabs_strands.at(tabs_strands.length()-1);

			newDisplayOrder = item.data.displayOrder()+1;
		}
		tabs_strands.addData({data:{"curriculumId": glbl_curriculumId,"id":null,"name":newStrandName,"displayOrder":newDisplayOrder}});
										
											
		flgAddNewStrand(false);
	
	}

	var cancelAddNewStrand = function (Data) { 
		var plainData = ko.toJS(Data);
		//alert(JSON.stringify(plainData));
		//alert("242");
		//populate_strand_tabs();
		flgAddNewStrand(false);
	
	}
		
		var addNewGoal = function (Data) { 

		flgAddNewGoal(true);
	
	};
	var saveNewGoal = function (Data) { 
		var goalNumber =tabs_goals.length();
	/*	if( tabs_strands.length() >0){ 
			var item = tabs_strands.at(tabs_strands.length()-1);

			goalNumber = item.data.goalNumber()+1;
		}*/
		tabs_goals.addData({data:{"strandId": glbl_strandId,"id":null,"goalTitle":newGoalTitle,"goalNumber":goalNumber}});
										
											
		flgAddNewGoal(false);
	
	};

	var cancelAddNewGoal = function (Data) { 
	
		flgAddNewGoal(false);
	
	};

	
	var curriculumIdChangedCallBack= function () {
			//tabs_curriculum.removeById(null);
		
		flgEditGoal(false);
		flgEditStrand(false);
		flgEditCurriculum(false);
		flgAddNewCurriculum(false);
	};

	
	var cancelAddCurriculum= function () {
						flgAddNewCurriculum(false)
	};
	
	var cancelOutcome= function (Data) {
		outcome_grid.cancelData(Data);
						
	};
	var updateOutcome= function (Data) {
			outcome_grid.updateData(Data); 

						
	};
	var editOutcome= function (Data) {
			outcome_grid.editData(Data);
						
	};
	
	var deleteOutcome= function (Data) {
				var yes = confirm("You are about to delete this outcome!");
				if(yes)
					outcome_grid.deleteData(Data);

	
						
	};
	var saveOutcome= function (Data) {
		//alert("Inside saveoutcome");
		var plainData = ko.toJS(Data);
		//alert(JSON.stringify(plainData));
		outcome_grid.saveData(Data);
		
	}
	var addOutcome= function (Data) {
		var plainData = ko.toJS(Data);
		var goalId= Data.data.id();
		//alert('goalId:'+goalId);
		
		outcome_grid.addDataParam({"id":null,"goalId":goalId,"outcomeText":null,"displayMode":outcome_grid.displayMode.view});
						
						//{"data":{"id":"5660852527038464","strandId":"4953085403201536","goalTitle":"hi","goalNumber":0},"displayMode":"VIEW"}
	};	
	var addGoal= function (Data) {
		//alert(465);
		var plainData = ko.toJS(Data);
		var goalId= Data.data.id();
		//alert('goalId:'+goalId);
		
		/*outcome_grid.addDataParam({"id":null,"goalId":goalId,"outcomeText":null,"displayMode":outcome_grid.displayMode.view});
		
		
		addGoal
		tabs_goals = new DataTabs(
									configURL.Goal.GoalURL,
									
									function(item,itemMode) {
													this.data = {};
													this.data.id = ko.observable(item.id);
													this.data.strandId	 = ko.observable(item.strandId);
													this.data.goalTitle = ko.observable(item.goalTitle);
													this.data.goalNumber = ko.observable(item.goalNumber);
													this.displayMode = ko.observable(itemMode);
												},
									"tabs_strands"
									);*/
						
						//{"data":{"id":"5660852527038464","strandId":"4953085403201536","goalTitle":"hi","goalNumber":0},"displayMode":"VIEW"}
	};
	
	var init = function () {
			/* add code to initialise this module */
			//centers_grid.retrieveDatas();
			glbl_centerId.subscribe(centerIdChangedCallBack);
			glbl_curriculumId.subscribe(curriculumIdChangedCallBack);
			//apply ko bindings
			ko.applyBindings(index_view);	
			tabs_curriculum.selected_tab.subscribe(curriculumChanged);
			tabs_strands.selected_tab.subscribe(strandChanged);
			tabs_goals.selected_tab.subscribe(goalsChanged);
			
			
	};
	
	$(init);		
	return{
		openCenterModal:openCenterModal,
		openCenterModalModified:openCenterModalModified,
		editCenter:editCenter,
		deleteCenter:deleteCenter,            
		addCenter:addCenter,
		updateCenter:updateCenter,
		saveCenter:saveCenter,
		cancelCenter:cancelCenter,
		center_modal:center_modal,
		strand_modal:strand_modal,
		tabs_curriculum:tabs_curriculum,
		addCurriculum:addCurriculum,
		deleteCurriculum:deleteCurriculum,
		cancelAddCurriculum:cancelAddCurriculum,
		flgAddNewCurriculum :flgAddNewCurriculum ,
			
		saveNewCurriculum :saveNewCurriculum ,
		//saveNewCurriculumCallback :saveNewCurriculumCallback ,
		newCurriculumName :newCurriculumName ,
		editCurriculum :editCurriculum ,
		cancelEditCurriculum :cancelEditCurriculum ,
		flgEditCurriculum :flgEditCurriculum ,
		
		saveCurriculumName :saveCurriculumName ,
		
		
		tabs_strands:tabs_strands,
	
		test_function:test_function,
		
		flgEditGoal :flgEditGoal ,
		editGoal  :editGoal  ,
		saveGoalName  :saveGoalName  ,
		cancelEditGoal  :cancelEditGoal  ,
		flgEditStrand :flgEditStrand ,
		editStrand:editStrand,
		saveStrandName:saveStrandName,
		cancelEditStrand:cancelEditStrand,
		deleteStrand:deleteStrand,
		curriculumIdChangedCallBack:curriculumIdChangedCallBack,
		strandChanged:strandChanged,
		addNewStrand:addNewStrand,
		flgAddNewStrand:flgAddNewStrand,
		saveNewStrand:saveNewStrand,
		cancelAddNewStrand:cancelAddNewStrand,
		newStrandName:newStrandName,
		
		
		tabs_goals:tabs_goals,
		populate_goal_tabs:populate_goal_tabs,
		flgAddNewGoal:flgAddNewGoal,
		newGoalTitle:newGoalTitle,
		cancelAddNewGoal:cancelAddNewGoal,
		addNewGoal:addNewGoal,
		saveNewGoal:saveNewGoal,


		updateOutcome:updateOutcome,
		editOutcome:editOutcome,
		deleteOutcome:deleteOutcome,
		saveOutcome:saveOutcome,
		addOutcome:addOutcome,
		cancelOutcome:cancelOutcome,
		outcome_grid:outcome_grid,
		editGoal:editGoal,
		



		centers_grid:centers_grid
	};	
	
}();