const state = () => ({
  count: 0
});

const getters = {
  count: state => state.count
};

const mutations = {
  increment(state) {
    // eslint-disable-next-line no-param-reassign
    state.count += 1;
  }
};

const actions = {
  increment({ commit }) {
    commit("increment");
  }
};

module.exports = {
  state,
  getters,
  mutations,
  actions
};
