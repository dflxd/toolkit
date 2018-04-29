<?php

session_start();


if(isset($_POST['submit'])) {
	
	include '../dbh.inc.php';
	
	$mail = mysqli_real_escape_string($conn, $_POST['mail']);
	$pwd = mysqli_real_escape_string($conn, $_POST['pwd']);
	
	if(empty($mail) || empty($pwd)) {
		header("Location: ../../../tech-en.php");
		exit();
	}
	else {
		$sql = "SELECT * FROM users WHERE user_mail='$mail'";
		$result = mysqli_query($conn, $sql);
		$resultCheck = mysqli_num_rows($result);
		
		if($resultCheck < 1) {
			header("Location: ../../../tech-en.php");
			exit();
		}
		else {
			if($row = mysqli_fetch_assoc($result)) {
				//De-hashing
				$hashedPwdCheck = password_verify($pwd, $row['user_pwd']);
				if($hashedPwdCheck == false) {
					header("Location: ../../../tech-en.php");
					exit();
				}
				elseif($hashedPwdCheck == true) {
					$_SESSION['u_id'] = $row['user_id'];
					$_SESSION['u_mail'] = $row['user_mail'];
                    $_SESSION['u_first'] = $row['user_first'];
					$_SESSION['u_last'] = $row['user_last'];
					$_SESSION["loggedIn"] = true;
					header("Location: ../../dashboard.php");
					exit();
				}
			}
		}
	}
}
else{
    header("Location: ../../tech-en.php");
    exit();
}
