<?php

include 'connection.php';

function login(string $username, string $password)
{
    global $db1;
    // menyeleksi data user dengan username dan password yang sesuai
    $login = mysqli_query($db1,"select * from users where username='$username'");

    // menghitung jumlah data yang ditemukan
    $cek = mysqli_num_rows($login);

    // cek apakah username dan password di temukan pada database
    if($cek > 0){
        $data = mysqli_fetch_assoc($login);
        if(password_verify($password, $data['password'])){
            return $data;
        } 
    } 
    return null;
}

function register(string $username, string $name, string $password){
    global $db1;
    $query = "INSERT INTO users (username, name, password) VALUES (?, ?, ?)";
    $sql = $db1->prepare($query);
    if($sql===false){
        echo 'Error on insert user preparation query'.$db1->error."\r\n";
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql->bind_param(
            "sss", 
            $username,
            $name,
            $hashed_password
        );
        if(!$sql->execute()){
            echo "Gagal menambahkan user".$sql->error."\r\n";
        }
    }
    $sql->close();
}

function logout(){
    // mengaktifkan session php
    session_start();
    // menghapus semua session
    session_destroy();
}