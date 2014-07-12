<?php
/*header('Expires: 0');
header('Last-Modified: ' . gmdate( 'D, d M Y H:i:s' ) . ' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');*/
session_start();
session_unset();
require'allan_seats.php';

if(isset($_POST['name'])){
	

		$date=$_POST['date_row'];
		$time=$_POST['time'];
		$movie=$_POST['name'];
		//change date format to usable
		$new_date = date('Y-m-d', strtotime($date)); 
		$date_formated=str_replace("-","",$new_date);
		$time=str_replace(":","",$time);
		//get table name
		$table_name=$movie.$date_formated.$time;
		$_SESSION['seat_table']=$table_name;
		 // getting track code
	//	$_SESSION['tracker']=create_track_Code();
		for ($i = 0; $i<6; $i++) 
				{
					$a .= mt_rand(0,9);
				}
	
	
		$_SESSION['tracker']=$a;
		$proceed=array('proceed'=>1,'reason'=>$_SESSION['tracker'],'table'=>$table_name);
		$jason=json_encode($proceed);
		echo $jason;
		$obj=new SeatSelection();
		//master reset
		$obj->unbook_any($table_name);
		//$time=$obj->find_latest_time();
			//get time 5 minutes back
		$current_time=date("Y-m-d H:i:s");
		
	$base_date=date('Y-m-d H:i:s', strtotime('-5 minutes'));
	$obj->unbook_any($table_name,$base_date);
		
			
		session_write_close();
		
	}
	function create_track_Code(){
	// check if code exist	
		$bytes = openssl_random_pseudo_bytes(3, $cstrong);
		$hex  = bin2hex($bytes);
		
		return $hex;
		
	}// end createcode
	session_write_close();



		
?>