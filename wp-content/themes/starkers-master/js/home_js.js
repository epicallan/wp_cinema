// JavaScript Document
$(document).ready(function() {	
	
	myIndex = function() {
		//amount counter
		var obj={$val_adults:0,$val_kids:0,k_c:false,a_c:false}
		var amount={$ticket:0,kids:0,kids_sum:0,adults_sum:0,seats_kids:0,seats_adults:0}
		var movie={$name:null}
		var cinema_room={$name:null}
		var show_time={$current:"",$movieTime:false}
		var date={$day:"",$date:"",$month:"",$year:"",$row:""}
		var progress={yes: false}
		var table={state:1}
		var purchase={$number_seats:1,$seat_id:'',$total_sum:'',$conv:'',$countdown:'',$continue:false,$reason:''}
		var current={$time:''}
		var seats_class=null;
		var $amount=$('#amount');
		var $conv=$('#conveniance_fee');
		var $total=$('#total');
		var $conv_val=2000;
		var seats_id;
		
		/*$('.bxslider').bxSlider({
		 	slideWidth: 500,minSlides: 3,maxSlides:3,slideMargin: 10,moveSlides:1,auto: true,
  			autoControls: true,
			onSlideBefore: function($slideElement, oldIndex, newIndex){
  				$('.focus_slider').hide();
				//alert('hey');
				//var $attr=$slideElement.next().children().first().attr('alt');
				var $attr=$slideElement.next().children('div').first().show();
			}
		});*/
	
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
	
	
	$('.test').click(function(event){
			var $id=$('.slides img').attr('alt')
			var text = "'#"+$id+"'";
			//alert(text);
			$('#rush4').css('opacity',1);
			event.preventDefault();
			});

		
			
		function $time(){
			var $fulldate
			var dt = new Date();
			var hr = dt.getHours() ;
			var mint= dt.getMinutes();
			var date=dt.getDate();
			var year=dt.getFullYear();
			var month=dt.getMonth();
			month=month+1
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
			
		var post_id;
		//function for bringing details about movie when book button is clicked
			$(".feature_slider li").on("click", ".book", function(){
				var $this=$(this);
				//$on_click_ajax(null,null,0);
				$(".ticket_container").show();
				$('.bx-wrapper').hide();
				$('.overlay').show();
				/*$('html,body').scrollTop(-600)*/
				
				var $movie=$this.attr('name')
				var $class=$this.attr('class');
				$class_arr=$class.split(" ");
				var $src=$class_arr[1];
				alert($movie);
				post_id=$this.attr('id');
				alert(post_id);
				$('.bg_img').html("<img src="+$src+">");
				movie.$name=$movie;
				//ajaxdata($movie);
			
				//reset ticket values to default
				 intial_vals();
				});// end click
			/*on clicking a movie get details about it
			*using ajax to get details about a movie,movie name is sent as an argument 
			*to the php script that gets the details from the data base
			*get dates, time and amount for selected movie
			*/
		
		function ajaxdata($name){
			$.ajax({
				url:'allan_movie_details.php',
				type: "POST",
				data:{'movie':$name},
				success: function(data,state){
					
					var newHTML;
					newHTML = data;
				//	$('.frame').html(newHTML);
					//$('.frame').hide();
					//$('.frame').fadeIn(500);
					//call current time function
					$time();
					$('.current_time').html(current.$time);
					var interval =setInterval($time,30000);
					
					$(".ticket").show();
					setTimeout($(".tickets").show(),1000);
				//	$(".tickets").show();
					}
				});// end ajax
		}// end ajaxdata
		
		function intial_nav(){
			$counter=0;
			obj.$val_adults=0;
			obj.$val_kids=0;
			purchase.$total_sum=0;
			amount.adults_sum=0;
			amount.kids_sum=0;
			amount.seats_adults=0;
			amount.seats_kids=0;
			purchase.$number_seats=0;
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
			
	
	function intial_nav(){
			$counter=0;
			obj.$val_adults=0;
			obj.$val_kids=0;
			purchase.$total_sum=0;
			amount.adults_sum=0;
			amount.kids_sum=0;
			amount.seats_adults=0;
			amount.seats_kids=0;
			purchase.$number_seats=0;
			$amount.html(amount.$ticket);
			$('#amount_kids').html('0');
			$conv.html($conv_val);
			$('.kids h1 ').html('00');
			$('.adults h1 ').html('00');
			$('.stub_tickets h3').html(purchase.$number_seats);
			$('.stub_price h3').html(purchase.$total_sum);
			$total.html(purchase.$total_sum)
			
			}
		
		
	function compute_conv(){
		var conv_default=2000;
		var $new_conv=(purchase.$number_seats/2 )*2000;
		$conv.html($new_conv);
		//alert(purchase.$number_seats);
		purchase.$conv= $new_conv;
		return $new_conv;
		}	
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
	function numberWithCommas(x) {
    		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}			
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
				}		
		
		$('a#add_kids').click(function(event){
				event.preventDefault();
				event.stopPropagation();
				
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
			});
		$('a#remove_kids').click(function(event){
				event.preventDefault();

				event.stopPropagation();
				
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
			
		});
		$('a#add_adults').click(function(event){
				event.preventDefault();
				event.stopPropagation();
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
			});
		$('a#remove_adults').click(function(event){
				event.preventDefault();
				event.stopPropagation();
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
			
		});
		var date_bool=false;
		var time_bool=false;
		function set_show_time_date(){
			$('.showroom').html(cinema_room.$name);
			$('.showtime').html(show_time.$current);
			$('.date').html(date.$current);
			$(".date_right").html(date.$date+" "+date.$month);
			$('.movie_name').html(movie.$name);
		}
		//getting amount from dates and using it to affect the ticket values	
		$("li").on("click", ".date_amount", function(event){
			// remove class rensiposible for focus and hover state
			var $this=$(this);
		
			$new_dates=$this.attr('href');
			date.$row=$new_dates;
			var arr=$new_dates.split(' ');
			date.$date=arr[1];
			if(date.$date<10){
				date.$date='0'+date.$date;
				}
			date.$month= arr[2];
			date.$year=arr[3];
			$(".num").html(date.$date);
			$(".month").html(date.$month);
			$(".year").html(date.$year);
			date_bool=true
			
			if(date_bool&&time_bool){
			set_show_time_date();}
			event.preventDefault();
			
		});
		//changing time on click//calls the function that loads the table
		$("li").on("click", ".time_vals", function(event){
			event.preventDefault();
				$('.ticket_nav#date_error').hide();
			var $this=$(this);
			//obtaining cinema room from time href
			var $cinema_room=$this.attr('href');
			var $time=$this.attr('id');
			cinema_room.$name=$cinema_room;
			show_time.$current=$time;
			//loading time in its appropriate places
			// unsetting time interval
			$('.current_time').html($time);
			time_bool=true;
				
			if(date_bool&&time_bool){
			set_show_time_date();}
			// calling function to set the table for the seats  chart
			send_table_name();
			// calling the fucntion that will create the seats chart
		
			
			});
			
		// function get table name for the seats chart
		
		
		var unbook_time;
		
		function send_table_name(){
			$.ajax({
				url:"allan_seats_table_name.php",
				type: "POST",
				dataType: "JSON",
				data:{ 'name':movie.$name,'time':show_time.$current, 'date_row': date.$row },
				success: function(data){
					//bool to allow**
					progress.yes=data.proceed;
					purchase.$reason=data.reason;
					//create seats chart
					periodic_ajax();
					}
				});// end ajax
		}
	function periodic_ajax(){
			var t=false;
			$.ajax({
				url:"allan_seats_write.php",
				type: "POST",
				data:{'create':'true'},
				success: function(data,state){
					//alert('we are in peridoic ajax');
					var newHTML;
					newHTML = data;
				$('.tableDiv').html(newHTML);
					var $i=0; 
					if(newHTML.length==0){
						setTimeout(periodic_ajax,500);
						$i++;
						if($i==3){
							alert('recall table name function');
							send_table_name();
							}
						if($i==5){
							alert('we need to exit');
							}
						}
					if(newHTML.length>0){
					//	alert('periodic ajax called');
						//re_assign_class();
						//alert('periodic');
						}
					}
				});// end ajax
				
			}//end peri0dic function

//the ajax function that gets ran after clicking a seat
	
		var $update=false;// helps seats long pull to know when to make a new seats chart call
		function $on_click_ajax($book,$id,$state){
				//alert('we are in ajax');
				$.ajax({
					url:'allan_seats_update.php',
					type: "POST",
					data: {'bookState':$book,
							'id':$id,'state':$state
						},
					success: function(data,state){
						$update=true;
						var newHTML;
						newHTML = data;
						$('.seats_container').html(newHTML);
						}
				});//end ajax
			}// end onclick ajax	
//time out variables			
 var t;
 var p;
 var q;			
function seats_longpolling(){

 	$.ajax({
     url:"allan_long_poll.php",
		type: "POST",
		data:{'time':'true'},
		dataType:'json',
		success: function(data,state){
		 clearInterval( t );
		 clearInterval( q);
		 clearInterval( p);
			//alert(data.status);
		 if(data.status =='results'){
		//seat has been clicked add data base has been updated by me
			if($update==true){
			
				//local dnt redaraw
				//periodic_ajax();
				$update=false;
				t=setTimeout( function(){seats_longpolling();},5000 );
				return false;
				}
				else{
					//seats has been clicked but no update yet, or from external user
					//	alert($update+"update not finished we are going to wait");
					//gives allowance for update to occur
					periodic_ajax();
					t=setTimeout( function(){seats_longpolling();},3000 );
					return false;
					}
			
			
			}
			 if(data.status == 'no-results'){
			//alert("counnter no-results: "+data.counter)
				
				q=setTimeout( function(){
				   seats_longpolling();
					},5000 );
					
			}
		},
		error: function(){
			clearInterval( t );
		 	clearInterval( q);
			 t=setTimeout( function(){
			seats_longpolling();
			 }, 10000 );
		  }
     	});//end ajax
	}
	function randomString(length, chars) {
				var result = '';
				for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
				return result;
				}
		var rString = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
		seats_id=rString;

//function for handling booking seats
		var opts = {
		  lines: 5, // The number of lines to draw
		  length:10, // The length of each line
		  width: 3, // The line thickness
		  radius: 2, // The radius of the inner circle
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset
		  direction: 1, // 1: clockwise, -1: counterclockwise
		  color: '#000', // #rgb or #rrggbb or array of colors
		  speed: 1, // Rounds per second
		  trail: 60, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000)
		  position:'relative',
		  top: '9px', // Top position relative to parent
		  left: '9px' // Left position relative to parent
		  
		};
		
				
		var $counter=0;
		var $seats_arr=new Array();
		$('.tableDiv').on("click", "a", function(event){
			event.preventDefault();
			event.stopPropagation();
			var $this=$(this);
		//	alert('number of seats'+purchase.$number_seats);
				if($this.hasClass("Taken")){
					//alert('seat has been bought');
						return 0;
					}else if($this.hasClass(seats_id)){
						//has been booked
							var $Id=$this.attr('id');
							$('#'+$Id).css('background-color','grey');
							$this.removeClass(seats_id).addClass("NotBooked");
							var $class="NotBooked";
							$on_click_ajax($class,$Id,1);
							if($counter==0){
								$counter=0;
								}else{
									$counter--;
									//alert('this is the seats counter: '+$counter + 'this is purchased seats' + purchase.$number_seats);
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
									alert('seat has been taken');
									return 0;
									
								}
								else{
								//	alert('you have selected max seats');
									$(".error_container").html('');
									$(".error_container").html("<p id='pick_error' class='error_msgs'>You have selected maximum number of seats<p>");
									setTimeout(function() {
										$(".error_container").html('');
										}, 3000);
								
									return false
									}	
							
							}
			
					event.preventDefault();
		});
	// cycle through seats ids and set them to unbooked
	function unbook(){
		for (index = 0; index <= $seats_arr.length; ++index) {
			var id=$seats_arr[index];
			//select id and add class notbooked
			$('#'+id).removeClass("Booked");
			$('#'+id).css('background-color','grey');
			$('#'+id).removeClass(seats_id).addClass("NotBooked")
			
			//alert(id);
			}
		
		}	
	function re_assign_class(){
			for (index = 0; index <= $seats_arr.length; ++index) {
			var id=$seats_arr[index];
			//select id and add class notbooked
			if($('#'+id).hasClass('Booked')){
				$('#'+id).removeClass("Booked");
				$('#'+id).addClass(seats_id);
				$('#'+id).css('background-color','#23b065');
				
				}
			
			//alert(id);
			}
		}
		
	//send all the final purchase details
	function purchase_details(){
		$phone=$('#phone').val();
		$email=$('#email').val();
		$.ajax({
				url:"allan_purchase_session_vars.php",
				type: "POST",
				data:{	'movie':movie.$name,
						
					
						'total_sum':purchase.$total_sum,
						'purchase_date':date.$row,
						'cinema_room':cinema_room.$name,
						'time':show_time.$current,
						'phone':$phone,
						'email':$email,
						'conv':purchase.$conv
						},
				success: function(data,state){
					//alert(data);
					var newHTML;
					newHTML = data;
					//$('#test2').html(newHTML);
					
					}
				});// end ajax	
			}

	// 3 minutes timer//ajax function after expire
	$('#payment_details').on('click','#process',function(){
		$.ajax({
				url:'allan_verify_money.php',
				type: "POST",
				data: {'verify':1},
				success: function(data,state){
					//alert(state);
					var newHTML;
					newHTML = data;
					//hide process
					$('.process').hide();
					$('#notice').hide();
					//place new content in verify
					$('#verify_container').html("");
					$('#verify_container').html(newHTML);
					//make next ajax call
					process_email_sms();
					}
				});//end ajax
		});

function process_email_sms(){
	$.ajax({
			url:'allan_process_purchase.php',
			type: "POST",
			data: {'process':1},
			success: function(data,state){
			//	alert('ajax call from process email'+state);
				}
		});//end ajax
	}
	
	function payment_values(){
			$('#receiver').html('077 1 965 729');
			$('#amount p').html(purchase.$total_sum);
			$('#reason p').html(purchase.$reason);
		}
		

	function expire_time(){
				$.ajax({
					url:'allan_seats_expire.php',
					type: "POST",
					cache:false,
					data: {expire:'1'},
					success: function(data,state){
					//alert('session has expired');
					$countdown_switch=true;
					$('.purchase_reset').show();
					unbook();
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
	
	function countdown_time(){
			var dt = new Date();
			var hr = dt.getHours() ;
			var mint= dt.getMinutes();
			var date=dt.getDate();
			var year=dt.getFullYear();
			var month=dt.getMonth();
			month=month+1
			var secs=dt.getSeconds();
			var mydate=(year+'/'+month+'/'+date);
			var row_time=time=hr +':'+mint;
			var new_mint;
			if(mint<55){	
			new_mint=(mint+5);	
			}else{
				var t=5+mint;
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
					alert('contdown finished')
						expire_time();
				});
				
			}
	
	$('#reset_01').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		amount.$ticket=0;
		amount.kids=0;
		purchase.$number_seats=0;
		purchase.$total_sum=0;
		intial_nav();
		});
	$('a#reset_02').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		//reset seats counter
		$counter=0;
		unbook();
		$on_click_ajax(null,null,0);
		//get all ids of current booked seats and remove book
			
		});
	
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
		
		});

		var $countdown_switch=true;
		$('#next_01').click(function(event){
			event.preventDefault();
			event.stopPropagation();
				var $this=$(this);
				
				// first check if ready to progress
				if(progress.yes==false){
					$(".error_container").html("<p id='date_error' class='error_msgs'>Please pick a date and time<p>");
					//alert(progress.yes);
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
						setTimeout( function(){
												   seats_longpolling();
													},5000 );
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
				
	//procees button on disclaimer	
	 $('#d_proceed').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		//allow going forth
		
		//hide message
		$('.purchase_disclaimer').hide();
			
			
		 });	
	 //abort button on disclainer	
	$('#abort')	.click(function(event){
		event.preventDefault();
		event.stopPropagation();
		//prevent proceeding forth
		
		//go back
		$('#prev_04').click();
		//hide disclaimer
		$('#payment_details').hide();
		$('.purchase_disclaimer').hide();
			
		 });	
	/*	window.onbeforeunload = function (e) {
				e = e || window.event;
				
				// For IE and Firefox prior to version 4
				if (e) {
					e.returnValue = 'Sure?';
					
					}
				
				// For Safari
				return 'Sure?';
			};*/
			
		$('.close,#quit').click(function(){
			$('.overlay').hide();
			progress.yes=false;
			clearInterval( t );
			clearInterval( q);
			 clearInterval( p);
			intial_vals();
			// $('html,body').scrollTop(-300)
			$('.bx-wrapper').show();
			$(".ticket_container").hide();
			$('.purchase_reset').hide();
			//hide all tabs apart from first
			$('#seats_contentID').hide();
			$('#phone_email_li').hide();
			$('#payment_details').hide();
			$('.getting-started').hide();
			$('.content').show();
		
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
			clearInterval( t );
			clearInterval( q);
			 clearInterval( p);
			// hide contianer for confirmation ajax	
				
					$('#verify_container').html("");
		})		
		$('#book_again').click(function(){
			intial_vals();
			clearInterval( t );
			clearInterval( q);
			 clearInterval( p);
			$('.purchase_reset').hide();
			//hide all tabs apart from first
			$('#seats_contentID').hide();
			$('#phone_email_li').hide();
			$('#payment_details').hide();
			$('.getting-started').hide();
			// hide contianer for confirmation ajax	
			
			$('.shared_nav').show();
			$('.content').show();
		
			progress.yes=false;	
			unbook();
			$counter=0;
			
			$on_click_ajax(null,null,0);
		// hide contianer for confirmation ajax	
				
			$('#verify_container').html("");
			
		})	
		
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
	}

});
