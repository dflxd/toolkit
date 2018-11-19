String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var app = new Vue({
  el: '#app',
  data: {
    location: "settings",
    inputDisabled: false,
    help: false,
    page: "main",

  },
  computed: {

  },
  methods: {
    swapSettings: function() {
      if (this.inputDisabled) {
        if (this.location == "settings") this.location = "main";
        else if (this.location == "main") this.location = "settings";
      } else if (this.location.substring(0, 3) == "mod") {
        this.location = "settings";
      }
    },
    swapHelp: function() {
      if (!this.help) $(".helpBox").hide().slideDown(300);
      else $(".helpBox").slideUp(300);
      this.help = !this.help;
    },

  },
  beforeMount() {

  },
  mounted() {

  }
});
