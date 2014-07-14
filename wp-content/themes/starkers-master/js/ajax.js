jQuery(document).ready(function($) {
	$(function(){
		//fields
		var obj={$val_adults:0,$val_kids:0,k_c:false,a_c:false}
		var amount={$ticket:0,kids:0,kids_sum:0,adults_sum:0,seats_kids:0,seats_adults:0}
		var movie={$name:null};var cinema_room={$name:null};var show_time={$current:"",$movieTime:false}
		var date={$day:"",$date:"",$month:"",$year:"",$row:""}
		var progress={yes: false};var table={state:1}
		var purchase={$number_seats:1,$seat_id:'',$total_sum:'',$conv:'',$countdown:'',$continue:false,$reason:''}
		var current={$time:''};var seats_class=null;
		var $amount=$('#amount');var $conv=$('#conveniance_fee');
		var $total=$('#total');var $conv_val=2000;
		var seats_id;var $post='';	var availableDates=new Array();
		// intial field values
	function intial_nav(){
			$counter=0;obj.$val_adults=0;obj.$val_kids=0;purchase.$total_sum=0;
			amount.adults_sum=0;amount.kids_sum=0;
			amount.seats_adults=0;amount.seats_kids=0;purchase.$number_seats=0;
			amount.kids=0;
			amount.$ticket=0;
			$amount.html(amount.$ticket);
			$('#amount_kids').html(amount.kids);
			$conv.html($conv_val);
			$('.kids h1 ').html('00');
			$('.adults h1 ').html('00');
			$('.stub_tickets h3').html(purchase.$number_seats);
			$('.stub_price h3').html(purchase.$total_sum);
			$total.html(purchase.$total_sum)
			}
			
		function intial_vals(){	
			intial_nav();
			date.$day="";
			date.$date="N/A";
			date.$month="";
			show_time.$current="N/A";
			cinema_room.$name="N/A";
			//putting movie name in movie slot
			$('.movie_name').html(movie.$name);
			//putting cinema room in room slot
			$('.showroom').html(cinema_room.$name);
			$('.showtime').html(show_time.$current);
			$('.date').html(date.$current);
			$(".date_right").html(date.$date+" "+date.$month);
		}// end intial vals
	//load ticket staff
	
	$(".feature_slider li").on("click", ".book", function(){
		var $this=$(this);
		//$on_click_ajax(null,null,0);
		$(".ticket_container").show();
		$(".ticket").show();
		$('.overlay').show();
		/*$('html,body').scrollTop(-600)*/
		var $movie=$this.attr('name');
		$post=$this.attr('id');
		var $class=$this.attr('class');
		$class_arr=$class.split(" ");
		var $src=$class_arr[1];
		//loading ticket image
		$('.bg_img').html("<img src="+$src+">");
		 movie.$name=$movie;
		intial_vals();
		////alert($post);
		ajax_dates($post);
		movie_times($post);
		
			});// end click
/**************************seting calender dates************************************************/
function ajax_dates($id){
	  jQuery.ajax({
		 url: MyAjax.ajaxurl,
		 type:'POST',
			dataType: 'json',
		 data: ({action : 'get_my_dates',id:$id}),
		 success: function(data,state) {
			
				availableDates=Array.prototype.slice.call(data)
				//console.log(availableDates);
				$('#date').datepicker({ beforeShowDay: available 
				,onSelect: function(){ 
					var dateObject = $('#date').datepicker('getDate'); 
					////console.log(dateObject);
					get_date(dateObject)
				}});
						
				}
		 });//end ajax
		}// end ajax_cats function
	/******* gets date from calender*************/
		function get_date(mydate){
			var string=mydate.toString();
			//store selected date
			var d = string.split(' ');
			date={$day:d[0],$date:d[2],$month:d[1],$year:d[3]}	
			$(".num").html(date.$date);
			$(".month").html(date.$month);
			$(".year").html(date.$year);
			 set_show_time_date();
			 //create one single date
			 date.$row=date.$date+" "+date.$month+" "+date.$year;
			// //alert(date.$row);
			event.preventDefault();		
			}
		/***************pops calender************/
		$('.myframe').on("click", "#calendar", function(event){
			if($('.showdates').is(":visible")){
				$('.showdates').hide();
				}else{
					$('.showdates').show();
					
					}
			event.preventDefault();
			event.stopPropagation();
				});	
		//sets some dates available others unavailable
		function available(date) {
		  dmy = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
		  if ($.inArray(dmy, availableDates) != -1) {
			return [true, "","Available"];
		  } else {
			return [false,"","unAvailable"];
		  }
		}

	/******************ajax function to get time*************/
	 function movie_times($post_id){
		// //alert($post_id);
		 jQuery.ajax({
		 url: MyAjax.ajaxurl,
		 type:'POST',
		// dataType: 'html',
		 data: ({action : 'get_my_times',id:$post_id}),
		success: function(data,state) {
			 	////alert(state);
			 	$('.showtimes').html(data)	
				}
		 });//end ajax
		}
		//pops up times
	$('.myframe').on("click", "#clock", function(event){
			if($('.showtimes').is(":visible")){
				$('.showtimes').hide();
				}else{
					$('.showtimes').show();
					}
			event.preventDefault();
			event.stopPropagation();
				});
	
	//selecting time
		$("ul.showtimes").on("click", ".time_vals", function(event){
			//$('.ticket_nav#date_error').hide();
			var $this=$(this);
			//obtaining cinema room from time href
			var $cinema_room=$this.attr('href');
			var $room=$cinema_room.substr(1);
			var $time=$this.attr('id');
			cinema_room.$name=$room;
			show_time.$current=$time;
			$('.current_time').html($time);
			time_bool=true;
			//enntering time in left panel
			set_show_time_date();
			//calling function  to send table name
			send_table_name()
			event.preventDefault();
			});
		// setitng date and time in the left container
		function set_show_time_date(){
			$('.showroom').html(cinema_room.$name);
			$('.showtime').html(show_time.$current);
			$('.date').html(date.$current);
			$(".date_right").html(date.$date+" "+date.$month);
			$('.movie_name').html(movie.$name);
		}
	/********************************************TICKETING AMOUNT********************************************/		
	// function computing amounts
		function compute_conv(){
			var conv_default=2000;
			var $new_conv=(purchase.$number_seats/2 )*2000;
			$conv.html($new_conv);
			////alert(purchase.$number_seats);
			purchase.$conv= $new_conv;
			return $new_conv;
		}	
	// changing ticket values	
	 function change_ticket_values($val){
			amount.$ticket=20000;
			amount.seats_adults=$val
			var $new_conv;
			purchase.$number_seats=amount.seats_adults+amount.seats_kids;
			$('.stub_tickets h3').html(purchase.$number_seats);
			var $new_amount=amount.$ticket*$val;
			if($new_amount==0){
					$new_total=0;
					}
			$amount.html($new_amount);
			amount.adults_sum=$new_amount;
			if($val>0){
					purchase.$total_sum=amount.adults_sum+amount.kids_sum;
					}else{
						purchase.$total_sum=amount.kids_sum;
						}
			var c =compute_conv();
			var sum=purchase.$total_sum + c;
			var sum_str=numberWithCommas(sum) ;
			$total.html(sum_str);
			purchase.$total_sum=sum;
			$('.stub_price h3').html(sum_str +" UGX ");
				}
	// add commas in the numbers			
	function numberWithCommas(x) {
    		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}	
	//function for computing kids amount			
	function change_ticket_kids($val){
		amount.kids=10000;
		amount.seats_kids=$val;
		var $new_conv;
		purchase.$number_seats=amount.seats_adults+amount.seats_kids;
		$('.stub_tickets h3').html(purchase.$number_seats);
		var $new_amount=amount.kids*$val;
		$('#amount_kids').html($new_amount);
			amount.kids_sum=$new_amount;
			if($val>0){
				purchase.$total_sum=amount.adults_sum+amount.kids_sum;
				}else{
					purchase.$total_sum=amount.adults_sum;
					}
		var c =compute_conv();
		var sum=purchase.$total_sum + c;
		var sum_str=numberWithCommas(sum) ;
		$total.html(sum_str);
		purchase.$total_sum=sum;
		$('.stub_price h3').html(sum_str +" UGX ");
			}// end change ticket kids value	
	
	// add function for kids
	$('a#add_kids').click(function(event){
		$('.error_container').html('');
		if(obj.$val_kids<10&&purchase.$number_seats<10){
			var $i= ++obj.$val_kids;
				if($i<11){
					var $num='0'+$i;
					if($i==10){
						var $num=$i;
						}
					}
				$('.kids h1 ').html($num);
				change_ticket_kids($i);
				}
			event.preventDefault();
			event.stopPropagation();	
			});
	// subtracting	kids values	
	$('a#remove_kids').click(function(event){
			if(obj.$val_kids>0){
				var $i= --obj.$val_kids;
				if($i<11){
					var $num='0'+$i;
					if($i==10){
						var $num=$i;
						}
					}
				$('.kids h1 ').html($num);
				if(obj.$val_adults==0 && obj.$val_kids==0){
					$('#seats_error').show();
					 $seats_clicks=true;
					}
				change_ticket_kids($i);
			}
		});// end functions
	$('a#add_adults').click(function(event){
		$('.error_container').html('');
		if(obj.$val_kids<10&&purchase.$number_seats<10){
			var $i= ++obj.$val_adults;
				if($i<11){
				var $num='0'+$i;
					if($i==10){
					var $num=$i;
						}
					}
			$('.adults h1 ').html($num);
			change_ticket_values($i);
			}
		event.preventDefault();
		event.stopPropagation();
			});
	
	$('a#remove_adults').click(function(event){
			if(obj.$val_adults>0){
			var $i= --obj.$val_adults;
				if($i<11){
					var $num='0'+$i;
					if($i==10){
						var $num=$i;
						}
					}
				if(obj.$val_adults==0 && obj.$val_kids==0){
					$('#seats_error').show();
					$seats_clicks=true;
					}
			$('.adults h1 ').html($num);
			change_ticket_values($i);
			}
		event.preventDefault();
		event.stopPropagation();	
		});			
		//reset values
		$('#reset_01').click(function(event){
			amount.$ticket=0;
			amount.kids=0;
			purchase.$number_seats=0;
			purchase.$total_sum=0;
			intial_nav();
			event.preventDefault();
			event.stopPropagation();
		});		
		
/**************************SEATS CHART*******************************************************************/
	//obtain table name, get movie,date(day,date,year),time(24hr)
		
		function send_table_name(){
			jQuery.ajax({
			  url: MyAjax.ajaxurl,
		 	  type:'POST',
			 dataType: "json",
			  data: ({action : 'seats_table_name','name':movie.$name,'time':show_time.$current, 'date_row': date.$row }),
			  success: function(data,state){
				 	//bool to allow**
					//console.log(data);
					$table_name=data.table;
					unbook_table_seats($table_name)
					progress.yes=data.proceed;
					purchase.$reason=data.reason;
					//create seats chart
					
					periodic_ajax($table_name);
					}
				});// end ajax
		}
	/*********unsetting unbooking seats that were not bought beyond a certain time******/	
	function unbook_table_seats($table){
			jQuery.ajax({
			 url: MyAjax.ajaxurl,
		 	 type:'POST',
			 data: ({action : 'unbook_any','table_name':$table}),
			  success: function(data,state){
				  	//alert(state);
				 	//console.log(data);
					}
				});// end ajax
		}
	var $i=0;
	/*************************draw seats chart******************/
	function periodic_ajax(){
		var t=false;
		jQuery.ajax({
			url: MyAjax.ajaxurl,
		 	type:'POST',
			data: ({action :'create_seats_chart','table_name':$table_name}),
			success: function(data,state){
				////alert(state);
				////console.log(data);
					if(data.length==0){
						setTimeout(periodic_ajax,500);
						$i++;
						if($i==3){
							//alert('recall table name function');
							send_table_name();
							}
						if($i==5){
							//alert('we need to exit');
							}
						}
					if(data.length>0){
						$('.tableDiv').html(data);
						setTimeout(function(){seats_longpolling();},5000 );
						//re_assign_class();
						////alert('periodic');
						}
						$i++;
					}
				});// end ajax
				
			}//end peri0dic function
			
/*********************Long Polling******************************/
	var t; var p;var q;	var d;		
	function seats_longpolling(){
		jQuery.ajax({
		url: MyAjax.ajaxurl,
		type:'POST',
		data: ({action :'seats_longpool'}),
		dataType:'json',
		success: function(data,state){
		 clearInterval( t );clearInterval( q);clearInterval( p);clearInterval(d);
			////alert(state);
			//console.log(data);
		 	if(data.status =='results'){
			//seat has been clicked add data base has been updated by me
			if($update==true){
				////alert(data.counter);
				//a local change is happening, wait a moment before redrawing the charts
				d=setTimeout( function(){ periodic_ajax();},3000 );
				$update=false;
				// check again after 5 seconds
				t=setTimeout( function(){seats_longpolling();},6000 );
				return false;
				}
				else{
					//alert(data.counter);
					//seats has been clicked but no local changes yet, 
					//gives allowance for update to occur
					d=setTimeout( function(){ periodic_ajax();},1500 );
					t=setTimeout( function(){seats_longpolling();},3000 );
					return false;
					}
				}
			 if(data.status == 'no-results'){
				//alert(data.counter);
				q=setTimeout( function(){seats_longpolling();},5000 );
				}
		},
		error: function(){
		clearInterval(t);clearInterval( q);clearInterval(d);
		 t=setTimeout( function(){seats_longpolling();}, 10000 );
		  }
     	});//end ajax
	}
/***************************************Clicking Seats********************************/
		var $counter=0;
		var $seats_arr=new Array();
		$('.tableDiv').on("click", "a", function(event){
			////alert('hey');
			var $this=$(this);
		//	//alert('number of seats'+purchase.$number_seats);
				if($this.hasClass("Taken")){
					////alert('seat has been bought');
						return 0;
					}else if($this.hasClass(seats_id)){
						//has been booked, seats_id class(booked) is added dynamically
							var $Id=$this.attr('id');
							$('#'+$Id).css('background-color','grey');
							$this.removeClass(seats_id).addClass("NotBooked");
							var $class="NotBooked";
							$on_click_ajax($class,$Id,1);
							if($counter==0){
								$counter=0;
								}else{
									$counter--;
									////alert('this is the seats counter: '+$counter + 'this is purchased seats' + purchase.$number_seats);
									}
						purchase.$continue=false;
						}else if($this.hasClass("NotBooked")){
								if($counter<purchase.$number_seats){
									$i=0;
									$this.removeClass("NotBooked").addClass(seats_id);
									var $myId=$this.attr('id');	
									//purchase.$seat_id=$myId;
									$('#'+$myId).css('background-color','#23b065');
									//store seat ids in an array
									$seats_arr[$counter]=[$myId];
									var $myclass="Booked";
									$on_click_ajax($myclass,$myId,1);
									$counter++;
									//remove error message
									$(".error_container").html('');
									if($counter==purchase.$number_seats){
											purchase.$continue=true;
											$i++;
										}else{
											purchase.$continue=false;
											}
									
									}
							else if($this.hasClass("Booked")){
									//alert('seat has been taken');
									return 0;
									
								}
								else{
								//	//alert('you have selected max seats');
									$(".error_container").html('');
									$(".error_container").html("<p id='pick_error' class='error_msgs'>You have selected maximum number of seats<p>");
									setTimeout(function() {
										$(".error_container").html('');
										}, 3000);
								
									return false
									}	
							
							}
			event.preventDefault();
			event.stopPropagation();
				
		});	
		
/*******function for creating unique class given to booked seats*********/
	function randomString(length, chars) {
				var result = '';
				for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
				return result;
				}
		var rString = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
		seats_id=rString;
	/****************resetting seats chart************/	
	$('a#reset_02').click(function(event){
		//reset seats counter
		$counter=0;
		unbook();
		//get all ids of current booked seats and remove book
		$on_click_ajax(null,null,0);
		event.preventDefault();
		event.stopPropagation();
		});
	// cycle through seats ids and set them to unbook at the front end	
	function unbook(){
		for (index = 0; index <= $seats_arr.length; ++index) {
			var id=$seats_arr[index];
			//select id and add class notbooked
			$('#'+id).removeClass("Booked");
			$('#'+id).css('background-color','grey');
			$('#'+id).removeClass(seats_id).addClass("NotBooked")
			}
		}		
		
/******ajax function for updating the database**********/
	var $update=false;// helps seats long pull to know when to make a new seats chart call
	function $on_click_ajax($book,$id,$state){
		//	//alert($book+" "+$id+" "+$state);
			jQuery.ajax({
			url: MyAjax.ajaxurl,
		 	type:'POST',
			data: ({action :'update_seats','bookState':$book,'seat_id':$id,'state':$state}),
			success: function(data,state){
				//means we are making local changes to seats chart dnt redraw chart
				$update=true;
				////alert(state);
				//console.log(data);
				$('.seats_container').html(data);
					}
				});//end ajax
			}// end onclick ajax	

	/*********************************Who to pay to, Collecting ticket information and sending it,tra****************************************************************************************************/
		function payment_values(){
			$('#receiver').html('077 1 965 729');
			$('#amount p').html(purchase.$total_sum);
			$('#reason p').html(purchase.$reason);
		}
	/**********collecting client entered Details***************/
	function purchase_details(){
		$phone=$('#phone').val();
		$email=$('#email').val();
		console.log("*******purchase details: "+purchase.$total_sum+" "+date.$row+" "+cinema_room.$name+" "+show_time.$current+" "+$phone+" "+$email+" "+purchase.$conv+" "+movie.$name);
		jQuery.ajax({
			url: MyAjax.ajaxurl,
		 	type:'POST',
			data: ({action :'purchase_session_vars','total_sum':purchase.$total_sum,'purchase_date':date.$row,
						'cinema_room':cinema_room.$name,'time':show_time.$current,'phone':$phone,'email':$email,
						'conv':purchase.$conv,'movie':movie.$name}),
			success: function(data,state){
					//alert(state);
					console.log("from php: "+data);
					}
				});// end ajax	
			}
/**********************************************Disclaimer Window************************************/
	//procees button on disclaimer	
	 $('#d_proceed').click(function(event){
		//allow going forth
		//hide message
		$('.purchase_disclaimer').hide();
		//start checking for mobile money
		r=setTimeout( function(){results_longpolling();},5000 );
		event.preventDefault();
		event.stopPropagation();
			});	
	 //abort button on disclainer	
	$('#abort')	.click(function(event){
		//prevent proceeding forth
		//go back
		$('#prev_04').click();
		//hide disclaimer
		$('#payment_details').hide();
		$('.purchase_disclaimer').hide();
		event.preventDefault();
		event.stopPropagation();
			});

	/**function that will be called to display the congrats messages when mobile money transaction is succesful or vice versa***/			
	var r,money_checks=0;
	function results_longpolling(){
		jQuery.ajax({
		url: MyAjax.ajaxurl,
		type:'POST',
		data: ({action :'read_mobile_mValues','m_checks':money_checks}),
		dataType:'html',
		success: function(data,state){
		 	clearInterval(r);
			//alert(state);
			console.log(data);
		 		if(data.length==0&&money_checks<6){
						r=setTimeout( function(){results_longpolling();},3000 );
						money_checks++;
						console.log("counter js: "+money_checks);
					}else{
						//hide process
						$('.process').hide();
						$('#notice').hide();
						//place new content in verify
						$('#verify_container').html(data);
						//make next ajax call,to send email and sms
						process_sms_email();
						}
			},
		error: function(){
		 clearInterval(r)
		 t=setTimeout( function(){results_longpolling();}, 10000 );
		  }
     	});//end ajax
	}
		
		
	// 3 minutes timer//ajax function after expire
	/*$('#payment_details').on('click','#process',function(){
			jQuery.ajax({
			url: MyAjax.ajaxurl,
		 	type:'POST',
			data: ({action :'read_mobile_mValues'}),
				success: function(data,state){
					console.log("read mobile money : "+data);
					//hide process
					$('.process').hide();
					$('#notice').hide();
				//	$('.shared_nav').hide();
					//place new content in verify
					$('#verify_container').html(data);
					//make next ajax call
					process_sms_email();
					}
				});//end ajax
		});*/

function process_sms_email(){
	jQuery.ajax({
		url: MyAjax.ajaxurl,
		type:'POST',
		data:({action :'process_sms_email'}),
			success: function(data,state){
			////alert('ajax call from process email'+state);
			console.log("process email: "+data)
			}
		});//end ajax
	}
	/******************************************CountDown***************************************************/
	
	function countdown_time(){
			var dt = new Date();var hr = dt.getHours() ;
			var mint= dt.getMinutes();var date=dt.getDate();
			var year=dt.getFullYear();var month=dt.getMonth();
			month=month+1
			var secs=dt.getSeconds();
			var mydate=(year+'/'+month+'/'+date);
			var row_time=time=hr +':'+mint;
			var new_mint;
			if(mint<55){	
			new_mint=(mint+7);	
			}else{
				var t=7+mint;
				var x=t-60;
				new_mint=x;
				hr=hr+1;
				}
			var new_time=hr +':'+new_mint;
			var $fulldate=(mydate+' '+new_time+':'+ secs);
			return  $fulldate;
			}				
//navigation code
//coundown function			
		function mycountdown($countdown_date){
			
			$('.getting-started').countdown($countdown_date, function(event) {
				$(this).html(event.strftime('%M:%S'));
				 
				}).on('finish.countdown', function(event) {
					//alert('contdown finished')
					expire_time();
				});
				
			}
/*********************************************EXPIRE SEATS*****************************************************************************/
	function expire_time(){
			jQuery.ajax({
			url: MyAjax.ajaxurl,
		 	type:'POST',
			data: ({action :'expire'}),	
			cache:false,
			success: function(data,state){
				console.log(data);	
				$countdown_switch=true;
				$('.purchase_reset').show();
				unbook(); // unbooks seats at the front 
				$counter=0;
				intial_vals();
				$on_click_ajax(null,null,0);
				clearInterval( t );
				clearInterval( q);
				clearInterval( p);
			}
		});//end ajax
		//remove seats from the seat array 300000
	}
/*************************close Quit And Quit****************************/
$('.close,#quit').click(function(){
	$('.overlay').hide();
	progress.yes=false; $(".ticket_container").hide(); $('.purchase_reset').hide();
	//hide all tabs apart from first
	$('#seats_contentID').hide();$('#phone_email_li').hide();$('#payment_details').hide();
	$('.getting-started').hide();$('.content').show();
	// hide contianer for confirmation ajax	
	$('.shared_nav').show();
	$countdown_switch=true;
	unbook();
	$counter=0;
	intial_vals();
	$on_click_ajax(null,null,0);
	$('.overlay').hide();
	// $('html,body').scrollTop(-300)
	$(".ticket_container").hide();
	clearInterval( t );clearInterval( q);clearInterval(d);
	// hide contianer for confirmation ajax
	$('#verify_container').html("")})		
	$('#book_again').click(function(){
	intial_vals();
   	clearInterval( t );clearInterval( q); clearInterval( d);
	$('.purchase_reset').hide();$('#seats_contentID').hide();$('#phone_email_li').hide();
	$('#payment_details').hide();$('.getting-started').hide();
	$('.shared_nav').show();$('.content').show();
	progress.yes=false;	
	unbook();
	$counter=0;
	$on_click_ajax(null,null,0);
		// hide contianer for confirmation ajax	
	$('#verify_container').html("");
		})			
	/*****************************************OBTAINING CURRENT TIME********************************/
		function $time(){
			var $fulldate;var dt = new Date();var hr = dt.getHours() ;
			var mint= dt.getMinutes();var date=dt.getDate();
			var year=dt.getFullYear();var month=dt.getMonth();
			month=month+1;
			var secs=dt.getSeconds();
			var mydate=(year+'/'+month+'/'+date);
			var row_time=time=hr +':'+mint;
			var date_time=(year+'-'+month+'-'+date+' '+hr+':'+mint+':'+secs);
			if(mint<10){
				time=hr +':'+'0'+mint;
				}else{
					time=hr +':'+mint;
					}
			if(hr<10){
				time='0'+time;
				}else{
					time=time;
					}		
					
			current.$time=time;	
	
			}
	
/************************************************Tabs Navigation************************************************************************/
	var $countdown_switch=true; // for countdown
	$("#tabs").tabs({
		beforeActivate: function (event,ui) {
			var $id=ui.newPanel.attr('id')
			$('#payment_details').hide();
		 	if($id =='seats_contentID'){
				if(progress.yes==false){
					$(".error_container").html('');
					$(".error_container").html("<p id='date_error' class='error_msgs'>Please pick a date and time<p>");
					return false;
					}else{
						$(".error_container").html('');
						}
					if(purchase.$number_seats==0){
						$(".error_container").html('');
						$(".error_container").html("<p id='seats_error' class='error_msgs' >Please indicate how many tickets you need<p>")
						return false
						
						}else{
						$(".error_container").html('');
						}
					
				if(progress.yes && purchase.$number_seats>0){
						//set continuing from seats chart
						if($counter==purchase.$number_seats){
							purchase.$continue=true;
							}else{
								purchase.$continue=false;
								}
						$('.getting-started').show();
						if($countdown_switch){
							$('.getting-started').remove();
							$('.time_container').html('<h4 class="getting-started"></h4>');	
							var $time_countdown=countdown_time();
							mycountdown($time_countdown);
							}
						}
				}
				if($id=='phone_email_li'){
					//alert($id);
					if(purchase.$continue){
						$(".error_container").html('');
						//$('#seats_contentID').hide();	
						//brings money to send mobile money to, reason code and amount
						payment_values();
							//hide current window
						}
					if(purchase.$continue==false&&purchase.$number_seats>0&&progress.yes==true ){
						$(".error_container").html('');
						$(".error_container").append("<p id='pick_error' class='error_msgs' >Pick all the seats you Selected <p>");
						return false;
							}
						 if(purchase.$number_seats==0){
							$(".error_container").html('');
							$(".error_container").html("<p id='seats_error' class='error_msgs' >Please indicate how many tickets you need<p>")
							return false
							}
						if(progress.yes==false){
							$(".error_container").html('');
							$(".error_container").html("<p id='date_error' class='error_msgs'>Please pick a date and time<p>");
							return false;
							}
						}
				}
			}); // end tabs

/***********toggle on and off calender*************/
//toogle on and off calender and calenders
		$('body').click(function(event){
		if($('.showtimes').is(":visible")){
				$('.showtimes').hide();
				}
			if($('.showdates').is(":visible")){
				$('.showdates').hide();
				}
			});
		$('.frame').on("click", "#clock", function(event){
			event.preventDefault();
			event.stopPropagation();
			if($('.showtimes').is(":visible")){
				$('.showtimes').hide();
				}else{
					$('.showtimes').show();
					
					}
				
				});	
		var $turn_off_1=false;	
		var $turn_off_2=false;		
		$('.frame').on("click", ".showtimes a", function(event){
			
			$turn_off_1=true;
			if($turn_off_1 && $turn_off_2 ){
				$('#date_error').hide();
				 $clicks=false;
				$turn_off_1=false;	
				$turn_off_2=false;
				}
			$('.showtimes').fadeOut('fast');
			
			});	
		$('.frame').on("click", ".showdates a", function(event){
			$turn_off_2=true;
			
			if($turn_off_1 && $turn_off_2 ){
				$('#date_error').hide();
				$clicks=false;
				$turn_off_1=false;	
				$turn_off_2=false;
				
				}
			
			$('.showdates').fadeOut('fast');
			});	
		$('.frame').on("click", "#calendar", function(event){
			event.preventDefault();
			event.stopPropagation();
			if($('.showdates').is(":visible")){
				$('.showdates').hide();
				}else{
					$('.showdates').show();
					}
				});	
/********************************************SLIDER************************************/
	$('.div2').show();
		$('.bxslider').slick({
		  dots: false,autoplaySpeed: 5000, slidesToShow: 3,slidesToScroll: 1,autoplay: true, slide:'li',
		  onAfterChange:function(){ 
				$('.focus_slider').fadeOut();
				var $attr=$('.slick-active').next().children('div').attr('id');
				
				if($attr.length==0){
					$('.div1').fadeIn();
					}else{
						$("#"+$attr).fadeIn();
						}
					
			},
			responsive: [
			{breakpoint: 1024,settings: {slidesToShow:3,slidesToScroll: 1,dots: true}
				},
			{
			  breakpoint: 960,
			  settings: {slidesToShow: 2,slidesToScroll: 1}
			}
		  ]
		  
		});
					
				
							
/*******************************************Navigation next prev**************************************************************/

		$('#next_01').click(function(event){
			event.preventDefault();
			event.stopPropagation();
				var $this=$(this);
				// first check if ready to progress
				if(progress.yes==false){
					$(".error_container").html("<p id='date_error' class='error_msgs'>Please pick a date and time<p>");
					////alert(progress.yes);
					 return false;
						}else{
							$(".error_container").html('');
							}
				if(purchase.$number_seats==0){
						$(".error_container").html("<p id='seats_error' class='error_msgs' >Please indicate how many tickets you need<p>")
						return false
					}else{
							$(".error_container").html('');
							}
				
				
				if(progress.yes && purchase.$number_seats>0){
						//set continuing from seats chart
						if($counter==purchase.$number_seats){
							purchase.$continue=true;
							}else{
								purchase.$continue=false;
								}
					
					$('.content').hide();
						$('#seats_contentID').show();
						//send value in total sum
						$('.getting-started').show();
						//settig up countdown
						if($countdown_switch){
						//create dynamic element
						$('.getting-started').remove();
						
						$('.time_container').html('<h4 class="getting-started"></h4>');	
						var $time_countdown=countdown_time();
						mycountdown($time_countdown);
						
						}
						return 0;
							}
					});
		
		
		$('#next_02').click( function (event){
			event.preventDefault();
			event.stopPropagation();
			if($('#seats_contentID').is(":visible")){
				//check source of purchase continue
				//switch*****
				 $clicks=true
				if(purchase.$continue==false){
					//error box
					$(".error_container").append("<p id='pick_error' class='error_msgs' >Pick all the seats you Selected <p>");
					return false;
					}
					if(purchase.$continue){
						$(".error_container").html('');
						//brings money to send mobile money to, reason code and amount
						payment_values();	
						$('#seats_contentID').hide();
						$('#phone_email_li').show();
						
						}
					}
				});		
		$('#prev_02').click( function (event){
			event.preventDefault();
			event.stopPropagation();
			if($('.ticket_nav p').length>0){
				$('.ticket_nav p').remove();
				}
					if($('#seats_contentID').is(":visible")){
					//prevents recreating countdown	
					$countdown_switch=false;
					$('#seats_contentID').hide();
					//setting continuing to false
					purchase.$continue=false;
					$('.content').show();
					}
			});			
		$('#next_03').click(function(event) {
			event.preventDefault();
			event.stopPropagation();
			if($("#contacts").valid()){
				//go to next ticket page, hide current
				$('#phone_email_li').hide();
				//div with mobile money reason
				$('#payment_details').show();
				//display disclaimer
				$('.purchase_disclaimer').show();
				//submit purchase data via ajax
				purchase_details();
				event.preventDefault();
				}
			});
	$('#prev_03').click( function (event){
		event.preventDefault();
		event.stopPropagation();
		if($('#phone_email_li').is(":visible")){
			$('#phone_email_li').hide();
				$('#seats_contentID').show();
				return 0;
				}	
		});
	$('#prev_04').click( function (event){
			event.preventDefault();
			event.stopPropagation();
				var $this=$(this);
				if($('#payment_details').is(":visible")){
					//do nothing
					$('#payment_details').hide();
					// hide contianer for confirmation ajax	
				
					$('#verify_container').hide();
					$('#phone_email_li').show();
					return 0;
					}
				});

		
	});// end jquery function
});// end document ready