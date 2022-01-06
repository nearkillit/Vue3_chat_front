<template>
  <div class="home">
    <Comment />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Comment from "@/components/Comment.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Comment,
  },
});
</script>
