<?php

if (isset($_POST['submit'])) {
	
	include 'dbh.inc.php';

	$first = mysqli_real_escape_string($conn, $_POST['first']);
    $last = mysqli_real_escape_string($conn, $_POST['last']);
	$pwd = mysqli_real_escape_string($conn, $_POST['pwd']);
	$mail = mysqli_real_escape_string($conn, $_POST['mail']);

	if (empty($pwd) || empty($mail) || empty($last) || empty($first)) {
		header("Location: ../signup.php?signup=empty");
		exit();
	} else {        
        if(!preg_match('/^[&a-zA-ZĚŠČŘŽÝÁÍÉěščřžýáíé _-]+$/i', $first)) {         
            exit();
        }
        elseif(!preg_match('/^[&a-zA-ZĚŠČŘŽÝÁÍÉěščřžýáíé _-]+$/i', $last)) {         
            exit();
        } else {
            if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
                exit();
            } else {
                $sql = "SELECT * FROM users WHERE user_mail='$mail'";
                $result = mysqli_query($conn, $sql);
                $resultCheck = mysqli_num_rows($result);

                if($resultCheck > 0) {
                    exit();
                }else {
                    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
                    $sql = "INSERT INTO users (user_mail, user_pwd, user_first, user_last) 
                            VALUES ('$mail','$hashedPwd', '$first', '$last');";
                    mysqli_query($conn, $sql);
                    exit();
               }
            }
        }
	}
} else {
	exit();
}