<?php

require 'allan_db.php';
include("../phpqrcode/phpqrcode.php");
require("../PHPMailer-master/class.phpmailer.php"); 
session_start();
class verify{
	// fields
	private $code;
	private $amount;
	private $email;
	private $phone;
	private $db;
	private $conv;
	private $verificaton_code;
	function __construct(){
			
	    $this->code=$_SESSION['tracker'];
		$con=ConnectDB::Connect("cinema");
		$this->db= $con;
		$this->email=$_SESSION['email'];
		$this->phone=$_SESSION['phone']	;
		$unique_code=$this->Create_uniqueCode();
		$this->verificaton_code=$unique_code;
		$this->conv=$_SESSION['conv'];
		
		//echo"we are in verify our track code is :".$this->code ." <br>";
		//echo "email:".$this->email;
		}
//method to check if there is mobile money reason code for a specifed time stamp and if its close to the current reason code
	function recheck_money(){
		$current_time=date("Y-m-d H:i:s");
		$base_date=date('Y-m-d H:i:s', strtotime('-5 minutes'));
		$sql="Select reason from mobilemoney where time > '$base_date'";
		$res=mysql_query($sql,$this->db);
		$row_reason=mysql_fetch_assoc($res);
		$reason_arr[]=$row_reason['reason'];
		foreach($reason_arr as $reason){
			$var_1 =$this->code;  
			$var_2 = $reason;
			similar_text($var_1, $var_2, $percent); 
				if($percent>70){
					//means client mistyped reason code by 2 digits, so we go on
					$this->code=$reason;
					$this->read_mobile_mValues();
				}
		}
		
		}
	function read_mobile_mValues(){
		
		$q="Select amount from mobilemoney where reason = '$this->code'";
		$result=mysql_query($q,$this->db);
		$row = mysql_fetch_assoc($result);
	
		if(mysql_num_rows($result) == 0) {
			//doing the 80% check, get all the codes in the db which might match with this one
			$this->recheck_money();
			// if nothing again
				if(mysql_num_rows($result) == 0){
			
						?>
						<div class="money_fail">
							<p class="fail_notice"><span>Oops!!!</span> No Money Found</p>
							<p> Please click the process button again</p>
						</div>
						<?php
                        }
			return false;
			}
			else{
				// getting row money value and phone for a purchase		
				$this->amount = $row['amount'];
				mysql_free_result($q);
				//echo "we have got your money"."<br>";
				//call the method to check whether that is the right amount sent
				$this->moneyVerify();
			}// end else
	
			return  true;
	
		}
	// method to clean up values from read
	function clean_up (){
		// getting money string
		$money_raw = strstr($this->amount, 'X');
		// remove x
		$money	=substr($money_raw,1);
		$amount=str_replace(',', '',$money);
		//echo"Your money is {$amount} "."<br>";
		return $amount;
		}
	// money required provided by tracker class
	function moneyVerify(){
		//dis is mone from the db, after clean up
		$money_sent=$this->clean_up();
		//this is money from the session variable
		$money_required=500;
		
		//echo "money required: ".$money_required."<br>";
		//echo "money sent: ".$money_sent."<br>";
		
		if($money_sent>=500){
			?>
            <script>
			$(document).ready(function() {
				$('.shared_nav').hide();
			});
			</script>
			<li class="confirmation_content clearfix">
							<p id="notice">A confirmation SMS has been sent to your telephone as 
well as your email with a QR CODE and the ticket details.<br><span>Please show this QR CODE at the cinema ticket counter</span></p><br>
						<?php $this->showQrcode(); ?>
							<h1>congratulations!!!</h1>
							<h2>your ticket purchase was <span id="success">successful</span></h2>
           	
          	<?php
				// show qr code in browser window
				
				return true;
				}else{
				$money_less=$money_required-$money_sent;
				echo"Your money is less by {$money_less} do u want to send the remaining balance\n";
				}
		}
		
