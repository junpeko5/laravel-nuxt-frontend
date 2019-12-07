import Vue from "vue";
import { mapGetters } from "vuex";

const Validation = {
  install(Vue) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          serverSideErrors: "validation/errors"
        })
      }
    });
  }
};

Vue.use(Validation);
