<?php
	require'allan_seats.php';

	if(isset($_POST['create'])){

			$create = new SeatSelection();
			$create->create_table();
			
		}

?>
