import { mount } from "@vue/test-utils";
import Comment from "@/components/Comment.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const wrapper = mount(Comment);
    console.log(wrapper.html());

    expect(wrapper.text()).toContain("送信");
  });
});
