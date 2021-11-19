<template>
  <div>
    <base-spinner v-if="options.isLoading"></base-spinner>
    <base-dialog :show="!!options.errors" @close="confirmErrors">
      <p v-for="error in options.errors" :key="error">{{ error }}</p>
    </base-dialog>
    <base-dialog
      :show="confirmRemove"
      title="هشدار"
      mode="danger"
      @close="confirmRemoveBlog(null)"
    >
      <p class="text-center">آیا از انجام این کار مطمئن هستید؟</p>
      <template #actions>
        <base-button @click="removeBlog" mode="danger">حذف</base-button>
      </template>
    </base-dialog>
    <base-button
      v-if="blogIds.length > 0"
      mode="danger small"
      @click="confirmRemoveBlog(null, false)"
      >حذف موارد انتخاب شده</base-button
    >
    <table class="table mt-3" v-if="hasUserBlogs && !options.isLoading">
      <thead>
        <tr>
          <th>
            <BaseInputCheckbox
              text="#"
              id="selectedAll"
              v-model="selectedAll"
            />
          </th>

          <th>عکس</th>
          <th>دسته بندی</th>
          <th>عنوان</th>
          <th>محتوا</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <transition-group appear tag="tbody" name="blog-list">
        <user-blog-item
          v-for="blog in userBlogs.data"
          :key="blog.id"
          :id="blog.id"
          :catName="blog.catName"
          :title="blog.title"
          :image="blog.image"
          :content="blog.content"
          v-model="blogIds"
        ></user-blog-item>
      </transition-group>
    </table>
    <div v-if="!hasUserBlogs && !options.isLoading" class="text-center">
      <p>هنوز هیچ پستی ندارید.</p>
      <base-button link :to="blogCreateLink">ایجاد پست</base-button>
    </div>
    <base-pagination
      v-if="hasUserBlogs && !options.isLoading"
      :pages="userBlogs.links"
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

    console.log(userBlogs.value, "userBlogs");

    const hasUserBlogs = computed(() => {
      return store.getters["blog/hasUserBlogs"];
    });

    const blogCreateLink = computed(() => {
      return { name: "blogCreate" };
    });

    const blogIds = ref([]);
    // toggle checkmark all data
    const selectedAll = computed({
      get: () => blogIds.value.length === userBlogs.value.length,
      set: (value) => {
        blogIds.value = [];
        if (value) {
          userBlogs.value.forEach((blog) => {
            blogIds.value.push(blog.id);
          });
        }
      },
    });

    const confirmRemove = ref(false);
    const confirmRemoveBlog = () => {
      // toggle confirm modal
      confirmRemove.value = !confirmRemove.value;
    };

    // remove blog processing
    const removeBlog = async () => {
      const blogData = {
        ids: {
          val: blogIds.value,
        },
      };

      await useForm(blogData, "blog/removeBlog", options, false, true);

      confirmRemove.value = false;
      // if success
      if (options.done) {
        blogIds.value = [];
      }
    };

    function paginator(queryParamPage) {
      const userBlogsData = {
        page: {
          val: queryParamPage,
        },
      };
      useForm(userBlogsData, "blog/getBlogs", options);
    }

    const { confirmErrors } = useErrors(null, options);

    return {
      userBlogs,
      hasUserBlogs,
      blogCreateLink,
      removeBlog,
      options,
      paginator,
      confirmRemove,
      confirmErrors,
      confirmRemoveBlog,
      blogIds,
      selectedAll,
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

th {
  position: relative;
}
</style>
