				
function manage_curriculum(kreportCenterId,center_name){
			$("#modal_wait").remove();
			$("body").append("<div class='modal' id='modal_wait'></div>");

			$body = $("body");
			$body.addClass("loading");
			//alert('func start 8');
			
			var url = configURL.Center.initCenter;
			var data = {"kreportCenterId": kreportCenterId,"name": center_name};
			
			var time1,time2;
			time1 = performance.now();
				
			$.ajax({
                 url: url,
                 type: 'post',
                 data: JSON.stringify(data),
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 dataType: 'json',
                 success: function(data) {
			 
			time2 = performance.now();
			$("#my_debug").append("<br><span style='color:red'>required time in Millseconds:"+(time2-time1)+"</span>");	
		
                   index_view.openCenterModalModified(data.id);
					$body = $("body");
					$body.removeClass("loading");				   
					//alert('func end 36');
										
                 }
               });
		

}