import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import cloneDeep from "lodash.clonedeep";
import index from "../../../store/index";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store/index.js", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(index));
  });

  describe("mutations", () => {
    test("increment ミューテーションがコミットされると、countステートの値が+1される", () => {
      expect(store.getters.count).toBe(0);
      store.commit("increment");
      expect(store.getters.count).toBe(1);
    });
  });
});
