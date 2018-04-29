
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="description" content="Procvičování subnettingu, převodů soustav a technické angličtiny." />
	<meta name="keywords" content="toolkit, toolkit cz, subnetting, podsítě, převody soustav, technická angličtina" />
    <meta name="author" content="Andrea Kozáková, Matěj Motl" />
    <link rel="shortcut icon" href="img/favicon.ico" />
    <title>ToolkIT | Technická angličtina</title>
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous"><!-- Bootstrap.css -->
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/tech-en.css">
    
    <script defer src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script><!-- FontAwsome v5.0.1 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script><!-- VUE.JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script><!-- axios -->

</head>

<body>
    <div class="smallMenu">
        <div class="menuItem menuBack" title="zpet" v-if="settings"><a href="index.html"><i class="fas fa-home"></i><span>ToolkIT</span></a></div>
        <div class="menuLogin"><a data-toggle="modal" href="#login"><i class="fas fa-sign-in-alt"></i></a></div>
    </div><br />
    
    <div class="modal hide container" id="login">
        <div class="modal-header">
            <h3>Login</h3>
            <button type="button" class="close text-primary" data-dismiss="modal">x</button>
        </div>
        
        <div class="modal-body">
            <form method="POST" action="tech-en/scripts/login/login.inc.php">
                <input type="email" name="mail" placeholder="Email" />
                <input type="password" name="pwd" placeholder="Password" />
                <button type="submit" name="submit">Přihlásit</button>
            </form>
        </div>
        
        <div class="modal-footer">
        </div>
    </div>
    <header id="mainHeading">
            <h1>Technická angličtina</h1>
        <span><p>Dvojklik - otevření lekce; Klik - otevření slovíček</p></span>
        </header>
    <div class="container">
        <main>
            <div id="app">
                
                <div class="choose" v-if="step === 0">
                    <div v-for="lesson in lessons">
                        <a class="lekce col-md-1 jednot-lekce" @dblclick="chooseLesson(lesson)" @click="showWords()">
                            <i class="fas fa-folder fa-3x"></i>
                            <i class="fas fa-folder-open fa-3x"></i>
                            <span>Lekce {{ lesson.number }}</span>
                        </a>
                    </div>
                    
                    <div class="" v-if="substep == true">
                        <table>
                        <tr v-for="translate in translate">
                            <td>{{ translate.translate_english }}</td>
                            <td> = </td>
                            <td>{{ translate.translate_czech }}</td>
                        </tr>
                    </table>
                    </div>
                </div>
                <div id="exercise1" class="exercises" v-if="step === 1">
                    <h5 class="zadani">1. Do prázdného políčka přeložte slovo do českého jazyka</h5>
                    <table>
                        <tr v-for="translate in translateLines">
                            <td>{{ translate.translate_english }}</td>
                            <td> = </td>
                            <td><input class="text" type="text" v-model="translate.answer" /></td>
                        </tr>
                    </table>
                </div>
                
                <div id="exercise2" class="exercises" v-if="step === 2">    
                    <span class="zadani">2. Do prázdného políčka vyplňte slovo, které se hodí do věty</span>
                        <div class="senteces" v-for="word in fillLines">
                            <span> {{ word.fill_sentence }} </span>
                            <span> <input class="text" v-model="word.filled_word" class="fill" /> </span>
                            <span> {{ word.fill_sentence2 }}</span>
                        </div>
                </div>
                
                <div id="exercise3" class="exercise" v-if="step === 3">
                    <span class="zadani">3. Do prázdného políčka vyplňte slovo, které vystihuje věta vedle políčka</span>
                    <div class="senteces" v-for="word in matchLines">
                            <span> <input class="text" v-model="word.filled_word" class="fill" /> </span>
                            <span> {{ word.match_sentence }} </span>
                        </div>
                </div>

                <div id="results" v-if="step === 4">
                    <h2>Konec testu</h2>
                    <span><p>Počet bodů: {{ points }} / 15</p></span>
                    <span><p>Připravujeme čtvrté cvičení - poslech s náhodnými otázkami</p></span>
                </div>
                <div class="clearfix"></div>
                <div class="container buttons">
                    <button v-if="step > 1 && step < 4" @click="prev()">Předchozí cvičení</button>
                    <button v-if="step > 0 && step < 3" @click="next()">Další cvičení</button>
                    <button @click="checkFun()" v-if="step === 3">Zkontrolovat</button>
                </div>
                <div class="container">
                    <h3 v-if="step < 3 && step > 0">Tips:</h3>
                    <span class="text-warning" v-if="step < 3 && step > 0">Pořádně si zkontrolujte vyplněná pole, jako chyba se počítá i překlep </span>
                    <span class="text-warning" v-if="step === 2">Slova mohou být v různých tvarech např. support / supports / supporting / supported </span>
                </div>
			</div>
        </main>
    </div>
    <script charset="utf-8">
        var app = new Vue({
            el: '#app',
            data: {
                step: 0,
                points: 0,
                checknum: 0,
                substep: false,
                translateLines:[],
				translate:[],
                fillLines: [],  
                matchLines: [],
                lessons: [
                    {
                        number: 1
                    }
                ]
            },
            
            created: function() {
                this.translateParse();
                this.fillParse();
                this.matchParse();
            },
            methods: {
                chooseLesson: function() {
                  this.step += 1;  
                },
                showWords: function(lesson) {
                    this.substep = true;
                },
                next: function() {
                    this.step += 1;    
                },
                
                prev: function() {
                    this.step -= 1;
                },
                translateParse: function() {
                    var self = this;
                    $.get("tech-en/scripts/dataParse/translateParse.php", function(data) {
                        self.translateLines = JSON.parse(data);
                    });
                },
				
				wordParse: function() {
                    var self = this;
                    $.get("tech-en/scripts/dataParse/wordParse.php", function(data) {
                        self.translate = JSON.parse(data);
                    });
                },
                
                fillParse: function() {
                    var self = this;
                    $.get("tech-en/scripts/dataParse/fillParse.php", function(data) {
                        self.fillLines = JSON.parse(data);
                    });
                },
                
                matchParse: function() {
                    var self = this;
                    $.get("tech-en/scripts/dataParse/matchParse.php", function(data) {
                        self.matchLines = JSON.parse(data);
                    });
                },
                
                translateCheck: function() {
                    for (var i = 0; i < this.translateLines.length; i++) {
                        var english = this.translateLines[i].translate_english;
                        var czech = this.translateLines[i].translate_czech;
                        var alternative = this.translateLines[i].translate_alternative;
                        var alternative2 = this.translateLines[i].translate_alternative2;
                        var answer = this.translateLines[i].answer; 
                        
                        if(answer == null) {
                            console.log("prázdné pole");
                        }
                        else if(answer == czech || answer == alternative || answer == alternative2) {
                            this.points += 1;
                        }
                        else{
                            console.log("Chyba");
                        }
                    }
                    this.checknum += 1;
                },
                
                fillCheck: function() {
                    for (var i = 0; i < this.fillLines.length; i++) {
                        var word = this.fillLines[i].fill_word;
                        var filled = this.fillLines[i].filled_word; 
                     
                        if(filled == null) {
                            console.log("prázdné pole");
                        }
                        else if(filled == word) {
                            this.points += 1;
                        }
                        else{
                            console.log("Chyba");
                        }
                    }
                    this.checknum += 1;
                },
                
                matchCheck: function() {
                    for (var i = 0; i < this.matchLines.length; i++) {
                        var filled = this.matchLines[i].filled_word;
                        var word = this.matchLines[i].match_word;
                        
                        if(filled == null) {
                            console.log("prázdné pole");
                        }
                        else if(filled == word) {
                            this.points += 1;
                        }
                        else{
                            console.log("Chyba");
                        }
                    }
                    this.checknum += 1;
                    if(this.checknum == 3) {
                        this.step = 4;
                    }
                },
                
                checkFun: function() {
                    this.translateCheck();
                    this.fillCheck();
                    this.matchCheck();
                }
                
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
