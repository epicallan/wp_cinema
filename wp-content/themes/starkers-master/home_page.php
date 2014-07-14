<?php
/*
 * Template Name: Home page
 * Description: A Page Template For the home page.
 */
?>
<?php if ( have_posts() ): ?>
<?php while ( have_posts() ) : the_post(); 
	$args = array( 'post_type' => 'attachment',  'numberposts' => -1,  'post_status' => null, 'post_parent' => $post->ID );
    $attachments = get_posts( $args );
     if ( $attachments ) {
        foreach ( $attachments as $attachment ) {
         $bck=$attachment->guid;
			}
     }
endwhile; 
 endif; ?>
<?php
$type = 'movie';
$args=array('post_type' => $type,'post_status' => 'publish','posts_per_page' => -1,'ignore_sticky_posts"'=> 1);
global $post;
$movie= new WP_Query($args);
if( $movie->have_posts() ) {while ($movie->have_posts()) : $movie->the_post(); 
 $ids[]=get_the_ID();
 $name= get_the_title();	
 $store_names[]=$name;
 //getting cinema room
 $cinema= get_post_meta( get_the_ID(), 'movie_select', true );
 $cinema_arr[]=$cinema;
//getting movie start date
 $start= get_post_meta( get_the_ID(), 'movie_start_date', true );
 $startdate[]=$start;
 //getting end date
 $end= get_post_meta( get_the_ID(), 'movie_end_date', true );
 $enddate[]=$end;
 //getting youtube url movie_text
  $url= get_post_meta( get_the_ID(), 'movie_text', true );
  $link[]=$url;
 //getting movie times
 $data= get_post_meta( get_the_ID(), 'movie_repeatable', true );
	foreach ($data as $val){
			foreach($val as $val2){
				$time_array[] = $val2;
			 }
		}

 //getting images
 $args = array( 'post_type' => 'attachment',  'numberposts' => -1,  'post_status' => null, 'post_parent' => $post->ID );
 $attachments = get_posts( $args );
     if ( $attachments ) {
        foreach ( $attachments as $attachment ) {
         $src=$attachment->guid;
		 $images[]=$src;
		   }
     }

endwhile;
}
//find current date
	$today= date("j M Y");
// changing date format, and getting intial date, which is todays date
	//$new_default_date = date("j M Y", strtotime($today)); 
	$dateparts=explode(" ",$today);
	$day=$dateparts[0];
	$month=$dateparts[1];
	$year=$dateparts[2];
	$time=date("h:i");
	// intial dates and time	
	if(($day)<10){
		$day='0'.$day;
		}

