<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/style.css">
    <title>Login</title>
</head>

<body>
    <div class="container-window bg-game">
        <div class="card">
            <div class="card-head">
                <h1>Login</h1>
            </div>
            <div class="card-body">
                <?php
                if (isset($_GET['pesan'])) {
                    if ($_GET['pesan'] == "gagal") {
                        echo "<div class='alert'>Username dan Password tidak sesuai !</div>";
                    }
                }
                ?>
                <form action="../backend/api/auth/login.php" method="POST">
                    <div class="form-group">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" id="username" name="username" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" id="password" class="form-input" name="password" required>
                    </div>
                    <div class="form-button">
                        <input type="submit" value="Login">
                        <p>Belum punya akun? Daftar <a href="register.php">di sini</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>

</html>