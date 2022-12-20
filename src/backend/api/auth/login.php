<?php
// menghubungkan php dengan koneksi database
include '../../auth.php';

// mengaktifkan session pada php
session_start();

// menangkap data yang dikirim dari form login
$username = $_POST['username'];
$password = $_POST['password'];

$data = login($username, $password);

if($data){
    $_SESSION['user_id'] = $data['id'];
    $_SESSION['username'] = $username;
    $_SESSION['namauser'] = $data['name'];
    header("location:../../../views/index.php");
} else {
    header("location:../../../views/login.php?pesan=gagal");
}
?>
