function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var soustavy = new Vue({
  el: '#soustavy',
  data: {
    from: 0,
    to: 0,
    fromNumber: "",
    toNumber: "",
    toIn: "",
    exOn: false

  },
  methods: {
    generate: function() {

      this.fromNumber = rand(10,1000);
      this.toNumber = this.fromNumber.toString(this.to);
      this.exOn = true;
    },
    check: function() {
      if(this.toIn == this.toNumber) alert("spravne");
      else alert("ne");
    }
  }
});
