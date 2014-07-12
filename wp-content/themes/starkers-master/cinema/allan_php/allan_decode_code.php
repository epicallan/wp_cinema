<?php
// create verify object
// user userId to get details o
//return details on ticket

require'allan_verify_purchase.php';
$decode=  new verify();
$_POST['code']=$input;
$decode->read_purchase_details($input);
echo $decode

?>