<?php
	header('Expires: 0');
	header('Last-Modified: ' . gmdate( 'D, d M Y H:i:s' ) . ' GMT');
	header('Cache-Control: no-store, no-cache, must-revalidate');
	header('Pragma: no-cache');
	?>
    <html>
	<head>
		<title>home</title>
		<link rel="stylesheet" href="styles/theme.css" media="screen"/>
	</head>
	<body>
    <div class="feature">
				<div class="feature_box">
					<ul class="feature_filter">
						<li><a href="">now showing</a></li>
						<li><a href="">coming soon</a></li>
					</ul>
					<a id="all_movies" href="">check out our full movie listing</a>
				</div>
				<ul class="feature_slider">
					
                 
					<li class="comingsoon">
                   
						<ul>
							
                            <?php
							
							require "allan_movie_list.php";
							$obj= new movie_list();
							$obj->create_movie_list();
							?>
							
                         </ul>
					</li>
				
                
                </ul>
			</div>
	<?php
?>