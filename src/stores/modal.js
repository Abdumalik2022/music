import { defineStore } from "pinia";

export default defineStore("hello", {
  state: () => ({
    isOpen: false,
  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? "hidden" : "";
    },
  },
});
