<?php

date_default_timezone_set('Africa/Nairobi');

class long_poll{
	private $db;
	private $table;
	
	function __construct(){
		session_start();
		// make db connection
        $host="localhost";
		$username="root";
		$password="allan";
		$con = mysql_connect($host,$username,$password);
		if($db= mysql_select_db('cinema',$con)){
			//echo "connected sucessfully";
			}else{
				//echo mysql_error($db);
				}
		
        $this->db=$db;
		//get table name for seats from session variable in the allan_seats_table_name.php
		$this->table= $_SESSION['seat_table'];
		//echo "this is the tabble we are using: ".$this->table;
	
		}
	
		
		
		function seats_longpool(){
			
			if(!isset($_SESSION['booked_seats'])){
				//  create table
				echo 'nt sent';
				//require 'allan_seats_write.php';
				
				}
			$seats_count=$_SESSION['booked_seats'];
		
			$result = mysql_query("select seat from $this->table where book ='Booked' ");
			$num_rows = mysql_num_rows($result);
			
			if($num_rows==$seats_count){
				//echo $num_rows;
				echo(json_encode(array( 'status' => 'no-results','counter'=>$num_rows) ) );
				//$_SESSION['booked_seats']=$num_rows;
			}
			if($num_rows>$seats_count){
					//get the new time
					 unset($_SESSION['booked_seats']);
						$_SESSION['booked_seats']=$num_rows ;
					//	echo $num_rows;
						echo( json_encode( array( 'status' => 'results','counter'=>$num_rows) ) );
						//create table
						//require 'allan_seats_write.php';
				}
			if($num_rows<$seats_count){
					//get the new time
					 unset($_SESSION['booked_seats']);
						$_SESSION['booked_seats']=$num_rows ;
					//	echo $num_rows;
						echo( json_encode( array( 'status' => 'results','counter'=>$num_rows) ) );
						// create table
						require 'allan_seats_write.php';
				}
			}

		function long_polling(){
			$time=$_SESSION['time'];
			$result = mysql_query("select time from $this->table where time > $time");
			$num_rows = mysql_num_rows($result
			);
			if($num_rows==0){
				
				echo( json_encode( array( 'status' => 'no-results','time'=>$time) ) );
				
			}
			if($num_rows>1){
					//get the new time
					unset($_SESSION['time']);
					while ($row = mysql_fetch_assoc($result)) {
						$storeArray[] =  $row['time'];  
						}
						asort($storeArray);
						$reindexed_array = array_values($storeArray);
						$length=sizeof($reindexed_array );
						$index=($length-1);
						$latest_time=$reindexed_array [$index];
						$_SESSION['time']=$latest_time;
						echo( json_encode( array( 'status' => 'results','time'=>$latest_time) ) );
				}
			
			}//end long_poll function


}//end class

	if(isset($_POST['time'])){
		
		$poll= new long_poll();
		
		$poll->seats_longpool();
	//	echo "heeeeeeeeee";
		
	}
	
	
?>



