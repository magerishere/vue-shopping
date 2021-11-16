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
    <base-button
      v-if="blogIds.length > 0"
      mode="danger small"
      @click="confirmRemoveBlog"
      >حذف موارد انتخاب شده</base-button
    >
    <table class="table mt-3" v-if="hasUserBlogs && !options.isLoading">
      <thead>
        <tr>
          <th>
            <base-input
              text="#"
              id="selectedAll"
              type="checkbox"
              @change="selectedAll"
            ></base-input>
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
import { ref, computed, onMounted, provide } from "vue";
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

    const blogIds = ref([]);
    provide("checkMarkInput", function (event) {
      const blogId = event.target.id;
      const isChecked = event.target.checked;
      if (isChecked) {
        blogIds.value.push(blogId);
      } else {
        const newBlogIds = blogIds.value.slice();
        const indexOfCurrentId = newBlogIds.findIndex((id) => id == blogId);
        newBlogIds.splice(indexOfCurrentId, 1);
        blogIds.value = newBlogIds;
      }
    });

    const selectedAll = (event) => {
      const isChecked = event.target.checked;
      // empty all value
      blogIds.value = [];
      const checkBoxInputs = document.querySelectorAll(
        'input[type="checkbox"]'
      );
      if (isChecked) {
        // checked all inputs
        for (let i = 0; i < checkBoxInputs.length; i++) {
          checkBoxInputs[i].checked = true;
          // except input that handle All selected
          if (checkBoxInputs[i].id !== "selectedAll") {
            blogIds.value.push(checkBoxInputs[i].id);
          }
        }
      } else {
        // unchecked all inputs
        for (let i = 0; i < checkBoxInputs.length; i++) {
          checkBoxInputs[i].checked = false;
        }
      }
      console.log(blogIds.value);
    };
    // remove blog processing

    const confirm = ref(false);
    const selectedAllInput = document.getElementById("selectedAll");
    // toggle confirm remove blogs
    const confirmRemoveBlog = (id = null) => {
      // if remove one item
      if (id) {
        blogIds.value.push(id);
      }
      console.log(blogIds.value);
      confirm.value = !confirm.value;
    };

    const removeBlog = async () => {
      const blogData = {
        ids: {
          val: blogIds.value,
        },
      };

      await useForm(blogData, "blog/removeBlog", options, false, true);

      confirm.value = false;
      // if success
      if (options.done) {
        blogIds.value = [];
        // uncheck input selected all after remove
        if (selectedAllInput) {
          document.getElementById("selectedAll").checked = false;
        }
      }
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
