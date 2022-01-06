<template>
  <div>
    <CommentsView />
    <input type="text" v-model="comment" label="コメント" />
    <button @click="sendMessage">送信</button>
    <h1>{{ comment }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import io from "socket.io-client";
import CommentsView from "@/components/CommentsView.vue"; // @ is an alias to /src
import { useStore } from "@/store/index";

export default defineComponent({
  name: "Signup",
  components: {
    CommentsView,
  },
  setup() {
    const store = useStore();
    const comment = ref<string>("");
    const socket = io(`${process.env.VUE_APP_API_URL}`, {
      withCredentials: true,
      extraHeaders: {
        comment: "abcd",
      },
    });

    socket.on("message", (comment: string) => {
      store.dispatch("comment/fetchComments");
    });

    return {
      socket,
      comment,
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_API_URL);
  },
  methods: {
    sendMessage() {
      this.comment = this.comment.trim();

      if (this.comment) {
        // instance data
        const message = {
          context: this.comment,
          user_id: 6,
          user_name: "takashi",
        };
        // send-commentイベントでmessageをサーバーサイドに投げる
        this.socket.emit("message", message);
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
