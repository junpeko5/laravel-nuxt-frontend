export const state = () => ({
  serverSideErrors: {}
});

export const getters = {
  errors(state) {
    return state.serverSideErrors;
  }
}

export const mutations = {
  SET_VALIDATION_ERRORS(state, errors) {
    state.serverSideErrors = errors;
  }
}

export const actions = {
  setErrors({ commit }, errors) {
    commit("SET_VALIDATION_ERRORS", errors)
  },
  clearErrors({ commit }) {
    commit("SET_VALIDATION_ERRORS", {})
  }
}
