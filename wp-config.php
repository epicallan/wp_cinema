<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wp_cinema');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'allan');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '_.6$CiV+!vv-JdX8&3+Ke-IlRMeWGr3MM$x/(hGn`,%,jc>p!M0uNsRl-T#Y{i7U');
define('SECURE_AUTH_KEY',  '9 JqyK93bNL[|fFzBP=pQ&?x!|ekW9b<4|FJdG1J6:J6FMe7Z-cWZP$_p:gg=d8I');
define('LOGGED_IN_KEY',    'UM#pE=||6E[ )J;+8qz7Ss7|>*KVfpi*Itd5>}fqyuxh2MD2(!wTdyM77!#U`;(M');
define('NONCE_KEY',        '+]X&KNO$!j+|DSqW#_Wr6vVM82_.5q^$LwBWuI;mOyUkoi>;RmtI-, gzUqaP2rm');
define('AUTH_SALT',        '[&|mQ,Dw$-S(J>v[ORR*~oP5;eNq}TIMrw?&Jf5[gzPIDY`{x$=dYi$zhjh8sKM1');
define('SECURE_AUTH_SALT', 'P,^Q.B3ER8AwM{4^4-->Y1x6f!KAO&:%>5VUL6R]LYDqlM]1$p_|3{i`@>OieI;C');
define('LOGGED_IN_SALT',   'H$^!g+fbqp<r:5(NcK4^QLxvd_F|D5^9i/fUq)Gq~!tilkUS-(fAo*Gydgn9HytZ');
define('NONCE_SALT',       '33;a-pG|]nFskbi`w3<)R,[Ax:|w/xr}TZ3|-GRB6B<|sF`-QtM?`7Z%|P^yQmT8');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
