<?php

// mengaktifkan session pada php
session_start();

include '../../score.php';

$highestScore = getHighScore($_SESSION['user_id']);
$arr = [
    'high_score' => $highestScore
];

echo json_encode($arr);