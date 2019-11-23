import Vue from 'vue'
import { mapGetters } from 'vuex'

const User = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          user: "authentication/user",
          authenticated: "authentication/authenticated"
        })
      }
    })
  }
};

Vue.use(User);
