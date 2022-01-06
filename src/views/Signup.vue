<template>
  <div class="home">
    <h1>ユーザー新規登録</h1>
    <form @submit="onSubmit">
      <p>ニックネーム</p>
      <input type="text" v-model="name" />
      <p>{{ errors.name }}</p>
      <p>メールアドレス</p>
      <input type="text" v-model="email" />
      <p>{{ errors.email }}</p>
      <p>パスワード</p>
      <input
        type="password"
        v-model="password"
        placeholder="半角英数字8文字以上100字以内"
      />
      <p>{{ errors.password }}</p>
      <button type="submit">送信</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useField, useForm } from "vee-validate";
import axios from "axios";
import * as yup from "yup";
import { useStore } from "@/store/index";

export default defineComponent({
  name: "Signup",
  setup() {
    const store = useStore();
    const schema = yup.object({
      name: yup.string().required("必須項目です").label("名前"),
      password: yup
        .string()
        .required("必須項目です")
        .matches(/^[a-z\d]{8,100}$/i, {
          message: "半角英数字 8文字以上 100字以内で入力してください",
        })
        .label("パスワード"),
      email: yup
        .string()
        .required()
        .email("メールアドレスの形式ではありません")
        .label("メールアドレス"),
    });

    const { errors, meta, handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        name: "",
        password: "",
        email: "",
      },
    });

    const onSubmit = handleSubmit(async (values) => {
      try {
        const { data: user } = await axios.post(
          `${process.env.VUE_APP_API_URL}/signup`,
          values,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        store.commit("user/fetch", user);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    });

    const { value: password, errorMessage: passwordError } =
      useField("password");
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: name, errorMessage: nameError } = useField("name");

    return {
      password,
      passwordError,
      email,
      emailError,
      name,
      nameError,
      errors,
      meta,
      onSubmit,
    };
  },
});
</script>
