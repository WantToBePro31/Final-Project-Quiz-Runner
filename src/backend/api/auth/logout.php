<?php
// menghubungkan php dengan koneksi database
include '../../auth.php';
logout();
header("location:../../../views/index.php");