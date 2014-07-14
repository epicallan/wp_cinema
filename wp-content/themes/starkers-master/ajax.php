<?php
//getting the admin-ajax script that handles ajax staf
date_default_timezone_set('Africa/Nairobi');
require("phpqrcode/phpqrcode.php");
require("PHPMailer-master/class.phpmailer.php"); 

function my_ajax_function(){
		wp_enqueue_script( 'jquery' );	
		wp_enqueue_script( 'script-name', get_template_directory_uri() .'/js/ajax.js', array('jquery'));
 	 	wp_localize_script( 'script-name', 'MyAjax', array('ajaxurl' => admin_url( 'admin-ajax.php' )));
 	}
add_action( 'wp_enqueue_scripts', 'my_ajax_function' );
//function to check if mobile money sms are up
function mobile_moneysms(){
	//find latest results, results that are 10 minutes back
	global $wpdb;
	$current=date('Y-m-d H:i:s');
	$newdate=strtotime('-7 min', $current);
	$sql="select state from mobilesmschecks where time > $newdate";
	$row=$wpdb->get_row($sql,ARRAY_A);
		if($row){
				$state=$row['state'];
				$jason=json_encode(array('state'=>$state));
				echo $jason;
			}else{
				//error
				$jason=json_encode(array('state'=>'error'));
				echo $jason;
				}
	
	}
add_action("wp_ajax_mobile_moneysms", "mobile_moneysms");

function get_my_dates(){
		$id=$_POST['id'];
		movie_dates($id); 
		die(); 
		}
	//add_action("wp_ajax_nopriv_get_my_dates", "get_my_dates");
	add_action("wp_ajax_get_my_dates", "get_my_dates");
/// function for getting dates and time of a particular movie
	function movie_dates($id){
		$cinema= get_post_meta( $id, 'movie_select', true );
 		//getting movie start date
 		$start= get_post_meta( $id, 'movie_start_date', true ); //2014 07 10  , 2014 07 15
 		//getting end date
 		$end= get_post_meta( $id, 'movie_end_date', true );
		// getting in between dates
		$dates_arr=dateRange($start,$end);
		echo json_encode($dates_arr);
	}// end function
// date range function
function dateRange($first, $last, $step = '+1 day', $format = 'j-n-Y' ) { 
	$dates = array();
    $current = strtotime($first);
    $last = strtotime($last);
	while( $current <= $last ) { 
		$dates[] = date($format, $current);
    	 $current = strtotime($step, $current);
    }
 return $dates;
}	
function calender($arr){

		foreach($arr as $mydate){
		static $j=0;
		//get dates put them in lis
		$new_date = date("D j M Y", strtotime($mydate)); 
		$dateparts=explode(" ",$new_date);
		$day=$dateparts[0];
		$date=$dateparts[1];
		$month=$dateparts[2];
		$year=$dateparts[3];
		$organised_date=$day.' '.$date.' '. $month.' '. $year;
		echo "<li><a href='$organised_date' class='date_amount'>".$day." ". $date."</a></li>";
		$j++;
		}//end for each
	echo "<li class='pointer'></li>";
	
	}//end calender	
	function get_my_times(){
		$id=$_POST['id'];
		movie_times($id); 
		die(); 
		}
	//add_action("wp_ajax_nopriv_get_my_dates", "get_my_dates");
	add_action("wp_ajax_get_my_times", "get_my_times");
	function movie_times($id){
		//getting movie times
		$data= get_post_meta( $id, 'movie_repeatable', true );
		$room= get_post_meta($id, 'movie_select', true );
				foreach ($data as $val){
					foreach($val as $val2){
						$time_array[] = $val2;
						 echo "<li><a href=\"#$room\" class='time_vals' id=$val2>$val2</a></li>";
					 }
				}

		}// end function	
/****************seats table name****************/
	function seats_table_name(){
		//get data
		$date=$_POST['date_row'];
		$time=$_POST['time'];
		$movie=$_POST['name'];
		//change date format to usable
		$new_date = date('Y-m-d', strtotime($date)); 
		$date_formated=str_replace("-","",$new_date);
		$time=str_replace(":","",$time);
		//get table name
		$wp_session = WP_Session::get_instance();
		$table_name=$movie.$date_formated.$time;
		//reseting intialsing
		unset($wp_session['seats_array']);
	
		$wp_session['seat_table']=$table_name;
		// create simple reason code
		$reason=reason_code();
		$wp_session['tracker']=$reason;
		$proceed=array('proceed'=>1,'reason'=>$reason,'table'=>$table_name);
		$jason=json_encode($proceed);
		echo $jason;
		die(); 
		}
	//add_action("wp_ajax_nopriv_get_my_dates", "get_my_dates");
	add_action("wp_ajax_seats_table_name", "seats_table_name");
	function reason_code(){
			$a=null;
		for ($i = 0; $i<6; $i++){
			$a.= mt_rand(0,9);
	 			}
		return $a;
		}
