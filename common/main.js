/*
 * Společný JS pro všechny podaplikace
 */

//Práce s cookies
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//Promíchá náhodně prvky pole
function shuffleArray(array, dis) {
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

//Doplnění aktuálního roku do credits
$(document).ready(function(){
  $(".currentYear").html((new Date()).getFullYear());
});

//Nahrazení znaku v řetězci
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

//Náhodné číslo od - do
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Test zda je n číslo
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//Naklonuje element bokem a vrátí jeho reálnou šířku
function realWidth(obj) {
  var clone = obj.clone();
  clone.addClass("hiddenClone");
  $('body').append(clone);
  var width = clone.outerWidth();
  clone.remove();
  return width + 1;
}
