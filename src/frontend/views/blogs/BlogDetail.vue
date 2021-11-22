<template>
  <div class="row">
    <base-spinner v-if="form.config.isLoading"></base-spinner>
    <base-dialog
      :show="!!form.errors.messages"
      @close="form.errors.confirm"
      :messages="form.errors.messages"
    >
    </base-dialog>
    <blog-detail-sidebar
      v-if="hasBlog && !form.config.isLoading"
      :user="blog.user"
      :views="blog.views"
      :commentsCount="blog.comments.length"
      :likesCount="blog.likes.length"
      :dislikesCount="blog.dislikes.length"
    ></blog-detail-sidebar>
    <section class="col-md-9">
      <blog-detail-item
        v-if="hasBlog && !form.config.isLoading"
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
import useForm from "@/hooks/form/useForm";
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
    const form = useForm();
    const blogData = reactive({
      id: {
        val: props.id,
      },
    });
    onMounted(async () => {
      await form.submit("blog/getBlog", blogData);
    });
    const blog = computed(function () {
      return store.getters["blog/blog"];
    });

    const hasBlog = computed(() => {
      return store.getters["blog/hasBlog"];
    });

    return { blog, hasBlog, form };
  },
};
</script>
