<?php
	require'allan_verify_purchase.php';
	if(isset($_POST['verify'])){
	$verify= new verify();
	$verify->read_mobile_mValues();
	
	}
?>