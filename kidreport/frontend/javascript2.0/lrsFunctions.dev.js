//	For test purpose
//		get URL variable by namegetStory
var getUrlParameter = function getUrlParameter(sParam) {
             var sPageURL = decodeURIComponent(window.location.search.substring(1)),
               sURLVariables = sPageURL.split('&'),
               sParameterName,
               i;

             for (i = 0; i < sURLVariables.length; i++) {
               sParameterName = sURLVariables[i].split('=');

               if (sParameterName[0] === sParam) {
                 return sParameterName[1] === undefined ? true : sParameterName[1];
               }
             }
           };
	   function gettoday(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd
		} 
		if(mm<10){
		    mm='0'+mm
		}
			
		return mm+'/'+dd+'/'+yyyy;
		//document.getElementById("DATE").value = today;   
		
		}
//	Insert student with "kreportStudentId" in LRS.
function manageStudent(kreportcenterId,kreportStudentId,kreportStudentName,kreportStudentdob,manageStudentCallback){
			$("#modal_wait").remove();
			$("body").append("<div class='modal' id='modal_wait'></div>");
			var viewport = getViewport();
			var viewport_w = viewport[0];
			var viewport_h = viewport[1];

			$("#modal_wait").css({height:viewport_h+"px"})
			$("#modal_wait").css({width:viewport_w+"px"})
			$body = $("body");
			$body.addClass("loading");

			var url = configURL.Student.listStudentByKreportStudentId;
			url = url.replace("{kreportStudentId}",kreportStudentId);

			var ret_val = null;
			$.getJSON(url,  function(result)  {

									if(  (typeof result.items == 'undefined') ){// The Student does not exists

										var curriculumUrl = configURL.Curriculum.listCurriculumBykreportCenterId;
										curriculumUrl = curriculumUrl.replace("{kreportCenterId}",kreportcenterId);
										$.getJSON(curriculumUrl,  function(curriculum_result)  {



											if(  (typeof curriculum_result.items != 'undefined') && curriculum_result.items.length > 0 ){// The curriculum exists. Insert student information.


												var curriculumId= curriculum_result.items[0].id;
												var centerId= curriculum_result.items[0].centerID;
												var student_name= kreportStudentName;
												var dob= kreportStudentdob;
												dob = format_date(dob);
												var data = {
													"centerId":centerId,
													"curriculumId":curriculumId,
													"name":student_name,
													"dob":dob,
													"kreportStudentId":kreportStudentId

												};

												$.ajax({
													url:  configURL.Student.StudentURL,
													type: 'post',
													data: JSON.stringify(data),
													headers:{'Content-Type': 'application/json'},
													dataType: 'json',
													success: function (data) {

														$body = $("body");
														$body.removeClass("loading");
														manageStudentCallback(data);

													}
												});

											}else{// curriculum does not exist. Show an error.
												// alert("!!!Error curriculum do not exist!!!")
											}
											$body = $("body");
												$body.removeClass("loading");

										});




									}else if(  result.items.length > 0  ){// The student exists.
										console.log(result.items[0]);
										$body = $("body");
										$body.removeClass("loading");
										manageStudentCallback(result.items[0]);
									}
									$body = $("body");
									$body.removeClass("loading");

							});




		}

/**modal student starts**/


					$("#published_stories").change(function() {
						if($("#published_stories").val()!=""){


							$( "#preview" ).show();

							$( "#story_learning_outcome" ).empty();

							var url = configURL.Story.StoryURL+$("#published_stories").val();;
							var outcome_url =configURL.Outcome.listOutcomesByStoryId;
							outcome_url = outcome_url.replace( "{storyId}",$("#published_stories").val() );

							$.getJSON(url,  function(result)  {

										$( "#story_detail" ).html(result.details );

							});
							$.getJSON(outcome_url,  function(result)  {


										if(  !(typeof result.items == 'undefined') )
										for(var index = 0; index< result.items.length;index++){
											$( "#story_learning_outcome" ).append("<li>"+result.items[index].outcomeText+"</li>");
										}

							});
						}



					});








