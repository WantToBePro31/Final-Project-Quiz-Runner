<?php
// menghubungkan php dengan koneksi database
include '../../auth.php';

// mengaktifkan session pada php
session_start();

// menangkap data yang dikirim dari form register
if(isset($_POST['username'])&&isset($_POST['name'])&&isset($_POST['password']))
{
    $username = $_POST['username'];
    $name = $_POST['name'];
    $password = $_POST['password'];
    register($username, $name, $password);
    header("location:../../../views/login.php");
}
?>
