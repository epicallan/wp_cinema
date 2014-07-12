<?php
require'allan_verify_purchase.php';
$process= new verify();
	//send confirmation sms
	$process->sendSms();
	//mark seats or seat as taken
	$process->taken_seat();
	//write ticket details to db
	$process->write_purchaseDetails();
	// send email
	$process->sendQrCode();
?>