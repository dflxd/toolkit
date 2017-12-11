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
    help: false,
    fillAll: "",
  },
  computed: {
    ipValid: function() {
      var valid = true;
      var ip = this.baseIP;

      var octets = ip.split(".");
      if(octets.length != 4) {
        valid = false;
      }
      else {
        octets.forEach(function(octet) {
          console.log(octet);
          if(!isNumeric(octet) || parseInt(octet) < 0 || parseInt(octet) > 255) valid = false;
        });
      }
      return valid;
    },
    prefixValid: function() {
      var valid = true;
      var prefix = this.basePrefix;

      if(!isNumeric(prefix) || parseInt(prefix) < 0 || parseInt(prefix) > 29 || prefix%1 != 0) valid = false;

      return valid;
    },
    comboValid: function() {
      var ip = this.baseIPBit;
      var prefix = this.basePrefixBit;
      var valid = true;
      console.log(ip);
      console.log(prefix);
      if(ip.length == 32 && prefix.length == 32) {
        for (var i = 0; i < 32; i++) {
          if(prefix.charAt(i) == 0 && ip.charAt(i) == 1) {
            valid = false;
            break;
          }
        }
      }
      else {
        valid = false;
      }
      return valid;
    },
    baseIPColor: function() {
      if(!this.ipValid) return "red";
      else if(!this.comboValid) return "#f40";
      else return "";
    },
    basePrefixColor: function() {
      if(!this.prefixValid) return "red";
      else if(!this.comboValid) return "#f40";
      else return "";
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
      console.log("start");
      var str = "";
      var i = 0;
      var octets = this.baseIP.split(".");
      var that = this;
      console.log("start");
      octets.forEach(function(octet) {
        if(that.dec2bin(parseInt(octet)).length == 8) {
          str += that.dec2bin(parseInt(octet));
        }
        else {
          str += "00000000";
        }

      });
        console.log("stop");
      return str;
    }
  },
  methods: {
    fillAllTrigger: function() {
      for (var i = 0; i < this.subnets.length; i++) {
        this.subnets[i].inFirstA = this.fillAll;
        this.subnets[i].inLastA = this.fillAll;
      }
    },
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
    swapSubnettingHelp: function() {
      if(!this.help)$(".help").hide().slideDown(300);
      else $(".help").slideUp(300);
      this.help = !this.help;
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

      while (zeros-- > 0) {
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
    addToSubnetsCount: function(position, change) {
      this.subnetsCount = this.subnetsCount.replaceAt(position - 1, (parseInt(this.subnetsCount.charAt(position - 1)) + change).toString());
      if(parseInt(this.subnetsCount.charAt(position - 1)) >= 2) {
        this.addToSubnetsCount(position, -2);
        this.addToSubnetsCount(position+1, 1);
      }
      /*zaloha puvodni verze funkce
      if(parseInt(this.subnetsCount.charAt(position - 1)) >= 1) {
        this.subnetsCount = this.subnetsCount.replaceAt(position, (parseInt(this.subnetsCount.charAt(position)) + 1).toString());
        this.subnetsCount = this.subnetsCount.replaceAt(position - 1, (parseInt(this.subnetsCount.charAt(position - 1)) - 1).toString());
      }
      else {
          this.subnetsCount = this.subnetsCount.replaceAt(position - 1, (parseInt(this.subnetsCount.charAt(position - 1)) + 1).toString());
      }*/
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
        console.log(this.countHosts());
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
        console.log("bitrange max: " + max);
        this.addToSubnetsCount(bitRange,1);
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
        var inFirstA = this.subnets[i].inFirstA.replace(/\s/g, '');
        var inLastA = this.subnets[i].inLastA.replace(/\s/g, '');
        var inPrefix = this.subnets[i].inPrefix.replace(/\s/g, '');
        var firstA = this.subnets[i].firstA;
        var lastA = this.subnets[i].lastA;
        var prefix = this.subnets[i].prefix;


        if (firstA == inFirstA) {
          this.subnets[i].firstACheckColor = rightColor;
        } else {
          this.subnets[i].firstACheckColor = notRightColor;
        }
        if (lastA == inLastA) {
          this.subnets[i].lastACheckColor = rightColor;
        } else {
          this.subnets[i].lastACheckColor = notRightColor;
        }
        if (prefix == inPrefix.replace('/', '')) {
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

      if (!isNumeric(input) || input%1 != 0) valid = false;
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
    cust: function() {
      if (!this.inputDisabled) {
        var that = this;
        $("#switch span").eq(0).hide();
        $("#switch span").eq(1).text("");
        $("#switch input").show();
        $("#switch input").focus();
        $("#switch input").focusout(function() {
          that.save();
        });

      }
    }
  }
});
$(document).keypress(function(e) {
  if (e.which == 13) {
    subnetting.save();
  }
});
$(".main").css("visibility","visible");
