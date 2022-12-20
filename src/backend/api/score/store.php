<?php

// mengaktifkan session pada php
session_start();

include '../../score.php';

if(isset($_POST['score']))
{
    $userId = $_SESSION['user_id'];
    $score = $_POST['score'];
    setScore($userId, $score);
}