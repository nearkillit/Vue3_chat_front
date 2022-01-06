import { comment } from "@/models/comment";
import axios from "axios";

const initComment: comment = {
  id: 0,
  user_id: 0,
  user_name: "",
  context: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface commentState {
  comments: comment[];
}

export const commentStore = {
  namespaced: true,
  state() {
    return {
      comments: [],
    };
  },
  mutations: {
    fetch(state: commentState, comments: comment[]) {
      state.comments = comments;
    },
    add(state: commentState) {
      console.log("*調整中*");
    },
  },
  actions: {
    async fetchComments(context: any) {
      const { data: comments } = await axios.get(
        `${process.env.VUE_APP_API_URL}/comments`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      context.commit("fetch", comments);
    },
  },
  getters: {
    getComments: (state: commentState) => {
      return state.comments;
    },
  },
};
