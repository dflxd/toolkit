<?php

if (isset($_POST['submit'])) {
	
	include 'dbh.inc.php';

	$first = mysqli_real_escape_string($conn, $_POST['first']);
    $last = mysqli_real_escape_string($conn, $_POST['last']);
	$pwd = mysqli_real_escape_string($conn, $_POST['pwd']);
	$mail = mysqli_real_escape_string($conn, $_POST['mail']);

	
    //error handlers
    // empty fiels
	if (empty($pwd) || empty($mail) || empty($last) || empty($first)) {
		header("Location: ../signup.php?signup=empty");
		exit();
	} else {        
		//valid characters
        if(!preg_match('/^[&a-zA-ZĚŠČŘŽÝÁÍÉěščřžýáíé _-]+$/i', $first)) {         
            header("Location: ../signup.php?signup=invalid_first");
            exit();
        }
        elseif(!preg_match('/^[&a-zA-ZĚŠČŘŽÝÁÍÉěščřžýáíé _-]+$/i', $last)) {         
            header("Location: ../signup.php?signup=invalid_last");
            exit();
        } else {
            // valid email
            if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
                header("Location: ../signup.php?signup=email");
                exit();
            } else {
                // existing user
                $sql = "SELECT * FROM users WHERE user_mail='$mail'";
                $result = mysqli_query($conn, $sql);
                $resultCheck = mysqli_num_rows($result);

                if($resultCheck > 0) {
                    header("Location: ../signup.php?signup=existing");
                    exit();
                }else {
                    //Hash pwd
                    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
                    // insert in dtb
                    $sql = "INSERT INTO users (user_mail, user_pwd, user_first, user_last) 
                            VALUES ('$mail','$hashedPwd', '$first', '$last');";
                    mysqli_query($conn, $sql);
                    header("Location: ../signup.php?signup=success");
                    exit();
               }
            }
        }
	}
} else {
    header("Location: ../signup.php");
	exit();
}