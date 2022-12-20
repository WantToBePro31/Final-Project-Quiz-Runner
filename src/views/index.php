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
  <title>Quiz Runner</title>
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
    <p id="high-score" class="viewScore">High Score: 0</p>
  </div>
  <button class="howToPlay-Button" role="button" onclick="let dialog = document.getElementById('help-dialog'); dialog.style.display = 'block';">
    <span class="text">How To Play</span>
  </button>
  <div id="help-dialog" class="dialog">
    <h2>HOW TO PLAY</h2>

    <p>
      SPACE/UP: Jump<br />
      A/Left: Left lane switch<br />
      D/Right: Right lane switch
    </p>

    <p>Pass the obstacle and get the high score!<br>There is question that you need to answer to get bonus score</p>
    <p>
      <button class="close-button" role="button" onclick="let dialog = document.getElementById('help-dialog'); dialog.style.display = 'none';">
        Close
      </button>
    </p>
  </div>

  <a href="play.php"><button class="Play-Button" role="button" id="apDiv1">
      <span class="text">Play Game</span>
    </button></a>
  <button class="high-score-button" role="button" onclick="showBoard()">
    <span class="text">High Score Board</span>
  </button>
  <div id="high-score-modal" class="modal-layout">
    <div class="modal-custom">
      <div class="modal-head">
        <h2>High Score Board</h2>
      </div>
      <div class="modal-body">
        <table id="high-score-table">
          <thead></thead>
          <tbody></tbody>
        </table>
        <p style="margin-top: 1rem;">Bersainglah menjadi sang juara dengan menjawab soal ketika kamu berlari!</p>
        <button class="close-button" role="button" onclick="let dialog = document.getElementById('high-score-modal'); dialog.style.display = 'none';">
          Close
        </button>
      </div>
    </div>
  </div>
  <a href="../backend/api/auth/logout.php"><button class="exit-button" role="button">
      <span class="text">Keluar</span>
    </button></a>
  <p id="score" style="display: none"></p>
  <script type="text/javascript" src="../../assets/vendor/jquery.min.js"></script>
  <script>
    $.ajax({
      type: "GET",
      url: "../backend/api/score/show.php",
      dataType: "json",
      async: false,
      success: function(response) {
        console.log(response);
        localStorage.setItem('highScore', response.high_score);
      }
    });

    function showBoard() {
      var dialog = document.getElementById('high-score-modal');
      dialog.style.display = 'flex';
      $.ajax({
        type: "GET",
        url: "../backend/api/score/index.php",
        dataType: "json",
        async: false,
        success: function(response) {
          console.log(response);
          $('#high-score-table tr').empty();
          let header = $('#high-score-table thead');
          let body = $('#high-score-table tbody');
          let hTr;
          $('#high-score-table thead').append(hTr = $('<tr>'));
          // Headers
          for (let h = 0; h < response.headers.length; h++) {
            hTr.append($('<th>', {
              text: response.headers[h]
            }))
          }
          // Body
          for (let d in response.data) {
            let data = response.data[d];
            $('#high-score-table tbody').append($('<tr>')
              .append($('<td>', {
                text: data.name
              }))
              .append($('<td>', {
                text: data.high_score
              }))
            )
          }
        }
      });
    }
  </script>
  <script type="module" src="../js/main.js"></script>
  <script>
    const highScore = document.querySelector("#high-score");
    highScore.innerHTML = "High Score: " + localStorage.getItem("highScore");
  </script>
  <audio autoplay id="menu_sound" src="../../assets/audio/main_menu.mp3" type="audio/mp3"></audio>
</body>

</html>