<?php

include '../auth.php';
include '../score.php';

// Seeding user and score
$users = [
    [
        "username" => "antogeming",
        "name" => "Anto",
        "password" => "Password123"
    ],
    [
        "username" => "priaidaman",
        "name" => "Pria Idaman",
        "password" => "Password123"
    ],
    [
        "username" => "mrtoro",
        "name" => "Toro Sudiro",
        "password" => "Password123"
    ],
    [
        "username" => "dinoboy",
        "name" => "Andino Jr.",
        "password" => "Password123"
    ],
];

function getLatestUserID(){
    global $db1;
    $latestUserId = null;
    $query = "SELECT id FROM users ORDER BY id DESC LIMIT 1";
    $sql = $db1->prepare($query);
    $sql->execute();
    $sql->bind_result($latestUserId);
    $sql->fetch();
    $sql->close();
    return $latestUserId;
}

foreach($users as $user){
    register($user['username'], $user['name'], $user['password']);
    $latestUserId = getLatestUserID();
    for ($i=0; $i <5 ; $i++) { 
        setScore($latestUserId, random_int(200, 500));
    }
}
