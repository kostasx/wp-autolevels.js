<?php

/*
Plugin Name: WP AutoLevels.js
Plugin URI: https://github.com/kostasx/wp-autolevels.js
Description: Simple plugin to automatically correct image levels using JavaScript
Author: KostasX / PlethoraThemes
Version: 0.1.0
Author URI: https://github.com/kostasx/
*/

function wptuts_styles_with_the_lot()
{
     
  wp_register_script( 'auto-level-js', plugins_url( '/js/auto-level.js', __FILE__ ) );
  wp_enqueue_script( 'auto-level-js' );

}
add_action( 'wp_enqueue_scripts', 'wptuts_styles_with_the_lot' );