/************************************************unbook any un bought seat that havent been bought beyond 5 mints at start of session******************/
// call function at start of creating table	
	function unbook_any(){
		global $wpdb;
		$table=$_POST['table_name'];
		$expired=date('Y-m-d H:i:s', strtotime('-5 minutes'));
		//$q="UPDATE $table SET Book = 'NotBooked' WHERE time < '$expired' && take='NotTaken'";
		$results=$wpdb->query(
			"
			UPDATE $table
			SET Book = 'NotBooked'
			WHERE time < '$expired' AND take='NotTaken'
				
			"
			);
		die(); 
			}
add_action("wp_ajax_unbook_any", "unbook_any");

/*************************create seats chart******************************/
	function create_seats_chart(){
		global $wpdb;
		$table_name=$_POST['table_name'];
		//echo $table_name;	
		$results=$wpdb->get_col("select row from $table_name");
		$myrows = array_unique($results);
		echo"<table class='table'>";
		$myseats_arr =array();
		foreach($myrows as $k=>$row){
			$query="select seat,book,take from $table_name where row ='$row'";
			$seat_rows = $wpdb->get_results($query ,ARRAY_A);
			echo "<tr>";
			foreach($seat_rows as $key=>$data){
				$seat=$data['seat'];
				$book=$data['book'];
				$take=$data['take'];
				if($take=='Taken'){
					echo"<td ><a href='#'  class='$take' id='$seat' ></a></td>";
						}else{
							echo"<td ><a href='#'  class='$book' id='$seat' ></a></td>";
							}//end if 	
					}// end seats loop
			echo"</tr>";// end seats row
			$query=null;		
			$seat_rows=null;
			
		}// end rows for loop
	echo"</table>";
    find_seats();
	die(); 
	}

add_action("wp_ajax_create_seats_chart", "create_seats_chart");
/****************************update seats***************************************/
function update_seats(){
	
	$wp_session = WP_Session::get_instance();
	//state==0 means users wants to reset chart
	if($_POST['state']==0){
	//remove booked state
	 reset_seats_booked();
		}else{
		if(isset($wp_session['seats_array'])){
			if($_POST['bookState']=='NotBooked'){
				
				$ID=$_POST['seat_id'];
				$book_state=$_POST['bookState'];
				//seach and find out whether the seats id is within out seats array,if in remove it, user wants to unbook
				$array=$wp_session['seats_array']->toArray();
				$key = array_search($ID,$array);
				unset($array[$key]);
				$count=$wp_session['booked_seats'];
				intval($count);
				$count--;
				$wp_session['booked_seats']=$count;
				echo $wp_session['booked_seats'];
				$wp_session['seats_array']=$array;
				//update table,(booking)
				UpdateTable($ID,$book_state);
			
					}//end not booked
				if($_POST['bookState']=='Booked'){
					$ID=$_POST['seat_id'];
					$book_state=$_POST['bookState'];
					// get new seat id
					$new_seat=$ID;
					//check if already in our seats array
					$array=$wp_session['seats_array']->toArray();
					array_push($array,$new_seat);
					$count=$wp_session['booked_seats'];
					intval($count);
					$count++;
					$wp_session['booked_seats']=$count;
					echo $wp_session['booked_seats'];
					$wp_session['seats_array']=$array;
					UpdateTable($ID,$book_state);
			}// end booked
		}else{
			//seats array is not set, intialising it
			$ID=$_POST['seat_id'];
			$book_state=$_POST['bookState'];
			$wp_session['seats_array'] = array($ID );
			//UPDATE BOOKED SEATS COUNT
			$count=$wp_session['booked_seats'];
			intval($count);
			$count++;
			$wp_session['booked_seats']=$count;
			echo $wp_session['booked_seats'];
			UpdateTable($ID,$book_state);
				}//end else
			}
			die(); 
		}// end update_seats
add_action("wp_ajax_update_seats", "update_seats");