wp_reset_query();  
?>
<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header') ); ?>

    <div class="ticket_container">
		<ul class="ticket">
    <li class="details fleft">
        <ul id="tabs">
        <ul class="breadcrumbs">
        			<li class='count_down'>
                        	<h4>Count Down To Session Expire</h4>
                     		<div class='time_container'><h4 class="getting-started"></h4></div>
                    	</li>
                <h3>Your Ticket</h3>
                        <li><a href="#tab1" >1. Pick a Time & Date</a></li>
                        <li><a href="#seats_contentID">2. Choose a Seat</a></li>
                        <li><a href="#phone_email_li">3. Make your Payment</a></li>
                        </ul>
              <li class="content clearfix" id="tab1">
                                <div class="myframe">
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
                                <ul class="showdates"><li><input type="text" name="date" id="date" readonly="readonly" size="12" class="calender_input"/></li></ul>
                                   <div class="time fleft">
                                        <h3>showtime</h3>
                                        <ul>
                                        <li><h1 class='current_time'><?php echo $time?></h1></li>
                                        <li><a id="clock" href="#">showtimes</a></li>
                                        </ul>
                                      </div> 
                                   <ul class="showtimes"></ul>
                                </div>
                                <div class="tickets fleft">
                                        <h3>tickets</h3>
                                        <ul id="tickets">
                                            <li class="number adults">
                                                <h4>adults</h4>
                                                <h1>00</h1>
                                                <ul>
                                                    <li><a id="remove_adults" class='remove' href="#">remove</a></li>
                                                    <li><a id="add_adults" class='add' href="#">add</a></li>
                                                   </ul>
                                            </li>
                                            <li class="number kids">
                                                <h4>kids</h4>
                                                <h1>00</h1>
                                                <ul>
                                                    <li><a id="remove_kids" class='remove' href="#">remove</a></li>
                                                    <li><a id="add_kids" class='add' href="#">add</a></li>
                                                    
                                                </ul>
                                            </li>
                                        </ul>
                                        
              
                                <div class="costing fleft">
                                    <h3>pricing</h3>
                                    <table>
                                        <tr class="ticket_fee">
                                            <td>adults</td>
                                            <td class="second" id="amount"></td>
                                        </tr>
                                        <tr class="ticket_fee">
                                            <td>kids</td>
                                            <td class="second" id="amount_kids"></td>
                                        </tr>
                                        <tr class="convenience_fee">
                                            <td>convenience fee</td>
                                            <td class="second" id="conveniance_fee"></td>
                                        </tr>
                                        <tr class="total_fee">
                                            <td class="first">total cost</td>
                                            <td class="second_total" id="total"></td>
                                        </tr>
                                    </table>
                                </div>
                                 </div>   
                                <ul class="ticket_nav clearfix" >
                              		<li class='error_container'></li>
                                    <li><a class="reset" id="reset_01" href="#">reset</a></li>
                                    <li><a class="frwd" href="#" id="next_01">next</a></li>
                                </ul>
                               </li>   
                               <li class="seats_content clearfix" id="seats_contentID">
                                            <ul class="key">
                                             <li><span class="key_available"></span>available</li>
                                            <li><span class="key_unavailable"></span> unavailable</li>
                                            <li><span class="key_selected"></span>selected</li>	
                                            </ul>
                                            <ul class="seat_chart ">
                                                <li>
                                                    <img src="../dev/images/screen.png"/>
                                                 </li>
                                                <li>
                                                <div class="tableDiv"></div>  
                                                </li>
                                            </ul>
                                     <ul class="ticket_nav  nav02 clearfix" id="nav02">
                                     	<li class='error_container'></li>
                                        <li><a class="bck" href="#" id="prev_02">previous</a></li>
                                        <li><a class="reset" id="reset_02" href="#">reset</a></li>
                                        <li><a class="frwd" href="#"  id="next_02">next</a></li>
                                      
                                </ul>   
                           </li>           
                <li class="payment_content clearfix" id="phone_email_li">
                                    <form method="post" id="contacts">
                                    <fieldset class="contact_info">
                                        <ul>
                                            <li class="fieldContainer">
                                                 <label for="phone">Telephone number:</label>
                                                <input id="phone" type="text" name="phone" placeholder="0773 123 456"  required />
                                        
    
                                            </li>
                                            <li class="fieldContainer">
                                                 <label for="email">email address</label>
                                                    <input id="email" type="text" name="email" placeholder="email@email.com" required/>
                                                </label>
                                            </li>
                                        </ul>
                                    </fieldset>
                                    <fieldset class="payment">
                                        <ul>
                                            <li class="method">
                                                <label for="pay_method"><span>payment method</span></label>
                                                    <select name="payment_method" id="pay_method">
                                                        <option value="mobile_money" selected>mobile money</option>
                                                        <option value="mobile_banking">mobile banking</option>
                                                        <option value="other">other</option>
                                                    </select>
                                            </li>
                                            <li class="client">
                                                <label for="pay_client"><span>payment client</span></label>
                                                    <select name="payment_client" id="pay_client">
                                                        <option value="mtn" selected>mtn</option>
                                                        <option value="airtel">airtel</option>
                                                        <option value="utl">utl</option>
                                                        <option value="orange">orange</option>
                                                    </select>
                                            </li>
                                        </ul>
                                    </fieldset>
                                <!--<input type="submit" class="submit" id="details_submit" name="details_submit" value="Process"/>-->
                                </form>
                                
                                  <ul class="ticket_nav nav02 clearfix" id="nav03">
                              	
                                    <li><a class="bck" href="#" id="prev_03">previous</a></li>
                                    <li><a class="reset" id="reset_03" href="#" style="display:none">reset</a></li>
                                    <li><a class="frwd submit" href="#"  id="next_03">next</a></li>
                                </ul>    
                              
                                    
                            </li>
                  <li class="payment_details clearfix" id="payment_details">
                                <p id="notice">use the details below to send your mobile money payment for the ticket purchase</p><br>
                                <ul class='process'>
                                    <li>
                                        <ul class="amount">
                                            <li id="txt">
                                                total amount to send<br><span>(inclusive of mobile money charges)</span>
                                            </li>
                                            <li id="amount"><p>132,000 ugx</p></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul class="reason">
                                            <li id="txt">user id (reason)</li>
                                            <li id="reason"><p>cag0001</p></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul class="receiver">
                                            <li id="txt">number to send to</li>
                                            <li id="receiver"><p>o78 4 555 123</p></li>
                                        </ul>
                                    </li>
                                </ul>
                               
                               <div class="shared_nav">
                           <!--     <input type="submit" class="submit process_ticket" name="process"  id="process" value="Process Ticket">--->
                              	<ul class=" clearfix" id="nav04">
								<li><a class="bck" href="#" id="prev_04">Back</a></li>
								</ul>    
                                </div>
                        
                   			</li>
                   <li>
                      <div class="purchase_reset">
                       	<h4>Your session has expired</h4>
                        <input type="button" name="book_again"  id="book_again" value="Book Again">
                        <input type="button" name="quit"  id="quit" value="quit">
                       </div>
                               
                     </li> 
                      <li>
                          <div class="purchase_disclaimer">
                                <h4>Disclaimer</h4>
                                <p>Please enter the following mobile money details CAREFULLY.</p>
                                <p>By clicking the proceed button, you take on any liability that may arise as a result of feeding in the details wrongly</p>
                                <input type="button" name="proceed"  id="d_proceed" value="proceed">
                                <input type="button" name="abort"  id="abort" value="abort">
                           </div>
                               
                     </li> 
                        <li>
                       
                          	<div id="verify_container"></div>
                           
                        </li>  
                 </ul>
             
                 	 </li>
        <li class="stub fleft">
               		<div class="bg_img"><img src="../development/images/t-bkg.jpg"></div>
					<div class="opacity"></div>
					<ul class="stub_details">
                    	
                <li class="close"><a href="#">X</a></li>   		 
				
                        
						<li class="stub_movie">
							<h4>movie</h4>
							<h3 class="movie_name"></h3>
						</li>
						<li class="stub_cinema">
							<h4>cinema</h4>
							<h3>3d cinema magic</h3>
						</li>
						<li class="stub_theatre">
                        	<h4>showroom</h4>
							<h3 class="showroom">N/A</h3>
						
						</li>
						<li class="stub_time">
							<h4>showtime</h4>
							<h3 class='showtime'>N/A</h3>
						</li>
						<li class="stub_date">
							<h4>date</h4>
							<h3 class="date_right"></h3>
						</li>
						<li class="stub_tickets">
							<h4>tickets</h4>
							<h3>0</h3>
						</li>
						
						<li class="stub_price">
							<h4>price</h4>
							<h3>0 UGX</h3>
						</li>
                     
                     	
                      <li class="stub_seat">
                     	 <h4>seat</h4>
                      		<div class="seats_container">N/A</div>
                            
                            </ul>
							
							
						</li> 
                       
					</ul>
		</li>               
        </ul>
	</div>
	<div id="intial_home">
			<img id="bkg" src="<?php echo $bck; ?>"/>
			<div id="vignette"></div>
	</div>
	<div class="search">
			<form method="post" action="/search" id="search" >
			<input name="search movies" type="text" size="40" placeholder="Search movies..."/>
			</form>
			</div>
	<div class="overlay"></div>
    <div class="feature">
		<div class="feature_box">
					<ul class="feature_filter">
						<li><a class ='test' href="">now showing</a></li>
						<li><a href="">coming soon</a></li>
					</ul>
                    <div id="hide"></div>
					<a id="all_movies" href="">check out our full movie listing</a>
				</div>
		<div class="feature_slider">
                <ul class="bxslider">
					<?php
					$i=0;
				foreach($images as $key => $src){
			 		$movie=$store_names[$key];
					$date=$startdate[$key];
					$i++;
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
													<li class='buy'><a href='#' name=\"$movie\" title='buy' class =\"book $src\" id=\"$ids[$key]\" ><span class='ticket_icon'></span>buy ticket</a></li>
												</ul>
											</div>
									</li>
								</ul>
							</div>";
					}//end for
				 ?>
                  </ul> 
				</div>
	</div>
<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>
