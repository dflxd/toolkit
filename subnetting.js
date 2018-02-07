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

function shuffle(array, dis) {
  var currentIndex = array.length - dis,
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
    baseIPIn: "192.0.2.0",
    basePrefix: 24,
    prefixIn: 24,
    basePrefixMin: 24,
    basePrefixMax: 24,
    diff: "2",


    subnetCountIn: "4-6",
    subnets: [],
    subnetCountMin: 0,
    subnetCountMax: 0,
    subnetsCount: "00000000000000000000000000000000",
    answers: false,
    settings: true,
    inputDisabled: false,
    help: false,
    fillAll: "",
    specsMask:false,
    specs: false,
    diffInfo: false,
    specsReserve: 1,
biggerFrame: "1400px",
    exclude: [
      {
        ip: "0.0.0.0",
        prefix: "/8"
      },
      {
        ip: "127.0.0.0",
        prefix: "/8"
      },
      {
        ip: "169.254.0.0",
        prefix: "/16"
      },
    ]
  },
  computed: {
    reserve: function() {
      var reserve;
      switch(this.specsReserve) {
        case 1:
          reserve = 0;
          break;
        case 2:
          reserve = 10;
          break;
        case 3:
          reserve = 25;
          break;
        case 4:
          reserve = 50;
          break;
        default:
          reserve = 0
          break;
      }
      return reserve;
    },
    reserveOut: function() {
      var reserve;
      switch(this.specsReserve) {
        case 1:
          reserve = 1;
          break;
        case 2:
          reserve = 100/110;
          break;
        case 3:
          reserve = 100/125;
          break;
        case 4:
          reserve = 100/150;
          break;
        default:
          reserve = 1
          break;
      }
      return reserve;
    },
    specsReserveSelected: function() {

      var left = 0;
      var width;
      for (var i = 1; i < this.specsReserve; i++) {
        left += parseInt($(".specsReserve label").eq(i-1).outerWidth());
      }
      width = $(".specsReserve label").eq(this.specsReserve-1).outerWidth();

      $(".specsReserve .sliderBackg").css("left",left+"px");
      $(".specsReserve .sliderBackg").css("width",width+"px");
    },
    specsMaskSelected: function() {

      var left = 0;
      var width;
      var val;
      if(!this.specsMask) val = 1;
      else val = 2;
      for (var i = 1; i < val; i++) {
        left += parseInt($(".specsMask label").eq(i-1).outerWidth());
      }
      width = $(".specsMask label").eq(val-1).outerWidth();

      $(".specsMask .sliderBackg").css("left",left+"px");
      $(".specsMask .sliderBackg").css("width",width+"px");
    },
    thediff: function() {
      var result = "";



      if(this.baseIPIn == "192.0.2.0" && this.prefixIn == "24" && this.subnetCountIn == "2-3") result = "1";
      else if(this.baseIPIn == "192.0.2.0" && this.prefixIn == "24" && this.subnetCountIn == "4-6") result = "2";
      else if(this.baseIPIn == "192.0.2.?" && this.prefixIn == "24-26" && this.subnetCountIn == "4-8") result = "3";
      else if(this.baseIPIn == "" && this.prefixIn == "22-26" && this.subnetCountIn == "4-8") result = "4";
      this.diff = result;
      return result;

    },
    countValid: function() {
      var valid = true;
      var count = this.subnetCountIn;
      if(count.toString().split(' ').length > 1) valid = false;
      if(count.toString().length <= 2) {
        if (!isNumeric(count) || parseInt(count) < 2 || parseInt(count) > 14 || count % 1 != 0) valid = false;
        if(valid) {
          this.subnetCountMin = count;
          this.subnetCountMax = count;
        }
      }
      else {
        var count1 = count.split("-")[0];
        var count2 = count.split("-")[1];
        if(count.split("-").length > 2) valid = false;
        if (!isNumeric(count1) || parseInt(count1) < 2 || parseInt(count1) > 14 || count1 % 1 != 0) valid = false;
        if (!isNumeric(count2) || parseInt(count2) < 2 || parseInt(count2) > 14 || count2 % 1 != 0) valid = false;
        if(parseInt(count1)  >= parseInt(count2)) valid = false;

        if(valid) {
          this.subnetCountMin = count1;
          this.subnetCountMax = count2;
        }
      }

      return valid;
    },
    ipValid: function() {
      var valid = true;
      var ip = this.baseIPIn;

      if(ip.toString().split(' ').length > 1) valid = false;

if(ip == "") {
  ip = "?.?.?.?";
}
      var octets = ip.split(".");
      if (octets.length != 4) {
        valid = false;
      } else {
        octets.forEach(function(octet) {
          if(octet != "?") {
              if (!isNumeric(octet) || parseInt(octet) < 0 || parseInt(octet) > 255) valid = false;
          }



        });
      }
      return valid;
    },
    prefixValid: function() {
      var valid = true;
      var prefix = this.prefixIn;

      if(prefix.toString().split(' ').length > 1) valid = false;

      if(prefix.toString().length <= 2) {
        if (!isNumeric(prefix) || parseInt(prefix) < 8 || parseInt(prefix) > 28 || prefix % 1 != 0) valid = false;

        if(valid) {
          this.basePrefixMin = prefix;
          this.basePrefixMax = prefix;
        }
      }
      else {
        var prefix1 = prefix.split("-")[0];
        var prefix2 = prefix.split("-")[1];
        if(prefix.split(' ').length > 1) valid = false;
        if(prefix.split("-").length > 2) valid = false;
        if (!isNumeric(prefix1) || parseInt(prefix1) < 8 || parseInt(prefix1) > 28 || prefix1 % 1 != 0) valid = false;
        if (!isNumeric(prefix2) || parseInt(prefix2) < 8 || parseInt(prefix2) > 28 || prefix2 % 1 != 0) valid = false;
        if(parseInt(prefix1) >= parseInt(prefix2)) valid = false;

        if(valid) {
          this.basePrefixMin = prefix1;
          this.basePrefixMax = prefix2;
        }
      }

      return valid;
    },
    comboValid: function() {
      var ip = this.baseIPInBit;

      var prefix = this.basePrefixMinBit;
      var valid = true;

        if (ip.length == 32 && prefix.length == 32) {
          for (var i = 0; i < 32; i++) {
            if (prefix.charAt(i) == 0 && ip.charAt(i) == 1) {
              valid = false;
              break;
            }
          }
        } else {
          valid = false;
        }

      return valid;
    },
    baseIPColor: function() {
      if (!this.ipValid) return "red";
      else if (!this.comboValid) return "#f40";
      else return "";
    },
    basePrefixColor: function() {
      if (!this.prefixValid) return "red";
      else if (!this.comboValid) return "#f40";
      else return "";
    },
    baseCountColor: function() {
      if (!this.countValid) return "red";
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
    basePrefixMinBit: function() {
      var str = "";
      var i = 0;
      while (i < 32) {
        if (i++ < this.basePrefixMin) str += "1";
        else str += "0";
      }
      return str;
    },
    basePrefixMaxBit: function() {
      var str = "";
      var i = 0;
      while (i < 32) {
        if (i++ < this.basePrefixMax) str += "1";
        else str += "0";
      }
      return str;
    },
    baseIPBit: function(){
      var str = "";
      var i = 0;
      var octets = this.baseIP.split(".");
      var that = this;
      octets.forEach(function(octet) {
        if(octet == "?") octet = 0;
        if (that.dec2bin(parseInt(octet)).length == 8) {
          str += that.dec2bin(parseInt(octet));
        } else {
          str += "00000000";
        }

      });
      return str;

    },
    baseIPInBit: function(){
      var str = "";
      var i = 0;
      if(this.baseIPIn == "") {
        return "00000000000000000000000000000000";
      }
      var octets = this.baseIPIn.split(".");
      var that = this;
      octets.forEach(function(octet) {
        if(octet == "?") octet = 0;
        if (that.dec2bin(parseInt(octet)).length == 8) {
          str += that.dec2bin(parseInt(octet));
        } else {
          str += "00000000";
        }

      });
      return str;

    },
    lastIP: function() {
      return this.bitToA(this.bitDeduct(this.bitAdd(this.baseIPBit, this.prefixToBit(this.basePrefix)), "00000000000000000000000000000001"));
    },
    basePrefixShow: function() {
      return this.basePrefixBit.match(/.{1,8}/g);
    },
    baseIPShow: function() {
      return this.baseIPBit.match(/.{1,8}/g);
    }
  },
  methods: {
    downTheIP: function () {
      var ip = this.baseIPInBit;
      var prefix = this.basePrefixMinBit;

      var i = 0;
      while(prefix[i] == 1 && i < 32) {
        i++;
      }
      var zeros = "";
      j = i;
      while(j < 32) {
        zeros += "0";
        j++;
      }
      this.baseIPIn = this.bitToA(ip.substr(0,i)+zeros);
    },
    updateSeed: function (e) {
      var val = e.target.value;
      if(val == "") {
        Math.seedrandom();
      }
      else {
        Math.seedrandom(val);
      }
      console.log("seed nastaven na "+val);
    },
    prefixToMask: function (prefix) {
      var bit = "";
      for (var i = 0; i < 32; i++) {
        if(i < prefix) bit += "1";
        else bit += "0";
      }
      var a = "";
      a += this.bin2dec(bit.slice(0, 8)).toString() + ".";
      a += this.bin2dec(bit.slice(8, 16)).toString() + ".";
      a += this.bin2dec(bit.slice(16, 24)).toString() + ".";
      a += this.bin2dec(bit.slice(24, 32)).toString();

      return a;
    },
    fillAllTrigger: function() {
      for (var i = 0; i < this.subnets.length; i++) {
        this.subnets[i].inFirstA = this.fillAll;
        this.subnets[i].inLastA = this.fillAll;
      }
    },
    changeSettings: function() {
      this.inputDisabled = false;

      this.subnets = [];
    },
    swapSettings: function() {
      if (this.inputDisabled) {
        this.settings = !this.settings;
      }
    },
    swapSubnettingHelp: function() {
      if (!this.help) $(".help").hide().slideDown(300);
      else $(".help").slideUp(300);
      this.help = !this.help;
    },
    swapSpecs: function() {
      this.specs = !this.specs;
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
      var reserve = this.reserveOut;
      if(reserve == 1) {
        return rand(Math.pow(2, range - 1) - 1, Math.pow(2, range) - 2);
      }
      else {
        var min = Math.ceil((Math.pow(2, range - 1) - 1)*reserve);
        var max = Math.floor((Math.pow(2, range) - 2)*reserve);
        return rand(min,max);
      }
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
      if (parseInt(this.subnetsCount.charAt(position - 1)) >= 2) {
        this.addToSubnetsCount(position, -2);
        this.addToSubnetsCount(position + 1, 1);
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
    toIP: function(ip) {
      if(ip == "") ip = "?.?.?.?";
      var custom = true;
      if(ip.substr(0,2) == "?.?") {
        custom = false;
      }
      var ipValid = true;
      var str = "";
      var i = 0;
      while (i < 32) {
        if (i++ < this.basePrefix) str += "1";
        else str += "0";
      }
      var prefix = this.basePrefix;
var basePrefixBit = str;

      var newIPBit = "";
      var newIP = "";
      var octets = ip.split(".");
      var i = 0;
      var first = true;
      if (octets.length != 4) {
        throw "Invalid ip";
      } else {
        var r = 0;
        do{
          ipValid = true;
          newIPBit = "";
          newIP = "";
          first = true;
          i = 0;
          octets.forEach(function(octet) {
            if(octet == "?") {
              var j = 0;
              var octetBit = "";
              if(first) {
                if(prefix >= 24) {
                  octetBit="110"
                  j = 3;
                }
                else if(prefix >= 16) {
                  octetBit="10"
                  j = 2;
                }
                else if(prefix >= 8) {
                  octetBit="0"
                  j = 1;
                }
              }

              for (; j < 8; j++) {

                if(basePrefixBit.charAt(8*i+j) == 1) octetBit += rand(0,1);
                else octetBit += "0";
              }
              newIP += subnetting.bin2dec(octetBit);
              newIPBit += octetBit;
            }
            else {
              newIP += octet;
              newIPBit += subnetting.dec2bin(octet);
            }
            first = false;
            i++;
            if(i < 4) newIP += ".";
          });
          //testing for excluded ranges
          if(!custom) {


          for (var i = 0; i < this.exclude.length; i++) {
            var eIpBit = "";
            var eOctets = this.exclude[i].ip.split(".");
            var that = this;
            eOctets.forEach(function(octet) {
              if (that.dec2bin(parseInt(octet)).length == 8) {
                eIpBit += that.dec2bin(parseInt(octet));
              } else {
                eIpBit += "00000000";
              }
            });
            var ePrefix = this.exclude[i].prefix.substr(1);

              if(newIPBit.substr(0,ePrefix) == eIpBit.substr(0,ePrefix)) {
                ipValid = false;

                console.error("Ip within excluded range. Regenerating.");
                break;

            }
          }
          if(r > 100) throw "fail";
          r++;
            }
        }while(!ipValid);
      }
      return newIP;
    },
    generateNew: function() {
      this.settings = false;
      this.inputDisabled = true;
      this.generate();
    },
    generate: function() {

      this.basePrefix = rand( parseInt(this.basePrefixMin) , parseInt(this.basePrefixMax) );
      var subnetCount = rand( parseInt(this.subnetCountMin) , parseInt(this.subnetCountMax) );
      if(Math.pow(2,29-this.basePrefix) < subnetCount) {
        subnetCount = Math.pow(2,29-this.basePrefix);

      }

      this.baseIP = this.toIP(this.baseIPIn);

      this.answers = false;
      $(".settings").hide();
      this.subnets = [];
      this.subnetsCount = "00000000000000000000000000000000";

      //generace počtu routerů(schéma);
      var rCountOpts = [];
      for (var i = 1; i <= 3; i++) {
        var limitS = (i * 2) - 1;
        var limitE = (i * 5) - 1;
        if (subnetCount >= limitS && subnetCount <= limitE) {

          if (rCountOpts.length == 0) rCountOpts.push(i);
          else if (rand(1, 2) == 1) rCountOpts.push(i);
        }
      }
      var rCount = rCountOpts[rand(1, rCountOpts.length) - 1];


      for (var i = 0; i < subnetCount; i++) {
        if (this.countHosts() >= this.hostsMax) {
          alert("Víc podsítí nelze vytvořit");
          break;
        }
        var limit;
        var minLimit = (subnetCount - i - 1) * 8;
        if (this.basePrefix <= 24) {
        //  limit = Math.ceil(((subnetCount - i - 2)) + Math.pow((subnetCount - i - 1), 1.8));
        limit = Math.ceil(Math.pow((subnetCount - i), 2)-(i*2));
          if (limit < minLimit) limit = minLimit;
        } else {
          limit = minLimit;
        }
        var max = this.convertToBit(bitFloor(this.hostsMax - this.countHosts() - limit));
        if (max < 3) max = 3;
        var bitRange = rand(3, max);
        if (rCount > subnetCount - i) bitRange = 2;
        this.addToSubnetsCount(bitRange, 1);
        this.subnets.push({
          name: "Subnet " + 'abcdefghijklmnopqrstuvwxyz' [this.subnets.length].toUpperCase(),
          hosts: this.randInBitRange(bitRange),
          bitCeil: bitRange,
          prefix: 32 - bitRange,
          mask: this.prefixToMask(32 - bitRange),
          parent: "",
          firstA: "",
          lastA: "",
          inFirstA: "",
          inLastA: "",
          inPrefix: "",
          inMask: "",
          firstACheckColor: "",
          lastACheckColor: "",
          prefixCheckColor: ""
        });
      }
      this.subnets = shuffle(this.subnets, rCount - 1);

      for (var i = 0; i < (rCount-1); i++) {
        this.subnets[this.subnets.length-i-1].parent="btw";
      }

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

      var imgR = new Image();

      imgR.onload = function() {
        drawImageRs();
      }
      imgR.src = "img/r.png";
      var imgS = new Image();
      imgS.onload = function() {
        drawImageSs();
      }
      imgS.src = "img/s.png";

      var width = 1110;
      var height = 520;
      var offset = 350;
      var offsetSubnetsX = 150;
      var offsetSubnetsY = 125;


      var rs = [];
      var rsBetween = [];
      for (var i = 0; i < rCount; i++) {
        rs.push({
          position: {
            x: 0,
            y: 0
          },
          subnets: []
        });
      }

      var rDistribution = [];
      var subnetsTotal = this.subnets.length;

      for (var i = 0; i < rCount; i++) {
        var rLimitMin = subnetsTotal - (((rCount - (i + 1)) * 4) + (rCount - 1));

        if (rLimitMin < 1) rLimitMin = 1;
        var rLimitMax = subnetsTotal - (rCount - 1) - (rCount - (i + 1));
        if (rLimitMax > 4) rLimitMax = 4;
        var add = rand(rLimitMin, rLimitMax);

        rDistribution.push(add);
        subnetsTotal -= add;
      }

      var k = 0;
      for (var i = 0; i < rDistribution.length; i++) {
        for (var j = 0; j < rDistribution[i]; j++) {
          rs[i].subnets.push({
            name: this.subnets[k].name,
            hosts: this.subnets[k].hosts,
            position: {
              x: 0,
              y: 0
            },
            placement: ""
          });
          k++;

        }
      }

      for (var i = 1; i < rCount; i++) {


        rsBetween.push({
          name: this.subnets[k].name,
          hosts: this.subnets[k].hosts,
          position: {
            x: 0,
            y: 0
          },
          placement: ""
        });
        k++;
      }

    /*  for (var i = 0; i < this.subnets.length; i++) {
        this.subnets[i]
      }*/

      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (rCount == 1) {
        rs[0].position.x = width / 2;
        rs[0].position.y = height / 2;
      } else if (rCount == 2) {
        rs[0].position.x = width / 2 - offset / 2;
        rs[0].position.y = height / 2;

        rs[1].position.x = width / 2 + offset / 2;
        rs[1].position.y = height / 2;
      } else if (rCount == 3) {
        rs[0].position.x = width / 2 - offset;
        rs[0].position.y = height / 2;

        rs[1].position.x = width / 2;
        rs[1].position.y = height / 2;

        rs[2].position.x = width / 2 + offset;
        rs[2].position.y = height / 2;
      } else {
        throw new Error("Diagram draw error. Out of range.");
      }
      for (var i = 0; i < rCount; i++) {
        var sCount = rs[i].subnets.length;
        var subnetsUp;
        if (sCount % 2 != 0) {
          if (rand(1, 2) == 1) {
            subnetsUp = Math.ceil(sCount / 2);
          } else {
            subnetsUp = Math.floor(sCount / 2);
          }
        } else {
          subnetsUp = sCount / 2;
        }


        var subnetsDown = sCount - subnetsUp;
        if ((subnetsUp < 0 || subnetsUp > 2) || (subnetsDown < 0 || subnetsDown > 2)) throw new Error("Diagram draw error. Subnets out of range.");
        for (var j = 0; j < subnetsUp; j++) {

          var subnet = rs[i].subnets[j];
          subnet.position.y = height / 2 - offsetSubnetsY;

          if (subnetsUp == 1) {
            subnet.position.x = rs[i].position.x;
          } else if (subnetsUp == 2) {
            subnet.position.x = rs[i].position.x + (j - 0.5) * offsetSubnetsX;
          }
          subnet.placement = "up";
        }
        for (var j = subnetsUp; j < sCount; j++) {
          var subnet = rs[i].subnets[j];
          subnet.position.y = height / 2 + offsetSubnetsY;
          if (subnetsDown == 1) {
            subnet.position.x = rs[i].position.x;
          } else if (subnetsDown == 2) {
            subnet.position.x = rs[i].position.x + (j - subnetsUp - 0.5) * offsetSubnetsX;
          } else {
            throw new Error("Diagram draw error. Out of range.");
          }
          subnet.placement = "down";
        }
      }
      ctx.beginPath();
      var wirelessSize = 7;
      ctx.font = '18px Nunito';
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      for (var i = 0; i < rCount; i++) {
        if (i != 0) {
          ctx.moveTo(rs[i].position.x, rs[i].position.y + wirelessSize);
          ctx.lineTo(rs[i - 1].position.x + (offset / 2) - wirelessSize, rs[i - 1].position.y + wirelessSize);
          ctx.lineTo(rs[i].position.x - (offset / 2) + wirelessSize, rs[i].position.y - wirelessSize);
          ctx.lineTo(rs[i - 1].position.x, rs[i - 1].position.y - wirelessSize);

          ctx.fillText(rsBetween[i - 1].name, (rs[i].position.x + rs[i - 1].position.x) / 2, rs[i].position.y - 50);

          ctx.fillText(rsBetween[i - 1].hosts + " hosts", (rs[i].position.x + rs[i - 1].position.x) / 2, rs[i].position.y - 25);
        }
        for (var j = 0; j < rs[i].subnets.length; j++) {
          ctx.moveTo(rs[i].position.x, rs[i].position.y);
          ctx.lineTo(rs[i].subnets[j].position.x, rs[i].subnets[j].position.y);

          var margin;
          if (rs[i].subnets[j].placement == "up") margin = -60;
          else margin = 45;

          ctx.fillText(rs[i].subnets[j].name, rs[i].subnets[j].position.x, rs[i].subnets[j].position.y + margin);
          /*var text;
          if(rs[i].subnets[j].hosts > 4) text = "hostů";
          else text = "hosti";*/
          ctx.fillText(rs[i].subnets[j].hosts + " hosts", rs[i].subnets[j].position.x, rs[i].subnets[j].position.y + margin + 25);
        }
      }

      ctx.lineWidth = 3;
      ctx.strokeStyle = 'white';
      ctx.stroke();




      function drawImageRs() {
        for (var i = 0; i < rCount; i++) {
          ctx.drawImage(imgR, rs[i].position.x - imgR.width / 2, rs[i].position.y - imgR.height / 2);
        }
      }

      function drawImageSs() {
        for (var i = 0; i < rCount; i++) {
          for (var j = 0; j < rs[i].subnets.length; j++) {
            ctx.drawImage(imgS, rs[i].subnets[j].position.x - imgS.width / 2, rs[i].subnets[j].position.y - imgS.height / 2);
          }
        }
      }
    },
    check: function() {
      var rightColor = "green";
      var notRightColor = "#f33";

      for (var i = 0; i < this.subnets.length; i++) {
        var inFirstA = this.subnets[i].inFirstA.replace(/\s/g, '');
        var inLastA = this.subnets[i].inLastA.replace(/\s/g, '');
        var inPrefix = this.subnets[i].inPrefix.replace(/\s/g, '');
        var inMask = this.subnets[i].inMask.replace(/\s/g, '');
        var firstA = this.subnets[i].firstA;
        var lastA = this.subnets[i].lastA;
        var prefix = this.subnets[i].prefix;
        var mask = this.subnets[i].mask;


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
        if(!this.specsMask) {
          if (prefix == inPrefix.replace('/', '')) {
            this.subnets[i].prefixCheckColor = rightColor;
          } else {
            this.subnets[i].prefixCheckColor = notRightColor;
          }
        }
        else {
          if (mask == inMask) {
            this.subnets[i].prefixCheckColor = rightColor;
          } else {
            this.subnets[i].prefixCheckColor = notRightColor;
          }
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
    setDiff1: function() {
      if(!this.inputDisabled) {
      this.baseIPIn = "192.0.2.0";
      this.prefixIn = "24";
      this.subnetCountIn = "2-3";
      this.diff = "1";
      }
    },
    setDiff2: function() {
      if(!this.inputDisabled) {
      this.baseIPIn = "192.0.2.0";
      this.prefixIn = "24";
      this.subnetCountIn = "4-6";
      this.diff = "2";
      }
    },
    setDiff3: function() {
      if(!this.inputDisabled) {
      this.baseIPIn = "192.0.2.?";
      this.prefixIn = "24-26";
      this.subnetCountIn = "4-8";
      this.diff = "3";
      }
    },
    setDiff4: function() {
      if(!this.inputDisabled) {
        this.baseIPIn = "";
        this.prefixIn = "22-26";
        this.subnetCountIn = "4-8";
        this.diff = "4";
      }
    },

    /*save: function() {
      var input = $("#switch input").val();
      var valid = true;

      if (!isNumeric(input) || input % 1 != 0) valid = false;
      if (input < 2 || input > 14) valid = false;
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
    }*/
  }
});

var inAnim = false;
$(".sectionL button").click(function(){

  if(!inAnim) {
    inAnim = true;
    var theButton = $(this);
    theButton.children().css("animation","arrowUp .5s");
    setTimeout(function(){
      theButton.children().css("animation","");
      inAnim = false;
    },500);
  }

});
$(".main").css("visibility", "visible");
