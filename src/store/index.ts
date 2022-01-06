import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { userStore, userState } from "./user";
import { commentStore, commentState } from "./comment";

export interface State {
  user: userState;
  comment: commentState;
}
// type State = {};

export const StateKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    user: userStore,
    comment: commentStore,
  },
});

export function useStore() {
  return baseUseStore(StateKey);
}
