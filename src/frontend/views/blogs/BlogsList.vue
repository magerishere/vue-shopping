<template>
  <div class="container">
    <div class="row">
      <blogs-sidebar @apply-filters="applyFilters"></blogs-sidebar>
      <base-dialog
        :show="!!form.errors.messages"
        title="خطایی رخ داد"
        :messages="form.errors.messages"
        @close="form.errors.confirm"
      >
      </base-dialog>
      <base-spinner v-if="form.config.isLoading"></base-spinner>

      <section class="col-md-9">
        <transition-group
          appear
          tag="ul"
          name="blog-list"
          v-if="hasBlogs && !form.config.isLoading"
          class="row mx-1"
        >
          <blog-item
            v-for="blog in blogs.data"
            :key="blog.id"
            :id="blog.id"
            :catName="blog.catName"
            :title="blog.title"
            :image="blog.image"
            :content="blog.content"
            :views="blog.views"
            :created-at="blog.created_at"
            :likes="blog.likes_count"
            :comments="blog.comments_count"
          >
          </blog-item>
        </transition-group>

        <div
          class="text-center mt-5"
          v-if="!hasBlogs && !form.config.isLoading"
        >
          <h4 class="mb-5">
            هیچ مطلبی وجود ندارد. شما اولین پست را ایجاد کنید
          </h4>
          <base-button v-if="isAuth" link to="/dashboard/blog/create"
            >ایجاد مطلب</base-button
          >
          <base-button v-else link to="/auth">ورود / ثبت نام</base-button>
        </div>
        <base-pagination
          v-if="hasBlogs && !form.config.isLoading"
          :pages="blogs.links"
          @paginator="paginator"
        ></base-pagination>
      </section>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import useForm from "@/hooks/form/useForm";
import BlogItem from "../../components/blogs/BlogItem.vue";
import BlogsSidebar from "../../components/blogs/BlogsSidebar.vue";
export default {
  name: "BlogsList",
  components: {
    BlogItem,
    BlogsSidebar,
  },
  emits: {
    setFilters: {
      type: Function,
      required: true,
    },
    paginator: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const form = useForm();

    onMounted(async () => {
      await form.submit("blog/getBlogs");
    });
    const blogs = computed(() => {
      return store.getters["blog/blogs"];
    });

    const hasBlogs = computed(() => {
      return store.getters["blog/hasBlogs"];
    });

    const isAuth = computed(() => {
      return store.getters["auth/isAuth"];
    });

    // emits
    function applyFilters(filters) {
      form.submit("blog/setFilters", filters);
    }

    function paginator(queryParamPage) {
      const blogsData = {
        page: {
          val: queryParamPage,
        },
      };
      form.submit("blog/getBlogs", blogsData);
    }

    return {
      blogs,
      hasBlogs,
      isAuth,
      applyFilters,
      paginator,
      form,
    };
  },
};
</script>

<style scoped>
.blog-list-enter-from,
.blog-list-leave-to {
  opacity: 0;
}

.blog-list-enter-active {
  transition: all 0.7s ease-out;
}

.blog-list-leave-active {
  transition: all 0.7s ease-in;
}

.blog-list-enter-to,
.blog-list-leave-from {
  opacity: 1;
}
</style>
