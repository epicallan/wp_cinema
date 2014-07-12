// JavaScript Document
$(document).ready(function() {	
	
seats_chart = function() {

function create_time(){
	var hr = dt.getHours() ;
	var mint= dt.getMinutes();
	var secs=dt.getSeconds();
	var intial_time=time=hr +':'+mint+':'+secs;
 	return  intial_time;
	}


function messages_longpolling($time){
   var t;
   alert($time);
  
 	jQuery.ajax({
     url:"allan_long_poll.php",
     type: "POST",
      data:{'time':$time},
      dataType: 'json',
      success: function(payload){
         clearInterval( t );
         if( payload.status == 'results' || payload.status == 'no-results' ){
            t=setTimeout(function(){
				var $new_time=create_time();
               	messages_longpolling($new_time);
            }, 2000 );//end if
				if( payload.status == 'results' ){
					   //create table
						var newHTML;
						newHTML = payload.data;
						$('.tableDiv').html(newHTML);
						}//end inner if
			
			} else if( payload.status == 'error' ){
            alert('We got confused, Please refresh the page!');
         }
      },
      error: function(){
		 alert('error! we are going to do another check')
         clearInterval( t );
         t=setTimeout( function(){
			 var $new_time=create_time();
            messages_longpolling($new_time);
         }, 15000 );
      }
   });
}//end long poll
//intialise long polling
	
}//end seats chart function

});//end document ready