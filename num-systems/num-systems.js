String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
var numsystems = new Vue({
  el: '#num-systems',
  data: {
    location: "settings",
    inputDisabled: false,
    help: false,
    page: "main",
    ns1In: "",
    ns2In: "",
    direction: "right",
    rangeIn: "0-100",
    rangeMin: 0,
    rangeMax: 1000,
    answerIn: "",
    checkColor: "",
    answers: false,
    all: [],
    anim: 0,
    pools: [{
      fromIn: "10",
      toIn: "2",
      direction: "both"
    }],
    currentPool: {},
    currentDirection: "",
    currentNumber10: 0,
    currentNumberReal: "0",
    currentAnswerCorrect: "0",
    currentAnswerCorrect10: 0,
  },
  computed: {
    rangeValid: function() {
      var valid = true;
      var count = this.rangeIn;
      if (count.toString().split(' ').length > 1) valid = false;
      if (count.toString().split('-').length == 1) {
        if (!isNumeric(count) || parseInt(count) < 0 || parseInt(count) > 1000000 || count % 1 != 0) valid = false;
        if (valid) {
          this.rangeMin = parseInt(count);
          this.rangeMax = parseInt(count);
        }
      } else {
        var count1 = count.split("-")[0];
        var count2 = count.split("-")[1];
        if (count.split("-").length > 2) valid = false;
        if (!isNumeric(count1) || parseInt(count1) < 0 || parseInt(count1) > 1000000 || count1 % 1 != 0) valid = false;
        if (!isNumeric(count2) || parseInt(count2) < 0 || parseInt(count2) > 1000000 || count2 % 1 != 0) valid = false;
        if (parseInt(count1) >= parseInt(count2)) valid = false;

        if (valid) {
          this.rangeMin = parseInt(count1);
          this.rangeMax = parseInt(count2);
        }
      }

      return valid;
    },
    system1Valid: function() {
      var valid = true;
      if(this.ns1In != "?" && this.ns1In != "") {
        var system1 = this.ns1In;

        if (!isNumeric(system1) || system1 < 2 || system1 > 36 || system1 % 1 != 0) valid = false;
      }
      return valid;
    },
    system2Valid: function() {
      var valid = true;
      if(this.ns2In != "?" && this.ns2In != "") {
        var system2 = this.ns2In;

        if (!isNumeric(system2) || system2 < 2 || system2 > 36 || system2 % 1 != 0) valid = false;
      }
      return valid;
    }
  },
  methods: {
    toSymbol: function(n) {
      if(n < 10) return n;
      else {
        return 'abcdefghijklmnopqrstuvwxyz'[n-10].toUpperCase();
      }
    },
  /*  toDecimal: function(ch) {
      if(ch >= "0" && ch <= '9') return ch;
      else {
        return parseInt(ch.toLowerCase().charCodeAt())-87;
      }
    },*/
    removePool: function(index) {
      if(!this.inputDisabled) {
        this.pools.splice(index, 1);
      }
    },
    nextDirection: function() {
      if(!this.inputDisabled) {
        switch(this.direction) {
          case "left":
            this.direction = "right";
            break;
          case "right":
            this.direction = "both";
            break;
          case "both":
            this.direction = "left";
            break;
          default:
            this.direction = "right";
        }
      }
    },
    addPool: function() {
      this.pools.push({
        fromIn: this.ns1In,
        toIn: this.ns2In,
        direction: this.direction
      });
      this.ns1In = "";
      this.ns2In = "";
    },
    swapSettings: function() {
      if (this.inputDisabled) {
        if (this.location == "settings") this.location = "main";
        else if (this.location == "main") this.location = "settings";
      }
    },
    changeSettings: function() {
      this.inputDisabled = false;
    },
    swapHelp: function() {
      if (!this.help) $(".helpBox").hide().slideDown(300);
      else $(".helpBox").slideUp(300);
      this.help = !this.help;
    },
    check: function() {
      if(this.currentAnswerCorrect.toLowerCase() == this.answerIn.toLowerCase()) {
        this.checkColor = "green";
      }
      else {
        this.checkColor = "#f33";
      }
    },
    resetCheckColor: function() {
      this.checkColor = "";
    },
    showResults: function() {
      var all = [];
      var part = {};
      part.table = [];


      var from;
      var to;
      if(this.currentDirection == "right") {
        from = this.currentPool.fromIn;
        to = this.currentPool.toIn;
      }
      else {
        from = this.currentPool.toIn;
        to = this.currentPool.fromIn;
      }

      if(from == to) {
        part.heading = "Stejná soustava - výsledné číslo je stejné.";
        part.table = [];
        part.result = this.currentNumberReal;
        all.push(part);
      }
      else if(from == "10") {
        part.heading = "Použijeme metodu pro převod z desítkové soustavy:";
        part.tableStyle = "horizontal";
part.extended = false;
        var number = this.currentNumber10;
        var base = to;
        var rest;
        var afterRest;
        do {
          var row = [];
          row.push(number);
          row.push("/");
          row.push(base);
          row.push("=");
          rest = number%base;
          if(rest >= 10) afterRest = " = " + this.toSymbol(rest);
          else afterRest = "";
          number = Math.floor(number / base);
          row.push(number);
          row.push("zb.");
          row.push(rest + afterRest);
          row.push("↑")

          part.table.push(row);
        }while(number>0);
        part.result = numsystems.currentAnswerCorrect.toUpperCase();
        all.push(part);
      }
      else if(to == "10") {
        part.heading = "Použijeme metodu pro převod do desítkové soustavy:";
        part.tableStyle = "vertical";

        if(parseInt(from) > 10) {
          part.extended = true;
        }
        else {
          part.extended = false;
        }
        var row1 = [];
        var row1b = [];
        var row2 = [];
        var row3 = [];

        for (var i = 0; i < this.currentNumberReal.length; i++) {
          row1.push(this.currentNumberReal.charAt(i));
          if(part.extended) row1b.push(parseInt(this.currentNumberReal.charAt(i), 36));
          row2.push(parseInt(this.currentNumberReal.charAt(i), 36) + "×" + from + "<sup>" + (this.currentNumberReal.length-i-1) + "</sup>");
          row3.push(parseInt(this.currentNumberReal.charAt(i), 36) * Math.pow(parseInt(from),(this.currentNumberReal.length-i-1)));

          if(i != this.currentNumberReal.length-1) {
            row1.push("");
            if(part.extended) row1b.push("");
            row2.push("+");
            row3.push("+");
          }
        }
        part.table.push(row1);
        if(part.extended) part.table.push(row1b);
        part.table.push(row2);
        part.table.push(row3);
        part.result = numsystems.currentAnswerCorrect;
        all.push(part);

      }
      else {
        part.heading = "Číslo nejdříve převedeme do desítkové soustavy:";
        part.tableStyle = "vertical";
        if(parseInt(from) > 10) {
          part.extended = true;
        }
        else {
          part.extended = false;
        }
        var row1 = [];
        var row1b = [];
        var row2 = [];
        var row3 = [];

        for (var i = 0; i < this.currentNumberReal.length; i++) {
          row1.push(this.currentNumberReal.charAt(i));
          if(part.extended) row1b.push(parseInt(this.currentNumberReal.charAt(i), 36));
          row2.push(parseInt(this.currentNumberReal.charAt(i), 36) + "×" + from + "<sup>" + (this.currentNumberReal.length-i-1) + "</sup>");
          row3.push(parseInt(this.currentNumberReal.charAt(i), 36) * Math.pow(parseInt(from),(this.currentNumberReal.length-i-1)));

          if(i != this.currentNumberReal.length-1) {
            row1.push("");
            if(part.extended) row1b.push("");
            row2.push("+");
            row3.push("+");
          }
        }
        part.table.push(row1);
        if(part.extended) part.table.push(row1b);
        part.table.push(row2);
        part.table.push(row3);
        part.result = this.currentNumber10;
        all.push(part);
var part2 = {};
        part2.table = [];

        part2.heading = "Výsledek převedeme do konečné soustavy:";
        part2.tableStyle = "horizontal";
part2.extended = false;
        var number = this.currentNumber10;
        var base = to;
        var rest;
          var afterRest;
        do {
          var row = [];
          row.push(number);
          row.push("/");
          row.push(base);
          row.push("=");
          rest = number%base;
          if(rest >= 10) afterRest = " = " + this.toSymbol(rest);
          else afterRest = "";
          number = Math.floor(number / base);
          row.push(number);
          row.push("zb.");
          row.push(rest + afterRest);
          row.push("↑")

          part2.table.push(row);
        }while(number>0);
        part2.result = numsystems.currentAnswerCorrect.toUpperCase();
        all.push(part2);


      }
      this.all = all;
      this.answers = true;
        setTimeout(function(){
          $(".answers").slideUp(1).slideDown();
        },250);


    },
    generateNew: function() {
      this.location = "main";
      this.inputDisabled = true;
      this.firstAnim = true;
      this.generate();
    },
    generate: function() {
        $(".answers").slideUp();

      this.answers = false;
      this.anim = 1;
      var that = this;
      var timeout;
      if(this.firstAnim) {
        timeout = 0;
        this.firstAnim = false;
      }
      else timeout = 300;

      setTimeout(function(){
        that.anim = -1;
        setTimeout(function(){
          that.anim = 0;
        },20)




      that.answerIn = "";
      that.checkColor= "";
      that.answers = false;

      that.currentPool = that.pools[rand(0, that.pools.length-1)];
      that.currentPool.fromInInt = parseInt(that.currentPool.fromIn);
      that.currentPool.toInInt = parseInt(that.currentPool.toIn);
      if(that.currentPool.direction == "both") that.currentDirection = ["left","right"][rand(0,1)];
      else that.currentDirection = that.currentPool.direction;
      that.currentNumber10 = rand(that.rangeMin,that.rangeMax);

      if(that.currentDirection == "right") {
        that.currentNumberReal = that.currentNumber10.toString(that.currentPool.fromIn);
        that.currentAnswerCorrect = that.currentNumber10.toString(that.currentPool.toIn);
      }
      else {
        that.currentNumberReal = that.currentNumber10.toString(that.currentPool.toIn);
        that.currentAnswerCorrect = that.currentNumber10.toString(that.currentPool.fromIn);
      }
      that.currentNumberReal = that.currentNumberReal.toUpperCase();


},timeout);
    },
  }
});


$(".main").css("visibility", "visible");

$(document).ready(function(){

  $(".helpBox").resizable();
//numsystems.swapHelp();
//numsystems.generateNew();
})
var inAnim = false;
$(".poolInput button").click(function() {

  if (!inAnim) {
    inAnim = true;
    var theButton = $(this);
    theButton.children().children().css("animation", "arrowUp .5s");
    setTimeout(function() {
      theButton.children().children().css("animation", "");
      inAnim = false;
    }, 500);
  }

});
