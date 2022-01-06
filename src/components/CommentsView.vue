<template>
  <div class="commentsView">
    <div v-for="com in comments" :key="com.id" class="comment">
      <p class="commentContext">{{ com.context }}</p>
      <p class="commentUser">{{ `${com.user_name}:${com.updatedAt}` }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/index";

export default defineComponent({
  name: "CommentsView",
  setup() {
    const store = useStore();
    const comments = computed(() => store.getters["comment/getComments"]);

    return {
      comments,
      store,
    };
  },
  methods: {
    test() {
      this.store.commit("comment/add");
    },
  },
});
</script>
<style>
.comment {
  font: 1.2em "Fira Sans", sans-serif;
  color: black;
  outline: 1px solid;
  margin: 0;
  text-align: left;
}
.commentContext {
  margin: 0 auto 0 0;
}
.commentUser {
  color: #666666;
  font: 0.8em "Fira Sans", sans-serif;
  text-align: right;
  margin: 0 0 0 auto;
}
</style>