function open_assign_story_dialog(student_id,centerId){
				$("#canvas_div").hide();
				$("#leaf-label").html("");

				$( "#student_id" ).val( student_id);
				$( "#center_id" ).val( centerId);
				published_stories=$("#published_stories");
				$("#published_stories").empty();
				 $( "#student_dialog" ).dialog( "open" );
				 $("#ui-datepicker-div").css("z-index", "9999");
				var url = configURL.Story.listStoryByCenterId;
				url = url.replace('{centerID}',centerId);

				var data ={
						'centerID': $( "#center_id" ).val( )
				};
				$.getJSON(url, data, function(result)  {


						published_stories.append($("<option />").val("").text("Select story"))
						if(  !(typeof result.items == 'undefined') )
							for(var index = 0; index< result.items.length;index++){
										//alert(result.items[index].title);
										published_stories.append($("<option />").val(result.items[index].id).text(result.items[index].title));
								}


				});





			}

			function manageStudentCallback(data){
					//alert('insertStudentCallback');
					//alert('student id = '+data.id);
					open_assign_story_dialog(data.id,data.centerId);

			}
/**modal student ends**/
/**modal story starts**/
function openModal(sotry_id){
			//alert('openModal');
		}

var tag_handler = function (kreport_Student_Id, updateCallback) {
		var kreportStudentId = kreport_Student_Id;
		var updateTagsCallback = updateCallback;
		var collapsed = new Array();
		var strand_id = new Array();

			$( "#tag_modal" ).dialog(  {
					autoOpen: false,
					width:750,
					height:850,
					
					open: function (event){
					/*	$("#modal_wait").remove();
						$("body").append("<div class='modal' id='modal_wait'></div>");
						var viewport = getViewport();
						var viewport_w = viewport[0];
						var viewport_h = viewport[1];

					 	$("#modal_wait").css({height:viewport_h+"px"})
					 	$("#modal_wait").css({width:viewport_w+"px"})
					 	$body = $("body");
					 	$body.addClass("loading");*/


						
						var temp_index = 0;

						var url = configURL.Strand.listStrandByKreportStudentId;
						url= url.replace("{kreportStudentId}",kreportStudentId)
						collapsed = new Array();
						$.getJSON(url, function(result) {


								$( ".tab_header" ).remove();
								$( ".tab_content" ).remove();

									tabTemplate = "<li class='tab_header'><a href='#{href}'>#{label}</a></li>";
									function addTab(strand_id,strand_name ) {
										var tab_title="something"
										var tabContent="";

										li = $( tabTemplate.replace( /#\{href\}/g, "#" + strand_id ).replace( /#\{label\}/g, strand_name ) ),
										tabContentHtml = tabContent ;

										tabs.find( ".ui-tabs-nav" ).append( li );
										tabs.append( "<div id='" + strand_id + "' class='tab_content'><p>" + tabContentHtml + "</p></div>" );
										tabs.tabs( "refresh" );
										;

									}
								selected_curriculum = -1;
								strand_id = new Array();
								if(  !(typeof result.items == 'undefined') )
									for(var index = 0; index< result.items.length;index++){
										strand_id[index]= result.items[index].id;
										addTab(result.items[index].id,result.items[index].name);

									}
										// $body = $("body");
										// $body.removeClass("loading");


								if(index>0)
									$('#tabs').tabs( "option", "active", 0 );

							});
						var student_url  = configURL.Student.listStudentByKreportStudentId;
						student_url = student_url.replace("{kreportStudentId}", kreportStudentId);
						$.getJSON(student_url,  function(result) {
						if (!(typeof result.items == 'undefined') && result.items.length > 0 ) {

								$("#centerId").val(result.items[0].centerId);
								var selected_curriculum =result.items[0].curriculumId;
								var url = configURL.Strand.listStrandsByCurriculumId.replace("{curriculumId}",selected_curriculum)

								collapsed = new Array();

							
						}else{
									console.log('Error : Student with id:'+kreportStudentId+' does not exist in LRS. try adding this student first');
									// $body = $("body");
									// $body.removeClass("loading");

							}
						});
					//close getjson
				}
			});

			var tabs = $( "#tabs" ).tabs({

			 activate: function(event,ui) {
				/*$("#modal_wait").remove();
				$("body").append("<div class='modal' id='modal_wait'></div>");
				var viewport = getViewport();
				var viewport_w = viewport[0];
				var viewport_h = viewport[1];

				$("#modal_wait").css({height:viewport_h+"px"})
				$("#modal_wait").css({width:viewport_w+"px"})
				$body = $("body");
				$body.addClass("loading"); */
//						
				var selected_tab = ui.newTab.index();
				var selected_strand_id = strand_id[selected_tab];

				
				var url = configURL.Goal.listGoalsByStrandId.replace("{strandId}",selected_strand_id);
				
				$.getJSON(url, function(result) {
							var accordion_template = "<div id='accordion_id'	></div>";
							var accordion_header = "<h3 class='accordion_header'>header_text</h3>";
							var accordion_body = "<div class='accordion_body' >accordion_body</div>";

							var temp = accordion_template;
							var accordion_id = 'accordion-'+selected_strand_id;
							if($("#" + accordion_id).length == 0) {
								$( "#accordion_id" ).remove();


								temp = temp.replace('accordion_id',accordion_id);
								$("#"+selected_strand_id).append(temp);
								var accordion = $( "#"+accordion_id ).accordion({
									active: false,
									collapsible: true,
									activate: function(event,ui) {
										//alert(JSON.stringify(ui.newPanel.attr('id')));
										var selected_goal_id = ui.newPanel.attr('id');
										var url = configURL.Outcome.listOutcomesByGoalId.replace("{goalId}",selected_goal_id);
										var outcome_container_id = selected_goal_id+"-outcome";

										//alert(295);
										//alert(url);
										//alert(selected_goal_id +'-'+ collapsed[selected_goal_id]+'-'+typeof collapsed[selected_goal_id]);
										if(  typeof collapsed[selected_goal_id] == 'undefined' ){

											collapsed[selected_goal_id] = 1;
											$("#"+outcome_container_id).remove();
											$("#"+selected_goal_id).append("<ul id='"+outcome_container_id+"' ></ul>");
											//alert(url);
											var total_number_of_line = 0;

											$.getJSON(url, function(result) {

												if(  !(typeof result.items == 'undefined') )
													for(var index = 0; index< result.items.length;index++){
															var number_of_lines = Math.ceil(result.items[index].outcomeText.length/154);
															if(result.items[index].outcomeText.length%154 != 0 )
																number_of_lines++;
															total_number_of_line += number_of_lines;
															var existing_outcomeid=$('#existing_outcomeid').val();
															var target =result.items[index].id;
															var arr = [];
															var checked = "  ";
															 if(existing_outcomeid!='-1'){
																arr = existing_outcomeid.split(",");

																 for(var i = 0 ;i<arr.length;i++){
																	//str.trim()
																	if(target==arr[i].trim()){
																		checked = " checked='checked' ";
																	}
																	//console.log(arr[index]);

																}

															 }
														$("#"+outcome_container_id).append("<li class='outcome_listing'><label><input type='checkbox' value='"+result.items[index].id+"' class='outcome_check_box'  id = '"+result.items[index].id+"'   " +checked+"   />&nbsp;"+result.items[index].outcomeText+"</label></li>");


														//92


													}
													/*var temp_height = (total_number_of_line*12)+40;
													alert(total_number_of_line);
													$("#" + accordion_id).height( temp_height );
													alert(temp_height);
													alert($("#" + accordion_id).height(  ));

													//	$("#"+outcome_container_id).remove();
													*/
													$("#" + selected_goal_id).css("height", $("#" + outcome_container_id).height()+38);//.height($("#" + outcome_container_id).height(  ));
													//alert(selected_goal_id);

													//4824175986343936
													//accordion-4795020674596864

											});
										}else{
											//alert("do not call ajax");
										}
										var button_id='btnAddOutcome-'+selected_goal_id;
										var textarea_id = 'outcome_text-'+selected_goal_id;
										//alert(textarea_id);
										if($("#" + textarea_id).length == 0) {
											//alert(textarea_id);
											/*$("#"+selected_goal_id).append("<textarea id = '"+textarea_id+"'    style='width:100%;'></textarea><button class='btn btn-primary btn-xs' type='button' id ='"+button_id+"'>Add outcome</button>");*/
											$("#"+button_id).click(function() {
													//alert( "save outcome"+$("#"+outcome_container_id+" li").size() );
													var outcome_text = $("#"+textarea_id).val();
													var data = {

																"goalId":outcome_container_id.replace('-outcome',""),
																"outcomeText":outcome_text
																};
													//alert(JSON.stringify(data));

													/*$.post(configURL.Outcome.OutcomeURL, data, function(response) {
														alert("done");
													}, 'json'
													);*/
														$.ajax({
															url: configURL.Outcome.OutcomeURL,
															type: 'post',
															data: JSON.stringify(data),
															headers:{'Content-Type': 'application/json'},
															dataType: 'json',
															success: function (data) {
																//console.info(data);
																//alert('done');
																$("#"+outcome_container_id).append("<li class='outcome_listing'> <input type='checkbox' value='"+data.id+"' class='outcome_check_box' checked='checked'/>"+data.outcomeText+"</li>");
															}
														});


												});
											}


									}

								});




								/*function addAccordion(strand_id,goal_id,goal_text ) {


								accordion.append( "<h3 class='accordion_header'>"+goal_text+"</h3><div class='accordion_body'> "+goal_text+"</div>" );
								accordion.accordion( "refresh" )


									;

								}*/


							if(  !(typeof result.items == 'undefined') )
								for(var index = 0; index< result.items.length;index++){

									//addAccordion(selected_strand_id, result.items[index].id, result.items[index].goalTitle);
									accordion.append( "<h3 class='accordion_header' id='nothing"+result.items[index].id+"'  >"+result.items[index].goalTitle+"</h3><div class='accordion_body in' id='"+result.items[index].id +"'></div>" );
									accordion.accordion( "refresh" );
									//accordion.accordion({ active: false,                         collapsible: true });
									//accordion.accordion({collapsible: true, active: false });

								}
								if(result.items.length>0){
									//alert('#'+accordion_id)
									//alert("iamhere: "+index);
									//alert(result.items.length-1);

									//$('#'+accordion_id).accordion( { active: -1 } );
									//$('#'+accordion_id).accordion({collapsible:true, active:false});
									//$('#'+accordion_id).collapse("hide");
									//$('#'+accordion_id).accordion( { active: (result.items.length-1) } );
								}
								/*
								if(index>0){
									//alert('#'+accordion_id)
									alert("iamhere: "+index);
									$('#'+accordion_id).accordion( { active: index-1 } );
								}else if(index==0){
									//alert('#'+accordion_id)
									alert("iamhere2");
									$('#'+accordion_id).accordion( { active: index } );
								}*/
						}
						//end if here
					/*
						$body = $("body");
						$body.removeClass("loading");*/


					});


			  }
			});
			$(document).on('click', '.outcome_check_box', function (event) {
			//console.log($(this);
			//console.log($(this).prop('checked'));
			if($(this).prop('checked')==false){
				var id = $(this).attr('id');
				var existing_outcomeid=$('#existing_outcomeid').val();

				 if(existing_outcomeid!='-1'){
					var arr = existing_outcomeid.split(",");
					var element_index = arr.indexOf(id);
					if(element_index>-1)
						arr.splice(element_index,1);

					console.log('302:');
					console.log(arr);

					//arr.splice(id);
					if(arr.length>0)
						$('#existing_outcomeid').val(arr.join());
					else
						$('#existing_outcomeid').val(-1);
				}
			}
		});
		var open_tag_modal = function (story_id) {
			var tempUrl = configURL.Story.StoryURL;
			tempUrl += story_id;
			//console.log(tempUrl);
			var existing_outcomeid = -1;
				 $('#existing_outcomeid').val(existing_outcomeid);
			$.getJSON(tempUrl, function(result) {
			$('#existing_storyid').val(result.id);
				console.log(result.outcomeId);
				//console.log(result.title);
				var outcomeid= result.outcomeId;
				console.log('76');
				console.log(outcomeid);
				if(  !(typeof result.outcomeId == 'undefined') )
				 if(outcomeid.length>0){
					 if(outcomeid[0]!=null)
						 $('#existing_outcomeid').val(outcomeid[0]);

					 for(var index = 1 ;index<outcomeid.length;index++){
						 if(outcomeid[index]!=null)
							$('#existing_outcomeid').val( $('#existing_outcomeid').val()+','+outcomeid[index]);
						// console.log(outcomeid[index]);
					 }
				  }
			});
			$( "#tag_modal" ).dialog( "open" );


			return false;

			};
			var updateTags = function(story_id, outcome_id, updateTagsCallback){
				//alert(configURL.Story.StoryURL+story_id	);

				//kreportStudentId
			/*
			$("#modal_wait").remove();
			$("body").append("<div class='modal' id='modal_wait'></div>");
			var viewport = getViewport();
			var viewport_w = viewport[0];
			var viewport_h = viewport[1];

			$("#modal_wait").css({height:viewport_h+"px"})
			$("#modal_wait").css({width:viewport_w+"px"})
			$body = $("body");
			$body.addClass("loading");*/
				//alert('func start 8');

			var data = {
						"kreportStudentId":kreportStudentId,
						"storyId":story_id,
						"outcomeId":outcome_id
						};
			var str_outcome_id= ""
			if(outcome_id.length >0){
				str_outcome_id="outcomeId="+outcome_id[0];
				for(var i = 1;i<outcome_id.length;i++)
				str_outcome_id +="&outcomeId="+outcome_id[i];



			}
			var parameters = "kreportStudentId="+kreportStudentId+ "&storyId="+story_id+"&"+str_outcome_id
			var url = 	configURL.Story.updateTagsByStoryIdAndKreportStudentId;
			url += "?"+parameters;

			var time1,time2;
			time1 = performance.now();

			$.ajax({
						url:  url,
						type: 'post',
						data: JSON.stringify(data),
						headers:{'Content-Type': 'application/json'},
						dataType: 'json',
						success: function (result) {

							time2 = performance.now();
							$("#my_debug").append("<br><span style='color:blue;'>required time in Millseconds:"+(time2-time1)+"</span>");


						//	$body = $("body");
						//	$body.removeClass("loading");
							updateTagsCallback(1,result);

						}
					});


		}
			$( "#btnSave" ).click(function() {

				var outcomeId = new Array();
				var index = 0;

				$('.outcome_check_box:checked').each(function()
				{
					outcomeId[index] = $(this).val();
					index++;
				}); // outcomeId has the check boxes that has been checked in the opened according

				var story_id = $('#existing_storyid').val();
				var existing_outcomeid = $('#existing_outcomeid').val(); // existing_outcomeid has all check boxes of both opened and close accordion
				var intarray = [];
				// this folowing section performs double checking
				if(existing_outcomeid!='-1'){ // this story has previously saved outcoumeId
					var arr = existing_outcomeid.split(',');
					// arr has selected outcomeIds from both opened and closed accordion
					// outcomeId[] has selected outcomeIds from only both opened accordion
					for(var k = 0;k<outcomeId.length;k++){
						intarray[ k]=parseInt(outcomeId[ k])+''; // save outcomeId from closed accordion into intarray +''this is a hack. Do not rememeber why
						var element_index = arr.indexOf((outcomeId[ k]));
						if(element_index>-1)
							arr.splice(element_index,1);
					}
					// arr now has selected outcomeId only from closed accordion
					// intarray now has selected outcomeId only from opened accordion

					for(var k = 0;k<arr.length;k++){ // Add the selected outcomeId from closed accordion at the end of intarray
						intarray[ intarray.length+k]=parseInt(arr[ k])+'';
					}
					outcomeId= intarray; // outcomeId[] was available outside of this scope. Lets leave it like original version

					//
				}
				// one more final checking for nonnumeric values
				var temp_array=[];
				var j = 0
				for(var i = 0 ;i<outcomeId.length;i++){
					if( $.isNumeric( outcomeId[i]) == true){
						temp_array[j]= outcomeId[i];
						j++;
					}

				}
				updateTags (story_id, temp_array, updateTagsCallback)
				$( "#tag_modal" ).dialog( "close" );

			});

return {
		/* add members that will be exposed publicly */
		open_tag_modal: open_tag_modal,
		updateTags: updateTags
};

}
function format_date(myDate){
	var temp = myDate.split("/");
	return temp[2]+"-"+temp[0]+"-"+temp[1]+"T00:00:00.000Z";
	//2015-09-30T00:00:00.000Z
	// date must be mm/dd/yyyy format

}
function getStory(story_id,getStoryCallback){
				//alert(configURL.Story.StoryURL);
				//	var data = {"id":story_id}
				$.ajax({
					url: configURL.Story.StoryURL+story_id,
					type: 'GET',
					data: null,
					headers:{'Content-Type': 'application/json'},
					dataType: 'json',
					success: function (result) {
						//console.info(result);
						getStoryCallback(1,result);


					},
					error: function (result) {
						console.log("!!!Error in function deleteStory. ");
						console.log(result);
						getStoryCallback(0,result);


					}
				})


}
function deleteStory(story_id,deleteStoryCallback){
				//alert(configURL.Story.StoryURL);
				//	var data = {"id":story_id}
				$.ajax({
					url: configURL.Story.StoryURL+story_id,
					type: 'DELETE',
					data: null,
					headers:{'Content-Type': 'application/json'},
					dataType: 'json',
					success: function (result) {
						//console.info(result);
						deleteStoryCallback(1);


					},
					error: function (result) {
						console.log("!!!Error in function deleteStory. ");
						console.log(result);
						deleteStoryCallback(0);


					}
				})


}

function saveStory( details, title, status,start_date, end_date, kreportStudentId, kreportcenterId,kreportTeacherId,teacherName,saveStoryCallback){
		var url = configURL.Student.listStudentByKreportStudentId;
			url = url.replace("{kreportStudentId}",kreportStudentId);
			//alert('test me : '+url);
			var ret_val = null;

			start_date = format_date(start_date);
			end_date = format_date(end_date);
      var center_id =-1;
      var student_id =-1;
	var created = format_date(gettoday());
      var story = {
              "details": details,
              "title": title,
              "status": status,
              /*"centerId": center_id,*/
              "kreportTeacherId": kreportTeacherId,
              "teacherName": teacherName,
	      "created": created,
              "startDate":start_date,
              "endDate":end_date,
              "kreportStudentId":kreportStudentId/*,
              "studentId":student_id*/

              }
              $.ajax({
                          url: configURL.Story.StoryURL,
                          type: 'post',
                          data: JSON.stringify(story),
                          headers:{'Content-Type': 'application/json'},
                          dataType: 'json',
                          success: function (story_data) {
                            console.info(data);
                            var story_id = story_data.id;

                            var student_story = {
                              "studentId":student_id,
                              "storyId":story_id,
                              "storyDate":start_date,
                              "startDate":start_date,
                              "endDate":end_date

                            }

                            //alert('Story Saved');
                            $.ajax({
                              url: configURL.StudentStory.StudentStoryURL,
                              type: 'post',
                              data: JSON.stringify(student_story),
                              headers:{'Content-Type': 'application/json'},
                              dataType: 'json',
                              success: function (data) {
                                console.info(data);
                                //alert('Story Saved');

                             //   $body = $("body");
                              //  $body.removeClass("loading");

                              },
                              error: function (data) {
                                console.log("!!!Error in function saveStory. Error in second ajax call");
                                saveStoryCallback(0,story_data);
                                ;
                              }
                            });
                              saveStoryCallback(1,story_data);
                          },
				error: function (story_data) {
					console.log("!!!Error in function saveStory. Error in first ajax call");
					saveStoryCallback(0,story_data);


				}
			  
			     }  );
    


		var data = {
			"kreportCenterId":kreportcenterId,
			"kreportTeacherId":kreportTeacherId,
			"name":teacherName
		};
		var postURL=  configURL.Teacher.createTeacher;
		postURL = postURL.replace('{kreportCenterId}',kreportcenterId);
		postURL = postURL.replace('{kreportTeacherId}',kreportTeacherId);
		postURL = postURL.replace('{teacherName}',teacherName);
		$.ajax({
			url:  postURL,
			type: 'post',
			data: JSON.stringify(data),
			headers:{'Content-Type': 'application/json'},
			dataType: 'json',
			success: function (data) {
				//alert ( JSON.stringify(data)) ;

			}
		});



		return;
	

			//
	}
	function retriveStories(kreportStudentId,retriveStoriesCallback){
		var url = configURL.Story.listStoryByKreportStudentId
		url = url.replace("{kreportStudentId}",kreportStudentId);
		var data = null;
		$.getJSON(url, data, function(result) {
			 if (!(typeof result.items == 'undefined'))
				retriveStoriesCallback(result.items);

		});


	}
	function retriveStoriesBykreportStudentIdAndStatus(kreportStudentId,status,retriveStoriesCallback){
		var url = configURL.Story.listStoryByKreportStudentIdAndStatus;

		url = url.replace("{kreportStudentId}",kreportStudentId);
		url = url.replace("{status}",status);
		var data = null;
		$.getJSON(url, data, function(result) {
			 if (!(typeof result.items == 'undefined'))
				retriveStoriesCallback(result.items);

		});


	}



	function retriveStoriesBykreportStudentIdAndDate(kreportStudentId,startDate,endDate,retriveStoriesCallback){
		var url = configURL.Story.listStoryByKreportStudentIdAndDate;
		startDate = format_date(startDate);
		endDate = format_date(endDate);

		url = url.replace("{kreportStudentId}",kreportStudentId);
		url = url.replace("{startDate}",startDate);
		url = url.replace("{endDate}",endDate);
		var data = null;
		//alert(url);
		$.getJSON(url, data, function(result) {
			 if (!(typeof result.items == 'undefined'))
				retriveStoriesCallback(result.items);

		});


	}



	function insertComment(story_id,comment, postCommentCallback){
			//cofigURL.StoryComment.StoryCommentURL
			//alert(comment);
				var data ={
				 "comment": comment,
				 "storyId": story_id
				};


				$.ajax({
					url: configURL.StoryComment.StoryCommentURL,
					type: 'post',
					data: JSON.stringify(data),
					headers:{'Content-Type': 'application/json'},
					dataType: 'json',
					success: function (result) {
						console.info(result);
						postCommentCallback(1,result);
						//alert('Story Saved');

					},
					error: function (result) {
						console.log("!!!Error in function insertComment. ");
						console.log(result);
						postCommentCallback(0,result);
						//alert('Story Saved');

					}
				});

		}
		function retriveStoryById(story_id,retriveStoryCallback){
			//alert(configURL.Story.StoryURL+story_id);
			$.getJSON(configURL.Story.StoryURL+story_id, function(result) {
				retriveStoryCallback(result)
			});

		}
		function updateStory( details, title, status,start_date, end_date,story_id, updateStoryCallback){

			$.getJSON(configURL.Story.StoryURL+story_id,  function(story) {
				//story.outcomeId = outcome_id;
				story.details = details;
				story.title = title;
				story.status = status;
				story.start_date = format_date(start_date);
				story.end_date = format_date(end_date);

				$.ajax({
					url: configURL.Story.StoryURL,
					type: 'put',
					data: JSON.stringify(story),
					headers:{'Content-Type': 'application/json'},
					dataType: 'json',
					success: function (result) {
						console.info(result);
						updateStoryCallback(1,result);
						//alert('Story Saved');

					},
					error: function (result) {
						console.log("!!!Error in function updateStory. Error in second ajax call");
						console.log(result);
						updateStoryCallback(0,result);
						//alert('Story Saved');

					}
				});
			});
		}
/**modal story ends**/

function showTree(kreportStudentId,age,status, leaf_clicked_callback,leaf_mouse_over_callback,leaf_mouse_exit_callback){
				//alert(getViewport());


				$("#modal_wait").remove();
				$("body").append("<div class='modal' id='modal_wait'></div>");
/*
						var viewport = getViewport();
						var viewport_w = viewport[0];
						var viewport_h = viewport[1];

						$("#modal_wait").css({height:viewport_h+"px"})
						$("#modal_wait").css({width:viewport_w+"px"})
						$body = $("body");
						$body.addClass("loading");
*/
				/*console.log($body);
				$("#canvas").remove();
				$("#leaf-label").remove();
				//$("#canvas_div").remove();
				$("#canvas_div").append("<table><tr><td><canvas id='canvas' width='423' height='525' style='border:1px solid black;background-color:white;'></canvas></td><td text-align='top'><span id='leaf-label'></span></td></tr></table>");*/
				$("#canvas_div").show();

				var canvas = document.getElementById('canvas');
				paper.setup(canvas);


				var url = configURL.Tree.listTreeByKreportStudentIdAndAgeExperiment;



					url = url.replace("{kreportStudentId}",kreportStudentId);
					url = url.replace("{age}",age);
					url = url.replace("{status}",status);
				//,age,status


				//alert(url);
				//return;

				//console.log(url);

				var time1,time2;
				time1 = performance.now();

				$.getJSON(url, function(result) {
					console.log(result);
					url = configURL.Student.listStudentByKreportStudentId;
					url = url.replace("{kreportStudentId}",kreportStudentId);
					//alert(url)

					$.getJSON(url, function(student_result) {
						console.log(student_result);
						if(  !(typeof student_result.items == 'undefined') ){
							//console.log(student_result);
							var dob = student_result.items[0].dob
							if(dob.length>7) {

								time2 = performance.now();
								$("#my_debug").append("<br><span style='color:green;'>required time to fetch data for tree in Millseconds:"+(time2-time1)+"</span>");
								//;alert(parseInt(dob.substr(5,2))-1);
								$( "#student_birth_month" ).val(parseInt(dob.substr(5,2))-1)

								//;
								ltree = new learningTree(result.items[0],leaf_clicked_callback,leaf_mouse_over_callback,leaf_mouse_exit_callback);

								//$body = $("body");
								//$body.removeClass("loading");
								paper.view.draw();


								//leaf_clicked_callback(-1,-1);
							}else{
								$body.removeClass("loading");
								paper.view.draw();
								// alert("!!!Error Date of birth wrong fromat check:"+dob);
							}
						}else{
							// alert("!!!Error this student id:"+kreportStudentId+" does not exist!!!");
							}
					});


				});

		}


			;
function getViewport() {

 var viewPortWidth;
 var viewPortHeight;

 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
 if (typeof window.innerWidth != 'undefined') {
   viewPortWidth = window.innerWidth,
   viewPortHeight = window.innerHeight
 }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
 else if (typeof document.documentElement != 'undefined'
 && typeof document.documentElement.clientWidth !=
 'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth,
    viewPortHeight = document.documentElement.clientHeight
 }

 // older versions of IE
 else {
   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
 }
 return [viewPortWidth, viewPortHeight];
}

function getStorybyStoryIdAndKRStudentId(story_id,KR_student_id,getStoryCallback){
				//line 660
				//function getStory(story_id,getStoryCallback){
				//alert(configURL.Story.StoryURL);
				//	var data = {"id":story_id}
	
				var url = configURL.Story.getStoryByStoryIdAndKRStudentId;
				url = url.replace("{storyId}",story_id);
				url = url.replace("{kreportStudentId}",KR_student_id);

				$.ajax({
					url: url,
					type: 'GET',
					data: null,
					headers:{'Content-Type': 'application/json'},
					dataType: 'json',
					success: function (result) {
						//console.info(result);
						getStoryCallback(1,result);


					},
					error: function (result) {
						console.log("!!!Error in function getStorybyStoryIdAndKRStudentId. ");
						console.log(result);
						getStoryCallback(0,result);


					}
				})


}
function deleteStoryByStoryIdAndKRStudentId(story_id,KR_student_id,deleteStoryCallback){
//686
//function deleteStory(story_id,deleteStoryCallback){
				//alert(configURL.Story.StoryURL);
				//	var data = {"id":story_id}
				var url = configURL.Story.deleteStoryByStoryIdAndKRStudentId;
				url = url.replace("{storyId}",story_id);
				url = url.replace("{kreportStudentId}",KR_student_id);

				$.ajax({
					url: url,
					type: 'DELETE',
					data: null,
					headers:{'Content-Type': 'application/json'},
					dataType: 'json',
					success: function (result) {
						//console.info(result);
						deleteStoryCallback(1);


					},
					error: function (result) {
						console.log("!!!Error in function deleteStory. ");
						console.log(result);
						deleteStoryCallback(0);


					}
				})


}

function updateStoryByStoryIdAndKRStudentId( details, title, status,start_date, end_date,story_id,KR_student_id, updateStoryCallback){
// 927
// function updateStory( details, title, status,start_date, end_date,story_id, updateStoryCallback){
			var url = configURL.Story.getStoryByStoryIdAndKRStudentId
			url = url.replace("{storyId}",story_id);
			url = url.replace("{kreportStudentId}",KR_student_id);

			$.getJSON(url,  function(story) {
				//story.outcomeId = outcome_id;
				story.details = details;
				story.title = title;
				story.status = status;

				story.startDate = format_date(start_date);
				story.endDate = format_date(end_date);
				console.log(story);
				$.ajax({
					url: configURL.Story.updateStoryByStoryIdAndStudentId,
					type: 'put',
					data: JSON.stringify(story),
					headers:{'Content-Type': 'application/json'},
					dataType: 'json',
					success: function (result) {
						console.info(result);
						updateStoryCallback(1,result);
						//alert('Story Saved');

					},
					error: function (result) {
						console.log("!!!Error in function update Stories");
						console.log(result);
						updateStoryCallback(0,result);
						//alert('Story Saved');

					}
				});
			});

}
function retriveStoryByIddAndKRStudentId(story_id,KR_student_id,retriveStoryCallback){


				var url = configURL.Story.getStoryByStoryIdAndKRStudentId;
				url = url.replace("{storyId}",story_id);
				url = url.replace("{kreportStudentId}",KR_student_id);

				$.ajax({
					url: url,
					type: 'GET',
					data: null,
					headers:{'Content-Type': 'application/json'},
					dataType: 'json',
					success: function (result) {
						//console.info(result);
						retriveStoryCallback(result);


					},
					error: function (result) {
						console.log("!!!Error in function getStorybyStoryIdAndKRStudentId. ");
						console.log(result);
						retriveStoryCallback(result);


					}
				})


}
