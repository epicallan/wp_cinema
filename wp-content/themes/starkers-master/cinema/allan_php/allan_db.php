<?php
date_default_timezone_set('Africa/Nairobi');
class ConnectDB{
	
	
	 static public function Connect($database){
		$host="localhost";
		$username="root";
		$password="allan";
		$con = mysql_connect($host,$username,$password);
		$db= mysql_select_db($database);
		
		if(!$db){
			echo "could not connect to db ".mysql_error();
		
		return $con;
		}
		else{
			//echo "connected to{$database}"."<br>";
			}
		
		// ping mysql to check if mysql is live	
		if (!mysql_ping ($con)) {
	   		mysql_close($con);
			$con = mysql_connect($host,$username,$password);
			mysql_select_db($database,$con);
		}
		return $con;
		}// end connect
		
		

		static public function disconnect($con){
		
		
		mysql_close($con);
		
		}// end disconnect
		
	
	}// end of class
	
	
?>