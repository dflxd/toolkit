var atf = new Vue({
  el: '#atf',
  data: {
    inputDisabled: false,
    page: "main",
    location: "settings",
    lastLocation: "main",
    help: false,
    text: "",
    textLines: [],
    currentLine: [],
    currentLineCorrect: [],
    incorrect: [],
    loadingText: false,
    lineNo: 0,
    settFilterLevel: 0,
    settFilterLevelPosition: {
      left: "0px",
      width: "50px"
    },
    settFilterBehavior: 0,
    settFilterBehaviorPosition: {
      left: "0px",
      width: "50px"
    },
    settFocus: 0,
    settFocusPosition: {
      left: "0px",
      width: "50px"
    },
    settCaseSensitive: false,
    settSpecial: "",
    settSpecialAll: false,
    settSource: 0,
    settReward: false,
    settRewardKeyword: "",
    rewardCoverWidth: "0px",
    rewardVisible: false,
    rewardPercents: "0%",
    layoutModal: false,
    inputMode: "normal",
    autoInterval: undefined,
    errorsList: [],
    layoutMouseDown: false,
    layout: [
      [{
          key: "1",
          state: "on",
          correction: "-56px"
        },
        {
          key: "2",
          state: "on"
        },
        {
          key: "3",
          state: "on"
        },
        {
          key: "4",
          state: "on"
        },
        {
          key: "5",
          state: "on"
        },
        {
          key: "6",
          state: "on"
        },
        {
          key: "7",
          state: "on"
        },
        {
          key: "8",
          state: "on"
        },
        {
          key: "9",
          state: "on"
        },
        {
          key: "0",
          state: "on"
        },

      ],
      [{
          key: "ě",
          state: "on",
          correction: "0px"
        },
        {
          key: "š",
          state: "on"
        },
        {
          key: "č",
          state: "on"
        },
        {
          key: "ř",
          state: "on"
        },
        {
          key: "ž",
          state: "on"
        },
        {
          key: "ý",
          state: "on"
        },
        {
          key: "á",
          state: "on"
        },
        {
          key: "í",
          state: "on"
        },
        {
          key: "é",
          state: "on"
        },

      ],
      [{
          key: "q",
          state: "on",
          correction: "0px"
        },
        {
          key: "w",
          state: "on"
        },
        {
          key: "e",
          state: "on"
        },
        {
          key: "r",
          state: "on"
        },
        {
          key: "t",
          state: "on"
        },
        {
          key: "z",
          state: "on"
        },
        {
          key: "u",
          state: "on"
        },
        {
          key: "i",
          state: "on"
        },
        {
          key: "o",
          state: "on"
        },
        {
          key: "p",
          state: "on"
        },

      ],
      [{
          key: "a",
          state: "on",
          correction: "40px"
        },
        {
          key: "s",
          state: "on"
        },
        {
          key: "d",
          state: "on"
        },
        {
          key: "f",
          state: "on"
        },
        {
          key: "g",
          state: "on"
        },
        {
          key: "h",
          state: "on"
        },
        {
          key: "j",
          state: "on"
        },
        {
          key: "k",
          state: "on"
        },
        {
          key: "l",
          state: "on"
        },
        {
          key: "ů",
          state: "on"
        },
      ],
      [{
          key: "y",
          state: "on",
          correction: "-60px"
        },
        {
          key: "x",
          state: "on"
        },
        {
          key: "c",
          state: "on"
        },
        {
          key: "v",
          state: "on"
        },
        {
          key: "b",
          state: "on"
        },
        {
          key: "n",
          state: "on"
        },
        {
          key: "m",
          state: "on"
        },
      ]
    ],
    sourceCustom: "",
    sourceRSS: "",
    rewardUrl: "",
    stats: {
      show: true,

      strokeDelays: [],
      strokeDelaysSum: 0,
      lastStrokeTime: 0,
      speedPoolSize: 30,
      resetTimeout: 10, //sec
      realSpeed: 0,
      animSpeed: 0,
      firstStroke: 0,
      lastStroke: 0,
      overallSpeed: 0,
      totalStrokes: 0,
      errorLoc: 0,
      errorCount: 0,
    },
    settFilters: false,
  },
  computed: {
    disabledChars: function() {
      var disabled = "";
      for (var i = 0; i < this.layout.length; i++) {
        for (var j = 0; j < this.layout[i].length; j++) {
          if (this.layout[i][j].state == "off") disabled += this.layout[i][j].key;
        }
      }
      if (!this.settSpecialAll) disabled += this.settSpecial;
      else disabled += "!\"#$%&'()*+,-./:;<=>?@[\\]^_{|}~§";
      return disabled;
    },
    settingsValid: function() {
      var valid = true;
      this.errorsList = [];
      var pattern = new RegExp(/^[^,\s]+$/);
      if (this.settReward && !pattern.test(this.settRewardKeyword)) {
        valid = false;
        this.errorsList.push("Špatně (ne)zadané kličové slovo u konečné odměny");
      }
      if (this.settSource == 0) {
        valid = false;
        this.errorsList.push("Není zvolen zdroj textu");
      }
      if (this.settSource == 1 && this.sourceCustom.length == 0) {
        valid = false;
        this.errorsList.push("Není vložen vlastní text");
      }
      if (this.settSource == 2 && !/(http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/.test(this.sourceRSS)) {
        valid = false;
        this.errorsList.push("Nevalidní RSS URL");
      }
      return valid;
    },
    settFilterLevelSelected: function() {
      var left = 0;
      var width;
      for (var i = 1; i < this.settFilterLevel; i++) {
        left += parseInt(realWidth($(".settFilterLevel label").eq(i - 1)));
      }
      width = realWidth($(".settFilterLevel label").eq(this.settFilterLevel - 1));
      this.settFilterLevelPosition.left = left + "px";
      this.settFilterLevelPosition.width = width + "px";
      return width;
    },
    settFilterBehaviorSelected: function() {
      var left = 0;
      var width;
      for (var i = 1; i < this.settFilterBehavior; i++) {
        left += parseInt(realWidth($(".settFilterBehavior label").eq(i - 1)));
      }
      width = realWidth($(".settFilterBehavior label").eq(this.settFilterBehavior - 1));
      this.settFilterBehaviorPosition.left = left + "px";
      this.settFilterBehaviorPosition.width = width + "px";
      return width;
    },
    settFocusSelected: function() {
      var left = 0;
      var width;
      for (var i = 1; i < this.settFocus; i++) {
        left += parseInt(realWidth($(".settFocus label").eq(i - 1)));
      }
      width = realWidth($(".settFocus label").eq(this.settFocus - 1));
      this.settFocusPosition.left = left + "px";
      this.settFocusPosition.width = width + "px";
      return left;
    },
    errorPercentage: function() {
      var p = Math.round(1000 * this.stats.errorCount / this.stats.totalStrokes) / 10;
      if (isNaN(p)) p = 0;
      else if (p == Infinity) p = 100 * this.stats.errorCount;
      return p.toFixed(1);
    }
  },
  methods: {
    saveSettings: function() {
      atf.$nextTick(() => {
        var data = {
          settFilterLevel: this.settFilterLevel,
          settFilterBehavior: this.settFilterBehavior,
          settFocus: this.settFocus,
          settCaseSensitive: this.settCaseSensitive,
          settSpecial: this.settSpecial,
          settSpecialAll: this.settSpecialAll,
          settSource: this.settSource,
          settReward: this.settReward,
          settRewardKeyword: this.settRewardKeyword,
          layout: this.layout,
          sourceCustom: this.sourceCustom,
          sourceRSS: this.sourceRSS,
          statsShow: this.stats.show,
          settFilters: this.settFilters,
        };
        var json = JSON.stringify(data);
        setCookie("atfSettings", json, 1000);
      });
    },
    layoutMouseState: function(e) {
      this.layoutMouseDown = e.buttons === undefined ? e.which === 1 : e.buttons === 1;
    },
    layoutCheckForSwap: function(key) {
      if (this.layoutMouseDown) {
        if (key.state == "off") key.state = "on";
        else key.state = "off";
        this.saveSettings();
      }
    },
    layoutSwap: function(key) {
      if (key.state == "off") key.state = "on";
      else key.state = "off";
      this.saveSettings();
    },
    allKeys: function(swapTo) {
      for (var i = 0; i < this.layout.length; i++) {
        for (var j = 0; j < this.layout[i].length; j++) {
          this.layout[i][j].state = swapTo;
        }
      }
    },
    calculateReward: function() {
      var speedThreshold = 200; //ú/s
      var errorThreshold = 3; //%

      var speedPercentage = this.stats.overallSpeed / speedThreshold;
      if (speedPercentage > 1) speedPercentage = 1;
      var errorPercentage = 1 - parseInt(this.errorPercentage) / errorThreshold;
      if (errorPercentage < 0) errorPercentage = 0;
      if (this.stats.totalStrokes == 0) errorPercentage = 0;
      var totalPercentage;
      if (this.settFocus == 1) {
        totalPercentage = (speedPercentage + errorPercentage) / 2;
      } else if (this.settFocus == 2) {
        totalPercentage = speedPercentage;
      } else {
        totalPercentage = errorPercentage;
      }
      this.rewardPercents = Math.round(totalPercentage * 100) + "%";
      var width = parseInt($("#rewardImg").outerWidth());
      var height = parseInt($("#rewardImg").outerHeight());
      var min;
      if (width < height) min = width / 2;
      else min = height / 2;
      this.rewardCoverWidth = (min * (1 - totalPercentage)) + "px";
      this.rewardVisible = true;
    },
    showLayoutModal: function() {
      if (!(this.inputDisabled || !this.settFilters)) this.layoutModal = true;
    },
    calcTextLines: function() {
      var text = this.text.replace(/(?:\r\n|\r|\n)/g, ' ').replace(/–/g, "-").replace(/\s+/g, ' ');
      var words;
      if (this.settFilterBehavior == "2" && this.settFilters) { //vynechat
        if (this.settFilterLevel == "1") { //uroven pismen
          let regex = new RegExp("[" + this.disabledChars + "]", "gi");
          var newText = text.replace(regex, '');
          text = newText.replace(/\s+/g, ' ');
          words = text.split(" ");
        } else {
          let regex = new RegExp("[" + this.disabledChars + "]", "i");
          words = text.split(" ");
          newWords = words.filter(function(item) {
            return !regex.test(item);
          });
          words = newWords;
        }
      } else {
        words = text.split(" ");
      }
      var lines = [];
      var maxWidth = $(".lineBox").width();
      do {
        let newLine = "";
        let currentWidth = 0;
        do {
          newLine += words.shift() + " ";
          currentWidth = $(".invis").append("<span>" + (newLine + words[0] + " ").replace(/ /g, '\u00a0') + "</span>").outerWidth();
          $(".invis").html("");
        } while (currentWidth < maxWidth && words.length > 0);
        if (words.length == 0) newLine = newLine.slice(0, -1);
        lines.push(newLine);
      } while (words.length > 0);
      this.textLines = lines;
    },
    swapSettings: function() {
      if (this.inputDisabled) {
        if (this.location == "settings") this.location = this.lastLocation;
        else {
          this.lastLocation = this.location;
          this.location = "settings";
        }
      }
    },
    changeSettings: function() {
      this.inputDisabled = false;
      this.currentLine = [];
    },
    swapATFHelp: function() {
      if (!this.help) $(".helpBox").hide().slideDown(300);
      else $(".helpBox").slideUp(300);
      this.help = !this.help;
    },
    setPageMain: function() {
      this.page = "main";
    },
    setPageMods: function() {
      if (this.page != "mods") this.page = "mods";
      else this.page = "main";
    },
    statsInit: function() {
      this.stats.strokeDelays = [];
      this.stats.strokeDelaysSum = 0;
      this.stats.lastStrokeTime = 0;
      this.stats.realSpeed = 0;
      this.stats.animSpeed = 0;
      this.stats.firstStroke = 0;
      this.stats.lastStroke = 0;
      this.stats.overallSpeed = 0;
      this.stats.totalStrokes = 0;
      this.stats.errorLoc = 0;
      this.stats.errorCount = 0;
    },
    generateNew: function() {
      this.lineNo = 0;
      this.inputDisabled = true;
      this.inputMode = "normal";
      this.rewardUrl = "";
      this.rewardVisible = false;
      this.statsInit();

      //Nacteni zdroje textu
      switch (parseInt(this.settSource)) {
        case 1: //custom
          this.text = this.sourceCustom;
          atf.location = "main";
          atf.$nextTick(() => {
            atf.calcTextLines();
            atf.generate();
          });
          break;
        case 2: //rss
          atf.loadingText = true;
          atf.location = "main";
          $.ajax("https://cors.io/?" + atf.sourceRSS, {
            accepts: {
              xml: "application/rss+xml"
            },
            dataType: "xml",
            success: function(data) {
              var items;
              var text = "";
              var descriptionsRaw = data.getElementsByTagName("description");
              if (descriptionsRaw.length > 0) {
                items = shuffleArray(Array.prototype.slice.call(descriptionsRaw), 0).slice(0, 15);
              } else {
                var titlesRaw = data.getElementsByTagName("title");
                if (titlesRaw.length > 0) {
                  items = shuffleArray(Array.prototype.slice.call(titlesRaw), 0).slice(0, 15);
                } else {
                  alert("zadaný RSS zdroj neobsahuje informace");
                  clearInterval(this.autoInterval);
                  atf.loadingText = false;
                  atf.inputDisabled = false;
                  atf.location = "settings";
                }
              }
              for (var i = 0; i < items.length; i++) {
                text += items[i].childNodes[0].nodeValue;
                if (i < items.length - 1) text += " ";
              }
              var div = document.createElement("div");
              div.innerHTML = text;
              var textWithoutHTML = div.textContent || div.innerText || "";
              atf.text = textWithoutHTML;
              atf.loadingText = false;
              atf.$nextTick(() => {
                atf.calcTextLines();
                atf.generate();
              });
            },
            error: function(e) {
              alert("Chyba při čtení zdrojové URL RSS.");
              clearInterval(this.autoInterval);
              atf.loadingText = false;
              atf.inputDisabled = false;
              atf.location = "settings";
            }
          });
          break;
        case 3: //blábot
          atf.loadingText = true;
          atf.location = "main";
          $.ajax({
            url: 'http://api.blabot.net?scount=100',
            type: 'GET',
            success: function(data) {
              var d = JSON.parse(data);
              atf.text = d.blabot.result[0];
              atf.loadingText = false;
              atf.$nextTick(() => {
                atf.calcTextLines();
                atf.generate();
              });
            },
            error: function() {
              alert("Chyba při čtení dat z api.blabot.net.");
              clearInterval(this.autoInterval);
              atf.loadingText = false;
              atf.inputDisabled = false;
              atf.location = "settings";
            }
          });
          break;
      }
    },
    generate: function() {
      clearInterval(this.autoInterval);
      this.lineNo++;
      if (this.lineNo > 1) {
        var lastLineText = this.currentLineCorrect.map(function(elem) {
          if (elem.key == '\xa0') return " ";
          return elem.key;
        }).join("");
        $(".lastLine").text(lastLineText).addClass("outAnim");
        $(".nowLine").addClass("inAnim");
        setTimeout(function() {
          $(".lastLine").text("").removeClass("outAnim");
          $(".nowLine").removeClass("inAnim");
        }, 1000);
      }
      if (this.lineNo > this.textLines.length) {
        this.finish();
      } else {
        this.currentLine = [];
        var regex = new RegExp("[" + this.disabledChars + "]", "i");
        if (this.settFilterBehavior == "1" && this.settFilters) { //autom. dopsat
          if (this.settFilterLevel == "1") { //uroven pismen
            var line = this.textLines[this.lineNo - 1];
            var finalLine = [];
            for (var i = 0; i < line.length; i++) {
              if (regex.test(line.charAt(i))) {
                finalLine.push({
                  key: line.charAt(i),
                  ghost: true
                });
              } else {
                finalLine.push({
                  key: line.charAt(i),
                  ghost: false
                });
              }
            }
            this.currentLineCorrect = finalLine;
          } else { //uroven slov
            let line = this.textLines[this.lineNo - 1];
            let words = line.split(" ");
            let finalLine = [];
            for (let i = 0; i < words.length; i++) {
              var isGhost = regex.test(words[i]);
              for (let j = 0; j < words[i].length; j++) {
                finalLine.push({
                  key: words[i].charAt(j),
                  ghost: isGhost
                });
              }
              if (i < words.length - 1) {
                finalLine.push({
                  key: " ",
                  ghost: false
                });
              }
            }
            this.currentLineCorrect = finalLine;
          }
          var that = this;
          this.autoInterval = setInterval(function() {
            var inbtw = false;
            if (that.currentLine.length > 1 && that.currentLine.length < that.currentLineCorrect.length) {
              if (that.currentLineCorrect[that.currentLine.length].key == " " & that.currentLineCorrect[that.currentLine.length - 1].ghost && that.currentLineCorrect[that.currentLine.length + 1].ghost) {
                inbtw = true;
              }
            }
            if (that.stats.errorLoc == 0 && (that.currentLineCorrect[that.currentLine.length].ghost || inbtw) && that.inputMode != "command") {
              simulateKeyPress(that.currentLineCorrect[that.currentLine.length].key);
            }
          }, 200);
        } else {
          var array = this.textLines[this.lineNo - 1].split("");
          var newArray = [];
          for (let i = 0; i < array.length; i++) {
            newArray.push({
              key: array[i],
              ghost: false
            });
          }
          this.currentLineCorrect = newArray;
        }
      }
    },
    finish: function() {
      clearInterval(this.autoInterval);
      var that = this;
      if (this.settReward) {
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
            tags: that.settRewardKeyword,
            tagmode: "all",
            format: "json"
          },
          function(data) {
            if (data.items.length > 0) {
              var rnd = Math.floor(Math.random() * data.items.length);
              var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
              that.rewardUrl = image_src;
              var img = $("#rewardImg");
              if (img.complete) {
                that.calculateReward();
              } else {
                img.on('load', function() {
                  that.calculateReward();
                });
              }
            } else {
              alert("Žádné výsledky obrázků pro zadané klíčové slovo");
            }
          });
      }
      this.stats.lastStroke = new Date().getTime();
      this.stats.overallSpeed = Math.round((this.stats.totalStrokes / ((this.stats.lastStroke - this.stats.firstStroke) / 1000)) * 60);
      this.location = "finished";
      this.currentLine = [];
    }
  },
  beforeMount() {
    var json = getCookie("atfSettings");
    if (json.length > 0) {
      var data = JSON.parse(json);
      this.settCaseSensitive = data.settCaseSensitive;
      this.settSpecial = data.settSpecial;
      this.settSpecialAll = data.settSpecialAll;
      this.settSource = data.settSource;
      this.settReward = data.settReward;
      this.settRewardKeyword = data.settRewardKeyword;
      this.layout = data.layout;
      this.sourceCustom = data.sourceCustom;
      this.sourceRSS = data.sourceRSS;
      this.stats.show = data.statsShow;
      this.settFilters = data.settFilters;
    }
  },
  mounted() {
    var json = getCookie("atfSettings");
    if (json.length > 0) {
      var data = JSON.parse(json);
      this.settFilterLevel = data.settFilterLevel;
      this.settFilterBehavior = data.settFilterBehavior;
      this.settFocus = data.settFocus;
    } else {
      this.settFilterLevel = 1;
      this.settFilterBehavior = 1;
      this.settFocus = 1;
    }
    var that = this;
    setInterval(function() {
      that.stats.animSpeed = that.stats.realSpeed;
    }, 500);
    $(document).on('keydown', function(e) {
      if (that.location == "main" && !that.loadingText) {
        if (typeof InstallTrigger !== 'undefined') e.preventDefault(); //bugfix pro prohlížeč Mozilla
        var key = e.key;
        var now = new Date().getTime();
        if (e.ctrlKey && e.shiftKey && key == "S") {
          that.stats.show = !that.stats.show;
        } else {
          if (key.length == 1) {
            if (that.currentLine.length < that.currentLineCorrect.length) {
              if (that.settCaseSensitive && that.settFilters) {
                if (key.toLowerCase() == that.currentLineCorrect[that.currentLine.length].key) key = key.toLowerCase();
                else key = key.toUpperCase();
              }
              var state;
              if (that.inputMode == "command") {
                state = "command";
              } else if (key == that.currentLineCorrect[that.currentLine.length].key) state = "correct";
              else if ((key == "/" && that.inputMode != "command")) {
                state = "command commandStart";
                that.inputMode = "command";
              } else {
                state = "wrong";
              }
              if (that.inputMode != "command") {
                if (that.stats.firstStroke == 0) that.stats.firstStroke = new Date().getTime();
                if (that.stats.errorLoc == 0) {
                  if (key != that.currentLineCorrect[that.currentLine.length].key) {
                    that.stats.errorLoc = that.currentLine.length + 1;
                    that.stats.errorCount++;
                  } else {
                    that.stats.totalStrokes++;
                  }
                }
                if (that.stats.strokeDelays.length >= that.stats.speedPoolSize) {
                  that.stats.strokeDelaysSum -= that.stats.strokeDelays.shift();
                }
                if (that.stats.lastStrokeTime != 0) {
                  var delay = now - that.stats.lastStrokeTime;
                  that.stats.lastStrokeTime = now;
                  if (delay < that.stats.resetTimeout * 1000) {
                    that.stats.strokeDelays.push(delay);
                    that.stats.strokeDelaysSum += delay;
                    var avg = that.stats.strokeDelaysSum / (that.stats.strokeDelays.length - 1);
                    that.stats.realSpeed = Math.round((1 / avg) * 60000);
                  } else {
                    that.stats.strokeDelays = [];
                    that.stats.strokeDelaysSum = 0;
                  }
                } else {
                  that.stats.lastStrokeTime = now;
                }
              }
              if (key == " ") that.currentLine.push({
                key: '\xa0',
                state: state
              });
              else that.currentLine.push({
                key: key,
                state: state
              });
              if (that.inputMode == "command") {
                var comm = "";
                for (var i = 0; i < that.currentLine.length; i++) {
                  if (that.currentLine[i].state == "command") {
                    comm += that.currentLine[i].key;
                  }
                }
                comm = comm.toLowerCase();
                if (comm == "end") {

                  that.finish();
                } else if (comm == "skip") {
                  that.stats.errorLoc = 0;
                  that.inputMode = "normal";
                  that.generate();
                } else if (comm == "/") {
                  that.currentLine.pop();
                  that.currentLine.pop();
                  that.inputMode = "normal";
                  that.currentLine.push({
                    key: that.currentLineCorrect[that.currentLine.length].key.replace(" ", '\xa0'),
                    state: ""
                  });
                  that.stats.totalStrokes++;
                }
              }
            }
          } else if (key == "Backspace") {
            if (that.currentLine.length != 0 && that.stats.errorLoc == 0 && that.inputMode == "normal") that.stats.totalStrokes--;
            if (that.currentLine[that.currentLine.length - 1].key == "/" && that.currentLine[that.currentLine.length - 1].state == "command commandStart") that.inputMode = "normal";
            that.currentLine.pop();
            if (that.stats.errorLoc == 0) {} else {
              if (that.currentLine.length < that.stats.errorLoc) {
                that.stats.errorLoc = 0;
              }
            }
          }
          $(".line span.wrong").each(function() {
            var howFar = (that.currentLine.length - $(this).index());
            if (howFar > 10) howFar = 10;
            var fill = 255 - (howFar * 25.5);
            $(this).css("color", "rgb(255," + fill + "," + fill + ")");
            if ($(this).html() == "&nbsp;") $(this).css("background", "rgba(255,0,0," + (1 - (fill / 255)) + ")");
          });
          if ($(".typing").hasClass("anim")) $(".typing").removeClass("anim").addClass("anim2");
          else $(".typing").removeClass("anim2").addClass("anim");
          var arr = that.currentLine.map(function(elem) {
            if (elem.key == '\xa0') return " ";
            return elem.key;
          }).join("");
          var arrCorrect = that.currentLineCorrect.map(function(elem) {
            if (elem.key == '\xa0') return " ";
            return elem.key;
          }).join("");
          if (arr == arrCorrect) {
            that.generate();
          }
        }
      }
    });
  }
});

function simulateKeyPress(character) {
  var e = jQuery.Event("keydown");
  e.which = character.charCodeAt(0);
  e.keyCode = character.charCodeAt(0);
  e.key = character;
  $(document).trigger(e);
}