// update data base table
	function UpdateTable($id,$book){
		global $wpdb;
		$wp_session = WP_Session::get_instance();
		$current_time=date("Y-m-d H:i:s");
		$table=$wp_session['seat_table'];
		$results=$wpdb->update( 
			$table, 
			array( 
				'Book' => $book,	// string
				'time' => $current_time	//  
			), 
			array('seat'=>$id),
			array( '%s' )
			
		);
		if($results){
			echo"<ul class='showseats' id='show1'>";
			$seats_array=$wp_session['seats_array']->toArray();
			
			foreach($seats_array as $seat){
				echo "<li><a href='#'>$seat</a></li>";
					}
			echo'</ul>';
				
			}
		}// end update
/*********************reset seats********************/		
function reset_seats_booked(){
		global $wpdb;
		$wp_session = WP_Session::get_instance();
		$seats_array=$wp_session['seats_array']->toArray();
		$table=$wp_session['seat_table'];
		foreach($seats_array as $seat){
			//find out whether taken or not
			$query="select take from $table where seat='$seat'";
			$seat_rows = $wpdb->get_row($query ,ARRAY_A);
			foreach($seat_rows as $state):
				if($state=='NotTaken'):
					//update, turn to Not booked
					$current_time=date("Y-m-d H:i:s");
					$results=$wpdb->update( 
						$table, 
						array( 
							'Book' =>'NotBooked',	// string
							'time' => $current_time	//  
						), 
						array('seat'=>$seat),
						array( '%s' )
						);
				endif;
				endforeach;//determing if taken or nt taken
				}//looping through row from db
			//unset seats array	
			unset($wp_session['seats_array']);
		}//end function
/*********************find number of booked seats ***************************************/
function find_seats(){
		//$time=$time_check;
		global $wpdb;
		$wp_session = WP_Session::get_instance();
		$table=$wp_session['seat_table'];
		$rowcount = $wpdb->get_var("SELECT COUNT(*) FROM $table where book ='Booked'");
		$wp_session['booked_seats']=$rowcount;
		echo "number of seats: ".$wp_session['booked_seats'];
	}//end function
/**************************************seats Long poll***************************/		
function seats_longpool(){
		global $wpdb;
		$wp_session = WP_Session::get_instance();
		if(!isset($wp_session['booked_seats'])){
				//  create table
				echo(json_encode(array( 'status' => 'no-results','counter'=>'error') ) );
				
			}
		$seats_count=$wp_session['booked_seats'];
		intval($seats_count);
		$table=$wp_session['seat_table'];
		$num_rows = $wpdb->get_var("SELECT COUNT(*) FROM $table where book ='Booked'");
		intval($num_rows);
		if($num_rows==$seats_count){
				//echo $num_rows;
				echo(json_encode(array( 'status' => 'no-results','counter'=>$num_rows) ) );
				//$wp_session['booked_seats']=$num_rows;
			}
		if($num_rows!=$seats_count){
				//table has had extrnal changes
				unset($wp_session['booked_seats']);
				$wp_session['booked_seats']=$num_rows ;
					//echo $num_rows;
				echo( json_encode( array( 'status' => 'results','counter'=>$num_rows) ) );
				
				}
			die(); 
		}
	add_action("wp_ajax_seats_longpool", "seats_longpool");
/****************************************obtaining payement details, email,amount etc to work with****************/
function purchase_session_vars(){
	$wp_session = WP_Session::get_instance();
	$wp_session['movie']=$_POST['movie'];
	//$wp_session['number_seats']=$_POST['number_seats'];
	//array of seats ids//still bugy
	$wp_session['total_sum']=$_POST['total_sum'];
	$wp_session['purchase_date']=$_POST['purchase_date'];
	$wp_session['cinema_room']=$_POST['cinema_room'];
	$wp_session['phone']=$_POST['phone'];
	$wp_session['email']=$_POST['email'];
	$wp_session['time']=$_POST['time'];
	$wp_session['conv']=$_POST['conv'];
	echo $wp_session['phone']." ".$wp_session['email']." conveniance fee: ".$wp_session['conv']." ".$wp_session['purchase_date'];
	die();
}
add_action("wp_ajax_purchase_session_vars", "purchase_session_vars");
$counter=0;
function read_mobile_mValues(){
		global $wpdb;
		global $counter;
		$checks=$_POST['m_checks'];
		$wp_session = WP_Session::get_instance();
		$reason=$wp_session['tracker'];
		$query="Select amount from mobilemoney where reason = '$reason'";
		$row=$wpdb->get_row($query ,ARRAY_A);
		$phone=$wp_session['phone'];
		$email= $wp_session['email'];
		
		if(!$row) {
			// if there is nothing in the mobile money message
			//doing the 80% check, get all the codes in the db which might match with this one
			recheck_money();
			// table for not worked on transactions, log in reason,time,email,phone
			if($counter>=20 && $checks>=5): //about 60secs
			$result=$wpdb->insert( 
					'system', 
				array( 
					'reason' =>$reason,'email'=>$email,'phone'=>$phone,
				), 
				array( 
					'%s', '%s','%s') 
					);	
			if(!$result){
					echo"ERROR REGISTERING SEAT IN TICKET DETAILS";
					}
			echo "m checks: $checks , php counter: $counter";
			?>
           	<div class="money_fail">
                <p class="fail_notice"><span>Oops!!!</span> No Money Found</p>
                <p>Chances are that the system is down, Your account will be credited when its up again</p>
            </div>
			<?php
			endif;
			//return false;
			}
			else{
				//print_r($row);
				$amount = $row['amount'];
				moneyVerify($amount);
			
			}// end else 
	
			//return  true;
		die();
		}
