import { user } from "@/models/user";

const initUser: user = {
  id: 0,
  name: "",
  email: "",
  password: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface userState {
  user: user;
}

// createStore<userState>(
export const userStore = {
  namespaced: true,
  state: () => {
    return {
      user: initUser,
    };
  },
  mutations: {
    fetch(state: userState, user: user) {
      state.user = Object.assign({}, user);
    },
    check() {
      console.log("check");
    },
  },
};
