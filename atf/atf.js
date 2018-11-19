var atf = new Vue({
  el: '#atf',
  data: {
    ocation: "settings",
    inputDisabled: false,
    page: "main",
    location: "settings"
  },
  computed: {

  },
  methods: {
    swapSettings: function() {
      if (this.inputDisabled) {
        if (this.location == "settings") this.location = "main";
        else if (this.location == "main") this.location = "settings";
      }
    },
  }

});
