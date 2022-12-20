<?php

include 'connection.php';

function getHighScore(int $userId)
{
    global $db1;
    $query = "SELECT MAX(score) as max_score FROM scores WHERE user_id='$userId'";
    $sql = $db1->query($query);
    $data = $sql->fetch_assoc();
    $sql->close();
    return $data['max_score'] ?? 0;
}

function getAllHighScore()
{
    global $db1;
    $query = 
    "SELECT u.name, s.high_score 
    FROM users u
    JOIN (
        SELECT user_id, MAX(score) as high_score FROM scores GROUP BY user_id
    ) s
    ON s.user_id = u.id
    ORDER BY s.high_score DESC LIMIT 5;";
    $sql = $db1->query($query);
    $data = [];
    while($row = mysqli_fetch_assoc($sql))
    {
        $data[] = $row;
    }
    return $data;
}

function setScore(int $userId, int $score)
{
    global $db1;
    $query = "INSERT INTO scores (user_id, score) VALUES (?, ?)";
    $sql = $db1->prepare($query);
    if($sql===false){
        echo 'Error on insert score preparation query'.$db1->error."\r\n";
    } else {
        $sql->bind_param(
            "ii", 
            $userId,
            $score
        );
        if(!$sql->execute()){
            echo "Gagal menambahkan skor".$sql->error."\r\n";
        }
    }
    $sql->close();
}