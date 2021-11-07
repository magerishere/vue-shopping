<template>
  <div class="row">
    <base-spinner v-if="options.isLoading"></base-spinner>
    <base-dialog
      :show="!!options.errors"
      title="خطایی رخ داد"
      @close="confirmErrors"
    >
      <p v-for="error in options.errors" :key="error">{{ error }}</p>
    </base-dialog>
    <blogs-sidebar v-if="hasBlogs && !options.isLoading"></blogs-sidebar>
    <section class="col-md-9">
      <ul class="row" v-if="hasBlogs && !options.isLoading">
        <blog-item
          v-for="blog in blogs"
          :key="blog.id"
          :id="blog.id"
          :title="blog.title"
          :image="blog.image"
          :content="blog.content"
        >
        </blog-item>
      </ul>
    </section>
    <div class="text-center mt-5" v-if="!hasBlogs && !options.isLoading">
      <h4 class="mb-5">هیچ مطلبی وجود ندارد. شما اولین پست را ایجاد کنید</h4>
      <base-button v-if="isAuth" link to="/dashobard/blog/create"
        >ایجاد مطلب</base-button
      >
      <base-button v-else link to="/auth">ورود / ثبت نام</base-button>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import useForm from "@/hooks/form";
import useOptions from "@/hooks/options";
import useErrors from "@/hooks/errors";
import BlogItem from "../../components/blogs/BlogItem.vue";
import BlogsSidebar from "../../components/blogs/BlogsSidebar.vue";
export default {
  name: "BlogsList",
  components: {
    BlogItem,
    BlogsSidebar,
  },
  setup() {
    const store = useStore();
    const options = useOptions();
    onMounted(async () => {
      await useForm(null, "blog/getBlogs", options);
    });
    const blogs = computed(() => {
      return store.getters["blog/blogs"];
    });

    const hasBlogs = computed(() => {
      return store.getters["blog/hasBlogs"];
    });

    const isAuth = computed(() => {
      return store.getters["user/isAuth"];
    });
    const { confirmErrors } = useErrors(null, options);
    return { blogs, hasBlogs, confirmErrors, options, isAuth };
  },
};
</script>
