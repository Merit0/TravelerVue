import { defineStore } from "pinia";
import { HeroModel } from "@/models/HeroModel";
import { useUserStore } from "./UserStore";

export const useBagStore = defineStore("bag", {
  state: () => {
    return {
      bagItems: [],
      isShown: false,
    };
  },
  getters: {},
  actions: {},
});
