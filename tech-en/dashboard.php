<?php
    session_start();

if($_SESSION["loggedIn"] != true) {
    header("Location: ../tech-en.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="Andrea Kozáková, Matěj Motl">
        <link rel="icon" href="">
        <title>ToolkIT | Dashboard</title>
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
        <link rel="stylesheet" href="../css/main.css">
        <!--<link rel="stylesheet" href="../css/tech-en.css">-->
        <link rel="stylesheet" href="../less/tech-en.less">
        <link rel="stylesheet" href="../less/dashboard.less">
        
        <script src="http://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script><!-- Less -->
        <script defer src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script><!-- FontAwsome -->
        <script src="https://unpkg.com/vue"></script> <!-- VUE.JS -->
        <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
    </head>
    <body>
        <div id="dashboard" class="row">
              <div class="sidebar">
                  <img src="../img/toolkitLogo.png" alt="Logo" height="80" width="185" id="side-logo" />
                  <hr />
                  <a class="nav-link" href="#" @click="home"><i class="fas fa-home"></i> Domů</a>
                  <a class="nav-link" href="#" @click="lessons"><i class="fas fa-file-alt"></i> Správa lekcí</a>
                  <a class="nav-link" href="#" @click="users"><i class="fas fa-users"></i> Správa uživatelů</a>
                  <a class="nav-link" href="#" @click="contact"><i class="fas fa-address-book"></i> Kontakt</a>
                  <a class="nav-link" href="scripts/logout.inc.php"><i class="fas fa-sign-out-alt"></i> Odhlásit se</a>
                </div>

            <header id="mainHeading" v-if="step === 1">
                <h2>Vítejte v administrátorském panelu!</h2>
            </header>


            <main class="container">
                <div class="lesson" v-if="step === 2">
                    <h2>Správa lekcí</h2>
                   <?php
                        include "lessons.php";
                    ?>
                </div>

                <div class="users" v-if="step === 3">
                    <h2>Správa uživatelů</h2>
                    <?php
                        include "users.php";
                    ?>
                    <script src="scripts/js/delete.js"></script>
                </div>
                <div class="contact" v-if="step === 4">
                    <h2>Kontakt</h2>
                    <?php
                        include "contact.php";
                    ?>
                </div>
                
            </main>       
        </div>
        <script>
            var dashboard = new Vue({
                el: "#dashboard",
                data: {
                    step: 1
                },
                methods: {
                    home: function() {
                        this.step = 1;    
                    },
                    
                    lessons: function() {
                        this.step = 2;
                    },
                    
                    users: function() {
                        this.step = 3;
                    },
                    
                    contact: function() {
                        this.step = 4;
                    }
                }
            });
        </script>
        <?php
            include_once "footer.php";
        ?>