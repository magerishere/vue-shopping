<template>
  <div>
    <base-spinner v-if="options.isLoading"></base-spinner>
    <base-dialog :show="!!options.errors" @close="confirmErrors">
      <p v-for="error in options.errors" :key="error">{{ error }}</p>
    </base-dialog>
    <base-dialog
      :show="confirm"
      title="هشدار"
      mode="danger"
      @close="confirmRemoveBlog"
    >
      <p class="text-center">آیا از انجام این کار مطمئن هستید؟</p>
      <template #actions>
        <base-button @click="removeBlog" mode="danger">حذف</base-button>
      </template>
    </base-dialog>
    <table class="table" v-if="hasUserBlogs && !options.isLoading">
      <thead>
        <tr>
          <td><input type="checkbox" /></td>

          <th>#</th>
          <th>عکس</th>
          <th>دسته بندی</th>
          <th>عنوان</th>
          <th>محتوا</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <transition-group appear tag="tbody" name="blog-list">
        <user-blog-item
          v-for="blog in userBlogs"
          :key="blog.id"
          :id="blog.id"
          :catName="blog.catName"
          :title="blog.title"
          :image="blog.image"
          :content="blog.content"
          @remove-blog="confirmRemoveBlog"
        ></user-blog-item>
      </transition-group>
    </table>
    <div v-if="!hasUserBlogs && !options.isLoading" class="text-center">
      <p>هنوز هیچ پستی ندارید.</p>
      <base-button link :to="blogCreateLink">ایجاد پست</base-button>
    </div>
    <base-pagination
      v-if="hasUserBlogs && !options.isLoading"
      :pages="pages"
      @paginator="paginator"
    ></base-pagination>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import useForm from "@/hooks/form";
import useOptions from "@/hooks/options";
import useErrors from "@/hooks/errors";
import UserBlogItem from "../../components/blogs/UserBlogItem.vue";
export default {
  name: "UserBlogsList",
  emits: {
    removeBlog: {
      type: Function,
      required: true,
    },
  },
  components: {
    UserBlogItem,
  },

  setup() {
    const store = useStore();
    const options = useOptions();
    onMounted(async () => {
      await useForm(null, "blog/getUserBlogs", options);
    });

    const userBlogs = computed(() => {
      return store.getters["blog/userBlogs"];
    });

    const hasUserBlogs = computed(() => {
      return store.getters["blog/hasUserBlogs"];
    });

    const blogCreateLink = computed(() => {
      return { name: "blogCreate" };
    });

    const pages = computed(() => {
      return store.getters["blog/userPages"];
    });

    // remove blog processing
    const blogId = ref(null);
    const confirm = ref(false);
    const confirmRemoveBlog = (id) => {
      if (id) {
        blogId.value = id;
      }
      confirm.value = !confirm.value;
    };

    const removeBlog = () => {
      const blogData = {
        id: {
          val: blogId.value,
        },
      };
      useForm(blogData, "blog/removeBlog", options, false, true);
      confirm.value = false;
    };

    function paginator(queryParamPage) {
      const userBlogsData = {
        page: {
          val: queryParamPage,
        },
      };
      useForm(userBlogsData, "blog/getUserBlogs", options);
    }

    const { confirmErrors } = useErrors(null, options);

    return {
      userBlogs,
      hasUserBlogs,
      blogCreateLink,
      pages,
      removeBlog,
      options,
      paginator,
      confirm,
      confirmErrors,
      confirmRemoveBlog,
    };
  },
};
</script>

<style scoped>
.blog-list-enter-from {
  opacity: 0.5;
  transform: translateX(-60px);
}

.blog-list-enter-active {
  transition: all 1s ease-out;
}

.blog-list-enter-to,
.blog-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.blog-list-leave-active {
  transition: all 1s;
}
.blog-list-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
