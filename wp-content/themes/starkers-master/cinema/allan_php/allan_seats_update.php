<?php
/*
*this script gets selected seat id, and then marks it as booked in the database
*it stores the list of the selected seats in a session variable
*/
require'allan_seats.php';
$update= new SeatSelection();
if($_POST['state']==0){
	//remove booked state 
	$update->reset_seats_booked();
			
			}else{
			
	if(isset($_SESSION['seats_array'])){
		if($_POST['bookState']=='NotBooked'){
			$ID=$_POST['id'];
			$book_state=$_POST['bookState'];
			$key = array_search($ID,$_SESSION['seats_array']);
			unset($_SESSION['seats_array'][$key]);
			
			$update->UpdateTable($ID,$book_state);
			session_write_close();
				}//end not booked
		if($_POST['bookState']=='Booked'){
			$ID=$_POST['id'];
			$book_state=$_POST['bookState'];
				// get new seat id
				$new_seat=$ID;
				//adding new element
				array_push($_SESSION['seats_array'],$new_seat);
				$update->UpdateTable($ID,$book_state);
			}// end booked
	}else{
		$ID=$_POST['id'];
		$book_state=$_POST['bookState'];
		$_SESSION['seats_array']=array($ID);
		$update->UpdateTable($ID,$book_state);
				}
			}
?>