<template>
  <div>
    <base-spinner v-if="isLoading"></base-spinner>
    <div v-if="!!errors">
      <p v-for="error in errors" :key="error">{{ error }}</p>
    </div>
    <table class="table" v-if="hasUserBlogs && !isLoading">
      <thead>
        <tr>
          <th>#</th>
          <th>عکس</th>
          <th>دسته بندی</th>
          <th>عنوان</th>
          <th>محتوا</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <user-blog-item
          v-for="blog in userBlogs"
          :key="blog.id"
          :id="blog.id"
          :catName="blog.catName"
          :title="blog.title"
          :image="blog.image"
          :content="blog.content"
        ></user-blog-item>
      </tbody>
    </table>
    <div v-if="!hasUserBlogs && !isLoading" class="text-center">
      <p>هنوز هیچ پستی ندارید.</p>
      <base-button link :to="blogCreateLink">ایجاد پست</base-button>
    </div>
  </div>
</template>

<script>
import useForm from "@/hooks/form";
import useOptions from "@/hooks/options";
import UserBlogItem from "../../components/blogs/UserBlogItem.vue";
export default {
  components: {
    UserBlogItem,
  },

  data() {
    return {
      isLoading: false,
      errors: null,
    };
  },
  computed: {
    userBlogs() {
      return this.$store.getters["blog/userBlogs"];
    },
    hasUserBlogs() {
      return this.$store.getters["blog/hasUserBlogs"];
    },
    blogCreateLink() {
      return { name: "blogCreate" };
    },
  },
  async created() {
    this.isLoading = true;
    const options = useOptions();
    await useForm(null, "blog/getUserBlogs", options);
    this.errors = options.errors;

    this.isLoading = false;
  },
};
</script>
