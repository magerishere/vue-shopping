<template>
  <div>
    <base-spinner v-if="form.config.isLoading"></base-spinner>
    <base-dialog :show="!!form.errors.messages" @close="form.errors.confirm">
      <p v-for="error in form.errors.messages" :key="error">{{ error }}</p>
    </base-dialog>
    <base-dialog
      :show="confirmRemove"
      title="هشدار"
      @close="toggleConfirmRemove"
      mode="danger"
      confirm
      @confirmed="remove"
    >
    </base-dialog>
    <base-button
      v-if="blogIds.length > 0"
      mode="danger small"
      @click="toggleConfirmRemove"
      >حذف موارد انتخاب شده</base-button
    >
    <base-table v-if="hasUserBlogs && !form.config.isLoading">
      <template #head>
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
      </template>
      <template #default>
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
      </template>
    </base-table>
    <base-pagination
      v-if="hasUserBlogs && !form.config.isLoading"
      :pages="userBlogs.links"
      @paginator="paginator"
    ></base-pagination>

    <div v-if="!hasUserBlogs && !form.config.isLoading" class="text-center">
      <p>هنوز هیچ پستی ندارید.</p>
      <base-button link :to="blogCreateLink">ایجاد پست</base-button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import useForm from "@/hooks/form/useForm";
import UserBlogItem from "../../components/blogs/UserBlogItem.vue";
export default {
  name: "UserBlogsList",

  components: {
    UserBlogItem,
  },

  setup() {
    const store = useStore();
    const form = useForm();

    onMounted(async () => {
      await form.submit("blog/getUserBlogs");
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
    const toggleConfirmRemove = () => {
      // toggle confirm modal
      confirmRemove.value = !confirmRemove.value;
    };

    // remove blog processing
    const remove = async () => {
      const data = {
        ids: {
          val: blogIds.value,
        },
      };

      await form.submit("blog/removeBlog", data, false);

      confirmRemove.value = false;
    };

    const paginator = async (queryParamPage) => {
      const data = {
        page: {
          val: queryParamPage,
        },
      };
      await form.submit("blog/getUserBlogs", data);
    };

    return {
      userBlogs,
      hasUserBlogs,
      blogCreateLink,
      paginator,
      remove,
      toggleConfirmRemove,
      confirmRemove,
      blogIds,
      selectedAll,
      form,
    };
  },
};
</script>
