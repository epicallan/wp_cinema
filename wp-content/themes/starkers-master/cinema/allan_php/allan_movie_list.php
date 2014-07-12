<?php
/*
*get list of movies that were posted 3 weeks back from data base
*store in array
*place them in a ul tag
*attach classes
*/
require 'allan_db.php';
class movie_list{
	private $db;
	private $table;
	private $date;
	private $showing;
	private $coming;
	function __construct(){	
		// intialise db
		$this->db=ConnectDB::Connect('cinema');
		// get todays date, all movies shown on the web should have 
		//show dates starting from today and into the future
		$base_date= date('Y-m-d',strtotime('-50 day'));
		$this->date=$base_date;
		$this->showing=date('Y-m-d', strtotime('-30 day'));
	}//end constructor
	function create_movie_list($class){
		//show date should be greater than current date, ie the show date should be in the future
		$sql="select * from wp_movie_list where date >= '$this->date' ";
		$results=mysql_query($sql,$this->db);
			if(!$results){
				echo mysql_error($this->db);
				}else{
					while($row = mysql_fetch_assoc($results)) {
						$store_dates[]=$row['date'];
						$store_src[] =  $row['image_refs'];  
						$store_names[] =  $row['movie'];  
						}
					}//end else
			//finding src for each movie,movie names are alts for the posters
			
				 
			
			echo "<ul class=".$class.">";	
			//sort movies, so that movie added recently show
			krsort($store_src);
			//obtain last key
			foreach($store_src  as $key => $src){
			 
				if($src!=null){
					$movie=$store_names[$key];
					$date=$store_dates[$key];
					$i++;
					
					if($class=='bxslider'){
						
							echo "<li class= \"slides first\" id=\"slide$i\" > <img src=\"$src\" alt=\"$movie\">
								
								<div class=\"focus_slider div$i\" id=\"$movie$i\">
									
								<ul class=\"focus_details\" id=\"$key$movie\" >
								<li class='fix_bck'>
									<div class='focus'>
											<ul>
												<li class='i_t_s'>
														<ul>
															<li class='synopsis'><a href='#' title='synopsis'>see info</a></li>
															<li class='trailer'><a href='#' title='trailer'>watch trailer</a></li>
															<li class='share'><a href='#' title='share'>share</a></li>
														</ul>
													</li>
													<li class='buy'><a href='#' name=\"$movie\" title='buy' class =\"book $src\" class =\"$movie\" ><span class='ticket_icon'></span>buy ticket</a></li>
												</ul>
											</div>
									</li>
								
								</ul>
								
								
								</div>
								";
							 	echo"</li>";
								}else{
								//buttons images for the movie grid
								echo "<li><img src='$src' alt='$movie'><input type='button' class ='book' 
								name='$movie' id ='$movie' value='book' />";
								echo"</li>";
							
							}
						
				}//end if
				
			}//end for
		
			echo "</ul>";
				
			}// end create movie list
	//we are getiing the movie name via ajax		
	function movie_details($movie_name){
		//query db for those movie details
		$sql="select date,time,cinema_room,amount from movie_details where movie ='$movie_name' ";
		$results=mysql_query($sql,$this->db);
			if(!$results){
				echo mysql_error($this->db);
				}else{
					while ($row = mysql_fetch_assoc($results)) {
						$date[]= $row['date'];
						$time[]=$row['time'];
						$cinema_room []=$row['cinema_room'];
						$amount[]=$row['amount'];
						}
					}//end else
				
				//find current date
				$today= date("j M Y");
		// changing date format, and getting intial date, which is todays date
				$new_default_date = date("j M Y", strtotime($today)); 
				$dateparts=explode(" ",$new_default_date);
				$day=$dateparts[0];
				$month=$dateparts[1];
				$year=$dateparts[2];
				// intial dates and time	
				if(($day)<10){
					$day='0'.$day;
					}
				
				?>
                
                
   			 <div class="date fleft">
               <h3>date</h3>
				<ul class="day">
                    <li class="num"><?php echo $day?></li>
                    <li id="mm">
                        <ul>
                            <li class="month"><?php echo $month?></li>
                            <li class="year"><?php echo $year?></li>
                        </ul>
                    </li>
                    <li><a id="calendar" href="#">calendar</a></li>
                  </ul>
             	</div>
				<?php
				//putting dates in a calender
				 $j=0;
				
				$myrows = array_unique($date);
				asort($myrows);
				echo '<ul class="showdates">';
				
				foreach($myrows  as $mydate){
					//get dates put them in lis
					$new_date = date("D j M Y", strtotime($mydate)); 
					$dateparts=explode(" ",$new_date);
					$day=$dateparts[0];
					$date=$dateparts[1];
					$month=$dateparts[2];
					$year=$dateparts[3];
					$date_amount=$amount[0];
					$organised_date=$day.' '.$date.' '. $month.' '. $year;
					// date determines movie price, so we are going to store that as in the id attribute of the a tag
					echo "<li><a href='$organised_date' id='$date_amount' class='date_amount'>
				 		".$day." ". $date."</a>
					</li>";
					//echo "<li><a href='$day $date $month $year' id='$date_amount' class='date_amount'>". $day."</a>";
					$j++;
					}//end for each
			echo '<li>  <img src="../dev/images/pointer.png"/></li>';
				echo "</ul>";	
				// end calender 
				?>
				 <div class="time fleft">
					<h3>showtime</h3>
                    <ul>
                    <li><h1 class='current_time'></h1></li>
					<li><a id="clock" href="#">showtimes</a></li>
					</ul>
                    
                  </div>
					<?php
						
					$mytime_arr = array_unique($time);
					echo '<ul class="showtimes">';
					 echo '<li>  <img src="../dev/images/pointer.png"/></li>';
                    $k=0;
                    foreach($mytime_arr as $mytime){
                        $room=$cinema_room[$k]; 
                        //get time put in lis
                         echo "<li class='$organised_date'><a href='$room' class='time_vals' id='$mytime'>". $mytime."</a></li>";
                        ++$k;
                        }//end for each
                       
                    echo "</ul>";	
                // end time selector
                    ?> 
                  </div>   
               	 <?php	
					
		}// movie details		
}// end class
?>
