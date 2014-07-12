<?php
require'allan_seats.php';

/*
*script checks wether seat was bought if not bought,its unbooked
*this scripts works per seat has nothing to do with the stored seats
*/
if(isset($_POST['expire'])){
	
	$expire= new SeatSelection();
	$expire->expire();
		
	
	}
	
?>