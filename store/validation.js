const state = () => ({
  serverSideErrors: {}
});

const getters = {
  errors(state) {
    return state.serverSideErrors;
  }
};

const mutations = {
  SET_VALIDATION_ERRORS(state, errors) {
    state.serverSideErrors = errors;
  }
};

const actions = {
  setErrors({ commit }, errors) {
    commit("SET_VALIDATION_ERRORS", errors);
  },
  clearErrors({ commit }) {
    commit("SET_VALIDATION_ERRORS", {});
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
