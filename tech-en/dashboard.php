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
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="Andrea Kozáková, Matěj Motl">
        <link rel="icon" href="">
        <title>ToolkIT | Dashboard</title>
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
        <link rel="stylesheet" href="../css/main.css">
        <!--<link rel="stylesheet" href="../css/tech-en.css">-->
        <link rel="stylesheet" type="text/less" href="../less/tech-en.less">
        <link rel="stylesheet" type="text/less" href="../less/dashboard.less">
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script><!-- Less -->
        <script defer src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script><!-- FontAwsome -->
        <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/vue"></script> <!-- VUE.JS -->
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script><!-- axios -->
    </head>
    <body>
        <div id="dashboard" class="row">
              <div class="sidebar">
                  <img src="../img/logo.png" class="img-fluid mx-auto d-block" alt="Logo" height="80" width="185" id="side-logo" />
                  <hr />
                  <a class="nav-link" href="#" @click="home"><i class="fas fa-home"></i> Domů</a>
                  <a class="nav-link" href="#" @click="lessons"><i class="fas fa-file-alt"></i> Správa lekcí</a>
                  <a class="nav-link" href="#" @click="usersPage"><i class="fas fa-users"></i> Přehled uživatelů</a>
                  <a class="nav-link disabled"><i class="fas fa-file-alt"></i> Changelog</a>
                  <a class="nav-link" href="scripts/logout.inc.php"><i class="fas fa-sign-out-alt"></i> Odhlásit se</a>
                  <footer>
                    <span class="text-muted">&copy; Copyright 2018 &#124; Všechna práva vyhrazena &#124; Design &amp; code by Andrea Kozáková, Matěj Motl.</span>
                  </footer>
                </div>

            <header id="mainHeading" v-if="step === 1">
                <h2>Vítejte v administrátorském panelu!</h2>
            </header>

            <main class="container">
                <div class="lesson" v-if="step === 2">
                    <h2>Správa lekcí</h2>
                    <h3>Add lesson</h3>
                        <select v-model="type">
                            <option selected="Výběr:">Výběr:</option>
                            <option value="Translate">Translate</option>
                            <option value="Match">Match</option>
                            <option value="Fill">Fill</option>
                            <option value="Listening">Listening</option>
                        </select>
                        <div class="" v-if="type === 'Translate'">
                            <h4>Translate</h4>
                            <div v-for="row in translateRows" track-by="$index">
                                <input type="text" name="lesson_number" v-model.lazy="row.lesson_number" placeholder="Lesson number" />
                                <input type="text" name="translate_english" v-model.lazy="row.translate_english" placeholder="English word" />
                                <input type="text" name="translate_czech" v-model.lazy="row.translate_czech" placeholder="Czech word" />
                                <input type="text" name="translate_alternative" v-model.lazy="row.translate_alternative" placeholder="Alternative czech word" />
                                <input type="text" name="translate_alternative2" v-model.lazy="row.translate_alternative2" placeholder="Another alternative czech word" />
                            </div>
                            <a class="text-success" @click.prevent="addtranslateRow()">Add row</a>
                            <a class="text-danger" @click="removetranslateRow()">Remove row</a>
                        </div>
                    <a @click.prevent="insertTranslate()" v-if="type === 'Translate'">Přidat</a>
                </div>

                <div class="users" v-if="step === 3">
                    <h2>Přehled uživatelů</h2>                    
                    <div class="userTable">
                        <h3>Přehled uživatelů:</h3>
                        <div class="table-responsive">
                            <table class="table table-hover table-condensed">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>First</th>
                                  <th>Last</th>
                                  <th>E-mail</th>
                                  <th>Privilege</th>
                                </tr>
                              </thead>
                                <tbody>
                                    <tr v-for="user in users">
                                        <td>{{user.id}}</td>
                                        <td>{{user.user_first}}</td>
                                        <td>{{user.user_last}}</td>
                                        <td>{{user.user_mail}}</td>
                                        <td>Work In Progress</td>
                                    </tr>
                                </tbody>
                           </table>
                        </div>
                    </div>
                </div>
            </main>       
        </div>
        <script>
            var dashboard = new Vue({
                el: "#dashboard",
                data: {
                    step: 2,
                    type: "Translate",
                    rows: 0,
                    submitted: false,
                    users: [],
                    translateRows: [
                        {
                            lesson_number:"2",
                            translate_english:"car",
                            translate_czech:"auto",
                            translate_alternative:"",
                            translate_alternative2:""
                        },
                        {
                            lesson_number:"2",
                            translate_english:"tree",
                            translate_czech:"strom",
                            translate_alternative:"asd",
                            translate_alternative2:"hg"
                        }
                    ]
                },
                created: function() {
                    var self = this;
                    $.get("users.php", function(data) {
                        self.users = JSON.parse(data);
                    });
                },
                methods: {
                    insertTranslate: function() {
                        let newLesson = {
                            lesson_number: this.translateRows[0].lesson_number,
                            translate_czech: this.translateRows[0].translate_czech,
                            translate_english: this.translateRows[0].translate_english,
                            translate_alternative: this.translateRows[0].translate_alternative,
                            translate_alternative2: this.translateRows[0].translate_alternative2
                        }
                        axios.post('scripts/add-exercises.php', newLesson)
                        .then((response) => {
                            console.log(response);
                        });
                    },
                    addtranslateRow: function(index){
                        try {
                            if(this.rows < 5) {
                                this.translateRows.splice(index + 1, 0, {});
                                this.rows += 1; 
                            }
                        } catch(e)
                        {
                            console.log(e);
                        }
                    },
                    removetranslateRow: function(index) {
                        this.translateRows.splice(index, 1);
                        this.rows -= 1;
                    },
                    home: function() {
                        this.step = 1;    
                    },
                    
                    lessons: function() {
                        this.step = 2;
                    },
                    
                    usersPage: function() {
                        this.step = 3;
                    },
                }
            });
        </script>
        <!-- Bootstrap core JavaScript
    ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
        <script>
            (function () {
                'use strict'
                if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                    var msViewportStyle = document.createElement('style')
                    msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'))
                    document.head.appendChild(msViewportStyle)
                }
            }())
        </script>
    </body>
</html>