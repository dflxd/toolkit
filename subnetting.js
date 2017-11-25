String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function bitFloor(number) {
  if (number <= 0) return 0;
  var floor = Math.pow(2, 32);
  while (floor > number) {
    floor /= 2;
  }
  return floor;
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var subnetting = new Vue({
  el: '#subnetting',
  data: {
    baseIP: "192.0.2.0",
    basePrefix: 24,
    subnets: [],
    picked: null,
    subnetCountMin: 0,
    subnetCountMax: 0,
    subnetsCount: "00000000000000000000000000000000",
    answers: false,
    settings: true,
    inputDisabled: false,
  },
  computed: {
    diffChosen: function() {
      return !this.picked;
    },
    hostsMax: function() {
      return Math.pow(2, 32 - parseInt(this.basePrefix));
    },
    hostsMaxBit: function() {
      return 32 - parseInt(this.basePrefix);
    },
    basePrefixBit: function() {
      var str = "";
      var i = 0;
      while (i < 32) {
        if (i++ < this.basePrefix) str += "1";
        else str += "0";
      }
      return str;
    },
    baseIPBit: function() {
      var str = "";
      var i = 0;
      var octets = this.baseIP.split(".");
      var that = this;
      octets.forEach(function(octet) {
        str += that.dec2bin(parseInt(octet));
      });
      return str;
    }
  },
  methods: {
    changeSettings: function() {
      this.inputDisabled = false;
      $("#c").prop('checked', false);
      this.picked = false;
      this.subnets = [];
    },
    swapSettings: function() {
      if (this.inputDisabled) {
        this.settings = !this.settings;
      }
    },
    convertToBit: function(n) {
      var bit = 0;
      while (n > 1) {
        n /= 2;
        bit++;
      }
      return bit;
    },
    prefixToBit: function(prefix) {
      var str = "00000000000000000000000000000000";
      return str.replaceAt(prefix - 1, "1");
    },
    bitToA: function(bit) {
      var a = "";
      a += this.bin2dec(bit.slice(0, 8)).toString() + ".";
      a += this.bin2dec(bit.slice(8, 16)).toString() + ".";
      a += this.bin2dec(bit.slice(16, 24)).toString() + ".";
      a += this.bin2dec(bit.slice(24, 32)).toString();
      return a;
    },
    bitDeduct: function(a, b) {
      var result = "";
      var leftover = 0;
      for (var i = 31; i >= 0; i--) {
        var sum = parseInt(a[i]) - parseInt(b[i]) - leftover;
        if (sum == -1) {
          sum = 1;
          leftover = 1;
        } else {
          leftover = 0;
        }
        result = sum.toString() + result;
      }
      return result;
    },
    bitAdd: function(a, b) {
      var result = "";
      var leftover = 0;
      for (var i = 31; i >= 0; i--) {
        var sum = parseInt(a[i]) + parseInt(b[i]) + leftover;
        leftover = 0;
        if (sum >= 2) {
          leftover++;
          if (sum == 2) {
            result = "0" + result;
          } else if (sum == 3) {
            result = "1" + result;
          } else {
            alert("error (binAdd)");
            result = "error";
          }
        } else {
          result = sum.toString() + result;
        }
      }
      return result;
    },
    dec2bin: function(dec) {
      var str = "";
      var zeros = 8 - dec.toString(2).length;
      while (zeros--) {
        str += "0";
      }
      str += dec.toString(2);
      return str;
    },
    bin2dec: function(bin) {
      return parseInt(bin, 2);
    },
    randInBitRange: function(range) {
      if (range == 2) return 2;
      return rand(Math.pow(2, range - 1) - 1, Math.pow(2, range) - 2);
    },
    bitFloor: function(number) {
      var a = 0;
      var b = this.hostsMax;
      while (number <= b) {
        b = b / 2;
        a = a + 1;
        if (a > 32) return false;
      }
      return (a);
    },
    countHosts: function() {
      var hosts = 0;
      for (var i = 0; i < this.subnetsCount.length; i++) {
        hosts += parseInt(this.subnetsCount[i]) * Math.pow(2, i + 1);
      }
      return hosts;
    },
    addToSubnetsCount: function(position) {
      this.subnetsCount = this.subnetsCount.replaceAt(position - 1, (parseInt(this.subnetsCount.charAt(position - 1)) + 1).toString());
    },
    generateNew: function() {
      this.settings = false;
      this.inputDisabled = true;
      var chosenSubnetsCount = $('input[name=diff]:checked', '.diff').val();
      if (chosenSubnetsCount == "custom") {
        this.subnetCountMin = parseInt($("#custom").text());
        this.subnetCountMax = parseInt($("#custom").text());
      } else {
        this.subnetCountMin = parseInt(chosenSubnetsCount);
        this.subnetCountMax = this.subnetCountMin + 1;
      }
      this.generate();
    },
    generate: function() {
      this.answers = false;
      $(".settings").hide();
      this.subnets = [];
      this.subnetsCount = "00000000000000000000000000000000";
      var subnetCount = rand(this.subnetCountMin, this.subnetCountMax);
      for (var i = 0; i < subnetCount; i++) {
        if (this.countHosts() >= this.hostsMax) {
          alert("Víc podsítí nelze vytvořit");
          break;
        }
        var limit;
        if (this.basePrefix <= 24) {
          limit = (subnetCount - i + 1) + Math.pow((subnetCount - i - 1), 2);
        } else {
          limit = (subnetCount - i - 1) * 4;
        }
        var max = this.convertToBit(bitFloor(this.hostsMax - this.countHosts() - limit));
        if (max < 2) max = 2;
        var bitRange = rand(2, max);
        this.addToSubnetsCount(bitRange);
        this.subnets.push({
          name: "Subnet " + 'abcdefghijklmnopqrstuvwxyz' [this.subnets.length].toUpperCase(),
          hosts: this.randInBitRange(bitRange),
          bitCeil: bitRange,
          prefix: 32 - bitRange,
          parent: "r1",
          firstA: "",
          lastA: "",
          inFirstA: "",
          inLastA: "",
          inPrefix: "",
          firstACheckColor: "",
          lastACheckColor: "",
          prefixCheckColor: ""
        });
      }
      this.subnets = shuffle(this.subnets);
      for (i = 0; i < this.subnets.length; i++) {
        this.subnets[i].name = "Subnet " + 'abcdefghijklmnopqrstuvwxyz' [i].toUpperCase();
      }
      this.subnets.sort(function(a, b) {
        if (a.prefix < b.prefix) return -1;
        if (a.prefix > b.prefix) return 1;
        return 0;
      });
      var base = this.baseIPBit;
      var that = this;
      this.subnets.forEach(function(item) {
        item.firstA = that.bitToA(base);
        base = that.bitAdd(base, that.prefixToBit(item.prefix));
        item.lastA = that.bitToA(that.bitDeduct(base, "00000000000000000000000000000001"));
      });
      this.subnets.sort(function(a, b) {
        if (a.name[7] < b.name[7]) return -1;
        if (a.name[7] > b.name[7]) return 1;
        return 0;
      });
    },
    check: function() {
      var rightColor = "green";
      var notRightColor = "#f33";
      for (var i = 0; i < this.subnets.length; i++) {
        if (this.subnets[i].firstA == this.subnets[i].inFirstA) {
          this.subnets[i].firstACheckColor = rightColor;
        } else {
          this.subnets[i].firstACheckColor = notRightColor;
        }
        if (this.subnets[i].lastA == this.subnets[i].inLastA) {
          this.subnets[i].lastACheckColor = rightColor;
        } else {
          this.subnets[i].lastACheckColor = notRightColor;
        }
        if (this.subnets[i].prefix == this.subnets[i].inPrefix.replace('/', '')) {
          this.subnets[i].prefixCheckColor = rightColor;
        } else {
          this.subnets[i].prefixCheckColor = notRightColor;
        }
      }
    },
    showResults: function() {
      this.answers = true;
    },
    resetFirstA: function(item) {
      item.firstACheckColor = "";
    },
    resetLastA: function(item) {
      item.lastACheckColor = "";
    },
    resetPrefix: function(item) {
      item.prefixCheckColor = "";
    },
    save: function() {
      var input = $("#switch input").val();
      var valid = true;
      if (!isNumeric(input)) valid = false;
      if (input < 2 || input > 15) valid = false;
      if (valid) {
        $("#switch span").eq(0).text($("#switch input").val());
        if ($("#switch input").val() <= 4) $("#switch span").eq(1).text("subnety");
        else $("#switch span").eq(1).text("subnetů");
        $("#switch input").hide();
        $("#switch span").eq(0).show();
      } else {
        subnetting.picked = null;
        $("#switch span").eq(0).text("custom");
        $("#switch span").eq(1).text("");
        $("#switch input").val("");
        $("#switch input").hide();
        $("#switch span").eq(0).show();
        $("#c").prop('checked', false);
      }
    },
    abc: function() {
      if (!this.inputDisabled) {
        var that = this;
        $("#switch span").eq(0).hide();
        $("#switch span").eq(1).text("");
        $("#switch input").show();
        $("#switch input").focus();
        $("#switch input").focusout(function() {
          that.save();
        });
        $(document).keypress(function(e) {
          if (e.which == 13) {
            that.save();
          }
        });
      }
    }
  }
});
