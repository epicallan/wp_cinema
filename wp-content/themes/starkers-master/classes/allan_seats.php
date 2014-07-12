<?php
	/*
	*rensposnible for creating the seats
	*When a movie is selected,its show date and time are used to 
	*query the correct table that contains its seats arrangement.
	*This table is then used to represents the seats for that movie
	*/
//require'allan_disable_cache.php'; 
require 'allan_db.php';

class SeatSelection{
	
	private $db;
	private $table;
	
	function __construct(){
		
		session_start();
		// make db connection
		$this->db=ConnectDB::Connect('cinema');
		//get table name for seats from session variable in the allan_seats_table_name.php
		$this->table= $_SESSION['seat_table'];
		
		
		}
	// obtain cinema room  using table name as id	
	function cinema_room(){
		$sql="select cinema_room from cinema_room_table where movie = '$this->table'";
		$results=mysql_query($sql,$this->db);
		$row = mysql_fetch_assoc($results);
		$cinema_room=$row['cinema_room'];
		$_SESSION['cinema_room']=$cinema_room;
		return $cinema_room;
		}
	function find_latest_time(){
	//$time=$time_check;
	//echo "this is current time: ".$time;
	$result = mysql_query("select time from $this->table");
	$storeArray = Array();
	while ($row = mysql_fetch_assoc($result)) {
		$storeArray[] =  $row['time'];  
	}
	asort($storeArray);
	$reindexed_array = array_values($storeArray);
	
	$length=sizeof($reindexed_array );
	$index=($length-1);
	//echo "this is the index: ".$index;
	$latest_time=$reindexed_array [$index];
	echo "this is latest time: ".$latest_time;
	$_SESSION['time']=$latest_time;
	return $latest_time;
	}//end function
		
		
	// creating seats table	
	function create_table(){
		// make call to db, finding number of rows
		$sql="select row from $this->table";
		$results=mysql_query($sql,$this->db);
		if(!$results){
			}else{
				while ($row = mysql_fetch_assoc($results)) {
				$storeArray[] =  $row['row']; 
					 }
			// getting number of unique rows
		$myrows = array_unique($storeArray);
		//$row_length=sizeof($myrows);
		// unique identifier to avoid unbooking by sam1 else;
		
		echo"<table class='table'> ";
		static $r=1;
		static $m=0;
			foreach($myrows as $v){
					echo"<tr> ";
						$sq="select seat,book,take from $this->table where row='$v'";
						$results_sets=mysql_query($sq,$this->db);
						while ($seat_rows=mysql_fetch_assoc($results_sets)) {
									$seatArr[]= $seat_rows['seat']; 
									$book[] =$seat_rows['book'];
									$taken[]=$seat_rows['take']; 
									}
						$letters = range('A','Z');
						echo"<td >$letters[$m]</td>";
						$m++;
						$r++;
							foreach($seatArr as $seat){
								static $k =0;
								$book_class=$book[$k];
								$take_class=$taken[$k];
								
								if($take_class=='Taken'){
									
									echo"<td ><a href='#'  class='$take_class' id='$seat' ></a></td>";
									
									}else{
										echo"<td ><a href='#$'  class='$book_class' id='$seat' ></a></td>";
										}
								
								
								$k++;
								}	
						echo"</tr>";
					// unset variables
					mysql_free_result($sq);
					$sq=null;
					$seatArr=null;
					}
			echo"<tr>";
			foreach (range(0,10) as $number) {
					
					if($number==0){
						echo"<td style=' opacity: 0;'>$number</td>";	
						}else{
					echo"<td >$number</td>";	}
				
				}

		echo"</tr>";
	echo"</table>";
		
		}//end else
	
	$this->find_seats();
	
	session_write_close();
	}// end create table
	
	function find_seats(){
		//$time=$time_check;
		
		$result = mysql_query("select seat from $this->table where book ='Booked' ");
		if(!$result){
			echo mysql_error();
			}
		$num_rows = mysql_num_rows($result);
		$_SESSION['booked_seats']=$num_rows;
		//echo "number of booked seats : ".$num_rows." table is :".$this->table;
		}//end function
	
	function reset_seats_booked(){
			//turn to notbooked in the db
	
		foreach($_SESSION['seats_array'] as $seat){
			//find out whether taken or not
			$q="select take from $this->table where seat='$seat'";
			$res=mysql_query($q,$this->db);
			$row=mysql_fetch_assoc($res);

			if($row['take']=='NotTaken'){
				$sql="UPDATE $this->table SET Book = 'NotBooked' where seat='$seat'";
						$results=mysql_query($sql,$this->db);	
						}
						if(!$results){
							//echo "reset each seat error: ".mysql_error($this->db);
							}else{
							//	echo 'reset in state of '.$seat. 'is: '.$row['take'];
							}
					}//end foreach
		//echo"..........unseting session seats variables....";	
		unset($_SESSION['seats_array']);
			//recall create seats
		}
	
	function UpdateTable($id,$book){
	
		$current_time=date("Y-m-d H:i:s");
		$q="UPDATE $this->table SET Book = '$book', time='$current_time' WHERE seat = '$id'";
		$results=mysql_query($q,$this->db);	
		if(!$results){
			echo "update error: ".mysql_error($this->db);
			//echo"there is a problem in this table".$this->table;
			}else{
				//render seats
				//print_r( $_SESSION['seats_array']);
				
				
				session_write_close();
				echo"<ul class='showseats' id='show1'>";
					foreach($_SESSION['seats_array'] as $seat){
						echo "<li><a href='#'>$seat</a></li>";
						}
				echo'</ul>';
				
			}
		}// end update
	// call function at start of creating table	
	function unbook_any($table,$expired){
		// unset session variables
		//unbook any seat that might be booked and not bought
		$q="UPDATE $table SET Book = 'NotBooked' WHERE time < '$expired'";
		//$sql="UPDATE $table SET Book = 'NotBooked' WHERE take = 'NotTaken'";
		//$res=mysql_query($sql,$this->db);	
		$results=mysql_query($q,$this->db);
		if(!$results){
			//echo "error in unbooking: ".mysql_error($this->db);
			}
	}	
	function expire(){
		// on expire unset the seats array
		foreach($_SESSION['seats_array'] as $seat){
			$q="select take from $this->table where seat='$seat'";
			$results=mysql_query($q,$this->db);	
			$row=mysql_fetch_assoc($results);
			if(!$row){
				mysql_error($this->db);
				echo "error";
				}
			if($row['take']=='NotTaken'){
				$sql="UPDATE $this->table SET Book = 'NotBooked' where seat='$seat'";
						$res=mysql_query($sql,$this->db);	
						}
						if(!$res){
							mysql_error($this->db);
							echo "error";
							}else{
								}
				}//end for each
		//unset session
		session_unset();
		}// end expire	
	
		

 
	}// end class

?>
