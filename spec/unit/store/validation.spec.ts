import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import cloneDeep from "lodash.clonedeep";
import validation from "../../../store/validation";
import "regenerator-runtime";

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

  describe("mutations", () => {
    test("SET_VALIDATION_ERRORS ミューテーションがコミットされると、エラーメッセージがセットされる", async () => {
      expect(store.getters.errors).toEqual({});
      await store.commit("SET_VALIDATION_ERRORS", errors);
      expect(store.getters.errors).toEqual(errors);
    });
  });

  describe("actions", () => {
    test("setErrors アクションを dispatch するたびに、SET_VALIDATION_ERRORS ミューテーションがコミットされる", async () => {
      expect(store.getters.errors).toEqual({});
      await store.dispatch("setErrors", errors);
      expect(store.getters.errors).toEqual(errors);
      await store.dispatch("clearErrors");
      expect(store.getters.errors).toEqual({});
    });
  });
});
