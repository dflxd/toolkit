<?php

session_start();

?>
<!DOCTYPE html>
<html>
	<head>
		
		
	</head>
	<body>
		<form method="POST" action="scripts/signup.inc.php">
            
			<input type="email" name="mail" placeholder="E-mail" />
			<input type="password" name="pwd" placeholder="Heslo" />
            <input type="text" name="first" placeholder="Křestní jméno" />
            <input type="text" name="last" placeholder="Příjmení" />
            
			<!--<label>Pamatovat si mě</label>
            <input type="checkbox" name="remember" />-->
 			<button type="submit" name="submit">Registrovat</button>
            
		</form>
		
	</body>
</html>