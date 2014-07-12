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
		var progress={yes: null,no: null}
		var table={state:1}
		var purchase={$number_seats:1,$seat_id:'',$total_sum:'',$countdown:'',$continue:false,$reason:''}
		var current={$time:''}
		var $counter=0;
		var $amount=$('#amount');
		var $conv=$('#conveniance_fee');
		var $total=$('#total');
		var $conv_val=2000;
		//var $total_val= amount.$ticket+$conv_val;
		//hiding div thats  will contain the movie details	
	
		// function for getting current time// setting countdown time
		 var slider=$('.bxslider').bxSlider({
		 	slideWidth: 500,minSlides: 3,maxSlides: 3,slideMargin: 10,auto: true,
  			autoControls: true,
			onSlideAfter: function(){
  			 var current = slider.getCurrentSlide();
				if(current==2){}
  				}
		});
	slideQty = slider.getSlideCount();
	var myslide=slideQty/2;
	
	$('.test').click(function(event){
			var $id=$('.slides img').attr('alt')
			var text = "'#"+$id+"'";
			alert(text);
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
			//putting time in ts field
			mint=parseInt(mint);		
			var new_mint=(mint+5);	
			
			var new_time=hr +':'+new_mint;
			
			$fulldate=(mydate+' '+new_time+':'+ secs);
			return $fulldate	
			}
			
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
					$('.frame').html(newHTML);
					$('.frame').hide();
					$('.frame').fadeIn(1000);
					//call current time function
					$time();
					$('.current_time').html(current.$time);
					interval.currentTime=	setInterval($time,30000);
					}
				});// end ajax
		}// end ajaxdata
		//function for bringing details about movie when book button is clicked
			$(".feature_slider li").on("click", ".book", function(){
				var $this=$(this);
				$(".ticket_container").show();
				$('.bx-wrapper').hide();
				$('.overlay').show();
				 $('html,body').scrollTop(-300)
				
				var $movie=$this.attr('id')
				var $class=$this.attr('class');
				$class_arr=$class.split(" ");
				var $src=$class_arr[1];
				
				$('.bg_img').html("<img src="+$src+">");
				movie.$name=$movie;
				ajaxdata($movie);
				$(".ticket").show();
			//	$(".tickets").fadeIn(2500);
				//reset ticket values to default
				 intial_vals();
				});// end click
		function intial_nav(){
			$counter=0;
			obj.$val_adults=0;
			obj.$val_kids=0;
			purchase.$total_sum=0;
			amount.adults_sum=0;
			amount.kids_sum=0;
			amount.seats_adults=0;
			amount.seats_kids=0;
			
			//change_ticket_values(0);
			//change_ticket_kids(0);
					
			purchase.$number_seats=0;
			
				
			
			//putting amounts 
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
			
			intial_nav();
		}// end intial vals
			
		
	function compute_conv(){
		var conv_default=2000;
		var $new_conv=(purchase.$number_seats/2 )*2000;
		$conv.html($new_conv);
		//alert(purchase.$number_seats);
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
				if(obj.$val_kids<10&&purchase.$number_seats<10){
				obj.k_c=true;
				
				var $j= ++obj.$val_kids;
				if($j<10){
					var $num='0'+$j;
					}
				$('.kids h1 ').html($num);
				
				change_ticket_kids($j);
				
				}
			});
		$('a#remove_kids').click(function(event){
				event.preventDefault();
				event.stopPropagation();
				if(obj.$val_kids>0){
				obj.k_c=true;
				
				var $i= --obj.$val_kids;
				if($i<10){
					var $num='0'+$i;
					}
				$('.kids h1 ').html($num);
				
				
				change_ticket_kids($i);
			}
			
		});
		$('a#add_adults').click(function(event){
				event.preventDefault();
				event.stopPropagation();
				if(obj.$val_kids<10&&purchase.$number_seats<10){
					obj.a_c=true;
					
				var $i= ++obj.$val_adults;
				if($i<10){
					var $num='0'+$i;
					}
				$('.adults h1 ').html($num);
				
				change_ticket_values($i);
				
				}
			});
		$('a#remove_adults').click(function(event){
				event.preventDefault();
				event.stopPropagation();
				if(obj.$val_adults>0){
				obj.a_c=true;
				
				var $i= --obj.$val_adults;
				if($i<10){

					var $num='0'+$i;
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
			
			event.preventDefault();
			});
			
		// function get table name for the seats chart
		function send_table_name(){
			$.ajax({
				url:"allan_seats_table_name.php",
				type: "POST",
				 dataType: "JSON",
				data:{ 'name':movie.$name,'time':show_time.$current, 'date_row': date.$row },
				success: function(data,state){
					alert(state);
					progress.yes=data.proceed;
					purchase.$reason=data.reason;
					
					}
				});// end ajax
		}	
		
	//function for handling booking seats
		
		$('.tableDiv').on("click", "a", function(event){
				var $this=$(this);
				
				if($this.hasClass("Booked Taken")){
						//alert('has class booked');
						return 0;
						}else{
							
					//counter for number of seats that shold be bought
					if($counter<purchase.$number_seats){
						$counter++;
						if($counter==purchase.$number_seats){
							//only go to next tab after seats are equat to the seats to be bought
							purchase.$continue=true;
							
							}
						$this.removeClass("NotBooked").addClass("Booked");
						var $myId=$this.attr('id');
						//store seat id in seat object
						purchase.$seat_id=$myId;
						var $myclass="Booked";
						$on_click_ajax($myclass,$myId,1);
						}//end if
				}//end else
			event.preventDefault();
		});
	//the ajax function that gets ran after clicking a seat
	function $on_click_ajax($book,$id,$state){
				//alert('we are in ajax');
				$.ajax({
					url:'allan_seats_update.php',
					type: "POST",
					data: ({'bookState':$book,
							'id':$id,'state':$state
						}),
					success: function(data,state){
						//alert(state);
						var newHTML;
						newHTML = data;
						$('.seats_container').html(newHTML);
						}
				});//end ajax
			}// end onclick ajax
	// function for loading seats
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
						//alert('wait over'+$i);
						$i++;
						//creating loading bar
						if($i==3){
							alert('recall table name function');
							// recall the function for name
							send_table_name();
							
							}
						if($i==5){
							alert('we need to exit');
							}
						}
					if(newHTML.length>0){
						//alert('we are in periodic');
						}
					}
				});// end ajax
				
			}//end peri0dic function
		
	function periodic_run(){
		for(var i=1;i<31;i++){
				var t_change=7500
				var t_new=t_change*i;
			setTimeout(periodic_ajax,t_new);
			
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
						
						'seat_id':purchase.$seat_id,
						'total_sum':purchase.$total_sum,
						'purchase_date':date.$row,
						'cinema_room':cinema_room.$name,
						'time':show_time.$current,
						'phone':$phone,
						'email':$email
						},
				success: function(data,state){
					alert(state);
					var newHTML;
					newHTML = data;
					//$('#test2').html(newHTML);
					
					}
				});// end ajax	
			}
		
	//coundown function			
		function mycountdown($countdown_date){
			$('.getting-started').countdown($countdown_date, function(event) {
				$(this).html(event.strftime('%M:%S'));
				
				}).on('finish.countdown', function(event) {
					
					});
				
			}
	// 3 minutes timer//ajax function after expire
	var expire;
	function expire_time(){
	
		expire=setTimeout(function(){
				$.ajax({
					url:'allan_seats_expire.php',
					type: "POST",
					cache:false,
					data: {expire:'1'},
					success: function(data,state){
					
					$on_click_ajax(null,null,0);
					intial_nav();
					$('.kids h1 ').html('00');
					$('.adults h1 ').html('00');
					$('.purchase_reset').show();
					$counter=0;
					}
				});//end ajax
			}, 300000);//end timer	
		//remove seats from the seat array 300000
		}
	function clear_expire_time(){
		
		 clearTimeout(expire);
		// alert('cleared');
		}	
		
	$('#payment_details').on('click','#process',function(){
		
		$.ajax({
					url:'allan_verify_money.php',
					type: "POST",
					data: {'verify':1},
					success: function(data,state){
						alert(state);
						var newHTML;
						newHTML = data;
						$('.notice').hide();
						$('.process').html(newHTML);
						//go to next page<br>
						//$('#payment_details').hide();
						//$('#confirm').show();
						
						
						}
				});//end ajax
		
		});
	//$('#process').click(function(){
	//	
	//	});
	function payment_values(){
			$('#receiver').html('078 2 499 779');
			$('#amount p').html(purchase.$total_sum);
			$('#reason p').html(purchase.$reason);
		}
		
		$('#reset_all').click( function (event){
		event.preventDefault();
		event.stopPropagation();
		$on_click_ajax(null,null,0);
		amount.$ticket=0;
		amount.kids=0;
		purchase.$number_seats=0;
		purchase.$total_sum=0;
		intial_vals();
		$('.stub_tickets h3').html(purchase.$number_seats);
		$('.kids h1 ').html('00');
		$('.adults h1 ').html('00');
		(".seats_container").prepend('<h3>N/A</h3>')
                            
		$counter=0;
		
		});
	
	$('#reset_01').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		amount.$ticket=0;
		amount.kids=0;
		purchase.$number_seats=0;
		purchase.$total_sum=0;
		intial_nav();
		});
	$('#reset_02').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		//reset seats counter
		alert;
		$counter=0;
		//purchase.$number_seats=0;
		//purchase.$continue=false;
		//clear seats array
		$on_click_ajax(null,null,0);	
		
		
			
		
		});
	
								
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
			mycountdown($fulldate);
			var reset_time=(mydate+' '+row_time+':'+ secs);
			//var time_arr=[$fulldate, reset_time];
				
			
			
			return  $fulldate;
			}						
		$('#next_01').click(function(event){
			event.preventDefault();
			event.stopPropagation();
				var $this=$(this);
				// first check if ready to progress
				if(progress.yes){
						
						periodic_ajax();
						expire_time();
						$('.content').hide();
						$('#seats_contentID').show();
						//send value in total sum
						periodic_run()	;
						$('.getting-started').show();
						//settig up countdown
						var $time_countdown=countdown_time();
					
						
						mycountdown(mytime);
						
						
						return 0;
							}
				
					
						});
			
		
			
									
			$('#prev_02').click( function (event){
			event.preventDefault();
			event.stopPropagation();
				if($('#seats_contentID').is(":visible")){
					// hide second tab show next tab
					$('#seats_contentID').hide();
					//reset number of seats
					change_ticket_values(0);
					change_ticket_kids(0);
					obj.$val_adults=0;
					obj.$val_kids=0;
					purchase.$number_seats=0;
					$counter=0;
					$('.kids h1 ').html('00');
					$('.adults h1 ').html('00');
					//delete booked seats
					$on_click_ajax(null,null,0);
					$('.getting-started').hide();
					 clear_expire_time();
					$('.content').show();
					//progress.yes=false;
					//$(".seats_container").html('N/A')
					//stop periodic ajax
					
				
					}
			
			});		
			
									
		$('#next_02').click( function (event){
			event.preventDefault();
			event.stopPropagation();
			if($('#seats_contentID').is(":visible")){
					// hide second tab show next tab
					
						if(purchase.$continue){
						payment_values();	
						$('#seats_contentID').hide();
						$('#phone_email_li').show();
						//purchase.$continue=false;
						//reset fields
						}
					
					}
				
			});			
			
			$('#prev_03').click( function (event){
			event.preventDefault();
			event.stopPropagation();
			if($('#phone_email_li').is(":visible")){
					//hide this tab and then show next
					$('#phone_email_li').hide();
					$('#seats_contentID').show();
					
					return 0;
					}	
			
			});				 			 	
									
		//function for hiding current staf and bringing new staf

		$('#prev_04').click( function (event){
			event.preventDefault();
			event.stopPropagation();
				var $this=$(this);
				if($('#payment_details').is(":visible")){
					//do nothing
					$('#payment_details').hide();
					$('#phone_email_li').show();
					return 0;
					}
				});
				
		$('#prev_05').click( function (event){
			event.preventDefault();
			event.stopPropagation();
			if($('#confirm').is(":visible")){
					$('#confirm').hide();
					$('#payment_details').show();
					}
			});
			
		$('.close,#quit').click(function(){
			$('.overlay').hide();
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
			intial_vals();
			
		})		
		$('#book_again').click(function(){
			$('.purchase_reset').hide();
			//hide all tabs apart from first
			$('#seats_contentID').hide();
			$('#phone_email_li').hide();
			$('#payment_details').hide();
			$('.getting-started').hide();
			$('.content').show();
			$counter=0;
			intial_vals();
			
		})		
	//toogle on and off calender and calenders
		$('body').click(function(){
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
		$('.frame').on("click", ".showtimes a", function(event){
			$('.showtimes').fadeOut('fast');
			
			});	
		$('.frame').on("click", ".showdates a", function(event){
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