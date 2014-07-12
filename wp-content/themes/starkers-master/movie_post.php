 <?php
 //register post type hook
	add_action( 'init', 'my_custom_post_movie');
	//hook for customising the help messages
	//hook for adding tax
	add_action( 'init', 'my_taxonomies_movie', 0 );

// regester the post type function
function my_custom_post_movie() {
	//labels	
	$labels = array(
		'name'               => _x( 'Movie', 'post type general name' ),
		'singular_name'      => _x( 'Movie', 'post type singular name' ),
		'add_new'            => _x( 'Add Movie', 'movie' ),
		'add_new_item'       => __( 'Add New Movie' ),
		'edit_item'          => __( 'Edit Movie' ),
		'new_item'           => __( 'New Movie' ),
		'all_items'          => __( 'All Movies' ),
		'view_item'          => __( 'View Movie' ),
		'search_items'       => __( 'Search Movies' ),
		'not_found'          => __( 'No Movie found' ),
		'not_found_in_trash' => __( 'No Movies found in the Trash' ), 
		'parent_item_colon'  => '',
		'menu_name'          => 'Movie'
	  );
	  //arguments
	  $args = array(
		'labels'        => $labels,
		'description'   => 'Holds movie specific data',
		'public'        => true,
		'menu_position' => 5,
		'supports'      => array( 'title','editor'),
	
		'has_archive'   => true,
	  );

  register_post_type( 'movie', $args ); 
}
// function for creating the movie category/taxonomy
function my_taxonomies_movie() {
  $labels = array(
    'name'              => _x( 'Genres', 'taxonomy general name' ),
    'singular_name'     => _x( 'Genres', 'taxonomy singular name' ),
    'search_items'      => __( 'Search movie Categories' ),
    'all_items'         => __( 'All  Genres' ),
    'parent_item'       => __( 'Parent Genre' ),
    'parent_item_colon' => __( 'Parent Genre:' ),
    'edit_item'         => __( 'Edit Genre' ), 
    'update_item'       => __( 'Update Genres' ),
    'add_new_item'      => __( 'Add Genre' ),
    'new_item_name'     => __( 'New Genre' ),
    'menu_name'         => __( 'Genre' ),
	
  );
  $args = array(
    'labels' => $labels,
    'hierarchical' => true,
	'show_ui' =>true,
  );
  register_taxonomy( 'movie_category', 'movie', $args );
}
?>