<?php
if(!defined('HOST')){
    define('HOST','localhost');
    define('USER','root');
    define('PASS','');
    define('DB1', 'grafkom');
}

/**
 * Membuat koneksi database
 */
$db1 = new mysqli(HOST, USER, PASS, DB1);
?>
