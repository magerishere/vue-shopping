<template>
  <div class="row">
    <base-spinner v-if="options.isLoading"></base-spinner>
    <base-dialog
      :show="!!options.errors"
      @close="confirmErrors"
      :messages="options.errors"
    >
    </base-dialog>
    <blog-detail-sidebar
      v-if="hasBlog && !options.isLoading"
      :user="blog.user"
      :views="blog.views"
      :commentsCount="blog.comments.length"
      :likesCount="blog.likes.length"
      :dislikesCount="blog.dislikes.length"
    ></blog-detail-sidebar>
    <section class="col-md-9">
      <blog-detail-item
        v-if="hasBlog && !options.isLoading"
        :id="blog.id"
        :title="blog.title"
        :image="blog.image"
        :likes="blog.likes"
        :dislikes="blog.dislikes"
        :content="blog.content"
        :comments="blog.comments"
      ></blog-detail-item>
    </section>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import useForm from "@/hooks/form";
import useOptions from "@/hooks/options";
import useErrors from "@/hooks/errors";
import BlogDetailSidebar from "../../components/blogs/BlogDetailSidebar.vue";
import BlogDetailItem from "../../components/blogs/BlogDetailItem.vue";
export default {
  name: "BlogDetail",
  components: {
    BlogDetailSidebar,
    BlogDetailItem,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const blogData = reactive({
      id: {
        val: props.id,
      },
    });
    const options = useOptions();
    onMounted(async () => {
      await useForm(blogData, "blog/getBlog", options);
    });
    const { confirmErrors } = useErrors(blogData, options);
    const blog = computed(function () {
      return store.getters["blog/blog"];
    });

    const hasBlog = computed(() => {
      return store.getters["blog/hasBlog"];
    });

    return { blog, hasBlog, options, confirmErrors };
  },
};
</script>
