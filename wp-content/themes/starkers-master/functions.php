<?php
	/**
	 * Starkers functions and definitions
	 *
	 * For more information on hooks, actions, and filters, see http://codex.wordpress.org/Plugin_API.
	 *
 	 * @package 	WordPress
 	 * @subpackage 	Starkers
 	 * @since 		Starkers 4.0
	 */

	/* ========================================================================================================================
	
	Required external files
	
	======================================================================================================================== */

	require_once( 'external/starkers-utilities.php' );
	require_once( 'meta_box.php');
	require'ajax.php';
   	/* ========================================================================================================================
	
	Theme specific settings

	Uncomment register_nav_menus to enable a single menu with the title of "Primary Navigation" in your theme
	
	======================================================================================================================== */

//	add_theme_support('post-thumbnails');
	
	// register_nav_menus(array('primary' => 'Primary Navigation'));

	/* ========================================================================================================================
	
	Actions and Filters
	
	======================================================================================================================== */

	add_action( 'wp_enqueue_scripts', 'starkers_script_enqueuer' );

	add_filter( 'body_class', array( 'Starkers_Utilities', 'add_slug_to_body_class' ) );

	/* ========================================================================================================================
	
	Custom Post Types - include custom post types and taxonimies here e.g.

	
	
	======================================================================================================================== */



	/* ========================================================================================================================
	
	Scripts
	
	======================================================================================================================== */

	/**
	 * Add scripts via wp_head()
	 *
	 * @return void
	 * @author Keir Whitaker
	*/

	function starkers_script_enqueuer() {
		wp_register_script( 'ui', get_template_directory_uri().'/js/jquery.ui.core.js', array( 'jquery' ) );
		wp_enqueue_script( 'ui' );
		wp_register_script( 'widget', get_template_directory_uri().'/js/jquery.ui.widget.js', array( 'jquery' ) );
		wp_enqueue_script( 'widget' );
		wp_register_script( 'tabs', get_template_directory_uri().'/js/jquery.ui.tabs.js', array( 'jquery' ) );
		wp_enqueue_script( 'tabs' );
		wp_register_script( 'slick', get_template_directory_uri().'/js/slick.min.js', array( 'jquery' ) );
		wp_enqueue_script( 'slick' );
		wp_register_script( 'countdown', get_template_directory_uri().'/js/jquery.countdown.min.js', array( 'jquery' ) );
		wp_enqueue_script( 'countdown' );
		wp_register_script( 'validate', get_template_directory_uri().'/js/jquery.validate.min.js', array( 'jquery' ) );
		wp_enqueue_script( 'validate' );
		wp_register_style( 'jui', get_stylesheet_directory_uri().'/css/jqueryui.css', '', '', 'screen' );
        wp_enqueue_style( 'jui' );
		wp_register_style( 'juicalender', get_stylesheet_directory_uri().'/css/jquery-ui-custom.css', '', '', 'screen' );
        wp_enqueue_style( 'juicalender' );
		wp_register_style( 'slick', get_stylesheet_directory_uri().'/css/slick.css', '', '', 'screen' );
        wp_enqueue_style( 'slick' );
		wp_register_script( 'slickjs', get_template_directory_uri().'/js/slick.min.js', array( 'jquery' ) );
		wp_enqueue_script( 'slickjs' );
		wp_register_script( 'date', get_template_directory_uri().'/js/jquery.ui.datepicker.min.js', array( 'jquery' ) );
		wp_enqueue_script( 'date' );
		wp_register_script( 'fancy', get_template_directory_uri().'/fancyBox/source/jquery.fancybox.js', array( 'jquery' ) );
		wp_enqueue_script( 'fancy' );
		wp_register_script( 'fancy_media', get_template_directory_uri().'/fancyBox/source/helpers/jquery.fancybox-media.js', array( 'jquery' ) );
		wp_enqueue_script( 'fancy_media' );
		wp_register_style( 'fancy_styles', get_stylesheet_directory_uri().'/fancyBox/source/jquery.fancybox.css', '', '1', 'screen' );
        wp_enqueue_style( 'fancy_styles' );
		
		
	}	
	function my_theme_styles() {
			// replace "10" with your version number; increment as you push changes
			wp_enqueue_style('my-theme-style', get_bloginfo('template_directory') . '/style.css', false, 12);
		}
	add_action('wp_print_styles', 'my_theme_styles');
	/* ========================================================================================================================
	
	Comments
	
	======================================================================================================================== */

	/**
	 * Custom callback for outputting comments 
	 *
	 * @return void
	 * @author Keir Whitaker
	 */
	 /*metaboxes for home page*/
	
	 /*work post type*/
	 add_action( 'init', 'my_custom_post_movie');
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
	function starkers_comment( $comment, $args, $depth ) {
		$GLOBALS['comment'] = $comment; 
		?>
		<?php if ( $comment->comment_approved == '1' ): ?>	
		<li>
			<article id="comment-<?php comment_ID() ?>">
				<?php echo get_avatar( $comment ); ?>
				<h4><?php comment_author_link() ?></h4>
				<time><a href="#comment-<?php comment_ID() ?>" pubdate><?php comment_date() ?> at <?php comment_time() ?></a></time>
				<?php comment_text() ?>
			</article>
		<?php endif;
	}