	//method for sending sms
	public function sendSms(){
		// log info  to db	echo "test:".$this->phone;
		$mycode=mysql_real_escape_string($this->code);
		$myphone=mysql_real_escape_string($this->phone);
		//test
		$conv=100;
		//echo "sms confirmation will be coming to you in a moment at {$myphone}";
		//putting number to send confirmation to in  the db plus the reason, for use by sms gate way
		$q= "Insert into sendConfirmation (reason,phone,code,conv) values(
				'$mycode','$this->phone','$this->verificaton_code',$conv)";
		$result=mysql_query($q,$this->db);
		
		mysql_close($this->db);
		if(!$result){
			echo mysql_error($this->db);
			}
		}// end sendsms
	//this is the code  that will be placed in the qr code
	public function Create_uniqueCode(){
		//create unique code
		// check if code exists in db
		
			$bytes = openssl_random_pseudo_bytes(5, $cstrong);
			$hex  = bin2hex($bytes);
			
		
		return $hex;
	}
	
	public function showQrcode(){
		QRcode::png($this->verificaton_code,'allan02.png'); 
		echo '<img  src=allan02.png>';
		}	
	public function sendQrCode(){
			//getting unique code to put in the qr code
			$qrdata=$this->verificaton_code;
			$to      = $this->email;
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
			$mail->Password = "namatovu2011"; //this account's password.
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
				echo "message has been sent";
			}
		}
		
	
	
	// call this method after person has paid
	public function write_purchaseDetails(){
		// obtain details about bought ticket
		//get seat number, movie name,users email, users phone number
		
		// seats is an array turn into a string
		$movie =$_SESSION['movie'];
		$date=$_SESSION['date'];
		$cinema_room=$_SESSION['cinema_room'];
		$phone=$this->phone;
		$email=$_SESSION['email'];
		$movie=$_SESSION['movie'];
		$time=$_SESSION['time'];
		// creating unique code to identify this purchase
		$user_code= $this->verificaton_code;
		//enter purchase details in data base
		foreach($_SESSION['seats_array'] as $seat){
			$q="insert into ticket_details(code,movie,cinema_room,
			date,time,seat,phone,email)values(
			'$user_code','$movie','$cinema_room','$date','$time','$seat','$phone','$email')";
			$result=mysql_query($q,$this->db);
				if(!$result){
					echo mysql_error($this->db)."ERROR REGISTERING SEAT IN TICKET DETAILS";
					
					}
				}
		
		
		}// end purchase details write
	//this method used in decoding the value in the qr code 
	public function read_purchase_details($code){
		// read from db
		$q="select * from ticket_details where code='$code'";
			$result=mysql_query($q,$this->db);
		if(!$result){
			echo mysql_error($this->db);
			}else{
		// obtain row
			$row=mysql_fetch_assoc($result);
			?>
			<p>Movie title is : <?php echo $row['movie']?></p>
			<p>Cinema room is : <?Php echo $row['cinema_room'] ?></p>
			<p>seat number is : <?php echo $row['seat']?></p>
			<p>movie date is : <?php echo $row['date']?></p>
			<p>movie Time is : <?php echo $row['time']?></p>
			<p>Phone number is : <?php echo $row['phone']?></p>
			<p>email id is : <?php echo $row['email']?></p>
			<?php
			}
		}		
	/*
	*this method is rensponsible for verifying that a seat has been bought
	*when you chose a seat its id is stored in the seat_id session variable, and you go ahead and pay for it,
	*this method gets the stored seat and is marked as taken
	*/		
	public function taken_seat(){
		//update db that seat  has been taken
		$table=$_SESSION['seat_table'];
		echo "<br> this is the table we are using: ".$table."<br>";
		foreach($_SESSION['seats_array'] as $seat){
			$escaped_seat=mysql_real_escape_string($seat);
			$sql="UPDATE $table SET take = 'Taken' WHERE seat = '$escaped_seat'";
			$res=mysql_query($sql,$this->db);	
						if(!$res){
							mysql_error($this->db);
							echo "error marking seat : ".$escaped_seat ."as taken";
							}else{
								echo 'success seat marked  : '.$escaped_seat .'as taken';
								}
				}//end for each
			}//taken_seat
}// end class

?>
