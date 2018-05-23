function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);

}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
var soustavy = new Vue({
  el: '#soustavy',
  data: {
    from: 10,
    to: 2,
    fromNumber: "",
    toNumber: "",
    toIn: "",
    exOn: 0,
    exOnMiddle: false,
    exOnMiddle2: true,
    range: "0-1000",
    correct: "",
    inHide: false,
    rangeMin: 0,
    rangeMax: 1000,
    stepsVal: "",



  },
  methods: {
    generate: function() {
      this.stepsVal = "";

      if (this.exOn == 0) {
        soustavy.newEx();

        this.exOn = 1;

        setTimeout(function() {

          soustavy.exOnMiddle = true;
          soustavy.exOnMiddle2 = false;
        }, 300);
      } else {
        this.inHide = true;

        Vue.nextTick(function() {
          soustavy.inHide = false;
          setTimeout(function() {
            soustavy.newEx();

          }, 300);

        })
      }
    },
    newEx: function() {
      this.correct = "";
      this.toIn = "";
      this.fromNumber = rand(this.rangeMin, this.rangeMax).toString(this.from);

      this.toNumber = parseInt(this.fromNumber, this.from).toString(this.to);
    },
    check: function() {
      if (parseInt(this.toIn, this.to) == parseInt(this.toNumber.toString(), this.to)) this.correct = "green"; //correct
      else this.correct = "#f33"; //incorrect
    },
    toSettings: function() {
      this.exOn = 0;

      setTimeout(function() {
        soustavy.exOnMiddle2 = true;
        soustavy.exOnMiddle = false;
      }, 300);
    },
    steps: function() {
      var html = "";
      var rest = [];
      var fromNumber = this.fromNumber;
      var from = this.from;
      var to = this.to;
      html += "<div style='display:inline-block'><table>";
      if (this.from != 10) {
        var lng = fromNumber.length;
        html += "<tr>";
        for (var i = 0; i < lng; i++) {
          if (i != 0) html += "<td> + </td>";
          html += "<td>" + fromNumber.charAt(i) + "×" + from + "<sup>" + (lng - i - 1) + "</sup></td>";
        }
        html += "</tr> <tr>";
        var sum = 0;
        for (var i = 0; i < lng; i++) {
          if (i != 0) html += "<td> + </td>";
          html += "<td>" + fromNumber.charAt(i) * Math.pow(from, (lng - i - 1)) + "</td>";
          sum += fromNumber.charAt(i) * Math.pow(from, (lng - i - 1));
          if (i == lng - 1) html += "<td> = </td><td>" + sum + "<sub>10</sub></td></td>";
          html += "";
        }
        fromNumber = sum;
        html += "</tr>";
      }
      html += "</table></div>";


      from = 10;
      if (to != 10) {


        html += "<br>"
        var lastN = -1;
        while (lastN != 0) {
          html += fromNumber + " / " + to + " = " + Math.floor(fromNumber / to) + "   zb. " + (fromNumber % to);
          rest.push(fromNumber % to);
          lastN = Math.floor(fromNumber / to);
          fromNumber = Math.floor(fromNumber / to);
          html += "<br>";

        }
        var fin = "";
        for (var i = rest.length - 1; i >= 0; i--) {
          var one = rest[i];
          if (one >= 10) one = "abcdefghijklmnopqrstuvwxyz" [one - 10];
          else one = one.toString();
          fin += one;

        }
        html += "<br> = " + fin + "<sub>" + to + "</sub>";

      }


      return html;
    },
    stepsCalc: function() {
      this.stepsVal = this.steps();
    }

  },
  computed: {
    rangeValid: function() {
      var valid = true;
      var count = this.range;
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
    fromValid: function() {
      var valid = true;
      var count = this.from;
      if (count.toString().split(' ').length > 1) valid = false;
      if (!isNumeric(count) || parseInt(count) < 2 || parseInt(count) > 36 || count % 1 != 0) valid = false;

      return valid;
    },
    toValid: function() {
      var valid = true;
      var count = this.to;
      if (count.toString().split(' ').length > 1) valid = false;
      if (!isNumeric(count) || parseInt(count) < 2 || parseInt(count) > 36 || count % 1 != 0) valid = false;

      return valid;
    },
    rangeColor: function() {
      if (!this.rangeValid) return "red";
      else return "";
    },
    fromColor: function() {
      if (!this.fromValid) return "red";
      else return "";
    },
    toColor: function() {
      if (!this.toValid) return "red";
      else return "";
    },

  }

});
