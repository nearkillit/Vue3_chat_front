<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/signup">新規登録</router-link>
    <router-link to="/login">ログイン</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/index";

export default defineComponent({
  setup() {
    const store = useStore();
    const comments = computed(() => store.state.comment);
    const user = computed(() => store.state.user);
    return { comments, user, store };
  },
  mounted() {
    this.fetchComments();
  },
  methods: {
    consoleUser() {
      console.log(this.user.user, "user");
    },
    consoleComments() {
      console.log(this.comments.comments, "comments");
    },
    async fetchComments() {
      this.store.dispatch("comment/fetchComments");
    },
  },
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