add_action("wp_ajax_read_mobile_mValues", "read_mobile_mValues");

function recheck_money(){
		global $wpdb;
		global $counter;
		$wp_session = WP_Session::get_instance();
		$current_time=date("Y-m-d H:i:s");
		$base_date=date('Y-m-d H:i:s', strtotime('-5 minutes'));
		//echo "we are in rechechk";
		//incase client miss typed reason code, get all reasons that have been put in the db in the past 5 mins
		$sql="Select reason from mobilemoney where time > '$base_date'";
		$row_reason=$wpdb->get_row($sql,ARRAY_A);
		if($row_reason){
			foreach($row_reason as $myreason):
				$reason_arr[]=$myreason;
				endforeach;
				//testing found reasons resemblance with current reason code
				$code=$wp_session['tracker'];
				foreach($reason_arr as $reason){
					$var_1 =$code;  //correct
					//$var_2 = $reason;
					$var_2 = (string)$reason;// from db 
					similar_text($var_1, $var_2, $percent); 
						if($percent>70){
							//means client mistyped reason code by 2 digits, so we go on
							$code=$reason;
							//recall method
							//echo "in pecentage check";
							$wp_session['tracker']=$reason;
							read_mobile_mValues();
						}//end if
					}//end inner for
		}//end outer if
		else{
			$counter++;
				if($counter<21):
				sleep(2);
				read_mobile_mValues();
				endif;
			}
 }// end function
function moneyVerify($myamount){
		//dis is money from the db, after clean up
		$money_raw = strstr($myamount, 'X');
		// remove x
 		$money	=substr($money_raw,1);
 		$money_sent=str_replace(',', '',$money);
		//this is money from the session variable
		$money_required=500;
		//echo "money required: ".$money_required."<br>";
		//echo "money sent: ".$money_sent."<br>";
		
		if($money_sent>=500){
			?>
          	<style>.shared_nav{dsiplay:none}</style>
			<li class="confirmation_content clearfix">
							<p id="notice">A confirmation SMS has been sent to your telephone as 
well as your email with a QR CODE and the ticket details.<br><span>Please show this QR CODE at the cinema ticket counter</span></p><br>
						<?php showQrcode(); ?>
							<h1>congratulations!!!</h1>
							<h2>your ticket purchase was <span id="success">successful</span></h2>
           	
          	<?php
				// show qr code in browser window
				//return true;
				}else{
				$money_less=$money_required-$money_sent;
				echo"Your money is less by {$money_less} do u want to send the remaining balance\n";
				//return false;
			}
		}
function Create_uniqueCode(){
	$bytes = openssl_random_pseudo_bytes(5, $cstrong);
	$hex  = bin2hex($bytes);
	return $hex;
	}
	
 function showQrcode(){
		$verificaton_code= Create_uniqueCode();
		$wp_session = WP_Session::get_instance();
		$wp_session['verification']=$verificaton_code;
		QRcode::png($verificaton_code,'allan.png'); 
		echo '<img  src=".\wp-admin\allan02.png">';
	}	
	//method for sending sms
