<?php

include '../../score.php';

$highScore = getAllHighScore();

$res = [
    'headers' => [
        'Nama',
        'Score'
    ],
    'data' => $highScore
];

echo json_encode($res);