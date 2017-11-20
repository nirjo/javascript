
	var displayMode = {
		view: "VIEW",
		edit: "EDIT"
	};

	var strandTabType = {
		STRANDS: "STRANDS",
		EDIT: "EDIT"
	};
	var DataModel ;

var configURL = {
				warmupURL: "http://1-dot-learning-roots2.appspot.com/_ah/warmup/",
				CenterURL: "https://1-dot-learning-roots2.appspot.com/_ah/api/centerendpoint/v1/center/",
				StrandURL: "https://1-dot-learning-roots2.appspot.com/_ah/api/strandendpoint/v1/strand/",
				GetStrandsByCenterIdURL: "https://1-dot-learning-roots2.appspot.com/_ah/api/strandendpoint/v1/strand/",
				"Center":{
						"listCenterByKReportCenterId": "https://1-dot-learning-roots2.appspot.com/_ah/api/centerendpoint/v1/listCenterByKReportCenterId/{kreportCenterId}",
						"initCenter": "https://1-dot-learning-roots2.appspot.com/_ah/api/centerendpoint/v1/initCenter"
					
				},
				"Curriculum":{
						"CurriculumURL": "https://1-dot-learning-roots2.appspot.com/_ah/api/curriculumendpoint/v1/curriculum/",
						"listCurriculumByCenterdId": "https://1-dot-learning-roots2.appspot.com/_ah/api/curriculumendpoint/v1/center/{centerID}/curriculum",
						"listCurriculumBykreportCenterId": "https://1-dot-learning-roots2.appspot.com/_ah/api/curriculumendpoint/v1/listCurriculumBykreportCenterId/{kreportCenterId}"
					},
				"Strand":{
						"SrandURL": "https://1-dot-learning-roots2.appspot.com/_ah/api/strandendpoint/v1/strand/",
						"listStrandsByCurriculumId": "https://1-dot-learning-roots2.appspot.com/_ah/api/strandendpoint/v1/curriculum/{curriculumId}/strand",
						"listStrandByKreportStudentId":"https://1-dot-learning-roots2.appspot.com/_ah/api/strandendpoint/v1/listStrandByKreportStudentId?kreportStudentId={kreportStudentId}"
 
					},
				
				"Goal":{
						"GoalURL": "https://1-dot-learning-roots2.appspot.com/_ah/api/goalendpoint/v1/goal/",
						"listGoalsByStrandId": "https://1-dot-learning-roots2.appspot.com/_ah/api/goalendpoint/v1/strand/{strandId}/goal/"
 
					},
					
				"Outcome":{
						"OutcomeURL": "https://1-dot-learning-roots2.appspot.com/_ah/api/outcomeendpoint/v1/outcome/",
						"listOutcomesByGoalId": "https://1-dot-learning-roots2.appspot.com/_ah/api/outcomeendpoint/v1/goal/{goalId}/outcome/",
						"listOutcomesByStoryId":"https://1-dot-learning-roots2.appspot.com/_ah/api/outcomeendpoint/v1/story/{storyId}/outcome"
 
					},
					
				"Story":{
						"StoryURL": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/story/",
						"SaveStoryUrl": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/story/saveStory/",						
						"listStoryByKreportStudentId": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/listStoryByKreportStudentId?kreportStudentId={kreportStudentId}",						
						"listTreeByKreportStudentIdExperiment": "https://1-dot-learning-roots2.appspot.com/_ah/api/treeendpoint/v1/listTreeByKreportStudentIdExperiment/experiment?kreportStudentId={kreportStudentId}",						
						"getStoryByKreportStudentId": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/getStoryByKreportStudentId?kreportStudentId={kreportStudentId}",						
						"listStoryByKreportStudentIdAndStatus": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/listStoryByKreportStudentIdAndStatus?kreportStudentId={kreportStudentId}&status={status}",						
						"listStoryByKreportStudentIdAndDate": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/listStoryByKreportStudentIdAndDate?kreportStudentId={kreportStudentId}&startDate={startDate}&endDate={endDate}",				
						"listTreeByKreportStudentIdAndAgeExperiment": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/listStoryByKreportStudentIdAndDate?kreportStudentId={kreportStudentId}&startDate={startDate}&endDate={endDate}",				
						"listStoryByCenterId": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/center/{centerID}/story/",
						"updateTagsByStoryIdAndKreportStudentId":"https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/updateTagsByStoryIdAndKreportStudentId",
						"getStoryByStoryIdAndKRStudentId": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/student/{kreportStudentId}/story/{storyId}",
						"deleteStoryByStoryIdAndKRStudentId": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/student/story?storyId={storyId}&kreportStudentId={kreportStudentId}",
						"updateStoryByStoryIdAndStudentId": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/updateStoryByStoryIdAndStudentId",
						"getStoryByCenterIdStudentIdandDateRange":"https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/center/{centerId}/student/{studentId}/startDate/{startDate}/endDate/{endDate}"
						
						/*,
						"listOutcomesByGoalId": "https://1-dot-learning-roots2.appspot.com/_ah/api/storyendpoint/v1/center/{centerID}/outcome/"*/
 
					},
					
				"Student":{
						"StudentURL": "https://1-dot-learning-roots2.appspot.com/_ah/api/studentendpoint/v1/student",
						"listStudentByCenterId": "https://1-dot-learning-roots2.appspot.com/_ah/api/studentendpoint/v1/center/{centerID}/student",
						"listStudentByKreportStudentId": "https://1-dot-learning-roots2.appspot.com/_ah/api/studentendpoint/v1/student/listStudentByKreportStudentId/{kreportStudentId}/"
 
					},
				"StudentStory":{
						"StudentStoryURL": "https://1-dot-learning-roots2.appspot.com/_ah/api/studentstoryendpoint/v1/studentstory"
 
					}
					
					,
				"Tree":{
						"listTreeByStudentId": "https://1-dot-learning-roots2.appspot.com/_ah/api/treeendpoint/v1/Tree/{studentId}/student",
						"listTreeByKreportStudentId": "https://1-dot-learning-roots2.appspot.com/_ah/api/treeendpoint/v1/listTreeByKreportStudentId?kreportStudentId=",
						"listTreeByKreportStudentIdAndAge":  "https://1-dot-learning-roots2.appspot.com/_ah/api/treeendpoint/v1/listTreeByKreportStudentIdAndAge?age={age}&kreportStudentId={kreportStudentId}&status={status}",
						"listTreeByKreportStudentIdAndAgeExperiment":  "https://1-dot-learning-roots2.appspot.com/_ah/api/expermiment/2016/listTreeByKreportStudentIdAndAgeExperiment?age={age}&kreportStudentId={kreportStudentId}&status={status}"
 
					},
				"kreportui":{
						"getModalCenter": "https://1-dot-learning-roots2.appspot.com/_ah/api/kidsreportuiendpoint/v1/kidsreportui/5674015796494336"	

 
					},
				"StoryComment":{
						"StoryCommentURL": "https://1-dot-learning-roots2.appspot.com/_ah/api/storycommentendpoint/v1/storycomment/"
 
					},
					
				"Report":{
					
					"getReportByCenterIdStudentIdandDateRange":"https://1-dot-learning-roots2.appspot.com/_ah/api/reportendpoint/v1/report/center/{centerId}/student/{studentId}/startDate/{startDate}/endDate/{endDate}",
					"getCurriculumImplmentationReportByCenterIdAndDateRange":"https://1-dot-learning-roots2.appspot.com/_ah/api/reportendpoint/v1/report/center/{centerId}/startDate/{startDate}/endDate/{endDate}",
					"getCurriculumImplmentationReportByCenterIdAgeAndDateRange":"https://1-dot-learning-roots2.appspot.com/_ah/api/reportendpoint/v1/getCurriculumImplmentationReportByCenterIdAgeAndDateRange/center/{centerId}/student/{age}/startDate/{startDate}/endDate/{endDate}",
					"getCurriculumImplmentationReportByKreportTeacherIdAndDateRange":"https://1-dot-learning-roots2.appspot.com/_ah/api/reportendpoint/v1/getCurriculumImplmentationReportByKreportTeacherIdAndDateRange/teacher/{kreportTeacherId}/startDate/{startDate}/endDate/{endDate}"
				},
				"Teacher":{
					
					"listTeacherBykreportCenterId":"https://1-dot-learning-roots2.appspot.com/_ah/api/teacherendpoint/v1/center/{kreportCenterId}",
					"createTeacher":"https://1-dot-learning-roots2.appspot.com/_ah/api/teacherendpoint/v1/createTeacher?kreportCenterId={kreportCenterId}&kreportTeacherId={kreportTeacherId}&name={teacherName}"
				}
									
				
					
					 
					
				};
//	for test purpose				
function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}