const Vuex = require("vuex");
const validation = require("../../store/validation");
const { createLocalVue } = require("@vue/test-utils");
const cloneDeep = require("lodash.clonedeep");

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store/validation.js", () => {
  let store;

  const errors = {
    email: "The email must be a valid email address.",
    password: "The password must be at least 6 characters."
  };

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(validation));
  });

  describe('mutations', () => {
    test("SET_VALIDATION_ERRORS ミューテーションがコミットされると、エラーメッセージがセットされる", async () => {
      expect(store.getters["errors"]).toEqual({});
      await store.commit("SET_VALIDATION_ERRORS", errors);
      expect(store.getters["errors"]).toEqual(errors);
    });
  })
})
