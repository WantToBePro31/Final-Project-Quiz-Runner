<?php
session_start();
if ($_SESSION['username'] == "") {
  header("location:login.php");
}
?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>Quiz Runner - Play Mode</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></script>
  <link rel="stylesheet" href="../style/style.css" />
  <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
</head>

<body>
  <div class="title">
    <p id="title"></p>
  </div>
  <div class="scoreTitle">
    <p id="score" class="viewScore"></p>
  </div>
  <div id="quiz-container" class="quiz-container">
    <h2 id="quiz-time"></h2>
    <p id="quiz-question"></p>
    <button title="A" id="answer-1" class="button-answer">A<br>11</button>
    <button title="B" id="answer-2" class="button-answer">B<br>21</button>
    <button title="C" id="answer-3" class="button-answer">C<br>10</button>
    <button title="D" id="answer-4" class="button-answer">D<br>1</button>
  </div>
  <a href="play.php">
    <button id="game-over" class="button-playagain" role="button">PLAY AGAIN</button>
  </a>
  <a href="index.php">
    <button id="exit-game" class="button-exitgame" role="button">EXIT</button>
  </a>
  <script type="text/javascript" src="../js/variable.js"></script>
  <script type="text/javascript" src="../../assets/vendor/jquery.min.js"></script>
  <script>
    $.ajax({
      type: "GET",
      url: "../backend/api/score/show.php",
      dataType: "json",
      async: false,
      success: function(response) {
        localStorage.setItem('highScore', response.high_score);
      }
    });
  </script>
  <script type="module" src="../js/play.js"></script>
  <audio autoplay id="menu_sound" src="../../assets/audio/running_bgm.mp3" type="audio/mp3"></audio>
</body>

</html>