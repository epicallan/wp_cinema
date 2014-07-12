<?php
	
	require "allan_movie_list.php";
	$details= new movie_list();
	// obtaining result from ajax post
	if(isset($_POST['movie'])){
		$name= $_POST['movie'];
		$details->movie_details($name);
	
		}
	
?>