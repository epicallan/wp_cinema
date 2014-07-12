<?php
include("../phpqrcode/phpqrcode.php");
     
    // outputs image directly into browser, as PNG stream 
	
		QRcode::png('122','allan02.png'); ;
		 ?><img  src='allan02.png' width="200" height="200" >;
         <?php
	
	?>