function sendSms(){
	// log info  to db	echo "test:".$this->phone;
	echo "inserting into send confirmation";
	global $wpdb;
	$wp_session = WP_Session::get_instance();
	$mycode=$wp_session['tracker'];
	$myphone=$wp_session['phone'];
	$verificaton_code=$wp_session['verification'];
	//test
	$conv=100;
	//putting number to send confirmation to in  the db plus the reason, for use by sms gate way
	$result=$wpdb->insert( 
	'sendconfirmation', 
	array( 
		'reason' =>$mycode, 'phone' =>$myphone,'code'=>$verificaton_code,'conv'=>$conv
	), 
	array( 
		'%s', '%s','%s','%d') 
		);	
	if(!$result){
		echo"ERROR INSERTING VALUES IN SEND CONFIRMATION";
		}
}// end sendsms	
function taken_seat(){
	global $wpdb;
	$wp_session = WP_Session::get_instance();
	$table=$wp_session['seat_table'];
	$array=$wp_session['seats_array']->toArray();
	//update db that seat  has been taken
	//echo "<br> this is the table we are using: ".$table."<br>";
	foreach($array as $seat){
		//$escaped_seat=mysql_real_escape_string($seat);
		$results=$wpdb->update( 
						$table, 
						array( 
							'take' =>'Taken',	// string
							  ), 
						array('seat'=>$seat),
						array( '%s' )
						);
				}//end for each
		}//taken_seat
 //require("../PHPMailer-master/class.phpmailer.php"); 		
 function sendQrCode(){
		//getting unique code to put in the qr code
		$wp_session = WP_Session::get_instance();
		$verificaton_code=$wp_session['verification'];
		$qrdata=$verificaton_code;
		$to      = $wp_session['email'];
		$bytes = openssl_random_pseudo_bytes(3, $cstrong);
		$sufix= bin2hex($bytes);
		$image_name= 'qrimage_'.$sufix.'.png';
		ini_set("SMTP","ssl://smtp.gmail.com"); 
		ini_set("smtp_port","465"); //No further need to edit your configuration files.
		$mail = new PHPMailer();
		$mail->SMTPAuth = true;
		$mail->Host = "smtp.gmail.com"; // SMTP server
		$mail->SMTPSecure = "ssl";
		$mail->Username = "epicallan.al@gmail.com"; //account with which you want to send mail. 
		$mail->Password = "namatovu2014"; //this account's password.
		$mail->Port = "465";
		$mail->IsSMTP();  // telling the class to use SMTP
		$mail->AddAddress($to);
		$mail->Subject  = "QR code";
		$mail->Body    = 'qr code with your id';
		$mail->WordWrap = 200;
		//enter arguments
		QRcode::png($qrdata, $image_name); 
		$mail->addAttachment($image_name);  // Add attachments
		$mail->isHTML(true);                                 
		//checking if email is getting sent
		if(!$mail->Send()) {
		echo 'Message was not sent!.';
		echo 'Mailer error: ' . $mail->ErrorInfo;
		} else {
			//echo "message has been sent";
		}
	}

// call this method after person has paid
function write_purchaseDetails(){
	// obtain details about bought ticket
	//get seat number, movie name,users email, users phone number
	// seats is an array turn into a string
	global $wpdb;
	$wp_session = WP_Session::get_instance();
	$user_code=$wp_session['verification'];
	$movie = $wp_session['movie'];
	$date= $wp_session['date'];
	$cinema_room= $wp_session['cinema_room'];
	$phone=$wp_session['phone'];
	$email= $wp_session['email'];
	$movie= $wp_session['movie'];
	$time= $wp_session['time'];
	//enter purchase details in data base
	$array=$wp_session['seats_array']->toArray();
	foreach($array as $seat){
	$result=$wpdb->insert( 
	'ticket_details', 
	array( 
		'code' =>$user_code, 'movie' =>$movie,'cinema_room'=>$cinema_room,'date'=>$date,'time'=>$time,'seat'=>$seat,'phone'=>$phone,'email'=>$email
	), 
	array( 
		'%s', '%s','%s','%s','%s','%s','%s') 
		);	
		if(!$result){
				echo"ERROR REGISTERING SEAT IN TICKET DETAILS";
				}
			}
		}// end purchase details write

function process_sms_email(){
	//send confirmation sms
	sendSms();
	//mark seats as taken
    taken_seat();
	//regester ticket deatails in db
	write_purchaseDetails();
	// send email
	sendQrCode();
	die();
}
add_action("wp_ajax_process_sms_email", "process_sms_email");
/***********************seats Expire*****************************************************/
function expire(){
	// on expire unset the seats array
	$wp_session = WP_Session::get_instance();
	unset($wp_session);
	}// end expire	
add_action("wp_ajax_expire", "expire");
	
	
?>