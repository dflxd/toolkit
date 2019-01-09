var intro = new Vue({
  el: "#intro",
  data: {
    apps: [{ //data o jednotlivých podaplikacích
        name: "Technická angličtina",
        color: "#3498DB",
        link: "tech-en.php",
        icon: "english-language",
        description: []
      },
      {
        name: "Subnetting",
        color: "#26A65B",
        link: "subnetting/",
        icon: "peer-to-peer",
        description: [
          "Procvičování počítání IPv4 podsítí",
          "Grafické schéma příkladů",
          "Módy - odlišný způsob počítání",
          "Detailní nápověda k počítání"
        ]
      },
      {
        name: "Číselné soustavy",
        color: "#ffac47",
        link: "num-systems/",
        icon: "binary-code",
        description: [
          "Procvičování převodů mezi číselnými soustavami",
          "Postup řešení krok po kroku",
          "Zásobník libovolného množství převodů",
          "Detailní nápověda k převádění"
        ]
      },
      {
        name: "Psaní všemi deseti",
        color: "#ff4a4a",
        link: "atf/",
        icon: "keyboard",
        description: [
          "Procvičování psaní na klávesnici",
          "Statistiky - rychlost, chybovost",
          "Automatické dopisovaní nenaučených znaků",
          "Výběr zdroje textu"
        ]
      },
    ],
    itemActive: {color: "white"}, //aktivní podaplikace, na kterou uživatel najel kurzorem
    active: false, //zobrazení popisu podaplikací
    lastPosition: { //poslední pozice kurzoru - slouží k animaci efektu po opuštění kurzoru z podaplikace
      x: "0px",
      y: "0px"
    },
  },
  methods: {
    hover: function(item) { //Aktivování zobrazení detailu podaplikace
      this.active = true;
      this.itemActive = item;
    },
    update: function(e, number) { //Aktualizace pozice kurzoru
      var offset = $(".apps>a").eq(number).offset();
      this.lastPosition = {
        x: (e.clientX - offset.left) + "px",
        y: (e.clientY - offset.top) + "px"
      };
    }
  },
  computed: {
    translate: function() {
      return 'translate(' + this.lastPosition.x + ',' + this.lastPosition.y + ')';
    }
  }
});
