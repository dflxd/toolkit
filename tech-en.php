<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Andrea Kozáková, Matěj Motl">
    <link rel="icon" href="">
    <title>ToolkIT</title>
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous"><!-- Bootstrap.css -->
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/less" href="less/tech-en.less">
    
    <script src="http://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script> <!-- Less -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script><!-- FontAwsome v5.0.1 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.2/vue.js"></script><!-- VUE.JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
</head>

<body>
  <div class="smallMenu">
    <div class="menuBack"><a href="index.html"><i class="fa fa-chevron-left" aria-hidden="true"></i></a></div>
    <div class="menuLogin"><a data-toggle="modal" href="#login"><i class="fas fa-sign-in-alt"></i></a></div>
  </div>
    <div class="modal hide container" id="login">
          <div class="modal-header">
            <h3>Login</h3>
            <button type="button" class="close text-primary" data-dismiss="modal">x</button>
          </div>
        
          <div class="modal-body">
              <form method="POST" action="tech-en/scripts/login.inc.php">
                  <input type="email" name="mail" placeholder="Email" />
                  <input type="password" name="pwd" placeholder="Password" />
                  <button type="submit" name="submit">Přihlásit</button>
		      </form>
          </div>
        
          <div class="modal-footer">
          </div>
        </div>
    <div class="container">
        <main>
            
        </main>
    </div>
<?php
    include_once "tech-en/footer.php";
?>
