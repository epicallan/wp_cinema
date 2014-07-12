
<?php
// store all values concerning purcase in session variables here
 	session_start();
 	if(isset($_POST['total_sum'])){
	echo "we are in session store: "	;
	$_SESSION['movie']=$_POST['movie'];
	$_SESSION['number_seats']=$_POST['number_seats'];
	//array of seats ids//still bugy
	$_SESSION['total_sum']=$_POST['total_sum'];
	$_SESSION['purchase_date']=$_POST['date'];
	$_SESSION['cinema_room']=$_POST['cinema_room'];
	$_SESSION['phone']=$_POST['phone'];
	$_SESSION['email']=$_POST['email'];
	$_SESSION['time']=$_POST['time'];
	$_SESSION['conv']=$_POST['conv'];
	echo$_SESSION['phone']." ".$_SESSION['email']." conveniance fee: ".$_SESSION['conv']." ".$_SESSION['purchase_date'];
	//$test=$_SESSION['seats_array'];
	session_write_close();	
	}

?>