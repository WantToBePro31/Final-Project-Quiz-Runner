<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/style.css">
    <title>Register</title>
</head>
<body>
    <div class="container-window bg-game">
        <div class="card">
            <div class="card-head">
                <h1>Daftarkan Akunmu</h1>
            </div>
            <div class="card-body">
                <form action="../backend/api/auth/register.php" method="POST">
                    <div class="form-group">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" id="username" name="username" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="nama" class="form-label">Nama</label>
                        <input type="text" id="nama" class="form-input" name="name">
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" id="password" class="form-input" name="password">
                    </div>
                    <div class="form-button">
                        <input type="submit" value="Daftar">
                        <p>Sudah punya akun? Masuk <a href="login.php">di sini</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>    
</body>
</html>